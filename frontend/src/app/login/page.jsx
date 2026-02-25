'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useAuth } from 'providers/AuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success('Login successful');
      router.replace('/dashboard');
    },
    onError: (error) => {
      toast.error(error.message || 'Login failed');
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#e0ecff_0%,#dbeafe_40%,#bfdbfe_100%)] px-4 py-10 dark:bg-[linear-gradient(135deg,#0f172a_0%,#1e3a8a_45%,#1d4ed8_100%)]">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <Image src="/lab 2.jpeg" alt="Campus" fill unoptimized className="object-cover" />
      </div>
      <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/70 blur-3xl dark:bg-blue-200/20" />

      <div className="relative w-full max-w-md rounded-[2rem] border border-white/60 bg-white/55 p-7 shadow-[0_25px_60px_rgba(37,99,235,0.25)] backdrop-blur-2xl dark:border-blue-100/20 dark:bg-slate-900/55">
        <h1 className="text-center text-4xl font-semibold tracking-tight text-slate-800 dark:text-white">Welcome Back</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Email</label>
            <input
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
              className="w-full rounded-xl border border-blue-100 bg-white/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Password</label>
            <input
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={(event) => setFormData((prev) => ({ ...prev, password: event.target.value }))}
              className="w-full rounded-xl border border-blue-100 bg-white/70 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200"
            />
          </div>

          <div className="flex items-center justify-between pt-1 text-sm">
            <label className="flex cursor-pointer items-center gap-2 text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="h-4 w-4 rounded border-blue-300 text-blue-600"
              />
              Remember me
            </label>
            <button type="button" className="font-medium text-blue-700 hover:text-blue-800 dark:text-blue-300">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="mt-2 w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-700 hover:to-blue-600 disabled:opacity-60"
          >
            {loginMutation.isPending ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-300">
          New here?{' '}
          <Link href="/register" className="font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-300">
            Sign up now
          </Link>
        </p>
      </div>
    </main>
  );
}
