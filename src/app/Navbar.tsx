'use client';

import { useState } from 'react';

const navLinks = ['About', 'Services', 'Projects', 'News', 'Contact'];

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="5.5"  x2="24" y2="5.5"  stroke="black" strokeWidth="1.5" />
      <line x1="0" y1="12"   x2="24" y2="12"   stroke="black" strokeWidth="1.5" />
      <line x1="0" y1="18.5" x2="24" y2="18.5" stroke="black" strokeWidth="1.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="1" y1="1" x2="23" y2="23" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="23" y1="1" x2="1" y2="23" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────── */}
      <nav className="relative shrink-0 flex items-center justify-between py-6">
        <span className="font-semibold text-[16px] tracking-[-0.04em] capitalize text-black">
          H.Studio
        </span>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-14 font-semibold text-[16px] tracking-[-0.04em] capitalize text-black">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hover:opacity-60 transition-opacity"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden relative z-10"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <HamburgerIcon />
        </button>

        {/* Desktop CTA */}
        <button className="hidden md:flex items-center justify-center bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full hover:bg-neutral-800 transition-colors">
          Let&apos;s talk
        </button>
      </nav>

      {/* ── Mobile full-screen menu ──────────────────────────── */}
      {/*
        Slides down from the top; hidden on md+ via pointer-events-none + opacity.
        Using translate-y so the animation plays even before display changes.
      */}
      <div
        className={[
          'fixed inset-0 z-50 flex flex-col bg-black px-6 pt-6 pb-12 md:hidden',
          'transition-transform duration-300 ease-in-out',
          open ? 'translate-y-0' : '-translate-y-full',
        ].join(' ')}
        aria-hidden={!open}
      >
        {/* Menu header */}
        <div className="flex items-center justify-between mb-16 shrink-0">
          <span className="font-semibold text-[16px] tracking-[-0.04em] capitalize text-white">
            H.Studio
          </span>
          <button aria-label="Close menu" onClick={() => setOpen(false)}>
            <CloseIcon />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-6 flex-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="font-light text-[13vw] tracking-[-0.04em] capitalize text-white leading-none hover:opacity-50 transition-opacity"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Mobile CTA at bottom */}
        <button className="self-start border border-white text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full mt-8 shrink-0">
          Let&apos;s talk
        </button>
      </div>
    </>
  );
}
