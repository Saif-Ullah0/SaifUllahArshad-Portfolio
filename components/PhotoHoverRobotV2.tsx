"use client";

import { useState } from "react";
import Image from "next/image";

export default function PhotoHover() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "280px",
        height: "280px",
        margin: "2rem auto",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <style>{`
        @keyframes floatGentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes spinClockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinCounter {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes scanSweep {
          0% { top: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
      `}</style>

      {/* Floating Container Wrapper */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          animation: "floatGentle 4.5s ease-in-out infinite",
        }}
      >
        {/* Ambient Underglow */}
        <div
          style={{
            position: "absolute",
            inset: "-20px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(6,182,212,0.15) 50%, transparent 70%)",
            filter: "blur(20px)",
            opacity: hovered ? 0.9 : 0.4,
            transform: hovered ? "scale(1.1)" : "scale(1)",
            transition: "all 0.5s ease",
            zIndex: 0,
          }}
        />

        {/* Outer Rotating HUD Ring 1 (Clockwise gradient) */}
        <div
          style={{
            position: "absolute",
            inset: "-12px",
            borderRadius: "50%",
            padding: "2px",
            background: hovered
              ? "conic-gradient(from 0deg, #7c3aed, #06b6d4, #3b82f6, #7c3aed)"
              : "conic-gradient(from 0deg, rgba(124,58,237,0.6), rgba(6,182,212,0.2), rgba(124,58,237,0.6))",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            animation: `spinClockwise ${hovered ? "3s" : "8s"} linear infinite`,
            transition: "all 0.5s ease",
            zIndex: 1,
          }}
        />

        {/* Outer Tech Dashed Ring 2 (Counter-clockwise) */}
        <div
          style={{
            position: "absolute",
            inset: "-20px",
            borderRadius: "50%",
            border: "1.5px dashed rgba(6, 182, 212, 0.4)",
            animation: "spinCounter 16s linear infinite",
            opacity: hovered ? 0.8 : 0.25,
            transition: "opacity 0.4s ease",
            zIndex: 1,
          }}
        />

        {/* Glassmorphic Frame & Image Mask */}
        <div
          style={{
            position: "absolute",
            inset: "0px",
            borderRadius: "50%",
            padding: "4px",
            background: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.02))",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Profile Image */}
            <Image
              src="/images/profile.webp"
              alt="Saif Ullah Arshad"
              fill
              sizes="280px"
              style={{
                objectFit: "cover",
                objectPosition: "center 15%",
                filter: hovered ? "contrast(1.08) brightness(1.05)" : "none",
                transform: hovered ? "scale(1.06)" : "scale(1)",
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              priority
            />

            {/* Cyberpunk Holographic Overlay Grid (Hover Active) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle, transparent 40%, rgba(10,5,30,0.6) 100%)",
                mixBlendMode: "multiply",
                pointerEvents: "none",
              }}
            />

            {/* Laser Scan Line Effect */}
            {hovered && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, transparent, #06b6d4, #7c3aed, transparent)",
                  boxShadow: "0 0 12px #06b6d4",
                  animation: "scanSweep 2s ease-in-out infinite",
                  zIndex: 4,
                }}
              />
            )}
          </div>
        </div>

        {/* HUD Target Crosshairs (Top Left & Bottom Right Corners) */}
        <div
          style={{
            position: "absolute",
            top: "-4px",
            left: "-4px",
            width: "12px",
            height: "12px",
            borderLeft: "2px solid #06b6d4",
            borderTop: "2px solid #06b6d4",
            opacity: hovered ? 1 : 0.3,
            transition: "all 0.3s ease",
            zIndex: 5,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-4px",
            right: "-4px",
            width: "12px",
            height: "12px",
            borderRight: "2px solid #7c3aed",
            borderBottom: "2px solid #7c3aed",
            opacity: hovered ? 1 : 0.3,
            transition: "all 0.3s ease",
            zIndex: 5,
          }}
        />

        {/* Floating Telemetry Badges */}
        <div
          style={{
            position: "absolute",
            top: "15px",
            right: "-35px",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.62rem",
            color: "#06b6d4",
            backgroundColor: "rgba(6, 182, 212, 0.1)",
            border: "1px solid rgba(6, 182, 212, 0.3)",
            borderRadius: "4px",
            padding: "2px 8px",
            backdropFilter: "blur(6px)",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-10px)",
            transition: "all 0.4s ease 0.1s",
            pointerEvents: "none",
            zIndex: 6,
          }}
        >
          SYS.VER // 2.4
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "-40px",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.62rem",
            color: "#a78bfa",
            backgroundColor: "rgba(124, 58, 237, 0.12)",
            border: "1px solid rgba(124, 58, 237, 0.3)",
            borderRadius: "4px",
            padding: "2px 8px",
            backdropFilter: "blur(6px)",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(10px)",
            transition: "all 0.4s ease 0.15s",
            pointerEvents: "none",
            zIndex: 6,
          }}
        >
          MATCH // 99.8%
        </div>

        {/* Status Pillar Tag */}
        <div
          style={{
            position: "absolute",
            bottom: "-38px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "rgba(10, 15, 30, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "4px 12px",
            borderRadius: "20px",
            backdropFilter: "blur(8px)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            zIndex: 6,
            transition: "all 0.3s ease",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: hovered ? "#06b6d4" : "#22c55e",
              boxShadow: hovered ? "0 0 8px #06b6d4" : "0 0 8px #22c55e",
              transition: "background-color 0.3s ease",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.68rem",
              letterSpacing: "0.08em",
              color: "var(--color-text-secondary, #cbd5e1)",
              textTransform: "uppercase",
            }}
          >
            {hovered ? "NEURAL CORE ACTIVE" : "AVAILABLE FOR HIRE"}
          </span>
        </div>
      </div>
    </div>
  );
}