'use client';

export default function GlassCard({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-white/30 bg-white/60 p-6 shadow-[0_12px_40px_rgba(30,64,175,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/50 ${className}`}
    >
      {children}
    </div>
  );
}
