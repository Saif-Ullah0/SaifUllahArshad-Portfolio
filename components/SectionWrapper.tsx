"use client";

import { useRef, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  id?: string;
  delay?: number;
};

export default function SectionWrapper({ children, id, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";

              // 🟢 CRITICAL FIX: Clear transform after animation completes so sticky works on children
              setTimeout(() => {
                el.style.transform = "none";
              }, 800); // 800ms matches the CSS transition duration
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      id={id}
      style={{
        opacity: 0,
        transform: "translateY(50px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}