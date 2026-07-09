import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "flyrank-ai",
    company: "FlyRank AI",
    role: "ML Engineering Intern",
    type: "internship",
    startDate: "July 2026",
    endDate: "August 2026",
    current: true,
    location: "Remote",
    description: [
      "Selected from 38,000+ applicants across 130 countries for the ML Engineering track.",
      "Working on ML pipelines and AI-driven features for the FlyRank platform.",
    ],
    stack: ["Python", "Machine Learning", "FastAPI"],
    logo: "/icons/flyrank.png",
  },
  {
    id: "nearpeer",
    company: "Nearpeer Private Limited",
    role: "Full Stack Engineer Intern",
    type: "internship",
    startDate: "June 2025",
    endDate: "September 2025",
    current: false,
    location: "Lahore, Pakistan",
    description: [
      "Built and maintained full stack features using React.js, Node.js, and PostgreSQL.",
      "Worked on Stripe payment integration, MongoDB data pipelines, and REST APIs.",
      "Collaborated in an agile team environment shipping production features weekly.",
    ],
    stack: ["React.js", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "Stripe"],
    logo: "/icons/nearpeer.png",
  },
];