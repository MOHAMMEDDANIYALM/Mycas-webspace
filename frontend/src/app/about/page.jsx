'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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

const upcomingEvents = [
  { icon: '🎓', title: 'Annual Convocation', date: 'April 15, 2026', photo: '📜' },
  { icon: '🏆', title: 'Sports Championship', date: 'April 22, 2026', photo: '🏅' },
  { icon: '🎬', title: 'Cultural Fest', date: 'May 5, 2026', photo: '🎭' },
  { icon: '💻', title: 'Tech Summit', date: 'May 20, 2026', photo: '💡' }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero Section */}
      <SectionReveal className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4 py-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900">
              About MYCAS Institute
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Shaping future leaders through quality education
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard className="border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h2>
              <p className="leading-relaxed text-slate-700">
                Empower learners with strong academics, digital skills, and ethical leadership to become responsible global citizens and industry leaders.
              </p>
            </GlassCard>
            <GlassCard className="border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h2>
              <p className="leading-relaxed text-slate-700">
                Become a benchmark institution for premium learning experiences and exceptional career outcomes through innovative teaching and mentorship.
              </p>
            </GlassCard>
          </div>
        </div>
      </SectionReveal>

      {/* Stats Section */}
      <SectionReveal className="mx-auto max-w-7xl px-4 py-12 md:py-24">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Students Enrolled', value: 5000, suffix: '+' },
            { label: 'Faculty Members', value: 150, suffix: '+' },
            { label: 'Programs', value: 25, suffix: '+' },
            { label: 'Placement Rate', value: 98, suffix: '%' }
          ].map((item) => (
            <GlassCard key={item.label} className="text-center border-2 border-blue-200">
              <p className="text-3xl md:text-4xl font-bold text-blue-600">
                <AnimatedCounter target={item.value} suffix={item.suffix} />
              </p>
              <p className="mt-2 text-xs md:text-sm uppercase tracking-wide text-slate-600">{item.label}</p>
            </GlassCard>
          ))}
        </div>
      </SectionReveal>

      {/* Timeline Section */}
      <SectionReveal className="bg-gradient-to-br from-blue-50 to-white px-4 py-12 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            Our Journey
          </h2>
          <GlassCard className="border-2 border-blue-200">
            <div className="space-y-6">
              {timeline.map((item, idx) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <span className="rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-bold text-white whitespace-nowrap">{item.year}</span>
                  <p className="pt-2 text-slate-700">{item.event}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </SectionReveal>

      {/* Upcoming Events Section */}
      <SectionReveal className="px-4 py-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            🎬 Upcoming Events
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {upcomingEvents.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <GlassCard className="overflow-hidden border-2 border-blue-200 hover:shadow-lg transition text-center h-full">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 flex items-center justify-center min-h-[150px]">
                    <div className="text-6xl flip">{event.photo}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-slate-900">{event.title}</h3>
                    <p className="text-sm text-slate-600 mt-2">📅 {event.date}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/events" className="inline-block rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:from-blue-700 hover:to-blue-600">
              View All Events & Videos
            </Link>
          </div>
        </div>
      </SectionReveal>

      <PublicFooter />
    </main>
  );
}
