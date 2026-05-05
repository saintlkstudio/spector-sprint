import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/app/Navbar';
import FooterSection from '@/app/FooterSection';
import { sanityFetch } from '@/sanity/lib/live';
import { urlFor } from '@/sanity/lib/image';

// ── Types ─────────────────────────────────────────────────────────────────────

type Specs = {
  camera?: string;
  lens?: string;
  shutterSpeed?: string;
  iso?: string;
  client?: string;
};

type PortfolioDetail = {
  _id: string;
  title: string;
  slug: { current: string };
  tags: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  imageUrl?: string;
  order: number;
  description?: string;
  specs?: Specs;
};

// ── Query ─────────────────────────────────────────────────────────────────────

const DETAIL_QUERY = `
  *[_type == "portfolioItem" && slug.current == $slug][0] {
    _id, title, slug, tags, image, imageUrl, order, description,
    specs { camera, lens, shutterSpeed, iso, client }
  }
`;

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await sanityFetch({ query: DETAIL_QUERY, params: { slug } });
  const item = data as PortfolioDetail | null;
  if (!item) return {};
  return {
    title: `${item.title} — Harvey Specter`,
    description: item.description,
  };
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SpecBlock({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-[12px] text-[#999] uppercase tracking-[0.06em] leading-[1.1]">
        {label}
      </p>
      <p className="font-light text-[28px] md:text-[36px] text-black tracking-[-0.04em] leading-[1.05]">
        {value}
      </p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function WorkDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { data } = await sanityFetch({ query: DETAIL_QUERY, params: { slug } });
  const item = data as PortfolioDetail | null;

  if (!item) notFound();

  const imgSrc = item.image
    ? urlFor(item.image).width(2400).url()
    : item.imageUrl;

  const orderLabel = String(item.order).padStart(3, '0');

  return (
    <main>
      <Navbar />

      {/* ── Hero image ─────────────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden bg-black"
        data-navbar="dark"
      >
        {imgSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgSrc}
            alt={item.title}
            className="w-full object-cover object-center"
            style={{ height: 'min(88vh, 1000px)' }}
          />
        )}
      </section>

      {/* ── Detail content ─────────────────────────────────────────────────── */}
      <section className="bg-white px-4 md:px-8 py-16 md:py-[120px]">

        {/* Row 1 — back link + tags */}
        <div className="flex items-start justify-between mb-12 md:mb-[80px]">
          <Link
            href="/#projects"
            className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-200"
          >
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
              <path d="M5 1L1 5M1 5L5 9M1 5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Selected Work
          </Link>

          <div className="flex flex-wrap justify-end gap-2">
            {item.tags?.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[12px] text-[#1f1f1f] uppercase border border-[#1f1f1f]/30 px-3 py-1 rounded-full leading-[1.1]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — title + order */}
        <div className="flex items-end justify-between mb-10 md:mb-[60px]">
          <h1 className="font-light text-[clamp(36px,6.67vw,96px)] text-black uppercase tracking-[-0.08em] leading-[0.86]">
            {item.title}
          </h1>
          <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] pb-1 shrink-0 ml-6">
            {orderLabel}
          </span>
        </div>

        {/* Rule */}
        <div className="h-px w-full bg-black/10 mb-12 md:mb-[60px]" />

        {/* Row 3 — description */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-[80px] mb-12 md:mb-[80px]">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0 md:w-[200px] pt-1">
            [ About the work ]
          </p>
          {item.description && (
            <p className="font-normal text-[16px] md:text-[18px] text-[#1f1f1f] leading-[1.5] tracking-[-0.03em] max-w-[680px]">
              {item.description}
            </p>
          )}
        </div>

        {/* Rule */}
        <div className="h-px w-full bg-black/10 mb-12 md:mb-[60px]" />

        {/* Row 4 — specs grid */}
        {item.specs && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
            <SpecBlock label="Camera"        value={item.specs.camera} />
            <SpecBlock label="Lens"          value={item.specs.lens} />
            <SpecBlock label="Shutter Speed" value={item.specs.shutterSpeed} />
            <SpecBlock label="ISO"           value={item.specs.iso} />
          </div>
        )}

        {/* Client — full-width row below grid, visually heavier */}
        {item.specs?.client && (
          <>
            <div className="h-px w-full bg-black/10 mt-12 md:mt-[60px] mb-12 md:mb-[60px]" />
            <div className="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-[80px]">
              <p className="font-mono text-[12px] text-[#999] uppercase tracking-[0.06em] leading-[1.1] shrink-0 md:w-[200px]">
                Client
              </p>
              <p className="font-light text-[clamp(28px,4vw,56px)] text-black tracking-[-0.05em] leading-[1.05]">
                {item.specs.client}
              </p>
            </div>
          </>
        )}

      </section>

      <FooterSection />
    </main>
  );
}
