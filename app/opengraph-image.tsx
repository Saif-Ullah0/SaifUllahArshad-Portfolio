import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Saif Ullah Arshad — ML Engineer & Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0a0a0f",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "30%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
          }}
        />

        {/* Top label */}
        <p
          style={{
            fontFamily: "monospace",
            fontSize: "18px",
            color: "#06b6d4",
            letterSpacing: "0.1em",
            marginBottom: "24px",
          }}
        >
          {"// portfolio"}
        </p>

        {/* Name */}
        <h1
          style={{
            fontSize: "80px",
            fontWeight: 700,
            color: "#f1f5f9",
            margin: "0 0 16px 0",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          Saif Ullah
          <span style={{ color: "#7c3aed" }}> Arshad</span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: "28px",
            color: "#94a3b8",
            margin: "0 0 48px 0",
            fontWeight: 400,
          }}
        >
          ML Engineer · Full Stack Developer · CS Student
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "48px",
          }}
        >
          {[
            { value: "500K+", label: "Records Analyzed" },
            { value: "0.848", label: "F1 Score" },
            { value: "92%", label: "CNN Accuracy" },
            { value: "ITU", label: "Lahore" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: 700,
                  color: "#7c3aed",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  color: "#475569",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            fontFamily: "monospace",
            fontSize: "16px",
            color: "#475569",
          }}
        >
          saif-ullah-arshad.vercel.app
        </div>

        {/* Right accent line */}
        <div
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            bottom: "0",
            width: "4px",
            background: "linear-gradient(to bottom, #7c3aed, #06b6d4)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}