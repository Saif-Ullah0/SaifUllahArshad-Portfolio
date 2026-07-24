"use client";

import dynamic from "next/dynamic";
import HeroText from "./HeroText";
import { useEffect, useState } from "react";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });
const HeroSpotlight = dynamic(() => import("./HeroSpotlight"), { ssr: false });

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "0 1.5rem",
        overflow: "hidden",
      }}
    >
      {/* Spotlight reveal layer — sits above background, below particles */}
      <HeroSpotlight />

      {/* Particle field */}
      {!isMobile && <HeroCanvas />}

      {/* Background glow */}
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
            "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <HeroText />
    </section>
  );
}