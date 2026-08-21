import React from "react";
import CRTFrame from "@/components/shared/CRTFrame";

export const TerminalInput = ({ label, ...props }: any) => (
  <div className="terminal-field">
    <label className="terminal-label">{label}</label>
    <input className="terminal-input" {...props} />
  </div>
);

export const PortalFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="portal-container">
    <CRTFrame>
      <header className="portal-header">
        <span className="status-dot green">●</span> APT_AUDITOR_PORTAL_v1.0
      </header>
      <main className="portal-content">{children}</main>
    </CRTFrame>
  </div>
);
