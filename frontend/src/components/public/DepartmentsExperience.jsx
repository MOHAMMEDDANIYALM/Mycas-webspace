'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GlassCard from 'components/ui/GlassCard';
import SectionReveal from 'components/ui/SectionReveal';

const departments = [
  {
    id: 'pu',
    title: 'PU Department',
    icon: '🏫',
    summary: 'Strong foundational programs for board excellence and higher studies readiness.',
    programs: ['PU Commerce', 'PU Science - PCMC', 'PU Science - PCMB'],
    details:
      'PU streams focus on concept clarity, exam strategy, and mentorship. Students receive structured support for competitive progression and UG readiness.'
  },
  {
    id: 'ug',
    title: 'UG Department',
    icon: '🎓',
    summary: 'Career-focused undergraduate programs with practical, industry-linked learning.',
    programs: ['BCA', 'BBA', 'B.Com', 'Financial Management'],
    details:
      'UG programs at MICA combine classroom learning with projects, soft-skill development, and guided placement preparation.'
  }
];

export default function DepartmentsExperience() {
  const [activeDepartment, setActiveDepartment] = useState(null);

  return (
    <>
      <SectionReveal className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-8 rounded-2xl border-2 border-blue-200/50 bg-gradient-to-r from-blue-50/50 to-cyan-50/30 p-8 text-center dark:border-blue-800/30 dark:from-blue-900/20 dark:to-cyan-900/20">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">🏫 Our Departments</h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 md:text-base">
            Explore PU and UG pathways designed for academic excellence and career growth.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {departments.map((department) => (
            <motion.button
              key={department.id}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setActiveDepartment(department)}
              className="text-left transition"
            >
              <GlassCard className="h-full border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50/40 transition hover:border-blue-300 hover:shadow-xl dark:border-blue-800/50 dark:from-slate-800 dark:to-blue-900/30">
                <div className="flex items-start justify-between">
                  <span className="text-4xl">{department.icon}</span>
                  <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-bold text-blue-700 dark:text-blue-300">
                    Tap for details
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">{department.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{department.summary}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {department.programs.map((program) => (
                    <span key={program} className="rounded-full border-2 border-blue-300 bg-white px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-700/50 dark:bg-slate-800 dark:text-blue-300">
                      {program}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.button>
          ))}
        </div>
      </SectionReveal>

      <AnimatePresence>
        {activeDepartment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4"
          >
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-2xl border-2 border-blue-300 bg-gradient-to-br from-white to-blue-50 p-8 shadow-2xl dark:border-blue-700/50 dark:from-slate-800 dark:to-blue-900/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{activeDepartment.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{activeDepartment.details}</p>
                </div>
                <button onClick={() => setActiveDepartment(null)} className="whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">
                  ✕ Close
                </button>
              </div>

              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {activeDepartment.programs.map((program) => (
                  <div key={program} className="rounded-lg border-2 border-blue-300 bg-white/80 px-4 py-3 text-sm font-bold text-blue-800 dark:border-blue-700/50 dark:bg-slate-900/50 dark:text-blue-300">
                    🎯 {program}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
