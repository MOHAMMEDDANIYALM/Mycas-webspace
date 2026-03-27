'use client';

const sidebarByRole = {
  student: [
    { label: 'Dashboard', icon: '📊' },
    { label: 'My Timetable', icon: '📅' },
    { label: 'Announcements', icon: '📢' }
  ],
  teacher: [
    { label: 'Dashboard', icon: '🎓' },
    { label: 'Timetable Editor', icon: '✏️' },
    { label: 'Send Email', icon: '📧' }
  ],
  promo_admin: [
    { label: 'Dashboard', icon: '🎯' },
    { label: 'Promotions', icon: '📣' },
    { label: 'Classes', icon: '👥' }
  ],
  super_admin: [
    { label: 'Dashboard', icon: '⚙️' },
    { label: 'Users', icon: '👤' },
    { label: 'System Settings', icon: '🔧' }
  ]
};

export default function Sidebar({ role, onLogout }) {
  const items = sidebarByRole[role] || [{ label: 'Dashboard', icon: '📊' }];

  return (
    <aside className="w-full rounded-2xl bg-gradient-to-b from-blue-600 to-blue-700 p-6 text-white shadow-xl md:w-64 dark:from-blue-800 dark:to-blue-900">
      <div className="mb-6 space-y-2">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-100">👤 Your Role</p>
        <p className="text-2xl font-bold capitalize text-white">{role?.replace('_', ' ') || 'Unknown'}</p>
        <div className="mt-3 h-1 w-12 bg-white/30 rounded-full" />
      </div>

      <nav className="space-y-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="group rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/20"
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>

      <button
        type="button"
        onClick={onLogout}
        className="mt-8 w-full rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-red-500/30 transition hover:from-red-600 hover:to-red-700"
      >
        🚪 Logout
      </button>
    </aside>
  );
}
