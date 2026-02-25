'use client';

import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import FacultyShowcase from 'components/public/FacultyShowcase';

export default function FacultyPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_15%_0%,#dbeafe_0,#ffffff_40%)] dark:bg-slate-950">
      <PublicNavbar />
      <FacultyShowcase />
      <PublicFooter />
    </main>
  );
}
