import Navbar from './Navbar';
import BioSection from './BioSection';
import AboutSection from './AboutSection';
import FullBleedPhoto from './FullBleedPhoto';
import ServicesSection from './ServicesSection';
import PortfolioSection from './PortfolioSection';
import TestimonialsSection from './TestimonialsSection';
import NewsSection from './NewsSection';
import FooterSection from './FooterSection';

// Desktop: wide landscape shot (full scene)
const heroImageDesktop =
  'https://www.figma.com/api/mcp/asset/1074d048-958d-49cd-a2cd-e481b24ba415';

// Mobile: portrait crop returned by Figma MCP for the mobile frame
const heroImageMobile =
  'https://www.figma.com/api/mcp/asset/95eabbd6-0270-4b32-b1bb-92294bb5a49d';

// Applied directly to the <img> via mask-image so the fade only affects the
// image's own pixels — left/right/top edges stay fully sharp, no overlay colour.
// 0–87 %  fully opaque → image is pristine for most of its height
// 87–100% opaque→0.35  → short, soft fade; colours remain visible at the edge
const heroMask = {
  WebkitMaskImage:
    'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 87%, rgba(0,0,0,0.35) 100%)',
  maskImage:
    'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 87%, rgba(0,0,0,0.35) 100%)',
} as const;

export default function Home() {
  return (
    <main>
      <section className="relative h-screen overflow-hidden flex flex-col px-4 md:px-8 pb-6 md:pb-0">

        {/* ── Hero background photos ───────────────────────────
            Two separate <img> tags let us swap the asset and
            object-position per breakpoint cleanly.
        ─────────────────────────────────────────────────────── */}

        {/* Mobile portrait crop — shown below md */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImageMobile}
          alt=""
          aria-hidden="true"
          className="md:hidden absolute inset-x-0 -top-[80px] w-full h-[calc(100%+80px)] object-cover object-[40%_top] pointer-events-none select-none"
          style={heroMask}
        />

        {/* Desktop landscape — shown at md and above */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImageDesktop}
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-[center_10%] pointer-events-none select-none"
          style={heroMask}
        />


        {/* ── Navbar ─────────────────────────────────────────── */}
        <Navbar />

        {/* ── Hero content ─────────────────────────────────────
            mt-auto on mobile: pushes block flush with bottom of flex column
                               (image fills the space above)
            mt-60 on desktop:  creates the 240 px spec gap below navbar
        ─────────────────────────────────────────────────────── */}
        <div className="relative mt-auto md:mt-60 shrink-0 flex flex-col">

          {/* ── [HELLO I'M] + title ──────────────────────────── */}

          {/*
            DESKTOP
            -------
            Outer div  → flex items-center (horizontal centering of the inner block)
            Inner div  → flex-col items-start, width = intrinsic (fit-content)
                         Because the h1 uses whitespace-nowrap, the inner div's
                         width === text width. The outer div centres it, so the
                         inner div's left edge === the left edge of "Harvey" in the
                         viewport — that's where the label aligns too.
          */}
          <div className="hidden md:flex justify-center w-full pb-[15px]">
            <div className="flex flex-col items-start">
              <p className="font-mono text-white text-[14px] uppercase mix-blend-overlay leading-[1.1]">
                [ Hello i&apos;m ]
              </p>
              <h1
                className="font-medium text-white capitalize mix-blend-overlay text-[13.75vw] leading-[1.1] tracking-[-0.07em] whitespace-nowrap -mt-[15px]"
              >
                Harvey&nbsp;&nbsp;&nbsp;Specter
              </h1>
            </div>
          </div>

          {/*
            MOBILE
            ------
            Centred label + two-line title. The <br> controls the line break so
            the negative tracking doesn't force unexpected wrapping.
          */}
          <div className="md:hidden w-full flex flex-col items-center pb-[15px]">
            <p className="font-mono text-white text-[14px] uppercase mix-blend-overlay leading-[1.1] mb-[10px]">
              [ Hello i&apos;m ]
            </p>
            <h1
              className="font-medium text-white capitalize mix-blend-overlay text-center w-full text-[96px] leading-[0.8] tracking-[-0.07em]"
            >
              Harvey<span className="block mt-[10px]">Specter</span>
            </h1>
          </div>

          {/* ── Bio + CTA ─────────────────────────────────────
              justify-center on mobile centres the 294 px block under the title.
              justify-end on desktop right-aligns it per the Figma spec.
          ─────────────────────────────────────────────────────── */}
          <div className="flex justify-center md:justify-end mt-[10px] md:mt-0">
            <div className="flex flex-col gap-[17px] w-[294px]">
              <p className="font-bold italic text-[#1f1f1f] text-[14px] tracking-[-0.04em] uppercase leading-[16.4px]">
                H.Studio is a{' '}
                <span className="font-normal not-italic">full-service</span>
                {' '}creative studio creating beautiful digital experiences and
                products. We are an{' '}
                <span className="font-normal not-italic">award winning</span>
                {' '}design and art group specializing in branding, web design
                and engineering.
              </p>
              <button className="self-start bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full hover:bg-neutral-800 transition-colors">
                Let&apos;s talk
              </button>
            </div>
          </div>

        </div>
      </section>

      <BioSection />
      <AboutSection />
      <FullBleedPhoto />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <NewsSection />
      <FooterSection />
    </main>
  );
}
