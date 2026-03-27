'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from 'providers/AuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [email, setEmail] = useState('');

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
    loginMutation.mutate({ email });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 md:px-6">
        {/* Left Side - Info */}
        <div className="hidden flex-1 lg:block">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold text-slate-900">
                Welcome Back
              </h1>
              <p className="mt-4 text-xl text-slate-600">
                Access your personalized learning dashboard
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: '🎯', title: 'Smart Learning', desc: 'Personalized course recommendations' },
                { icon: '📊', title: 'Track Progress', desc: 'Monitor your academic journey' },
                { icon: '🤝', title: 'Collaborate', desc: 'Connect with peers and instructors' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full flex-1 lg:pl-12">
          <div className="mx-auto max-w-md space-y-8">
            <div className="rounded-2xl bg-white p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-slate-900">Sign In</h2>
              <p className="mt-2 text-sm text-slate-600">
                Enter your institutional email to access the platform
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@institution.edu"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-blue-200 bg-blue-50/50 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:shadow-xl hover:shadow-blue-600/40 disabled:opacity-60"
                >
                  {loginMutation.isPending ? 'Checking email...' : 'Continue'}
                </button>
              </form>

              <div className="mt-6 border-t pt-6">
                <p className="text-center text-xs text-slate-600">
                  Secure • Email-verified access only
                </p>
              </div>
            </div>

            {/* Info Box */}
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-sm text-slate-700">
                <span className="font-semibold">💡 Tip:</span> Use your institutional email registered in our student/teacher directory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
