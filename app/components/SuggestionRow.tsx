// app/components/SuggestionRow.tsx

interface SuggestionRowProps {
  suggestions: string[];
  activeIndex?: number; // which suggestion is currently highlighted
}

export default function SuggestionRow({
  suggestions,
  activeIndex = -1,
}: SuggestionRowProps) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 text-xs mt-2">
      {suggestions.map((s, i) => (
        <span
          key={s}
          className={
            "px-2 py-1 rounded-sm cursor-pointer transition-all " +
            (i === activeIndex
              ? "bg-[#00ff88]/20 text-[#00ffcc] drop-shadow-[0_0_4px_#00ffcc]"
              : "text-[#006644] hover:text-[#00ff88] hover:drop-shadow-[0_0_2px_#00ff88]")
          }
        >
          {s}
        </span>
      ))}
    </div>
  );
}
