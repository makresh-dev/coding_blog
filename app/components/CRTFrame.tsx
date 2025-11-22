"use client";

import { useState, useRef, useEffect } from "react";
import LanguagePanel from "./LanguagePanel";
import TabBar from "./TabBar";
import CopyButton from "./CopyButton";

export default function CRTFrame({
  lang,
  concept,
  examples = {},
  active,
  index,
  setActiveIndex,
  total,
}) {
  // HARD SANITIZER to strip literal "undefined" coming from any upstream source
  const sanitize = (v: any) =>
    typeof v === "string" ? v.replace(/undefined/g, "") : "";

  const safeExamples = {
    basic: sanitize(examples?.basic),
    advanced: sanitize(examples?.advanced),
    realworld: sanitize(examples?.realworld),
  };

  const availableTabs = Object.keys(safeExamples);
  const [activeTab, setActiveTab] = useState(availableTabs[0] || "basic");

  // ISOLATED PER-CARD TYPING (does not affect other cards)
  const playKey = `${concept}-${lang}-${activeTab}`;

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active && panelRef.current) {
      panelRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [active]);

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
      <CopyButton getText={() => panelRef.current?.innerText || ""} />

      <div className="text-[#00ffcc] mb-3 drop-shadow-[0_0_2px_#00ffcc] truncate">
        ┌─[ {concept.toUpperCase()} — {lang.toUpperCase()} ]──────────────────────────────────────┐
      </div>

      <TabBar tabs={availableTabs} active={activeTab} onChange={setActiveTab} />

      <div className="flex-1 min-h-0 overflow-auto">
        <LanguagePanel
          code={safeExamples[activeTab] ?? ""}   // fully sanitized
          playKey={playKey}                      // card-local typing
        />
      </div>

      <div className="text-[#00ffcc] mt-3 drop-shadow-[0_0_2px_#00ffcc]">
        └──────────────────────────────────────────────────────────────────┘
      </div>
    </div>
  );
}
