"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PortalFrame, TerminalInput } from "@/components/corporate/TerminalUI";

export default function LoginPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [code, setCode] = useState("");

  const handleLogin = () => {
    // TEMPORARY — no real auth yet. Any non-empty input passes.
    if (!id.trim() || !code.trim()) return;
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
          label="AUDITOR_ID"
          type="text"
          value={id}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setId(e.target.value)
          }
        />
        <TerminalInput
          label="ACCESS_CODE"
          type="password"
          value={code}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCode(e.target.value)
          }
        />
        <button
          onClick={handleLogin}
          className="terminal-button"
          style={{
            background: "transparent",
            border: "1px solid #00ff88",
            color: "#00ff88",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            fontFamily: "monospace",
          }}
        >
          EXECUTE_LOGIN
        </button>
      </div>
    </PortalFrame>
  );
}
