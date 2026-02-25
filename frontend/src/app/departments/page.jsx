'use client';

import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import DepartmentsExperience from 'components/public/DepartmentsExperience';

export default function DepartmentsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_15%_0%,#dbeafe_0,#ffffff_40%)] dark:bg-slate-950">
      <PublicNavbar />
      <DepartmentsExperience />
      <PublicFooter />
    </main>
  );
}
