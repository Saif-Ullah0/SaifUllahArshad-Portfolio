"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/data/projects";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Project } from "@/types";

const CARD_COLORS = [
  { border: "rgba(124,58,237,0.6)", glow: "rgba(124,58,237,0.15)", accent: "#7c3aed" },
  { border: "rgba(6,182,212,0.6)", glow: "rgba(6,182,212,0.15)", accent: "#06b6d4" },
  { border: "rgba(16,185,129,0.6)", glow: "rgba(16,185,129,0.15)", accent: "#10b981" },
  { border: "rgba(248,113,113,0.6)", glow: "rgba(248,113,113,0.15)", accent: "#f87171" },
  { border: "rgba(251,146,60,0.6)", glow: "rgba(251,146,60,0.15)", accent: "#fb923c" },
  { border: "rgba(167,139,250,0.6)", glow: "rgba(167,139,250,0.15)", accent: "#a78bfa" },
  { border: "rgba(34,211,238,0.6)", glow: "rgba(34,211,238,0.15)", accent: "#22d3ee" },
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
  colors: (typeof CARD_COLORS)[0];
  isMobile: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    // Trigger scroll relative to card entering viewport top area
    offset: ["start 0.9", "start 0.15"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [0.94, index === total - 1 ? 1 : 1 - (total - index) * 0.02]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [0.4, 1, 1]
  );

  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  // Reduced top offset for mobile to fit cards within screen bounds
  const stickyTop = isMobile ? 16 + index * 8 : 80 + index * 12;

  return (
    <div
      ref={cardRef}
      style={{
        position: "sticky",
        top: `${stickyTop}px`,
        zIndex: index + 1,
        marginBottom: isMobile ? "2rem" : "4rem",
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          y,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        <div
          style={{
            backgroundColor: "var(--color-surface)",
            border: `1px solid ${colors.border}`,
            borderRadius: isMobile ? "16px" : "28px",
            padding: isMobile ? "1rem" : "2.5rem",
            boxShadow: `0 20px 60px ${colors.glow}, 0 4px 20px rgba(0,0,0,0.3)`,
            backdropFilter: "blur(20px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glassmorphism shine */}
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

          {/* Background gradient accent */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: isMobile ? "100px" : "200px",
              height: isMobile ? "100px" : "200px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />

          {/* Card number */}
          <div
            style={{
              position: "absolute",
              top: isMobile ? "0.85rem" : "1.5rem",
              right: isMobile ? "0.85rem" : "2rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: colors.accent,
              opacity: 0.7,
            }}
          >
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
              gap: isMobile ? "1rem" : "3rem",
              alignItems: "center",
            }}
          >
            {/* Left — content */}
            <div>
              {project.featured && (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: colors.accent,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "20px",
                    padding: "0.1rem 0.5rem",
                    display: "inline-block",
                    marginBottom: isMobile ? "0.4rem" : "1rem",
                    backgroundColor: colors.glow,
                  }}
                >
                  featured project
                </span>
              )}

              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: isMobile
                    ? "1.2rem"
                    : "clamp(1.4rem, 2.5vw, 2rem)",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  letterSpacing: "-0.02em",
                  marginBottom: isMobile ? "0.4rem" : "1rem",
                  lineHeight: 1.2,
                  paddingRight: isMobile ? "2rem" : 0,
                }}
              >
                {project.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: isMobile ? "0.8rem" : "0.95rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: isMobile ? 1.5 : 1.8,
                  marginBottom: isMobile ? "0.85rem" : "1.5rem",
                }}
              >
                {project.description}
              </p>

              {/* Stack badges */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.35rem",
                  marginBottom: isMobile ? "0.85rem" : "1.5rem",
                }}
              >
                {project.stack.slice(0, isMobile ? 3 : 5).map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: isMobile ? "0.6rem" : "0.72rem",
                      padding: isMobile ? "0.15rem 0.5rem" : "0.3rem 0.8rem",
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

              {/* Links */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
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
                      fontSize: isMobile ? "0.75rem" : "0.875rem",
                      fontWeight: 500,
                      color: "var(--color-text-secondary)",
                      textDecoration: "none",
                      padding: isMobile ? "0.35rem 0.75rem" : "0.5rem 1.25rem",
                      borderRadius: "8px",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <FaGithub size={isMobile ? 12 : 14} />
                    GitHub
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
                      fontSize: isMobile ? "0.75rem" : "0.875rem",
                      fontWeight: 500,
                      color: "white",
                      textDecoration: "none",
                      padding: isMobile ? "0.35rem 0.75rem" : "0.5rem 1.25rem",
                      borderRadius: "8px",
                      backgroundColor: colors.accent,
                    }}
                  >
                    <FaExternalLinkAlt size={isMobile ? 10 : 12} />
                    {project.demo.includes("linkedin") ? "View Post" : "Live Demo"}
                  </a>
                )}
              </div>
            </div>

            {/* Right — metrics & tech count */}
            <div>
              {Object.keys(project.metrics).length > 0 && (
                <div
                  style={{
                    backgroundColor: "var(--color-surface-2)",
                    borderRadius: isMobile ? "10px" : "16px",
                    padding: isMobile ? "0.75rem" : "1.75rem",
                    border: `1px solid ${colors.border}`,
                    marginBottom: isMobile ? "0.5rem" : "1.25rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      color: colors.accent,
                      letterSpacing: "0.1em",
                      marginBottom: isMobile ? "0.4rem" : "1rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Metrics
                  </p>
                  <div
                    style={{
                      display: isMobile ? "flex" : "block",
                      flexWrap: "wrap",
                      gap: isMobile ? "0.5rem 1rem" : "0",
                    }}
                  >
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div
                        key={key}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginBottom: isMobile ? "0.25rem" : "0.5rem",
                          paddingBottom: isMobile ? "0.25rem" : "0.5rem",
                          borderBottom: "1px solid var(--color-border)",
                          flex: isMobile ? "1 1 40%" : "none",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: isMobile ? "0.7rem" : "0.85rem",
                            color: "var(--color-text-muted)",
                          }}
                        >
                          {key}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: isMobile ? "0.75rem" : "1rem",
                            fontWeight: 700,
                            color: "var(--color-success)",
                          }}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech count */}
              <div
                style={{
                  backgroundColor: colors.glow,
                  borderRadius: isMobile ? "8px" : "12px",
                  padding: isMobile ? "0.5rem 0.75rem" : "1rem 1.25rem",
                  border: `1px solid ${colors.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: isMobile ? "0.7rem" : "0.85rem",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Technologies used
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: isMobile ? "1rem" : "1.5rem",
                    fontWeight: 700,
                    color: colors.accent,
                  }}
                >
                  {project.stack.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <section
      id="projects"
      style={{
        padding: isMobile ? "3rem 0.75rem 4rem" : "6rem 1.5rem",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        {/* Section label */}
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

        {/* Heading */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: isMobile ? "1.5rem" : "4rem",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
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
              fontSize: "0.85rem",
              color: "var(--color-text-muted)",
              fontStyle: "italic",
            }}
          >
            Scroll to explore
          </p>
        </div>

        {/* Sticky cards */}
        <div style={{ position: "relative" }}>
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