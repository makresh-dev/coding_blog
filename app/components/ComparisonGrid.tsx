"use client";

import { useState } from "react";
import CRTFrame from "./CRTFrame";

export default function ComparisonGrid({ concept, visibleLanguages }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className="grid gap-6"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      }}
    >
      {visibleLanguages.map((lang, i) => (
        <CRTFrame
          key={lang}
          lang={lang}
          concept={concept.concept}
          examples={concept.languages[lang].examples}
          active={activeIndex === i}
          index={i}
          setActiveIndex={setActiveIndex}
          total={visibleLanguages.length}
        />
      ))}
    </div>
  );
}
