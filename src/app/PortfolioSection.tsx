import Link from 'next/link';
import MagneticButton from './MagneticButton';
import MagneticArrow from './MagneticArrow';
import ParallaxImage from './ParallaxImage';
import ScrambleTitle from './ScrambleTitle';

/*
  SELECTED WORK / PORTFOLIO SECTION
  ──────────────────────────────────
  Desktop: "Selected Work" + "004" headline, [ portfolio ] rotated label on right,
           then a staggered two-column grid — left column starts flush, right column
           is offset 240 px down, creating the cascading layout.
           Left col:  items[0] → items[1] → CTA framed block
           Right col: items[2] → items[3]

  Mobile:  [ portfolio ] label → "Selected Work / 004" → 4 cards stacked → CTA block
*/

import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'

// ── Types ─────────────────────────────────────────────────────────────────────

type PortfolioItem = {
  _id: string
  title: string
  slug?: { current: string }
  tags: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any
  imageUrl?: string
  tallCard: boolean
  order: number
  projectUrl?: string
}

const PORTFOLIO_QUERY = `*[_type == "portfolioItem"] | order(order asc) {
  _id, title, slug, tags, image, imageUrl, tallCard, order, projectUrl
}`

// ── Shared sub-components ─────────────────────────────────────────────────────

type CornerPos = 'tl' | 'tr' | 'bl' | 'br';
const cornerPaths: Record<CornerPos, string> = {
  tl: 'M0 8 L0 0 L8 0',
  tr: 'M8 0 L16 0 L16 8',
  bl: 'M0 8 L0 16 L8 16',
  br: 'M8 16 L16 16 L16 8',
};

function Corner({ pos }: { pos: CornerPos }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <path d={cornerPaths[pos]} stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}


function Tag({ label }: { label: string }) {
  return (
    <span className="backdrop-blur-[10px] bg-white/30 text-[#111] text-[14px] font-medium tracking-[-0.04em] px-2 py-1 rounded-full whitespace-nowrap">
      {label}
    </span>
  );
}

function ProjectCard({
  project,
  className = '',
}: {
  project: PortfolioItem;
  className?: string;
}) {
  const imgSrc = project.image
    ? urlFor(project.image).width(900).url()
    : project.imageUrl;

  const href = project.projectUrl ?? (project.slug?.current ? `/work/${project.slug.current}` : undefined);

  return (
    <div className="flex flex-col gap-[10px]">
      <div className={`relative overflow-hidden ${className}`}>
        {imgSrc && <ParallaxImage src={imgSrc} alt={project.title} />}
        <div className="absolute bottom-4 left-4 flex gap-3">
          {project.tags?.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        {href ? (
          <Link href={href} className="min-w-0">
            <ScrambleTitle
              text={project.title}
              className="font-black text-[24px] md:text-[36px] text-black uppercase leading-[1.1] tracking-[-0.04em] cursor-pointer select-none"
            />
          </Link>
        ) : (
          <ScrambleTitle
            text={project.title}
            className="font-black text-[24px] md:text-[36px] text-black uppercase leading-[1.1] tracking-[-0.04em] cursor-default select-none"
          />
        )}
        <MagneticArrow href={href} />
      </div>
    </div>
  );
}

function FramedCTA() {
  return (
    <div className="flex gap-3 items-stretch">
      <div className="flex flex-col justify-between shrink-0 w-6">
        <Corner pos="tl" />
        <Corner pos="bl" />
      </div>

      <div className="flex-1 flex flex-col gap-[10px] justify-center py-3 min-w-0">
        <p className="italic text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
          Discover how my creativity transforms ideas into impactful digital
          experiences — schedule a call with me to get started.
        </p>
        <MagneticButton variant="dark" href="/contact">Let&apos;s talk</MagneticButton>
      </div>

      <div className="flex flex-col justify-between shrink-0 w-6">
        <Corner pos="tr" />
        <Corner pos="br" />
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default async function PortfolioSection() {
  const { data: projects } = await sanityFetch({ query: PORTFOLIO_QUERY })

  const items = (projects ?? []) as PortfolioItem[]

  return (
    <section id="projects" className="px-4 md:px-8 py-12 md:py-[80px] bg-white">

      {/* ── Header ─────────────────────────────────────────────────────────── */}

      {/* Mobile header */}
      <div className="flex flex-col gap-4 mb-8 md:hidden">
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
          [ portfolio ]
        </p>
        <div className="flex items-start justify-between uppercase">
          <div className="font-light text-[32px] text-black tracking-[-0.08em] leading-[0.86]">
            <p>Selected</p>
            <p>Work</p>
          </div>
          <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">004</p>
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden md:flex items-center justify-between mb-[61px]">
        <div className="flex gap-[10px] items-start uppercase whitespace-nowrap">
          <div className="font-light text-[6.67vw] text-black tracking-[-0.08em] leading-[0.86]">
            <p>Selected</p>
            <p>Work</p>
          </div>
          <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] pt-1">004</p>
        </div>

        <div className="h-[110px] w-[15px] flex items-center justify-center">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase whitespace-nowrap -rotate-90 origin-center">
            [ portfolio ]
          </p>
        </div>
      </div>

      {/* ── Desktop staggered two-column grid ─────────────────────────────── */}
      <div className="hidden md:flex gap-6 items-start">
        {/* Left column: items[0] → items[1] → CTA */}
        <div className="flex-1 flex flex-col gap-[117px]">
          {items[0] && (
            <ProjectCard
              project={items[0]}
              className={items[0].tallCard ? 'h-[744px]' : 'h-[699px]'}
            />
          )}
          {items[1] && (
            <ProjectCard
              project={items[1]}
              className={items[1].tallCard ? 'h-[744px]' : 'h-[699px]'}
            />
          )}
          <div className="w-full max-w-[465px]">
            <FramedCTA />
          </div>
        </div>

        {/* Right column: 240 px offset → items[2] → items[3] */}
        <div className="flex-1 flex flex-col gap-[117px] pt-[240px]">
          {items[2] && (
            <ProjectCard
              project={items[2]}
              className={items[2].tallCard ? 'h-[744px]' : 'h-[699px]'}
            />
          )}
          {items[3] && (
            <ProjectCard
              project={items[3]}
              className={items[3].tallCard ? 'h-[744px]' : 'h-[699px]'}
            />
          )}
        </div>
      </div>

      {/* ── Mobile single-column grid ──────────────────────────────────────── */}
      <div className="flex flex-col gap-6 md:hidden">
        {items.map((p) => (
          <ProjectCard key={p._id} project={p} className="h-[390px]" />
        ))}
        <FramedCTA />
      </div>

    </section>
  );
}
