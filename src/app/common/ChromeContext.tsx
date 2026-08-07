"use client";

import { createContext, useContext, useState, useCallback } from "react";

type ChromeContextType = {
  hidden: boolean;
  hideChrome: () => void;
  showChrome: () => void;
};

const ChromeContext = createContext<ChromeContextType | null>(null);

export function ChromeProvider({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);

  const hideChrome = useCallback(() => setHidden(true), []);
  const showChrome = useCallback(() => setHidden(false), []);

  return (
    <ChromeContext.Provider value={{ hidden, hideChrome, showChrome }}>
      {children}
    </ChromeContext.Provider>
  );
}

export function useChrome() {
  const context = useContext(ChromeContext);

  if (!context) {
    throw new Error("useChrome must be used inside ChromeProvider");
  }

  return context;
}
