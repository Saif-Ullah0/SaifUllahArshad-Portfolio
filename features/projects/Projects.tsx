"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { projects } from "@/data/projects";
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Project } from "@/types";
import ScrambleText from "@/components/ScrambleText";

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "16px",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        height: "420px",
        boxSizing: "border-box",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        width: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-violet)";
        e.currentTarget.style.boxShadow = "0 0 25px rgba(124, 58, 237, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexShrink: 0 }}>
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            backgroundColor: "rgba(124, 58, 237, 0.1)",
            border: "1px solid rgba(124, 58, 237, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            flexShrink: 0,
          }}
        >
          ⬡
        </div>
        {project.featured && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              padding: "0.2rem 0.6rem",
              borderRadius: "20px",
              backgroundColor: "rgba(124, 58, 237, 0.15)",
              color: "var(--color-violet-light)",
              border: "1px solid rgba(124, 58, 237, 0.3)",
              flexShrink: 0,
            }}
          >
            featured
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "var(--color-text-primary)",
          letterSpacing: "-0.01em",
          flexShrink: 0,
          margin: 0,
        }}
      >
        {project.title}
      </h3>

      {/* Description — fixed height, ellipsis */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem",
          color: "var(--color-text-secondary)",
          lineHeight: 1.7,
          margin: 0,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          flexShrink: 0,
        }}
      >
        {project.description}
      </p>

      {/* Metrics */}
      {Object.keys(project.metrics).length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem",
            padding: "0.6rem 0.85rem",
            backgroundColor: "rgba(16, 185, 129, 0.05)",
            borderRadius: "8px",
            border: "1px solid rgba(16, 185, 129, 0.15)",
            flexShrink: 0,
          }}
        >
          {Object.entries(project.metrics).slice(0, 3).map(([key, value]) => (
            <div key={key} style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-success)", fontWeight: 700 }}>
                {value}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--color-text-muted)" }}>
                {key}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Stack badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", flexShrink: 0 }}>
        {project.stack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.67rem",
              padding: "0.18rem 0.55rem",
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

      {/* Links — pushed to bottom */}
      <div style={{ display: "flex", gap: "1rem", paddingTop: "0.6rem", borderTop: "1px solid var(--color-border)", marginTop: "auto", flexShrink: 0 }}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-text-secondary)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.35rem", transition: "color 0.2s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-violet-light)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-secondary)"; }}
          >
            <FaGithub size={13} /> GitHub
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-text-secondary)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.35rem", transition: "color 0.2s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-cyan)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-secondary)"; }}
          >
            <FaExternalLinkAlt size={11} />
            {project.demo.includes("linkedin") ? "View Post" : "Live Demo"}
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [cardsPerView, setCardsPerView] = useState(3);
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(true);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);
  const total = projects.length;

  // Clone cards for infinite effect
  const clonesBefore = projects.slice(-cardsPerView);
  const clonesAfter = projects.slice(0, cardsPerView);
  const allCards = [...clonesBefore, ...projects, ...clonesAfter];
  const startIndex = cardsPerView; // offset because of clones before

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCardsPerView(w < 768 ? 1 : w < 1024 ? 2 : 3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // When transitioning false (silent jump) — re-enable after tiny delay
  useEffect(() => {
    if (!transitioning) {
      const t = setTimeout(() => setTransitioning(true), 30);
      return () => clearTimeout(t);
    }
  }, [transitioning]);

  const next = useCallback(() => {
    setCurrent((prev) => {
      const n = prev + 1;
      if (n >= total) {
        // about to show after-clones — schedule silent jump to real start
        setTimeout(() => {
          setTransitioning(false);
          setCurrent(0);
        }, 520);
      }
      return n;
    });
    setTransitioning(true);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => {
      const n = prev - 1;
      if (n < 0) {
        setTimeout(() => {
          setTransitioning(false);
          setCurrent(total - 1);
        }, 520);
      }
      return n;
    });
    setTransitioning(true);
  }, [total]);

  // Auto play
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [paused, next]);

  const realIndex = ((current % total) + total) % total;

  // Translate: each card takes (100/cardsPerView)% width
  // current + startIndex because of clones before
  const translatePercent = -((current + startIndex) * (100 / cardsPerView));

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    setPaused(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = dragStartX.current - e.clientX;
    if (diff > 60) next();
    else if (diff < -60) prev();
    setTimeout(() => setPaused(false), 4000);
  };

  return (
    <section
      id="projects"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "6rem 1.5rem" }}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>

        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-cyan)", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
          {"// 03. projects"}
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--color-text-primary)", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
              <ScrambleText text="Things I Have Built" />
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
              {realIndex + 1} of {total} projects
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            {[
              { icon: <FaChevronLeft size={14} />, action: () => { setPaused(true); prev(); setTimeout(() => setPaused(false), 4500); } },
              { icon: <FaChevronRight size={14} />, action: () => { setPaused(true); next(); setTimeout(() => setPaused(false), 4500); } },
            ].map((btn, i) => (
              <button
                key={i}
                onClick={btn.action}
                style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)", color: "var(--color-text-primary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-violet)"; e.currentTarget.style.color = "var(--color-violet)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-text-primary)"; }}
              >
                {btn.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          style={{ overflow: "hidden", userSelect: "none" }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => { isDragging.current = false; }}
          onMouseEnter={() => setPaused(true)}
        >
          <div
            style={{
              display: "flex",
              gap: "20px",
              transform: `translateX(calc(${translatePercent}% - ${(current + startIndex) * 20 / cardsPerView}px))`,
              transition: transitioning ? "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
              cursor: isDragging.current ? "grabbing" : "grab",
              willChange: "transform",
            }}
          >
            {allCards.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                style={{
                  width: `calc(${100 / cardsPerView}% - ${20 * (cardsPerView - 1) / cardsPerView}px)`,
                  flexShrink: 0,
                  flexGrow: 0,
                }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2rem", alignItems: "center" }}>
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setTransitioning(true); setPaused(true); setTimeout(() => setPaused(false), 4000); }}
              style={{ width: i === realIndex ? "28px" : "8px", height: "8px", borderRadius: "4px", border: "none", backgroundColor: i === realIndex ? "var(--color-violet)" : "var(--color-border)", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }}
            />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "0.75rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--color-text-muted)", letterSpacing: "0.05em" }}>
            {paused ? "paused" : "auto-playing"} · hover to pause · drag to slide
          </p>
        </div>
      </div>
    </section>
  );
}