"use client";

import { useState } from "react";
import Image from "next/image";

export default function PhotoHover() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "320px",
        height: "320px",
        animation: "floatUpDown 4s ease-in-out infinite",
        marginTop: "-0.5rem",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        transition: "transform 0.4s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <style>{`
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotateReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes robotPulse {
          0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 4px rgba(124,58,237,0.6)); }
          50% { opacity: 1; filter: drop-shadow(0 0 12px rgba(6,182,212,0.9)); }
        }
        @keyframes scanLine {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(400%); opacity: 0; }
        }
        @keyframes blink {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0; }
        }
        @keyframes dataFlow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes orbitRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Robot/Machine background layer */}
      <div style={{
        position: "absolute",
        inset: "-40px",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "scale(1)" : "scale(0.96)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        zIndex: 0,
        pointerEvents: "none",
      }}>
        {/* Dark bg */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "radial-gradient(circle, #0a0520 0%, #050010 60%, transparent 100%)",
        }} />

        {/* Robot SVG */}
        <svg
          viewBox="0 0 360 360"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            animation: "robotPulse 2s ease-in-out infinite",
          }}
        >
          {/* Outer glow ring */}
          <circle cx="180" cy="180" r="155"
            fill="none"
            stroke="rgba(124,58,237,0.15)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />

          {/* Robot head */}
          <rect x="140" y="80" width="80" height="70" rx="8"
            fill="rgba(15,10,30,0.9)"
            stroke="rgba(124,58,237,0.8)"
            strokeWidth="1.5"
          />

          {/* Robot eyes */}
          <rect x="153" y="98" width="18" height="12" rx="3"
            fill="rgba(6,182,212,0.2)"
            stroke="rgba(6,182,212,0.9)"
            strokeWidth="1"
          />
          <rect x="153" y="98" width="18" height="12" rx="3"
            fill="rgba(6,182,212,0.6)"
            style={{ animation: "blink 3s ease-in-out infinite" }}
          />
          <rect x="191" y="98" width="18" height="12" rx="3"
            fill="rgba(6,182,212,0.2)"
            stroke="rgba(6,182,212,0.9)"
            strokeWidth="1"
          />
          <rect x="191" y="98" width="18" height="12" rx="3"
            fill="rgba(6,182,212,0.6)"
            style={{ animation: "blink 3s ease-in-out infinite", animationDelay: "0.1s" }}
          />

          {/* Eye glow */}
          <circle cx="162" cy="104" r="6" fill="rgba(6,182,212,0.3)" filter="blur(2px)" />
          <circle cx="200" cy="104" r="6" fill="rgba(6,182,212,0.3)" filter="blur(2px)" />

          {/* Mouth/speaker */}
          <rect x="155" y="120" width="50" height="8" rx="4"
            fill="rgba(124,58,237,0.2)"
            stroke="rgba(124,58,237,0.6)"
            strokeWidth="1"
          />
          {[0,1,2,3,4].map(i => (
            <rect key={i}
              x={158 + i * 10} y={122} width="4" height="4" rx="1"
              fill="rgba(124,58,237,0.8)"
              style={{ animation: `robotPulse ${0.5 + i * 0.15}s ease-in-out infinite`, animationDelay: `${i * 0.1}s` }}
            />
          ))}

          {/* Antenna */}
          <line x1="180" y1="80" x2="180" y2="60" stroke="rgba(124,58,237,0.8)" strokeWidth="2" />
          <circle cx="180" cy="56" r="5"
            fill="rgba(124,58,237,0.3)"
            stroke="rgba(124,58,237,1)"
            strokeWidth="1.5"
            style={{ animation: "robotPulse 1s ease-in-out infinite" }}
          />

          {/* Neck */}
          <rect x="170" y="150" width="20" height="15" rx="2"
            fill="rgba(15,10,30,0.9)"
            stroke="rgba(124,58,237,0.5)"
            strokeWidth="1"
          />

          {/* Body */}
          <rect x="120" y="165" width="120" height="90" rx="10"
            fill="rgba(15,10,30,0.9)"
            stroke="rgba(124,58,237,0.8)"
            strokeWidth="1.5"
          />

          {/* Chest panel */}
          <rect x="135" y="178" width="90" height="55" rx="6"
            fill="rgba(6,182,212,0.05)"
            stroke="rgba(6,182,212,0.4)"
            strokeWidth="1"
          />

          {/* Core reactor */}
          <circle cx="180" cy="200" r="18"
            fill="rgba(124,58,237,0.1)"
            stroke="rgba(124,58,237,0.6)"
            strokeWidth="1.5"
          />
          <circle cx="180" cy="200" r="12"
            fill="rgba(124,58,237,0.2)"
            stroke="rgba(6,182,212,0.8)"
            strokeWidth="1"
            style={{ animation: "robotPulse 1.5s ease-in-out infinite" }}
          />
          <circle cx="180" cy="200" r="6"
            fill="rgba(6,182,212,0.8)"
            style={{ animation: "robotPulse 0.8s ease-in-out infinite" }}
          />

          {/* Body details */}
          <rect x="140" y="225" width="20" height="8" rx="2"
            fill="rgba(124,58,237,0.6)"
            style={{ animation: "robotPulse 2s ease-in-out infinite" }}
          />
          <rect x="165" y="225" width="20" height="8" rx="2"
            fill="rgba(6,182,212,0.6)"
            style={{ animation: "robotPulse 2s ease-in-out infinite", animationDelay: "0.5s" }}
          />
          <rect x="200" y="225" width="20" height="8" rx="2"
            fill="rgba(124,58,237,0.6)"
            style={{ animation: "robotPulse 2s ease-in-out infinite", animationDelay: "1s" }}
          />

          {/* Left arm */}
          <rect x="88" y="168" width="30" height="70" rx="8"
            fill="rgba(15,10,30,0.9)"
            stroke="rgba(124,58,237,0.7)"
            strokeWidth="1.5"
          />
          <rect x="90" y="175" width="26" height="4" rx="2" fill="rgba(6,182,212,0.5)" />
          <rect x="90" y="185" width="26" height="4" rx="2" fill="rgba(124,58,237,0.5)" />
          {/* Left hand */}
          <rect x="90" y="238" width="26" height="16" rx="4"
            fill="rgba(15,10,30,0.9)"
            stroke="rgba(6,182,212,0.7)"
            strokeWidth="1"
          />

          {/* Right arm */}
          <rect x="242" y="168" width="30" height="70" rx="8"
            fill="rgba(15,10,30,0.9)"
            stroke="rgba(124,58,237,0.7)"
            strokeWidth="1.5"
          />
          <rect x="244" y="175" width="26" height="4" rx="2" fill="rgba(6,182,212,0.5)" />
          <rect x="244" y="185" width="26" height="4" rx="2" fill="rgba(124,58,237,0.5)" />
          {/* Right hand */}
          <rect x="244" y="238" width="26" height="16" rx="4"
            fill="rgba(15,10,30,0.9)"
            stroke="rgba(6,182,212,0.7)"
            strokeWidth="1"
          />

          {/* Floating data streams */}
          {[
            { x1: 88, y1: 200, x2: 50, y2: 180 },
            { x1: 272, y1: 200, x2: 310, y2: 180 },
            { x1: 180, y1: 80, x2: 180, y2: 40 },
          ].map((line, i) => (
            <line key={i}
              x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
              stroke="rgba(6,182,212,0.4)"
              strokeWidth="1"
              strokeDasharray="4 4"
              style={{
                animation: "dataFlow 2s linear infinite",
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}

          {/* Floating binary near robot */}
          <text x="40" y="175" fontFamily="monospace" fontSize="8" fill="rgba(124,58,237,0.7)">01001</text>
          <text x="305" y="175" fontFamily="monospace" fontSize="8" fill="rgba(124,58,237,0.7)">10110</text>
          <text x="160" y="42" fontFamily="monospace" fontSize="8" fill="rgba(6,182,212,0.7)">AI</text>

          {/* Scan line */}
          <rect x="120" y="165" width="120" height="3" rx="1"
            fill="rgba(6,182,212,0.6)"
            style={{ animation: "scanLine 2s linear infinite" }}
          />
        </svg>

        {/* Orbiting ring */}
        <div style={{
          position: "absolute",
          inset: "10px",
          borderRadius: "50%",
          border: "1px solid rgba(124,58,237,0.3)",
          borderTop: "2px solid rgba(124,58,237,0.8)",
          borderRight: "1px solid transparent",
          animation: "orbitRing 3s linear infinite",
        }} />
        <div style={{
          position: "absolute",
          inset: "20px",
          borderRadius: "50%",
          border: "1px solid rgba(6,182,212,0.2)",
          borderBottom: "1.5px solid rgba(6,182,212,0.7)",
          borderLeft: "1px solid transparent",
          animation: "orbitRing 4s linear infinite reverse",
        }} />
      </div>

      {/* Outer glow */}
      <div style={{
        position: "absolute",
        bottom: "-24px",
        left: "50%",
        transform: "translateX(-50%)",
        width: hovered ? "280px" : "220px",
        height: "48px",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(124, 58, 237, 0.5) 0%, transparent 70%)",
        opacity: hovered ? 0.7 : 0.2,
        transition: "all 0.4s ease",
        filter: "blur(8px)",
        zIndex: 0,
        pointerEvents: "none",
      }} />

      {/* Rotating ring */}
      <div style={{
        position: "absolute",
        inset: "-8px",
        borderRadius: "50%",
        background: hovered
          ? "conic-gradient(from 0deg, #7c3aed, #06b6d4, #8b5cf6, #06b6d4, #7c3aed)"
          : "conic-gradient(from 0deg, #7c3aed, #06b6d4, #7c3aed)",
        animation: `rotateSlow ${hovered ? "1.2s" : "4s"} linear infinite`,
        opacity: hovered ? 1 : 0.8,
        transition: "opacity 0.3s ease",
        zIndex: 1,
      }} />

      {/* Counter ring */}
      {hovered && (
        <div style={{
          position: "absolute",
          inset: "-12px",
          borderRadius: "50%",
          border: "1px dashed rgba(6,182,212,0.4)",
          animation: "rotateReverse 6s linear infinite",
          zIndex: 1,
        }} />
      )}

      {/* Dark border */}
      <div style={{
        position: "absolute",
        inset: "4px",
        borderRadius: "50%",
        backgroundColor: "var(--color-background)",
        zIndex: 2,
      }} />

      {/* Photo */}
      <div style={{
        position: "absolute",
        inset: "10px",
        borderRadius: "50%",
        overflow: "hidden",
        zIndex: 3,
        transform: hovered ? "scale(1.03)" : "scale(1)",
        transition: "transform 0.4s ease",
      }}>
        <Image
          src="/images/profile.webp"
          alt="Saif Ullah Arshad"
          fill
          sizes="(max-width: 768px) 100vw, 280px"
          style={{ objectFit: "cover", objectPosition: "center 28%", transform: "scale(1.08)" }}
          priority
        />
      </div>

      {/* Hover label */}
      <div style={{
        position: "absolute",
        bottom: "-55px",
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "monospace",
        fontSize: "0.7rem",
        color: "var(--color-cyan)",
        whiteSpace: "nowrap",
        letterSpacing: "0.1em",
        zIndex: 4,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
      }}>
        {"// AI System Online"}
      </div>
    </div>
  );
}