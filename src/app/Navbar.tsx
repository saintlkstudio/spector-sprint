'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';

const navLinks = ['About', 'Services', 'Projects', 'News', 'Contact'];

// SVG icons use currentColor so GSAP can drive stroke colour via `color`
function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <line x1="0" y1="5.5"  x2="24" y2="5.5"  stroke="currentColor" strokeWidth="1.5" />
      <line x1="0" y1="12"   x2="24" y2="12"   stroke="currentColor" strokeWidth="1.5" />
      <line x1="0" y1="18.5" x2="24" y2="18.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <line x1="1" y1="1" x2="23" y2="23" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="23" y1="1" x2="1" y2="23" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Desktop link — elastic skew on hover, underline uses bg-current so it
// automatically inherits whatever colour GSAP sets on the <a> element.
function DesktopLink({
  link,
  linkRef,
}: {
  link: string;
  linkRef: React.RefObject<HTMLAnchorElement | null>;
}) {
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = linkRef.current;
    if (!el) return;
    tlRef.current = gsap.timeline({ paused: true })
      .to(el, { skewX: -8, duration: 0.15, ease: 'power2.out' })
      .to(el, { skewX: 0,  duration: 0.4,  ease: 'elastic.out(1, 0.4)' }, '>');
    return () => { tlRef.current?.kill(); };
  }, [linkRef]);

  return (
    <a
      ref={linkRef}
      href={`#${link.toLowerCase()}`}
      onMouseEnter={() => tlRef.current?.restart()}
      className="relative group inline-block font-semibold text-[16px] tracking-[-0.04em] capitalize"
      style={{ display: 'inline-block' }}
    >
      {link}
      <span className="absolute left-0 -bottom-[2px] h-[1.5px] w-0 bg-current group-hover:w-full transition-[width] duration-300 ease-in-out" />
    </a>
  );
}

export default function Navbar() {
  // ── Mobile menu refs ───────────────────────────────────────
  const overlayRef      = useRef<HTMLDivElement>(null);
  const headerRef       = useRef<HTMLDivElement>(null);
  const linkInnerRefs   = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileCtaRef    = useRef<HTMLDivElement>(null);
  const menuTlRef       = useRef<gsap.core.Timeline | null>(null);
  const isOpenRef       = useRef(false);

  // ── Colour-switch targets ──────────────────────────────────
  const logoRef         = useRef<HTMLSpanElement>(null);
  const hamburgerRef    = useRef<HTMLButtonElement>(null);
  const desktopLinkRefs = useRef(navLinks.map(() => React.createRef<HTMLAnchorElement>()));

  // ── Desktop CTA button (built inline for full colour control)
  const ctaWrapRef  = useRef<HTMLButtonElement>(null);
  const ctaFillRef  = useRef<HTMLSpanElement>(null);
  const ctaTextRef  = useRef<HTMLSpanElement>(null);
  const isDarkRef   = useRef(false);

  // Animates all navbar elements between light ↔ dark colour schemes
  const switchTheme = useCallback((dark: boolean) => {
    isDarkRef.current = dark;
    const fg = dark ? '#ffffff' : '#000000';

    gsap.to([logoRef.current, hamburgerRef.current], { color: fg, duration: 0.4, ease: 'power2.out' });
    gsap.to(desktopLinkRefs.current.map(r => r.current), { color: fg, duration: 0.4, ease: 'power2.out' });

    // Button: swap background and text; update fill colour for next hover
    gsap.to(ctaWrapRef.current, { backgroundColor: dark ? '#ffffff' : '#000000', duration: 0.4, ease: 'power2.out' });
    gsap.to(ctaTextRef.current, { color: dark ? '#000000' : '#ffffff', duration: 0.4, ease: 'power2.out' });
    if (ctaFillRef.current) ctaFillRef.current.style.background = dark ? '#000000' : '#ffffff';
  }, []);

  // ── Mobile menu + desktop CTA hover setup ─────────────────
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    gsap.set(overlay, { clipPath: 'circle(0% at calc(100% - 36px) 36px)', display: 'flex' });
    gsap.set(linkInnerRefs.current, { y: '110%' });
    gsap.set([headerRef.current, mobileCtaRef.current], { opacity: 0, y: 12 });

    menuTlRef.current = gsap.timeline({ paused: true })
      .to(overlay, { clipPath: 'circle(170% at calc(100% - 36px) 36px)', duration: 0.75, ease: 'power4.inOut' })
      .to(headerRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }, '-=0.3')
      .to(linkInnerRefs.current, { y: '0%', duration: 0.65, ease: 'power4.out', stagger: 0.07 }, '-=0.15')
      .to(mobileCtaRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, '-=0.3');

    // Desktop CTA magnetic + fill-sweep hover
    const ctaWrap = ctaWrapRef.current;
    if (!ctaWrap) return;

    const onEnter = () => {
      const fillColor = isDarkRef.current ? '#000000' : '#ffffff';
      const onFillText = isDarkRef.current ? '#ffffff' : '#000000';
      if (ctaFillRef.current) ctaFillRef.current.style.background = fillColor;
      gsap.killTweensOf(ctaFillRef.current);
      gsap.fromTo(ctaFillRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, transformOrigin: 'left center', duration: 0.45, ease: 'power3.inOut' },
      );
      gsap.to(ctaTextRef.current, { color: onFillText, duration: 0.2 });
    };
    const onMove = (e: MouseEvent) => {
      const r = ctaWrap.getBoundingClientRect();
      gsap.to(ctaWrap, {
        x: (e.clientX - (r.left + r.width  / 2)) * 0.28,
        y: (e.clientY - (r.top  + r.height / 2)) * 0.28,
        duration: 0.35, ease: 'power2.out',
      });
    };
    const onLeave = () => {
      const baseText = isDarkRef.current ? '#000000' : '#ffffff';
      gsap.to(ctaWrap, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      gsap.killTweensOf(ctaFillRef.current);
      gsap.to(ctaFillRef.current, { scaleX: 0, transformOrigin: 'right center', duration: 0.4, ease: 'power3.inOut' });
      gsap.to(ctaTextRef.current, { color: baseText, duration: 0.25, delay: 0.1 });
    };

    ctaWrap.addEventListener('mouseenter', onEnter);
    ctaWrap.addEventListener('mousemove',  onMove);
    ctaWrap.addEventListener('mouseleave', onLeave);

    return () => {
      menuTlRef.current?.kill();
      ctaWrap.removeEventListener('mouseenter', onEnter);
      ctaWrap.removeEventListener('mousemove',  onMove);
      ctaWrap.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // ── Dark-section detection via scroll listener ─────────────
  useEffect(() => {
    const NAVBAR_BOTTOM = 80; // px — approximate bottom edge of the fixed navbar

    const check = () => {
      const sections = document.querySelectorAll<HTMLElement>('[data-navbar="dark"]');
      let nowDark = false;
      sections.forEach(s => {
        const r = s.getBoundingClientRect();
        if (r.top < NAVBAR_BOTTOM && r.bottom > 0) nowDark = true;
      });
      if (nowDark !== isDarkRef.current) switchTheme(nowDark);
    };

    window.addEventListener('scroll', check, { passive: true });
    check(); // run once on mount in case page loads mid-scroll

    return () => window.removeEventListener('scroll', check);
  }, [switchTheme]);

  const openMenu = useCallback(() => {
    if (isOpenRef.current) return;
    isOpenRef.current = true;
    overlayRef.current!.setAttribute('aria-hidden', 'false');
    overlayRef.current!.style.pointerEvents = 'auto';
    menuTlRef.current?.play();
  }, []);

  const closeMenu = useCallback(() => {
    if (!isOpenRef.current) return;
    isOpenRef.current = false;
    overlayRef.current!.setAttribute('aria-hidden', 'true');
    overlayRef.current!.style.pointerEvents = 'none';
    menuTlRef.current?.reverse();
  }, []);

  return (
    <>
      {/* ── Fixed top bar ─────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between py-6 px-4 md:px-8">

        <span ref={logoRef} className="font-semibold text-[16px] tracking-[-0.04em] capitalize" style={{ color: '#000' }}>
          H.Studio
        </span>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-14" style={{ color: '#000' }}>
          {navLinks.map((link, i) => (
            <DesktopLink key={link} link={link} linkRef={desktopLinkRefs.current[i]} />
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          className="md:hidden relative z-10"
          style={{ color: '#000' }}
          aria-label="Open menu"
          onClick={openMenu}
        >
          <HamburgerIcon />
        </button>

        {/* Desktop CTA — built inline for full colour-switch control */}
        <button
          ref={ctaWrapRef}
          className="hidden md:inline-flex items-center justify-center relative overflow-hidden rounded-full text-[14px] font-medium tracking-[-0.04em] px-4 py-3 cursor-pointer"
          style={{ backgroundColor: '#000' }}
        >
          <span
            ref={ctaFillRef}
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              background: '#ffffff',
              transform: 'scaleX(0)',
              transformOrigin: 'left center',
            }}
          />
          <span ref={ctaTextRef} className="relative z-10 pointer-events-none" style={{ color: '#fff' }}>
            Let&apos;s talk
          </span>
        </button>
      </nav>

      {/* ── Mobile full-screen overlay ─────────────────────────── */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{ pointerEvents: 'none' }}
        className="fixed inset-0 z-50 flex flex-col bg-black px-6 pt-6 pb-12 md:hidden overflow-hidden"
      >
        <div ref={headerRef} className="flex items-center justify-between mb-16 shrink-0">
          <span className="font-semibold text-[16px] tracking-[-0.04em] capitalize text-white">
            H.Studio
          </span>
          <button aria-label="Close menu" onClick={closeMenu}>
            <CloseIcon />
          </button>
        </div>

        <nav className="flex flex-col gap-6 flex-1">
          {navLinks.map((link, i) => (
            <div key={link} className="overflow-hidden">
              <a
                ref={(el) => { linkInnerRefs.current[i] = el; }}
                href={`#${link.toLowerCase()}`}
                onClick={closeMenu}
                style={{ display: 'block' }}
                className="font-light text-[10.66vw] tracking-[-0.04em] capitalize text-white leading-none"
              >
                {link}
              </a>
            </div>
          ))}
        </nav>

        <div ref={mobileCtaRef} className="self-start mt-8 shrink-0">
          <MagneticButton variant="outline-white">Let&apos;s talk</MagneticButton>
        </div>
      </div>
    </>
  );
}
