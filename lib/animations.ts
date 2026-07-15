import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const fadeUpConfig = {
  from: { opacity: 0, y: 60 },
  to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
};

export const fadeLeftConfig = {
  from: { opacity: 0, x: -60 },
  to: { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
};

export const fadeRightConfig = {
  from: { opacity: 0, x: 60 },
  to: { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
};

export const staggerConfig = {
  stagger: 0.15,
  duration: 0.6,
  ease: "power3.out",
};