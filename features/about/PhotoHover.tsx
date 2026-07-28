"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";

export default function PhotoHover() {
  const [hovered, setHovered] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);
  const [tiltEnabled, setTiltEnabled] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, tiltX: 0, tiltY: 0, relX: 0, relY: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Relative coordinates from center (-100 to 100)
    const relX = Math.round(((x / rect.width) - 0.5) * 200);
    const relY = Math.round(((y / rect.height) - 0.5) * -200);

    // Calculate 3D tilt angles (-14deg to 14deg)
    const tiltX = tiltEnabled ? ((y / rect.height) - 0.5) * -28 : 0;
    const tiltY = tiltEnabled ? ((x / rect.width) - 0.5) * 28 : 0;

    setMousePos({ x, y, tiltX, tiltY, relX, relY });
  };

  const triggerScanEffect = (e: MouseEvent) => {
    e.stopPropagation();
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 800);
  };

  const triggerPulseEffect = (e: MouseEvent) => {
    e.stopPropagation();
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 1000);
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    setGlitchActive(false);
    setMousePos({ x: 0, y: 0, tiltX: 0, tiltY: 0, relX: 0, relY: 0 });
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "320px",
        height: "380px",
        margin: "2rem auto",
        perspective: "1000px",
        cursor: "crosshair",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          20% { opacity: 0.9; }
          80% { opacity: 0.9; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes pulseShockwave {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.45); opacity: 0; }
        }
        @keyframes audioFreq {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
      `}</style>

      {/* Main Interactive 3D Tilt Container */}
      <div
        style={{
          width: "320px",
          height: "320px",
          position: "relative",
          transform: `rotateX(${mousePos.tiltX}deg) rotateY(${mousePos.tiltY}deg)`,
          transition: hovered && tiltEnabled ? "transform 0.08s cubic-bezier(0.2, 0.8, 0.2, 1)" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          transformStyle: "preserve-3d",
          animation: hovered ? "none" : "floatGentle 4.5s ease-in-out infinite",
        }}
      >
        {/* Ambient Glow */}
        <div
          style={{
            position: "absolute",
            inset: "-20px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(6,182,212,0.2) 50%, transparent 75%)",
            filter: "blur(25px)",
            opacity: hovered ? 0.95 : 0.35,
            transform: hovered ? "scale(1.12)" : "scale(1)",
            transition: "all 0.5s ease",
            zIndex: 0,
          }}
        />

        {/* Pulse Shockwave Effect on Trigger */}
        {pulseActive && (
          <div
            style={{
              position: "absolute",
              inset: "-10px",
              borderRadius: "50%",
              border: "2px solid #06b6d4",
              boxShadow: "0 0 20px #06b6d4, inset 0 0 20px #06b6d4",
              animation: "pulseShockwave 0.8s ease-out forwards",
              zIndex: 1,
            }}
          />
        )}

        {/* Outer HUD Rings */}
        <div
          style={{
            position: "absolute",
            inset: "-10px",
            borderRadius: "50%",
            padding: "2px",
            background: hovered
              ? "conic-gradient(from 0deg, #7c3aed, #06b6d4, #10b981, #7c3aed)"
              : "conic-gradient(from 0deg, rgba(124,58,237,0.5), rgba(6,182,212,0.2), rgba(124,58,237,0.5))",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            animation: `spinClockwise ${hovered ? "3s" : "9s"} linear infinite`,
            transition: "all 0.5s ease",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: "-20px",
            borderRadius: "50%",
            border: "1.5px dashed rgba(6, 182, 212, 0.4)",
            animation: "spinCounter 18s linear infinite",
            opacity: hovered ? 0.85 : 0.25,
            transition: "opacity 0.4s ease",
            zIndex: 1,
          }}
        />

        {/* Glassmorphic Avatar Frame */}
        <div
          style={{
            position: "absolute",
            inset: "0px",
            borderRadius: "50%",
            padding: "4px",
            background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.03))",
            backdropFilter: "blur(12px)",
            boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
            zIndex: 2,
            overflow: "hidden",
          }}
        >
          <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", position: "relative" }}>
            {/* Interactive Spotlight Radial Follower */}
            {hovered && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, rgba(6,182,212,0.25), transparent 80%)`,
                  zIndex: 3,
                  pointerEvents: "none",
                }}
              />
            )}

            {/* Profile Image */}
            <Image
              src="/images/profile.webp"
              alt="Saif Ullah Arshad"
              fill
              sizes="320px"
              style={{
                objectFit: "cover",
                objectPosition: "center 15%",
                filter: glitchActive
                  ? "invert(0.8) hue-rotate(90deg) contrast(1.5)"
                  : hovered
                  ? "contrast(1.1) brightness(1.08)"
                  : "none",
                transform: hovered ? "scale(1.08)" : "scale(1)",
                transition: glitchActive ? "none" : "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              priority
            />

            {/* Cyberpunk Vignette Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle, transparent 50%, rgba(5,2,20,0.7) 100%)",
                mixBlendMode: "multiply",
                pointerEvents: "none",
              }}
            />

            {/* Laser Scan Line Effect */}
            {(hovered || glitchActive) && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, transparent, #06b6d4, #7c3aed, transparent)",
                  boxShadow: "0 0 12px #06b6d4",
                  animation: glitchActive ? "scanSweep 0.4s linear infinite" : "scanSweep 2.2s ease-in-out infinite",
                  zIndex: 4,
                }}
              />
            )}
          </div>
        </div>

        {/* Laser Target Reticles */}
        <div style={{ position: "absolute", top: "-6px", left: "-6px", width: "14px", height: "14px", borderLeft: "2px solid #06b6d4", borderTop: "2px solid #06b6d4", opacity: hovered ? 1 : 0.3, zIndex: 5 }} />
        <div style={{ position: "absolute", bottom: "-6px", right: "-6px", width: "14px", height: "14px", borderRight: "2px solid #7c3aed", borderBottom: "2px solid #7c3aed", opacity: hovered ? 1 : 0.3, zIndex: 5 }} />

        {/* Real-time Floating Telemetry Grid (Z-Index Parallax) */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "-45px",
            fontFamily: "monospace",
            fontSize: "0.62rem",
            color: "#06b6d4",
            backgroundColor: "rgba(6, 182, 212, 0.12)",
            border: "1px solid rgba(6, 182, 212, 0.4)",
            borderRadius: "6px",
            padding: "3px 8px",
            backdropFilter: "blur(8px)",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateZ(35px) translateX(0)" : "translateZ(0) translateX(-15px)",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.05s",
            pointerEvents: "none",
            zIndex: 6,
          }}
        >
          X: {mousePos.relX} | Y: {mousePos.relY}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "35px",
            left: "-50px",
            fontFamily: "monospace",
            fontSize: "0.62rem",
            color: "#a78bfa",
            backgroundColor: "rgba(124, 58, 237, 0.12)",
            border: "1px solid rgba(124, 58, 237, 0.4)",
            borderRadius: "6px",
            padding: "3px 8px",
            backdropFilter: "blur(8px)",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateZ(35px) translateX(0)" : "translateZ(0) translateX(15px)",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            pointerEvents: "none",
            zIndex: 6,
          }}
        >
          NEURAL // ONLINE
        </div>

        {/* Audio Equalizer Bars Visualizer */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "-35px",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "flex-end",
            gap: "3px",
            opacity: hovered ? 0.8 : 0,
            transition: "opacity 0.4s ease",
            zIndex: 6,
          }}
        >
          {[0.4, 0.8, 0.3, 0.9, 0.5].map((speed, i) => (
            <div
              key={i}
              style={{
                width: "3px",
                backgroundColor: "#06b6d4",
                borderRadius: "2px",
                animation: hovered ? `audioFreq ${0.6 + speed}s ease-in-out infinite` : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Interactive Control Console (Below Component) */}
      <div
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          zIndex: 10,
        }}
      >
        <button
          onClick={triggerScanEffect}
          style={{
            fontFamily: "monospace",
            fontSize: "0.62rem",
            color: "#06b6d4",
            backgroundColor: "rgba(6, 182, 212, 0.1)",
            border: "1px solid rgba(6, 182, 212, 0.4)",
            padding: "4px 10px",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          [SCAN]
        </button>

        <button
          onClick={triggerPulseEffect}
          style={{
            fontFamily: "monospace",
            fontSize: "0.62rem",
            color: "#a78bfa",
            backgroundColor: "rgba(124, 58, 237, 0.1)",
            border: "1px solid rgba(124, 58, 237, 0.4)",
            padding: "4px 10px",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          [PULSE]
        </button>

        <button
          onClick={() => setTiltEnabled(!tiltEnabled)}
          style={{
            fontFamily: "monospace",
            fontSize: "0.62rem",
            color: tiltEnabled ? "#10b981" : "#64748b",
            backgroundColor: tiltEnabled ? "rgba(16, 185, 129, 0.1)" : "rgba(100, 116, 139, 0.1)",
            border: `1px solid ${tiltEnabled ? "rgba(16, 185, 129, 0.4)" : "rgba(100, 116, 139, 0.4)"}`,
            padding: "4px 10px",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          3D TILT: {tiltEnabled ? "ON" : "OFF"}
        </button>
      </div>
    </div>
  );
}