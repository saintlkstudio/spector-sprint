'use client';

/*
  ABOUT STORY
  ───────────
  Direct adaptation of AboutSection (home). Identical animations:
  — Portrait reveals left-to-right via clip-path, triggered once the hero
    has fully scrolled off and the image approaches the viewport top.
  — Framed text block slides left as the section scrolls out.

  Desktop: [ Story ] label far-left, framed bio + portrait right-aligned.
  Mobile:  stacked — 002 → [ Story ] → framed bio → portrait.
*/

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const portraitD = 'https://www.figma.com/api/mcp/asset/f63d6845-e5f7-41ae-a7bb-3dfe66ee59ee';
const portraitM = 'https://www.figma.com/api/mcp/asset/b672052f-6974-4362-97da-b429c13b828c';

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

const bio =
  'Harvey Specter founded H.Studio after a decade shaping the visual identities of global brands. Equal parts strategist and craftsman, he believes great design is never decoration — it is the clearest expression of a brand\'s truth. Born and raised on the south side of Chicago, he brings a distinct perspective to every project: bold, disciplined, and deeply human. The studio exists to make that truth visible, memorable, and impossible to ignore.';

export default function AboutStory() {
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
    const imageEl  = imageDesktopRef.current ?? imageMobileRef.current;

    gsap.set(textEls,  { x: 0 });
    gsap.set(imageEls, { clipPath: 'inset(0 0 0 100%)' });

    let textProgress  = 0; let textTarget  = 0;
    let imageProgress = 0; let imageTarget = 0;
    let imageFullSince: number | null = null;
    let textGateOpen = false;

    const onScroll = () => {
      const { top, height } = section.getBoundingClientRect();
      textTarget = Math.max(0, Math.min(1, -top / height));

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
    <section
      ref={sectionRef}
      id="story"
      className="px-4 md:px-8 py-12 md:py-[200px] bg-white overflow-hidden"
    >

      {/* ════ DESKTOP ════════════════════════════════════════════════════════ */}
      <div className="hidden md:flex items-start justify-between gap-8">

        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0 pt-1">
          [ Story ]
        </p>

        <div className="flex flex-1 min-w-0 gap-8 items-end justify-end">

          {/* Animated framed bio */}
          <div ref={textDesktopRef} className="w-[384px] shrink min-w-0 self-stretch flex items-end">
            <div className="flex gap-3 items-stretch w-full">
              <div className="flex flex-col justify-between shrink-0 w-6">
                <Corner pos="tl" /><Corner pos="bl" />
              </div>
              <div className="flex-1 flex items-center py-3 min-w-0">
                <p className="font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                  {bio}
                </p>
              </div>
              <div className="flex flex-col justify-between shrink-0 w-6">
                <Corner pos="tr" /><Corner pos="br" />
              </div>
            </div>
          </div>

          <div className="flex gap-6 items-start shrink-0">
            <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">002</p>
            <div ref={imageDesktopRef} className="relative w-[35vw] aspect-[436/614] overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={portraitD}
                alt="Harvey Specter portrait"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ════ MOBILE ═════════════════════════════════════════════════════════ */}
      <div className="flex flex-col gap-5 md:hidden">

        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">002</p>
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ Story ]</p>

        <div ref={textMobileRef}>
          <div className="flex gap-3 items-stretch w-full">
            <div className="flex flex-col justify-between shrink-0 w-6">
              <Corner pos="tl" /><Corner pos="bl" />
            </div>
            <div className="flex-1 flex items-center py-3 min-w-0">
              <p className="font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                {bio}
              </p>
            </div>
            <div className="flex flex-col justify-between shrink-0 w-6">
              <Corner pos="tr" /><Corner pos="br" />
            </div>
          </div>
        </div>

        <div ref={imageMobileRef} className="relative w-full aspect-[422/594] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portraitM}
            alt="Harvey Specter portrait"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

    </section>
  );
}
