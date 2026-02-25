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
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-blue-900 dark:text-white md:text-5xl">Departments</h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 md:text-base">
            Explore PU and UG pathways designed for academic excellence and career growth.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {departments.map((department) => (
            <motion.button
              key={department.id}
              whileHover={{ y: -4, scale: 1.01 }}
              onClick={() => setActiveDepartment(department)}
              className="text-left"
            >
              <GlassCard className="h-full">
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{department.icon}</span>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-slate-800 dark:text-slate-200">
                    Tap for details
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-blue-900 dark:text-white">{department.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{department.summary}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {department.programs.map((program) => (
                    <span key={program} className="rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-xs font-medium text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
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
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              className="w-full max-w-2xl rounded-3xl border border-blue-100 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-blue-900 dark:text-white">{activeDepartment.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{activeDepartment.details}</p>
                </div>
                <button onClick={() => setActiveDepartment(null)} className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 hover:bg-blue-100 dark:bg-slate-800 dark:text-slate-200">
                  Close
                </button>
              </div>

              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {activeDepartment.programs.map((program) => (
                  <div key={program} className="rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3 text-sm font-medium text-blue-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                    {program}
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
