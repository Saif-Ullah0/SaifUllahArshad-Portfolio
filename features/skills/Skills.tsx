"use client";

import { useEffect, useState } from "react";
import { skills } from "@/data/skills";
import dynamic from "next/dynamic";
import ScrambleText from "@/components/ScrambleText";
import { FaCube, FaThLarge, FaSearch, FaTerminal } from "react-icons/fa";

const SkillsCanvas = dynamic(() => import("./SkillsCanvas"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(15, 23, 42, 0.3)",
        borderRadius: "16px",
        border: "1px dashed rgba(255, 255, 255, 0.1)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "0.85rem",
          color: "var(--color-cyan, #06b6d4)",
          letterSpacing: "0.1em",
        }}
      >
        [INITIALIZING_3D_CANVAS_SCENE...]
      </p>
    </div>
  ),
});

const categories = [
  { key: "ml", label: "ML / AI & Data", color: "#7c3aed" },
  { key: "web", label: "Full Stack Development", color: "#06b6d4" },
  { key: "tools", label: "Developer Tools & Infra", color: "#10b981" },
];

export default function Skills() {
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState<"3d" | "grid">("3d");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setViewMode("grid");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter skills based on search term
  const filteredSkills = skills.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section
      id="skills"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "6rem 1.5rem",
        position: "relative",
      }}
    >
      <style>{`
        .skill-card {
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 0.85rem 1.25rem;
          display: flex;
          alignItems: center;
          justify-content: space-between;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .skill-card:hover {
          transform: translateY(-3px);
        }

        .view-btn {
          font-family: var(--font-mono, monospace);
          font-size: 0.8rem;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          background: transparent;
          border: none;
          color: var(--color-text-muted, #94a3b8);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }

        .view-btn.active {
          background: var(--color-violet, #7c3aed);
          color: #ffffff;
          box-shadow: 0 0 12px rgba(124, 58, 237, 0.4);
        }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        {/* Header & Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
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
              {"// 04. TECH_STACK_&_ABILITIES"}
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
              <ScrambleText text="What I Work With" />
            </h2>
          </div>

          {/* Controls Bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            {/* Search Input */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                padding: "0.4rem 0.8rem",
              }}
            >
              <FaSearch size={12} color="#06b6d4" />
              <input
                type="text"
                placeholder="Search tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#f8fafc",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.8rem",
                  width: "120px",
                }}
              />
            </div>

            {/* View Mode Toggle Buttons */}
            {!isMobile && (
              <div
                style={{
                  display: "flex",
                  backgroundColor: "rgba(15, 23, 42, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  padding: "3px",
                }}
              >
                <button
                  onClick={() => setViewMode("3d")}
                  className={`view-btn ${viewMode === "3d" ? "active" : ""}`}
                >
                  <FaCube size={12} /> 3D Orbit
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                >
                  <FaThLarge size={12} /> Cyber Grid
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3D Canvas View Mode */}
        {!isMobile && viewMode === "3d" && searchQuery === "" && (
          <div style={{ marginBottom: "3rem", borderRadius: "16px", overflow: "hidden" }}>
            <SkillsCanvas />
          </div>
        )}

        {/* Cyberpunk Category Grid View */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
          }}
        >
          {categories.map((cat) => {
            const catSkills = filteredSkills.filter((s) => s.category === cat.key);
            if (catSkills.length === 0) return null;

            return (
              <div key={cat.key}>
                {/* Category Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  <FaTerminal size={12} color={cat.color} />
                  <p
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.85rem",
                      color: cat.color,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {cat.label}
                  </p>
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background: `linear-gradient(to right, ${cat.color}44, transparent)`,
                    }}
                  />
                </div>

                {/* Skills Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  {catSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="skill-card"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = cat.color;
                        e.currentTarget.style.boxShadow = `0 4px 20px ${cat.color}25, 0 0 10px ${cat.color}15`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {/* Accent Dot */}
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: cat.color,
                          boxShadow: `0 0 8px ${cat.color}`,
                          marginRight: "0.6rem",
                        }}
                      />

                      <span
                        style={{
                          fontFamily: "var(--font-body, sans-serif)",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          color: "#f8fafc",
                          flex: 1,
                        }}
                      >
                        {skill.name}
                      </span>

                      {/* HUD Corner Marker */}
                      <span
                        style={{
                          fontFamily: "var(--font-mono, monospace)",
                          fontSize: "0.65rem",
                          color: "rgba(255, 255, 255, 0.25)",
                        }}
                      >
                        SYS
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}