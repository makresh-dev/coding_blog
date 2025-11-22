// app/components/StatusBar.tsx

export default function StatusBar() {
  const shortcuts = [
    { k: "Ctrl+L", v: "clear screen" },
    { k: "Tab", v: "autocomplete" },
    { k: "↑/↓", v: "history" },
    { k: "Ctrl+H", v: "toggle explorer" },
    { k: "Shift+Enter", v: "new line" },
  ];

  return (
    <div className="w-full mt-8 text-xs border-t border-[#00ff88]/20 pt-3 flex flex-wrap gap-x-6 gap-y-2 text-[#006644]">
      {shortcuts.map((s) => (
        <span key={s.k} className="flex items-center gap-2">
          <span className="text-[#00ff88] drop-shadow-[0_0_2px_#00ff88]">
            {s.k}
          </span>
          <span className="text-[#006644]">{s.v}</span>
        </span>
      ))}
    </div>
  );
}
