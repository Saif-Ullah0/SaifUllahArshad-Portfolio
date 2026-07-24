"use client";

import { useEffect, useRef } from "react";

type TrailDot = {
  x: number;
  y: number;
  opacity: number;
  size: number;
};

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<TrailDot[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Skip on touch devices
    if ("ontouchstart" in window) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      dotsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        size: Math.random() * 3 + 1,
      });
      if (dotsRef.current.length > 20) {
        dotsRef.current.shift();
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dotsRef.current = dotsRef.current
        .map((dot, i) => ({
          ...dot,
          opacity: (i / dotsRef.current.length) * 0.6,
        }))
        .filter((dot) => dot.opacity > 0.01);

      dotsRef.current.forEach((dot, i) => {
        const progress = i / dotsRef.current.length;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size * progress, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(
          dot.x, dot.y, 0,
          dot.x, dot.y, dot.size * 2
        );
        gradient.addColorStop(0, `rgba(124, 58, 237, ${dot.opacity})`);
        gradient.addColorStop(0.5, `rgba(6, 182, 212, ${dot.opacity * 0.5})`);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9990,
      }}
    />
  );
}
