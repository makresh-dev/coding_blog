"use client";

import { usePromptEngine } from "./usePromptEngine";
import SuggestionRow from "./SuggestionRow";

export default function Prompt({ concepts }) {
  const { value, onChange, onKey, suggestions, active } =
    usePromptEngine({ concepts });

  return (
    <div>
      {/* Prompt */}
      <div className="flex items-center text-lg">
        <span className="crt-cursor text-[#00ffcc]">▉</span>
        <input
          className="bg-transparent flex-1 outline-none text-[#00ff88] placeholder-[#006644]"
          placeholder="type a search term"
          value={value}
          onChange={onChange}
          onKeyDown={onKey}
        />
      </div>

      {/* Suggestions */}
      <SuggestionRow suggestions={suggestions} activeIndex={active} />
    </div>
  );
}
