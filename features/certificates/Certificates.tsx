"use client";

import { useState } from "react";
import { certificates } from "@/data/certificates";
import Image from "next/image";
import { FaTimes, FaExpand } from "react-icons/fa";

export default function Certificates() {
  const [selected, setSelected] = useState<number | null>(null);

  const issuerColors: Record<string, string> = {
    "NVIDIA": "#76b900",
    "Google x Kaggle": "#4285f4",
    "DeepLearning.AI": "#0084ff",
    "Kaggle": "#20beff",
    "Cisco": "#1ba0d7",
  };

  const certImages: Record<string, string> = {
  "nvidia-genai": "/images/certs/NvidiaGenAI.png",
  "anthropic-fluency": "/images/certs/AnthropicAIFluency.png",
  "anthropic-claude": "/images/certs/AnthropicClaude101.png",
  "google-kaggle-agents": "/images/certs/google-kaggle.png",
  "deeplearning-ai": "/images/certs/deeplearning.png",
  "kaggle-ml": "/images/certs/kaggle-ml.png",
  "kaggle-pandas": "/images/certs/kaggle-pandas.png",
  "cisco-python": "/images/certs/cisco.png",
};
  return (
    <section
      id="certificates"
      style={{ padding: "6rem 1.5rem" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>

        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          color: "var(--color-cyan)",
          letterSpacing: "0.1em",
          marginBottom: "0.75rem",
        }}>
          {"// 05. certifications"}
        </p>

        <h2 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 700,
          color: "var(--color-text-primary)",
          letterSpacing: "-0.02em",
          marginBottom: "1rem",
        }}>
          Certifications
        </h2>

        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
          color: "var(--color-text-secondary)",
          marginBottom: "3rem",
          maxWidth: "500px",
        }}>
          Continuous learning through industry-recognized courses and programs.
        </p>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.25rem",
        }}>
          {certificates.map((cert, index) => {
            const color = issuerColors[cert.issuer] || "var(--color-violet)";
            const imgSrc = certImages[cert.id];
            return (
              <div
                key={cert.id}
                onClick={() => setSelected(index)}
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = color;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 8px 30px ${color}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Certificate image preview */}
                {imgSrc && (
                  <div style={{ position: "relative", width: "100%", height: "160px", overflow: "hidden" }}>
                    <Image
                      src={imgSrc}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to bottom, transparent 50%, var(--color-surface) 100%)",
                    }} />
                    <div style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      borderRadius: "6px",
                      padding: "0.25rem 0.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}>
                      <FaExpand size={10} color="white" />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "white" }}>view</span>
                    </div>
                  </div>
                )}

                {/* Info */}
                <div style={{ padding: "1rem 1.25rem", borderTop: `2px solid ${color}` }}>
                  <p style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                    marginBottom: "0.35rem",
                  }}>
                    {cert.title}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: color,
                      fontWeight: 500,
                    }}>
                      {cert.issuer}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      color: "var(--color-text-muted)",
                    }}>
                      {cert.date}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 9000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "800px",
              width: "100%",
              backgroundColor: "var(--color-surface)",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid var(--color-border)",
            }}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close certificate"
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                zIndex: 10,
                backgroundColor: "rgba(0,0,0,0.6)",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "white",
              }}
            >
              <FaTimes size={14} />
            </button>

            {certImages[certificates[selected].id] && (
              <div style={{ position: "relative", width: "100%", height: "500px" }}>
                <Image
                  src={certImages[certificates[selected].id]}
                  alt={certificates[selected].title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}

            <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid var(--color-border)" }}>
              <p style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.25rem",
              }}>
                {certificates[selected].title}
              </p>
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: issuerColors[certificates[selected].issuer] || "var(--color-violet)",
              }}>
                {certificates[selected].issuer} · {certificates[selected].date}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
