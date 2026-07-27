"use client";

import { useRef } from "react";
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
}: {
  project: Project;
  index: number;
  total: number;
  colors: typeof CARD_COLORS[0];
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.92, 1, index === total - 1 ? 1 : 0.96]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0.6]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.2],
    [80, 0]
  );

  return (
    <div
      ref={cardRef}
      style={{
        position: "sticky",
        top: `${80 + index * 8}px`,
        zIndex: index + 1,
        marginBottom: "2rem",
        paddingBottom: "1rem",
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          y,
        }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div
          style={{
            backgroundColor: "var(--color-surface)",
            border: `1px solid ${colors.border}`,
            borderRadius: "28px",
            padding: "2.5rem",
            boxShadow: `0 20px 60px ${colors.glow}, 0 4px 20px rgba(0,0,0,0.3)`,
            backdropFilter: "blur(20px)",
            position: "relative",
            overflow: "hidden",
            transition: "box-shadow 0.3s ease",
          }}
        >
          {/* Glassmorphism shine */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`,
          }} />

          {/* Background gradient accent */}
          <div style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />

          {/* Card number */}
          <div style={{
            position: "absolute",
            top: "1.5rem",
            right: "2rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: colors.accent,
            opacity: 0.6,
          }}>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
          }}>
            {/* Left — content */}
            <div>
              {project.featured && (
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: colors.accent,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "20px",
                  padding: "0.2rem 0.75rem",
                  display: "inline-block",
                  marginBottom: "1rem",
                  backgroundColor: colors.glow,
                }}>
                  featured project
                </span>
              )}

              <h3 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
                lineHeight: 1.2,
              }}>
                {project.title}
              </h3>

              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.8,
                marginBottom: "1.5rem",
              }}>
                {project.description}
              </p>

              {/* Stack badges */}
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "1.5rem",
              }}>
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

              {/* Links */}
              <div style={{ display: "flex", gap: "1.25rem" }}>
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
                    <FaGithub size={14} />
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
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <FaExternalLinkAlt size={12} />
                    {project.demo.includes("linkedin") ? "View Post" : "Live Demo"}
                  </a>
                )}
              </div>
            </div>

            {/* Right — metrics */}
            <div>
              {Object.keys(project.metrics).length > 0 && (
                <div style={{
                  backgroundColor: "var(--color-surface-2)",
                  borderRadius: "16px",
                  padding: "1.75rem",
                  border: `1px solid ${colors.border}`,
                  marginBottom: "1.25rem",
                }}>
                  <p style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: colors.accent,
                    letterSpacing: "0.1em",
                    marginBottom: "1rem",
                    textTransform: "uppercase",
                  }}>
                    Metrics
                  </p>
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div
                      key={key}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.75rem",
                        paddingBottom: "0.75rem",
                        borderBottom: "1px solid var(--color-border)",
                      }}
                    >
                      <span style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.85rem",
                        color: "var(--color-text-muted)",
                      }}>
                        {key}
                      </span>
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--color-success)",
                      }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech count */}
              <div style={{
                backgroundColor: colors.glow,
                borderRadius: "12px",
                padding: "1rem 1.25rem",
                border: `1px solid ${colors.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <span style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  color: "var(--color-text-secondary)",
                }}>
                  Technologies used
                </span>
                <span style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: colors.accent,
                }}>
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
  return (
    <section
      id="projects"
      style={{
        padding: "6rem 1.5rem",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>

        {/* Section label */}
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          color: "var(--color-cyan)",
          letterSpacing: "0.1em",
          marginBottom: "0.75rem",
        }}>
          {"// 03. projects"}
        </p>

        {/* Heading */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "4rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            letterSpacing: "-0.02em",
          }}>
            Things I Have Built
          </h2>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            color: "var(--color-text-muted)",
            fontStyle: "italic",
          }}>
            Scroll to explore
          </p>
        </div>

        {/* Sticky cards */}
        <div style={{ position: "relative" }}>
          {projects.map((project, index) => (
            <StickyCard
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              colors={CARD_COLORS[index % CARD_COLORS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}