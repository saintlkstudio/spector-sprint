/*
  FULL-BLEED PHOTO SECTION
  ─────────────────────────
  A single landscape image that spans the full viewport width.

  Desktop: aspect 1440 × 900 from the Figma spec → 62.5 vw tall,
           capped at 900 px so it never gets taller on ultra-wide displays.
  Mobile:  portrait crop (different Figma asset) in a 3:4 aspect ratio.
*/

// Desktop — landscape crop (1440 × 900 design spec)
const photoDesktop =
  'https://www.figma.com/api/mcp/asset/6b83c32c-d7b1-4f3f-97a3-cec5151bb6ff';

// Mobile — portrait crop returned by Figma for the mobile frame
const photoMobile =
  'https://www.figma.com/api/mcp/asset/989ce5c2-6dde-476f-930d-df59caa0359d';

export default function FullBleedPhoto() {
  return (
    <section className="relative w-full overflow-hidden">

      {/* Mobile: portrait crop, 3:4 ratio */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photoMobile}
        alt="Photographer shooting with a camera"
        className="md:hidden w-full aspect-[3/4] object-cover object-center"
      />

      {/* Desktop: landscape crop, scales with viewport, max 900 px tall */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photoDesktop}
        alt="Photographer shooting with a camera"
        className="hidden md:block w-full object-cover object-center"
        style={{ height: 'min(62.5vw, 900px)' }}
      />

    </section>
  );
}
