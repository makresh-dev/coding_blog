"use client";

import { useEffect } from "react";

export function useKeyboardShortcuts({
  onClear,
  onToggleExplorer,
  onCopyActive,
  onEscape,
}: {
  onClear?: () => void;
  onToggleExplorer?: () => void;
  onCopyActive?: () => void;
  onEscape?: () => void;
}) {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.ctrlKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        onClear && onClear();
        return;
      }

      if (e.ctrlKey && e.key.toLowerCase() === "h") {
        e.preventDefault();
        onToggleExplorer && onToggleExplorer();
        return;
      }

      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        onCopyActive && onCopyActive();
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        onEscape && onEscape();
        return;
      }

      // NOTE:
      // ArrowUp/ArrowDown handled inside each CRTFrame
    }

    window.addEventListener("keydown", handler);
    return () =>
      window.removeEventListener("keydown", handler);
  }, [onClear, onToggleExplorer, onCopyActive, onEscape]);
}
