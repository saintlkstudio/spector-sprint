/*
  PROJECTS PAGE
  ─────────────
  Fetches all portfolio items from Sanity and renders them as a clean
  editorial index list — one row per project, with:
    Desktop: No. | Thumb | Title + Result | Client | Scope | Year
    Mobile:  Image → No. / Year → Title → Client + Scope → Result
*/

import type { Metadata } from 'next';
import Link from 'next/link';
import FooterSection from '@/app/FooterSection';
import { sanityFetch } from '@/sanity/lib/live';
import { urlFor } from '@/sanity/lib/image';
import MagneticArrow from '@/app/MagneticArrow';
import ProjectsHero from './ProjectsHero';
import ProjectsTagline from './ProjectsTagline';

export const metadata: Metadata = {
  title: 'Projects — Harvey Specter',
  description:
    'Selected work by H.Studio — brand identity, web design, marketing, and photography across 20+ countries.',
};

type Project = {
  _id: string;
  title: string;
  slug?: { current: string };
  tags: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  imageUrl?: string;
  client?: string;
  year?: string;
  result?: string;
  order: number;
  projectUrl?: string;
};

const PROJECTS_QUERY = `*[_type == "portfolioItem"] | order(order asc) {
  _id, title, slug, tags, image, imageUrl, client, year, result, order, projectUrl
}`;

export default async function ProjectsPage() {
  const { data } = await sanityFetch({ query: PROJECTS_QUERY });
  const projects = (data ?? []) as Project[];
  const count = String(projects.length).padStart(3, '0');

  return (
    <main>
      <div className="relative z-10">
      <ProjectsHero />
      <ProjectsTagline />

      {/* ── Project list ───────────────────────────────────────────────────── */}
      <section className="px-4 md:px-8 bg-white pb-16 md:pb-[120px]">

        {/* Subhead: [ Projects ] — rule — count */}
        <div className="flex items-center gap-6 mb-16 md:mb-20">
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0">
            [ Projects ]
          </p>
          <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0">
            {count}
          </p>
        </div>

        {/* Column headers — desktop only */}
        <div className="hidden md:grid md:grid-cols-[40px_140px_1fr_180px_200px_72px] gap-x-8 pt-4 pb-4">
          {['No.', '', 'Project', 'Client', 'Scope', 'Year'].map((h, i) => (
            <p key={i} className="font-mono text-[11px] text-[#999] uppercase tracking-[0.06em] leading-[1.1]">
              {h}
            </p>
          ))}
        </div>

        {/* Rows */}
        <div className="flex flex-col">
          {projects.map((p) => {
            const href = p.projectUrl ?? (p.slug?.current ? `/work/${p.slug.current}` : undefined);
            const num  = String(p.order).padStart(2, '0');
            const imgSrc = p.image ? urlFor(p.image).width(280).height(180).fit('crop').url() : p.imageUrl;

            return (
              <div key={p._id} className="group">
                <div className="h-px w-full bg-black/10" />

                {/* ── Desktop row ─────────────────────────────────────────── */}
                <div className="hidden md:grid md:grid-cols-[40px_140px_1fr_180px_200px_72px] gap-x-8 py-7 items-center">

                  {/* No. */}
                  <p className="font-mono text-[13px] text-[#999] leading-[1.1]">
                    {num}
                  </p>

                  {/* Thumbnail */}
                  {imgSrc ? (
                    <div className="relative w-[140px] h-[90px] overflow-hidden shrink-0 bg-[#f3f3f3]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imgSrc}
                        alt={p.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="w-[140px] h-[90px] bg-[#f3f3f3] shrink-0" />
                  )}

                  {/* Title + result */}
                  <div className="flex flex-col gap-2 min-w-0">
                    <div className="flex items-center gap-3">
                      {href ? (
                        <Link href={href}>
                          <h2 className="font-bold italic text-[28px] text-black uppercase leading-[1.05] tracking-[-0.04em] group-hover:opacity-60 transition-opacity duration-200">
                            {p.title}
                          </h2>
                        </Link>
                      ) : (
                        <h2 className="font-bold italic text-[28px] text-black uppercase leading-[1.05] tracking-[-0.04em]">
                          {p.title}
                        </h2>
                      )}
                      <MagneticArrow href={href} />
                    </div>
                    {p.result && (
                      <p className="font-normal text-[13px] text-[#555] leading-[1.5] tracking-[-0.02em]">
                        {p.result}
                      </p>
                    )}
                  </div>

                  {/* Client */}
                  <p className="font-normal text-[14px] text-[#1f1f1f] leading-[1.4] tracking-[-0.02em]">
                    {p.client ?? '—'}
                  </p>

                  {/* Scope (tags) */}
                  <div className="flex flex-wrap gap-[6px]">
                    {p.tags?.length ? p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] text-[#1f1f1f] uppercase border border-[#1f1f1f]/25 px-2 py-[3px] rounded-full leading-[1.2]"
                      >
                        {tag}
                      </span>
                    )) : <span className="font-mono text-[13px] text-[#999]">—</span>}
                  </div>

                  {/* Year */}
                  <p className="font-mono text-[13px] text-[#1f1f1f] leading-[1.1]">
                    {p.year ?? '—'}
                  </p>
                </div>

                {/* ── Mobile card ─────────────────────────────────────────── */}
                <div className="flex flex-col gap-4 py-6 md:hidden">

                  {/* Thumbnail */}
                  {imgSrc && (
                    <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#f3f3f3]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imgSrc}
                        alt={p.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[12px] text-[#999] leading-[1.1]">{num}</p>
                    {p.year && (
                      <p className="font-mono text-[12px] text-[#999] leading-[1.1]">{p.year}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {href ? (
                      <Link href={href}>
                        <h2 className="font-bold italic text-[28px] text-black uppercase leading-[1.05] tracking-[-0.04em]">
                          {p.title}
                        </h2>
                      </Link>
                    ) : (
                      <h2 className="font-bold italic text-[28px] text-black uppercase leading-[1.05] tracking-[-0.04em]">
                        {p.title}
                      </h2>
                    )}
                    <MagneticArrow href={href} />
                  </div>

                  <div className="flex flex-col gap-2">
                    {p.client && (
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[11px] text-[#999] uppercase tracking-[0.04em] shrink-0">Client</span>
                        <span className="font-normal text-[14px] text-[#1f1f1f] leading-[1.4]">{p.client}</span>
                      </div>
                    )}
                    {p.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-[6px]">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[11px] text-[#1f1f1f] uppercase border border-[#1f1f1f]/25 px-2 py-[3px] rounded-full leading-[1.2]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {p.result && (
                    <p className="font-normal text-[13px] text-[#555] leading-[1.5] tracking-[-0.02em]">
                      {p.result}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
          <div className="h-px w-full bg-black/10" />
        </div>
      </section>

      </div>
      <div className="sticky bottom-0">
        <FooterSection />
      </div>
    </main>
  );
}
