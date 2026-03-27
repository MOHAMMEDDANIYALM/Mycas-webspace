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
    contact: 'hod@mycas.edu',
    avatar: '👩‍🏫'
  },
  {
    name: 'Dr. Ramcharan',
    designation: 'Managing Director',
    department: 'Management',
    experience: '22+ years',
    qualification: 'Ph.D. in Education Management',
    subjects: 'Institutional Strategy, Leadership',
    contact: 'md.office@mycas.edu',
    avatar: '👨‍💼'
  },
  {
    name: 'Miss Ramya',
    designation: 'UG Principal',
    department: 'UG Programs',
    experience: '14+ years',
    qualification: 'MBA, M.Phil',
    subjects: 'UG Academic Excellence',
    contact: 'ugprincipal@mycas.edu',
    avatar: '👩‍🏫'
  },
  {
    name: 'Dr. Ismail',
    designation: 'Managing Director',
    department: 'Management',
    experience: '20+ years',
    qualification: 'Ph.D. in Management Studies',
    subjects: 'Governance, Institutional Growth',
    contact: 'director@mycas.edu',
    avatar: '👨‍💼'
  },
  {
    name: 'Miss Mansa',
    designation: 'BCA Faculty',
    department: 'BCA',
    experience: '8+ years',
    qualification: 'MCA',
    subjects: 'Programming, Web Development',
    contact: 'bca.mansa@mycas.edu',
    avatar: '👩‍💻'
  },
  {
    name: 'Miss Prakruthi',
    designation: 'BCA Faculty',
    department: 'BCA',
    experience: '7+ years',
    qualification: 'M.Sc. Computer Science',
    subjects: 'Data Structures, DBMS',
    contact: 'bca.prakruthi@mycas.edu',
    avatar: '👩‍💻'
  },
  {
    name: 'Miss Shobitha',
    designation: 'BCA Faculty',
    department: 'BCA',
    experience: '9+ years',
    qualification: 'MCA, B.Ed',
    subjects: 'Software Engineering, Mentoring',
    contact: 'bca.shobitha@mycas.edu',
    avatar: '👩‍💻'
  },
  {
    name: 'Dr. Pankaj Mishra',
    designation: 'Hindi Teacher',
    department: 'Languages',
    experience: '16+ years',
    qualification: 'Ph.D. in Hindi Literature',
    subjects: 'Hindi Language and Literature',
    contact: 'hindi@mycas.edu',
    avatar: '👨‍🏫'
  },
  {
    name: 'Miss Archana',
    designation: 'PU Principal',
    department: 'PU Department',
    experience: '15+ years',
    qualification: 'M.Sc, M.Ed',
    subjects: 'PU Curriculum Planning',
    contact: 'puprincipal@mycas.edu',
    avatar: '👩‍🏫'
  }
];

function DetailItem({ label, value }) {
  return (
    <div className="rounded-lg bg-white p-3 dark:bg-slate-700/30">
      <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-300">{label}</p>
      <p className="mt-1 text-sm text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}

export default function FacultyShowcase() {
  const [search, setSearch] = useState('');
  const [activeProfile, setActiveProfile] = useState(null);

  const filteredMembers = useMemo(
    () => facultyMembers.filter((member) => member.name.toLowerCase().includes(search.toLowerCase()) || member.department.toLowerCase().includes(search.toLowerCase()) || member.designation.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <>
      {/* Faculty Section */}
      <SectionReveal className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4 py-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 rounded-2xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:flex-row md:items-end">
            <div className="border-l-4 border-blue-600 pl-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">👨‍🏫 Faculty & Leadership</h1>
              <p className="mt-2 text-sm text-slate-600">Dedicated educators driving student success and innovation</p>
            </div>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="🔍 Search faculty..."
              className="w-full rounded-lg border-2 border-blue-300 bg-white px-4 py-2.5 text-sm placeholder-slate-400 transition focus:border-blue-500 focus:outline-none md:w-72"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member, idx) => (
              <motion.button 
                key={member.name} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }} 
                onClick={() => setActiveProfile(member)} 
                className="text-left"
              >
                <GlassCard className="h-full overflow-hidden border-2 border-blue-200 transition hover:shadow-lg">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 flex items-center justify-center min-h-[160px] rounded-lg">
                    <div className="text-6xl">{member.avatar}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                    <p className="text-sm text-blue-600 font-semibold mt-1">{member.designation}</p>
                    <p className="text-xs text-slate-600 mt-1">{member.department}</p>
                    <button className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700">View Profile →</button>
                  </div>
                </GlassCard>
              </motion.button>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* Group Photo Section */}
      <SectionReveal className="bg-gradient-to-br from-blue-50 to-white px-4 py-12 md:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            👥 Our Faculty Team
          </h2>
          <GlassCard className="overflow-hidden border-2 border-blue-200">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-8 md:p-12 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
              <div className="text-center">
                <div className="text-8xl md:text-9xl mb-4">👨‍👩‍👨‍👧‍👦</div>
                <p className="text-xl md:text-2xl font-bold text-slate-900">Our Dedicated Faculty Team</p>
                <p className="text-slate-600 mt-2 max-w-md">Over 150+ experienced educators and administrators committed to excellence</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </SectionReveal>

      {/* Profile Modal */}
      <AnimatePresence>
        {activeProfile && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur"
          >
            <motion.div 
              initial={{ y: 20, opacity: 0, scale: 0.95 }} 
              animate={{ y: 0, opacity: 1, scale: 1 }} 
              exit={{ y: 20, opacity: 0, scale: 0.95 }} 
              className="w-full max-w-2xl rounded-2xl border-2 border-blue-300 bg-gradient-to-br from-white to-blue-50 p-6 md:p-8 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-6xl bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-lg">
                    {activeProfile.avatar}
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900">{activeProfile.name}</h3>
                    <p className="mt-1 text-lg font-bold text-blue-600">{activeProfile.designation}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveProfile(null)} 
                  className="rounded-lg bg-blue-600 px-3 md:px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  ✕ Close
                </button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <DetailItem label="Department" value={activeProfile.department} />
                <DetailItem label="Experience" value={activeProfile.experience} />
                <DetailItem label="Qualification" value={activeProfile.qualification} />
                <DetailItem label="Subjects/Expertise" value={activeProfile.subjects} />
              </div>

              <div className="mt-6 rounded-xl border-2 border-blue-300/50 bg-blue-100/40 px-4 py-3 text-sm font-semibold text-blue-900">
                📧 Contact: {activeProfile.contact}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
