'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import AuthGuard from 'components/AuthGuard';
import Sidebar from 'components/Sidebar';
import BulkEmailForm from 'components/BulkEmailForm';
import TimetableCalendar from 'components/TimetableCalendar';
import { useAuth } from 'providers/AuthProvider';

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    router.replace('/');
  };

  return (
    <AuthGuard>
      <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-6 md:flex-row">
          <Sidebar role={user?.role} onLogout={handleLogout} />

          <section className="flex-1 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h1 className="text-2xl font-bold text-slate-900">Welcome, {user?.fullName}</h1>
            <p className="mt-2 text-sm text-slate-600">
              This is your {user?.role?.replace('_', ' ')} dashboard. Role-based modules will be added in the next phases.
            </p>

            <div className="mt-6 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
              <p>
                Email: <span className="font-medium">{user?.email}</span>
              </p>
              <p className="mt-1">
                Active role: <span className="font-medium capitalize">{user?.role?.replace('_', ' ')}</span>
              </p>
            </div>

            <TimetableCalendar role={user?.role} />
            <BulkEmailForm role={user?.role} />
          </section>
        </div>
      </main>
    </AuthGuard>
  );
}
