"use client";

import { socials } from "@/data/socials";
import { profile } from "@/data/profile";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section
      id="contact"
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
          {"// 05. contact"}
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
          Get In Touch
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "var(--color-text-secondary)",
            marginBottom: "3.5rem",
            maxWidth: "500px",
            lineHeight: 1.8,
          }}
        >
          I am currently open to ML engineering and full stack internship
          opportunities. Whether you have a question, a project idea, or just
          want to say hi, my inbox is open.
        </p>

        {/* Two column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Left — info */}
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                marginBottom: "2.5rem",
              }}
            >
              {/* Email */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--color-text-muted)",
                    letterSpacing: "0.05em",
                    marginBottom: "0.35rem",
                  }}
                >
                  email
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-violet-light)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-text-primary)";
                  }}
                >
                  {profile.email}
                </a>
              </div>

              {/* Location */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--color-text-muted)",
                    letterSpacing: "0.05em",
                    marginBottom: "0.35rem",
                  }}
                >
                  location
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {profile.location}
                </p>
              </div>

              {/* Availability */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--color-text-muted)",
                    letterSpacing: "0.05em",
                    marginBottom: "0.35rem",
                  }}
                >
                  status
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-success)",
                      boxShadow: "0 0 8px var(--color-success)",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "1rem",
                      color: "var(--color-success)",
                    }}
                  >
                    Open to opportunities
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    padding: "0.5rem 1.25rem",
                    borderRadius: "8px",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-violet)";
                    e.currentTarget.style.color = "var(--color-violet-light)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.color = "var(--color-text-secondary)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
