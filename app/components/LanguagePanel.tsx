"use client";

import TypewriterBlock from "./TypewriterBlock";

export default function LanguagePanel({
  code,
  playKey,
}: {
  code: string;
  playKey: string;
}) {
  return (
    <TypewriterBlock
      text={code ?? ""}          // never allow undefined
      playKey={playKey}          // isolated per-card
      speed={50}                 // fast CRT typing
    />
  );
}
