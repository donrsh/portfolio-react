import { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "dark" | "light";

type ThemeModeProviderProps = {
  children: React.ReactNode;
  defaultThemeMode?: ThemeMode;
  storageKey?: string;
};

type ThemeModeProviderState = {
  themeMode: ThemeMode;
  setThemeMode: (themeMode: ThemeMode) => void;
  toggleThemeMode: () => void;
};

const getDefaultThemeMode = (): ThemeMode => {
  if (typeof window === "undefined") return "light";

  const themeMode = localStorage.getItem("ui-theme-mode") as ThemeMode,
    systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  return themeMode ?? systemTheme ?? "light";
};

const initialState: ThemeModeProviderState = {
  themeMode: getDefaultThemeMode(),
  setThemeMode: () => null,
  toggleThemeMode: () => null,
};

const ThemeModeProviderContext =
  createContext<ThemeModeProviderState>(initialState);

export function ThemeModeProvider({
  children,
  defaultThemeMode = getDefaultThemeMode(),
  storageKey = "ui-theme-mode",
  ...props
}: ThemeModeProviderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    () => (localStorage.getItem(storageKey) as ThemeMode) || defaultThemeMode
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(themeMode);
    localStorage.setItem(storageKey, themeMode);
  }, [themeMode]);

  const value = {
    themeMode,
    setThemeMode: (themeMode: ThemeMode) => {
      localStorage.setItem(storageKey, themeMode);
      setThemeMode(themeMode);
    },
    toggleThemeMode: () => {
      setThemeMode((themeMode) => (themeMode === "light" ? "dark" : "light"));
    },
  };

  return (
    <ThemeModeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeModeProviderContext.Provider>
  );
}

export const useThemeMode = () => {
  const context = useContext(ThemeModeProviderContext);

  if (context === undefined)
    throw new Error("useThemeMode must be used within a ThemeModeProvider");

  return context;
};
