/*
  CONTACT PAGE
  ────────────
  Desktop: two-column split — left has the heading + context copy,
           right has the intake form.
  Mobile:  stacked — heading then form.
*/

import type { Metadata } from 'next';
import Navbar from '@/app/Navbar';
import FooterSection from '@/app/FooterSection';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact — Harvey Specter',
  description: 'Get in touch with H.Studio. Tell us about your project and we\'ll get back to you within 24 hours.',
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      <div className="relative z-10">
      <section className="px-4 md:px-8 pt-[120px] md:pt-[140px] pb-16 md:pb-[120px] bg-white min-h-screen">
        <div className="flex flex-col md:grid md:grid-cols-[2fr_3fr] md:gap-20 gap-12">

          {/* ── Left: context ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-6 md:gap-8 md:pt-2">
            <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
              [ Contact ]
            </p>

            <h1 className="font-light text-[clamp(44px,5.5vw,80px)] text-black uppercase tracking-[-0.08em] leading-[0.88]">
              Get in<br />Touch.
            </h1>

            <div className="h-px w-full bg-[#1f1f1f]/10" />

            <p className="font-normal text-[14px] md:text-[16px] text-[#555] leading-[1.6] tracking-[-0.02em] max-w-[300px]">
              Tell us about your project. We respond to every enquiry within 24 hours and take on only the work we can commit to fully.
            </p>
          </div>

          {/* ── Right: form — top aligns with cap-height of "Get in" ───────── */}
          <div className="md:pt-[55px]">
            <ContactForm />
          </div>

        </div>
      </section>
      </div>
      <div className="sticky bottom-0">
        <FooterSection />
      </div>
    </main>
  );
}
