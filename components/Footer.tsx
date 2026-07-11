import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        padding: "2rem 1.5rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--color-text-muted)",
            marginBottom: "0.5rem",
          }}
        >
          Designed and built by{" "}
          <span style={{ color: "var(--color-violet)" }}>{profile.name}</span>
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--color-text-muted)",
          }}
        >
          Built with Next.js · React Three Fiber · Tailwind CSS · Deployed on Vercel
        </p>
      </div>
    </footer>
  );
}