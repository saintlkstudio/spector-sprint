'use client';

/*
  SERVICES DETAIL
  ───────────────
  Same black-background layout as ServicesSection.
  Desktop: 2-col grid — title left, description right.
  Mobile:  title → description stacked.

  Animation: desktop description paragraphs slide in from the right on scroll,
  staggered at 0.3, 0.6, 0.9, 1.2 s — identical to AboutValues principles.
*/

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambleTitle from '../ScrambleTitle';

const services = [
  {
    num: '[ 1 ]',
    title: 'Brand Discovery',
    description:
      'We spend time understanding your business from the inside out — your values, your audience, and what makes you genuinely different. That difference becomes the strategic core every creative decision is anchored to. You leave with a clear brand positioning that makes every future decision faster and more consistent.',
    imgD: 'https://www.figma.com/api/mcp/asset/e2511ba7-7bde-451c-bd55-0c9741c4f164',
    imgM: 'https://www.figma.com/api/mcp/asset/6dc5b38b-fd3e-475c-add7-d20c276e3690',
  },
  {
    num: '[ 2 ]',
    title: 'Web Design & Dev',
    description:
      'We build websites that begin with architecture and end with code — mapping user journeys, designing purposeful interactions, and developing in-house on modern stacks. Performance, accessibility, and longevity are built in from the start. You receive the full source code and a thorough handover so your team can manage the site with confidence.',
    imgD: 'https://www.figma.com/api/mcp/asset/50d69e98-6095-4abb-9c36-d49cb0aa6a6e',
    imgM: 'https://www.figma.com/api/mcp/asset/e00822fc-af94-497c-a591-ac45007f20b5',
  },
  {
    num: '[ 3 ]',
    title: 'Marketing',
    description:
      'We develop integrated campaigns that give your brand a consistent presence across every channel your audience inhabits — from social and search to editorial and out-of-home. Strategy, creative, and measurement are handled as one unified system, not disconnected parts. Every budget is treated as if it were our own.',
    imgD: 'https://www.figma.com/api/mcp/asset/f06aedd2-4f3a-4a31-92df-85141c3267a2',
    imgM: 'https://www.figma.com/api/mcp/asset/e28f2a25-55e8-4e37-bca8-cfbb4f5bd764',
  },
  {
    num: '[ 4 ]',
    title: 'Photography',
    description:
      'Every shoot is art-directed to align with your brand\'s visual identity — from location scouting and lighting design to post-production. We work across product, portrait, lifestyle, and architectural photography, adapting our style to serve the story. What you receive is not just a set of images — it is a visual language your brand can build on.',
    imgD: 'https://www.figma.com/api/mcp/asset/f4d987f6-663a-4724-8bde-f65d47f5aeb7',
    imgM: 'https://www.figma.com/api/mcp/asset/bd583fb4-4f0e-47c4-bd58-79c97e6ace2e',
  },
] as const;

export default function ServicesDetail() {
  const sectionRef = useRef<HTMLElement>(null);
  const paraRefs   = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          once: true,
        },
      });

      paraRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { x: 80, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          (i + 1) * 0.3,
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-navbar="dark"
      className="bg-black px-4 md:px-8 py-12 md:py-[80px] flex flex-col gap-8 md:gap-12"
    >
      {/* Section label */}
      <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
        [ services ]
      </p>

      {/* "[4]  Deliverables" headline */}
      <div className="flex items-center justify-between md:grid md:grid-cols-2 md:gap-16 font-light text-white uppercase tracking-[-0.08em] text-[32px] md:text-[6.67vw] leading-none">
        <span>[4]</span>
        <span>Deliverables</span>
      </div>

      {/* Service rows */}
      <div className="flex flex-col gap-12">
        {services.map((s, i) => (
          <div key={s.num} className="flex flex-col gap-[9px]">

            <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
              {s.num}
            </p>
            <div className="h-px w-full bg-white opacity-30" />

            {/* Desktop: 2-col grid, title left, description right */}
            <div className="hidden md:grid md:grid-cols-2 md:items-start md:gap-16 pt-[9px]">
              <ScrambleTitle
                text={s.title}
                className="font-bold italic text-[36px] text-white uppercase leading-[1.1] tracking-[-0.04em] shrink-0 cursor-default select-none"
              />
              <p
                ref={(el) => { paraRefs.current[i] = el; }}
                className="font-normal text-[14px] text-white leading-[1.5] tracking-[-0.04em] md:w-[85%]"
              >
                {s.description}
              </p>
            </div>

            {/* Mobile: stacked */}
            <div className="flex flex-col gap-4 pt-[9px] md:hidden">
              <p className="font-bold italic text-[36px] text-white uppercase leading-[1.1] tracking-[-0.04em]">
                {s.title}
              </p>
              <p className="font-normal text-[14px] text-white leading-[1.5] tracking-[-0.04em]">
                {s.description}
              </p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
