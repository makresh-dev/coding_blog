"use client";

import FoldableLine from "./FoldableLine";

interface LanguagePanelProps {
  code: string;
}

export default function LanguagePanel({ code }: LanguagePanelProps) {
  const rawLines = code.split("\n");

  const processed: any[] = [];
  let buffer: string[] = [];
  let header = "";
  let inFold = false;

  for (let line of rawLines) {
    const trimmed = line.trim();

    if (trimmed.match(/^(#|\/\/|\/\*)\s*region/)) {
      inFold = true;
      header = line.replace(/^(#|\/\/|\/\*)\s*region/, "").trim() || "fold";
      buffer = [];
      continue;
    }

    if (trimmed.match(/^(#|\/\/|\/\*)\s*endregion/)) {
      inFold = false;
      processed.push({
        type: "fold",
        header,
        body: buffer.slice(),
      });
      continue;
    }

    if (inFold) {
      buffer.push(line);
    } else {
      processed.push({ type: "line", text: line });
    }
  }

  return (
    <pre className="text-sm leading-relaxed whitespace-pre-wrap text-[#00ff88]">
      {processed.map((item, i) => {
        if (item.type === "line") {
          return (
            <div key={i} className="flex">
              <span className="flex-1">{item.text}</span>
            </div>
          );
        }

        if (item.type === "fold") {
          return (
            <FoldableLine
              key={i}
              header={item.header}
              body={item.body}
            />
          );
        }
      })}
    </pre>
  );
}
