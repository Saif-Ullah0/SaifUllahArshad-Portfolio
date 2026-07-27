import type { Certificate } from "@/types";

export const certificates: Certificate[] = [
  {
    id: "nvidia-genai",
    title: "Generative AI Explained",
    issuer: "NVIDIA",
    date: "2025",
    credentialUrl: null,
    logo: "/images/certs/NvidiaGenAI.png", // Changed 'Al' to 'AI'
  },
  {
    id: "anthropic-fluency",
    title: "AI Fluency",
    issuer: "Anthropic",
    date: "2026",
    credentialUrl: null,
    logo: "/images/certs/AnthropicAIFluency.png", // Changed 'Al' to 'AI'
  },
  {
    id: "anthropic-claude",
    title: "Claude 101",
    issuer: "Anthropic",
    date: "2026",
    credentialUrl: null,
    logo: "/images/certs/AnthropicClaude101.png",
  },
];