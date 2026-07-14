"use client";

import { useEffect, useRef } from "react";

export function useScrollAnimation(config: {
  from: { opacity: number; y: number };
  to: { opacity: number; y: number; duration: number; ease: string };
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let gsapInstance: typeof import("gsap").gsap;
    let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;

    const init = async () => {
      const gsapModule = await import("gsap");
      const STModule = await import("gsap/ScrollTrigger");
      gsapInstance = gsapModule.gsap;
      ScrollTrigger = STModule.ScrollTrigger;
      gsapInstance.registerPlugin(ScrollTrigger);

      gsapInstance.fromTo(
        el,
        { opacity: 0, y: config.from.y },
        {
          opacity: 1,
          y: 0,
          duration: config.to.duration,
          ease: config.to.ease,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        }
      );
    };

    init();

    return () => {
      if (ScrollTrigger) ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return ref;
}

export function useStaggerAnimation(config: {
  from: { opacity: number; y: number };
  to: { opacity: number; y: number; duration: number };
  stagger: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const init = async () => {
      const gsapModule = await import("gsap");
      const STModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap;
      const ScrollTrigger = STModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const children = Array.from(container.children);
      if (!children.length) return;

      gsap.fromTo(
        children,
        { opacity: 0, y: config.from.y },
        {
          opacity: 1,
          y: 0,
          duration: config.to.duration,
          stagger: config.stagger,
          scrollTrigger: {
            trigger: container,
            start: "top 90%",
            once: true,
          },
        }
      );
    };

    init();
  }, []);

  return containerRef;
}