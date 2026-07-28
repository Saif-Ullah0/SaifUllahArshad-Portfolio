"use client";

import { useRef, useState, useEffect } from "react";
import { projects } from "@/data/projects";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Project } from "@/types";

const CARD_COLORS = [
  { border: "rgba(124,58,237,0.6)", glow: "rgba(124,58,237,0.12)", accent: "#7c3aed" },
  { border: "rgba(6,182,212,0.6)", glow: "rgba(6,182,212,0.12)", accent: "#06b6d4" },
  { border: "rgba(16,185,129,0.6)", glow: "rgba(16,185,129,0.12)", accent: "#10b981" },
  { border: "rgba(248,113,113,0.6)", glow: "rgba(248,113,113,0.12)", accent: "#f87171" },
  { border: "rgba(251,146,60,0.6)", glow: "rgba(251,146,60,0.12)", accent: "#fb923c" },
  { border: "rgba(167,139,250,0.6)", glow: "rgba(167,139,250,0.12)", accent: "#a78bfa" },
  { border: "rgba(34,211,238,0.6)", glow: "rgba(34,211,238,0.12)", accent: "#22d3ee" },
];

function StickyCard({
  project,
  index,
  total,
  colors,
  isMobile,
}: {
  project: Project;
  index: number;
  total: number;
  colors: typeof CARD_COLORS[0];
  isMobile: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const wrapper = wrapperRef.current;
    if (!card || !wrapper) return;

    let rafId: number;

    const update = () => {
      const rect = wrapper.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Calculate progress of card entering view
      const progress = Math.max(0, Math.min(1, (windowH - rect.top) / (windowH * 0.4)));

      // Subtle scaling and upward translation as it overlays
      const scale = 0.94 + progress * 0.06;
      const yPx = Math.max(0, (1 - progress) * 40);

      card.style.transform = `translateY(${yPx}px) scale(${scale})`;

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [index, isMobile]);

  // Tight sticky top offsets so each card sits slightly lower than the last
  const TOP = isMobile ? 70 + index * 12 : 90 + index * 20;

  return (
    <div
      ref={wrapperRef}
      style={{
        // Reduced wrapper height so cards are close together
        height: index === total - 1 ? "auto" : isMobile ? "45vh" : "50vh",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: `${TOP}px`,
          zIndex: index + 1,
        }}
      >
        <div
          ref={cardRef}
          style={{
            willChange: "transform",
            transformOrigin: "top center",
          }}
        >
          <div
            style={{
              backgroundColor: "var(--color-surface)",
              border: `1px solid ${colors.border}`,
              borderRadius: isMobile ? "20px" : "28px",
              padding: isMobile ? "1.5rem 1.25rem" : "2.5rem",
              boxShadow: `0 -10px 40px rgba(0,0,0,0.5), 0 20px 60px ${colors.glow}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top shine */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`,
              }}
            />

            {/* Glow orb */}
            <div
              style={{
                position: "absolute",
                top: "-40px",
                right: "-40px",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />

            {/* Counter */}
            <div
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: colors.accent,
                opacity: 0.6,
              }}
            >
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>

            {/* Featured badge */}
            {project.featured && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: colors.accent,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "20px",
                  padding: "0.2rem 0.65rem",
                  display: "inline-block",
                  marginBottom: "0.75rem",
                  backgroundColor: colors.glow,
                }}
              >
                featured project
              </span>
            )}

            {isMobile ? (
              /* MOBILE — single column */
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    color: "var(--color-text-primary)",
                    letterSpacing: "-0.02em",
                    marginBottom: "0.75rem",
                    lineHeight: 1.25,
                    paddingRight: "3rem",
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.75,
                    marginBottom: "1rem",
                  }}
                >
                  {project.description}
                </p>

                {Object.keys(project.metrics).length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.6rem",
                      marginBottom: "1rem",
                      padding: "0.75rem",
                      backgroundColor: "var(--color-surface-2)",
                      borderRadius: "10px",
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.85rem",
                            fontWeight: 700,
                            color: "var(--color-success)",
                          }}
                        >
                          {value}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.65rem",
                            color: "var(--color-text-muted)",
                          }}
                        >
                          {key}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1rem" }}>
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        padding: "0.2rem 0.55rem",
                        borderRadius: "20px",
                        backgroundColor: "var(--color-surface-2)",
                        color: "var(--color-text-muted)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        color: "var(--color-text-secondary)",
                        textDecoration: "none",
                        padding: "0.4rem 0.9rem",
                        borderRadius: "8px",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <FaGithub size={12} /> GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        color: "white",
                        textDecoration: "none",
                        padding: "0.4rem 0.9rem",
                        borderRadius: "8px",
                        backgroundColor: colors.accent,
                      }}
                    >
                      <FaExternalLinkAlt size={10} />
                      {project.demo.includes("linkedin") ? "View Post" : "Live Demo"}
                    </a>
                  )}
                </div>
              </div>
            ) : (
              /* DESKTOP — two column */
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 0.8fr",
                  gap: "3rem",
                  alignItems: "start",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                      letterSpacing: "-0.02em",
                      marginBottom: "1rem",
                      lineHeight: 1.2,
                      paddingRight: "2rem",
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.8,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {project.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                    {project.stack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.72rem",
                          padding: "0.3rem 0.8rem",
                          borderRadius: "20px",
                          backgroundColor: "var(--color-surface-2)",
                          color: "var(--color-text-muted)",
                          border: "1px solid var(--color-border)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "1rem" }}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          color: "var(--color-text-secondary)",
                          textDecoration: "none",
                          padding: "0.5rem 1.25rem",
                          borderRadius: "8px",
                          border: "1px solid var(--color-border)",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = colors.accent;
                          e.currentTarget.style.color = colors.accent;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--color-border)";
                          e.currentTarget.style.color = "var(--color-text-secondary)";
                        }}
                      >
                        <FaGithub size={14} /> GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          color: "white",
                          textDecoration: "none",
                          padding: "0.5rem 1.25rem",
                          borderRadius: "8px",
                          backgroundColor: colors.accent,
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = "0.85";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = "1";
                        }}
                      >
                        <FaExternalLinkAlt size={12} />
                        {project.demo.includes("linkedin") ? "View Post" : "Live Demo"}
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  {Object.keys(project.metrics).length > 0 && (
                    <div
                      style={{
                        backgroundColor: "var(--color-surface-2)",
                        borderRadius: "16px",
                        padding: "1.5rem",
                        border: `1px solid ${colors.border}`,
                        marginBottom: "1rem",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.68rem",
                          color: colors.accent,
                          letterSpacing: "0.1em",
                          marginBottom: "1rem",
                          textTransform: "uppercase",
                        }}
                      >
                        Metrics
                      </p>
                      {Object.entries(project.metrics).map(([key, value], i, arr) => (
                        <div
                          key={key}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: i < arr.length - 1 ? "0.65rem" : 0,
                            paddingBottom: i < arr.length - 1 ? "0.65rem" : 0,
                            borderBottom: i < arr.length - 1 ? "1px solid var(--color-border)" : "none",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "0.82rem",
                              color: "var(--color-text-muted)",
                            }}
                          >
                            {key}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "1rem",
                              fontWeight: 700,
                              color: "var(--color-success)",
                            }}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div
                    style={{
                      backgroundColor: colors.glow,
                      borderRadius: "12px",
                      padding: "1rem 1.25rem",
                      border: `1px solid ${colors.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.85rem",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      Technologies
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: colors.accent,
                      }}
                    >
                      {project.stack.length}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="projects" style={{ padding: "6rem 1.5rem 10rem", position: "relative" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            color: "var(--color-cyan)",
            letterSpacing: "0.1em",
            marginBottom: "0.75rem",
          }}
        >
          {"// 03. projects"}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Things I Have Built
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              color: "var(--color-text-muted)",
              fontStyle: "italic",
            }}
          >
            Scroll to explore
          </p>
        </div>

        <div>
          {projects.map((project, index) => (
            <StickyCard
              key={project.id || index}
              project={project}
              index={index}
              total={projects.length}
              colors={CARD_COLORS[index % CARD_COLORS.length]}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}