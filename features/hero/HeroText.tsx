"use client";

import { profile } from "@/data/profile";
import { useEffect, useState } from "react";

const roles = [
  "ML Engineer",
  "Full Stack Developer",
  "AI Agent Builder",
  "CS Student @ ITU",
  "Python Developer",
];

export default function HeroText() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const role = roles[currentRole];

    if (!deleting && charIndex < role.length) {
      const timeout = setTimeout(() => {
        setDisplayed(role.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }

    if (!deleting && charIndex === role.length) {
      const timeout = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(timeout);
    }

    if (deleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayed(role.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 40);
      return () => clearTimeout(timeout);
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }
  }, [charIndex, deleting, currentRole]);

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

      {/* Typing animation */}
      <h2
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(1.2rem, 3vw, 2rem)",
          fontWeight: 500,
          letterSpacing: "-0.01em",
          marginBottom: "1.5rem",
          minHeight: "2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        <span style={{ color: "var(--color-violet-light)" }}>{displayed}</span>
        <span
          style={{
            display: "inline-block",
            width: "3px",
            height: "1.2em",
            backgroundColor: "var(--color-cyan)",
            borderRadius: "2px",
            animation: "cursorBlink 1s ease-in-out infinite",
          }}
        />
      </h2>

      <style>{`
        @keyframes cursorBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>

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