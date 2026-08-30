"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PortalFrame, TerminalInput } from "@/components/corporate/TerminalUI";
import { useCrewAuthStore } from "@/store/crew-auth.store";
import { crewLogin } from "@/lib/crew-client";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useCrewAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) return;
    setLoading(true);
    setError(null);

    const result = await crewLogin(email.trim(), password);

    if (!result) {
      setError("ACCESS DENIED");
      setLoading(false);
      return;
    }

    setAuth(result.accessToken, email.trim(), "");
    router.push("/portal/dashboard/lore");
  };

  return (
    <PortalFrame>
      <div
        className="login-form"
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <h2 style={{ color: "#00ff88", marginBottom: "2rem" }}>
          // AUTHENTICATION_REQUIRED
        </h2>
        <TerminalInput
          label="CREW_ID"
          type="text"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <TerminalInput
          label="ACCESS_CODE"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        {error && (
          <p
            style={{
              color: "#ff4444",
              fontSize: "0.9rem",
              marginTop: "0.5rem",
            }}
          >
            {error}
          </p>
        )}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="terminal-button"
          style={{
            background: "transparent",
            border: "1px solid #00ff88",
            color: "#00ff88",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            fontFamily: "monospace",
            opacity: loading ? 0.5 : 1,
          }}
        >
          {loading ? "AUTHENTICATING..." : "EXECUTE_LOGIN"}
        </button>
      </div>
    </PortalFrame>
  );
}
