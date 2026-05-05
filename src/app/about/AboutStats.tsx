'use client';

/*
  ABOUT STATS
  ───────────
  Four key numbers displayed in a 2-col (mobile) / 4-col (desktop) grid on
  an off-white (#f3f3f3) background — same colour used by NewsSection.

  Typography matches the staircase sections: font-light, tight tracking, the
  same 6.67 vw scale on desktop so numbers feel part of the same type system.

  Animation: GSAP ScrollTrigger fires once — each stat fades in and slides up
  with a staggered delay, identical to the reveal cadence used across the site.
*/

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const stats = [
  { number: '8+',  label: 'Years in the industry' },
  { number: '50+', label: 'Projects delivered'    },
  { number: '20+', label: 'Awards won'            },
  { number: '30+', label: 'Happy clients'         },
] as const;

export default function AboutStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const items = statRefs.current.filter(Boolean) as HTMLDivElement[];
    gsap.set(items, { opacity: 0, y: 40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        once: true,
      },
    });

    tl.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.12,
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="px-4 md:px-8 py-12 md:py-[120px] bg-[#f3f3f3]">

      {/* Header: label — rule — counter */}
      <div className="flex items-center gap-6 mb-12 md:mb-[80px]">
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0">
          [ Numbers ]
        </p>
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0">003</p>
      </div>

      {/* Stats grid */}
      <div className="mx-auto w-fit grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-[71px]">
        {stats.map((s, i) => (
          <div
            key={i}
            ref={(el) => { statRefs.current[i] = el; }}
            className="flex flex-col gap-3"
          >
            <p className="font-light text-[56px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.86] text-black uppercase">
              {s.number}
            </p>
            <p className="font-mono text-[12px] text-[#1f1f1f] uppercase leading-[1.3] tracking-[-0.02em]">
              {s.label}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
