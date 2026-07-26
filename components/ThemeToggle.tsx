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
        bottom: "5rem",
        left: "1rem",
        width: "52px",
        height: "28px",
        borderRadius: "14px",
        backgroundColor: isDark ? "var(--color-surface)" : "#e8edf8",
        border: `1px solid ${isDark ? "var(--color-violet)" : "#c8d3eb"}`,
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
      {/* Track */}
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: isDark ? "var(--color-violet)" : "#f59e0b",
          transform: isDark ? "translateX(0)" : "translateX(24px)",
          transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          flexShrink: 0,
        }}
      >
        {isDark ? "🌙" : "☀️"}
      </div>
    </button>
  );
}