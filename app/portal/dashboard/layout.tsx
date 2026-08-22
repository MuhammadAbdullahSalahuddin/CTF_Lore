"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import DashboardShell from "@/components/dashboard/DashboardShell";
import CRTFrame from "@/components/shared/CRTFrame";

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

  return (
    <CRTFrame>
      <div className="flex min-h-screen flex-col font-terminal text-[#4ade80]">
        {/* Tab bar */}
        <nav className="flex items-center gap-6 border-b border-[#4ade80]/30 bg-[#0a0f0d]/90 px-6 py-3">
          <span className="text-sm tracking-widest text-[#4ade80]/50">
            CREW://
          </span>
          {TABS.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`text-lg tracking-wide transition-colors ${
                  active
                    ? "text-[#4ade80]"
                    : "text-[#4ade80]/40 hover:text-[#4ade80]/70"
                }`}
              >
                [{tab.label}]
              </Link>
            );
          })}
        </nav>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>

        {/* Cosmetic shell strip — always available, navigation-only */}
        <DashboardShell tabs={TABS} />
      </div>
    </CRTFrame>
  );
}
