"use client";

import { useState, useEffect, useRef } from "react";

interface Props {
  text: string;
  speed?: number;
  playKey: string;     // triggers typing ONLY for this block
}

export default function TypewriterBlock({ text, speed = 50, playKey }: Props) {
  const safe = text ?? "";
  const [display, setDisplay] = useState("");

  const containerRef = useRef<HTMLPreElement>(null);

  // Detect long code → switch to line mode
  const isLong = safe.length > 150;
  const lines = safe.split("\n");

  useEffect(() => {
    setDisplay("");

    // --------------------
    // MODE 1: Line-by-line (fast)
    // --------------------
    if (isLong) {
      let i = 0;
      const interval = setInterval(() => {
        if (i >= lines.length) {
          clearInterval(interval);
          return;
        }

        const nextLine = lines[i] + "\n";
        setDisplay((prev) => (prev + nextLine).replace(/undefined/g, ""));

        i++;

        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, 80);

      return () => clearInterval(interval);
    }

    // --------------------
    // MODE 2: Char-by-char
    // --------------------
    let idx = 0;
    const interval = setInterval(() => {
      if (idx >= safe.length) {
        clearInterval(interval);
        return;
      }

      const nextChar = safe[idx];
      setDisplay((prev) => (prev + nextChar).replace(/undefined/g, ""));
      idx++;

      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, speed);

    return () => clearInterval(interval);

  }, [safe, playKey]);

  return (
    <pre
      ref={containerRef}
      className="whitespace-pre-wrap text-sm text-[#00ff88] leading-relaxed overflow-y-auto"
    >
      {(display ?? "").replace(/undefined/g, "") /* FINAL GUARD */}
    </pre>
  );
}
