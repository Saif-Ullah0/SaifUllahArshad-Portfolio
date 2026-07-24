"use client";

import { useEffect, useRef } from "react";

const SPOTLIGHT_R = 180;

const BINARY_STRINGS = [
  "10110100 11001010 01110011",
  "def train(model, data):",
  "01001101 10110011",
  "import torch.nn as nn",
  "∑ w·x + b = ŷ",
  "11001010 01110110",
  "gradient_descent(lr=0.001)",
  "01101001 10010110",
  "attention(Q,K,V)",
  "10011010 01100101",
  "loss.backward()",
  "01110100 10110010",
  "model.fit(X_train)",
  "11010011 00101101",
  "F1: 0.848 | AUC: 0.971",
  "10100110 01011010",
  "neural_net.forward(x)",
  "01001011 10110100",
  "XGBoost.predict(df)",
  "10110001 01101100",
];

const NODES = Array.from({ length: 18 }, (_, i) => ({
  x: (i % 6) * 18 + 5,
  y: Math.floor(i / 6) * 32 + 10,
}));

export default function HeroSpotlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);
  const activeRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reveal = revealRef.current;
    if (!canvas || !reveal) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      activeRef.current = true;
    };

    const onMouseLeave = () => {
      activeRef.current = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const animate = () => {
      const mouse = mouseRef.current;
      const smooth = smoothRef.current;

      smooth.x += (mouse.x - smooth.x) * 0.08;
      smooth.y += (mouse.y - smooth.y) * 0.08;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (activeRef.current) {
        const grad = ctx.createRadialGradient(
          smooth.x, smooth.y, 0,
          smooth.x, smooth.y, SPOTLIGHT_R
        );
        grad.addColorStop(0, "rgba(255,255,255,1)");
        grad.addColorStop(0.35, "rgba(255,255,255,0.95)");
        grad.addColorStop(0.6, "rgba(255,255,255,0.6)");
        grad.addColorStop(0.8, "rgba(255,255,255,0.2)");
        grad.addColorStop(1, "rgba(255,255,255,0)");

        ctx.beginPath();
        ctx.arc(smooth.x, smooth.y, SPOTLIGHT_R, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      const dataUrl = canvas.toDataURL();
      reveal.style.webkitMaskImage = `url(${dataUrl})`;
      reveal.style.maskImage = `url(${dataUrl})`;
      reveal.style.webkitMaskSize = "100% 100%";
      reveal.style.maskSize = "100% 100%";

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Hidden canvas for mask generation */}
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      />

      {/* Reveal layer — only visible through spotlight */}
      <div
        ref={revealRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          overflow: "hidden",
          backgroundColor: "#050816",
        }}
      >
        {/* Neural network nodes */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6 }}
        >
          {NODES.map((node, i) => (
            <g key={i}>
              {NODES.slice(i + 1, i + 4).map((target, j) => (
                <line
                  key={j}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="rgba(124, 58, 237, 0.4)"
                  strokeWidth="0.5"
                />
              ))}
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="3"
                fill="rgba(6, 182, 212, 0.8)"
                style={{
                  animation: `circuitPulse ${1.5 + (i % 4) * 0.5}s ease-in-out infinite`,
                  animationDelay: `${(i % 6) * 0.2}s`,
                }}
              />
            </g>
          ))}
        </svg>

        {/* Circuit grid lines */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.3 }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i}>
              <line
                x1={`${i * 14}%`} y1="0"
                x2={`${i * 14}%`} y2="100%"
                stroke="rgba(124, 58, 237, 0.3)"
                strokeWidth="0.5"
                strokeDasharray="4 8"
              />
              <line
                x1="0" y1={`${i * 14}%`}
                x2="100%" y2={`${i * 14}%`}
                stroke="rgba(124, 58, 237, 0.3)"
                strokeWidth="0.5"
                strokeDasharray="4 8"
              />
            </g>
          ))}
        </svg>

        {/* Floating binary/code strings */}
        {BINARY_STRINGS.map((text, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${(i * 17 + 3) % 85}%`,
              top: `${(i * 13 + 5) % 88}%`,
              fontFamily: "monospace",
              fontSize: i % 3 === 0 ? "11px" : "9px",
              color: i % 4 === 0
                ? "rgba(6, 182, 212, 0.9)"
                : i % 4 === 1
                ? "rgba(124, 58, 237, 0.9)"
                : i % 4 === 2
                ? "rgba(16, 185, 129, 0.9)"
                : "rgba(248, 113, 113, 0.8)",
              whiteSpace: "nowrap",
              animation: `floatCode ${3 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i % 6) * 0.4}s`,
              textShadow: "0 0 8px currentColor",
              letterSpacing: "0.05em",
            }}
          >
            {text}
          </div>
        ))}

        {/* Glowing orbs */}
        {[
          { x: "20%", y: "30%", color: "rgba(124, 58, 237, 0.4)", size: "200px" },
          { x: "70%", y: "60%", color: "rgba(6, 182, 212, 0.3)", size: "150px" },
          { x: "50%", y: "80%", color: "rgba(124, 58, 237, 0.3)", size: "180px" },
          { x: "80%", y: "20%", color: "rgba(16, 185, 129, 0.3)", size: "120px" },
        ].map((orb, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              filter: "blur(20px)",
              animation: `floatCode ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Terminal window */}
        <div style={{
          position: "absolute",
          bottom: "15%",
          left: "5%",
          backgroundColor: "rgba(10, 10, 20, 0.9)",
          border: "1px solid rgba(124, 58, 237, 0.4)",
          borderRadius: "8px",
          padding: "12px 16px",
          fontFamily: "monospace",
          fontSize: "10px",
          color: "rgba(16, 185, 129, 0.9)",
          width: "220px",
          boxShadow: "0 0 20px rgba(124, 58, 237, 0.2)",
        }}>
          <div style={{ color: "rgba(248, 113, 113, 0.9)", marginBottom: "4px" }}>$ python train.py</div>
          <div>Epoch 1/50: loss=0.342</div>
          <div>Epoch 10/50: loss=0.156</div>
          <div>Epoch 50/50: loss=0.021</div>
          <div style={{ color: "rgba(6, 182, 212, 0.9)", marginTop: "4px" }}>F1: 0.848 | AUC: 0.971 ✓</div>
        </div>

        {/* Stats card */}
        <div style={{
          position: "absolute",
          top: "15%",
          right: "5%",
          backgroundColor: "rgba(10, 10, 20, 0.9)",
          border: "1px solid rgba(6, 182, 212, 0.4)",
          borderRadius: "8px",
          padding: "12px 16px",
          fontFamily: "monospace",
          fontSize: "10px",
          color: "rgba(6, 182, 212, 0.9)",
          width: "180px",
          boxShadow: "0 0 20px rgba(6, 182, 212, 0.15)",
        }}>
          <div style={{ color: "rgba(248, 248, 248, 0.9)", marginBottom: "6px", fontSize: "11px", fontWeight: 600 }}>
            Model Metrics
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
            <span style={{ color: "rgba(148, 163, 184, 0.9)" }}>Accuracy</span>
            <span style={{ color: "rgba(16, 185, 129, 0.9)" }}>92%</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
            <span style={{ color: "rgba(148, 163, 184, 0.9)" }}>F1 Score</span>
            <span style={{ color: "rgba(16, 185, 129, 0.9)" }}>0.848</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "rgba(148, 163, 184, 0.9)" }}>AUC-ROC</span>
            <span style={{ color: "rgba(16, 185, 129, 0.9)" }}>0.971</span>
          </div>
        </div>

        <style>{`
          @keyframes floatCode {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          @keyframes circuitPulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    </>
  );
}
