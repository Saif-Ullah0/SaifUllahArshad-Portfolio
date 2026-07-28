"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const clickWaveRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check for touch support reliably on client side
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const clickWave = clickWaveRef.current;

    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Hardware-accelerated direct positioning for inner dot
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const onMouseDown = () => {
      setIsClicked(true);
      if (clickWave) {
        clickWave.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(0.2)`;
        clickWave.style.opacity = "1";
        
        // Trigger ripple expansion
        setTimeout(() => {
          clickWave.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(2.2)`;
          clickWave.style.opacity = "0";
        }, 10);
      }
    };

    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Smooth animation loop for trailing outer ring
    const render = () => {
      // Smooth LERP factor (0.18 for tight fluid feel)
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) ${
        isClicked ? "scale(0.85)" : isHovered ? "scale(1.75)" : "scale(1)"
      }`;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Smart detector for interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.getAttribute("role") === "button" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovered(isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isHovered, isClicked]);

  if (isTouchDevice) return null;

  return (
    <>
      <style>{`
        @keyframes ringSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* 1. Core Dot (Instant Hardware Accelerated Follower) */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHovered ? "8px" : "6px",
          height: isHovered ? "8px" : "6px",
          borderRadius: "50%",
          backgroundColor: isHovered ? "var(--color-cyan, #06b6d4)" : "var(--color-violet, #7c3aed)",
          boxShadow: isHovered
            ? "0 0 12px var(--color-cyan, #06b6d4), 0 0 20px var(--color-cyan, #06b6d4)"
            : "0 0 8px var(--color-violet, #7c3aed)",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: "width 0.2s ease, height 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
          willChange: "transform",
        }}
      />

      {/* 2. Outer Lagging Reticle Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          border: `1.5px ${isHovered ? "solid" : "dashed"} ${
            isHovered ? "var(--color-cyan, #06b6d4)" : "rgba(124, 58, 237, 0.6)"
          }`,
          backgroundColor: isHovered ? "rgba(6, 182, 212, 0.08)" : "transparent",
          backdropFilter: isHovered ? "blur(2px)" : "none",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: isVisible ? 0.85 : 0,
          transition: "border 0.2s ease, background-color 0.2s ease, opacity 0.2s ease",
          willChange: "transform",
        }}
      >
        {/* HUD Crosshair Corner Accents on Hover */}
        {isHovered && (
          <>
            <div style={{ position: "absolute", top: "-3px", left: "50%", transform: "translateX(-50%)", width: "2px", height: "5px", backgroundColor: "var(--color-cyan, #06b6d4)" }} />
            <div style={{ position: "absolute", bottom: "-3px", left: "50%", transform: "translateX(-50%)", width: "2px", height: "5px", backgroundColor: "var(--color-cyan, #06b6d4)" }} />
            <div style={{ position: "absolute", left: "-3px", top: "50%", transform: "translateY(-50%)", width: "5px", height: "2px", backgroundColor: "var(--color-cyan, #06b6d4)" }} />
            <div style={{ position: "absolute", right: "-3px", top: "50%", transform: "translateY(-50%)", width: "5px", height: "2px", backgroundColor: "var(--color-cyan, #06b6d4)" }} />
          </>
        )}
      </div>

      {/* 3. Click Shockwave Wave Effect */}
      <div
        ref={clickWaveRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "2px solid var(--color-cyan, #06b6d4)",
          boxShadow: "0 0 15px var(--color-cyan, #06b6d4)",
          pointerEvents: "none",
          zIndex: 99997,
          opacity: 0,
          transition: "transform 0.4s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.4s ease",
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}