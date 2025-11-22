"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface PromptEngineOptions {
  concepts: string[];
}

export function usePromptEngine({ concepts }: PromptEngineOptions) {
  const router = useRouter();

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [active, setActive] = useState(-1);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // ----------------------------------------------------
  // FUZZY MATCH LOGIC
  // ----------------------------------------------------
  function fuzzyMatch(str: string, query: string): boolean {
    str = str.toLowerCase();
    query = query.toLowerCase();
    let i = 0;
    for (let char of query) {
      i = str.indexOf(char, i);
      if (i === -1) return false;
      i++;
    }
    return true;
  }

  // ----------------------------------------------------
  // UPDATE SUGGESTIONS WHEN TYPING
  // ----------------------------------------------------
  useEffect(() => {
    if (!value.trim()) {
      setSuggestions([]);
      setActive(-1);
      return;
    }

    const matches = concepts.filter((c) => fuzzyMatch(c, value));
    setSuggestions(matches.slice(0, 6)); // show top 6
    setActive(0);
  }, [value, concepts]);

  // ----------------------------------------------------
  // HANDLE KEY EVENTS
  // ----------------------------------------------------
  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    // ENTER → choose active suggestion
    if (e.key === "Enter") {
      e.preventDefault();

      let target = value.trim();
      if (active !== -1 && suggestions.length > 0) {
        target = suggestions[active];
      }

      if (target !== "") {
        router.push(`/concept/${target}`);
        setHistory([target, ...history]);
        setHistoryIndex(-1);
      }

      return;
    }

    // TAB → autocomplete to active suggestion
    if (e.key === "Tab") {
      e.preventDefault();
      if (active !== -1 && suggestions.length > 0) {
        setValue(suggestions[active]);
      }
      return;
    }

    // ↑ → previous suggestion
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setActive((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
      }
      return;
    }

    // ↓ → next suggestion
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setActive((prev) => (prev >= suggestions.length - 1 ? 0 : prev + 1));
      }
      return;
    }

    // ↑/↓ for command history (when no suggestions are shown)
    if (value.trim() === "") {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setValue(history[nextIndex]);
          setHistoryIndex(nextIndex);
        }
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = historyIndex - 1;
        if (nextIndex >= 0) {
          setValue(history[nextIndex]);
          setHistoryIndex(nextIndex);
        } else {
          setValue("");
          setHistoryIndex(-1);
        }
        return;
      }
    }
  }

  return {
    value,
    setValue,
    onKey,
    onChange: (e: any) => setValue(e.target.value),
    suggestions,
    active,
  };
}
