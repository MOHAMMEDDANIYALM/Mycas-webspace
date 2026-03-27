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
    <section className="space-y-6 rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50/30 p-8 backdrop-blur-xl dark:border-blue-800/50 dark:from-slate-800 dark:to-blue-900/30">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="border-l-4 border-blue-600 pl-4">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white\">🎬 Latest Events in MICA</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300\">Swipe horizontally to preview campus events.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'border-2 border-blue-300 bg-white text-blue-700 hover:bg-blue-50 dark:border-blue-700/50 dark:bg-slate-800 dark:text-blue-300'
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
            whileHover={{ scale: 1.05, translateY: -4 }}
            onClick={() => setActiveVideo(video)}
            className="min-w-[280px] overflow-hidden rounded-xl border-2 border-blue-200 bg-white shadow-lg transition dark:border-blue-800/50 dark:bg-slate-800\"
          >
            <video src={video.src} muted loop autoPlay playsInline className="h-44 w-full object-cover\" />
            <div className="bg-gradient-to-br from-blue-50 to-white p-4 dark:from-blue-900/20 dark:to-slate-800\\">
              <p className=\"text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-300\">{video.category}</p>
              <h3 className=\"mt-2 text-sm font-bold text-slate-900 dark:text-white\">{video.title}</h3>
            </div>
          </motion.button>
        ))}
      </div>

      {activeVideo && (
        <div className=\"fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur\">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className=\"w-full max-w-4xl overflow-hidden rounded-2xl border-2 border-blue-400 bg-black shadow-2xl\">
            <div className=\"flex items-center justify-between border-b-2 border-blue-400/30 bg-gradient-to-r from-slate-900 to-blue-900 px-4 py-3\">
              <h4 className=\"text-sm font-bold text-white\">{activeVideo.title}</h4>
              <button onClick={() => setActiveVideo(null)} className=\"rounded px-3 py-1 text-xs font-bold text-blue-300 hover:bg-blue-600/20\">
                ✕ Close
              </button>
            </div>
            <video src={activeVideo.src} controls autoPlay className=\"max-h-[70vh] w-full\" />
          </motion.div>
        </div>
      )}
    </section>
  );
}
