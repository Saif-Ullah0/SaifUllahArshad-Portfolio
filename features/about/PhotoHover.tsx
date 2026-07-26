"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function PhotoHover() {
  const [hovered, setHovered] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const glitchRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseEnter = () => {
    setHovered(true);
    // Random glitch effect every few seconds
    const triggerGlitch = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
      glitchRef.current = setTimeout(triggerGlitch, 2000 + Math.random() * 2000);
    };
    glitchRef.current = setTimeout(triggerGlitch, 800);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setGlitchActive(false);
    if (glitchRef.current) clearTimeout(glitchRef.current);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "280px",
        height: "280px",
        animation: "photoFloat 4s ease-in-out infinite",
        cursor: "crosshair",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <style>{`
        @keyframes photoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ringRotateReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes circuitPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes scanLine {
          0% { top: 8px; opacity: 0; }
          5% { opacity: 0.8; }
          95% { opacity: 0.8; }
          100% { top: 272px; opacity: 0; }
        }
        @keyframes glitchShift {
          0% { transform: translateX(0); }
          20% { transform: translateX(-4px); clip-path: inset(20% 0 60% 0); }
          40% { transform: translateX(4px); clip-path: inset(60% 0 20% 0); }
          60% { transform: translateX(-2px); clip-path: inset(40% 0 40% 0); }
          80% { transform: translateX(2px); clip-path: inset(10% 0 80% 0); }
          100% { transform: translateX(0); clip-path: inset(0 0 0 0); }
        }
        @keyframes dataRain {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 0.9; }
          90% { opacity: 0.9; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes nodeGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes outerPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(124,58,237,0.4), 0 0 40px rgba(124,58,237,0.2); }
          50% { box-shadow: 0 0 35px rgba(124,58,237,0.8), 0 0 70px rgba(6,182,212,0.4); }
        }
        @keyframes revealFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes textFlicker {
          0%, 90%, 100% { opacity: 1; }
          92%, 96% { opacity: 0; }
          94%, 98% { opacity: 0.5; }
        }
      `}</style>

      {/* === REVEAL LAYER behind photo === */}
      <div style={{
        position: "absolute",
        inset: "-45px",
        zIndex: 0,
        pointerEvents: "none",
        opacity: isMobile ? 0.4 : hovered ? 1 : 0,
        visibility: isMobile ? "visible" : hovered ? "visible" : "hidden",
        transition: "opacity 0.6s ease, visibility 0.6s ease",
      }}>

        {/* Dark tech background */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 50%, transparent 38%, rgba(5,2,20,0.98) 45%, rgba(3,0,12,0.99) 65%, transparent 85%)",
        }} />

        {/* Circuit board SVG */}
        <svg viewBox="0 0 370 370" style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
        }}>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="strongGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Circuit traces — horizontal */}
          {[
            { x1: 30, y1: 80, x2: 100, y2: 80, c: "rgba(124,58,237,0.7)" },
            { x1: 100, y1: 80, x2: 100, y2: 130, c: "rgba(124,58,237,0.7)" },
            { x1: 270, y1: 80, x2: 340, y2: 80, c: "rgba(6,182,212,0.7)" },
            { x1: 270, y1: 80, x2: 270, y2: 130, c: "rgba(6,182,212,0.7)" },
            { x1: 30, y1: 290, x2: 100, y2: 290, c: "rgba(6,182,212,0.6)" },
            { x1: 100, y1: 240, x2: 100, y2: 290, c: "rgba(6,182,212,0.6)" },
            { x1: 270, y1: 290, x2: 340, y2: 290, c: "rgba(124,58,237,0.6)" },
            { x1: 270, y1: 240, x2: 270, y2: 290, c: "rgba(124,58,237,0.6)" },
            { x1: 185, y1: 20, x2: 185, y2: 60, c: "rgba(16,185,129,0.7)" },
            { x1: 185, y1: 310, x2: 185, y2: 350, c: "rgba(16,185,129,0.7)" },
            { x1: 20, y1: 185, x2: 60, y2: 185, c: "rgba(16,185,129,0.6)" },
            { x1: 310, y1: 185, x2: 350, y2: 185, c: "rgba(16,185,129,0.6)" },
          ].map((l, i) => (
            <line key={i}
              x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke={l.c} strokeWidth="1.5"
              filter="url(#glow)"
              style={{
                animation: `circuitPulse ${1.5 + i * 0.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}

          {/* Circuit nodes */}
          {[
            { cx: 100, cy: 80, r: 4, c: "rgba(124,58,237,1)" },
            { cx: 270, cy: 80, r: 4, c: "rgba(6,182,212,1)" },
            { cx: 100, cy: 290, r: 4, c: "rgba(6,182,212,1)" },
            { cx: 270, cy: 290, r: 4, c: "rgba(124,58,237,1)" },
            { cx: 185, cy: 20, r: 5, c: "rgba(16,185,129,1)" },
            { cx: 185, cy: 350, r: 5, c: "rgba(16,185,129,1)" },
            { cx: 20, cy: 185, r: 5, c: "rgba(16,185,129,1)" },
            { cx: 350, cy: 185, r: 5, c: "rgba(16,185,129,1)" },
            { cx: 30, cy: 80, r: 3, c: "rgba(124,58,237,0.8)" },
            { cx: 340, cy: 80, r: 3, c: "rgba(6,182,212,0.8)" },
            { cx: 30, cy: 290, r: 3, c: "rgba(6,182,212,0.8)" },
            { cx: 340, cy: 290, r: 3, c: "rgba(124,58,237,0.8)" },
          ].map((n, i) => (
            <circle key={i} cx={n.cx} cy={n.cy} r={n.r}
              fill={n.c}
              filter="url(#strongGlow)"
              style={{
                animation: `nodeGlow ${1 + i * 0.15}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}

          {/* Corner brackets */}
          {[
            { x: 35, y: 35, r: "0", c: "rgba(124,58,237,0.8)" },
            { x: 295, y: 35, r: "90", c: "rgba(6,182,212,0.8)" },
            { x: 295, y: 295, r: "180", c: "rgba(124,58,237,0.8)" },
            { x: 35, y: 295, r: "270", c: "rgba(6,182,212,0.8)" },
          ].map((b, i) => (
            <g key={i} transform={`rotate(${b.r}, ${b.x + 15}, ${b.y + 15})`}>
              <path
                d={`M ${b.x} ${b.y + 20} L ${b.x} ${b.y} L ${b.x + 20} ${b.y}`}
                stroke={b.c} strokeWidth="2.5" fill="none"
                filter="url(#glow)"
              />
            </g>
          ))}

          {/* Binary text */}
          <text x="32" y="72" fontFamily="monospace" fontSize="8"
            fill="rgba(124,58,237,0.8)" filter="url(#glow)">01001101</text>
          <text x="255" y="72" fontFamily="monospace" fontSize="8"
            fill="rgba(6,182,212,0.8)" filter="url(#glow)">10110011</text>
          <text x="32" y="308" fontFamily="monospace" fontSize="8"
            fill="rgba(6,182,212,0.8)" filter="url(#glow)">11010110</text>
          <text x="255" y="308" fontFamily="monospace" fontSize="8"
            fill="rgba(124,58,237,0.8)" filter="url(#glow)">00101101</text>

          {/* Top/bottom binary */}
          <text x="148" y="16" fontFamily="monospace" fontSize="8"
            fill="rgba(16,185,129,0.8)" filter="url(#glow)">AI::ONLINE</text>
          <text x="140" y="362" fontFamily="monospace" fontSize="8"
            fill="rgba(16,185,129,0.8)" filter="url(#glow)">v2.0::ACTIVE</text>

          {/* Side text */}
          <text x="2" y="190" fontFamily="monospace" fontSize="7"
            fill="rgba(16,185,129,0.7)"
            transform="rotate(-90, 12, 185)">ML::ENG</text>
          <text x="348" y="190" fontFamily="monospace" fontSize="7"
            fill="rgba(16,185,129,0.7)"
            transform="rotate(90, 358, 185)">ITU::PKT</text>
        </svg>

        {/* Binary rain columns */}
        {[
          { left: "8%", delay: "0s", dur: "2s", color: "rgba(124,58,237,0.8)" },
          { left: "20%", delay: "0.4s", dur: "2.5s", color: "rgba(6,182,212,0.7)" },
          { left: "75%", delay: "0.2s", dur: "1.8s", color: "rgba(124,58,237,0.7)" },
          { left: "88%", delay: "0.6s", dur: "2.2s", color: "rgba(6,182,212,0.8)" },
          { left: "50%", delay: "1s", dur: "3s", color: "rgba(16,185,129,0.6)" },
        ].map((col, i) => (
          <div key={i} style={{
            position: "absolute",
            left: col.left,
            top: 0,
            fontFamily: "monospace",
            fontSize: "9px",
            color: col.color,
            lineHeight: 1.5,
            animation: `dataRain ${col.dur} linear infinite`,
            animationDelay: col.delay,
            pointerEvents: "none",
            textShadow: "0 0 6px currentColor",
          }}>
            {["1","0","1","1","0","0","1","0","1","1","0","1","0","0","1"].map((b, j) => (
              <div key={j}>{b}</div>
            ))}
          </div>
        ))}

        {/* Floating tech labels */}
        {[
          { text: "PyTorch", x: "5%", y: "38%", c: "rgba(248,113,113,0.9)" },
          { text: "XGBoost", x: "72%", y: "38%", c: "rgba(16,185,129,0.9)" },
          { text: "F1:0.848", x: "5%", y: "58%", c: "rgba(16,185,129,1)" },
          { text: "AUC:0.97", x: "68%", y: "58%", c: "rgba(6,182,212,1)" },
        ].map((t, i) => (
          <div key={i} style={{
            position: "absolute",
            left: t.x,
            top: t.y,
            fontFamily: "monospace",
            fontSize: "8px",
            color: t.c,
            textShadow: "0 0 8px currentColor",
            letterSpacing: "0.05em",
            animation: `circuitPulse ${1.5 + i * 0.3}s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
          }}>
            {t.text}
          </div>
        ))}
      </div>

      {/* Outer pulsing glow when hovered */}
      <div style={{
        position: "absolute",
        inset: "-8px",
        borderRadius: "50%",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
        animation: hovered ? "outerPulse 2s ease-in-out infinite" : "none",
        zIndex: 0,
        pointerEvents: "none",
      }} />

      {/* Bottom glow */}
      <div style={{
        position: "absolute",
        bottom: "-20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: hovered ? "260px" : "200px",
        height: "40px",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(124,58,237,0.5) 0%, transparent 70%)",
        opacity: hovered ? 0.8 : 0.2,
        transition: "all 0.4s ease",
        filter: "blur(10px)",
        zIndex: 0,
        pointerEvents: "none",
      }} />

      {/* Main rotating ring */}
      <div style={{
        position: "absolute",
        inset: "-6px",
        borderRadius: "50%",
        background: hovered
          ? "conic-gradient(from 0deg, #7c3aed, #06b6d4, #10b981, #06b6d4, #7c3aed)"
          : "conic-gradient(from 0deg, #7c3aed, #06b6d4, #7c3aed)",
        animation: `ringRotate ${hovered ? "1s" : "4s"} linear infinite`,
        opacity: hovered ? 1 : 0.8,
        transition: "opacity 0.3s ease",
        zIndex: 1,
      }} />

      {/* Secondary ring */}
      <div style={{
        position: "absolute",
        inset: "-14px",
        borderRadius: "50%",
        border: `2px dashed ${hovered ? "rgba(6,182,212,0.6)" : "transparent"}`,
        animation: "ringRotateReverse 5s linear infinite",
        transition: "border-color 0.4s ease",
        zIndex: 1,
        pointerEvents: "none",
      }} />

      {/* Tertiary ring */}
      <div style={{
        position: "absolute",
        inset: "-22px",
        borderRadius: "50%",
        border: `1px solid ${hovered ? "rgba(124,58,237,0.3)" : "transparent"}`,
        borderTop: hovered ? "2px solid rgba(124,58,237,0.8)" : "2px solid transparent",
        animation: "ringRotate 8s linear infinite",
        transition: "border-color 0.4s ease",
        zIndex: 1,
        pointerEvents: "none",
      }} />

      {/* Dark border */}
      <div style={{
        position: "absolute",
        inset: "3px",
        borderRadius: "50%",
        backgroundColor: "var(--color-background)",
        zIndex: 2,
        transition: "background-color 0.3s ease",
      }} />

      {/* Photo — normal version */}
      <div style={{
        position: "absolute",
        inset: "10px",
        borderRadius: "50%",
        overflow: "hidden",
        zIndex: 3,
        backgroundColor: "var(--color-background)",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        transition: "transform 0.4s ease",
      }}>
        <Image
          src="/images/profile.webp"
          alt="Saif Ullah Arshad"
          fill
          sizes="(max-width: 768px) 100vw, 280px"
          style={{
            objectFit: "cover",
            objectPosition: "center 15%",
            filter: hovered ? "none" : "none",
            transition: "filter 0.4s ease",
          }}
          priority
        />

        {/* Glitch overlay — on top of photo */}
        {hovered && (
          <div style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
          }}>
            {/* Cyan tinted duplicate — glitch effect */}
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url(/images/profile.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center 15%",
              filter: "hue-rotate(180deg) saturate(4) contrast(1.5) brightness(0.5)",
              opacity: glitchActive ? 0.7 : 0,
              transform: glitchActive ? "translateX(-3px)" : "translateX(0)",
              transition: "opacity 0.05s, transform 0.05s",
              mixBlendMode: "screen",
            }} />
            {/* Red shifted duplicate */}
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url(/images/profile.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center 15%",
              filter: "hue-rotate(300deg) saturate(4) contrast(1.5) brightness(0.5)",
              opacity: glitchActive ? 0.5 : 0,
              transform: glitchActive ? "translateX(3px)" : "translateX(0)",
              transition: "opacity 0.05s, transform 0.05s",
              mixBlendMode: "screen",
            }} />

            {/* Scan line */}
            <div style={{
              position: "absolute",
              left: 0, right: 0,
              height: "2px",
              backgroundColor: "rgba(6,182,212,0.8)",
              boxShadow: "0 0 8px rgba(6,182,212,1)",
              animation: "scanLine 2s linear infinite",
              top: "8px",
              zIndex: 10,
            }} />

            {/* Circuit overlay on photo */}
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(6,182,212,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6,182,212,0.06) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
              opacity: 0.8,
            }} />

            {/* HUD elements */}
            <div style={{
              position: "absolute",
              top: "8px", left: "8px",
              fontFamily: "monospace",
              fontSize: "7px",
              color: "rgba(6,182,212,0.9)",
              textShadow: "0 0 6px rgba(6,182,212,1)",
              lineHeight: 1.6,
              animation: "textFlicker 3s ease-in-out infinite",
            }}>
              <div>ID::SAIF</div>
              <div>ML::ENG</div>
              <div>STAT::OK</div>
            </div>

            <div style={{
              position: "absolute",
              bottom: "8px", right: "8px",
              fontFamily: "monospace",
              fontSize: "7px",
              color: "rgba(124,58,237,0.9)",
              textShadow: "0 0 6px rgba(124,58,237,1)",
              lineHeight: 1.6,
              textAlign: "right",
              animation: "textFlicker 2.5s ease-in-out infinite",
              animationDelay: "0.5s",
            }}>
              <div>ITU::PK</div>
              <div>AI::v2.0</div>
              <div>●ONLINE</div>
            </div>

            {/* Corner brackets on photo */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
              <path d="M 8 24 L 8 8 L 24 8" stroke="rgba(6,182,212,0.9)" strokeWidth="2" fill="none" filter="url(#glow)" />
              <path d="M calc(100% - 8) 24 L calc(100% - 8) 8 L calc(100% - 24) 8" stroke="rgba(6,182,212,0.9)" strokeWidth="2" fill="none" />
              <path d="M 8 calc(100% - 24) L 8 calc(100% - 8) L 24 calc(100% - 8)" stroke="rgba(124,58,237,0.9)" strokeWidth="2" fill="none" />
              <path d="M calc(100% - 8) calc(100% - 24) L calc(100% - 8) calc(100% - 8) L calc(100% - 24) calc(100% - 8)" stroke="rgba(124,58,237,0.9)" strokeWidth="2" fill="none" />
            </svg>
          </div>
        )}
      </div>

    </div>
  );
}