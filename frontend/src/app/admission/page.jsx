'use client';

import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AdmissionPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    qualifications: '',
    preferredDepartment: 'Commerce',
    preferredProgram: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, this would send to backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Application submitted successfully! We will contact you soon.');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        qualifications: '',
        preferredDepartment: 'Commerce',
        preferredProgram: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-blue-200 bg-white sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-blue-900">
            MYCAS Portal
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-blue-700 hover:text-blue-900">
              About
            </Link>
            <Link href="/departments" className="text-blue-700 hover:text-blue-900">
              Departments
            </Link>
            <Link href="/contact" className="text-blue-700 hover:text-blue-900">
              Contact
            </Link>
            <Link href="/login" className="text-blue-700 hover:text-blue-900">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="mb-4 text-4xl font-bold text-blue-900">Apply to MYCAS Institute</h1>
          <p className="text-lg text-gray-700">
            Begin your journey towards excellence. Fill out the form below to apply.
          </p>
        </div>
      </section>

      {/* Admission Form */}
      <section className="py-16">
        <div className="mx-auto max-w-2xl px-6">
          <div className="rounded-xl bg-blue-50 p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-600">
                  Make sure this email is approved by MYCAS Institute for registration
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 9876543210"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Qualifications */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Current Qualifications</label>
                <select
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select qualification</option>
                  <option value="12th">10+2 (12th Pass)</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Preferred Department */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Preferred Department *</label>
                <select
                  name="preferredDepartment"
                  value={formData.preferredDepartment}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                >
                  <option value="Commerce">Commerce</option>
                  <option value="Administration">Administration & Management</option>
                  <option value="Science">Science</option>
                </select>
              </div>

              {/* Preferred Program */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Preferred Program</label>
                <input
                  type="text"
                  name="preferredProgram"
                  value={formData.preferredProgram}
                  onChange={handleChange}
                  placeholder="e.g., B.Com, BBA, B.Sc"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Additional Information</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us more about yourself or any special circumstances..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Terms */}
              <div className="rounded-lg bg-white p-4">
                <p className="text-sm text-gray-700">
                  ✓ You agree to receive updates and communications from MYCAS Institute<br />
                  ✓ Our admissions team will contact you shortly after submission<br />
                  ✓ Ensure your email is approved before registration
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-60 transition"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>

            <div className="mt-8 border-t border-blue-200 pt-8 text-center">
              <p className="mb-4 text-gray-700">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                  Login here
                </Link>
              </p>
              <p className="text-sm text-gray-600">
                Need help?{' '}
                <Link href="/contact" className="text-blue-600 hover:text-blue-700">
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-gray-600">
          <p>© 2026 MYCAS Institute. All rights reserved. Towards a Brighter Future.</p>
        </div>
      </footer>
    </main>
  );
}
