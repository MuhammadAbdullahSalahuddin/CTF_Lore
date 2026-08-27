"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import DashboardShell from "@/components/dashboard/DashboardShell";
import CRTFrame from "@/components/shared/CRTFrame";
import { useCrewAuthStore } from "@/store/crew-auth.store";
import { crewSilentRefresh, crewLogout } from "@/lib/crew-client";

const TABS = [
  { label: "lore", href: "/portal/dashboard/lore" },
  { label: "hints", href: "/portal/dashboard/hints" },
  { label: "scoreboard", href: "/portal/dashboard/scoreboard" },
  { label: "profile", href: "/portal/dashboard/profile" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { accessToken, setAuth, clearAuth } = useCrewAuthStore();

  useEffect(() => {
    if (!accessToken) {
      crewSilentRefresh().then(
        (r) => r && setAuth(r.accessToken, r.email, r.crewHandle),
      );
    }
  }, [accessToken]);

  const handleLogout = async () => {
    await crewLogout(); // tells the server to delete the httpOnly cookie
    clearAuth(); // clears the in-memory access token/email/crewHandle
    router.push("/portal/login");
  };

  return (
    <CRTFrame>
      <div className="flex min-h-screen flex-col font-terminal text-[#4ade80] text-lg">
        <nav className="flex items-center justify-between border-b border-[#4ade80]/30 bg-[#0a0f0d]/90 px-6 py-4">
          <div className="flex items-center gap-6">
            <span className="text-base tracking-widest text-[#4ade80]/70">
              CREW://
            </span>
            {TABS.map((tab) => {
              const active = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`text-xl tracking-wide transition-colors ${
                    active
                      ? "text-[#4ade80]"
                      : "text-[#4ade80]/60 hover:text-[#4ade80]"
                  }`}
                >
                  [{tab.label}]
                </Link>
              );
            })}
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-[#4ade80]/50 tracking-widest hover:text-red-400 transition-colors"
          >
            [logout]
          </button>
        </nav>

        <main className="flex-1 overflow-y-auto p-6 text-lg leading-relaxed">
          {children}
        </main>

        <DashboardShell tabs={TABS} />
      </div>
    </CRTFrame>
  );
}
