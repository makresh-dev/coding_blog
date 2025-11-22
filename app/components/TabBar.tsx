"use client";

interface TabBarProps {
  tabs: string[];
  active: string;
  onChange: (t: string) => void;
}

export default function TabBar({ tabs, active, onChange }: TabBarProps) {
  return (
    <div className="flex gap-4 text-xs mb-3 border-b border-[#00ff88]/30 pb-1">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={
            "uppercase tracking-widest transition-all " +
            (active === t
              ? "text-[#00ffcc] drop-shadow-[0_0_4px_#00ffcc]"
              : "text-[#006644] hover:text-[#00ff88] hover:drop-shadow-[0_0_2px_#00ff88]")
          }
        >
          {t}
        </button>
      ))}
    </div>
  );
}
