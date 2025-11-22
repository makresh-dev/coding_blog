"use client";

import { useState } from "react";

export default function CopyButton({ getText }: { getText: () => string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const text = getText();
    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => setCopied(false), 900);
  }

  return (
    <button
      onClick={handleCopy}
      className={
        "absolute top-2 right-2 text-xs px-2 py-1 rounded-sm transition-all " +
        (copied
          ? "text-black bg-[#00ffcc] drop-shadow-[0_0_6px_#00ffcc]"
          : "text-[#00ffcc] border border-[#00ffcc]/40 hover:bg-[#00ffcc]/20 hover:drop-shadow-[0_0_4px_#00ffcc]")
      }
    >
      {copied ? "COPIED" : "COPY"}
    </button>
  );
}
