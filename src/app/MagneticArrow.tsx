'use client';

/*
  MAGNETIC ARROW BUTTON
  ──────────────────────
  Same two-layer effect as MagneticButton:

  1. Magnetic — button drifts toward the cursor on mousemove,
     elastic snap-back on leave.
  2. Fill sweep — dark slab slides in from the left on enter
     (inverts arrow to white), retreats right on leave.

  The outer element is always an <a>; href is simply omitted when
  there is no project URL so the element stays in the tab order but
  has no navigation destination.
*/

import { useRef, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

export default function MagneticArrow({ href }: { href?: string }) {
  const wrapRef = useRef<HTMLAnchorElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width  / 2);
    const dy = e.clientY - (r.top  + r.height / 2);
    gsap.to(el, { x: dx * 0.3, y: dy * 0.3, duration: 0.35, ease: 'power2.out' });
  }, []);

  const onMouseEnter = useCallback(() => {
    // Fill sweeps in from the left
    gsap.killTweensOf(fillRef.current);
    gsap.fromTo(
      fillRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, transformOrigin: 'left center', duration: 0.45, ease: 'power3.inOut' },
    );
    // Arrow → white
    gsap.to(pathRef.current, { attr: { stroke: '#ffffff' }, duration: 0.2, ease: 'power2.out' });
    // Border fades out (dark ring on dark fill looks bad)
    gsap.to(wrapRef.current, { borderColor: 'rgba(31,31,31,0)', duration: 0.2 });
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = wrapRef.current;
    // Elastic snap-back
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    // Fill retreats to the right
    gsap.killTweensOf(fillRef.current);
    gsap.to(fillRef.current, {
      scaleX: 0,
      transformOrigin: 'right center',
      duration: 0.4,
      ease: 'power3.inOut',
    });
    // Arrow → dark
    gsap.to(pathRef.current, { attr: { stroke: '#1f1f1f' }, duration: 0.25, delay: 0.1, ease: 'power2.out' });
    // Border fades back
    gsap.to(wrapRef.current, { borderColor: 'rgba(31,31,31,1)', duration: 0.25, delay: 0.15 });
  }, []);

  const isExternal = href?.startsWith('http');

  return (
    <Link
      ref={wrapRef}
      href={href ?? '#'}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="size-8 shrink-0 rounded-full border border-[#1f1f1f] flex items-center justify-center relative overflow-hidden"
    >
      {/* Sliding fill slab — clipped to circle by overflow-hidden + rounded-full */}
      <span
        ref={fillRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: '#1f1f1f',
          transform: 'scaleX(0)',
          transformOrigin: 'left center',
        }}
      />
      {/* Arrow — sits above the fill */}
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        className="relative z-10"
      >
        <path
          ref={pathRef}
          d="M2 11L11 2M11 2H4.5M11 2V8.5"
          stroke="#1f1f1f"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
