'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuth } from 'providers/AuthProvider';

const allowedRoles = ['teacher', 'promo_admin', 'super_admin'];

export default function BulkEmailForm({ role }) {
  const { authRequest } = useAuth();
  const [formData, setFormData] = useState({
    classCode: 'BCA-SEM1',
    subject: '',
    message: ''
  });

  const canSendEmail = allowedRoles.includes(role);

  const sendEmailMutation = useMutation({
    mutationFn: async (payload) => {
      return authRequest('/email/send-bulk', {
        method: 'POST',
        body: payload
      });
    },
    onSuccess: (response) => {
      toast.success(response.message || 'Email sent');
      setFormData((prev) => ({ ...prev, subject: '', message: '' }));
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to send email');
    }
  });

  if (!canSendEmail) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    sendEmailMutation.mutate({
      classCode: formData.classCode.trim().toUpperCase(),
      subject: formData.subject,
      message: formData.message
    });
  };

  return (
    <section className="mt-8 rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50/30 p-6 shadow-lg dark:border-blue-800/50 dark:from-slate-800 dark:to-blue-900/30 md:p-8">
      <div className="mb-6 border-l-4 border-blue-600 pl-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">📧 Bulk Email Sender</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Send one message to all students in a class code.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={formData.classCode}
          onChange={(event) => setFormData((prev) => ({ ...prev, classCode: event.target.value.toUpperCase() }))}
          placeholder="Class code (e.g. BCA-SEM1)"
          required
          className="w-full rounded-lg border-2 border-blue-200 bg-white px-4 py-3 text-sm placeholder-slate-400 transition focus:border-blue-500 focus:outline-none dark:border-blue-700/50 dark:bg-slate-800"
        />
        <input
          type="text"
          value={formData.subject}
          onChange={(event) => setFormData((prev) => ({ ...prev, subject: event.target.value }))}
          placeholder="📌 Email subject"
          required
          className="w-full rounded-lg border-2 border-blue-200 bg-white px-4 py-3 text-sm placeholder-slate-400 transition focus:border-blue-500 focus:outline-none dark:border-blue-700/50 dark:bg-slate-800"
        />
        <textarea
          value={formData.message}
          onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
          placeholder="✍️ Write your message..."
          rows={6}
          required
          className="w-full rounded-lg border-2 border-blue-200 bg-white px-4 py-3 text-sm placeholder-slate-400 font-sans transition focus:border-blue-500 focus:outline-none dark:border-blue-700/50 dark:bg-slate-800"
        />

        <button
          type="submit"
          disabled={sendEmailMutation.isPending}
          className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/30 transition hover:from-blue-700 hover:to-blue-600 disabled:opacity-60"
        >
          {sendEmailMutation.isPending ? '⏳ Sending...' : '🚀 Send Email'}
        </button>
      </form>
    </section>
  );
}
