'use client';

const sidebarByRole = {
  student: ['Dashboard', 'My Timetable', 'Announcements'],
  teacher: ['Dashboard', 'Timetable Editor', 'Send Email'],
  promo_admin: ['Dashboard', 'Promotions', 'Classes'],
  super_admin: ['Dashboard', 'Users', 'System Settings']
};

export default function Sidebar({ role, onLogout }) {
  const items = sidebarByRole[role] || ['Dashboard'];

  return (
    <aside className="w-full rounded-xl bg-slate-900 p-4 text-white md:w-64">
      <p className="text-xs uppercase tracking-wide text-slate-300">Role</p>
      <p className="mt-1 text-sm font-semibold capitalize">{role?.replace('_', ' ') || 'unknown'}</p>

      <nav className="mt-4 space-y-2">
        {items.map((item) => (
          <div key={item} className="rounded-md bg-slate-800 px-3 py-2 text-sm">
            {item}
          </div>
        ))}
      </nav>

      <button
        type="button"
        onClick={onLogout}
        className="mt-6 w-full rounded-md bg-red-500 px-3 py-2 text-sm font-medium hover:bg-red-400"
      >
        Logout
      </button>
    </aside>
  );
}
