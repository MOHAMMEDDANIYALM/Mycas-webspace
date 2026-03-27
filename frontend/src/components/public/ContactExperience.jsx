'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import SectionReveal from 'components/ui/SectionReveal';
import GlassCard from 'components/ui/GlassCard';

export default function ContactExperience() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success('Message sent successfully. Our team will contact you.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Something went wrong. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionReveal className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="mb-10 rounded-2xl border-2 border-blue-200/50 bg-gradient-to-r from-blue-50/50 to-cyan-50/30 p-8 text-center dark:border-blue-800/30 dark:from-blue-900/20 dark:to-cyan-900/20">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl\">📬 Contact Us</h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300\">Get in touch with admissions and support teams.</p>
      </div>

      <div className=\"grid gap-6 lg:grid-cols-2\">
        <GlassCard className=\"border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50/40 dark:border-blue-800/50 dark:from-slate-800 dark:to-blue-900/30\">
          <h2 className=\"text-2xl font-bold text-slate-900 dark:text-white\">🗺️ Visit Campus</h2>
          <p className=\"mt-2 text-sm text-slate-600 dark:text-slate-300\">Interactive map with directions and location details.</p>

          <div className=\"mt-4 overflow-hidden rounded-xl border-2 border-blue-200 ring-1 ring-blue-100 dark:border-blue-800/50 dark:ring-blue-900/30\">
            <iframe
              title=\"MYCAS Campus Map\"
              src=\"https://www.google.com/maps?q=Bangalore&output=embed\"
              className=\"h-[320px] w-full\"
              loading=\"lazy\"
              referrerPolicy=\"no-referrer-when-downgrade\"
            />
          </div>

          <div className=\"mt-4 space-y-2 rounded-lg border-l-4 border-blue-600 bg-blue-50/40 p-3 text-sm font-semibold text-slate-700 dark:bg-blue-900/20 dark:text-slate-200\">
            <p>📞 Phone: +91 8000-000-000</p>
            <p>📧 Email: info@mycas.edu</p>
            <p>🕐 Hours: Mon - Sat, 9:00 AM - 5:00 PM</p>
          </div>
        </GlassCard>

        <GlassCard className=\"relative overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50/40 dark:border-blue-800/50 dark:from-slate-800 dark:to-blue-900/30\">
          <div className=\"pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-300/20 blur-3xl\" />
          <h2 className=\"text-2xl font-bold text-slate-900 dark:text-white\">✉️ Send a Message</h2>
          <p className=\"mt-2 text-sm text-slate-600 dark:text-slate-300\">Our team will get back to you as soon as possible.</p>

          <form onSubmit={submitForm} className=\"mt-5 space-y-3\">
            <FormField label=\"Name\" name=\"name\" value={formData.name} onChange={updateField} required />
            <FormField label=\"Email\" name=\"email\" value={formData.email} onChange={updateField} type=\"email\" required />
            <FormField label=\"Subject\" name=\"subject\" value={formData.subject} onChange={updateField} required />
            <div>
              <label className=\"mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200\">Message</label>
              <textarea
                name=\"message\"
                rows={4}
                required
                value={formData.message}
                onChange={updateField}
                className=\"w-full rounded-lg border-2 border-blue-300 bg-white px-4 py-3 text-sm placeholder-slate-400 transition focus:border-blue-500 focus:outline-none dark:border-blue-700/50 dark:bg-slate-800\"
              />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </GlassCard>
      </div>
    </SectionReveal>
  );
}

function FormField({ label, name, value, onChange, type = 'text', required = false }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-blue-200 bg-white/80 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
      />
    </div>
  );
}
