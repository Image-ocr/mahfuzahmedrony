import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

export type Theme = "dark" | "light" | "red";

interface ThemeContextValue {
  theme: Theme;
  cycleTheme: () => void;
  setTheme: (t: Theme) => void;
  /** Back-compat alias for older callers */
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const ORDER: Theme[] = ["dark", "light", "red"];

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored && ORDER.includes(stored)) return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark", "red");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const cycleTheme = useCallback(() => {
    setThemeState((t) => ORDER[(ORDER.indexOf(t) + 1) % ORDER.length]);
  }, []);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);

  return (
    <ThemeContext.Provider value={{ theme, cycleTheme, setTheme, toggleTheme: cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
