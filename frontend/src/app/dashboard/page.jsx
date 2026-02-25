'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import AuthGuard from 'components/AuthGuard';
import ImmersiveDashboard from 'components/dashboard/ImmersiveDashboard';
import { useAuth } from 'providers/AuthProvider';

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    router.replace('/');
  };

  return (
    <AuthGuard>
      <ImmersiveDashboard user={user} onLogout={handleLogout} />
    </AuthGuard>
  );
}
