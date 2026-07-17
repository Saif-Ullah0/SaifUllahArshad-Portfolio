"use client";

import { useEffect, useState } from "react";

type ContribDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export default function GitHubStats() {
  const [weeks, setWeeks] = useState<ContribDay[][]>([]);
  const [totalContribs, setTotalContribs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/Saif-Ullah0?y=last")
      .then((res) => res.json())
      .then((data) => {
        const contributions: ContribDay[] = data.contributions;
        const total = contributions.reduce(
          (sum: number, d: ContribDay) => sum + d.count,
          0
        );
        setTotalContribs(total);

        const weeksArr: ContribDay[][] = [];
        for (let i = 0; i < contributions.length; i += 7) {
          weeksArr.push(contributions.slice(i, i + 7));
        }
        setWeeks(weeksArr);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const levelColors = [
    "#1e1e2e",
    "rgba(124, 58, 237, 0.3)",
    "rgba(124, 58, 237, 0.5)",
    "rgba(124, 58, 237, 0.75)",
    "#7c3aed",
  ];

  // On mobile show last 26 weeks (6 months), on desktop show all
  const visibleWeeks = isMobile ? weeks.slice(-26) : weeks;
  const squareSize = isMobile ? 9 : 10;
  const gap = isMobile ? 2 : 3;

  return (
    <div
      style={{
        marginTop: "2rem",
        padding: "1.25rem",
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            color: "var(--color-cyan)",
            letterSpacing: "0.05em",
          }}
        >
          github contributions
        </p>
        {!loading && (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--color-text-muted)",
            }}
          >
            {totalContribs} {isMobile ? "(6mo)" : "last year"}
          </p>
        )}
      </div>

      {loading ? (
        <div
          style={{
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--color-text-muted)",
            }}
          >
            loading...
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            gap: `${gap}px`,
            overflowX: "hidden",
            width: "100%",
          }}
        >
          {visibleWeeks.map((week, wi) => (
            <div
              key={wi}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${gap}px`,
                flexShrink: 0,
              }}
            >
              {week.map((day, di) => (
                <div
                  key={di}
                  title={`${day.date}: ${day.count} contributions`}
                  style={{
                    width: `${squareSize}px`,
                    height: `${squareSize}px`,
                    borderRadius: "2px",
                    backgroundColor: levelColors[day.level],
                    transition: "transform 0.1s ease",
                    cursor: "default",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          marginTop: "0.75rem",
          justifyContent: "flex-end",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "var(--color-text-muted)",
          }}
        >
          Less
        </p>
        {levelColors.map((color, i) => (
          <div
            key={i}
            style={{
              width: "9px",
              height: "9px",
              borderRadius: "2px",
              backgroundColor: color,
            }}
          />
        ))}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "var(--color-text-muted)",
          }}
        >
          More
        </p>
      </div>
    </div>
  );
}
