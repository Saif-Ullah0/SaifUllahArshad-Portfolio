"use client";

import dynamic from "next/dynamic";
import HeroText from "./HeroText";
import { useEffect, useState } from "react";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });
const HeroReveal = dynamic(() => import("./HeroReveal"), { ssr: false });

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
        padding: "0 1.5rem",
        paddingTop: "clamp(7rem, 15vh, 11rem)",
        paddingBottom: "4rem",
        overflow: "clip", // FIXED: "clip" preserves page sticky behavior while clipping canvas overflow
        backgroundColor: "var(--color-background)",
      }}
    >
      {/* Reveal layer */}
      {!isMobile && <HeroReveal />}

      {/* Particles */}
      {!isMobile && <HeroCanvas />}

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />

      <div style={{ position: "relative", zIndex: 10 }}>
        <HeroText />
      </div>
    </section>
  );
}