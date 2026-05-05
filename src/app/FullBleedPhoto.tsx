'use client';

/*
  FULL-BLEED PHOTO SECTION
  ─────────────────────────
  A single landscape image that spans the full viewport width.

  Desktop: aspect 1440 × 900 from the Figma spec → 62.5 vw tall,
           capped at 900 px so it never gets taller on ultra-wide displays.
  Mobile:  portrait crop (different Figma asset) in a 3:4 aspect ratio.

  Animation: starts as a heavily pixelated mosaic (64-pixel blocks).
  Becomes fully sharp when 50 % of the image has scrolled into view.
*/

import { useRef, useEffect, type RefObject } from 'react';
import gsap from 'gsap';

// Desktop — landscape crop (1440 × 900 design spec)
const photoDesktop =
  'https://www.figma.com/api/mcp/asset/6b83c32c-d7b1-4f3f-97a3-cec5151bb6ff';

// Mobile — portrait crop returned by Figma for the mobile frame
const photoMobile =
  'https://www.figma.com/api/mcp/asset/989ce5c2-6dde-476f-930d-df59caa0359d';

const START_PIXEL_SIZE = 64; // block size (px) when fully pixelated

function usePixelReveal(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  src: string,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Persistent offscreen canvas for the downsample step
    const off = document.createElement('canvas');
    const offCtx = off.getContext('2d')!;

    const img = new window.Image();
    let loaded = false;
    let progress = 0; // current render progress  0 = pixelated, 1 = sharp
    let target = 0;   // scroll-driven target
    let settled = false;

    // ── sizing ────────────────────────────────────────────────────────────────
    function setSize() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      if (w > 0 && h > 0) {
        canvas!.width = w;
        canvas!.height = h;
      }
    }

    // ── draw ──────────────────────────────────────────────────────────────────
    function draw(p: number) {
      if (!loaded) return;
      const w = canvas!.width;
      const h = canvas!.height;
      if (!w || !h) return;

      const pixelSize = Math.max(1, Math.round(START_PIXEL_SIZE * (1 - p)));

      // object-fit: cover — compute source rect from natural image dimensions
      const ia = img.naturalWidth / img.naturalHeight;
      const ca = w / h;
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (ia > ca) {
        sw = sh * ca;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = sw / ca;
        sy = (img.naturalHeight - sh) / 2;
      }

      if (pixelSize <= 1) {
        // Full resolution
        ctx!.imageSmoothingEnabled = true;
        ctx!.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
        return;
      }

      // 1) Downsample to tiny canvas  →  2) Upsample with nearest-neighbour
      const sW = Math.max(1, Math.floor(w / pixelSize));
      const sH = Math.max(1, Math.floor(h / pixelSize));
      off.width = sW;
      off.height = sH;
      offCtx.imageSmoothingEnabled = true;
      offCtx.drawImage(img, sx, sy, sw, sh, 0, 0, sW, sH);

      ctx!.imageSmoothingEnabled = false;
      ctx!.drawImage(off, 0, 0, w, h);
    }

    // ── scroll ────────────────────────────────────────────────────────────────
    const onScroll = () => {
      const rect = canvas!.getBoundingClientRect();
      const vh = window.innerHeight;

      if (rect.height === 0 || rect.top >= vh) {
        target = 0;
      } else {
        // progress 0 → image top enters viewport bottom
        // progress 1 → 50 % of image height has scrolled into view
        const traveled = vh - rect.top;
        target = Math.min(1, Math.max(0, traveled / (rect.height * 0.5)));
      }
      settled = false;
    };

    // ── tick ──────────────────────────────────────────────────────────────────
    const tick = () => {
      if (settled) return;
      progress += (target - progress) * 0.08;
      if (Math.abs(target - progress) < 0.001) {
        progress = target;
        settled = true;
      }
      draw(progress);
    };

    // ── resize ────────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      setSize();
      if (loaded) draw(progress);
    });
    ro.observe(canvas);

    // ── image load ────────────────────────────────────────────────────────────
    img.onload = () => {
      loaded = true;
      setSize();
      draw(progress);
    };
    img.src = src;

    window.addEventListener('scroll', onScroll, { passive: true });
    gsap.ticker.add(tick);
    onScroll(); // set initial target based on current scroll position

    return () => {
      window.removeEventListener('scroll', onScroll);
      gsap.ticker.remove(tick);
      ro.disconnect();
    };
  }, [canvasRef, src]);
}

export default function FullBleedPhoto() {
  const desktopRef = useRef<HTMLCanvasElement>(null);
  const mobileRef = useRef<HTMLCanvasElement>(null);

  usePixelReveal(desktopRef, photoDesktop);
  usePixelReveal(mobileRef, photoMobile);

  return (
    <section className="relative w-full overflow-hidden" data-navbar="dark">

      {/* Mobile: portrait crop, 3:4 ratio */}
      <canvas
        ref={mobileRef}
        aria-label="Photographer shooting with a camera"
        role="img"
        className="md:hidden w-full aspect-[3/4]"
      />

      {/* Desktop: landscape crop, scales with viewport, max 900 px tall */}
      <canvas
        ref={desktopRef}
        aria-label="Photographer shooting with a camera"
        role="img"
        className="hidden md:block w-full"
        style={{ height: 'min(62.5vw, 900px)' }}
      />

    </section>
  );
}
