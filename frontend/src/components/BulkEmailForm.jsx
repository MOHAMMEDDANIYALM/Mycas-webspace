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
    <section className="mt-6 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:p-6">
      <h2 className="text-lg font-semibold text-slate-900">Send Bulk Email</h2>
      <p className="mt-1 text-sm text-slate-600">Send one message to all students in a class code.</p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input
          type="text"
          value={formData.classCode}
          onChange={(event) => setFormData((prev) => ({ ...prev, classCode: event.target.value.toUpperCase() }))}
          placeholder="Class code (e.g. BCA-SEM1)"
          required
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        />
        <input
          type="text"
          value={formData.subject}
          onChange={(event) => setFormData((prev) => ({ ...prev, subject: event.target.value }))}
          placeholder="Email subject"
          required
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        />
        <textarea
          value={formData.message}
          onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
          placeholder="Write your message"
          rows={5}
          required
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        />

        <button
          type="submit"
          disabled={sendEmailMutation.isPending}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {sendEmailMutation.isPending ? 'Sending...' : 'Send Email'}
        </button>
      </form>
    </section>
  );
}
