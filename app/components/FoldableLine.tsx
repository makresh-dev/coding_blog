"use client";

import { useState } from "react";

interface FoldableLineProps {
  header: string;
  body: string[];
}

export default function FoldableLine({ header, body }: FoldableLineProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer text-[#00ffcc] drop-shadow-[0_0_3px_#00ffcc]"
      >
        {open ? "▼" : "▶"} {header}
      </div>

      {open && (
        <div className="pl-6 mt-1 space-y-0.5 animate-[fadeIn_0.3s_ease-out]">
          {body.map((line, i) => (
            <div key={i} className="text-[#00ff88]">
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
