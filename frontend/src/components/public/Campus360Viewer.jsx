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
    <section className="rounded-3xl border border-blue-100 bg-white/70 p-6 shadow-[0_20px_70px_rgba(59,130,246,0.18)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/60">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-blue-900 dark:text-white">360° Campus View</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">Drag horizontally to explore the current location.</p>
        </div>
        <div className="flex gap-2">
          {spots.map((spot, index) => (
            <button
              key={spot.name}
              onClick={() => {
                setActiveSpot(index);
                setOffset(50);
              }}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                activeSpot === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-800 hover:bg-blue-100 dark:bg-slate-800 dark:text-slate-200'
              }`}
            >
              {spot.name}
            </button>
          ))}
        </div>
      </div>

      <div
        className="relative h-[320px] overflow-hidden rounded-2xl"
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 rounded-full bg-black/40 px-3 py-1 text-xs text-white">
          {spots[activeSpot].name}
        </div>
      </div>
    </section>
  );
}
