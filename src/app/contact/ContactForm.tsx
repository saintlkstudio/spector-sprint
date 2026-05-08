'use client';

/*
  CONTACT FORM
  ────────────
  Intake form with bottom-border editorial input style matching the site's
  type system. Fields: Name, Phone, Email, Company, What is your need?

  On submit, shows an inline success state. Wire up the submitForm action
  to an email service (Resend, Nodemailer, etc.) when ready.
*/

import { useState } from 'react';
import MagneticButton from '../MagneticButton';

type FormState = {
  name: string;
  phone: string;
  email: string;
  company: string;
  need: string;
};

function Field({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
}: {
  label: string;
  name: keyof FormState;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={name}
        className="font-mono text-[14px] text-[#6b6b6b] uppercase tracking-[0.06em] leading-[1.1]"
      >
        {label}
        {required && <span className="text-[#1f1f1f] ml-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-transparent border-b border-[#1f1f1f]/20 pb-4 text-[16px] md:text-[18px] text-[#1f1f1f] tracking-[-0.03em] leading-[1.3] outline-none focus:border-[#1f1f1f] transition-colors duration-300 placeholder:text-transparent"
      />
    </div>
  );
}

function TextareaField({
  label,
  name,
  value,
  onChange,
  required = false,
}: {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={name}
        className="font-mono text-[14px] text-[#6b6b6b] uppercase tracking-[0.06em] leading-[1.1]"
      >
        {label}
        {required && <span className="text-[#1f1f1f] ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={5}
        className="w-full bg-transparent border-b border-[#1f1f1f]/20 pb-4 text-[16px] md:text-[18px] text-[#1f1f1f] tracking-[-0.03em] leading-[1.6] outline-none focus:border-[#1f1f1f] transition-colors duration-300 resize-none"
      />
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '', phone: '', email: '', company: '', need: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // TODO: replace with real email action e.g. Resend / Nodemailer
      await new Promise(resolve => setTimeout(resolve, 900));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-8 py-4">
        <p className="font-mono text-[11px] text-[#999] uppercase tracking-[0.06em]">
          [ Message received ]
        </p>
        <p className="font-light text-[clamp(36px,4.5vw,64px)] text-black uppercase tracking-[-0.08em] leading-[0.9]">
          Thank you.<br />We&apos;ll be in<br />touch soon.
        </p>
        <div className="h-px w-16 bg-black/20" />
        <p className="font-normal text-[14px] text-[#555] leading-[1.5] tracking-[-0.02em]">
          Expect to hear from us within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10 md:gap-14">

      {/* Row 1: Name + Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-10">
        <Field label="Name"  name="name"  value={form.name}  onChange={handleChange} required />
        <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
      </div>

      {/* Row 2: Email + Company */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-10">
        <Field label="Email"   name="email"   type="email" value={form.email}   onChange={handleChange} required />
        <Field label="Company" name="company"              value={form.company} onChange={handleChange} />
      </div>

      {/* Row 3: Need — full width */}
      <TextareaField
        label="What is your need?"
        name="need"
        value={form.need}
        onChange={handleChange}
        required
      />

      {status === 'error' && (
        <p className="font-mono text-[11px] text-red-500 uppercase tracking-[0.04em]">
          Something went wrong — please try again.
        </p>
      )}

      <div>
        <MagneticButton
          variant="dark"
          type="submit"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </MagneticButton>
      </div>

    </form>
  );
}
