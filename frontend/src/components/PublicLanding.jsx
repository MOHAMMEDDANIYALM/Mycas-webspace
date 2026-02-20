'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function PublicLanding() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation Bar */}
      <nav className="border-b border-blue-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Image 
              src="/mycas-logo.png" 
              alt="MYCAS Logo" 
              width={40} 
              height={40}
              className="object-contain"
            />
            <span className="text-lg font-bold text-blue-900">MYCAS Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-blue-700 hover:text-blue-900 font-medium">
              Login
            </Link>
            <Link 
              href="/register"
              className="rounded-lg bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl font-bold leading-tight text-blue-900 mb-6">
                Good Education to Build A Better Future
              </h1>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                We offer a quality education that provides not only lessons but also real experience in every field. 
                Embrace the future with our quality education, where lessons come to life through immersive learning.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="rounded-lg bg-blue-600 px-8 py-3 text-white font-semibold hover:bg-blue-700 transition shadow-lg">
                  Take a Tour
                </button>
              </div>
            </div>

            {/* Right Image Placeholder */}
            <div className="relative h-96 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-24 h-24 text-white mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z" />
                  </svg>
                  <p className="text-white font-semibold">Campus Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            
            {/* Quality */}
            <div className="rounded-xl border-l-4 border-blue-600 bg-gradient-to-br from-blue-50 to-white p-8 shadow-md hover:shadow-lg transition">
              <div className="mb-4 inline-block rounded-full bg-blue-100 p-3">
                <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-blue-900">Quality</h3>
              <p className="text-gray-700">
                Experience a world-class education and unlock your potential at our university.
              </p>
            </div>

            {/* Leadership */}
            <div className="rounded-xl border-l-4 border-blue-600 bg-gradient-to-br from-blue-50 to-white p-8 shadow-md hover:shadow-lg transition">
              <div className="mb-4 inline-block rounded-full bg-blue-100 p-3">
                <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-blue-900">Leadership</h3>
              <p className="text-gray-700">
                Guided by visionary leadership, inspiring growth, and shaping future leaders.
              </p>
            </div>

            {/* Experience */}
            <div className="rounded-xl border-l-4 border-blue-600 bg-gradient-to-br from-blue-50 to-white p-8 shadow-md hover:shadow-lg transition">
              <div className="mb-4 inline-block rounded-full bg-blue-100 p-3">
                <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-blue-900">Experience</h3>
              <p className="text-gray-700">
                Embark on a transformation journey of personal and professional growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Join MYCAS Institute Today
          </h2>
          <p className="mb-8 text-xl text-blue-100">
            Towards a Brighter Future in Commerce, Administration & Science
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="rounded-lg bg-white px-8 py-3 text-lg font-semibold text-blue-600 hover:bg-blue-50 transition shadow-lg"
            >
              Create Account
            </Link>
            <Link
              href="/login"
              className="rounded-lg border-2 border-white px-8 py-3 text-lg font-semibold text-white hover:bg-white hover:text-blue-600 transition"
            >
              Login
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
