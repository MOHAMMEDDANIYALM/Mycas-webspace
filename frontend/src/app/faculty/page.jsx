'use client';

import Link from 'next/link';

const facultyMembers = [
  {
    name: 'Dr. Rajesh Kumar',
    department: 'Commerce',
    designation: 'Head of Department',
    qualification: 'Ph.D. in Commerce',
    experience: '20+ years',
    specialization: 'Accounting & Financial Management'
  },
  {
    name: 'Dr. Priya Sharma',
    department: 'Science',
    designation: 'Professor of Physics',
    qualification: 'Ph.D. in Physics',
    experience: '18+ years',
    specialization: 'Quantum Mechanics & Nuclear Physics'
  },
  {
    name: 'Mr. Arjun Singh',
    department: 'Administration',
    designation: 'Associate Professor',
    qualification: 'MBA, B.Tech',
    experience: '15+ years',
    specialization: 'Business Strategy & Operations'
  },
  {
    name: 'Dr. Meera Iyer',
    department: 'Commerce',
    designation: 'Professor',
    qualification: 'Ph.D. in Economics',
    experience: '22+ years',
    specialization: 'Microeconomics & Government Policy'
  },
  {
    name: 'Mr. Vikram Patel',
    department: 'Science',
    designation: 'Associate Professor',
    qualification: 'M.Sc. in Chemistry',
    experience: '12+ years',
    specialization: 'Organic Chemistry & Lab Techniques'
  },
  {
    name: 'Dr. Ananya Gupta',
    department: 'Administration',
    designation: 'Professor',
    qualification: 'Ph.D. in Management',
    experience: '25+ years',
    specialization: 'Human Resources & Organizational Behavior'
  }
];

export default function FacultyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-blue-200 bg-white sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-blue-900">
            MYCAS Portal
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-blue-700 hover:text-blue-900">
              About
            </Link>
            <Link href="/departments" className="text-blue-700 hover:text-blue-900">
              Departments
            </Link>
            <Link href="/contact" className="text-blue-700 hover:text-blue-900">
              Contact
            </Link>
            <Link href="/login" className="text-blue-700 hover:text-blue-900">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="mb-4 text-5xl font-bold text-blue-900">Our Faculty</h1>
          <p className="text-xl text-gray-700">
            Exceptional educators dedicated to your success
          </p>
        </div>
      </section>

      {/* Faculty Directory */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {facultyMembers.map((member, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-blue-200 bg-white p-6 shadow-md hover:shadow-lg transition"
              >
                {/* Avatar Placeholder */}
                <div className="mb-4 h-24 w-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>

                <h2 className="mb-1 text-lg font-bold text-blue-900">{member.name}</h2>
                <p className="mb-3 text-sm font-semibold text-blue-600">{member.designation}</p>
                <p className="mb-3 text-sm text-gray-700">{member.department}</p>

                <div className="space-y-2 border-t border-blue-100 pt-4 text-sm text-gray-700">
                  <div>
                    <span className="font-semibold text-blue-900">Qualification:</span> {member.qualification}
                  </div>
                  <div>
                    <span className="font-semibold text-blue-900">Experience:</span> {member.experience}
                  </div>
                  <div>
                    <span className="font-semibold text-blue-900">Specialization:</span> {member.specialization}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Faculty Stands Out */}
      <section className="bg-blue-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-blue-900">Why Our Faculty Stands Out</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6">
              <h3 className="mb-3 text-lg font-bold text-blue-900">Academic Excellence</h3>
              <p className="text-gray-700">
                All faculty members hold advanced degrees from reputed universities with strong academic credentials and continuous professional development.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6">
              <h3 className="mb-3 text-lg font-bold text-blue-900">Industry Experience</h3>
              <p className="text-gray-700">
                Diverse professional experience in industry, ensuring practical, real-world insights integrated into curriculum and teaching.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6">
              <h3 className="mb-3 text-lg font-bold text-blue-900">Research & Innovation</h3>
              <p className="text-gray-700">
                Active researchers and contributors to academic publications, bringing cutting-edge knowledge and research opportunities to students.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6">
              <h3 className="mb-3 text-lg font-bold text-blue-900">Student-Centric Approach</h3>
              <p className="text-gray-700">
                Dedicated to mentoring, guiding, and supporting students in achieving their academic and career goals through personalized attention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-center text-3xl font-bold text-blue-900">Our Teaching Philosophy</h2>
          <div className="rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-8">
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              We believe in fostering an environment where critical thinking, creativity, and collaboration are encouraged. 
              Our faculty members are committed to making complex concepts accessible and engaging, while maintaining rigorous academic standards.
            </p>
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              We employ a blend of traditional lectures, case studies, practical projects, and interactive discussions 
              to ensure that students not only understand theory but also develop practical competencies required in their careers.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Mentorship and personalized guidance form the foundation of our teaching approach, ensuring that every student 
              can reach their full potential.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold">Learn from the Best</h2>
          <p className="mb-8">Join MYCAS Institute and be guided by experienced educators</p>
          <Link
            href="/admission"
            className="inline-block rounded-lg bg-white px-8 py-3 text-blue-600 font-semibold hover:bg-blue-50 transition"
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-gray-600">
          <p>© 2026 MYCAS Institute. All rights reserved. Towards a Brighter Future.</p>
        </div>
      </footer>
    </main>
  );
}
