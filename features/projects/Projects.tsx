"use client";

import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
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
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}