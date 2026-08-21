import React from 'react';
import { PortalFrame, TerminalInput } from '@/components/corporate/TerminalUI';

export default function LoginPage() {
  return (
    <PortalFrame>
      <div className="login-form" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2 style={{ color: '#00ff88', marginBottom: '2rem' }}>// AUTHENTICATION_REQUIRED</h2>
        <TerminalInput label="AUDITOR_ID" type="text" />
        <TerminalInput label="ACCESS_CODE" type="password" />
        <button className="terminal-button" style={{ 
            background: 'transparent', 
            border: '1px solid #00ff88', 
            color: '#00ff88', 
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            fontFamily: 'monospace'
        }}>EXECUTE_LOGIN</button>
      </div>
    </PortalFrame>
  );
}
