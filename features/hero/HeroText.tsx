"use client";

import { profile } from "@/data/profile";

export default function HeroText() {
  return (
    <div
      style={{
        textAlign: "center",
        maxWidth: "800px",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Small label above name */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          color: "var(--color-cyan)",
          marginBottom: "1.5rem",
          letterSpacing: "0.1em",
        }}
      >
        {"// Hello, world. I'm"}
      </p>

      {/* Name */}
      <h1
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
          fontWeight: 700,
          color: "var(--color-text-primary)",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginBottom: "1rem",
        }}
      >
        {profile.name}
      </h1>

      {/* Tagline */}
      <h2
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(1.2rem, 3vw, 2rem)",
          fontWeight: 500,
          color: "var(--color-violet-light)",
          letterSpacing: "-0.01em",
          marginBottom: "1.5rem",
        }}
      >
        {profile.tagline}
      </h2>

      {/* Bio */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
          color: "var(--color-text-secondary)",
          lineHeight: 1.8,
          maxWidth: "600px",
          margin: "0 auto 2.5rem auto",
        }}
      >
        {profile.bio}
      </p>

      {/* CTA Buttons */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <a
          href="#projects"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            fontWeight: 600,
            padding: "0.75rem 2rem",
            borderRadius: "8px",
            backgroundColor: "var(--color-violet)",
            color: "white",
            textDecoration: "none",
            transition: "all 0.2s ease",
            border: "1px solid var(--color-violet)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-violet-light)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-violet)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          View Projects
        </a>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            fontWeight: 600,
            padding: "0.75rem 2rem",
            borderRadius: "8px",
            backgroundColor: "transparent",
            color: "var(--color-text-primary)",
            textDecoration: "none",
            transition: "all 0.2s ease",
            border: "1px solid var(--color-border)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-violet)";
            e.currentTarget.style.color = "var(--color-violet)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.color = "var(--color-text-primary)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Download Resume
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "-120px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--color-text-muted)",
            letterSpacing: "0.1em",
          }}
        >
          scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "50px",
            background:
              "linear-gradient(to bottom, var(--color-violet), transparent)",
          }}
        />
      </div>
    </div>
  );
}