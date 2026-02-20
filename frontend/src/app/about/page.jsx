'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-blue-200 bg-white sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-blue-900">
            MYCAS Portal
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/departments" className="text-blue-700 hover:text-blue-900">
              Departments
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

      {/* About Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-5xl font-bold text-blue-900">About MYCAS Institute</h1>
            <p className="text-xl text-gray-700">
              Excellence in Commerce, Administration & Science Education
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-blue-900">Our Mission</h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                At MYCAS Institute, we are committed to providing world-class education in Commerce, 
                Administration, and Science. Our mission is to nurture socially responsible, analytical, 
                and creative professionals who can lead the future.
              </p>
              <p className="leading-relaxed text-gray-700">
                We believe in holistic development that combines academic excellence with practical 
                skills, ethical values, and social consciousness.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-blue-900">Our Vision</h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                To be a leading institution recognized for excellence in higher education, producing 
                graduates who are:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Academically outstanding and intellectually curious</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Professionally competent and ethically sound</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Socially responsible and environmentally conscious</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Leaders and innovators in their fields</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-blue-900">Our Core Values</h2>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="rounded-lg bg-blue-50 p-6">
              <div className="mb-3 text-3xl">🎓</div>
              <h3 className="mb-2 text-lg font-bold text-blue-900">Excellence</h3>
              <p className="text-gray-700">
                Pursuit of the highest standards in teaching, learning, and all endeavors.
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-6">
              <div className="mb-3 text-3xl">🤝</div>
              <h3 className="mb-2 text-lg font-bold text-green-900">Integrity</h3>
              <p className="text-gray-700">
                Upholding honesty, transparency, and ethical conduct in all interactions.
              </p>
            </div>

            <div className="rounded-lg bg-purple-50 p-6">
              <div className="mb-3 text-3xl">🌟</div>
              <h3 className="mb-2 text-lg font-bold text-purple-900">Innovation</h3>
              <p className="text-gray-700">
                Embracing creativity and forward-thinking approaches to problem-solving.
              </p>
            </div>

            <div className="rounded-lg bg-orange-50 p-6">
              <div className="mb-3 text-3xl">🌍</div>
              <h3 className="mb-2 text-lg font-bold text-orange-900">Inclusivity</h3>
              <p className="text-gray-700">
                Creating a welcoming community that values diversity and equal opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            <div>
              <div className="text-4xl font-bold">5000+</div>
              <p className="mt-2 text-blue-100">Students Enrolled</p>
            </div>
            <div>
              <div className="text-4xl font-bold">150+</div>
              <p className="mt-2 text-blue-100">Faculty Members</p>
            </div>
            <div>
              <div className="text-4xl font-bold">25+</div>
              <p className="mt-2 text-blue-100">Programs Offered</p>
            </div>
            <div>
              <div className="text-4xl font-bold">98%</div>
              <p className="mt-2 text-blue-100">Placement Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-900">Join Our Community</h2>
          <p className="mb-8 text-gray-700">
            Discover how MYCAS Institute can help you achieve your academic and professional goals.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/admission"
              className="rounded-lg bg-blue-600 px-8 py-3 text-white font-semibold hover:bg-blue-700 transition"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border-2 border-blue-600 px-8 py-3 text-blue-600 font-semibold hover:bg-blue-50 transition"
            >
              Contact Us
            </Link>
          </div>
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
