'use client';

import Link from 'next/link';

export default function PublicLanding() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 py-12">
      <div className="w-full rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-3xl font-bold text-slate-900">CollegeHub</h1>
        <p className="mt-3 text-slate-600">
          Smart college portal for students, teachers, and administrators.
        </p>

        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold">360° Virtual Campus Tour</h2>
          <p className="mt-2 text-sm text-slate-600">
            Explore entrance, corridors, classrooms, and lab scenes in an immersive virtual tour.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Integration ready: Install pannellum and add multi-scene configuration here.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/login"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Create account
          </Link>
        </div>
      </div>
    </main>
  );
}
