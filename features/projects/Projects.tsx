"use client";

import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { useStaggerAnimation } from "@/hooks/useScrollAnimation";
import { useEffect } from "react";

export default function Projects() {
  const gridRef = useStaggerAnimation({
  from: { opacity: 0, y: 40 },
  to: { opacity: 1, y: 0, duration: 0.6 },
  stagger: 0.15,
});

useEffect(() => {
  const cards = document.querySelectorAll(".project-card");
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target as HTMLElement;
          const index = parseInt(card.dataset.index || "0");
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, index * 150);
          observer.unobserve(card);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => observer.observe(card));
  return () => observer.disconnect();
}, []);


  return (
    <section
      id="projects"
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
          {"// 03. projects"}
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
          Things I Have Built
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "var(--color-text-secondary)",
            marginBottom: "3rem",
            maxWidth: "500px",
          }}
        >
          A selection of projects spanning ML pipelines, AI agents, full stack
          applications, and HCI research.
        </p>

          {/* Projects grid */}
        <div
          id="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card"
              data-index={index}
              style={{
                opacity: 0,
                transform: "translateY(40px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}