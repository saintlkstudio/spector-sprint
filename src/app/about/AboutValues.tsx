/*
  ABOUT VALUES
  ────────────
  Direct adaptation of ServicesSection. Identical black-background layout:
  [ values ] label → "[4] Principles" headline → 4 ruled rows.
  Each row: ScrambleTitle on hover (desktop) + description + thumbnail.
  Thumbnail scales 110 % on hover via CSS group-hover (no GSAP needed).

  Desktop: lg+ = title left, description + thumb right.
           md   = title stacked above content.
  Mobile:  title → description → thumbnail stacked.
*/

import ScrambleTitle from '../ScrambleTitle';

const values = [
  {
    num: '[ 1 ]',
    title: 'Authenticity',
    description:
      'We create work that is genuine, rooted in real stories and honest aesthetics. No templates, no shortcuts. Every project begins with deep listening and ends with work only you could own.',
    imgD: 'https://www.figma.com/api/mcp/asset/e2511ba7-7bde-451c-bd55-0c9741c4f164',
    imgM: 'https://www.figma.com/api/mcp/asset/6dc5b38b-fd3e-475c-add7-d20c276e3690',
  },
  {
    num: '[ 2 ]',
    title: 'Precision',
    description:
      'Every pixel, every word, every transition is considered with obsessive care. The difference between good and great lives in the details most people never consciously notice — but always feel.',
    imgD: 'https://www.figma.com/api/mcp/asset/50d69e98-6095-4abb-9c36-d49cb0aa6a6e',
    imgM: 'https://www.figma.com/api/mcp/asset/e00822fc-af94-497c-a591-ac45007f20b5',
  },
  {
    num: '[ 3 ]',
    title: 'Collaboration',
    description:
      'Your vision drives everything. We listen first, then we create together — building a shared language so the final outcome feels inevitable, not imposed.',
    imgD: 'https://www.figma.com/api/mcp/asset/f06aedd2-4f3a-4a31-92df-85141c3267a2',
    imgM: 'https://www.figma.com/api/mcp/asset/e28f2a25-55e8-4e37-bca8-cfbb4f5bd764',
  },
  {
    num: '[ 4 ]',
    title: 'Impact',
    description:
      'Beautiful work that performs. Every design decision is traced back to business goals, audience needs, and measurable real-world results. Aesthetics and effectiveness are never opposites.',
    imgD: 'https://www.figma.com/api/mcp/asset/f4d987f6-663a-4724-8bde-f65d47f5aeb7',
    imgM: 'https://www.figma.com/api/mcp/asset/bd583fb4-4f0e-47c4-bd58-79c97e6ace2e',
  },
] as const;

export default function AboutValues() {
  return (
    <section
      data-navbar="dark"
      className="bg-black px-4 md:px-8 py-12 md:py-[80px] flex flex-col gap-8 md:gap-12"
    >
      {/* Section label */}
      <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
        [ values ]
      </p>

      {/* "[4]  Principles" headline */}
      <div className="flex items-center justify-between font-light text-white uppercase tracking-[-0.08em] text-[32px] md:text-[6.67vw] leading-none">
        <span>[4]</span>
        <span>Principles</span>
      </div>

      {/* Value rows */}
      <div className="flex flex-col gap-12">
        {values.map((v) => (
          <div key={v.num} className="flex flex-col gap-[9px]">

            <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
              {v.num}
            </p>
            <div className="h-px w-full bg-white opacity-30" />

            {/* Desktop */}
            <div className="hidden md:flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pt-[9px]">
              <ScrambleTitle
                text={v.title}
                className="font-bold italic text-[36px] text-white uppercase leading-[1.1] tracking-[-0.04em] shrink-0 cursor-default select-none"
              />
              <p className="font-normal text-[14px] text-white leading-[1.3] tracking-[-0.04em] w-[393px] shrink-0">
                {v.description}
              </p>
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-4 pt-[9px] md:hidden">
              <p className="font-bold italic text-[36px] text-white uppercase leading-[1.1] tracking-[-0.04em]">
                {v.title}
              </p>
              <p className="font-normal text-[14px] text-white leading-[1.3] tracking-[-0.04em]">
                {v.description}
              </p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
