'use client';

/*
  SERVICES WHY — editorial intro
  ───────────────────────────────
  Explains why a client should choose H.Studio over a larger agency or
  generalist freelancer. Same layout as AboutBio: pull-quote left,
  paragraphs right (2-col grid on desktop, single column on mobile).

  Animations:
  - Quote slides in from left on scroll (same as AboutBio).
  - Paragraphs slide in from right on scroll (same as AboutBio).
*/

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const pullQuote =
  '"The difference between a good brief and a great outcome is who is in the room when decisions get made."';

const para1 =
  'Most studios will tell you they offer a full suite of services. What they rarely mention is that those services are usually managed by account teams and executed by juniors with no unified creative vision. At H.Studio, every engagement is led by Harvey directly — from the initial strategy session through to the final asset delivery. There is no handoff between departments, no dilution of thinking between brief and execution.';

const para2 =
  'Our process is direct by design. You work with the people doing the work — not intermediaries, not coordinators, not account managers reading from a brief they did not write. That directness produces sharper ideas, faster decisions, and outcomes that actually reflect the strategic intent behind them. It also means we are selective: we work with fewer clients than most, ensuring every project receives the depth of attention it deserves from the first conversation to the final delivery.';

export default function ServicesWhy() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef   = useRef<HTMLParagraphElement>(null);
  const col1Ref    = useRef<HTMLParagraphElement>(null);
  const col2Ref    = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const triggerConfig = { trigger: section, start: 'top 78%', once: true };

    const quoteAnim = gsap.fromTo(
      quoteRef.current,
      { opacity: 0, x: -80 },
      { opacity: 1, x: 0, duration: 0.6, delay: 0.5, ease: 'power2.inOut', scrollTrigger: triggerConfig },
    );

    const paras = [col1Ref.current, col2Ref.current].filter(Boolean) as HTMLElement[];
    const parasAnim = gsap.fromTo(
      paras,
      { opacity: 0, x: 80 },
      { opacity: 1, x: 0, duration: 0.6, delay: 0.5, ease: 'power2.inOut', stagger: 0.14, scrollTrigger: triggerConfig },
    );

    return () => {
      quoteAnim.scrollTrigger?.kill();  quoteAnim.kill();
      parasAnim.scrollTrigger?.kill();  parasAnim.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="px-4 md:px-8 py-12 md:pt-[80px] md:pb-[120px] bg-white">

      {/* Header: [ Why H.Studio ] — rule — 002 */}
      <div className="flex items-center gap-6 mb-12 md:mb-[104px]">
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0">
          [ Why H.Studio ]
        </p>
        <div className="flex-1 h-px bg-[#1f1f1f] opacity-20" />
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0">
          002
        </p>
      </div>

      {/* 2-col grid on desktop, stacked on mobile */}
      <div className="flex flex-col md:grid md:grid-cols-2 md:items-center md:gap-16 gap-10">

        {/* Left: pull-quote */}
        <p
          ref={quoteRef}
          className="font-light italic text-[22px] md:text-[32px] tracking-[-0.04em] leading-[1.25] text-[#1f1f1f] md:ml-8 md:-mt-[38px]"
        >
          {pullQuote}
        </p>

        {/* Right: paragraphs */}
        <div className="flex flex-col gap-5">
          <p
            ref={col1Ref}
            className="font-normal text-[14px] md:text-[18px] text-[#1f1f1f] leading-[1.5] tracking-[-0.04em]"
          >
            {para1}
          </p>
          <p
            ref={col2Ref}
            className="font-normal text-[14px] md:text-[18px] text-[#1f1f1f] leading-[1.5] tracking-[-0.04em]"
          >
            {para2}
          </p>
        </div>

      </div>
    </section>
  );
}
