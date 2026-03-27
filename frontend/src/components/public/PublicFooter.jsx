'use client';

export default function PublicFooter({ className = '' }) {
  return (
    <footer className={`border-t border-white/10 bg-slate-950/90 py-8 text-center text-sm ${className}`}>
      <p className="bg-gradient-to-r from-slate-200 to-blue-300 bg-clip-text font-semibold text-transparent">© 2026 MYCAS Institute. All rights reserved.</p>
    </footer>
  );
}
