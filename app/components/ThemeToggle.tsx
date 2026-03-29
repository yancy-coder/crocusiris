"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark, mounted]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
          : "linear-gradient(135deg, #87CEEB 0%, #E0F6FF 100%)",
      }}
      aria-label={isDark ? "切换到亮色模式" : "切换到暗色模式"}
      suppressHydrationWarning
    >
      {/* 背景星星/云朵装饰 */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        {isDark ? (
          // 星星
          <>
            <span className="absolute top-1 left-2 w-0.5 h-0.5 bg-white rounded-full animate-pulse" />
            <span
              className="absolute top-2 left-5 w-0.5 h-0.5 bg-white rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <span
              className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </>
        ) : (
          // 云朵
          <>
            <span className="absolute top-1 right-3 w-3 h-1.5 bg-white/40 rounded-full" />
            <span className="absolute top-2 right-2 w-2 h-1 bg-white/30 rounded-full" />
          </>
        )}
      </div>

      {/* 滑块 */}
      <div
        className={`
          absolute top-0.5 w-6 h-6 rounded-full shadow-lg
          transition-all duration-300 ease-spring
          flex items-center justify-center
          ${isDark ? "left-0.5" : "left-7"}
        `}
        style={{
          background: isDark
            ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
            : "linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)",
          boxShadow: isDark
            ? "0 2px 8px rgba(251, 191, 36, 0.4), inset 0 -2px 4px rgba(0,0,0,0.2)"
            : "0 2px 8px rgba(251, 191, 36, 0.3), inset 0 -2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-amber-900" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-600" />
        )}
      </div>
    </button>
  );
}
