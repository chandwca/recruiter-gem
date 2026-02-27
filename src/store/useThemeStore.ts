import { create } from "zustand";

interface ThemeStore {
  isDark: boolean;
  toggle: () => void;
}

const getInitialTheme = (): boolean => {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("theme");
  if (stored) return stored === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  isDark: getInitialTheme(),
  toggle: () =>
    set((state) => {
      const next = !state.isDark;
      localStorage.setItem("theme", next ? "dark" : "light");
      document.documentElement.classList.toggle("dark", next);
      return { isDark: next };
    }),
}));

// Initialize on load
if (typeof window !== "undefined") {
  const isDark = getInitialTheme();
  document.documentElement.classList.toggle("dark", isDark);
}
