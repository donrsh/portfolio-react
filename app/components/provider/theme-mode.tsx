import { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "dark" | "light" | "system";

type ThemeModeProviderProps = {
  children: React.ReactNode;
  defaultThemeMode?: ThemeMode;
  storageKey?: string;
};

type ThemeModeProviderState = {
  themeMode: ThemeMode;
  setThemeMode: (themeMode: ThemeMode) => void;
};

const initialState: ThemeModeProviderState = {
  themeMode: "system",
  setThemeMode: () => null,
};

const ThemeModeProviderContext =
  createContext<ThemeModeProviderState>(initialState);

export function ThemeModeProvider({
  children,
  defaultThemeMode = "system",
  storageKey = "ui-theme-mode",
  ...props
}: ThemeModeProviderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    () => (localStorage.getItem(storageKey) as ThemeMode) || defaultThemeMode
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (themeMode === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(themeMode);
  }, [themeMode]);

  const value = {
    themeMode,
    setThemeMode: (themeMode: ThemeMode) => {
      localStorage.setItem(storageKey, themeMode);
      setThemeMode(themeMode);
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
