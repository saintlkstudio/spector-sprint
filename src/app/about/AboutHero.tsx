'use client';

/*
  ABOUT HERO — split-screen
  ─────────────────────────
  Deliberately different from the home-page hero: no full-bleed parallax
  split. Instead, a 50/50 editorial split — portrait fills the left panel,
  white copy panel on the right.

  Animations:
  1. Clip-path reveal — width expands left → right (inset right: 100% → 0 %)
     driven by ScrollTrigger (fires once; triggers immediately on page load
     since the hero is already in the viewport).
  2. Vertical parallax — portrait drifts down up to 80 px as the section
     scrolls out, creating depth.

  Desktop : flex-row, portrait left (w-1/2), white panel right (flex-1).
  Mobile  : flex-col, portrait top, white panel below.
*/

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../Navbar';
import MagneticButton from '../MagneticButton';

const portrait = '/half-face.jpg';

export default function AboutHero() {
  const sectionRef   = useRef<HTMLElement>(null);
  const innerRef     = useRef<HTMLDivElement>(null);   // clip-path target
  const imgRef       = useRef<HTMLImageElement>(null); // parallax target
  const textBlockRef = useRef<HTMLDivElement>(null);   // right-panel text + button

  // ── 1. Clip-path reveal: left → right ──────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const inner = innerRef.current;
    if (!inner) return;

    gsap.fromTo(
      inner,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
        delay: 0,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: inner,
          start: 'top 95%',
          once: true,
        },
      },
    );

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  // ── 2. Text block slides in from right on page load (desktop only) ─
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      gsap.fromTo(
        textBlockRef.current,
        { x: window.innerWidth, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.5, ease: 'power3.out' },
      );
    });
    return () => mm.revert();
  }, []);

  // ── 3. Scroll-out: portrait parallax ──────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const img     = imgRef.current;
    if (!section || !img) return;

    let progress = 0;
    let target   = 0;

    const onScroll = () => {
      const { top, height } = section.getBoundingClientRect();
      target = Math.max(0, Math.min(1, -top / (height * 0.7)));
    };

    const tick = () => {
      progress += (target - progress) * 0.06;
      gsap.set(img, { y: progress * 80 });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    gsap.ticker.add(tick);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      gsap.ticker.remove(tick);
      gsap.set(img, { clearProps: 'transform' });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-hero
      className="relative bg-white flex flex-col md:flex-row md:h-screen overflow-hidden"
    >
      <Navbar />

      {/* ── Left panel: portrait ───────────────────────────────── */}
      {/*
        Three-layer structure:
        1. Outer  — owns the 50 % column; overflow-hidden clips the ml offset.
        2. Middle — applies the top gap and left margin (aligns with logo).
        3. Inner  — clip-path reveal target + overflow-hidden for parallax.
      */}
      <div className="relative w-full md:w-1/2 shrink-0 md:overflow-hidden">
        <div className="mt-[80px] md:mt-[96px] md:ml-8">
          <div
            ref={innerRef}
            className="relative overflow-hidden h-[55vh] md:h-[calc(100vh-96px)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={portrait}
              alt="Harvey Specter"
              className="absolute w-full object-cover object-top"
              style={{ height: '110%', top: '-5%' }}
            />
          </div>
        </div>
      </div>

      {/* ── Right panel: text ──────────────────────────────────── */}
      <div className="relative flex-1 bg-white flex flex-col px-4 py-8 md:pl-[76px] md:pr-12 md:py-0 md:pt-[96px] md:justify-center">
        <div ref={textBlockRef} className="flex flex-col gap-4 md:gap-6">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ About ]
          </p>

          <h1 className="font-medium text-black capitalize text-[15vw] md:text-[8vw] leading-[0.86] tracking-[-0.07em]">
            Harvey<br />Specter
          </h1>

          <p className="font-bold italic text-[#1f1f1f] text-[14px] tracking-[-0.04em] uppercase leading-[1.3] max-w-[294px]">
            A creative director and photographer with{' '}
            <span className="font-normal not-italic">8+ years</span>
            {' '}shaping visual identities for brands across{' '}
            <span className="font-normal not-italic">20+ countries</span>.
          </p>

          <MagneticButton variant="dark" href="/contact">Let&apos;s talk</MagneticButton>
        </div>
      </div>
    </section>
  );
}
