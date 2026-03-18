"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

import cn from "@/utils/className";

const ThemeSlider = () => {
  const { theme, setTheme } = useTheme();

  const emptySubscribe = () => () => {};

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) return null;

  const isDark = theme === "dark";

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <div className="top-10 right-5 absolute">
      <button
        onClick={toggleTheme}
        className={cn(
          "relative flex items-center p-1 rounded-full w-16 h-8 transition-all duration-300 cursor-pointer",
          isDark
            ? "bg-secondary border border-white/10"
            : "bg-primary/20 border border-primary/20",
        )}
      >
        <div
          className={cn(
            "absolute shadow-md rounded-full w-6 h-6 transition-all duration-300 transform",
            isDark
              ? "translate-x-7.5 bg-foreground drop-shadow-[0_0_6px_rgba(255,255,255,0.35)]"
              : "translate-x-0 bg-foreground/40 drop-shadow-[0_0_6px_rgba(10,20,40,0.45)]",
          )}
        />

        <Sun
          className={cn(
            "z-10 ml-1 w-4 h-4 transition-all duration-300",
            isDark ? "text-white/40" : "text-white",
          )}
        />

        <Moon
          className={cn(
            "z-10 mr-1 ml-auto w-4 h-4 transition-all duration-300",
            isDark ? "text-background" : "text-foreground/40",
          )}
        />
      </button>
    </div>
  );
};

export default ThemeSlider;
