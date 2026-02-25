'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const videos = [
  { id: 1, title: 'MICA Convocation Highlights', category: 'Convocation', src: '/videos/convocation.mp4' },
  { id: 2, title: 'Innovation Workshop Week', category: 'Workshops', src: '/videos/workshop.mp4' },
  { id: 3, title: 'Cultural Evening 2026', category: 'Cultural', src: '/videos/cultural.mp4' },
  { id: 4, title: 'Annual Sports Meet', category: 'Sports', src: '/videos/sports.mp4' }
];

const categories = ['All', 'Convocation', 'Workshops', 'Cultural', 'Sports'];

export default function EventsVideosSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState(null);

  const filteredVideos = useMemo(() => {
    if (selectedCategory === 'All') return videos;
    return videos.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-3xl font-semibold text-blue-900 dark:text-white">Latest Events in MICA</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">Swipe horizontally to preview campus events.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-slate-800 dark:text-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
        {filteredVideos.map((video) => (
          <motion.button
            key={video.id}
            whileHover={{ scale: 1.03 }}
            onClick={() => setActiveVideo(video)}
            className="min-w-[280px] overflow-hidden rounded-2xl border border-blue-100 bg-white text-left shadow-md dark:border-slate-700 dark:bg-slate-900"
          >
            <video src={video.src} muted loop autoPlay playsInline className="h-44 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">{video.category}</p>
              <h3 className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{video.title}</h3>
            </div>
          </motion.button>
        ))}
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-black">
            <div className="flex items-center justify-between bg-slate-900 px-4 py-3">
              <h4 className="text-sm font-semibold text-white">{activeVideo.title}</h4>
              <button onClick={() => setActiveVideo(null)} className="text-xs font-semibold text-slate-200 hover:text-white">
                CLOSE
              </button>
            </div>
            <video src={activeVideo.src} controls autoPlay className="max-h-[70vh] w-full" />
          </div>
        </div>
      )}
    </section>
  );
}
