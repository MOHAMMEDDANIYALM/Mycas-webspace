'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PublicLanding from 'components/PublicLanding';
import { useAuth } from 'providers/AuthProvider';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <p className="p-8 text-sm text-slate-600">Checking session...</p>;
  }

  if (isAuthenticated) {
    return null;
  }

  return <PublicLanding />;
}
