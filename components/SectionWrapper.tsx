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
      }}
    >
      {children}
    </div>
  );
}