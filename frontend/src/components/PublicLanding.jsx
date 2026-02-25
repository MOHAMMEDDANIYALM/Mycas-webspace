'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import Campus360Viewer from 'components/public/Campus360Viewer';
import EventsVideosSection from 'components/public/EventsVideosSection';
import GlassCard from 'components/ui/GlassCard';
import SectionReveal from 'components/ui/SectionReveal';
import AnimatedCounter from 'components/ui/AnimatedCounter';

export default function PublicLanding() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_15%_15%,#dbeafe_0,#f8fbff_42%,#ffffff_100%)] text-slate-900 dark:bg-[radial-gradient(circle_at_20%_10%,#1e3a8a_0,#0f172a_35%,#020617_100%)] dark:text-white">
      <PublicNavbar />

      <section className="relative overflow-hidden px-4 pb-20 pt-14 md:px-6">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="space-y-6">
            <p className="inline-flex rounded-full border border-blue-200 bg-white/70 px-4 py-1 text-xs font-semibold tracking-wide text-blue-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-blue-300">
              MODERN UNIVERSITY EXPERIENCE
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Welcome to MYCAS.
              <span className="block bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">Your Future Starts Here.</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Story-driven learning portal with immersive campus view, premium dashboards, and role-based digital campus operations.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/admission" className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:-translate-y-0.5 hover:bg-blue-700">
                Apply Now
              </Link>
              <Link href="/tour" className="rounded-full border border-blue-200 bg-white/80 px-6 py-3 text-sm font-semibold text-blue-800 transition hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100">
                Explore 360 Tour
              </Link>
              <Link href="/login" className="rounded-full border border-blue-200 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100">
                Login
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.1 }}>
            <GlassCard className="relative overflow-hidden">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-white/80 p-4 dark:bg-slate-900/60">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Departments</p>
                  <p className="mt-2 text-3xl font-semibold"><AnimatedCounter target={15} suffix="+" /></p>
                </div>
                <div className="rounded-xl bg-white/80 p-4 dark:bg-slate-900/60">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Students</p>
                  <p className="mt-2 text-3xl font-semibold"><AnimatedCounter target={5000} suffix="+" /></p>
                </div>
                <div className="rounded-xl bg-white/80 p-4 dark:bg-slate-900/60">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Faculty</p>
                  <p className="mt-2 text-3xl font-semibold"><AnimatedCounter target={200} suffix="+" /></p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-500/10 to-blue-200/20 p-4 dark:border-slate-700 dark:from-blue-500/10 dark:to-slate-800/40">
                <p className="text-sm text-slate-700 dark:text-slate-300">Scroll to discover programs, admissions, events, and interactive campus stories.</p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      <SectionReveal className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <Campus360Viewer />
      </SectionReveal>

      <SectionReveal className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <EventsVideosSection />
      </SectionReveal>

      <SectionReveal className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 md:grid-cols-3 md:px-6">
        {[
          { title: 'Story Scroll UI', text: 'Sections reveal smoothly with depth, blur and premium motion.' },
          { title: 'Glassmorphism Dashboards', text: 'Role-based dashboards switch into immersive post-login workspace.' },
          { title: 'Mobile-first Experience', text: 'Touch-friendly layouts with responsive cards and swipe-ready video rows.' }
        ].map((feature) => (
          <GlassCard key={feature.title} className="transition hover:-translate-y-1">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-white">{feature.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{feature.text}</p>
          </GlassCard>
        ))}
      </SectionReveal>

      <PublicFooter />
    </main>
  );
}
