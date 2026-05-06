'use client';

/*
  PROJECTS HERO — split-screen
  ─────────────────────────────
  Identical layout and animations to AboutHero / ServicesHero:
  Desktop : flex-row — image left (w-1/2), white copy panel right (flex-1).
  Mobile  : flex-col — image top, white panel below.

  Image source: the large full-bleed photo used under the bio section
  on the home page (desktop crop + mobile portrait crop).

  Animations:
  1. Clip-path reveal — image expands left → right on load.
  2. Text block slides in from the right on page load (desktop only).
  3. Vertical parallax — image drifts down as section scrolls out.
*/

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../Navbar';
import MagneticButton from '../MagneticButton';

const image = 'https://www.figma.com/api/mcp/asset/6b83c32c-d7b1-4f3f-97a3-cec5151bb6ff';

export default function ProjectsHero() {
  const sectionRef   = useRef<HTMLElement>(null);
  const innerRef     = useRef<HTMLDivElement>(null);
  const imgRef       = useRef<HTMLImageElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);

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
        scrollTrigger: { trigger: inner, start: 'top 95%', once: true },
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

  // ── 3. Scroll-out: image parallax ──────────────────────────
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

      {/* ── Left panel: image ─────────────────────────────────── */}
      <div className="relative w-full md:w-1/2 shrink-0 md:overflow-hidden">
        <div className="mt-[80px] md:mt-[96px] md:ml-8">
          <div
            ref={innerRef}
            className="relative overflow-hidden h-[55vh] md:h-[calc(100vh-96px)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={image}
              alt="H.Studio selected work"
              className="absolute w-full object-cover object-center"
              style={{ height: '110%', top: '-5%' }}
            />
          </div>
        </div>
      </div>

      {/* ── Right panel: text ─────────────────────────────────── */}
      <div className="relative flex-1 bg-white flex flex-col px-4 py-8 md:pl-[76px] md:pr-12 md:py-0 md:pt-[96px] md:justify-center">
        <div ref={textBlockRef} className="flex flex-col gap-4 md:gap-6">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ Projects ]
          </p>

          <h1 className="font-medium text-black capitalize text-[15vw] md:text-[8vw] leading-[0.86] tracking-[-0.07em]">
            Selected<br />Work
          </h1>

          <p className="font-bold italic text-[#1f1f1f] text-[14px] tracking-[-0.04em] uppercase leading-[1.3] max-w-[294px]">
            Eight years of{' '}
            <span className="font-normal not-italic">strategy-led</span>
            {' '}creative work across{' '}
            <span className="font-normal not-italic">20+ countries</span>.
          </p>

          <MagneticButton variant="dark" href="/contact">Let&apos;s talk</MagneticButton>
        </div>
      </div>
    </section>
  );
}
