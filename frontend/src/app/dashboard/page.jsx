'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import AuthGuard from 'components/AuthGuard';
import { useAuth } from 'providers/AuthProvider';

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    router.replace('/');
  };

  const renderRoleSpecificContent = () => {
    if (!user) return null;

    switch (user.role) {
      case 'student':
        return <StudentDashboard user={user} />;
      case 'teacher':
        return <TeacherDashboard user={user} />;
      case 'promo_admin':
        return <AdminDashboard user={user} />;
      case 'super_admin':
        return <SuperAdminDashboard user={user} />;
      default:
        return <DefaultDashboard user={user} />;
    }
  };

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-100">
        {/* Top Navigation */}
        <nav className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-blue-900">MYCAS Portal</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">{user?.fullName}</p>
                <p className="text-sm text-gray-600 capitalize">{user?.role?.replace('_', ' ')}</p>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="mx-auto max-w-7xl px-6 py-8">
          {renderRoleSpecificContent()}
        </div>
      </main>
    </AuthGuard>
  );
}

function StudentDashboard({ user }) {
  return (
    <div>
      <h2 className="mb-8 text-3xl font-bold text-gray-900">Welcome, {user.fullName}!</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">📚</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">My Classes</h3>
          <p className="mb-4 text-sm text-gray-700">View and manage your classes</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            View Classes →
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">📋</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">Timetable</h3>
          <p className="mb-4 text-sm text-gray-700">Check your class schedule</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            View Timetable →
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">📊</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">Attendance</h3>
          <p className="mb-4 text-sm text-gray-700">Track your attendance record</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            View Attendance →
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">💰</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">Fee Payment</h3>
          <p className="mb-4 text-sm text-gray-700">View and pay your fees</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            View Fees →
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">📧</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">Announcements</h3>
          <p className="mb-4 text-sm text-gray-700">Latest updates and announcements</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            View Announcements →
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">⚙️</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">Profile Settings</h3>
          <p className="mb-4 text-sm text-gray-700">Update your profile information</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            Edit Profile →
          </button>
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-blue-50 p-6">
        <h3 className="mb-2 font-bold text-blue-900">Class Code: {user.classCode || 'Not assigned'}</h3>
        <p className="text-sm text-gray-700">Use this code to track your classes and view the timetable.</p>
      </div>
    </div>
  );
}

function TeacherDashboard({ user }) {
  return (
    <div>
      <h2 className="mb-8 text-3xl font-bold text-gray-900">Welcome, Prof. {user.fullName}!</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">📚</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">My Classes</h3>
          <p className="mb-4 text-sm text-gray-700">Manage your classes and students</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            View Classes →
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">📋</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">Timetable Editor</h3>
          <p className="mb-4 text-sm text-gray-700">Create and manage class schedule</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            Edit Timetable →
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">👥</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">Add Student Emails</h3>
          <p className="mb-4 text-sm text-gray-700">Approve student emails for registration</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            Manage Emails →
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">📧</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">Send Bulk Email</h3>
          <p className="mb-4 text-sm text-gray-700">Send announcements to students</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            Send Email →
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">📊</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">Attendance</h3>
          <p className="mb-4 text-sm text-gray-700">Mark and track student attendance</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            Mark Attendance →
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">⚙️</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">Profile Settings</h3>
          <p className="mb-4 text-sm text-gray-700">Update your profile information</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            Edit Profile →
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ user }) {
  return (
    <div>
      <h2 className="mb-8 text-3xl font-bold text-gray-900">Admin Dashboard</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">👥</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">User Management</h3>
          <p className="mb-4 text-sm text-gray-700">Manage users and roles</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            Manage Users →
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">🏫</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">Classes</h3>
          <p className="mb-4 text-sm text-gray-700">Manage classes and departments</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            View Classes →
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">📊</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">Reports</h3>
          <p className="mb-4 text-sm text-gray-700">View system reports and analytics</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            View Reports →
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">⚙️</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">Settings</h3>
          <p className="mb-4 text-sm text-gray-700">System configuration and settings</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            System Settings →
          </button>
        </div>
      </div>
    </div>
  );
}

function SuperAdminDashboard({ user }) {
  return (
    <div>
      <h2 className="mb-8 text-3xl font-bold text-gray-900">Super Admin Dashboard</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">👥</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">User Management</h3>
          <p className="mb-4 text-sm text-gray-700">Full control over all users</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            Manage Users →
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">🔒</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">Permissions</h3>
          <p className="mb-4 text-sm text-gray-700">Manage roles and permissions</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            Manage Permissions →
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">📊</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">System Analytics</h3>
          <p className="mb-4 text-sm text-gray-700">Complete system overview</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            View Analytics →
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">🔄</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">System Maintenance</h3>
          <p className="mb-4 text-sm text-gray-700">System health and maintenance</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            Maintenance →
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">📜</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">Audit Logs</h3>
          <p className="mb-4 text-sm text-gray-700">View system audit trail</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            View Logs →
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 text-4xl">⚙️</div>
          <h3 className="mb-2 text-lg font-bold text-blue-900">Configuration</h3>
          <p className="mb-4 text-sm text-gray-700">Advanced system configuration</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={() => alert('Feature coming soon')}>
            Configure System →
          </button>
        </div>
      </div>
    </div>
  );
}

function DefaultDashboard({ user }) {
  return (
    <div>
      <h2 className="mb-8 text-3xl font-bold text-gray-900">Welcome, {user.fullName}!</h2>
      <div className="rounded-lg bg-white p-6 shadow">
        <p className="text-gray-700 mb-4">Your role: <span className="font-semibold capitalize">{user.role?.replace('_', ' ')}</span></p>
        <p className="text-gray-600">Contact the administrator for access to dashboard features.</p>
      </div>
    </div>
  );
}
