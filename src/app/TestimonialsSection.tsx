/*
  TESTIMONIALS SECTION
  ─────────────────────
  Desktop: giant "Testimonials" word centered in a tall section; 4 testimonial
           cards are scattered around it at different rotations using absolute
           positioning. The % left values are computed from the Figma pixel
           positions (e.g. 676 / 1440 = 46.94 %).

  Mobile:  "Testimonials" header at top, then 2 cards shown side-by-side
           (first card full-width-ish, second slightly peeking in), matching
           the Figma mobile layout.
*/

// Logo images for each reviewer (company logos from the Figma)
const logos = {
  lukas:  'https://www.figma.com/api/mcp/asset/9949f3ec-b2f0-4729-9722-bbf48bdd9ea1',
  marko:  'https://www.figma.com/api/mcp/asset/6ee55584-3de5-44bf-a071-49de47e5e57d',
  sarah:  'https://www.figma.com/api/mcp/asset/f82ceeab-14cc-4177-8508-123459aba2f7',
  sofia:  'https://www.figma.com/api/mcp/asset/a7d872d5-38a7-4f03-9b1d-afecf1ee6788',
};

const testimonials = [
  {
    key: 'lukas',
    quote:
      'Professional, precise, and incredibly fast at handling complex product visualizations and templates.',
    author: 'Lukas Weber',
    logo: logos.lukas,
    rotation: 2.9,
    // desktop absolute position (% left from Figma px / 1440, top in px)
    // Moved up from 272 → 200 px so the card clears the heading (which starts at 440 px)
    left: '46.94%',
    top: '200px',
  },
  {
    key: 'marko',
    quote:
      'A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.',
    author: 'Marko Stojković',
    logo: logos.marko,
    rotation: -6.85,
    left: '7.08%',
    top: '142px',
  },
  {
    key: 'sarah',
    quote:
      "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    author: 'Sarah Jenkins',
    logo: logos.sarah,
    rotation: 2.23,
    left: '21.18%',
    top: '553px',
  },
  {
    key: 'sofia',
    quote:
      'An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.',
    author: 'Sofia Martínez',
    logo: logos.sofia,
    rotation: -4.15,
    left: '68.54%',
    top: '546px',
  },
] as const;

// ── Shared card ───────────────────────────────────────────────────────────────
function TestimonialCard({
  quote,
  author,
  logo,
}: {
  quote: string;
  author: string;
  logo: string;
}) {
  return (
    <div className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 w-full">
      {/* Reviewer company logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        className="h-5 w-auto max-w-[150px] object-contain object-left"
      />
      <p className="font-normal text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
        {quote}
      </p>
      <p className="font-black text-[16px] text-black uppercase leading-[1.1] tracking-[-0.04em]">
        {author}
      </p>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  return (
    <section className="bg-white" id="testimonials">

      {/* ════ DESKTOP ════════════════════════════════════════════════════════
          987 px min-height from the Figma spec; overflow-hidden clips cards
          that sit near the edges on narrower viewports.
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block relative px-8 py-[120px] min-h-[987px] overflow-hidden">

        {/* Giant centred "Testimonials" word — sits behind the floating cards.
            mt-[320px]: section has pt-120, so heading starts at 120+320=440px —
            just below where Marko's card ends (~440px), between Marko and Sarah. */}
        <p className="font-medium text-black text-[13.75vw] text-center tracking-[-0.07em] leading-[1.1] capitalize w-full select-none mt-[260px]">
          Testimonials
        </p>

        {/* Scattered & rotated testimonial cards */}
        {testimonials.map((t) => (
          <div
            key={t.key}
            className="absolute w-[353px]"
            style={{
              left: t.left,
              top: t.top,
              transform: `rotate(${t.rotation}deg)`,
            }}
          >
            <TestimonialCard quote={t.quote} author={t.author} logo={t.logo} />
          </div>
        ))}
      </div>

      {/* ════ MOBILE ══════════════════════════════════════════════════════════
          "Testimonials" header, then all 4 cards in a horizontal snap-scroll
          strip. Each card is 80 vw so the next card peeks in from the right.
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden py-16 flex flex-col gap-8">

        <p className="font-medium text-black text-[64px] text-center tracking-[-0.07em] leading-[0.8] capitalize px-4">
          Testimonials
        </p>

        {/* Horizontal scroll strip */}
        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-2 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          {testimonials.map((t) => (
            <div
              key={t.key}
              className="shrink-0 w-[80vw] snap-start"
              style={{ transform: `rotate(${t.rotation}deg)` }}
            >
              <TestimonialCard quote={t.quote} author={t.author} logo={t.logo} />
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
