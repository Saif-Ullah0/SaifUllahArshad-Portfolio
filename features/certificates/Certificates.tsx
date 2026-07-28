"use client";

import { useState, useEffect } from "react";
import { certificates } from "@/data/certificates";
import Image from "next/image";
import { FaTimes, FaExpand, FaExternalLinkAlt, FaCheckCircle, FaFilter } from "react-icons/fa";

export default function Certificates() {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("ALL");

  const issuerColors: Record<string, string> = {
    "NVIDIA": "#76b900",
    "Anthropic": "#d97706",
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

  // Close lightbox on Escape key press & prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };

    if (selected !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  // Unique list of issuers for filtering
  const availableIssuers = ["ALL", ...Array.from(new Set(certificates.map((c) => c.issuer)))];

  const filteredCertificates =
    filter === "ALL" ? certificates : certificates.filter((c) => c.issuer === filter);

  return (
    <section id="certificates" style={{ padding: "6rem 1.5rem", position: "relative" }}>
      <style>{`
        .cert-card {
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .cert-card:hover {
          transform: translateY(-6px);
        }

        .cert-img-container img {
          transition: transform 0.5s ease;
        }

        .cert-card:hover .cert-img-container img {
          transform: scale(1.06);
        }

        .filter-btn {
          font-family: var(--font-mono, monospace);
          font-size: 0.75rem;
          padding: 0.4rem 0.9rem;
          border-radius: 20px;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--color-text-muted, #94a3b8);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .filter-btn:hover, .filter-btn.active {
          color: #06b6d4;
          border-color: rgba(6, 182, 212, 0.5);
          background: rgba(6, 182, 212, 0.1);
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.15);
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        {/* Header Section */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.85rem",
              color: "var(--color-cyan, #06b6d4)",
              letterSpacing: "0.1em",
              marginBottom: "0.5rem",
            }}
          >
            {"// 05. CERTIFICATIONS_&_CREDENTIALS"}
          </p>

          <h2
            style={{
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 700,
              color: "var(--color-text-primary, #f8fafc)",
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}
          >
            Verified Credentials
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "1rem",
              color: "var(--color-text-secondary, #cbd5e1)",
              maxWidth: "540px",
            }}
          >
            Continuous skill validation through industry-leading AI research labs, platforms, and programs.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "2.5rem",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.75rem",
              color: "var(--color-text-muted, #94a3b8)",
              marginRight: "0.5rem",
            }}
          >
            <FaFilter size={10} color="#06b6d4" /> Filter:
          </span>
          {availableIssuers.map((issuer) => (
            <button
              key={issuer}
              onClick={() => setFilter(issuer)}
              className={`filter-btn ${filter === issuer ? "active" : ""}`}
            >
              {issuer}
            </button>
          ))}
        </div>

        {/* Grid Container */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredCertificates.map((cert) => {
            const index = certificates.findIndex((c) => c.id === cert.id);
            const color = issuerColors[cert.issuer] || "var(--color-violet, #7c3aed)";
            const imgSrc = certImages[cert.id] || cert.logo;

            return (
              <div
                key={cert.id}
                className="cert-card"
                onClick={() => setSelected(index)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${color}88`;
                  e.currentTarget.style.boxShadow = `0 10px 30px ${color}25, 0 0 15px ${color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Certificate Image Preview Box */}
                <div
                  className="cert-img-container"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "170px",
                    overflow: "hidden",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                  }}
                >
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        color: "var(--color-text-muted, #94a3b8)",
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "0.8rem",
                      }}
                    >
                      [NO_PREVIEW]
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to bottom, transparent 40%, rgba(15, 23, 42, 0.95) 100%)",
                    }}
                  />

                  {/* Expand Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      backgroundColor: "rgba(0,0,0,0.65)",
                      backdropFilter: "blur(4px)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "6px",
                      padding: "0.3rem 0.6rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <FaExpand size={10} color="#06b6d4" />
                    <span
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "0.65rem",
                        color: "#f8fafc",
                        letterSpacing: "0.05em",
                      }}
                    >
                      INSPECT
                    </span>
                  </div>

                  {/* Issuer Top Chip */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      left: "0.75rem",
                      backgroundColor: `${color}22`,
                      border: `1px solid ${color}66`,
                      borderRadius: "4px",
                      padding: "0.2rem 0.5rem",
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.65rem",
                      color: color,
                      fontWeight: 600,
                    }}
                  >
                    {cert.issuer}
                  </div>
                </div>

                {/* Info Section */}
                <div style={{ padding: "1.15rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading, sans-serif)",
                        fontSize: "0.98rem",
                        fontWeight: 600,
                        color: "var(--color-text-primary, #f8fafc)",
                        marginBottom: "0.4rem",
                        lineHeight: 1.35,
                      }}
                    >
                      {cert.title}
                    </h3>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "0.8rem",
                      paddingTop: "0.6rem",
                      borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "0.7rem",
                        color: "#10b981",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <FaCheckCircle size={10} /> Verified
                    </span>

                    <span
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "0.7rem",
                        color: "var(--color-text-muted, #94a3b8)",
                      }}
                    >
                      {cert.date}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modern Cyberpunk Lightbox Modal */}
      {selected !== null && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(5, 2, 20, 0.88)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "850px",
              width: "100%",
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              borderRadius: "16px",
              overflow: "hidden",
              border: `1px solid ${issuerColors[certificates[selected].issuer] || "#06b6d4"}66`,
              boxShadow: `0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px ${
                issuerColors[certificates[selected].issuer] || "#06b6d4"
              }25`,
            }}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelected(null)}
              aria-label="Close modal"
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                zIndex: 10,
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "50%",
                width: "38px",
                height: "38px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#f8fafc",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
                e.currentTarget.style.borderColor = "#ef4444";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(15, 23, 42, 0.8)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
              }}
            >
              <FaTimes size={14} />
            </button>

            {/* Modal Certificate Image */}
            {certImages[certificates[selected].id] && (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "clamp(260px, 50vh, 480px)",
                  backgroundColor: "rgba(0,0,0,0.6)",
                }}
              >
                <Image
                  src={certImages[certificates[selected].id]}
                  alt={certificates[selected].title}
                  fill
                  sizes="(max-width: 1200px) 100vw, 850px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}

            {/* Modal Footer Controls */}
            <div
              style={{
                padding: "1.25rem 1.5rem",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
                backgroundColor: "rgba(10, 15, 30, 0.9)",
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading, sans-serif)",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "#f8fafc",
                    marginBottom: "0.25rem",
                  }}
                >
                  {certificates[selected].title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.8rem",
                    color: issuerColors[certificates[selected].issuer] || "#06b6d4",
                  }}
                >
                  Issuer: {certificates[selected].issuer} • Issued: {certificates[selected].date}
                </p>
              </div>

              {certificates[selected].credentialUrl && (
                <a
                  href={certificates[selected].credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.6rem 1.2rem",
                    borderRadius: "8px",
                    backgroundColor: "var(--color-violet, #7c3aed)",
                    color: "#ffffff",
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    boxShadow: "0 0 15px rgba(124, 58, 237, 0.4)",
                    transition: "all 0.25s ease",
                  }}
                >
                  Verify Online <FaExternalLinkAlt size={10} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}