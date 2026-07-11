"use client";

import { skills } from "@/data/skills";

const categories = [
  { key: "ml", label: "ML / AI" },
  { key: "web", label: "Full Stack" },
  { key: "tools", label: "Tools" },
];

export default function Skills() {
  return (
    <section
      id="skills"
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
          {"// 04. skills"}
        </p>

        {/* Section heading */}
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            letterSpacing: "-0.02em",
            marginBottom: "1rem",
          }}
        >
          What I Work With
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "var(--color-text-secondary)",
            marginBottom: "3.5rem",
            maxWidth: "500px",
          }}
        >
          Technologies and tools I use across machine learning, full stack
          development, and everything in between.
        </p>

        {/* Categories */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
          }}
        >
          {categories.map((cat) => {
            const filtered = skills.filter((s) => s.category === cat.key);
            return (
              <div key={cat.key}>
                {/* Category label */}
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--color-text-muted)",
                    letterSpacing: "0.08em",
                    marginBottom: "1.25rem",
                    textTransform: "uppercase",
                  }}
                >
                  {cat.label}
                </p>

                {/* Skills grid */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                  }}
                >
                  {filtered.map((skill) => (
                    <div
                      key={skill.name}
                      style={{
                        backgroundColor: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "10px",
                        padding: "0.75rem 1.25rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        transition: "all 0.2s ease",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          cat.key === "ml"
                            ? "var(--color-violet)"
                            : cat.key === "web"
                            ? "var(--color-cyan)"
                            : "var(--color-text-muted)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.backgroundColor =
                          "var(--color-surface-2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "var(--color-border)";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.backgroundColor =
                          "var(--color-surface)";
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {skill.name}
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