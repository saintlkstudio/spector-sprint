/*
  NEWS & ACHIEVEMENTS SECTION
  ────────────────────────────
  Background: #f3f3f3

  Desktop: rotated vertical title on the left (110 px wide × 706 px tall),
           then 3 article cards on the right in a flex row.
           Middle card is offset 120 px lower for visual rhythm.
           Thin vertical rules sit between each card pair.

  Mobile:  horizontal title at the top, then 3 cards in a horizontally
           scrollable row (each 300 px wide) — second card peeks from right,
           matching the Figma mobile layout.
*/

const articles = [
  {
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imgD: 'https://www.figma.com/api/mcp/asset/1ea70720-a41f-46d3-9c55-a2f41ad546e1',
    imgM: 'https://www.figma.com/api/mcp/asset/d6482abd-082c-4b35-966b-1114a0f0e9d9',
    staggered: false,
  },
  {
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imgD: 'https://www.figma.com/api/mcp/asset/9bae3b3d-8641-41fe-b448-b0d840733f92',
    imgM: 'https://www.figma.com/api/mcp/asset/70d87d9f-ba2a-444f-8593-7bb23e66a8b4',
    staggered: true, // offset 120 px lower on desktop
  },
  {
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imgD: 'https://www.figma.com/api/mcp/asset/1bca1a59-5008-4458-8158-dd58875ef75a',
    imgM: 'https://www.figma.com/api/mcp/asset/d0b8fa11-4b8e-42fe-b823-109f683c8bdd',
    staggered: false,
  },
] as const;

// ── "Read more ↗" underline link ─────────────────────────────────────────────
function ReadMoreLink() {
  return (
    <div className="border-b border-black flex gap-[10px] items-center py-1 self-start">
      <span className="font-medium text-[14px] text-black tracking-[-0.04em]">Read more</span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M1.5 10.5L10.5 1.5M10.5 1.5H4.5M10.5 1.5V7.5"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ── Desktop article card ──────────────────────────────────────────────────────
function DesktopCard({
  img,
  body,
  staggered,
}: {
  img: string;
  body: string;
  staggered: boolean;
}) {
  return (
    <div
      className={`shrink-0 w-[353px] flex flex-col gap-4 items-start${staggered ? ' pt-[120px]' : ''}`}
    >
      {/* Photo */}
      <div className="relative w-full h-[469px] overflow-hidden shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <p className="font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
        {body}
      </p>
      <ReadMoreLink />
    </div>
  );
}

// ── Thin vertical rule between desktop cards ──────────────────────────────────
function VRule() {
  return <div className="self-stretch w-px bg-black/15 shrink-0 mx-[31px]" />;
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function NewsSection() {
  return (
    <section id="news" className="bg-[#f3f3f3] px-4 md:px-8 py-16 md:py-[120px]">

      {/* ════ DESKTOP ════════════════════════════════════════════════════════ */}
      {/* gap-[60px] creates breathing room between rotated title and first card.
          The articles container overflows horizontally at narrower viewports —
          that's intentional; the third card bleeds off and users can scroll. */}
      <div className="hidden md:flex items-end gap-[160px]">

        {/* Rotated vertical title
            The 706 px tall / 110 px wide box contains the title text
            rotated -90°, so it reads bottom-to-top on the left of the section. */}
        <div className="shrink-0 w-[110px] h-[706px] flex items-center justify-center">
          <div className="-rotate-90 whitespace-nowrap">
            <div className="font-light text-[64px] text-black uppercase tracking-[-0.08em] leading-[0.86]">
              <p>Keep up with my latest</p>
              <p>news &amp; achievements</p>
            </div>
          </div>
        </div>

        {/* Three article cards — fixed widths so the third can bleed off-screen */}
        <div className="flex flex-1 min-w-0 items-start overflow-x-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
          <DesktopCard img={articles[0].imgD} body={articles[0].body} staggered={false} />
          <VRule />
          <DesktopCard img={articles[1].imgD} body={articles[1].body} staggered={true} />
          <VRule />
          <DesktopCard img={articles[2].imgD} body={articles[2].body} staggered={false} />
        </div>
      </div>

      {/* ════ MOBILE ══════════════════════════════════════════════════════════
          Title on top (normal horizontal text), then 3 cards in a
          horizontally scrollable row — second card peeks in from the right.
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col gap-8 md:hidden">

        {/* Section title */}
        <div className="font-light text-[32px] text-black uppercase tracking-[-0.08em] leading-[0.86]">
          <p>Keep up with my latest news &amp; achievements</p>
        </div>

        {/* Scrollable card row */}
        <div className="flex gap-4 overflow-x-auto -mx-4 px-4 pb-2 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
          {articles.map((a, i) => (
            <div key={i} className="shrink-0 w-[300px] flex flex-col gap-4">
              <div className="relative h-[398px] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.imgM}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <p className="font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                {a.body}
              </p>
              <ReadMoreLink />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
