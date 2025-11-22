// app/components/Explorer.tsx
// SERVER COMPONENT — static concept explorer in CRT theme

import Link from "next/link";

interface ExplorerProps {
  concepts: string[];       // passed from loadAllConcepts()
  active?: string;          // current concept name
}

export default function Explorer({ concepts, active }: ExplorerProps) {
  return (
    <div className="border border-[#00ff88]/40 w-full p-3 bg-black/40 backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,150,0.15)] text-sm">
      {/* Header */}
      <div className="text-[#00ffcc] mb-3 drop-shadow-[0_0_2px_#00ffcc]">
        ┌─[ CONCEPTS ]─────────────────────────┐
      </div>

      {/* List */}
      <ul className="space-y-1">
        {concepts.map((c) => {
          const isActive = active === c;

          return (
            <li key={c}>
              <Link
                href={`/concept/${c}`}
                className={
                  "block px-2 py-1 rounded-sm transition-all truncate " +
                  (isActive
                    ? "bg-[#00ff88]/20 text-[#00ffcc] drop-shadow-[0_0_4px_#00ffcc]"
                    : "text-[#006644] hover:text-[#00ff88] hover:drop-shadow-[0_0_2px_#00ff88]")
                }
              >
                {c}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer Border */}
      <div className="text-[#00ffcc] mt-3 drop-shadow-[0_0_2px_#00ffcc]">
        └─────────────────────────┘
      </div>
    </div>
  );
}
