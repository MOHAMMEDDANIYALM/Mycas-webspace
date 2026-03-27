'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PublicNavbar from 'components/public/PublicNavbar';
import PublicFooter from 'components/public/PublicFooter';

const eventVideos = [
  { src: '/ethnic_day.mp4', title: 'Ethnic Day' },
  { src: '/mehandi_in_mycas.mp4', title: 'Mehandi In Mycas' },
  { src: '/my_flames.mp4', title: 'My Flames' }
];

export default function EventsPage() {
  const videoRef = useRef(null);
  const hideUiTimerRef = useRef(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showUi, setShowUi] = useState(true);
  const [progress, setProgress] = useState(0);

  const showNext = () => {
    setProgress(0);
    setActiveVideoIndex((current) => (current + 1) % eventVideos.length);
  };

  const showPrevious = () => {
    setProgress(0);
    setActiveVideoIndex((current) => (current - 1 + eventVideos.length) % eventVideos.length);
  };

  const jumpToVideo = (index) => {
    setProgress(0);
    setActiveVideoIndex(index);
  };

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === 'ArrowRight') {
        showNext();
      }

      if (event.key === 'ArrowLeft') {
        showPrevious();
      }

      if (event.key === ' ') {
        event.preventDefault();
        togglePlayback();
      }

      if (event.key.toLowerCase() === 'm') {
        setIsMuted((current) => !current);
      }

      if (event.key.toLowerCase() === 'f') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (hideUiTimerRef.current) {
      clearTimeout(hideUiTimerRef.current);
      hideUiTimerRef.current = null;
    }

    if (!isPlaying) {
      setShowUi(true);
      return;
    }

    hideUiTimerRef.current = setTimeout(() => {
      setShowUi(false);
    }, 2500);

    return () => {
      if (hideUiTimerRef.current) {
        clearTimeout(hideUiTimerRef.current);
        hideUiTimerRef.current = null;
      }
    };
  }, [activeVideoIndex, isPlaying]);

  const revealUiTemporarily = () => {
    setShowUi(true);

    if (hideUiTimerRef.current) {
      clearTimeout(hideUiTimerRef.current);
      hideUiTimerRef.current = null;
    }

    if (isPlaying) {
      hideUiTimerRef.current = setTimeout(() => {
        setShowUi(false);
      }, 2500);
    }
  };

  const togglePlayback = () => {
    const player = videoRef.current;

    if (!player) {
      return;
    }

    if (player.paused) {
      player.play();
      setIsPlaying(true);
    } else {
      player.pause();
      setIsPlaying(false);
      setShowUi(true);
    }
  };

  const toggleFullscreen = async () => {
    const player = videoRef.current;

    if (!player) {
      return;
    }

    try {
      if (!document.fullscreenElement) {
        await player.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
  };

  const handleTimeUpdate = () => {
    const player = videoRef.current;

    if (!player || !player.duration) {
      setProgress(0);
      return;
    }

    setProgress((player.currentTime / player.duration) * 100);
  };

  const activeVideo = eventVideos[activeVideoIndex];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <video
          className="h-full w-full object-cover"
          src="/background.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/62" />
      </div>

      <div className="relative z-20">
        <PublicNavbar />
      </div>

      <section className="relative z-10 bg-transparent">
        <motion.div
          key={activeVideo.src}
          initial={{ opacity: 0.2, scale: 1.02 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55 }}
          className="relative h-[100svh] w-full"
          onMouseMove={revealUiTemporarily}
          onTouchStart={revealUiTemporarily}
        >
          <video
            ref={videoRef}
            key={activeVideo.src}
            className="h-full w-full object-cover"
            src={activeVideo.src}
            autoPlay
            muted={isMuted}
            playsInline
            onEnded={showNext}
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={togglePlayback}
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/45" />

          <div className={`absolute left-0 right-0 top-0 h-1 bg-white/15 transition-opacity duration-300 ${showUi ? 'opacity-100' : 'opacity-0'}`}>
            <div className="h-full bg-white transition-all duration-150" style={{ width: `${progress}%` }} />
          </div>

          <div className={`absolute inset-x-0 top-0 flex items-center justify-between px-4 py-4 transition-opacity duration-300 md:px-8 md:py-6 ${showUi ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <p className="rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white md:text-sm">
              Now Playing: {activeVideo.title}
            </p>
            <div className="flex items-center gap-2">
              <p className="rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white md:text-sm">
                {activeVideoIndex + 1} / {eventVideos.length}
              </p>
              <button
                type="button"
                onClick={() => setIsMuted((current) => !current)}
                className="rounded-full border border-white/45 bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur transition hover:bg-black/70 md:text-sm"
              >
                {isMuted ? 'Unmute' : 'Mute'}
              </button>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="rounded-full border border-white/45 bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur transition hover:bg-black/70 md:text-sm"
              >
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </button>
            </div>
          </div>

          <div className={`absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-4 pb-8 transition-opacity duration-300 md:px-8 md:pb-10 ${showUi ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button
              type="button"
              onClick={showPrevious}
              className="rounded-full border border-white/45 bg-black/45 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-black/70"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={showNext}
              className="rounded-full border border-white/45 bg-black/45 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-black/70"
            >
              Next
            </button>
          </div>

          <button
            type="button"
            onClick={togglePlayback}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 bg-black/45 px-5 py-2 text-sm font-semibold text-white backdrop-blur transition ${showUi ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>

          <div className={`absolute left-1/2 top-[58%] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-black/40 px-3 py-2 backdrop-blur transition-opacity duration-300 ${showUi ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {eventVideos.map((video, index) => (
              <button
                key={video.src}
                type="button"
                onClick={() => jumpToVideo(index)}
                aria-label={`Play ${video.title}`}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === activeVideoIndex ? 'bg-white' : 'bg-white/45 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </section>

      <div className="relative z-20">
        <PublicFooter />
      </div>
    </main>
  );
}
