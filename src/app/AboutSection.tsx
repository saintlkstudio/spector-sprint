/*
  ABOUT SECTION
  ─────────────
  Desktop: two-column — section label on far left, framed text + portrait on right.
  Mobile:  stacked — 002 → [ About ] → framed text → full-width portrait.

  The "framed text" element has decorative L-shaped corner marks at each of its
  four corners. They're rendered as inline SVGs so they don't expire.
*/

// Desktop photo (436 × 614 px)
const photoDesktop =
  'https://www.figma.com/api/mcp/asset/f63d6845-e5f7-41ae-a7bb-3dfe66ee59ee';
// Mobile photo (same shot, different crop returned by Figma)
const photoMobile =
  'https://www.figma.com/api/mcp/asset/b672052f-6974-4362-97da-b429c13b828c';

// ── Corner bracket marks ──────────────────────────────────────────────────────
type CornerPos = 'tl' | 'tr' | 'bl' | 'br';

const cornerPaths: Record<CornerPos, string> = {
  tl: 'M0 8 L0 0 L8 0',
  tr: 'M8 0 L16 0 L16 8',
  bl: 'M0 8 L0 16 L8 16',
  br: 'M8 16 L16 16 L16 8',
};

function Corner({ pos }: { pos: CornerPos }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d={cornerPaths[pos]}
        stroke="#1f1f1f"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

// ── Framed text block ─────────────────────────────────────────────────────────
// Corner strips sit flush with the top/bottom of the containing flex row via
// justify-between + items-stretch; text is vertically centred with py-3.
function FramedText() {
  return (
    <div className="flex gap-3 items-stretch w-full">
      {/* Left corner strip */}
      <div className="flex flex-col justify-between shrink-0 w-6">
        <Corner pos="tl" />
        <Corner pos="bl" />
      </div>

      {/* Body copy */}
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

      {/* Right corner strip */}
      <div className="flex flex-col justify-between shrink-0 w-6">
        <Corner pos="tr" />
        <Corner pos="br" />
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function AboutSection() {
  return (
    <section className="px-4 md:px-8 py-12 md:py-[80px] bg-white" id="about">

      {/* ════ DESKTOP ════════════════════════════════════════════════════════ */}
      <div className="hidden md:flex items-start justify-between gap-8">

        {/* Far-left section label */}
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0 pt-1">
          [ About ]
        </p>

        {/* Right column: framed text + photo — items-end aligns both to baseline */}
        <div className="flex flex-1 min-w-0 gap-8 items-end justify-end">

          {/* Framed text — fixed 480 px target, shrinks at narrow desktop viewports */}
          <div className="w-[480px] shrink min-w-0 self-stretch flex items-end">
            <FramedText />
          </div>

          {/* 002 counter + portrait */}
          <div className="flex gap-6 items-start shrink-0">
            <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
              002
            </p>
            {/*
              Photo scales with viewport: 30.3 vw ≈ 436 px @ 1440 px.
              aspect-[436/614] keeps the portrait ratio without a fixed height,
              so the text column always gets proportional space.
            */}
            <div className="relative w-[35vw] aspect-[436/614] overflow-hidden shrink-0">
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

        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
          002
        </p>
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
          [ About ]
        </p>

        <FramedText />

        {/* Full-width portrait, aspect 422 : 594 */}
        <div className="relative w-full aspect-[422/594] overflow-hidden">
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
