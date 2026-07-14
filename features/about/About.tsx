"use client";

import { profile } from "@/data/profile";
import Image from "next/image";

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
      <style>{`
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotateFast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .photo-wrapper:hover .ring-outer {
          animation-duration: 1.5s !important;
          opacity: 1 !important;
        }
        .photo-wrapper:hover .ring-inner {
          animation-duration: 2s !important;
        }
        .photo-wrapper:hover .glow {
          opacity: 0.5 !important;
        }
      `}</style>

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
            alignItems: "center",
          }}
        >
          {/* Left — photo */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            {/* Photo with animated ring */}
            <div
              className="photo-wrapper"
              style={{
                position: "relative",
                width: "280px",
                height: "280px",
                animation: "floatUpDown 4s ease-in-out infinite",
              }}
            >
              {/* Glow underneath */}
              <div
                className="glow"
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "200px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "radial-gradient(ellipse, rgba(124, 58, 237, 0.3) 0%, transparent 70%)",
                  opacity: 0.2,
                  transition: "opacity 0.3s ease",
                  filter: "blur(8px)",
                }}
              />

              {/* Outer rotating ring */}
              <div
                className="ring-outer"
                style={{
                  position: "absolute",
                  inset: "-6px",
                  borderRadius: "50%",
                  background: "conic-gradient(from 0deg, #7c3aed, #06b6d4, #7c3aed)",
                  animation: "rotateSlow 4s linear infinite",
                  opacity: 0.8,
                  transition: "animation-duration 0.3s ease, opacity 0.3s ease",
                }}
              />

              {/* Inner counter-rotating ring */}
              <div
                className="ring-inner"
                style={{
                  position: "absolute",
                  inset: "-3px",
                  borderRadius: "50%",
                  background: "conic-gradient(from 180deg, transparent 60%, rgba(124, 58, 237, 0.4) 100%)",
                  animation: "rotateFast 3s linear infinite reverse",
                }}
              />

              {/* Dark ring to create border effect */}
              <div
                style={{
                  position: "absolute",
                  inset: "4px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-background)",
                  zIndex: 1,
                }}
              />

              {/* Photo */}
              <div
                style={{
                  position: "absolute",
                  inset: "12px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  zIndex: 2,
                }}
              >
                <Image
                  src="/images/profile.webp"
                  alt="Saif Ullah Arshad"
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  style={{ objectFit: "cover", objectPosition: "15%" }}
                  priority
                />
              </div>
            </div>

            {/* Stats grid below photo */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
                width: "100%",
                maxWidth: "280px",
              }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "10px",
                    padding: "1rem",
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
                      fontSize: "1.8rem",
                      fontWeight: 700,
                      color: "var(--color-violet)",
                      lineHeight: 1,
                      marginBottom: "0.3rem",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      color: "var(--color-text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — text */}
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

            {/* University card */}
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem 1.25rem",
                borderRadius: "8px",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderLeft: "3px solid var(--color-cyan)",
                transition: "border-color 0.2s ease",
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
