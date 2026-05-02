'use client';

/*
  ABOUT SECTION
  ─────────────
  Desktop: two-column — section label on far left, framed text + portrait on right.
  Mobile:  stacked — 002 → [ About ] → framed text → full-width portrait.

  Animation: framed text block slides off to the left as the section scrolls out.
*/

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const photoDesktop =
  'https://www.figma.com/api/mcp/asset/f63d6845-e5f7-41ae-a7bb-3dfe66ee59ee';
const photoMobile =
  'https://www.figma.com/api/mcp/asset/b672052f-6974-4362-97da-b429c13b828c';

type CornerPos = 'tl' | 'tr' | 'bl' | 'br';

const cornerPaths: Record<CornerPos, string> = {
  tl: 'M0 8 L0 0 L8 0',
  tr: 'M8 0 L16 0 L16 8',
  bl: 'M0 8 L0 16 L8 16',
  br: 'M8 16 L16 16 L16 8',
};

function Corner({ pos }: { pos: CornerPos }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <path d={cornerPaths[pos]} stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

function FramedText() {
  return (
    <div className="flex gap-3 items-stretch w-full">
      <div className="flex flex-col justify-between shrink-0 w-6">
        <Corner pos="tl" />
        <Corner pos="bl" />
      </div>
      <div className="flex-1 flex items-center py-3 min-w-0">
        <p className="font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
          Placeholder paragraph one. This is where you introduce yourself —
          your background, your passion for your craft, and what drives you
          creatively. Two to three sentences work best here. Placeholder
          paragraph two. Here you can describe your technical approach, how you
          collaborate with clients, or what sets your work apart from others in
          your field.
        </p>
      </div>
      <div className="flex flex-col justify-between shrink-0 w-6">
        <Corner pos="tr" />
        <Corner pos="br" />
      </div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef      = useRef<HTMLElement>(null);
  const textDesktopRef  = useRef<HTMLDivElement>(null);
  const textMobileRef   = useRef<HTMLDivElement>(null);
  const imageDesktopRef = useRef<HTMLDivElement>(null);
  const imageMobileRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const textEls  = [textDesktopRef.current, textMobileRef.current].filter(Boolean) as HTMLElement[];
    const imageEls = [imageDesktopRef.current, imageMobileRef.current].filter(Boolean) as HTMLElement[];
    // Use desktop image as reference for scroll position calculations
    const imageEl  = imageDesktopRef.current ?? imageMobileRef.current;

    gsap.set(textEls,  { x: 0 });
    gsap.set(imageEls, { clipPath: 'inset(0 0 0 100%)' });

    let textProgress  = 0; let textTarget  = 0;
    let imageProgress = 0; let imageTarget = 0;

    // 2-second time gate: text only starts after image has been full for 2s
    let imageFullSince: number | null = null;
    let textGateOpen = false;

    const onScroll = () => {
      // ── Text slides left ─────────────────────────────────────────────────
      const { top, height } = section.getBoundingClientRect();
      textTarget = Math.max(0, Math.min(1, -top / height));

      // ── Image clip reveal ─────────────────────────────────────────────────
      if (imageEl) {
        const triggerEl = document.querySelector<HTMLElement>('[data-hero]');
        if (triggerEl) {
          const triggerBottom = triggerEl.getBoundingClientRect().bottom;
          const imageTop      = imageEl.getBoundingClientRect().top;

          if (triggerBottom > 0) {
            imageTarget = 0;
          } else if (imageTop <= 200) {
            imageTarget = 1;
          } else {
            const scrolledPast = -triggerBottom;
            const remaining    = imageTop - 200;
            imageTarget = Math.min(1, scrolledPast / ((scrolledPast + remaining) * 0.75));
          }
        }
      }
    };

    const tick = () => {
      imageProgress += (imageTarget - imageProgress) * 0.055;

      // Open the text gate 1 s after the scroll position first hits 100%
      if (imageTarget >= 1) {
        if (imageFullSince === null) imageFullSince = Date.now();
        if (!textGateOpen && Date.now() - imageFullSince >= 1000) textGateOpen = true;
      } else {
        imageFullSince = null;
        textGateOpen   = false;
      }

      const effectiveTextTarget = textGateOpen ? textTarget : 0;
      textProgress += (effectiveTextTarget - textProgress) * 0.055;

      gsap.set(textEls,  { x: -window.innerWidth * 0.55 * textProgress });
      gsap.set(imageEls, { clipPath: `inset(0 0 0 ${(1 - imageProgress) * 100}%)` });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    gsap.ticker.add(tick);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      gsap.ticker.remove(tick);
      gsap.set(textEls,  { clearProps: 'transform' });
      gsap.set(imageEls, { clearProps: 'clipPath' });
    };
  }, []);

  return (
    <section ref={sectionRef} className="px-4 md:px-8 py-12 md:py-[200px] bg-white overflow-hidden" id="about">

      {/* ════ DESKTOP ════════════════════════════════════════════════════════ */}
      <div className="hidden md:flex items-start justify-between gap-8">

        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0 pt-1">
          [ About ]
        </p>

        <div className="flex flex-1 min-w-0 gap-8 items-end justify-end">

          {/* Animated text block */}
          <div ref={textDesktopRef} className="w-[384px] shrink min-w-0 self-stretch flex items-end">
            <FramedText />
          </div>

          <div className="flex gap-6 items-start shrink-0">
            <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
              002
            </p>
            <div ref={imageDesktopRef} className="relative w-[35vw] aspect-[436/614] overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoDesktop}
                alt="Harvey Specter close-up portrait"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>

      {/* ════ MOBILE ═════════════════════════════════════════════════════════ */}
      <div className="flex flex-col gap-5 md:hidden">

        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">002</p>
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ About ]</p>

        {/* Animated text block */}
        <div ref={textMobileRef}>
          <FramedText />
        </div>

        <div ref={imageMobileRef} className="relative w-full aspect-[422/594] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoMobile}
            alt="Harvey Specter close-up portrait"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
}
