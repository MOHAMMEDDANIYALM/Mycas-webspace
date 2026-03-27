'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import Campus360Viewer from 'components/public/Campus360Viewer';
import SectionReveal from 'components/ui/SectionReveal';

export default function PublicLanding() {
  const subjects = [
    { icon: '📚', name: 'Computer Science', description: 'Advanced programming' },
    { icon: '🔬', name: 'Sciences', description: 'Physics, Chemistry & Biology' },
    { icon: '🧮', name: 'Mathematics', description: 'Pure & Applied' },
    { icon: '📊', name: 'Business', description: 'Management & Economics' },
    { icon: '🎨', name: 'Design', description: 'Creative & Digital' },
    { icon: '🌍', name: 'Languages', description: 'Global Communication' }
  ];

  const quickLinks = [
    { icon: '📅', label: 'Admissions', href: '/admission' },
    { icon: '👨‍🏫', label: 'Faculty', href: '/faculty' },
    { icon: '📧', label: 'Contact', href: '/contact' },
    { icon: '🎬', label: 'Events', href: '/events' }
  ];

  return (
    <main className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero Section - Mobile First */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4 py-12 md:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6 pt-4"
            >
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                  Shaping Minds,<br />
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Building Futures
                  </span>
                </h1>
                <p className="mt-2 md:mt-3 text-base md:text-lg text-slate-600">
                  Through Smarter Learning
                </p>
              </div>

              <p className="max-w-md text-sm md:text-base leading-relaxed text-slate-700">
                Innovative education platform providing role-based access, comprehensive course management, and immersive learning experiences for students, teachers, and administrators.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/login"
                  className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:shadow-xl hover:shadow-blue-600/40"
                >
                  Get Started
                </Link>
                <Link
                  href="#features"
                  className="rounded-lg border-2 border-blue-600 px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  Learn More
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-6 pt-4">
                <div>
                  <p className="text-xl md:text-3xl font-bold text-blue-600">5K+</p>
                  <p className="text-xs md:text-sm text-slate-600">Active Students</p>
                </div>
                <div>
                  <p className="text-xl md:text-3xl font-bold text-blue-600">15+</p>
                  <p className="text-xs md:text-sm text-slate-600">Departments</p>
                </div>
                <div>
                  <p className="text-xl md:text-3xl font-bold text-blue-600">200+</p>
                  <p className="text-xs md:text-sm text-slate-600">Faculty</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Hero Image + Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4"
            >
              {/* Hero Image */}
              <div className="relative rounded-2xl bg-gradient-to-br from-blue-200 to-blue-100 p-4 md:p-6 shadow-2xl">
                <div className="flex h-64 md:h-96 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 text-6xl md:text-8xl font-bold">
                  👨‍🎓
                </div>
                <div className="absolute -bottom-3 -right-3 rounded-xl bg-white p-2 md:p-3 shadow-lg">
                  <p className="text-xs md:text-sm font-semibold text-slate-900">Smart Learning</p>
                  <p className="text-xs text-slate-600">Join now</p>
                </div>
              </div>

              {/* Quick Links Grid */}
              <div className="grid grid-cols-2 gap-3">
                {quickLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className="rounded-lg border-2 border-blue-200 bg-white p-3 md:p-4 text-center transition hover:border-blue-400 hover:shadow-md"
                  >
                    <div className="text-2xl md:text-4xl mb-1">{link.icon}</div>
                    <p className="text-xs md:text-sm font-semibold text-slate-700">{link.label}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Subjects Section */}
      <SectionReveal className="bg-white px-4 py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">Popular Subjects</h2>
            <p className="mt-2 md:mt-3 text-base md:text-lg text-slate-600">
              Explore our comprehensive range of academic programs
            </p>
          </div>

          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-xl bg-gradient-to-br from-blue-50 to-white p-4 md:p-6 shadow-md transition hover:shadow-xl hover:shadow-blue-200/50 border border-blue-100"
              >
                <div className="text-4xl md:text-5xl mb-2 md:mb-3">{subject.icon}</div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900">{subject.name}</h3>
                <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-600">{subject.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* Features Grid Section */}
      <SectionReveal id="features" className="bg-gradient-to-br from-blue-50 to-white px-4 py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">Why Choose Us</h2>
            <p className="mt-2 md:mt-3 text-base md:text-lg text-slate-600">
              Comprehensive features designed for modern education
            </p>
          </div>

          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                className="rounded-xl bg-white p-4 md:p-6 shadow-md transition hover:shadow-lg border border-blue-100"
              >
                <div className="text-3xl md:text-4xl mb-2 md:mb-3">{feature.icon}</div>
                <h3 className="text-base md:text-lg font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* 360 Campus Tour Section */}
      <SectionReveal id="campus-tour" className="bg-gradient-to-b from-white to-blue-50/30 px-4 py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 md:mb-8 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">Explore Campus In 360°</h2>
            <Link href="/tour" className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-700 hover:to-blue-600">
              Open Full Tour
            </Link>
          </div>
          <Campus360Viewer />
        </div>
      </SectionReveal>

      {/* CTA Section */}
      <SectionReveal className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Ready to Transform Learning?</h2>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-blue-100">
            Join thousands of students and educators on our platform
          </p>
          <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/login"
              className="rounded-lg bg-white px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Sign In
            </Link>
            <Link
              href="#features"
              className="rounded-lg border-2 border-white px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-semibold text-white transition hover:bg-white/10"
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
