import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "urban-crash-agent",
    title: "Urban Crash Safety Agent",
    description:
      "ADK-based AI agent for urban road safety analysis on 500K+ NYC collision records. Full ML pipeline with XGBoost, GeoPandas spatial joins, SMOTE for class imbalance, and a NetworkX safe-routing prototype using risk-weighted Dijkstra.",
    stack: ["Python", "XGBoost", "GeoPandas", "Google ADK", "MCP", "FastAPI", "NetworkX", "SMOTE"],
    metrics: { "F1 Score": "0.848", "AUC": "0.971", "Records": "500K+" },
    github: "https://github.com/Saif-Ullah0/urban-crash-analysis-sds",
    demo: null,
    featured: true,
    thumbnail: "/images/urban-crash.png",
  },
  {
    id: "traffic-sign-classifier",
    title: "Traffic Sign Classifier",
    description:
      "CNN built with PyTorch achieving 92% accuracy on the GTSRB dataset of 49K+ images. Full pipeline includes data augmentation, class-balanced sampling, and hyperparameter tuning. Deployed as a real-time web classifier with OpenCV.",
    stack: ["PyTorch", "OpenCV", "Python", "CNN"],
    metrics: { "Accuracy": "92%", "Dataset": "49K+ images", "Improvement": "+11%" },
    github: "",
    demo: "",
    featured: true,
    thumbnail: "/images/traffic-sign.png",
  },
  {
    id: "hamsafar-pakistan",
    title: "HamSafar Pakistan",
    description:
      "HCI group project — a carpooling platform designed for Pakistani urban commuters. Produced complete user flow diagrams, lo-fi wireframes, cognitive walkthrough, and presentation following Norman's design principles.",
    stack: ["Figma", "HCI", "User Research", "Prototyping"],
    metrics: { "User Flows": "8", "Screens": "20+" },
    github: "",
    demo: null,
    featured: false,
    thumbnail: "/images/hamsafar.png",
  },
  {
    id: "circuit-breaker",
    title: "FastAPI Circuit Breaker",
    description:
      "Implementation of the Circuit Breaker distributed systems pattern using FastAPI. Handles failure detection, state transitions (closed, open, half-open), and automatic recovery for resilient microservice communication.",
    stack: ["FastAPI", "Python", "Distributed Systems", "Microservices"],
    metrics: { "Pattern": "Circuit Breaker", "States": "3" },
    github: "",
    demo: null,
    featured: false,
    thumbnail: "/images/circuit-breaker.png",
  },
];
