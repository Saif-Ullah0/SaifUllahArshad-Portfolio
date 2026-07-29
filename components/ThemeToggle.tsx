"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setIsDark(false);
      document.documentElement.setAttribute("data-theme", "light");
    } else if (!saved) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
      if (!prefersDark) {
        document.documentElement.setAttribute("data-theme", "light");
      }
    }
  }, []);

  const toggle = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "1.5rem",
        width: "54px",
        height: "30px",
        borderRadius: "15px",
        backgroundColor: isDark ? "var(--color-surface, #121218)" : "#e8edf8",
        border: `1px solid ${isDark ? "var(--color-violet, #7c3aed)" : "#c8d3eb"}`,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        padding: "3px",
        zIndex: 500,
        transition: "all 0.3s ease",
        boxShadow: isDark
          ? "0 0 12px rgba(124, 58, 237, 0.3)"
          : "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          backgroundColor: isDark ? "var(--color-violet, #7c3aed)" : "#f59e0b",
          transform: isDark ? "translateX(0)" : "translateX(24px)",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          flexShrink: 0,
        }}
      >
        {isDark ? "🌙" : "☀️"}
      </div>
    </button>
  );
}