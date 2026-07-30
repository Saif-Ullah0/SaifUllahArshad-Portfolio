"use client";

import { useEffect, useState, useRef } from "react";
import { useAppStore } from "@/store/useAppStore";

const STAGE_LABELS = [
  "INITIALIZING SYSTEM",
  "LOADING ASSETS",
  "PREPARING COMPONENT TREE",
  "READY",
];

export default function LoadingScreen() {
  const { isLoaded, setIsLoaded } = useAppStore();
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Prevent SSR/Hydration Mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track cursor position for subtle dynamic lighting
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  useEffect(() => {
    if (!mounted) return;

    document.body.style.overflow = "hidden";

    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;

    const startTime = performance.now();
    const duration = 1800; // ~1.8 seconds target loading time

    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawRatio = Math.min(1, elapsed / duration);

      const easedProgress = Math.min(100, Math.round((1 - Math.pow(1 - rawRatio, 3)) * 100));

      setProgress(easedProgress);

      if (easedProgress < 30) setStageIndex(0);
      else if (easedProgress < 70) setStageIndex(1);
      else if (easedProgress < 98) setStageIndex(2);
      else setStageIndex(3);

      if (rawRatio < 1) {
        animationFrameId = requestAnimationFrame(animateProgress);
      } else {
        timeoutId = setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => {
            setVisible(false);
            document.body.style.overflow = "";
          }, 850);
        }, 200);
      }
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (timeoutId) clearTimeout(timeoutId);
      document.body.style.overflow = "";
    };
  }, [mounted, setIsLoaded]);

  if (!mounted || !visible) return null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflow: "hidden",
        pointerEvents: isLoaded ? "none" : "all",
        userSelect: "none",
      }}
    >
      {/* --- LEFT CURTAIN PANEL --- */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "50%",
          backgroundColor: "var(--color-background, #09090b)",
          transform: isLoaded ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)",
          willChange: "transform",
        }}
      />

      {/* --- RIGHT CURTAIN PANEL --- */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "50%",
          backgroundColor: "var(--color-background, #09090b)",
          transform: isLoaded ? "translateX(100%)" : "translateX(0)",
          transition: "transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)",
          willChange: "transform",
        }}
      />

      {/* --- CENTER GLOW LINE (FADES IN ONLY DURING OPENING REVEAL) --- */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          width: "2px",
          transform: "translateX(-50%)",
          background: "linear-gradient(180deg, transparent, #7c3aed, #06b6d4, transparent)",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.25s ease",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      {/* --- INTERACTIVE CURSOR LIGHTING --- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(124, 58, 237, 0.18), transparent 80%)`,
          transition: "background 0.15s ease-out",
          pointerEvents: "none",
          opacity: isLoaded ? 0 : 1,
        }}
      />

      {/* --- CENTER CONTENT (LOGO & PROGRESS) --- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 20,
          opacity: isLoaded ? 0 : 1,
          transform: isLoaded ? "scale(0.9) translateY(-20px)" : "scale(1) translateY(0)",
          transition: "opacity 0.35s ease-out, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: isLoaded ? "none" : "all",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
            maxWidth: "320px",
            width: "100%",
            padding: "0 1rem",
          }}
        >
          {/* Brand Mark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "2.75rem",
              fontWeight: 800,
              color: "var(--color-text-primary, #ffffff)",
              letterSpacing: "-0.04em",
            }}
          >
            <span>Saif</span>
            <span
              style={{
                color: "var(--color-violet, #7c3aed)",
                textShadow: "0 0 16px rgba(124, 58, 237, 0.8)",
              }}
            >
              .
            </span>
          </div>

          {/* Progress System */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Loading page assets"
              style={{
                width: "100%",
                height: "2px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderRadius: "999px",
                overflow: "hidden",
                position: "relative",
                backdropFilter: "blur(4px)",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #7c3aed 0%, #06b6d4 100%)",
                  borderRadius: "999px",
                  transition: "width 0.1s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: "0 0 14px rgba(124, 58, 237, 0.9)",
                }}
              />
            </div>

            {/* Micro Metadata */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.7rem",
                color: "var(--color-text-muted, #71717a)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    backgroundColor: progress === 100 ? "#10b981" : "#7c3aed",
                    boxShadow: progress === 100 ? "0 0 8px #10b981" : "0 0 8px #7c3aed",
                    transition: "background-color 0.3s ease",
                  }}
                />
                {STAGE_LABELS[stageIndex]}
              </span>

              <span style={{ fontWeight: 600, color: "var(--color-text-secondary, #a1a1aa)" }}>
                {String(progress).padStart(3, "0")}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}