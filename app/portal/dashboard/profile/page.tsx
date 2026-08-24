"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TypeAnimation } from "react-type-animation";
import { PortalFrame, TerminalInput } from "@/components/corporate/TerminalUI";
import { useCrewAuthStore } from "@/store/crew-auth.store";
import { crewLogin, getProfile, updateCrewHandle } from "@/lib/crew-client";

export default function ProfilePage() {
  const { accessToken } = useCrewAuthStore();
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    getProfile(accessToken).then((p) => {
      if (!p) return;
      setEmail(p.email);
      setHandle(p.crew_handle ?? "");
      setCreatedAt(p.created_at);
    });
  }, [accessToken]);

  const handleSave = async () => {
    if (!accessToken || !handle.trim()) return;
    setSaving(true);
    setError(null);

    const result = await updateCrewHandle(accessToken, handle.trim());

    if (!result) {
      setError("update failed");
    } else {
      setEditing(false);
    }
    setSaving(false);
  };

  return (
    <div className="max-w-md">
      <h1 className="mb-6 text-2xl">// PROFILE</h1>

      <div className="mb-4">
        <div className="text-sm text-[#4ade80]/50">CREW_ID</div>
        <div>{email}</div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-[#4ade80]/50">HANDLE</div>
        {editing ? (
          <div className="flex items-center gap-2">
            <input
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              maxLength={50}
              className="border-b border-[#4ade80]/40 bg-transparent outline-none"
              autoFocus
            />
            <button
              onClick={handleSave}
              disabled={saving}
              className="text-sm text-[#4ade80] hover:text-white"
            >
              {saving ? "..." : "[save]"}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="text-sm text-[#4ade80]/50 hover:text-red-400"
            >
              [cancel]
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>{handle || "(unset)"}</span>
            <button
              onClick={() => setEditing(true)}
              className="text-sm text-[#4ade80]/50 hover:text-[#4ade80]"
            >
              [edit]
            </button>
          </div>
        )}
        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      </div>

      <div>
        <div className="text-sm text-[#4ade80]/50">RECRUITED</div>
        <div>
          {createdAt ? new Date(createdAt).toLocaleDateString() : "..."}
        </div>
      </div>
    </div>
  );
}

export function LoginPage() {
  const router = useRouter();
  const setAuth = useCrewAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [handshaking, setHandshaking] = useState(false);

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

    setAuth(result.accessToken, email.trim());
    setLoading(false);
    setHandshaking(true); // show the handshake sequence, then navigate on completion
  };

  if (handshaking) {
    return (
      <PortalFrame>
        <div style={{ maxWidth: "400px", margin: "0 auto", color: "#00ff88" }}>
          <TypeAnimation
            sequence={[
              300,
              "AUTHENTICATING...",
              500,
              "AUTHENTICATING...\nSIGNATURE VERIFIED",
              500,
              "AUTHENTICATING...\nSIGNATURE VERIFIED\nACCESS GRANTED",
              600,
              () => router.push("/portal/dashboard/lore"),
            ]}
            wrapper="div"
            speed={70}
            cursor
            repeat={0}
            style={{
              fontFamily: "monospace",
              fontSize: "1rem",
              whiteSpace: "pre-wrap",
            }}
          />
        </div>
      </PortalFrame>
    );
  }

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
