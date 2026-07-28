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

    // Prevent background scrolling while loading screen is active
    document.body.style.overflow = "hidden";

    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;

    // Realistic non-linear progress simulation
    const startTime = performance.now();
    const duration = 1800; // ~1.8 seconds target loading time

    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawRatio = Math.min(1, elapsed / duration);

      // Ease-out cubic curve for natural feel
      const easedProgress = Math.min(100, Math.round((1 - Math.pow(1 - rawRatio, 3)) * 100));

      setProgress(easedProgress);

      // Update descriptive status message
      if (easedProgress < 30) setStageIndex(0);
      else if (easedProgress < 70) setStageIndex(1);
      else if (easedProgress < 98) setStageIndex(2);
      else setStageIndex(3);

      if (rawRatio < 1) {
        animationFrameId = requestAnimationFrame(animateProgress);
      } else {
        // Smooth transition out sequence
        timeoutId = setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => {
            setVisible(false);
            document.body.style.overflow = "";
          }, 700);
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
        backgroundColor: "var(--color-background, #09090b)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        userSelect: "none",
        transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: isLoaded ? 0 : 1,
        transform: isLoaded ? "scale(1.02)" : "scale(1)",
        pointerEvents: isLoaded ? "none" : "all",
        willChange: "opacity, transform",
      }}
    >
      {/* Dynamic Background Radial Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(124, 58, 237, 0.12), transparent 80%)`,
          transition: "background 0.15s ease-out",
          pointerEvents: "none",
        }}
      />

      {/* Main Center Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          position: "relative",
          zIndex: 1,
          maxWidth: "320px",
          width: "100%",
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
              textShadow: "0 0 16px rgba(124, 58, 237, 0.6)",
            }}
          >
            .
          </span>
        </div>

        {/* Progress System */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {/* Progress Bar Container */}
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
            {/* Active Animated Fill */}
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #7c3aed 0%, #06b6d4 100%)",
                borderRadius: "999px",
                transition: "width 0.1s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 0 12px rgba(124, 58, 237, 0.8)",
              }}
            />
          </div>

          {/* Micro Status Meta Info */}
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
  );
}