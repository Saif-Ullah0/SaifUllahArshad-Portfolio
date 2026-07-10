"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      // Dot follows instantly
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Ring follows with lag
    const animate = () => {
      ringX += (mouseX - ringX) * 0.20;
      ringY += (mouseY - ringY) * 0.20;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    // Scale ring on hoverable elements
    const onMouseOverLink = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        ring.style.transform = "translate(-50%, -50%) scale(1.8)";
        ring.style.borderColor = "var(--color-cyan)";
        dot.style.backgroundColor = "var(--color-cyan)";
      } else {
        ring.style.transform = "translate(-50%, -50%) scale(1)";
        ring.style.borderColor = "var(--color-violet)";
        dot.style.backgroundColor = "var(--color-violet)";
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseover", onMouseOverLink);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseover", onMouseOverLink);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Small dot — follows instantly */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "var(--color-violet)",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          transition: "background-color 0.2s ease, opacity 0.2s ease",
          opacity: isVisible ? 1 : 0,
          boxShadow: "0 0 8px var(--color-violet)",
        }}
      />

      {/* Larger ring — follows with lag */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1px solid var(--color-violet)",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%) scale(1)",
          transition:
            "transform 0.2s ease, border-color 0.2s ease, opacity 0.2s ease",
          opacity: isVisible ? 0.6 : 0,
        }}
      />
    </>
  );
}