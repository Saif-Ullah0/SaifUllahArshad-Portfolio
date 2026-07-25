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
        animation: "floatUpDown 4s ease-in-out infinite",
        cursor: "pointer",
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
        @keyframes eyeBlink {
          0%, 85%, 100% { transform: scaleY(1); }
          90% { transform: scaleY(0.1); }
        }
        @keyframes corePulse {
          0%, 100% { opacity: 0.6; r: 6; }
          50% { opacity: 1; r: 8; }
        }
        @keyframes scanDown {
          0% { y: 165px; opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { y: 255px; opacity: 0; }
        }
        @keyframes dataStream {
          0% { stroke-dashoffset: 20; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes robotReveal {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Robot layer — full background behind photo */}
      <div
        style={{
          position: "absolute",
          inset: "-50px",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
          zIndex: 0,
          pointerEvents: "none",
          animation: hovered ? "robotReveal 0.5s ease forwards" : "none",
        }}
      >
        {/* Deep dark background */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 60%, #0a0520 0%, #050010 50%, transparent 80%)",
        }} />

        {/* Robot SVG — centered and large */}
        <svg
          viewBox="0 0 380 380"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {/* === ROBOT HEAD === */}
          {/* Head main body */}
          <rect x="135" y="72" width="110" height="85" rx="10"
            fill="rgba(8,5,22,0.95)"
            stroke="rgba(124,58,237,0.9)"
            strokeWidth="2"
          />
          {/* Head top panel */}
          <rect x="148" y="72" width="84" height="12" rx="5"
            fill="rgba(124,58,237,0.15)"
            stroke="rgba(124,58,237,0.5)"
            strokeWidth="1"
          />

          {/* Antenna base */}
          <rect x="186" y="55" width="8" height="18" rx="3"
            fill="rgba(124,58,237,0.7)"
          />
          {/* Antenna tip */}
          <circle cx="190" cy="50" r="7"
            fill="rgba(124,58,237,0.2)"
            stroke="rgba(124,58,237,1)"
            strokeWidth="2"
          >
            <animate attributeName="r" values="7;9;7" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;1;0.8" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="190" cy="50" r="3" fill="rgba(6,182,212,1)" />

          {/* === EYES === */}
          {/* Left eye socket */}
          <rect x="148" y="92" width="36" height="22" rx="5"
            fill="rgba(6,182,212,0.08)"
            stroke="rgba(6,182,212,0.7)"
            strokeWidth="1.5"
          />
          {/* Left eye glow */}
          <rect x="150" y="94" width="32" height="18" rx="4"
            fill="rgba(6,182,212,0.25)"
          />
          {/* Left eye iris */}
          <ellipse cx="166" cy="103" rx="10" ry="7"
            fill="rgba(6,182,212,0.9)"
            style={{ animation: "eyeBlink 4s ease-in-out infinite" }}
          />
          <ellipse cx="166" cy="103" rx="5" ry="4"
            fill="rgba(0,20,40,1)"
            style={{ animation: "eyeBlink 4s ease-in-out infinite" }}
          />
          <circle cx="163" cy="101" r="2" fill="rgba(255,255,255,0.9)" />

          {/* Right eye socket */}
          <rect x="196" y="92" width="36" height="22" rx="5"
            fill="rgba(6,182,212,0.08)"
            stroke="rgba(6,182,212,0.7)"
            strokeWidth="1.5"
          />
          {/* Right eye glow */}
          <rect x="198" y="94" width="32" height="18" rx="4"
            fill="rgba(6,182,212,0.25)"
          />
          {/* Right eye iris */}
          <ellipse cx="214" cy="103" rx="10" ry="7"
            fill="rgba(6,182,212,0.9)"
            style={{ animation: "eyeBlink 4s ease-in-out infinite", animationDelay: "0.08s" }}
          />
          <ellipse cx="214" cy="103" rx="5" ry="4"
            fill="rgba(0,20,40,1)"
            style={{ animation: "eyeBlink 4s ease-in-out infinite", animationDelay: "0.08s" }}
          />
          <circle cx="211" cy="101" r="2" fill="rgba(255,255,255,0.9)" />

          {/* Eye glow halos */}
          <ellipse cx="166" cy="103" rx="18" ry="12" fill="rgba(6,182,212,0.08)" filter="url(#eyeGlow)" />
          <ellipse cx="214" cy="103" rx="18" ry="12" fill="rgba(6,182,212,0.08)" filter="url(#eyeGlow)" />

          {/* === MOUTH / SPEAKER === */}
          <rect x="150" y="128" width="80" height="14" rx="5"
            fill="rgba(124,58,237,0.1)"
            stroke="rgba(124,58,237,0.6)"
            strokeWidth="1"
          />
          {/* Speaker bars */}
          {[0,1,2,3,4,5,6].map(i => (
            <rect key={i}
              x={154 + i * 11} y={131} width="6" height="8" rx="2"
              fill="rgba(124,58,237,0.8)"
            >
              <animate
                attributeName="height"
                values={`${4 + (i % 3) * 3};${8};${4 + (i % 3) * 3}`}
                dur={`${0.4 + i * 0.1}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values={`${133 - (i % 3)};131;${133 - (i % 3)}`}
                dur={`${0.4 + i * 0.1}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}

          {/* === NECK === */}
          <rect x="178" y="157" width="24" height="18" rx="3"
            fill="rgba(8,5,22,0.9)"
            stroke="rgba(124,58,237,0.5)"
            strokeWidth="1"
          />
          <rect x="181" y="160" width="6" height="12" rx="2" fill="rgba(6,182,212,0.4)" />
          <rect x="193" y="160" width="6" height="12" rx="2" fill="rgba(124,58,237,0.4)" />

          {/* === BODY === */}
          <rect x="110" y="175" width="160" height="110" rx="12"
            fill="rgba(8,5,22,0.95)"
            stroke="rgba(124,58,237,0.8)"
            strokeWidth="2"
          />

          {/* Body shoulder plates */}
          <rect x="110" y="175" width="60" height="20" rx="8"
            fill="rgba(124,58,237,0.15)"
            stroke="rgba(124,58,237,0.4)"
            strokeWidth="1"
          />
          <rect x="210" y="175" width="60" height="20" rx="8"
            fill="rgba(124,58,237,0.15)"
            stroke="rgba(124,58,237,0.4)"
            strokeWidth="1"
          />

          {/* Body chest panel */}
          <rect x="125" y="192" width="130" height="72" rx="8"
            fill="rgba(6,182,212,0.04)"
            stroke="rgba(6,182,212,0.35)"
            strokeWidth="1"
          />

          {/* === CORE REACTOR === */}
          {/* Outer ring */}
          <circle cx="190" cy="224" r="28"
            fill="rgba(124,58,237,0.06)"
            stroke="rgba(124,58,237,0.5)"
            strokeWidth="1.5"
          />
          {/* Mid ring */}
          <circle cx="190" cy="224" r="20"
            fill="rgba(124,58,237,0.1)"
            stroke="rgba(6,182,212,0.7)"
            strokeWidth="1.5"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 190 224;360 190 224"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>
          {/* Inner glow */}
          <circle cx="190" cy="224" r="13"
            fill="rgba(124,58,237,0.3)"
            stroke="rgba(124,58,237,0.9)"
            strokeWidth="1"
          >
            <animate attributeName="r" values="13;15;13" dur="1.5s" repeatCount="indefinite" />
          </circle>
          {/* Core dot */}
          <circle cx="190" cy="224" r="6"
            fill="rgba(6,182,212,1)"
          >
            <animate attributeName="r" values="6;8;6" dur="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;1;0.8" dur="1s" repeatCount="indefinite" />
          </circle>

          {/* Reactor orbit dot */}
          <circle cx="190" cy="204" r="3" fill="rgba(6,182,212,0.9)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 190 224;360 190 224"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Body side indicators */}
          {[0,1,2].map(i => (
            <g key={i}>
              <rect x="130" y={198 + i * 20} width="30" height="8" rx="3"
                fill="rgba(124,58,237,0.15)"
                stroke="rgba(124,58,237,0.4)"
                strokeWidth="0.5"
              />
              <rect x="132" y={200 + i * 20} width={8 + (i * 6)} height="4" rx="2"
                fill="rgba(124,58,237,0.7)"
              >
                <animate
                  attributeName="width"
                  values={`${8 + i * 6};${16 + i * 4};${8 + i * 6}`}
                  dur={`${1 + i * 0.4}s`}
                  repeatCount="indefinite"
                />
              </rect>
              <rect x="220" y={198 + i * 20} width="30" height="8" rx="3"
                fill="rgba(6,182,212,0.15)"
                stroke="rgba(6,182,212,0.4)"
                strokeWidth="0.5"
              />
              <rect x="222" y={200 + i * 20} width={10 + (i * 4)} height="4" rx="2"
                fill="rgba(6,182,212,0.7)"
              >
                <animate
                  attributeName="width"
                  values={`${10 + i * 4};${20 + i * 2};${10 + i * 4}`}
                  dur={`${1.2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </rect>
            </g>
          ))}

          {/* Scan line */}
          <rect x="110" y="175" width="160" height="3" rx="1"
            fill="rgba(6,182,212,0.7)"
            opacity="0"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;0,110;0,0"
              dur="2.5s"
              repeatCount="indefinite"
            />
            <animate attributeName="opacity"
              values="0;0.7;0.7;0"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </rect>

          {/* === LEFT ARM === */}
          <rect x="68" y="178" width="40" height="85" rx="10"
            fill="rgba(8,5,22,0.95)"
            stroke="rgba(124,58,237,0.7)"
            strokeWidth="1.5"
          />
          {/* Arm details */}
          <rect x="72" y="188" width="32" height="5" rx="2" fill="rgba(6,182,212,0.5)" />
          <rect x="72" y="200" width="32" height="5" rx="2" fill="rgba(124,58,237,0.5)" />
          <rect x="72" y="212" width="32" height="5" rx="2" fill="rgba(6,182,212,0.3)" />
          {/* Left hand */}
          <rect x="70" y="263" width="36" height="22" rx="6"
            fill="rgba(8,5,22,0.95)"
            stroke="rgba(6,182,212,0.7)"
            strokeWidth="1.5"
          />
          {/* Fingers */}
          {[0,1,2,3].map(i => (
            <rect key={i} x={73 + i * 8} y={258} width="5" height="8" rx="2"
              fill="rgba(124,58,237,0.6)"
              stroke="rgba(124,58,237,0.4)"
              strokeWidth="0.5"
            />
          ))}

          {/* === RIGHT ARM === */}
          <rect x="272" y="178" width="40" height="85" rx="10"
            fill="rgba(8,5,22,0.95)"
            stroke="rgba(124,58,237,0.7)"
            strokeWidth="1.5"
          />
          {/* Arm details */}
          <rect x="276" y="188" width="32" height="5" rx="2" fill="rgba(6,182,212,0.5)" />
          <rect x="276" y="200" width="32" height="5" rx="2" fill="rgba(124,58,237,0.5)" />
          <rect x="276" y="212" width="32" height="5" rx="2" fill="rgba(6,182,212,0.3)" />
          {/* Right hand */}
          <rect x="274" y="263" width="36" height="22" rx="6"
            fill="rgba(8,5,22,0.95)"
            stroke="rgba(6,182,212,0.7)"
            strokeWidth="1.5"
          />
          {/* Fingers */}
          {[0,1,2,3].map(i => (
            <rect key={i} x={277 + i * 8} y={258} width="5" height="8" rx="2"
              fill="rgba(124,58,237,0.6)"
              stroke="rgba(124,58,237,0.4)"
              strokeWidth="0.5"
            />
          ))}

          {/* === DATA STREAMS === */}
          <line x1="68" y1="224" x2="30" y2="200"
            stroke="rgba(6,182,212,0.4)" strokeWidth="1" strokeDasharray="4 3"
          >
            <animate attributeName="stroke-dashoffset" values="14;0" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1="312" y1="224" x2="350" y2="200"
            stroke="rgba(124,58,237,0.4)" strokeWidth="1" strokeDasharray="4 3"
          >
            <animate attributeName="stroke-dashoffset" values="14;0" dur="0.8s" repeatCount="indefinite" />
          </line>
          <line x1="190" y1="72" x2="190" y2="40"
            stroke="rgba(6,182,212,0.5)" strokeWidth="1" strokeDasharray="3 3"
          >
            <animate attributeName="stroke-dashoffset" values="12;0" dur="0.6s" repeatCount="indefinite" />
          </line>

          {/* Floating binary */}
          <text x="22" y="195" fontFamily="monospace" fontSize="9" fill="rgba(124,58,237,0.8)">01001</text>
          <text x="22" y="208" fontFamily="monospace" fontSize="9" fill="rgba(6,182,212,0.7)">10110</text>
          <text x="340" y="195" fontFamily="monospace" fontSize="9" fill="rgba(124,58,237,0.8)">11010</text>
          <text x="340" y="208" fontFamily="monospace" fontSize="9" fill="rgba(6,182,212,0.7)">00101</text>
          <text x="165" y="35" fontFamily="monospace" fontSize="9" fill="rgba(6,182,212,0.8)">AI</text>

          {/* Defs */}
          <defs>
            <filter id="eyeGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        </svg>

        {/* Orbiting rings around the whole thing */}
        <div style={{
          position: "absolute",
          inset: "5px",
          borderRadius: "50%",
          border: "1px solid rgba(124,58,237,0.3)",
          borderTop: "2px solid rgba(124,58,237,0.9)",
          borderRight: "1px solid transparent",
          animation: "rotateSlow 2.5s linear infinite",
        }} />
        <div style={{
          position: "absolute",
          inset: "18px",
          borderRadius: "50%",
          border: "1px solid rgba(6,182,212,0.2)",
          borderBottom: "1.5px solid rgba(6,182,212,0.8)",
          borderLeft: "1px solid transparent",
          animation: "rotateReverse 3.5s linear infinite",
        }} />
      </div>

      {/* Glow underneath */}
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
        filter: "blur(8px)",
        zIndex: 0,
        pointerEvents: "none",
      }} />

      {/* Rotating photo ring */}
      <div style={{
        position: "absolute",
        inset: "-6px",
        borderRadius: "50%",
        background: hovered
          ? "conic-gradient(from 0deg, #7c3aed, #06b6d4, #8b5cf6, #06b6d4, #7c3aed)"
          : "conic-gradient(from 0deg, #7c3aed, #06b6d4, #7c3aed)",
        animation: `rotateSlow ${hovered ? "1s" : "4s"} linear infinite`,
        opacity: hovered ? 1 : 0.8,
        transition: "opacity 0.3s ease",
        zIndex: 1,
      }} />

      {/* Counter ring on hover */}
      <div style={{
        position: "absolute",
        inset: "-14px",
        borderRadius: "50%",
        border: "1px dashed rgba(6,182,212,0.5)",
        animation: "rotateReverse 5s linear infinite",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        zIndex: 1,
      }} />

      {/* Dark border between ring and photo */}
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
        inset: "8px",
        borderRadius: "50%",
        overflow: "hidden",
        zIndex: 3,
        transform: hovered ? "scale(1.04)" : "scale(1)",
        transition: "transform 0.4s ease",
      }}>
        <Image
          src="/images/profile.webp"
          alt="Saif Ullah Arshad"
          fill
          sizes="(max-width: 768px) 100vw, 280px"
          style={{ objectFit: "cover", objectPosition: "center 15%" }}
          priority
        />
      </div>

      {/* AI Online label */}
      <div style={{
        position: "absolute",
        bottom: "-55px",
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "monospace",
        fontSize: "0.72rem",
        color: "var(--color-cyan)",
        whiteSpace: "nowrap",
        letterSpacing: "0.12em",
        zIndex: 4,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
        textShadow: "0 0 10px rgba(6,182,212,0.8)",
      }}>
        {"// AI System Online ●"}
      </div>
    </div>
  );
}
