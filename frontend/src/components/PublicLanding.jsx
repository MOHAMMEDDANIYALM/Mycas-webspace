'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import SectionReveal from 'components/ui/SectionReveal';

export default function PublicLanding() {
  const subjects = [
    { icon: '📚', name: 'Computer Science', description: 'Advanced programming & software development' },
    { icon: '🔬', name: 'Sciences', description: 'Physics, Chemistry & Biology' },
    { icon: '🧮', name: 'Mathematics', description: 'Pure & Applied Mathematics' },
    { icon: '📊', name: 'Business', description: 'Management & Economics' },
    { icon: '🎨', name: 'Design', description: 'Creative & Digital Design' },
    { icon: '🌍', name: 'Languages', description: 'Global Communication Skills' }
  ];

  const team = [
    { name: 'Dr. Sarah Johnson', role: 'Head of Department', avatar: '👩‍🏫' },
    { name: 'Prof. Michael Chen', role: 'Faculty Lead', avatar: '👨‍🏫' },
    { name: 'Dr. Emily Rodriguez', role: 'Research Director', avatar: '👩‍🔬' },
    { name: 'Prof. David Smith', role: 'Dean', avatar: '👨‍💼' }
  ];

  return (
    <main className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4 py-20 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-5xl font-bold tracking-tight text-slate-900 md:text-6xl">
                  Shaping Minds,<br />
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Building Futures
                  </span>
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                  Through Smarter Learning
                </p>
              </div>

              <p className="max-w-lg text-base leading-relaxed text-slate-700">
                Innovative education platform providing role-based access, comprehensive course management, and immersive learning experiences for students, teachers, and administrators.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/login"
                  className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:shadow-xl hover:shadow-blue-600/40"
                >
                  Get Started
                </Link>
                <Link
                  href="#features"
                  className="rounded-lg border-2 border-blue-600 px-8 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  Learn More
                </Link>
              </div>

              <div className="flex gap-8 pt-4">
                <div>
                  <p className="text-2xl font-bold text-blue-600">5K+</p>
                  <p className="text-sm text-slate-600">Active Students</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">15+</p>
                  <p className="text-sm text-slate-600">Departments</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">200+</p>
                  <p className="text-sm text-slate-600">Faculty Members</p>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 p-8 shadow-2xl">
                <div className="flex h-96 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 text-7xl">
                  👨‍🎓
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-xl bg-white p-4 shadow-lg">
                <p className="text-sm font-semibold text-slate-900">Smart Learning</p>
                <p className="text-xs text-slate-600">Join our community</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Subjects Section */}
      <SectionReveal className="bg-white px-4 py-20 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-slate-900">Popular Subjects</h2>
            <p className="mt-4 text-lg text-slate-600">
              Explore our comprehensive range of academic programs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-xl bg-gradient-to-br from-blue-50 to-white p-8 shadow-md transition hover:shadow-xl hover:shadow-blue-200/50"
              >
                <div className="text-4xl mb-4">{subject.icon}</div>
                <h3 className="text-xl font-bold text-slate-900">{subject.name}</h3>
                <p className="mt-2 text-slate-600">{subject.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* Features Grid Section */}
      <SectionReveal id="features" className="bg-gradient-to-br from-blue-50 to-white px-4 py-20 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-slate-900">Why Choose Us</h2>
            <p className="mt-4 text-lg text-slate-600">
              Comprehensive features designed for modern education
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '🔒', title: 'Secure Access', desc: 'Role-based authentication with email verification' },
              { icon: '📅', title: 'Smart Scheduling', desc: 'Dynamic timetable management system' },
              { icon: '📧', title: 'Email Directory', desc: 'Maintain student and teacher contacts' },
              { icon: '📊', title: 'Analytics', desc: 'Track progress with detailed reports' },
              { icon: '🎯', title: 'Goal Tracking', desc: 'Monitor academic achievements' },
              { icon: '🌐', title: 'Accessible', desc: 'Works on all devices seamlessly' }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-xl bg-white p-8 shadow-md transition hover:shadow-lg"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* Team Section */}
      <SectionReveal className="bg-white px-4 py-20 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-slate-900">Leadership Team</h2>
            <p className="mt-4 text-lg text-slate-600">
              Meet our dedicated educators and administrators
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-xl bg-gradient-to-br from-blue-50 to-white p-8 text-center shadow-md transition hover:shadow-lg"
              >
                <div className="mb-4 text-6xl">{member.avatar}</div>
                <h3 className="font-bold text-slate-900">{member.name}</h3>
                <p className="mt-2 text-sm text-blue-600 font-semibold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* CTA Section */}
      <SectionReveal className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white">Ready to Transform Learning?</h2>
          <p className="mt-4 text-lg text-blue-100">
            Join thousands of students and educators on our platform
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Sign In
            </Link>
            <Link
              href="#features"
              className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </SectionReveal>

      <PublicFooter />
    </main>
  );
}
