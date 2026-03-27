'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Campus360Viewer() {
  const spots = [
    { name: 'Lab 1', image: '/lab 1.jpeg' },
    { name: 'Lab 2', image: '/lab 2.jpeg' }
  ];

  const [activeSpot, setActiveSpot] = useState(0);
  const [offset, setOffset] = useState(50);
  const dragRef = useRef(false);

  const updateOffset = (clientX, rect) => {
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setOffset(Math.max(0, Math.min(100, pct)));
  };

  return (
    <section className="rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50/30 p-6 shadow-lg backdrop-blur-xl dark:border-blue-800/50 dark:from-slate-800 dark:to-blue-900/30">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="border-l-4 border-blue-600 pl-4">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">🏫 360° Campus View</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300\">Drag horizontally to explore the campus.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {spots.map((spot, index) => (
            <button
              key={spot.name}
              onClick={() => {
                setActiveSpot(index);
                setOffset(50);
              }}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                activeSpot === index
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'border-2 border-blue-300 bg-white text-blue-700 hover:bg-blue-50 dark:border-blue-700/50 dark:bg-slate-800 dark:text-blue-300'
              }`}
            >
              {spot.name}
            </button>
          ))}
        </div>
      </div>

      <div
        className="relative h-[360px] overflow-hidden rounded-2xl ring-2 ring-blue-200 dark:ring-blue-800/50"
        onMouseDown={(e) => {
          dragRef.current = true;
          updateOffset(e.clientX, e.currentTarget.getBoundingClientRect());
        }}
        onMouseMove={(e) => {
          if (!dragRef.current) return;
          updateOffset(e.clientX, e.currentTarget.getBoundingClientRect());
        }}
        onMouseUp={() => {
          dragRef.current = false;
        }}
        onMouseLeave={() => {
          dragRef.current = false;
        }}
        onTouchStart={(e) => {
          updateOffset(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
        }}
        onTouchMove={(e) => {
          updateOffset(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
        }}
      >
        <motion.div animate={{ x: `${50 - offset}%` }} transition={{ type: 'spring', stiffness: 80, damping: 20 }} className="absolute inset-0 w-[180%]">
          <Image src={spots[activeSpot].image} alt={spots[activeSpot].name} fill unoptimized className="object-cover" />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
          <span>📍</span>
          {spots[activeSpot].name}
        </div>
      </div>
    </section>
  );
}
