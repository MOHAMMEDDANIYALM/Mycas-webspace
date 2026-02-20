'use client';

import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, you would send this to a backend endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message');
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
            <Link href="/faculty" className="text-blue-700 hover:text-blue-900">
              Faculty
            </Link>
            <Link href="/login" className="text-blue-700 hover:text-blue-900">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="mb-4 text-5xl font-bold text-blue-900">Contact Us</h1>
          <p className="text-xl text-gray-700">
            We would love to hear from you. Get in touch with us today.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="mb-8 text-2xl font-bold text-blue-900">Get In Touch</h2>

              <div className="mb-8 flex gap-4">
                <div className="text-3xl">📍</div>
                <div>
                  <h3 className="mb-1 font-bold text-blue-900">Address</h3>
                  <p className="text-gray-700">
                    MYCAS Institute<br />
                    123 Education Street<br />
                    Metro City, State 12345<br />
                    India
                  </p>
                </div>
              </div>

              <div className="mb-8 flex gap-4">
                <div className="text-3xl">📞</div>
                <div>
                  <h3 className="mb-1 font-bold text-blue-900">Phone</h3>
                  <p className="text-gray-700">
                    <a href="tel:+918000000000" className="hover:text-blue-600">
                      +91 8000-000-000
                    </a>
                    <br />
                    <a href="tel:+918111111111" className="hover:text-blue-600">
                      +91 8111-111-111
                    </a>
                  </p>
                </div>
              </div>

              <div className="mb-8 flex gap-4">
                <div className="text-3xl">📧</div>
                <div>
                  <h3 className="mb-1 font-bold text-blue-900">Email</h3>
                  <p className="text-gray-700">
                    <a href="mailto:info@mycas.edu" className="hover:text-blue-600">
                      info@mycas.edu
                    </a>
                    <br />
                    <a href="mailto:admissions@mycas.edu" className="hover:text-blue-600">
                      admissions@mycas.edu
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">⏰</div>
                <div>
                  <h3 className="mb-1 font-bold text-blue-900">Office Hours</h3>
                  <p className="text-gray-700">
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="mb-8 text-2xl font-bold text-blue-900">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Your message here..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-60 transition"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-blue-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-8 text-center text-2xl font-bold text-blue-900">Visit Us</h2>
          <div className="h-96 rounded-xl overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
            <p className="text-gray-600">Map location would be displayed here</p>
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
