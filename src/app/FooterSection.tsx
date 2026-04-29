/*
  FOOTER
  ──────
  Desktop:
    Top block — 3-column row: CTA (left) / social (centre) / social (right) + 1 px rule
    Bottom block — clipped 219 px tall container with giant "H.Studio" wordmark
                   partially overflowing at the bottom; "[ Coded By Claude ]" label
                   rotated 90° on the far left; legal links bottom-right.

  Mobile:
    Top block — stacked CTA + all social links + rule
    Bottom block — legal links (centred) → "[Coded By Claude]" → H.Studio wordmark
                   (clipped at 150 px)

  Horizontal rule: 1 px CSS border (replacing the Figma SVG asset).
*/

const socialLinks = [
  { label: 'Facebook', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'X.com', href: '#' },
  { label: 'Linkedin', href: '#' },
];

export default function FooterSection() {
  return (
    <footer id="contact" className="bg-black px-4 md:px-8 pt-12 md:pt-[48px]">

      {/* ── TOP BLOCK ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-6 md:gap-[48px]">

        {/* Row: CTA / social-centre / social-right */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

          {/* Left — "Have a project in mind?" + "Let's talk" */}
          <div className="flex flex-col gap-3 md:w-[298px]">
            <p className="font-light italic text-[24px] text-white uppercase tracking-[-0.04em] leading-[1.1]">
              Have a{' '}
              <strong className="font-black not-italic">project</strong>
              {' '}in mind?
            </p>
            <button className="self-start border border-white text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full hover:bg-white/10 transition-colors">
              Let&apos;s talk
            </button>
          </div>

          {/* Centre — Facebook / Instagram  (desktop only) */}
          <div className="hidden md:block text-[18px] text-white text-center uppercase tracking-[-0.04em] leading-[1.1] w-[298px]">
            <p>Facebook</p>
            <p>Instagram</p>
          </div>

          {/* Right — X.com / Linkedin  (desktop only) */}
          <div className="hidden md:block text-[18px] text-white text-right uppercase tracking-[-0.04em] leading-[1.1] w-[298px]">
            <p>X.com</p>
            <p>Linkedin</p>
          </div>

          {/* All social links stacked  (mobile only) */}
          <div className="flex flex-col gap-4 md:hidden">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-[18px] text-white uppercase tracking-[-0.04em] leading-[1.1] hover:opacity-60 transition-opacity"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* 1 px horizontal rule */}
        <div className="h-px w-full bg-white/30" />
      </div>

      {/* ── BOTTOM BLOCK — DESKTOP ─────────────────────────────────────────── */}
      {/*
        The wordmark container is fluid (flex-1). Font size is 20vw so it scales
        with viewport width (20vw ≈ 290 px at 1440 px). Container height is
        15.1vw (≈ 75.5 % of font size) so the bottom ~5 % of the letterforms
        bleeds past the clip edge, matching the original fixed-size behaviour.
      */}
      <div className="hidden md:flex items-end justify-between mt-[120px]">

        {/* Wordmark + rotated label */}
        <div className="relative overflow-hidden flex-1" style={{ height: '15.1vw' }}>
          {/* [ Coded By Claude ] — vertical rotated label */}
          <div
            className="absolute left-0 w-[15px] h-[160px] flex items-center justify-center"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <div className="-rotate-90 flex-none">
              <p className="font-mono text-[14px] text-white uppercase whitespace-nowrap leading-[1.1]">
                [ Coded By Claude ]
              </p>
            </div>
          </div>

          {/* H.Studio wordmark — scales with viewport, bottom-clipped */}
          <p
            className="absolute capitalize font-semibold text-white whitespace-nowrap leading-[0.8] tracking-[-0.06em]"
            style={{
              fontSize: '20vw',
              left: '5px',
              top: 0,
            }}
          >
            H.Studio
          </p>
        </div>

        {/* Legal links — bottom-right, 32 px from section bottom */}
        <div className="flex gap-[34px] items-center pb-[32px] shrink-0">
          <a href="#" className="text-[12px] text-white uppercase tracking-[-0.03em] underline hover:opacity-60 transition-opacity">
            Licences
          </a>
          <a href="#" className="text-[12px] text-white uppercase tracking-[-0.03em] underline hover:opacity-60 transition-opacity">
            Privacy Policy
          </a>
        </div>
      </div>

      {/* ── BOTTOM BLOCK — MOBILE ──────────────────────────────────────────── */}
      {/*
        150 px tall clipped container: legal links → [Coded By Claude] →
        H.Studio wordmark at 91 px that overflows the bottom.
      */}
      <div className="md:hidden mt-12 h-[150px] overflow-hidden flex flex-col gap-4 items-center">
        {/* Legal links */}
        <div className="flex gap-[34px] items-center shrink-0">
          <a href="#" className="text-[12px] text-white uppercase tracking-[-0.03em] underline">
            Licences
          </a>
          <a href="#" className="text-[12px] text-white uppercase tracking-[-0.03em] underline">
            Privacy Policy
          </a>
        </div>

        {/* [ Coded By Claude ] */}
        <p className="font-mono text-[10px] text-white uppercase leading-[1.1] shrink-0 self-start">
          [ Coded By Claude ]
        </p>

        {/* H.Studio wordmark — partially cropped by the 150 px container */}
        <p
          className="capitalize font-semibold text-white whitespace-nowrap leading-[0.8] tracking-[-0.06em] shrink-0 self-start"
          style={{ fontSize: '91.425px' }}
        >
          H.Studio
        </p>
      </div>

    </footer>
  );
}
