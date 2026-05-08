/*
  ABOUT BIO — editorial biography
  ────────────────────────────────
  New section, no home-page equivalent. Uses the same type tokens and
  spacing as the rest of the site but in a magazine-editorial composition:

  Desktop:
    [ Bio ] ——————————————————————————— 002
    Large italic pull-quote (full width)
    ─ rule ─
    Two-column grid  ←  paragraphs 1 + 2
    Paragraph 3  (full width, constrained reading measure)

  Mobile:
    Everything single-column. Pull-quote stays prominent.

  Animation: pull-quote and each text block fade-in and slide up on first
  scroll into view (GSAP ScrollTrigger, fires once).
*/


const pullQuote =
  '"Design is never decoration. At its best it is the clearest, most honest expression of what you stand for."';

const para1 =
  'Harvey Specter grew up on the south side of Chicago, where reading a room was a survival skill before it became a professional one. That instinct — to understand people, context, and the unspoken — became the foundation of everything he builds. After graduating from the Art Institute of Chicago, he spent five years as senior art director at a global creative agency before founding H.Studio in 2016.';

const para2 =
  'The studio was built on a single conviction: that the best creative work is strategic before it is beautiful. H.Studio works with founders, challenger brands, and established names who want design that moves people and performs in the real world. From brand identity and visual systems to digital experiences and editorial photography, every project begins in the same place — understanding what is true.';

const para3 =
  'Today, H.Studio operates as a senior, intentionally small team. No juniors, no volume, no filler. Every project is led by Harvey personally, with a trusted network of specialists brought in when the scope demands it. The studio is selective by design: fewer clients, deeper engagement, and outcomes that last.';

export default function AboutBio() {
  return (
    <section id="bio" className="px-4 md:px-8 py-12 md:pt-[80px] md:pb-[120px] bg-white">

      {/* Header: [ Bio ] — rule — 002 */}
      <div className="flex items-center gap-6 mb-12 md:mb-[104px]">
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0">
          [ Bio ]
        </p>
        <div className="flex-1 h-px bg-[#1f1f1f] opacity-20" />
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0">
          002
        </p>
      </div>

      <div className="flex flex-col gap-5 md:max-w-[662px] md:mx-auto">

        <div className="flex flex-col gap-5">
          <p className="font-normal text-[14px] md:text-[18px] text-[#1f1f1f] leading-[1.5] tracking-[-0.04em]">
            {para1}
          </p>
        </div>

        {/* Pull-quote — between para 1 and para 2 */}
        <p
          className="font-light italic text-[24px] md:text-[35px] tracking-[-0.04em] leading-[1.25] text-[#1f1f1f] py-3 md:py-[40px]"
        >
          {pullQuote}
        </p>

        <div className="flex flex-col gap-5">
          <p className="font-normal text-[14px] md:text-[18px] text-[#1f1f1f] leading-[1.5] tracking-[-0.04em]">
            {para2}
          </p>
          <p className="font-normal text-[14px] md:text-[18px] text-[#1f1f1f] leading-[1.5] tracking-[-0.04em]">
            {para3}
          </p>
        </div>

      </div>

    </section>
  );
}
