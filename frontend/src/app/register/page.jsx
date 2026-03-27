'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-12">
      <div className="w-full space-y-4 rounded-2xl bg-gradient-to-br from-white to-blue-50 p-8 shadow-xl ring-2 ring-blue-200 dark:from-slate-800 dark:to-blue-900/30 dark:ring-blue-800/50">
        <div className="flex items-center justify-center rounded-full bg-blue-100 p-4 dark:bg-blue-900/40">
          <span className="text-3xl">🔐</span>
        </div>
        <h1 className="text-center text-3xl font-bold text-slate-900 dark:text-white">Email-Only Access</h1>
        <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
          Your access is controlled through your institution email. Use the login page and enter your approved email address.
        </p>
        <div className="mt-6 rounded-lg border-l-4 border-blue-600 bg-blue-50 p-4 dark:bg-blue-900/20">
          <p className="text-xs font-semibold text-blue-900 dark:text-blue-200">ℹ️ If you don't have access, contact your administrator.</p>
        </div>
      </div>
    </main>
  );
}
