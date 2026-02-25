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
      <GlassCard>
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-blue-900 dark:text-white md:text-4xl">Admissions</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Complete your application in a simple multi-step flow.</p>
        </div>

        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            <span>Step {step + 1} of {steps.length}</span>
            <span>{steps[step]}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-blue-100 dark:bg-slate-800">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.35 }} className="h-full bg-gradient-to-r from-blue-600 to-indigo-600" />
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
              <motion.div key="step-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid gap-4 md:grid-cols-2">
                <SelectField label="Current Qualification" name="qualifications" value={formData.qualifications} onChange={updateField} options={['12th', 'Diploma', 'Bachelor Degree']} />
                <SelectField label="Preferred Department" name="preferredDepartment" value={formData.preferredDepartment} onChange={updateField} options={['PU', 'UG']} />
                <SelectField label="Preferred Program" name="preferredProgram" value={formData.preferredProgram} onChange={updateField} options={['BCA', 'BBA', 'B.Com', 'Financial Management', 'PU Commerce', 'PU Science - PCMC', 'PU Science - PCMB']} />
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Additional Notes</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={updateField}
                    rows={4}
                    className="w-full rounded-xl border border-blue-200 bg-white/80 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step-3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3 text-sm">
                {Object.entries(formData).map(([key, value]) => (
                  <div key={key} className="rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{key}</p>
                    <p className="mt-1 text-slate-800 dark:text-slate-100">{value || '—'}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={previousStep}
              disabled={step === 0}
              className="rounded-full border border-blue-200 px-5 py-2 text-sm font-semibold text-blue-700 transition disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"
            >
              Previous
            </button>

            {step < steps.length - 1 ? (
              <button type="button" onClick={nextStep} className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                Continue
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </form>
      </GlassCard>
    </SectionReveal>
  );
}

function Field({ label, name, value, onChange, type = 'text', required = false }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">{label}</label>
      <input
        name={name}
        value={value}
        type={type}
        required={required}
        onChange={onChange}
        className="w-full rounded-xl border border-blue-200 bg-white/80 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-blue-200 bg-white/80 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
