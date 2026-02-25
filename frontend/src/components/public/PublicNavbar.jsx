'use client';

import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from 'components/ThemeToggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/departments', label: 'Programs' },
  { href: '/admission', label: 'Admissions' },
  { href: '/faculty', label: 'Faculty' },
  { href: '/contact', label: 'Contact' }
];

export default function PublicNavbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-blue-100/80 bg-white/75 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/mycas-logo.png" alt="MYCAS Logo" width={34} height={34} unoptimized priority className="rounded-md" />
          <span className="text-lg font-semibold tracking-tight text-blue-900 dark:text-slate-100">MYCAS Portal</span>
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-700 transition hover:text-blue-700 dark:text-slate-200 dark:hover:text-blue-300">
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link href="/login" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
            Login
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <Link href="/login" className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
