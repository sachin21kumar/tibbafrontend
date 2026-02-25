"use client";

import { createContext, useContext } from "react";

type TranslationContextType = {
  locale: string;
  dict: any;
};

const TranslationContext = createContext<TranslationContextType | null>(null);

export function TranslationProvider({
  children,
  locale,
  dict,
}: {
  children: React.ReactNode;
  locale: string;
  dict: any;
}) {
  return (
    <TranslationContext.Provider value={{ locale, dict }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error("useTranslations must be used inside TranslationProvider");
  }

  // translation helper
  const t = (path: string, vars?: Record<string, string>) => {
  const keys = path.split(".");
  let value: any = context.dict;

  for (const key of keys) {
    value = value?.[key];
  }

  if (!value) return path;

  // interpolation {{variable}}
  if (vars && typeof value === "string") {
    Object.entries(vars).forEach(([k, v]) => {
      const regex = new RegExp(`{{\\s*${k}\\s*}}`, "g");
      value = value.replace(regex, v);
    });
  }

  return value;
};

  return { t, locale: context.locale };
}