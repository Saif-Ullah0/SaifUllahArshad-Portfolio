"use client";

import { profile } from "@/data/profile";

const stats = [
  { label: "CGPA", value: "3.2" },
  { label: "Year", value: "3rd" },
  { label: "Graduating", value: "2027" },
  { label: "Internships", value: "2" },
];

export default function About() {
  return (
    <section
      id="about"
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
          {"// 01. about me"}
        </p>

        {/* Section heading */}
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            letterSpacing: "-0.02em",
            marginBottom: "3rem",
          }}
        >
          Who I Am
        </h2>

        {/* Two column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Left — text */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.9,
                marginBottom: "1.5rem",
              }}
            >
              {profile.bio}
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.9,
                marginBottom: "1.5rem",
              }}
            >
              I enjoy working on problems where machine learning meets real-world
              impact — from analyzing 500K+ urban collision records to building
              AI agents with tool-use and human-in-the-loop safety checks.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.9,
              }}
            >
              When I am not coding, I am reading about AI research, contributing
              to Kaggle competitions, or exploring new frameworks to add to my
              toolkit.
            </p>

            {/* Currently box */}
            <div
              style={{
                marginTop: "2rem",
                padding: "1rem 1.25rem",
                borderRadius: "8px",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderLeft: "3px solid var(--color-violet)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "var(--color-cyan)",
                  marginBottom: "0.25rem",
                }}
              >
                currently
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  color: "var(--color-text-primary)",
                }}
              >
                ML Engineering Intern at FlyRank AI
              </p>
            </div>
          </div>

          {/* Right — stats grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  textAlign: "center",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-violet)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: "var(--color-violet)",
                    lineHeight: 1,
                    marginBottom: "0.5rem",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    color: "var(--color-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}

            {/* University card — full width */}
            <div
              style={{
                gridColumn: "1 / -1",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "12px",
                padding: "1.5rem",
                transition: "border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-cyan)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--color-cyan)",
                  marginBottom: "0.4rem",
                  letterSpacing: "0.05em",
                }}
              >
                university
              </p>
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  marginBottom: "0.25rem",
                }}
              >
                {profile.university}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                BS Computer Science, graduating {profile.graduationYear}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}