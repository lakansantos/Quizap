"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

type ThemeMode = "light" | "dark" | "system";

type AccentColor = {
  key: string;
  color: string;
  primary: string;
  primaryDim: string;
};

export const ACCENT_COLORS: AccentColor[] = [
  {key: "purple", color: "#c49aff", primary: "#c49aff", primaryDim: "#9446f9"},
  {key: "cyan", color: "#5df9ef", primary: "#5df9ef", primaryDim: "#2cbdb4"},
  {key: "pink", color: "#ffa1d3", primary: "#ffa1d3", primaryDim: "#e06aad"},
  {key: "green", color: "#4ade80", primary: "#4ade80", primaryDim: "#22c55e"},
  {key: "orange", color: "#fb923c", primary: "#fb923c", primaryDim: "#ea580c"},
];

type ThemeContextType = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  resolvedTheme: "light" | "dark";
  accent: string;
  setAccent: (key: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  resolvedTheme: "dark",
  accent: "purple",
  setAccent: () => {},
});

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyAccent(key: string) {
  const accent = ACCENT_COLORS.find((a) => a.key === key);
  if (!accent || accent.key === "purple") {
    // Purple is the default — remove overrides so CSS :root values apply
    const root = document.documentElement;
    root.style.removeProperty("--color-primary");
    root.style.removeProperty("--color-primary-dim");
    root.style.removeProperty("--color-primary-container");
    root.style.removeProperty("--color-primary-fixed");
    root.style.removeProperty("--color-primary-fixed-dim");
    root.style.removeProperty("--color-surface-tint");
    return;
  }

  const root = document.documentElement;
  root.style.setProperty("--color-primary", accent.primary);
  root.style.setProperty("--color-primary-dim", accent.primaryDim);
  root.style.setProperty("--color-primary-container", accent.primary);
  root.style.setProperty("--color-primary-fixed", accent.primary);
  root.style.setProperty("--color-primary-fixed-dim", accent.primaryDim);
  root.style.setProperty("--color-surface-tint", accent.primary);
}

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [theme, setThemeState] = useState<ThemeMode>("dark");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [accent, setAccentState] = useState("purple");

  // Load saved preferences on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("quizap-theme") as ThemeMode | null;
    if (savedTheme) setThemeState(savedTheme);

    const savedAccent = localStorage.getItem("quizap-accent");
    if (savedAccent) {
      setAccentState(savedAccent);
      applyAccent(savedAccent);
    }
  }, []);

  // Resolve and apply theme
  useEffect(() => {
    const resolved = theme === "system" ? getSystemTheme() : theme;
    setResolvedTheme(resolved);

    const root = document.documentElement;
    if (resolved === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    // Re-apply accent after theme change (theme swap resets CSS vars)
    setTimeout(() => applyAccent(accent), 0);
  }, [theme, accent]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      setResolvedTheme(mq.matches ? "dark" : "light");
      const root = document.documentElement;
      if (mq.matches) {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.add("light");
        root.classList.remove("dark");
      }
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((t: ThemeMode) => {
    setThemeState(t);
    localStorage.setItem("quizap-theme", t);
  }, []);

  const setAccent = useCallback((key: string) => {
    setAccentState(key);
    localStorage.setItem("quizap-accent", key);
    applyAccent(key);
  }, []);

  return (
    <ThemeContext.Provider
      value={{theme, setTheme, resolvedTheme, accent, setAccent}}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
