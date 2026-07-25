"use client";

import { useEffect, useRef } from "react";

export default function HeroReveal() {
  const revealRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);
  const activeRef = useRef(false);

  useEffect(() => {
    const reveal = revealRef.current;
    if (!reveal) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      activeRef.current = true;
    };

    const onMouseLeave = () => {
      activeRef.current = false;
      if (reveal) {
        reveal.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const animate = () => {
      const raw = mouseRef.current;
      const smooth = smoothRef.current;

      smooth.x += (raw.x - smooth.x) * 0.1;
      smooth.y += (raw.y - smooth.y) * 0.1;

      if (reveal && activeRef.current) {
        reveal.style.opacity = "1";
        reveal.style.webkitMaskImage = `radial-gradient(circle ${300}px at ${smooth.x}px ${smooth.y}px, 
          rgba(0,0,0,1) 0%, 
          rgba(0,0,0,1) 38%, 
          rgba(0,0,0,0.82) 56%, 
          rgba(0,0,0,0.42) 72%, 
          rgba(0,0,0,0.12) 87%, 
          rgba(0,0,0,0) 100%)`;
        reveal.style.maskImage = `radial-gradient(circle ${300}px at ${smooth.x}px ${smooth.y}px, 
          rgba(0,0,0,1) 0%, 
          rgba(0,0,0,1) 38%, 
          rgba(0,0,0,0.82) 56%, 
          rgba(0,0,0,0.42) 72%, 
          rgba(0,0,0,0.12) 87%, 
          rgba(0,0,0,0) 100%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={revealRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        overflow: "hidden",
        opacity: 0,
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Dark tech background */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg, #050816 0%, #0a0520 40%, #050816 100%)",
      }} />

      {/* Animated grid */}
      <svg style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%", opacity: 0.3,
      }}>
        <defs>
          <pattern id="revgrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none"
              stroke="rgba(124,58,237,0.6)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#revgrid)" />
      </svg>

      {/* Neural network */}
      <svg style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%", opacity: 0.6,
      }}>
        {[
          { x1: "10%", y1: "20%", x2: "25%", y2: "45%" },
          { x1: "25%", y1: "45%", x2: "15%", y2: "70%" },
          { x1: "25%", y1: "45%", x2: "45%", y2: "30%" },
          { x1: "75%", y1: "25%", x2: "60%", y2: "55%" },
          { x1: "60%", y1: "55%", x2: "80%", y2: "70%" },
          { x1: "60%", y1: "55%", x2: "45%", y2: "75%" },
          { x1: "85%", y1: "15%", x2: "75%", y2: "25%" },
          { x1: "20%", y1: "85%", x2: "45%", y2: "75%" },
        ].map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(124,58,237,0.5)" strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}
        {[
          ["10%","20%"], ["25%","45%"], ["15%","70%"], ["45%","30%"],
          ["75%","25%"], ["60%","55%"], ["80%","70%"], ["45%","75%"],
          ["85%","15%"], ["20%","85%"],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="5"
            fill="rgba(6,182,212,0.9)"
            stroke="rgba(6,182,212,0.3)" strokeWidth="6"
          />
        ))}
      </svg>

      {/* Floating code */}
      {[
        { text: "import torch.nn as nn", x: "5%", y: "8%", c: "rgba(124,58,237,0.9)", s: "11px" },
        { text: "10110100 11001010", x: "60%", y: "5%", c: "rgba(6,182,212,0.8)", s: "10px" },
        { text: "def forward(self, x):", x: "68%", y: "12%", c: "rgba(16,185,129,0.9)", s: "11px" },
        { text: "F1: 0.848 | AUC: 0.971", x: "5%", y: "50%", c: "rgba(16,185,129,1)", s: "12px" },
        { text: "01001101 10110011", x: "72%", y: "48%", c: "rgba(124,58,237,0.8)", s: "10px" },
        { text: "gradient_descent(lr=0.001)", x: "3%", y: "88%", c: "rgba(6,182,212,0.9)", s: "10px" },
        { text: "XGBoost.predict(df)", x: "60%", y: "90%", c: "rgba(248,113,113,0.9)", s: "10px" },
        { text: "attention(Q, K, V)", x: "38%", y: "6%", c: "rgba(6,182,212,0.8)", s: "10px" },
        { text: "loss.backward()", x: "3%", y: "30%", c: "rgba(248,113,113,0.8)", s: "10px" },
        { text: "∑ w·x + b = ŷ", x: "78%", y: "82%", c: "rgba(124,58,237,0.9)", s: "13px" },
        { text: "Records: 500K+", x: "3%", y: "68%", c: "rgba(6,182,212,0.9)", s: "11px" },
        { text: "model.fit(X_train)", x: "55%", y: "70%", c: "rgba(16,185,129,0.8)", s: "10px" },
      ].map((item, i) => (
        <div key={i} style={{
          position: "absolute",
          left: item.x,
          top: item.y,
          fontFamily: "monospace",
          fontSize: item.s,
          color: item.c,
          whiteSpace: "nowrap",
          textShadow: "0 0 10px currentColor",
          letterSpacing: "0.05em",
        }}>
          {item.text}
        </div>
      ))}

      {/* Terminal */}
      <div style={{
        position: "absolute",
        bottom: "8%", left: "3%",
        backgroundColor: "rgba(5,8,22,0.97)",
        border: "1px solid rgba(124,58,237,0.6)",
        borderRadius: "8px",
        padding: "12px 16px",
        fontFamily: "monospace",
        fontSize: "10px",
        width: "240px",
        boxShadow: "0 0 30px rgba(124,58,237,0.25)",
      }}>
        <div style={{ display: "flex", gap: "5px", marginBottom: "8px" }}>
          {["#ff5f57","#febc2e","#28c840"].map((c, i) => (
            <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: c }} />
          ))}
        </div>
        <div style={{ color: "rgba(148,163,184,0.8)", marginBottom: "2px" }}>$ python train.py</div>
        <div style={{ color: "rgba(124,58,237,0.9)" }}>Training pipeline...</div>
        <div style={{ color: "rgba(148,163,184,0.6)" }}>Epoch [50/50]</div>
        <div style={{ color: "rgba(16,185,129,1)", marginTop: "4px" }}>✓ F1: 0.848 | AUC: 0.971</div>
        <div style={{ color: "rgba(6,182,212,0.9)" }}>Model saved ✓</div>
      </div>

      {/* Stats card */}
      <div style={{
        position: "absolute",
        top: "8%", right: "3%",
        backgroundColor: "rgba(5,8,22,0.97)",
        border: "1px solid rgba(6,182,212,0.5)",
        borderRadius: "8px",
        padding: "14px 18px",
        fontFamily: "monospace",
        fontSize: "11px",
        width: "200px",
        boxShadow: "0 0 30px rgba(6,182,212,0.2)",
      }}>
        <div style={{
          color: "white", fontSize: "12px",
          fontWeight: 600, marginBottom: "10px",
          fontFamily: "sans-serif",
        }}>
          ML Engineer Stats
        </div>
        {[
          { label: "Projects", value: "7+", c: "rgba(124,58,237,1)" },
          { label: "Accuracy", value: "92%", c: "rgba(16,185,129,1)" },
          { label: "F1 Score", value: "0.848", c: "rgba(16,185,129,1)" },
          { label: "Records", value: "500K+", c: "rgba(6,182,212,1)" },
          { label: "Internships", value: "2", c: "rgba(124,58,237,1)" },
        ].map((s, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between",
            marginBottom: "6px",
          }}>
            <span style={{ color: "rgba(148,163,184,0.8)" }}>{s.label}</span>
            <span style={{ color: s.c, fontWeight: 600 }}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Glowing orbs */}
      {[
        { x: "15%", y: "40%", c: "rgba(124,58,237,0.4)", s: "300px" },
        { x: "75%", y: "55%", c: "rgba(6,182,212,0.3)", s: "250px" },
        { x: "50%", y: "85%", c: "rgba(124,58,237,0.25)", s: "200px" },
      ].map((orb, i) => (
        <div key={i} style={{
          position: "absolute",
          left: orb.x, top: orb.y,
          width: orb.s, height: orb.s,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${orb.c} 0%, transparent 70%)`,
          filter: "blur(30px)",
          transform: "translate(-50%, -50%)",
        }} />
      ))}
    </div>
  );
}