'use client';

/*
  SCRAMBLE TITLE
  ──────────────
  On mouseenter: each character cycles through random uppercase letters
  and locks in left-to-right at ~40 ms per step.
  On mouseleave: snaps back to the original text immediately.
  mouseenter never fires on touch devices → effect is desktop-only.
*/

import { useState, useRef, useCallback } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function ScrambleTitle({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleEnter = useCallback(() => {
    let frame = 0;
    clearInterval(timerRef.current!);
    timerRef.current = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < frame) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(''),
      );
      frame++;
      if (frame > text.length) {
        clearInterval(timerRef.current!);
        setDisplay(text);
      }
    }, 40);
  }, [text]);

  const handleLeave = useCallback(() => {
    clearInterval(timerRef.current!);
    setDisplay(text);
  }, [text]);

  return (
    <p
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={className}
    >
      {display}
    </p>
  );
}
