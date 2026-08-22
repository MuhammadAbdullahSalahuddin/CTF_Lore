"use client";

// Placeholder data — replace with real lore_players session data later
const MOCK_PROFILE = {
  handle: "unresolved",
  email: "unknown@crew.local",
  joined: "—",
  achievements: [
    { label: "self-registered a PAM account", earned: false },
    { label: "ADMIN-level access achieved", earned: false },
    { label: "JIT ticket issued", earned: false },
    { label: "IDOR side-track completed", earned: false },
    { label: "flag captured", earned: false },
  ],
};

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-2xl font-terminal text-[#4ade80]">
      <h1 className="mb-6 text-2xl tracking-widest text-glow-strong">
        // CREW_PROFILE
      </h1>

      <div className="mb-8 border border-[#4ade80]/30 p-4">
        <div className="mb-1 text-xs tracking-widest text-[#4ade80]/50 text-glow-strong">
          HANDLE
        </div>
        <div className="mb-3 text-lg">{MOCK_PROFILE.handle}</div>

        <div className="mb-1 text-xs tracking-widest text-[#4ade80]/50 text-glow-strong">
          CREW EMAIL
        </div>
        <div className="mb-3 text-lg">{MOCK_PROFILE.email}</div>

        <div className="mb-1 text-xs tracking-widest text-[#4ade80]/50 text-glow-strong">
          JOINED
        </div>
        <div className="text-lg">{MOCK_PROFILE.joined}</div>
      </div>

      <div className="border border-[#4ade80]/30 p-4">
        <div className="mb-3 text-xs tracking-widest text-[#4ade80]/50 ">
          ACHIEVEMENTS
        </div>
        <div className="space-y-2">
          {MOCK_PROFILE.achievements.map((a) => (
            <div key={a.label} className="flex items-center gap-3 text-sm">
              <span
                className={a.earned ? "text-[#4ade80]" : "text-[#4ade80]/20"}
              >
                {a.earned ? "[x]" : "[ ]"}
              </span>
              <span className={a.earned ? "" : "text-[#4ade80]/40"}>
                {a.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
