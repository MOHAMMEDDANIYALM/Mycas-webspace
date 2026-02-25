'use client';

import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import AnimatedCounter from 'components/ui/AnimatedCounter';
import SectionReveal from 'components/ui/SectionReveal';
import GlassCard from 'components/ui/GlassCard';

const timeline = [
  { year: '2010', event: 'Foundation of MYCAS Institute' },
  { year: '2015', event: 'Launch of UG technology and management programs' },
  { year: '2020', event: 'Campus digital transformation and smart classrooms' },
  { year: '2026', event: 'Immersive student portal and virtual campus experience' }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,#e0ecff_0,#ffffff_40%)] dark:bg-slate-950">
      <PublicNavbar />

      <SectionReveal className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard>
            <h1 className="text-4xl font-semibold tracking-tight text-blue-900 dark:text-white">About MYCAS Institute</h1>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
              MYCAS is built around future-ready education in Commerce, Science, and Management through immersive learning and strong mentorship.
            </p>
          </GlassCard>
          <GlassCard>
            <h2 className="text-xl font-semibold text-blue-900 dark:text-white">Mission & Vision</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Mission: empower learners with strong academics, digital skills, and ethical leadership.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Vision: become a benchmark institution for premium learning experiences and career outcomes.
            </p>
          </GlassCard>
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto max-w-7xl px-4 pb-14 md:px-6">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Students Enrolled', value: 5000, suffix: '+' },
            { label: 'Faculty Members', value: 150, suffix: '+' },
            { label: 'Programs', value: 25, suffix: '+' },
            { label: 'Placement', value: 98, suffix: '%' }
          ].map((item) => (
            <GlassCard key={item.label} className="text-center">
              <p className="text-3xl font-semibold text-blue-800 dark:text-blue-300">
                <AnimatedCounter target={item.value} suffix={item.suffix} />
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">{item.label}</p>
            </GlassCard>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto max-w-5xl px-4 pb-20 md:px-6">
        <GlassCard>
          <h2 className="mb-6 text-2xl font-semibold text-blue-900 dark:text-white">Institution Timeline</h2>
          <div className="space-y-4">
            {timeline.map((item) => (
              <div key={item.year} className="flex items-start gap-4">
                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">{item.year}</span>
                <p className="pt-1 text-sm text-slate-700 dark:text-slate-300">{item.event}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </SectionReveal>

      <PublicFooter />
    </main>
  );
}
