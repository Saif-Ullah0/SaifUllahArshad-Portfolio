"use client";

import { useState } from "react";
import ScrambleText from "@/components/ScrambleText";
import { experiences } from "@/data/experience";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendar,
  FaLayerGroup,
  FaList,
} from "react-icons/fa";

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);
  const [layoutMode, setLayoutMode] = useState<"timeline" | "tabs">("timeline");

  return (
    <section
      id="experience"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "6rem 1.5rem",
        position: "relative",
      }}
    >
      <style>{`
        @keyframes lineGlowPulse {
          0% { top: 0%; opacity: 0.2; }
          50% { opacity: 1; }
          100% { top: 90%; opacity: 0.2; }
        }
        @keyframes activeStatusPing {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        
        .exp-card {
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 2rem;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .exp-card:hover {
          border-color: rgba(124, 58, 237, 0.5);
          box-shadow: 0 12px 30px rgba(124, 58, 237, 0.15), 0 0 15px rgba(6, 182, 212, 0.1);
          transform: translateY(-4px);
        }

        .tech-badge {
          font-family: var(--font-mono, monospace);
          font-size: 0.75rem;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          background: rgba(124, 58, 237, 0.1);
          color: var(--color-violet-light, #a78bfa);
          border: 1px solid rgba(124, 58, 237, 0.25);
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .tech-badge:hover {
          background: rgba(6, 182, 212, 0.15);
          color: #06b6d4;
          border-color: rgba(6, 182, 212, 0.5);
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.2);
          transform: translateY(-2px);
        }

        .tab-button {
          font-family: var(--font-mono, monospace);
          font-size: 0.85rem;
          padding: 0.8rem 1.25rem;
          text-align: left;
          background: transparent;
          border: none;
          border-left: 2px solid rgba(255, 255, 255, 0.1);
          color: var(--color-text-muted, #94a3b8);
          cursor: pointer;
          transition: all 0.25s ease;
          width: 100%;
        }

        .tab-button.active {
          color: var(--color-cyan, #06b6d4);
          border-left: 2px solid var(--color-cyan, #06b6d4);
          background: rgba(6, 182, 212, 0.08);
        }

        @media (max-width: 768px) {
          .exp-card { padding: 1.25rem; }
          .tabs-wrapper { flex-direction: column !important; }
          .tab-button { border-left: none; border-bottom: 2px solid rgba(255,255,255,0.1); }
          .tab-button.active { border-left: none; border-bottom: 2px solid var(--color-cyan, #06b6d4); }
        }
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        
        {/* Header Row with Layout Switcher */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.85rem",
                color: "var(--color-cyan, #06b6d4)",
                letterSpacing: "0.1em",
                marginBottom: "0.5rem",
              }}
            >
              {"// 02. EXPERIENCE_HISTORY"}
            </p>

            <h2
              style={{
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 700,
                color: "var(--color-text-primary, #f8fafc)",
                letterSpacing: "-0.02em",
              }}
            >
              <ScrambleText text="Where I Have Worked" />
            </h2>
          </div>

          {/* View Mode Toggle Controls */}
          <div
            style={{
              display: "flex",
              gap: "4px",
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
              padding: "3px",
            }}
          >
            <button
              onClick={() => setLayoutMode("timeline")}
              title="Timeline View"
              style={{
                background: layoutMode === "timeline" ? "var(--color-violet, #7c3aed)" : "transparent",
                color: layoutMode === "timeline" ? "#fff" : "var(--color-text-muted, #94a3b8)",
                border: "none",
                borderRadius: "6px",
                padding: "6px 12px",
                fontSize: "0.8rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.2s ease",
              }}
            >
              <FaList size={11} /> Timeline
            </button>
            <button
              onClick={() => setLayoutMode("tabs")}
              title="Tabbed View"
              style={{
                background: layoutMode === "tabs" ? "var(--color-violet, #7c3aed)" : "transparent",
                color: layoutMode === "tabs" ? "#fff" : "var(--color-text-muted, #94a3b8)",
                border: "none",
                borderRadius: "6px",
                padding: "6px 12px",
                fontSize: "0.8rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.2s ease",
              }}
            >
              <FaLayerGroup size={11} /> Interactive Tabs
            </button>
          </div>
        </div>

        {/* --- VIEW MODE 1: TIMELINE --- */}
        {layoutMode === "timeline" && (
          <div style={{ position: "relative", paddingLeft: "2rem" }}>
            {/* Main Neon Timeline Line */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "2px",
                background: "linear-gradient(to bottom, var(--color-violet, #7c3aed), var(--color-cyan, #06b6d4), transparent)",
              }}
            >
              {/* Laser Beam Pulse Element */}
              <div
                style={{
                  position: "absolute",
                  left: "-1px",
                  width: "4px",
                  height: "80px",
                  background: "linear-gradient(to bottom, transparent, #06b6d4, #ffffff, transparent)",
                  boxShadow: "0 0 10px #06b6d4",
                  animation: "lineGlowPulse 4s ease-in-out infinite",
                }}
              />
            </div>

            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                style={{
                  position: "relative",
                  marginBottom: index === experiences.length - 1 ? 0 : "3rem",
                }}
              >
                {/* Node Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-2.45rem",
                    top: "0.5rem",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    backgroundColor: exp.current ? "#06b6d4" : "var(--color-surface, #0f172a)",
                    border: `2px solid ${exp.current ? "#06b6d4" : "var(--color-violet, #7c3aed)"}`,
                    boxShadow: exp.current ? "0 0 12px #06b6d4" : "0 0 6px var(--color-violet, #7c3aed)",
                    zIndex: 2,
                  }}
                >
                  {exp.current && (
                    <div
                      style={{
                        position: "absolute",
                        inset: "-4px",
                        borderRadius: "50%",
                        border: "2px solid #06b6d4",
                        animation: "activeStatusPing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite",
                      }}
                    />
                  )}
                </div>

                {/* Experience Card */}
                <div className="exp-card">
                  {/* Header Row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-heading, sans-serif)", fontSize: "1.2rem", fontWeight: 600, color: "var(--color-text-primary, #f8fafc)" }}>
                        {exp.role}
                      </h3>
                      <p style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "0.95rem", color: "var(--color-violet-light, #a78bfa)", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.2rem" }}>
                        <FaBriefcase size={12} color="#06b6d4" />
                        {exp.company}
                      </p>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.8rem", color: "var(--color-text-muted, #94a3b8)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <FaCalendar size={11} />
                        {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                      </p>
                      <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.75rem", color: exp.current ? "#10b981" : "var(--color-text-muted, #94a3b8)", display: "flex", alignItems: "center", gap: "0.4rem", justifyContent: "flex-end", marginTop: "0.25rem" }}>
                        <FaMapMarkerAlt size={10} />
                        {exp.current ? "Current Location" : exp.location}
                      </p>
                    </div>
                  </div>

                  <div style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.08)", margin: "1rem 0" }} />

                  {/* Bullet Highlights */}
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem 0", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {exp.description.map((point, i) => (
                      <li key={i} style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "0.9rem", color: "var(--color-text-secondary, #cbd5e1)", lineHeight: 1.6, paddingLeft: "1.25rem", position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: "var(--color-cyan, #06b6d4)" }}>▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Stack Badges */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {exp.stack.map((tech) => (
                      <span key={tech} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- VIEW MODE 2: INTERACTIVE TABS --- */}
        {layoutMode === "tabs" && (
          <div className="tabs-wrapper" style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
            {/* Left Sidebar Switcher */}
            <div style={{ minWidth: "220px", display: "flex", flexDirection: "column" }}>
              {experiences.map((exp, idx) => (
                <button
                  key={exp.id}
                  onClick={() => setActiveTab(idx)}
                  className={`tab-button ${activeTab === idx ? "active" : ""}`}
                >
                  {exp.company}
                </button>
              ))}
            </div>

            {/* Right Active Experience Details */}
            <div className="exp-card" style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 600, color: "var(--color-text-primary, #f8fafc)" }}>
                    {experiences[activeTab].role}
                  </h3>
                  <p style={{ color: "var(--color-violet-light, #a78bfa)", fontSize: "1rem", marginTop: "0.2rem" }}>
                    @ {experiences[activeTab].company}
                  </p>
                </div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.8rem", color: "var(--color-text-muted, #94a3b8)" }}>
                  <p><FaCalendar size={11} style={{ marginRight: "6px" }} /> {experiences[activeTab].startDate} — {experiences[activeTab].current ? "Present" : experiences[activeTab].endDate}</p>
                </div>
              </div>

              <div style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.08)", margin: "1.2rem 0" }} />

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {experiences[activeTab].description.map((point, i) => (
                  <li key={i} style={{ fontSize: "0.92rem", color: "var(--color-text-secondary, #cbd5e1)", lineHeight: 1.6, paddingLeft: "1.25rem", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "var(--color-cyan, #06b6d4)" }}>▸</span>
                    {point}
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {experiences[activeTab].stack.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}