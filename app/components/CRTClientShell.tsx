"use client";

import { useState } from "react";
import { useKeyboardShortcuts } from "@/app/components/useKeyboardShorcuts";

export default function CRTClientShell({ children }) {
  const [explorerOpen, setExplorerOpen] = useState(true);

  useKeyboardShortcuts({
    onClear: () => window.location.reload(),
    onToggleExplorer: () => setExplorerOpen((o) => !o),
    onCopyActive: () => {
      const activeEl = document.querySelector(".crt-active-code");
      if (activeEl) {
        navigator.clipboard.writeText(activeEl.textContent || "");
      }
    },
    onEscape: () => {
      const input = document.querySelector("input");
      if (input instanceof HTMLInputElement) input.blur();
    },
  });

  return (
    <div className="flex w-full min-h-screen">
      {/* Explorer handled by individual pages */}
      {children}
    </div>
  );
}
