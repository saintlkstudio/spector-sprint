/*
  BIO / TAGLINE SECTION
  ─────────────────────
  Desktop: editorial staircase — each line of the phrase sits at a different
           horizontal indent, creating a cascading typographic composition.
           Font: Inter Light 96px (6.67vw so it scales with the viewport).

  Mobile:  everything centred, 32px text, "001" label sits above the first line.
*/

// The "&" in "Born & raised" uses Playfair Display Italic — a single-character
// font switch that gives the classic calligraphic ampersand from the Figma design.
function Ampersand() {
  return (
    <span
      className="italic font-normal"
      style={{ fontFamily: 'var(--font-playfair)' }}
    >
      &amp;
    </span>
  );
}

export default function BioSection() {
  return (
    <section className="px-4 md:px-8 py-12 md:py-[120px] bg-white">
      <div className="flex flex-col gap-6 w-full">

        {/* ── Header: label + rule ─────────────────────────────
            Right-aligned Geist Mono label, then a 1 px horizontal rule.
        ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-3 items-end w-full">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] text-right">
            [ 8+ years in industry ]
          </p>
          <div className="h-px w-full bg-[#1f1f1f]" />
        </div>

        {/* ── Staircase text ───────────────────────────────────
            Each row is a full-width flex container; justify-center (mobile)
            vs justify-start + left padding (desktop) creates the two layouts
            from the same markup.

            Font size:    32px mobile / 6.67vw desktop (= 96px @ 1440px)
            Tracking:     -0.08em  (matches -7.68px @ 96px / -2.56px @ 32px)
            Line-height:  0.84
        ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-2 w-full">

          {/* Line 1 ── "A creative director   /" + "001" counter
              Mobile:  "001" on top (flex-col, items-center), gap 12 px
              Desktop: text left, "001" to its right (flex-row, items-start)
          */}
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-start md:gap-3 uppercase">
            <p className="order-first md:order-last font-mono text-[14px] text-[#1f1f1f] leading-[1.1] shrink-0">
              001
            </p>
            <p className="order-last md:order-first font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] whitespace-pre text-black">
              {`A creative director   /`}
            </p>
          </div>

          {/* Line 2 ── "Photographer"
              Desktop indent: 214px → 14.86vw
          */}
          <div className="w-full flex justify-center md:justify-start md:pl-[14.86vw]">
            <p className="font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap text-black">
              Photographer
            </p>
          </div>

          {/* Line 3 ── "Born & raised"
              Desktop indent: 610px → 42.36vw
              "&" rendered in Playfair Display Italic
          */}
          <div className="w-full flex justify-center md:justify-start md:pl-[42.36vw]">
            <p className="font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap text-black">
              Born <Ampersand /> raised
            </p>
          </div>

          {/* Line 4 ── "on the south side"
              No indent — back to left edge
          */}
          <div className="w-full flex justify-center md:justify-start">
            <p className="font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap text-black">
              on the south side
            </p>
          </div>

          {/* Line 5 ── "of chicago." + "[ creative freelancer ]"
              Desktop indent: 606px → 42.08vw
              Mobile:  label below "of chicago.", both centred.
              Desktop: label is absolutely positioned to the right
                       at left-[78.4%] of the wrapper (= ~1079px @ 1440px).
          */}
          <div className="relative w-full flex flex-col items-center gap-3 md:items-start md:gap-0 md:pl-[42.08vw]">
            <p className="font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap text-black">
              of chicago.
            </p>
            <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap md:absolute md:top-full md:left-[78.4%] md:mt-1">
              [ creative freelancer ]
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
