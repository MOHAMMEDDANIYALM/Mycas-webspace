'use client';

import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuth } from 'providers/AuthProvider';

const allowedRoles = ['promo_admin', 'super_admin'];

const emptyForm = {
  fullName: '',
  email: '',
  role: 'student',
  classCode: '',
  department: '',
  notes: ''
};

const parseSpreadsheetText = (rawText) => {
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return [];
  }

  const delimiter = lines.some((line) => line.includes('\t')) ? '\t' : ',';

  const rows = lines.map((line) => line.split(delimiter).map((cell) => cell.trim()));
  const headerCells = rows[0].map((cell) => cell.toLowerCase());
  const hasHeader = headerCells.some((cell) => ['name', 'full name', 'email', 'role', 'class', 'classcode', 'course', 'department', 'notes'].includes(cell));
  const dataRows = hasHeader ? rows.slice(1) : rows;

  return dataRows
    .filter((cells) => cells.length > 0)
    .map((cells) => {
      if (hasHeader) {
        const findValue = (names) => {
          const idx = headerCells.findIndex((cell) => names.includes(cell.replace(/\s+/g, '')) || names.includes(cell));
          return idx >= 0 ? cells[idx] || '' : '';
        };

        return {
          fullName: findValue(['fullname', 'full name', 'name']),
          email: findValue(['email']),
          role: (findValue(['role']) || 'student').toLowerCase(),
          classCode: findValue(['classcode', 'class', 'class code', 'course']),
          department: findValue(['department', 'dept']),
          notes: findValue(['notes', 'note'])
        };
      }

      return {
        fullName: cells[0] || '',
        email: cells[1] || '',
        role: (cells[2] || 'student').toLowerCase(),
        classCode: cells[3] || '',
        department: cells[4] || '',
        notes: cells[5] || ''
      };
    });
};

export default function EmailDirectoryManager({ role }) {
  const { authRequest } = useAuth();
  const queryClient = useQueryClient();
  const [filterRole, setFilterRole] = useState('all');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [bulkText, setBulkText] = useState('');
  const [editingId, setEditingId] = useState(null);

  const canManage = allowedRoles.includes(role);

  const contactsQuery = useQuery({
    queryKey: ['email-directory', filterRole, search],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filterRole !== 'all') {
        params.set('role', filterRole);
      }
      if (search.trim()) {
        params.set('search', search.trim());
      }
      return authRequest(`/email-directory?${params.toString()}`, { method: 'GET' });
    },
    enabled: canManage
  });

  const refreshList = () => queryClient.invalidateQueries({ queryKey: ['email-directory'] });

  const createMutation = useMutation({
    mutationFn: (payload) => authRequest('/email-directory', { method: 'POST', body: payload }),
    onSuccess: () => {
      toast.success('Contact added');
      setForm(emptyForm);
      refreshList();
    },
    onError: (error) => toast.error(error.message || 'Failed to add contact')
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => authRequest(`/email-directory/${id}`, { method: 'PATCH', body: payload }),
    onSuccess: () => {
      toast.success('Contact updated');
      setEditingId(null);
      setForm(emptyForm);
      refreshList();
    },
    onError: (error) => toast.error(error.message || 'Failed to update contact')
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => authRequest(`/email-directory/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      toast.success('Contact deleted');
      refreshList();
    },
    onError: (error) => toast.error(error.message || 'Failed to delete contact')
  });

  const bulkMutation = useMutation({
    mutationFn: (rows) => authRequest('/email-directory/bulk-upsert', { method: 'POST', body: { rows } }),
    onSuccess: (response) => {
      toast.success(response.message || 'Spreadsheet import complete');
      setBulkText('');
      refreshList();
    },
    onError: (error) => toast.error(error.message || 'Import failed')
  });

  const contacts = contactsQuery.data?.data || [];

  const submitLabel = useMemo(() => {
    if (editingId) {
      return updateMutation.isPending ? 'Updating...' : 'Update Contact';
    }
    return createMutation.isPending ? 'Adding...' : 'Add Contact';
  }, [editingId, createMutation.isPending, updateMutation.isPending]);

  if (!canManage) {
    return null;
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      fullName: form.fullName,
      email: form.email,
      role: form.role,
      classCode: form.classCode,
      department: form.department,
      notes: form.notes
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, payload });
      return;
    }

    createMutation.mutate(payload);
  };

  const onBulkImport = () => {
    const rows = parseSpreadsheetText(bulkText).filter((row) => row.email);
    if (rows.length === 0) {
      toast.error('No valid rows found in spreadsheet text');
      return;
    }
    bulkMutation.mutate(rows);
  };

  return (
    <section className="mt-6 rounded-2xl bg-white/90 p-4 shadow-xl ring-1 ring-slate-200 md:p-6 dark:bg-slate-900/70 dark:ring-slate-700">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Email Directory</h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Add and maintain student and teacher emails. Paste spreadsheet rows to import in bulk.</p>

      <form onSubmit={onSubmit} className="mt-4 grid gap-3 md:grid-cols-2">
        <input
          type="text"
          placeholder="Full name"
          value={form.fullName}
          onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
          required
        />
        <select
          value={form.role}
          onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <input
          type="text"
          placeholder="Course/Class code (required for students)"
          value={form.classCode}
          onChange={(event) => setForm((prev) => ({ ...prev, classCode: event.target.value.toUpperCase() }))}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
        />
        <input
          type="text"
          placeholder="Department"
          value={form.department}
          onChange={(event) => setForm((prev) => ({ ...prev, department: event.target.value }))}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
        />
        <input
          type="text"
          placeholder="Notes"
          value={form.notes}
          onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
        />
        <div className="md:col-span-2 flex gap-2">
          <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            {submitLabel}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:text-slate-200"
            >
              Cancel Edit
            </button>
          ) : null}
        </div>
      </form>

      <div className="mt-6 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Spreadsheet Import</p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Paste CSV/TSV rows. Supported columns: fullName, email, role, classCode or course, department, notes</p>
        <textarea
          value={bulkText}
          onChange={(event) => setBulkText(event.target.value)}
          rows={6}
          placeholder="fullName,email,role,course,department,notes"
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
        />
        <button
          type="button"
          onClick={onBulkImport}
          disabled={bulkMutation.isPending}
          className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {bulkMutation.isPending ? 'Importing...' : 'Import Spreadsheet Data'}
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <select
          value={filterRole}
          onChange={(event) => setFilterRole(event.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
        >
          <option value="all">All roles</option>
          <option value="student">Students</option>
          <option value="teacher">Teachers</option>
        </select>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name/email/class"
          className="min-w-[220px] rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
        />
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left dark:border-slate-700">
              <th className="py-2 pr-3">Name</th>
              <th className="py-2 pr-3">Email</th>
              <th className="py-2 pr-3">Role</th>
              <th className="py-2 pr-3">Course/Class</th>
              <th className="py-2 pr-3">Department</th>
              <th className="py-2 pr-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 pr-3">{contact.fullName}</td>
                <td className="py-2 pr-3">{contact.email}</td>
                <td className="py-2 pr-3 capitalize">{contact.role}</td>
                <td className="py-2 pr-3">{contact.classCode || '-'}</td>
                <td className="py-2 pr-3">{contact.department || '-'}</td>
                <td className="py-2 pr-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(contact._id);
                        setForm({
                          fullName: contact.fullName,
                          email: contact.email,
                          role: contact.role,
                          classCode: contact.classCode || '',
                          department: contact.department || '',
                          notes: contact.notes || ''
                        });
                      }}
                      className="rounded border border-slate-300 px-2 py-1 text-xs font-semibold dark:border-slate-600"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteMutation.mutate(contact._id)}
                      className="rounded bg-rose-600 px-2 py-1 text-xs font-semibold text-white"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-slate-500">
                  {contactsQuery.isLoading ? 'Loading contacts...' : 'No contacts found yet.'}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
