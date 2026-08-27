"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { crewLogout } from "@/lib/crew-client";
import { useCrewAuthStore } from "@/store/crew-auth.store";

interface Tab {
  label: string;
  href: string;
}

interface DashboardShellProps {
  tabs: Tab[];
}

export default function DashboardShell({ tabs }: DashboardShellProps) {
  const router = useRouter();
  const { email } = useCrewAuthStore();
  const { crewHandle } = useCrewAuthStore();
  const [open, setOpen] = useState(true);
  const clearAuth = useCrewAuthStore((s) => s.clearAuth);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "crew shell v1.0 — type 'help' for commands",
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const print = (line: string | string[]) => {
    setHistory((h) => [...h, ...(Array.isArray(line) ? line : [line])]);
  };

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    print(`$ ${trimmed}`);
    setCmdHistory((h) => [...h, trimmed]);
    setCmdIndex(-1);

    const [cmd, ...args] = trimmed.split(/\s+/);

    switch (cmd) {
      case "help":
        print([
          "available commands:",
          "  ls [-a]          list pages (and hidden files with -a)",
          "  cd <page>         navigate to a page",
          "  open <page>       alias for cd",
          "  cat <file>        read a file",
          "  whoami            show your crew profile",
          "  clear             clear this shell",
          " logout            log out of the crew portal",
        ]);
        break;

      case "ls": {
        const showHidden = args.includes("-a");
        const visible = tabs.map((t) => t.label);
        // Hidden entries — placeholder for later OSINT breadcrumb wiring.
        // Actual content/gating to be built later; this just proves the surface.
        const hidden = showHidden ? [".breadcrumb"] : [];
        print([visible.join("  "), ...hidden].filter(Boolean));
        break;
      }

      case "cd":
      case "open": {
        const target = args[0]?.toLowerCase();
        const tab = tabs.find((t) => t.label === target);
        if (tab) {
          router.push(tab.href);
          print(`→ ${tab.href}`);
        } else {
          print(`cd: no such page: ${target ?? ""}`);
        }
        break;
      }

      case "cat": {
        const file = args[0];
        if (file === ".breadcrumb") {
          // TODO: wire to real OSINT breadcrumb content later
          print("[locked] — nothing here yet.");
        } else {
          print(`cat: ${file ?? "(no file given)"}: No such file`);
        }
        break;
      }

      case "whoami":
        // TODO: pull from real lore_players session once auth is wired
        print(
          crewHandle
            ? `crew: ${crewHandle}`
            : "identity unresolved — try logging in again",
        );
        break;

      case "clear":
        setHistory([]);
        break;

      case "logout":
        print("terminating session...");
        crewLogout().then(() => {
          clearAuth();
          router.push("/portal/login");
        });
        break;

      default:
        print(`command not found: ${cmd}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex =
        cmdIndex === -1 ? cmdHistory.length - 1 : Math.max(0, cmdIndex - 1);
      setCmdIndex(nextIndex);
      setInput(cmdHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIndex === -1) return;
      const nextIndex = cmdIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setCmdIndex(-1);
        setInput("");
      } else {
        setCmdIndex(nextIndex);
        setInput(cmdHistory[nextIndex]);
      }
    }
  };

  return (
    <div className="border-t border-[#4ade80]/40 bg-[#050505]/95 font-mono text-[#4ade80]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full px-4 py-2 text-left text-sm tracking-widest text-[#4ade80]"
      >
        {open ? "▾ shell" : "▸ shell"}
      </button>

      {open && (
        <div
          className="flex flex-col px-4 pb-3"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="max-h-48 overflow-y-auto text-base leading-relaxed text-[#4ade80] text-glow-strong">
            {history.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap text-[#4ade80]">
                {line}
              </div>
            ))}
            <div ref={logEndRef} />
          </div>

          <div className="mt-2 flex items-center gap-2 text-base text-[#4ade80]">
            <span>$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck={false}
              className="flex-1 bg-transparent text-base text-[#4ade80] outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
