'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import GlassCard from 'components/ui/GlassCard';
import SectionReveal from 'components/ui/SectionReveal';

const steps = ['Personal', 'Academic', 'Review'];

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  qualifications: '',
  preferredDepartment: 'UG',
  preferredProgram: 'BCA',
  message: ''
};

export default function AdmissionsWizard() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const previousStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const submitForm = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      toast.success('Admission form submitted successfully. Our team will contact you soon.');
      setFormData(initialState);
      setStep(0);
    } catch (error) {
      toast.error('Unable to submit right now. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionReveal className="mx-auto max-w-4xl px-4 py-16 md:px-6">
      <GlassCard className="border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50/40 dark:border-blue-800/50 dark:from-slate-800 dark:to-blue-900/30">
        <div className="mb-8 border-l-4 border-blue-600 pl-4">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">📝 Admissions Portal</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Complete your application in a simple multi-step flow.</p>
        </div>

        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-300">
            <span>Step {step + 1} of {steps.length}</span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs dark:bg-blue-900/40">{steps[step]}</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 ring-1 ring-blue-200 dark:from-blue-900/30 dark:to-indigo-900/30 dark:ring-blue-800/50">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.35 }} className="h-full bg-gradient-to-r from-blue-600 to-blue-500" />
          </div>
        </div>

        <form onSubmit={submitForm} className="space-y-5">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step-1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid gap-4 md:grid-cols-2">
                <Field label="Full Name" name="fullName" value={formData.fullName} onChange={updateField} required />
                <Field label="Email" name="email" type="email" value={formData.email} onChange={updateField} required />
                <Field label="Phone" name="phone" value={formData.phone} onChange={updateField} required />
                <Field label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={updateField} />
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <Field label="Qualifications" name="qualifications" value={formData.qualifications} onChange={updateField} required />
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Preferred Department</label>
                    <select name="preferredDepartment" value={formData.preferredDepartment} onChange={updateField} className="w-full rounded-lg border-2 border-blue-300 bg-white px-4 py-3 text-sm transition focus:border-blue-500 focus:outline-none dark:border-blue-700/50 dark:bg-slate-800">
                      <option>UG</option>
                      <option>PU</option>
                    </select>
                  </div>
                  <Field label="Preferred Program" name="preferredProgram" value={formData.preferredProgram} onChange={updateField} />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step-3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                <ReviewItem label="Full Name" value={formData.fullName} />
                <ReviewItem label="Email" value={formData.email} />
                <ReviewItem label="Phone" value={formData.phone} />
                <ReviewItem label="Qualifications" value={formData.qualifications} />
                <ReviewItem label="Preferred Department" value={formData.preferredDepartment} />
                <ReviewItem label="Preferred Program" value={formData.preferredProgram} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3 pt-6">
            {step > 0 && (
              <button type="button" onClick={previousStep} className="rounded-lg border-2 border-blue-300 px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50 dark:border-blue-700/50 dark:text-blue-300 dark:hover:bg-blue-900/30">
                ← Previous
              </button>
            )}
            {step < steps.length - 1 ? (
              <button type="button" onClick={nextStep} className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-bold text-white transition hover:from-blue-700 hover:to-blue-600">
                Next →
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className="flex-1 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-green-500/30 transition hover:from-green-700 hover:to-emerald-600 disabled:opacity-60">
                {isSubmitting ? '⏳ Submitting...' : '✅ Submit Application'}
              </button>
            )}
          </div>
        </form>
      </GlassCard>
    </SectionReveal>
  );
}

function Field({ label, type = 'text', name, value, onChange, required = false }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-lg border-2 border-blue-300 bg-white px-4 py-3 text-sm placeholder-slate-400 transition focus:border-blue-500 focus:outline-none dark:border-blue-700/50 dark:bg-slate-800"
      />
    </div>
  );
}

function ReviewItem({ label, value }) {
  return (
    <div className="rounded-lg border-l-4 border-blue-600 bg-blue-50/40 p-4 dark:bg-blue-900/20">
      <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}
