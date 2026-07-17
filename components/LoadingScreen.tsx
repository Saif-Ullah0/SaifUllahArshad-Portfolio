"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function LoadingScreen() {
  const { isLoaded, setIsLoaded } = useAppStore();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoaded(true);
            setTimeout(() => setVisible(false), 600);
          }, 200);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [setIsLoaded]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "var(--color-background)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        transition: "opacity 0.6s ease",
        opacity: isLoaded ? 0 : 1,
        pointerEvents: isLoaded ? "none" : "all",
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "2.5rem",
          fontWeight: 700,
          color: "var(--color-text-primary)",
          letterSpacing: "-0.03em",
        }}
      >
        Saif
        <span style={{ color: "var(--color-violet)" }}>.</span>
      </div>

      {/* Progress bar container */}
      <div
        style={{
          width: "200px",
          height: "1px",
          backgroundColor: "var(--color-border)",
          borderRadius: "1px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(to right, var(--color-violet), var(--color-cyan))",
            borderRadius: "1px",
            transition: "width 0.1s ease",
          }}
        />
      </div>

      {/* Progress text */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--color-text-muted)",
          letterSpacing: "0.1em",
        }}
      >
        {Math.round(progress)}%
      </p>
    </div>
  );
}