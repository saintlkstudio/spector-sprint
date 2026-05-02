/*
  SERVICES SECTION — black background
  ─────────────────────────────────────
  Desktop: "[4]" left + "DELIVERABLES" right at 96 px Light, then 4 service rows.
           Each row: bold-italic title on the left, description + thumbnail on the right.

  Mobile:  "[4] DELIVERABLES" at 32 px, each service stacks title → body → thumbnail.
*/

const services = [
  {
    num: '[ 1 ]',
    title: 'Brand Discovery',
    description:
      'Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.',
    // desktop thumbnail / mobile thumbnail
    imgD: 'https://www.figma.com/api/mcp/asset/e2511ba7-7bde-451c-bd55-0c9741c4f164',
    imgM: 'https://www.figma.com/api/mcp/asset/6dc5b38b-fd3e-475c-add7-d20c276e3690',
  },
  {
    num: '[ 2 ]',
    title: 'Web Design & Dev',
    description:
      'Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.',
    imgD: 'https://www.figma.com/api/mcp/asset/50d69e98-6095-4abb-9c36-d49cb0aa6a6e',
    imgM: 'https://www.figma.com/api/mcp/asset/e00822fc-af94-497c-a591-ac45007f20b5',
  },
  {
    num: '[ 3 ]',
    title: 'Marketing',
    description:
      'Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.',
    imgD: 'https://www.figma.com/api/mcp/asset/f06aedd2-4f3a-4a31-92df-85141c3267a2',
    imgM: 'https://www.figma.com/api/mcp/asset/e28f2a25-55e8-4e37-bca8-cfbb4f5bd764',
  },
  {
    num: '[ 4 ]',
    title: 'Photography',
    description:
      'Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.',
    imgD: 'https://www.figma.com/api/mcp/asset/f4d987f6-663a-4724-8bde-f65d47f5aeb7',
    imgM: 'https://www.figma.com/api/mcp/asset/bd583fb4-4f0e-47c4-bd58-79c97e6ace2e',
  },
] as const;

export default function ServicesSection() {
  return (
    <section
      id="services"
      data-navbar="dark"
      className="bg-black px-4 md:px-8 py-12 md:py-[80px] flex flex-col gap-8 md:gap-12"
    >
      {/* ── Section label ───────────────────────────────────── */}
      <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
        [ services ]
      </p>

      {/* ── "[4]  DELIVERABLES" headline ────────────────────── */}
      <div className="flex items-center justify-between font-light text-white uppercase tracking-[-0.08em] text-[32px] md:text-[6.67vw] leading-none">
        <span>[4]</span>
        <span>Deliverables</span>
      </div>

      {/* ── Service rows ────────────────────────────────────── */}
      <div className="flex flex-col gap-12">
        {services.map((s) => (
          <div key={s.num} className="flex flex-col gap-[9px]">

            {/* Number label + rule */}
            <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
              {s.num}
            </p>
            <div className="h-px w-full bg-white opacity-30" />

            {/* ── Desktop row: title LEFT / description+image RIGHT ── */}
            <div className="hidden md:flex items-start justify-between flex-wrap gap-6 pt-[9px]">
              {/* Title */}
              <p className="font-bold italic text-[36px] text-white uppercase leading-[1.1] tracking-[-0.04em] shrink-0">
                {s.title}
              </p>

              {/* Description + thumbnail */}
              <div className="flex gap-6 items-start shrink-0">
                <p className="font-normal text-[14px] text-white leading-[1.3] tracking-[-0.04em] w-[393px]">
                  {s.description}
                </p>
                <div className="relative size-[151px] overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.imgD}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* ── Mobile stack: title → description → thumbnail ── */}
            <div className="flex flex-col gap-4 pt-[9px] md:hidden">
              <p className="font-bold italic text-[36px] text-white uppercase leading-[1.1] tracking-[-0.04em]">
                {s.title}
              </p>
              <p className="font-normal text-[14px] text-white leading-[1.3] tracking-[-0.04em]">
                {s.description}
              </p>
              <div className="relative size-[151px] overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.imgM}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
