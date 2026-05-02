'use client';

import { useRef, useCallback, type ReactNode } from 'react';
import gsap from 'gsap';

interface Props {
  variant: 'dark' | 'outline-white';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/*
  Two animations stacked:
  1. Magnetic — button drifts toward the cursor while the mouse is nearby,
     then snaps back with a soft elastic rebound on leave.
  2. Fill sweep — a solid slab slides in from the left on enter (covering the
     background), and retreats to the right on leave, inverting text colour
     for the duration.
*/
export default function MagneticButton({ variant, children, className = '', onClick }: Props) {
  const wrapRef  = useRef<HTMLButtonElement>(null);
  const fillRef  = useRef<HTMLSpanElement>(null);
  const textRef  = useRef<HTMLSpanElement>(null);

  const fillColor = '#ffffff';
  const textOnFill = variant === 'dark' ? '#000000' : '#000000';
  const textBase   = '#ffffff';

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width  / 2);
    const dy = e.clientY - (r.top  + r.height / 2);
    gsap.to(el, { x: dx * 0.28, y: dy * 0.28, duration: 0.35, ease: 'power2.out' });
  }, []);

  const onMouseEnter = useCallback(() => {
    gsap.killTweensOf(fillRef.current);
    gsap.fromTo(
      fillRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, transformOrigin: 'left center', duration: 0.45, ease: 'power3.inOut' },
    );
    gsap.to(textRef.current, { color: textOnFill, duration: 0.2, ease: 'power2.out' });
    // Fade border out so it doesn't show against the white fill
    if (variant === 'outline-white') {
      gsap.to(wrapRef.current, { borderColor: 'rgba(255,255,255,0)', duration: 0.2 });
    }
  }, [textOnFill, variant]);

  const onMouseLeave = useCallback(() => {
    const el = wrapRef.current;

    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });

    gsap.killTweensOf(fillRef.current);
    gsap.to(fillRef.current, {
      scaleX: 0,
      transformOrigin: 'right center',
      duration: 0.4,
      ease: 'power3.inOut',
    });
    gsap.to(textRef.current, { color: textBase, duration: 0.25, delay: 0.1, ease: 'power2.out' });
    if (variant === 'outline-white') {
      gsap.to(wrapRef.current, { borderColor: 'rgba(255,255,255,1)', duration: 0.25, delay: 0.15 });
    }
  }, [textBase, variant]);

  const baseClass =
    variant === 'dark'
      ? 'bg-black text-white'
      : 'bg-transparent text-white border border-white';

  return (
    <button
      ref={wrapRef}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`self-start relative overflow-hidden rounded-full text-[14px] font-medium tracking-[-0.04em] px-4 py-3 cursor-pointer ${baseClass} ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Sliding fill slab */}
      <span
        ref={fillRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: fillColor,
          transform: 'scaleX(0)',
          transformOrigin: 'left center',
        }}
      />
      {/* Text sits above the fill */}
      <span ref={textRef} className="relative z-10 pointer-events-none" style={{ color: textBase }}>
        {children}
      </span>
    </button>
  );
}
