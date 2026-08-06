"use client";

import dynamic from "next/dynamic";
import HeroText from "./HeroText";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });
const HeroReveal = dynamic(() => import("./HeroReveal"), { ssr: false });

export default function Hero() {
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
        backgroundColor: "var(--color-background)",
      }}
    >
      <HeroReveal />
      <HeroCanvas />

      <div style={{
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 3,
      }} />

      <div style={{ position: "relative", zIndex: 10 }}>
        <HeroText />
      </div>
    </section>
  );
}