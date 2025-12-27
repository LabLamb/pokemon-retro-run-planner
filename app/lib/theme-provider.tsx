import { createContext, useContext, useEffect, useState } from "react";

type Theme = "fire-red" | "leaf-green" | "gb" | "gbc" | "gba";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "fire-red",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "fire-red",
  storageKey = "pokemon-planner-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if we're in browser environment
    if (typeof window === "undefined") {
      return defaultTheme;
    }
    
    // Try to get theme from localStorage
    const stored = localStorage.getItem(storageKey) as Theme | null;
    if (stored && ["fire-red", "leaf-green", "gb", "gbc", "gba"].includes(stored)) {
      return stored;
    }
    
    // Fall back to browser preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "leaf-green";
    }
    
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("fire-red", "leaf-green", "gb", "gbc", "gba");
    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
