"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

type ThemeProviderProps = {
  children?: ReactNode;
  attribute?: "class";
  defaultTheme?: Theme;
};

type ThemeContextValue = {
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
  setThemeWithTransition: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "theme";

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return defaultTheme;
    }

    const storedTheme = window.localStorage.getItem(STORAGE_KEY);

    if (storedTheme === "dark" || storedTheme === "light") {
      return storedTheme;
    }

    return defaultTheme;
  });

  const isTransitioning = useRef(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
  }, []);

  const setThemeWithTransition = useCallback(
    (nextTheme: Theme) => {
      // Guard against rapid clicks while an animation is in progress
      if (isTransitioning.current) return;

      // Fallback for browsers without View Transitions API
      if (
        typeof document === "undefined" ||
        !("startViewTransition" in document)
      ) {
        setThemeState(nextTheme);
        return;
      }

      isTransitioning.current = true;

      // Calculate the maximum radius needed to cover the entire viewport
      // from the top-left corner (0, 0) → diagonal to bottom-right
      const maxRadius = Math.hypot(
        window.innerWidth,
        window.innerHeight
      );

      // Store the computed radius on <html> so the CSS animation can read it
      document.documentElement.style.setProperty(
        "--theme-transition-radius",
        `${maxRadius}px`
      );

      const transition = (document as any).startViewTransition(() => {
        setThemeState(nextTheme);
      });

      transition.ready
        .then(() => {
          // Animate the NEW view's ::view-transition-new pseudo-element
          // with an expanding circle clip-path from the top-left corner
          document.documentElement.animate(
            {
              clipPath: [
                "circle(0px at 0px 0px)",
                `circle(${maxRadius}px at 0px 0px)`,
              ],
            },
            {
              duration: 1000,
              easing: "cubic-bezier(0.4, 0, 0.2, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(() => {
          // Transition was skipped (e.g. reduced motion) — that's fine
        });

      transition.finished
        .then(() => {
          isTransitioning.current = false;
        })
        .catch(() => {
          isTransitioning.current = false;
        });
    },
    []
  );

  const value = useMemo(
    () => ({
      resolvedTheme: theme,
      setTheme,
      setThemeWithTransition,
    }),
    [setTheme, setThemeWithTransition, theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
