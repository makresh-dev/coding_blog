"use client";

import { createContext, useContext, useState } from "react";

interface FocusAPI {
  active: number;
  setActive: (i: number) => void;
}

const FocusContext = createContext<FocusAPI>({
  active: 0,
  setActive: () => {},
});

export function FocusProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(0);

  return (
    <FocusContext.Provider value={{ active, setActive }}>
      {children}
    </FocusContext.Provider>
  );
}

export function useFocus() {
  return useContext(FocusContext);
}
