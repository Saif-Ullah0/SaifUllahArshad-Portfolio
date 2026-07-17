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

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/Saif-Ullah0?y=last")
      .then((res) => res.json())
      .then((data) => {
        const contributions: ContribDay[] = data.contributions;
        const total = contributions.reduce((sum: number, d: ContribDay) => sum + d.count, 0);
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

  return (
    <div
      style={{
        marginTop: "3rem",
        padding: "1.5rem",
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
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
              fontSize: "0.75rem",
              color: "var(--color-text-muted)",
            }}
          >
            {totalContribs} contributions in the last year
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
            gap: "3px",
            overflowX: "auto",
            paddingBottom: "4px",
          }}
        >
          {weeks.map((week, wi) => (
            <div
              key={wi}
              style={{ display: "flex", flexDirection: "column", gap: "3px" }}
            >
              {week.map((day, di) => (
                <div
                  key={di}
                  title={`${day.date}: ${day.count} contributions`}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "2px",
                    backgroundColor: levelColors[day.level],
                    transition: "transform 0.1s ease",
                    cursor: "default",
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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginTop: "0.75rem",
          justifyContent: "flex-end",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--color-text-muted)",
          }}
        >
          Less
        </p>
        {levelColors.map((color, i) => (
          <div
            key={i}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "2px",
              backgroundColor: color,
            }}
          />
        ))}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--color-text-muted)",
          }}
        >
          More
        </p>
      </div>
    </div>
  );
}