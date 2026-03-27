'use client';

import Link from 'next/link';
import ThemeToggle from 'components/ThemeToggle';
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
    <nav className="sticky top-0 z-50 border-b-2 border-blue-200/60 bg-gradient-to-r from-white via-blue-50/40 to-white/80 shadow-sm backdrop-blur-xl dark:border-blue-800/40 dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="group flex items-center gap-2 transition">
          <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent dark:from-blue-300 dark:to-cyan-300">MYCAS</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className="text-sm font-semibold text-slate-700 transition duration-200 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
            >
              {item.label}
            </Link>
          ))}
          <div className="h-6 border-l-2 border-blue-200 dark:border-blue-800/50" />
          <ThemeToggle />
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
          <ThemeToggle />
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
