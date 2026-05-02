'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Navbar from './Navbar';
import MagneticButton from './MagneticButton';

const heroImageDesktop =
  'https://www.figma.com/api/mcp/asset/1074d048-958d-49cd-a2cd-e481b24ba415';
const heroImageMobile =
  'https://www.figma.com/api/mcp/asset/95eabbd6-0270-4b32-b1bb-92294bb5a49d';

const heroMask = {
  WebkitMaskImage:
    'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 87%, rgba(0,0,0,0.35) 100%)',
  maskImage:
    'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 87%, rgba(0,0,0,0.35) 100%)',
} as const;

export default function HeroSection() {
  const sectionRef      = useRef<HTMLElement>(null);
  const bgMobileRef     = useRef<HTMLImageElement>(null);
  const bgDesktopRef    = useRef<HTMLImageElement>(null);

  // Desktop text targets
  const helloDesktopRef   = useRef<HTMLParagraphElement>(null);
  const harveyDesktopRef  = useRef<HTMLSpanElement>(null);
  const specterDesktopRef = useRef<HTMLSpanElement>(null);

  // Mobile text targets
  const helloMobileRef    = useRef<HTMLParagraphElement>(null);
  const harveyMobileRef   = useRef<HTMLSpanElement>(null);
  const specterMobileRef  = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const leftEls  = [harveyDesktopRef.current,  harveyMobileRef.current,  helloDesktopRef.current ].filter(Boolean) as HTMLElement[];
    const rightEls = [specterDesktopRef.current, specterMobileRef.current, helloMobileRef.current  ].filter(Boolean) as HTMLElement[];
    const bgEls    = [bgDesktopRef.current,       bgMobileRef.current                               ].filter(Boolean) as HTMLElement[];

    // Reset
    gsap.set([...leftEls, ...rightEls], { x: 0 });
    gsap.set(bgEls, { scale: 1 });

    let progress = 0; // current (lerped)
    let target   = 0; // raw scroll progress 0→1

    const onScroll = () => {
      const { top, height } = section.getBoundingClientRect();
      target = Math.max(0, Math.min(1, -top / height));
    };

    const tick = () => {
      // Lerp — 0.055 per frame ≈ scrub 1.8 feel at 60 fps
      progress += (target - progress) * 0.055;
      const px = window.innerWidth * 0.6 * progress;
      gsap.set(leftEls,  { x: -px });
      gsap.set(rightEls, { x:  px });
      gsap.set(bgEls,    { scale: 1 + progress * 0.22 });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    gsap.ticker.add(tick);
    onScroll(); // seed target on mount

    return () => {
      window.removeEventListener('scroll', onScroll);
      gsap.ticker.remove(tick);
      gsap.set([...leftEls, ...rightEls, ...bgEls], { clearProps: 'transform' });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-hero
      className="relative h-screen overflow-hidden flex flex-col px-4 md:px-8 pb-6 md:pb-0"
    >
      {/* ── Background images ─────────────────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={bgMobileRef}
        src={heroImageMobile}
        alt=""
        aria-hidden="true"
        className="md:hidden absolute inset-x-0 -top-[80px] w-full h-[calc(100%+80px)] object-cover object-[40%_top] pointer-events-none select-none"
        style={heroMask}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={bgDesktopRef}
        src={heroImageDesktop}
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-[center_10%] pointer-events-none select-none"
        style={heroMask}
      />

      {/* ── Navbar ────────────────────────────────────────────── */}
      <Navbar />

      {/* Spacer that reserves the fixed navbar's height on desktop so
          the hero title stays at the same visual position as before. */}
      <div className="hidden md:block shrink-0 h-[72px]" aria-hidden="true" />

      {/* ── Hero text ─────────────────────────────────────────── */}
      <div className="relative mt-auto md:mt-60 shrink-0 flex flex-col">

        {/* DESKTOP — single-line "Harvey   Specter" */}
        <div className="hidden md:flex justify-center w-full pb-[15px]">
          <div className="flex flex-col items-start">
            <p
              ref={helloDesktopRef}
              className="font-mono text-white text-[14px] uppercase mix-blend-overlay leading-[1.1]"
              style={{ display: 'inline-block' }}
            >
              [ Hello i&apos;m ]
            </p>
            <h1 className="font-medium text-white capitalize mix-blend-overlay text-[13.75vw] leading-[1.1] tracking-[-0.07em] whitespace-nowrap -mt-[15px]">
              <span ref={harveyDesktopRef}  style={{ display: 'inline-block' }}>Harvey</span>
              {'   '}
              <span ref={specterDesktopRef} style={{ display: 'inline-block' }}>Specter</span>
            </h1>
          </div>
        </div>

        {/* MOBILE — two-line title */}
        <div className="md:hidden w-full flex flex-col items-center pb-[15px]">
          <p
            ref={helloMobileRef}
            className="font-mono text-white text-[14px] uppercase mix-blend-overlay leading-[1.1] mb-[10px]"
            style={{ display: 'inline-block' }}
          >
            [ Hello i&apos;m ]
          </p>
          <h1 className="font-medium text-white capitalize mix-blend-overlay text-center w-full text-[96px] leading-[0.8] tracking-[-0.07em]">
            <span ref={harveyMobileRef}  style={{ display: 'block' }}>Harvey</span>
            <span ref={specterMobileRef} className="block mt-[10px]">Specter</span>
          </h1>
        </div>

        {/* Bio + CTA */}
        <div className="flex justify-center md:justify-end mt-[10px] md:mt-0">
          <div className="flex flex-col gap-[17px] w-[294px]">
            <p className="font-bold italic text-[#1f1f1f] text-[14px] tracking-[-0.04em] uppercase leading-[16.4px]">
              H.Studio is a{' '}
              <span className="font-normal not-italic">full-service</span>
              {' '}creative studio creating beautiful digital experiences and
              products. We are an{' '}
              <span className="font-normal not-italic">award winning</span>
              {' '}design and art group specializing in branding, web design
              and engineering.
            </p>
            <MagneticButton variant="dark">Let&apos;s talk</MagneticButton>
          </div>
        </div>

      </div>
    </section>
  );
}
