'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GlassCard from 'components/ui/GlassCard';

const roleSections = {
  student: ['Profile', 'Timetable', 'Fee Payment', 'Marks', 'Announcements'],
  teacher: ['Profile', 'Timetable', 'Bulk Email', 'Class Management', 'Announcements'],
  promo_admin: ['Profile', 'Timetable', 'Bulk Email', 'Class Management', 'Announcements'],
  super_admin: ['Profile', 'Timetable', 'Bulk Email', 'Class Management', 'Announcements']
};

const roleCards = {
  student: {
    Profile: ['Name and course are synced from the Excel directory.', 'Your role controls which tools you can access.'],
    Timetable: ['Your timetable loads for your class/course automatically.', 'View class slots and schedule updates.'],
    'Fee Payment': ['Fee payment portal is coming soon.', 'You will be able to pay and download receipts here.'],
    Marks: ['Internal marks will be published soon.', 'External marks will be published soon.'],
    Announcements: ['College circulars', 'Exam updates', 'Department notices']
  },
  teacher: {
    Profile: ['Name and course are synced from the Excel directory.', 'Teacher/faculty/developer entries get teaching tools.'],
    Timetable: ['Create, edit, and move class events for class codes.', 'Manage room and timing from calendar actions.'],
    'Bulk Email': ['Send announcements to students by class code.', 'Useful for urgent updates and reminders.'],
    'Class Management': ['Change classes using the timetable editor below.', 'Teachers do not have fee or marks panels.'],
    Announcements: ['Publish notices', 'Class announcements', 'Broadcast updates']
  },
  promo_admin: {
    Profile: ['Directory-backed profile with admin privileges.', 'Can manage users and academic operations.'],
    Timetable: ['Create, edit, and move class events for class codes.', 'Control schedules across departments.'],
    'Bulk Email': ['Send announcements to students by class code.', 'Supports multi-class communication workflows.'],
    'Class Management': ['Change classes and schedules from timetable.', 'Resolve timetable conflicts quickly.'],
    Announcements: ['System-wide updates', 'Department notices', 'Staff communications']
  },
  super_admin: {
    Profile: ['Directory-backed profile with super admin privileges.', 'Can manage users and academic operations.'],
    Timetable: ['Create, edit, and move class events for class codes.', 'Control schedules across departments.'],
    'Bulk Email': ['Send announcements to students by class code.', 'Supports multi-class communication workflows.'],
    'Class Management': ['Change classes and schedules from timetable.', 'Resolve timetable conflicts quickly.'],
    Announcements: ['System-wide updates', 'Department notices', 'Staff communications']
  }
};

export default function ImmersiveDashboard({ user, onLogout }) {
  const sections = roleSections[user?.role] || ['Overview'];
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const isStudent = user?.role === 'student';
  const displayCourse = user?.course || user?.classCode || 'Not assigned yet';

  const cards = useMemo(() => {
    const role = user?.role || 'student';
    const roleMap = roleCards[role] || {};
    const points = roleMap[activeSection] || ['Details coming soon'];
    return [
      { title: `${activeSection} Snapshot`, value: `${points.length} insights`, points },
      { title: 'Quick Metrics', value: 'Live', points: points.map((point) => `• ${point}`) },
      { title: 'Action Center', value: 'Ready', points: ['Open panel tools', 'Manage workflows', 'Track updates'] }
    ];
  }, [activeSection, user?.role]);

  return (
    <main className="min-h-screen bg-[linear-gradient(160deg,#dbeafe_0%,#bfdbfe_38%,#e0e7ff_100%)] dark:bg-[linear-gradient(160deg,#0f172a_0%,#1e3a8a_45%,#111827_100%)]">
      <div className="mx-auto flex max-w-7xl gap-4 px-3 py-4 md:px-6 md:py-6">
        <aside className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-white/50 bg-white/60 p-4 shadow-2xl backdrop-blur-2xl transition md:static md:translate-x-0 dark:border-blue-100/10 dark:bg-slate-900/70 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-blue-900 dark:text-white">Dashboard</h2>
            <button onClick={() => setSidebarOpen(false)} className="rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 md:hidden dark:bg-slate-800 dark:text-slate-200">
              Close
            </button>
          </div>

          <div className="mb-5 rounded-2xl border border-blue-100/80 bg-gradient-to-r from-blue-50/80 to-indigo-50/60 p-3 text-xs dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
            <p className="font-semibold text-blue-900 dark:text-white">{user?.fullName}</p>
            <p className="mt-1 capitalize text-slate-600 dark:text-slate-300">{user?.role?.replace('_', ' ')}</p>
            <p className="mt-1 text-slate-600 dark:text-slate-300">Course: {displayCourse}</p>
          </div>

          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => {
                  setActiveSection(section);
                  setSidebarOpen(false);
                }}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition ${activeSection === section ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30' : 'bg-white text-slate-700 hover:bg-blue-50 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'}`}
              >
                {section}
              </button>
            ))}
          </nav>

          <button onClick={onLogout} className="mt-6 w-full rounded-xl bg-rose-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-700">
            Logout
          </button>
        </aside>

        <section className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="rounded-xl border border-blue-200 bg-white/80 px-3 py-2 text-sm font-semibold text-blue-700 md:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              Menu
            </button>
            <div className="hidden md:block" />
            <div className="rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-900 dark:text-slate-200">
              {activeSection}
            </div>
          </div>

          <div className="mb-4 rounded-3xl border border-white/60 bg-white/55 p-5 shadow-[0_20px_45px_rgba(37,99,235,0.2)] backdrop-blur-xl dark:border-blue-100/10 dark:bg-slate-900/65">
            <h1 className="text-2xl font-semibold text-slate-800 dark:text-white md:text-3xl">Welcome Back, {user?.fullName?.split(' ')[0] || 'Student'}.</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Profile synced from Excel: {user?.fullName || 'N/A'} • {displayCourse} • {user?.email || 'N/A'}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-blue-600/90 px-4 py-3 text-white">
                <p className="text-xs uppercase tracking-wide text-blue-100">Role</p>
                <p className="mt-1 text-xl font-semibold capitalize">{user?.role?.replace('_', ' ') || 'student'}</p>
              </div>
              <div className="rounded-xl bg-white/80 px-4 py-3 text-slate-700 ring-1 ring-blue-100 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700">
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Timetable</p>
                <p className="mt-1 text-xl font-semibold">{displayCourse}</p>
              </div>
              <div className="rounded-xl bg-white/80 px-4 py-3 text-slate-700 ring-1 ring-blue-100 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700">
                {isStudent ? (
                  <>
                    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Fees</p>
                    <p className="mt-1 text-xl font-semibold">Coming soon</p>
                  </>
                ) : (
                  <>
                    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Faculty Tools</p>
                    <p className="mt-1 text-xl font-semibold">Enabled</p>
                  </>
                )}
              </div>
            </div>
            {isStudent ? (
              <div className="mt-3 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-800 ring-1 ring-blue-200 dark:bg-slate-800 dark:text-blue-200 dark:ring-slate-700">
                Internal and external marks will be published soon.
              </div>
            ) : null}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeSection} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.25 }} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {cards.map((card) => (
                <GlassCard key={card.title} className="h-full">
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-300">{card.value}</p>
                  <h3 className="mt-1 text-lg font-semibold text-blue-900 dark:text-white">{card.title}</h3>
                  <ul className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                    {card.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>

      <button className="fixed bottom-5 right-5 z-40 rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-300 transition hover:-translate-y-0.5 hover:bg-blue-700 dark:shadow-blue-900/40">
        Quick Action +
      </button>
    </main>
  );
}
