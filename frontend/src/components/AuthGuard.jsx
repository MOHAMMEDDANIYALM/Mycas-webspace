'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from 'providers/AuthProvider';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <p className="p-8 text-sm text-slate-600">Loading session...</p>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
