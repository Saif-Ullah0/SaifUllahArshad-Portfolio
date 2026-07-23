"use client";

import { useScrambleText } from "@/hooks/useScrambleText";

type Props = {
  text: string;
  duration?: number;
  style?: React.CSSProperties;
  className?: string;
};

export default function ScrambleText({ text, duration = 1200, style, className }: Props) {
  const { displayed, ref } = useScrambleText(text, duration);

  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      style={{
        fontFamily: "var(--font-heading)",
        ...style,
      }}
      className={className}
    >
      {displayed}
    </span>
  );
}