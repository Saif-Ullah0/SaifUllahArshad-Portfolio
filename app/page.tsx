export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1
          className="text-6xl font-bold mb-4"
          style={{ fontFamily: "var(--font-heading)", color: "var(--color-violet)" }}
        >
          Saif Ullah Arshad
        </h1>
        <p style={{ color: "var(--color-text-secondary)" }}>
          ML Engineer · Full Stack Developer · CS Student
        </p>
      </div>
    </main>
  );
}