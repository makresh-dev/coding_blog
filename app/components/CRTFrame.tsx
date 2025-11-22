"use client";

import { useState, useRef, useEffect } from "react";
import LanguagePanel from "./LanguagePanel";
import TabBar from "./TabBar";
import CopyButton from "./CopyButton";

interface CRTFrameProps {
  lang: string;
  concept: string;
  examples?: {
    basic?: string;
    advanced?: string;
    realworld?: string;
  };
  active: boolean;
  index: number;
  setActiveIndex: (i: number) => void;
  total: number;
}

export default function CRTFrame({
  lang,
  concept,
  examples = {},           // SAFE DEFAULT
  active,
  index,
  setActiveIndex,
  total,
}: CRTFrameProps) {
  const safeExamples = examples || {};   // ensure never undefined
  const availableTabs = Object.keys(safeExamples);

  const [activeTab, setActiveTab] = useState(availableTabs[0] || "");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active && panelRef.current) {
      panelRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [active]);

  function onKeyDown(e: KeyboardEvent) {
    if (!active) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((index + 1) % total);
    }
    if (e.key === "ArrowUp") {
      setActiveIndex((index - 1 + total) % total);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div
      ref={panelRef}
      className={
        "relative border p-5 flex flex-col h-full bg-black/40 backdrop-blur-sm transition-all " +
        (active
          ? "border-[#00ffcc] shadow-[0_0_25px_rgba(0,255,200,0.3)]"
          : "border-[#00ff88]/40 shadow-[0_0_10px_rgba(0,255,150,0.1)]")
      }
      onClick={() => setActiveIndex(index)}
    >
      <CopyButton getText={() => panelRef.current?.innerText || ""} /><br/>
      <div className="text-[#00ffcc] mb-3 drop-shadow-[0_0_2px_#00ffcc] truncate">
        ┌─[ {concept.toUpperCase()} — {lang.toUpperCase()} ]────────┐
      </div>

      {availableTabs.length > 0 && (
        <TabBar tabs={availableTabs} active={activeTab} onChange={setActiveTab} />
      )}

      <div className="flex-1">
        <LanguagePanel code={safeExamples[activeTab] || ""} />
      </div>

      <div className="text-[#00ffcc] mt-3 drop-shadow-[0_0_2px_#00ffcc]">
        └─────────────────────────────────────────┘
      </div>
    </div>
  );
}
