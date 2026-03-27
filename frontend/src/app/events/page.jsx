'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';
import SectionReveal from 'components/ui/SectionReveal';
import GlassCard from 'components/ui/GlassCard';

const upcomingEvents = [
  { icon: '🎓', title: 'Annual Convocation', date: 'April 15, 2026', location: 'Main Campus', image: '/event1.jpg' },
  { icon: '🏆', title: 'Sports Championship', date: 'April 22, 2026', location: 'Sports Complex', image: '/event2.jpg' },
  { icon: '🎬', title: 'Cultural Fest', date: 'May 5, 2026', location: 'Auditorium', image: '/event3.jpg' },
  { icon: '💻', title: 'Tech Summit', date: 'May 20, 2026', location: 'Innovation Center', image: '/event4.jpg' }
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero Section */}
      <SectionReveal className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4 py-12 md:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900">
            🎬 Upcoming Events & Videos
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Stay updated with all campus events and video highlights
          </p>
        </div>
      </SectionReveal>

      {/* Upcoming Events Section */}
      <SectionReveal className="px-4 py-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            Upcoming Events
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {upcomingEvents.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <GlassCard className="overflow-hidden border-2 border-blue-200 hover:shadow-lg transition">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 sm:p-8 min-h-[200px] flex items-center justify-center">
                    <div className="text-6xl md:text-8xl">{event.icon}</div>
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900">{event.title}</h3>
                    <div className="mt-3 space-y-2 text-sm">
                      <p className="flex items-center gap-2 text-slate-600">
                        <span>📅</span> {event.date}
                      </p>
                      <p className="flex items-center gap-2 text-slate-600">
                        <span>📍</span> {event.location}
                      </p>
                    </div>
                    <button className="mt-4 w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:from-blue-700 hover:to-blue-600">
                      Learn More
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* Event Videos Section */}
      <SectionReveal className="bg-gradient-to-br from-blue-50 to-white px-4 py-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            Event Highlights & Videos
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Annual Day 2025', duration: '15:30' },
              { title: 'Orientation Program', duration: '22:45' },
              { title: 'Graduation Ceremony', duration: '18:20' },
              { title: 'Sports Meet Highlights', duration: '12:10' },
              { title: 'Talent Shows', duration: '25:35' },
              { title: 'Campus Tour', duration: '8:50' }
            ].map((video, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer"
              >
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 h-40 flex items-center justify-center relative group">
                  <div className="text-5xl">🎥</div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition flex items-center justify-center">
                    <div className="text-4xl opacity-0 group-hover:opacity-100 transition">▶️</div>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <h3 className="font-bold text-slate-900">{video.title}</h3>
                  <p className="text-xs text-slate-600 mt-1">Duration: {video.duration}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* Add Event Form */}
      <SectionReveal className="px-4 py-12 md:py-24">
        <div className="mx-auto max-w-2xl">
          <GlassCard className="border-2 border-blue-200">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Upload Event Video</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Event Title</label>
                <input type="text" placeholder="Enter event title" className="w-full rounded-lg border-2 border-blue-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Video URL</label>
                <input type="url" placeholder="https://youtube.com/..." className="w-full rounded-lg border-2 border-blue-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea placeholder="Describe the event..." rows="4" className="w-full rounded-lg border-2 border-blue-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none"></textarea>
              </div>
              <button type="submit" className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:from-blue-700 hover:to-blue-600">
                Upload Video
              </button>
            </form>
          </GlassCard>
        </div>
      </SectionReveal>

      <PublicFooter />
    </main>
  );
}
