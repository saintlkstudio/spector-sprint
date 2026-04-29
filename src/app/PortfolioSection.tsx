/*
  SELECTED WORK / PORTFOLIO SECTION
  ──────────────────────────────────
  Desktop: "Selected Work" + "004" headline, [ portfolio ] rotated label on right,
           then a staggered two-column grid — left column starts flush, right column
           is offset 240 px down, creating the cascading layout.
           Left col:  Surfers Paradise → Cyberpunk Caffe → CTA framed block
           Right col: Agency 976 → Minimal Playground

  Mobile:  [ portfolio ] label → "Selected Work / 004" → 4 cards stacked → CTA block
*/

// ── Project images ────────────────────────────────────────────────────────────
// Each project uses a single hero image (the topmost layer from the Figma stack).
const projects = [
  {
    title: 'Surfers Paradise',
    tags: ['Social Media', 'Photography'],
    img: 'https://www.figma.com/api/mcp/asset/153ecdeb-0d73-4c07-8d4b-dc26d13fd6c1',
    tallCard: true,   // 744 px on desktop
  },
  {
    title: 'Cyberpunk Caffe',
    tags: ['Social Media', 'Photography'],
    img: 'https://www.figma.com/api/mcp/asset/72c03e4b-97d0-40fd-9ee4-0dd0036e9ebc',
    tallCard: false,  // 699 px on desktop
  },
  {
    title: 'Agency 976',
    tags: ['Social Media', 'Photography'],
    img: 'https://www.figma.com/api/mcp/asset/4aeb0fca-903e-4de7-b914-d721f3d33a82',
    tallCard: false,
  },
  {
    title: 'Minimal Playground',
    tags: ['Social Media', 'Photography'],
    img: 'https://www.figma.com/api/mcp/asset/10490789-5523-4d35-9fa4-196061f51696',
    tallCard: true,
  },
] as const;

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

// Arrow-link button (↗ inside circle)
function ArrowLink() {
  return (
    <div
      aria-hidden="true"
      className="size-8 shrink-0 rounded-full border border-[#1f1f1f] flex items-center justify-center"
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path
          d="M2 11L11 2M11 2H4.5M11 2V8.5"
          stroke="#1f1f1f"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// Frosted-glass category tag pill
function Tag({ label }: { label: string }) {
  return (
    <span className="backdrop-blur-[10px] bg-white/30 text-[#111] text-[14px] font-medium tracking-[-0.04em] px-2 py-1 rounded-full whitespace-nowrap">
      {label}
    </span>
  );
}

// Individual project card — shared by both layouts, height controlled by className
function ProjectCard({
  project,
  className = '',
}: {
  project: (typeof projects)[number];
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-[10px]">
      {/* Image with frosted tags pinned to bottom-left */}
      <div className={`relative overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.img}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 flex gap-3">
          {project.tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      </div>

      {/* Title + arrow */}
      <div className="flex items-center justify-between">
        <p className="font-black text-[24px] md:text-[36px] text-black uppercase leading-[1.1] tracking-[-0.04em]">
          {project.title}
        </p>
        <ArrowLink />
      </div>
    </div>
  );
}

// CTA framed block (corner brackets + italic quote + "Let's talk" button)
function FramedCTA() {
  return (
    <div className="flex gap-3 items-stretch">
      {/* Left corners */}
      <div className="flex flex-col justify-between shrink-0 w-6">
        <Corner pos="tl" />
        <Corner pos="bl" />
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col gap-[10px] justify-center py-3 min-w-0">
        <p className="italic text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
          Discover how my creativity transforms ideas into impactful digital
          experiences — schedule a call with me to get started.
        </p>
        <button className="self-start bg-black text-white text-[14px] font-medium tracking-[-0.04em] px-4 py-3 rounded-full hover:bg-neutral-800 transition-colors">
          Let&apos;s talk
        </button>
      </div>

      {/* Right corners */}
      <div className="flex flex-col justify-between shrink-0 w-6">
        <Corner pos="tr" />
        <Corner pos="br" />
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function PortfolioSection() {
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
        {/* "Selected Work" + "004" superscript */}
        <div className="flex gap-[10px] items-start uppercase whitespace-nowrap">
          <div className="font-light text-[6.67vw] text-black tracking-[-0.08em] leading-[0.86]">
            <p>Selected</p>
            <p>Work</p>
          </div>
          <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] pt-1">004</p>
        </div>

        {/* "[ portfolio ]" rotated 90° to read vertically */}
        <div className="h-[110px] w-[15px] flex items-center justify-center">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase whitespace-nowrap -rotate-90 origin-center">
            [ portfolio ]
          </p>
        </div>
      </div>

      {/* ── Desktop staggered two-column grid ─────────────────────────────── */}
      <div className="hidden md:flex gap-6 items-start">

        {/* Left column: Surfers Paradise → Cyberpunk Caffe → CTA
            gap-[117px] between every item matches the right column's inter-card
            gap, which fixes both the Surfers→Cyberpunk and Cyberpunk→CTA spacing. */}
        <div className="flex-1 flex flex-col gap-[117px]">
          <ProjectCard project={projects[0]} className="h-[744px]" />
          <ProjectCard project={projects[1]} className="h-[699px]" />
          {/* CTA framed block — max 465 px wide per spec */}
          <div className="w-full max-w-[465px]">
            <FramedCTA />
          </div>
        </div>

        {/* Right column: 240 px top offset → Agency 976 → 117 px gap → Minimal Playground */}
        <div className="flex-1 flex flex-col gap-[117px] pt-[240px]">
          <ProjectCard project={projects[2]} className="h-[699px]" />
          <ProjectCard project={projects[3]} className="h-[744px]" />
        </div>
      </div>

      {/* ── Mobile single-column grid ──────────────────────────────────────── */}
      <div className="flex flex-col gap-6 md:hidden">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} className="h-[390px]" />
        ))}
        {/* CTA block at the bottom */}
        <FramedCTA />
      </div>

    </section>
  );
}
