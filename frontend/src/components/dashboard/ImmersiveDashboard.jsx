'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GlassCard from 'components/ui/GlassCard';

const roleSections = {
  student: ['Classes', 'Classroom', 'Attendance', 'Fee Payment', 'Assignments', 'Announcements', 'Resources', 'Profile', 'Notifications'],
  teacher: ['Classes', 'Attendance', 'Assignments', 'Announcements', 'Email Access'],
  promo_admin: ['Students', 'Teachers', 'Analytics', 'Fee Overview', 'Settings', 'Activity Feed'],
  super_admin: ['Students', 'Teachers', 'Analytics', 'Fee Overview', 'Settings', 'Activity Feed']
};

const roleCards = {
  student: {
    Classes: ['Current Semester', 'Timetable slots', 'Course credits'],
    Classroom: ['Live sessions', 'Recorded materials', 'Discussion threads'],
    Attendance: ['Monthly attendance', 'Subject-wise trend', 'Shortage alerts'],
    'Fee Payment': ['Outstanding fees', 'Payment receipts', 'Due-date reminders'],
    Assignments: ['Upcoming deadlines', 'Submitted work', 'Evaluation status'],
    Announcements: ['College circulars', 'Exam updates', 'Department notices'],
    Resources: ['E-books', 'Lab manuals', 'Question banks'],
    Profile: ['Personal details', 'Academic history', 'Skill interests'],
    Notifications: ['Priority alerts', 'Class reminders', 'System notifications']
  },
  teacher: {
    Classes: ['Assigned classes', 'Course plans', 'Academic calendar'],
    Attendance: ['Daily marking', 'Class analytics', 'Low attendance alerts'],
    Assignments: ['Upload tasks', 'Submission tracking', 'Evaluation queue'],
    Announcements: ['Publish notices', 'Class announcements', 'Broadcast updates'],
    'Email Access': ['Add student email', 'Remove student email', 'Approval status']
  },
  promo_admin: {
    Students: ['Admissions status', 'Enrollment trends', 'Student records'],
    Teachers: ['Faculty directory', 'Department allocation', 'Workload balance'],
    Analytics: ['Academic KPIs', 'Attendance metrics', 'Program performance'],
    'Fee Overview': ['Collections summary', 'Pending dues', 'Payment channels'],
    Settings: ['Role permissions', 'Workflow controls', 'Portal preferences'],
    'Activity Feed': ['Latest actions', 'System logs', 'Important alerts']
  },
  super_admin: {
    Students: ['Admissions status', 'Enrollment trends', 'Student records'],
    Teachers: ['Faculty directory', 'Department allocation', 'Workload balance'],
    Analytics: ['Academic KPIs', 'Attendance metrics', 'Program performance'],
    'Fee Overview': ['Collections summary', 'Pending dues', 'Payment channels'],
    Settings: ['Role permissions', 'Workflow controls', 'Portal preferences'],
    'Activity Feed': ['Latest actions', 'System logs', 'Important alerts']
  }
};

export default function ImmersiveDashboard({ user, onLogout }) {
  const sections = roleSections[user?.role] || ['Overview'];
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Your live workspace for classes, fees, attendance, and actions.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-blue-600/90 px-4 py-3 text-white">
                <p className="text-xs uppercase tracking-wide text-blue-100">Attendance</p>
                <p className="mt-1 text-xl font-semibold">92%</p>
              </div>
              <div className="rounded-xl bg-white/80 px-4 py-3 text-slate-700 ring-1 ring-blue-100 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700">
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Pending</p>
                <p className="mt-1 text-xl font-semibold">3 Tasks</p>
              </div>
              <div className="rounded-xl bg-white/80 px-4 py-3 text-slate-700 ring-1 ring-blue-100 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700">
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Fees</p>
                <p className="mt-1 text-xl font-semibold">₹ 1,200</p>
              </div>
            </div>
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
