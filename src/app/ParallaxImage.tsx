'use client';

/*
  PARALLAX IMAGE
  ──────────────
  Drop-in replacement for the plain <img> inside portfolio cards.
  The image is rendered 24 % taller than its container so it has
  room to travel.  As the card scrolls through the viewport the
  image translates ±12 % of the card height, creating a parallax.

  Parent must have:  position: relative;  overflow: hidden;
*/

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const FACTOR = 0.12; // ±12 % of container height

export default function ParallaxImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img  = imgRef.current;
    if (!wrap || !img) return;

    let y       = 0;
    let targetY = 0;

    const calc = () => {
      const rect     = wrap.getBoundingClientRect();
      const vh       = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      const offset   = rect.height * FACTOR;
      targetY = offset * (1 - 2 * progress); // +offset → 0 → -offset
    };

    const tick = () => {
      y += (targetY - y) * 0.1;
      gsap.set(img, { y });
    };

    // Hover: scale 110 % from centre — GSAP merges scale with the y transform
    const onEnter = () =>
      gsap.to(img, { scale: 1.1, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
    const onLeave = () =>
      gsap.to(img, { scale: 1,   duration: 0.5, ease: 'power2.out', overwrite: 'auto' });

    // Initialise y to the correct position so there is no first-frame jump
    calc();
    y = targetY;

    wrap.addEventListener('mouseenter', onEnter);
    wrap.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', calc, { passive: true });
    gsap.ticker.add(tick);

    return () => {
      wrap.removeEventListener('mouseenter', onEnter);
      wrap.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', calc);
      gsap.ticker.remove(tick);
      gsap.set(img, { clearProps: 'transform' });
    };
  }, []);

  return (
    // This div fills the card container exactly; getBoundingClientRect() on it
    // is identical to measuring the card itself.
    <div ref={wrapRef} className="absolute inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="absolute w-full object-cover"
        style={{
          height: `${(1 + FACTOR * 2) * 100}%`, // 124 %
          top:    `${-FACTOR * 100}%`,           // -12 % (centres the extra height)
        }}
      />
    </div>
  );
}
