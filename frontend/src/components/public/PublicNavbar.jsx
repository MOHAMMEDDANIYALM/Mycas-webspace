'use client';

import Link from 'next/link';
import { useAuth } from 'providers/AuthProvider';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/departments', label: 'Programs' },
  { href: '/admission', label: 'Admissions' },
  { href: '/tour', label: '360 Tour' },
  { href: '/faculty', label: 'Faculty' },
  { href: '/contact', label: 'Contact' }
];

export default function PublicNavbar() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="group flex items-center gap-2 transition">
          <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">MYCAS</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className="text-sm font-semibold text-slate-200 transition duration-200 hover:text-blue-300"
            >
              {item.label}
            </Link>
          ))}
          <div className="h-6 border-l border-white/20" />
          {isAuthenticated ? (
            <Link href="/dashboard" className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-700 hover:to-blue-600">
              Profile
            </Link>
          ) : (
            <Link href="/login" className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-700 hover:to-blue-600">
              Sign In
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3 md:hidden">
          {isAuthenticated ? (
            <Link href="/dashboard" className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-1.5 text-xs font-bold text-white transition hover:from-blue-700 hover:to-blue-600">
              Profile
            </Link>
          ) : (
            <Link href="/login" className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-1.5 text-xs font-bold text-white transition hover:from-blue-700 hover:to-blue-600">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
