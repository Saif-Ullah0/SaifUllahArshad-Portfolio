"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "1.5rem",
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        backgroundColor: isHovered
          ? "var(--color-violet-light, #8b5cf6)"
          : "var(--color-violet, #7c3aed)",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 500,
        opacity: visible ? 1 : 0,
        transform: visible
          ? isHovered
            ? "translateY(-3px)"
            : "translateY(0)"
          : "translateY(20px)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: visible ? "all" : "none",
        boxShadow: "0 4px 20px rgba(124, 58, 237, 0.4)",
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}