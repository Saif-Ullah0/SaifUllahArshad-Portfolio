"use client";

import ScrambleText from "@/components/ScrambleText";
import { experiences } from "@/data/experience";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendar,
  FaCode,
} from "react-icons/fa";
import { SiPython, SiReact, SiNodedotjs, SiPostgresql, SiFastapi, SiMongodb } from "react-icons/si";

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>

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
          {"// 02. experience"}
        </p>

        {/* Section heading */}
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            letterSpacing: "-0.02em",
            marginBottom: "4rem",
          }}
        >
        <ScrambleText text="Where I Have Worked" />        </h2>

        <style>{`
          .experience-timeline {
            position: relative;
            padding-left: 2rem;
          }
          .experience-card {
            background-color: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: 12px;
            padding: 1.75rem;
            transition: border-color 0.2s ease, transform 0.2s ease;
          }
          .experience-top-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
          }
          @media (max-width: 768px) {
            .experience-timeline {
              padding-left: 1rem;
            }
            .experience-card {
              padding: 1.25rem;
            }
            .experience-top-row {
              flex-direction: column;
              align-items: flex-start;
              gap: 0.75rem;
            }
          }
        `}</style>

        {/* Timeline */}
        <div className="experience-timeline">

          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "1px",
              background:
                "linear-gradient(to bottom, var(--color-violet), var(--color-cyan), transparent)",
            }}
          />

          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              style={{
                position: "relative",
                marginBottom: index === experiences.length - 1 ? 0 : "3.5rem",
              }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  position: "absolute",
                  left: "-2.4rem",
                  top: "0.4rem",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: exp.current
                    ? "var(--color-violet)"
                    : "var(--color-surface)",
                  border: "2px solid var(--color-violet)",
                  boxShadow: exp.current
                    ? "0 0 12px rgba(124, 58, 237, 0.6)"
                    : "none",
                }}
              />

              {/* Card */}
              <div
                className="experience-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-violet)";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                {/* Top row */}
                <div className="experience-top-row">
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.15rem",
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {exp.role}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.95rem",
                        color: "var(--color-violet-light)",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                    >
                      <FaBriefcase size={12} />
                      {exp.company}
                    </p>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8rem",
                        color: "var(--color-text-muted)",
                        marginBottom: "0.25rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                    >
                      <FaCalendar size={10} />
                      {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", justifyContent: "flex-end" }}>
                      {exp.current && (
                        <span
                          style={{
                            display: "inline-block",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: "var(--color-success)",
                            boxShadow: "0 0 6px var(--color-success)",
                          }}
                        />
                      )}
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.75rem",
                          color: exp.current
                            ? "var(--color-success)"
                            : "var(--color-text-muted)",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                        }}
                      >
                        <FaMapMarkerAlt size={10} />
                        {exp.current ? "Current" : exp.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "var(--color-border)",
                    margin: "1rem 0",
                  }}
                />

                {/* Description bullets */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 1.25rem 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                  }}
                >
                  {exp.description.map((point, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.7,
                        paddingLeft: "1.25rem",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "var(--color-violet)",
                          fontWeight: 700,
                        }}
                      >
                        ▸
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Tech stack badges */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "20px",
                        backgroundColor: "rgba(124, 58, 237, 0.1)",
                        color: "var(--color-violet-light)",
                        border: "1px solid rgba(124, 58, 237, 0.2)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}