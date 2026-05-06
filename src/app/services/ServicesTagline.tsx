'use client';

/*
  SERVICES TAGLINE
  ────────────────
  Direct adaptation of BioSection. Identical staircase layout and GSAP
  word-fill animation (words start light grey, fill to black as section
  scrolls through the viewport). Copy swapped to the studio's service
  proposition.

  Desktop: editorial staircase — five lines at varying horizontal indents.
  Mobile:  centred single column.
*/

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Words({ text }: { text: string }) {
  return (
    <>
      {text.trim().split(/\s+/).map((word, i) => (
        <span key={i}>
          {i > 0 && ' '}
          <span data-word className="inline-block">{word}</span>
        </span>
      ))}
    </>
  );
}

export default function ServicesTagline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const words = gsap.utils.toArray<HTMLElement>('[data-word]', section);
    if (!words.length) return;

    gsap.set(words, { color: '#c8c8c8' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 35%',
        scrub: 1.5,
      },
    });

    words.forEach(word => {
      tl.to(word, { color: '#000000', duration: 1, ease: 'none' }, '<0.06');
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="px-4 md:px-8 py-12 md:py-[120px] bg-white">
      <div className="flex flex-col gap-6 w-full">

        {/* Header: label + rule */}
        <div className="flex flex-col gap-3 items-end w-full">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] text-right">
            [ Our approach ]
          </p>
          <div className="h-px w-full bg-[#1f1f1f]" />
        </div>

        {/* Staircase text */}
        <div className="flex flex-col gap-2 w-full">

          {/* Line 1 — "Not more work.   /" + counter */}
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-start md:gap-3 uppercase">
            <p className="order-first md:order-last font-mono text-[14px] text-[#1f1f1f] leading-[1.1] shrink-0">
              001
            </p>
            <p className="order-last md:order-first font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] whitespace-pre">
              <Words text="Not more work." />{'   '}<span data-word className="inline-block">/</span>
            </p>
          </div>

          {/* Line 2 */}
          <div className="w-full flex justify-center md:justify-start md:pl-[14.86vw]">
            <p className="font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap">
              <Words text="Better work." />
            </p>
          </div>

          {/* Line 3 */}
          <div className="w-full flex justify-center md:justify-start md:pl-[42.36vw]">
            <p className="font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap">
              <Words text="Senior-led from" />
            </p>
          </div>

          {/* Line 4 */}
          <div className="w-full flex justify-center md:justify-start">
            <p className="font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap">
              <Words text="brief to" />
            </p>
          </div>

          {/* Line 5 + floating label */}
          <div className="relative w-full flex flex-col items-center gap-3 md:items-start md:gap-0 md:pl-[42.08vw]">
            <p className="font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap">
              <Words text="delivery." />
            </p>
            <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap md:absolute md:top-full md:left-[70%] md:mt-1">
              [ H.Studio ]
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
