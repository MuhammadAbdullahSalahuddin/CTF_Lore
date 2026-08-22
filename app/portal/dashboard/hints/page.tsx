"use client";

const BREADCRUMBS = [
  {
    id: "01",
    title: "the old onboarding paperwork",
    body: "someone mentioned IT never cleaned up the provisioning docs after the last audit. worth digging.",
    locked: false,
  },
  {
    id: "02",
    title: "the leak everyone's forgotten about",
    body: "IT posted something to the leak mirror again. probably still findable if you know where to look.",
    locked: false,
  },
  {
    id: "03",
    title: "???",
    body: "[locked] — nothing here yet.",
    locked: true,
  },
];

export default function HintsPage() {
  return (
    <div className="mx-auto max-w-2xl font-terminal text-[#4ade80]">
      <h1 className="mb-2 text-2xl tracking-widest">// HINTS_INTEL</h1>
      <p className="mb-8 text-sm text-[#4ade80]/50">
        case board — not a walkthrough. follow the thread yourself.
      </p>

      <div className="space-y-4">
        {BREADCRUMBS.map((b) => (
          <div
            key={b.id}
            className={`border p-4 ${
              b.locked
                ? "border-[#4ade80]/15 text-[#4ade80]/30"
                : "border-[#4ade80]/30 text-[#4ade80]"
            }`}
          >
            <div className="mb-1 flex items-center gap-3 text-xs tracking-widest text-[#4ade80]/50">
              <span>#{b.id}</span>
              {b.locked && <span>[LOCKED]</span>}
            </div>
            <div className="mb-1 text-lg">{b.title}</div>
            <div className="text-sm text-[#4ade80]/70">{b.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
