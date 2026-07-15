import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "urban-crash-agent",
    title: "Urban Crash Safety Agent",
    description:
      "ADK-based AI agent for urban road safety analysis on 500K+ NYC collision records. Full ML pipeline with XGBoost, GeoPandas spatial joins, SMOTE for class imbalance, and a NetworkX safe-routing prototype using risk-weighted Dijkstra.",
    stack: ["Python", "XGBoost", "GeoPandas", "Google ADK", "MCP", "FastAPI", "NetworkX"],
    metrics: { "F1 Score": "0.848", "AUC": "0.971", "Records": "500K+" },
    github: "https://github.com/Saif-Ullah0/urban-crash-safety-agent",
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
    github: "https://github.com/Saif-Ullah0/traffic-sign-classifier-pytorch",
    demo: "https://www.linkedin.com/posts/saif-ullah-arshad-40797a265_ai-computervision-roadsafety-activity-7338484344568606722-28Q8",
    featured: true,
    thumbnail: "/images/traffic-sign.png",
  },
  {
    id: "edtech-platform",
    title: "EdTech Learning Platform",
    description:
      "Full-stack EdTech platform with course enrollment, progress tracking, and Stripe payment integration. Built with React, Node.js, Express, and PostgreSQL. Migrated from MongoDB to PostgreSQL for improved performance.",
    stack: ["React.js", "Node.js", "Express", "PostgreSQL", "Stripe", "MongoDB"],
    metrics: { "Learners": "5000+", "APIs": "500+ daily", "Tables": "12+" },
    github: "https://github.com/Saif-Ullah0/Edtech-Platform",
    demo: null,
    featured: true,
    thumbnail: "/images/edtech.png",
  },
  {
    id: "medilink",
    title: "MediLink Clinic Management",
    description:
      "Comprehensive healthcare management system with patient records, appointment scheduling, and role-based access control. Built with MySQL database and full CRUD operations for clinic workflows.",
    stack: ["React", "Node.js", "MySQL", "REST API"],
    metrics: { "Modules": "5+", "Access Roles": "3" },
    github: "https://github.com/Saif-Ullah0/Medilink-user-app",
    demo: null,
    featured: false,
    thumbnail: "/images/medilink.png",
  },
  {
    id: "circuit-breaker",
    title: "FastAPI Circuit Breaker",
    description:
      "Implementation of the Circuit Breaker distributed systems pattern using FastAPI. Handles failure detection, state transitions (closed, open, half-open), and automatic recovery for resilient microservice communication.",
    stack: ["FastAPI", "Python", "Distributed Systems", "Microservices"],
    metrics: { "Pattern": "Circuit Breaker", "States": "3", "Tests": "8/8" },
    github: "https://github.com/Saif-Ullah0/PDC-Sp24-BSCS23065-Ullah",
    demo: null,
    featured: false,
    thumbnail: "/images/circuit-breaker.png",
  },
  {
    id: "eternal-night",
    title: "Eternal Night — Horror Game",
    description:
      "3D horror survival game built in Unity set in a dark jungle village overrun by zombies. Features weapon switching, enemy AI, atmospheric environments, and immersive mechanics. Rebuilt from scratch in one week after major data loss.",
    stack: ["Unity", "C#", "Maya", "Firebase", "3D Modeling"],
    metrics: { "Games Built": "10+", "Type": "3D Horror" },
    github: "",
    demo: "https://www.linkedin.com/posts/saif-ullah-arshad-40797a265_gamedevelopment-unity3d-horrorgame-activity-7290616000654274560-gaUe",
    featured: false,
    thumbnail: "/images/eternal-night.png",
  },
  {
    id: "paint-brush",
    title: "Paint Brush App",
    description:
      "Feature-rich drawing application built with Python and Tkinter for OOP course final project. Includes brush and eraser tools, shape drawing, color selection, gradients, text addition, undo/redo, zoom, and save/load functionality.",
    stack: ["Python", "Tkinter", "OOP"],
    metrics: { "Features": "10+", "Grade": "A+" },
    github: "",
    demo: "https://www.linkedin.com/posts/saif-ullah-arshad-40797a265_oop-python-tkinter-activity-7209508996477554689-PWFS",
    featured: false,
    thumbnail: "/images/paintbrush.png",
  },
];
