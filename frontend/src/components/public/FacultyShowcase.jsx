'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GlassCard from 'components/ui/GlassCard';
import SectionReveal from 'components/ui/SectionReveal';

const facultyMembers = [
  {
    name: 'Miss Pushpa',
    designation: 'HOD',
    department: 'Administration',
    experience: '18+ years',
    qualification: 'M.Com, M.Ed',
    subjects: 'Academic Planning, Commerce Foundations',
    contact: 'hod@mycas.edu'
  },
  {
    name: 'Dr. Ramcharan',
    designation: 'Managing Director',
    department: 'Management',
    experience: '22+ years',
    qualification: 'Ph.D. in Education Management',
    subjects: 'Institutional Strategy, Leadership',
    contact: 'md.office@mycas.edu'
  },
  {
    name: 'Miss Ramya',
    designation: 'UG Principal',
    department: 'UG Programs',
    experience: '14+ years',
    qualification: 'MBA, M.Phil',
    subjects: 'UG Academic Excellence',
    contact: 'ugprincipal@mycas.edu'
  },
  {
    name: 'Dr. Ismail',
    designation: 'Managing Director',
    department: 'Management',
    experience: '20+ years',
    qualification: 'Ph.D. in Management Studies',
    subjects: 'Governance, Institutional Growth',
    contact: 'director@mycas.edu'
  },
  {
    name: 'Miss Mansa',
    designation: 'BCA Faculty',
    department: 'BCA',
    experience: '8+ years',
    qualification: 'MCA',
    subjects: 'Programming, Web Development',
    contact: 'bca.mansa@mycas.edu'
  },
  {
    name: 'Miss Prakruthi',
    designation: 'BCA Faculty',
    department: 'BCA',
    experience: '7+ years',
    qualification: 'M.Sc. Computer Science',
    subjects: 'Data Structures, DBMS',
    contact: 'bca.prakruthi@mycas.edu'
  },
  {
    name: 'Miss Shobitha',
    designation: 'BCA Faculty',
    department: 'BCA',
    experience: '9+ years',
    qualification: 'MCA, B.Ed',
    subjects: 'Software Engineering, Mentoring',
    contact: 'bca.shobitha@mycas.edu'
  },
  {
    name: 'Dr. Pankaj Mishra',
    designation: 'Hindi Teacher',
    department: 'Languages',
    experience: '16+ years',
    qualification: 'Ph.D. in Hindi Literature',
    subjects: 'Hindi Language and Literature',
    contact: 'hindi@mycas.edu'
  },
  {
    name: 'Miss Archana',
    designation: 'PU Principal',
    department: 'PU Department',
    experience: '15+ years',
    qualification: 'M.Sc, M.Ed',
    subjects: 'PU Curriculum Planning',
    contact: 'puprincipal@mycas.edu'
  }
];

export default function FacultyShowcase() {
  const [search, setSearch] = useState('');
  const [activeProfile, setActiveProfile] = useState(null);

  const filteredMembers = useMemo(
    () => facultyMembers.filter((member) => member.name.toLowerCase().includes(search.toLowerCase()) || member.department.toLowerCase().includes(search.toLowerCase()) || member.designation.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <>
      <SectionReveal className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 rounded-2xl border-2 border-blue-200/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/30 p-6 md:flex-row md:items-end dark:border-blue-800/30 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="border-l-4 border-blue-600 pl-4">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl\">👨‍🏫 Faculty & Leadership</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300\">Meet the academic leaders and faculty driving student success.</p>
          </div>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder=\"🔍 Search faculty...\"
            className=\"w-full rounded-xl border-2 border-blue-300 bg-white/90 px-4 py-3 text-sm placeholder-slate-400 transition focus:border-blue-500 focus:outline-none md:w-72 dark:border-blue-600/50 dark:bg-slate-800\"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <motion.button key={member.name} whileHover={{ y: -4, scale: 1.01 }} onClick={() => setActiveProfile(member)} className="text-left">
              <GlassCard className="h-full transition hover:shadow-xl hover:shadow-blue-100/70 dark:hover:shadow-blue-900/20">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white">
                    {member.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-blue-900 dark:text-white">{member.name}</h3>
                    <p className="text-xs text-blue-600 dark:text-blue-300">{member.designation}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  <p>
                    <span className="font-semibold text-slate-700 dark:text-slate-100">Department:</span> {member.department}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700 dark:text-slate-100">Experience:</span> {member.experience}
                  </p>
                </div>
              </GlassCard>
            </motion.button>
          ))}
        </div>
      </SectionReveal>

      <AnimatePresence>
        {activeProfile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className=\"fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur\">
            <motion.div initial={{ y: 20, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0, scale: 0.95 }} className=\"w-full max-w-2xl rounded-2xl border-2 border-blue-300 bg-gradient-to-br from-white to-blue-50 p-8 shadow-2xl dark:border-blue-700/50 dark:from-slate-800 dark:to-blue-900/30\">
              <div className=\"flex items-start justify-between gap-4\">
                <div className=\"border-l-4 border-blue-600 pl-4\">
                  <h3 className=\"text-3xl font-bold text-slate-900 dark:text-white\">{activeProfile.name}</h3>
                  <p className=\"mt-2 text-lg font-bold text-blue-600 dark:text-blue-300\">{activeProfile.designation}</p>
                </div>
                <button onClick={() => setActiveProfile(null)} className=\"rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700\">
                  ✕ Close
                </button>
              </div>

              <div className=\"mt-6 grid gap-3 sm:grid-cols-2\">
                <DetailItem label=\"Department\" value={activeProfile.department} />
                <DetailItem label=\"Experience\" value={activeProfile.experience} />
                <DetailItem label=\"Qualification\" value={activeProfile.qualification} />
                <DetailItem label=\"Subjects\" value={activeProfile.subjects} />
              </div>

              <div className=\"mt-6 rounded-xl border-2 border-blue-300/50 bg-blue-100/40 px-4 py-3 text-sm font-semibold text-blue-900 dark:border-blue-700/30 dark:bg-blue-900/40 dark:text-blue-100\">
                📧 Contact: {activeProfile.contact}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className=\"rounded-lg border-2 border-blue-300 bg-white/80 px-4 py-3 transition dark:border-blue-700/50 dark:bg-slate-900/50\">
      <p className=\"text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400\">{label}</p>
      <p className=\"mt-2 text-sm font-semibold text-slate-800 dark:text-slate-100\">{value}</p>
    </div>
  );
}
