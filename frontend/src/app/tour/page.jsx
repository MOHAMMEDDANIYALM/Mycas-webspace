'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function TourPage() {
  const tourImages = ['/lab 1.jpeg', '/lab 2.jpeg'];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % tourImages.length);
  };

  const handlePreviousImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + tourImages.length) % tourImages.length);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex items-center justify-between border-b border-white/20 px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">360° Virtual Campus Tour</h1>
          <p className="text-sm text-gray-300">Now showing lab spaces. Add more campus spots anytime.</p>
        </div>
        <Link href="/" className="rounded-lg bg-white/15 px-4 py-2 hover:bg-white/25 transition">
          Back to Home
        </Link>
      </div>

      <section className="relative h-[calc(100vh-88px)] w-full">
        <Image
          src={tourImages[activeImageIndex]}
          alt={`Campus Tour View ${activeImageIndex + 1}`}
          fill
          unoptimized
          priority
          className="object-contain"
        />

        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <button
            onClick={handlePreviousImage}
            aria-label="Previous tour view"
            className="rounded-full bg-white/80 px-4 py-3 text-blue-900 hover:bg-white transition"
          >
            ←
          </button>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <button
            onClick={handleNextImage}
            aria-label="Next tour view"
            className="rounded-full bg-white/80 px-4 py-3 text-blue-900 hover:bg-white transition"
          >
            →
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-3">
          <p className="rounded-full bg-black/60 px-4 py-1 text-sm text-white">
            View {activeImageIndex + 1} of {tourImages.length}
          </p>
          <div className="flex items-center gap-2">
            {tourImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`h-2.5 w-2.5 rounded-full ${index === activeImageIndex ? 'bg-white' : 'bg-white/50'}`}
                aria-label={`Open tour view ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
