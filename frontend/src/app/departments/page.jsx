'use client';

import Link from 'next/link';

const departments = [
  {
    name: 'Commerce',
    icon: '💼',
    description: 'Comprehensive study of business, accounting, economics, and finance.',
    programs: ['B.Com (Hons)', 'M.Com', 'CA Foundation'],
    features: ['Industry-aligned curriculum', 'Practical accounting training', 'Internship opportunities']
  },
  {
    name: 'Administration & Management',
    icon: '📊',
    description: 'Professional education in administration, management, and organizational leadership.',
    programs: ['BBA', 'MBA', 'Executive Management Program'],
    features: ['Case study approach', 'Corporate projects', 'Leadership development']
  },
  {
    name: 'Science',
    icon: '🔬',
    description: 'Advanced study of Physics, Chemistry, Biology, and Mathematics.',
    programs: ['B.Sc (Non-Medical)', 'B.Sc (Medical)', 'M.Sc Physics'],
    features: ['State-of-the-art labs', 'Research opportunities', 'Expert faculty']
  }
];

export default function DepartmentsPage() {
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
            <Link href="/faculty" className="text-blue-700 hover:text-blue-900">
              Faculty
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
          <h1 className="mb-4 text-5xl font-bold text-blue-900">Our Departments</h1>
          <p className="text-xl text-gray-700">
            Excellence across Commerce, Administration, and Science
          </p>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-1 lg:grid-cols-3">
            {departments.map((dept) => (
              <div
                key={dept.name}
                className="rounded-xl border border-blue-200 bg-white p-8 shadow-lg hover:shadow-xl transition"
              >
                <div className="mb-4 text-5xl">{dept.icon}</div>
                <h2 className="mb-3 text-2xl font-bold text-blue-900">{dept.name}</h2>
                <p className="mb-6 text-gray-700">{dept.description}</p>

                <div className="mb-6">
                  <h3 className="mb-3 font-semibold text-blue-900">Programs Offered:</h3>
                  <ul className="space-y-2">
                    {dept.programs.map((prog) => (
                      <li key={prog} className="flex items-center gap-2 text-gray-700">
                        <span className="text-blue-600">▸</span>
                        {prog}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6 border-t border-blue-100 pt-6">
                  <h3 className="mb-3 font-semibold text-blue-900">Key Features:</h3>
                  <ul className="space-y-2">
                    {dept.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-gray-700">
                        <span className="text-green-600">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/admission"
                  className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white font-semibold hover:bg-blue-700 transition"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-blue-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-blue-900">Why Choose Our Departments?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6">
              <div className="mb-3 text-3xl">👨‍🏫</div>
              <h3 className="mb-2 font-bold text-blue-900">Expert Faculty</h3>
              <p className="text-gray-700">Highly qualified professors with industry experience and research credentials.</p>
            </div>

            <div className="rounded-lg bg-white p-6">
              <div className="mb-3 text-3xl">🏫</div>
              <h3 className="mb-2 font-bold text-blue-900">Modern Facilities</h3>
              <p className="text-gray-700">State-of-the-art classrooms, laboratories, and learning resources.</p>
            </div>

            <div className="rounded-lg bg-white p-6">
              <div className="mb-3 text-3xl">💼</div>
              <h3 className="mb-2 font-bold text-blue-900">Industry Connect</h3>
              <p className="text-gray-700">Strong partnerships with leading companies for internships and placements.</p>
            </div>

            <div className="rounded-lg bg-white p-6">
              <div className="mb-3 text-3xl">🎓</div>
              <h3 className="mb-2 font-bold text-blue-900">Quality Education</h3>
              <p className="text-gray-700">Curriculum designed to meet international standards and requirements.</p>
            </div>

            <div className="rounded-lg bg-white p-6">
              <div className="mb-3 text-3xl">🌐</div>
              <h3 className="mb-2 font-bold text-blue-900">Global Perspective</h3>
              <p className="text-gray-700">Exchange programs and international collaborations for student enrichment.</p>
            </div>

            <div className="rounded-lg bg-white p-6">
              <div className="mb-3 text-3xl">📚</div>
              <h3 className="mb-2 font-bold text-blue-900">Research Opportunities</h3>
              <p className="text-gray-700">Engage in cutting-edge research projects and publications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Pursue Excellence?</h2>
          <p className="mb-8">Apply now and start your journey with MYCAS Institute</p>
          <Link
            href="/admission"
            className="inline-block rounded-lg bg-white px-8 py-3 text-blue-600 font-semibold hover:bg-blue-50 transition"
          >
            Apply for Admission
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
