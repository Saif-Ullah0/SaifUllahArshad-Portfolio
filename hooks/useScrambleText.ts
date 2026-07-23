"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

export function useScrambleText(text: string, duration: number = 600) {
  const [displayed, setDisplayed] = useState(text);
  const ref = useRef<HTMLElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const startTime = performance.now();
            const totalFrames = duration / 16;

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const revealedCount = Math.floor(progress * text.length);

              const scrambled = text
                .split("")
                .map((char, i) => {
                  if (char === " ") return " ";
                  if (i < revealedCount) return char;
                  return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
                .join("");

              setDisplayed(scrambled);

              if (progress < 1) requestAnimationFrame(animate);
              else setDisplayed(text);
            };

            requestAnimationFrame(animate);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, duration]);

  return { displayed, ref };
}