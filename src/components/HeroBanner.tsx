import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Plus, 
  Check, 
  Info, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Clapperboard,
  Flame,
  Volume2,
  VolumeX
} from 'lucide-react';
import { MediaItem } from '../types';

interface HeroBannerProps {
  item?: MediaItem;
  items?: MediaItem[];
  inMyList?: boolean;
  myListIds?: string[];
  onToggleMyList: (item: MediaItem, e: React.MouseEvent) => void;
  onPlay: (item: MediaItem) => void;
  onViewDetails: (item: MediaItem) => void;
  onOpenTrailer?: (item: MediaItem) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  item,
  items,
  inMyList = false,
  myListIds = [],
  onToggleMyList,
  onPlay,
  onViewDetails,
  onOpenTrailer,
}) => {
  // Normalize items array
  const bannerList = React.useMemo(() => {
    if (items && items.length > 0) return items;
    if (item) return [item];
    return [];
  }, [items, item]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  const SLIDE_DURATION = 7500; // 7.5 seconds per slide
  const currentItem = bannerList[currentIndex] || item;

  // Auto-advance progress timer
  useEffect(() => {
    if (bannerList.length <= 1 || isPaused) return;

    const interval = 50; // update progress every 50ms
    const step = (interval / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((idx) => (idx + 1) % bannerList.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [bannerList.length, isPaused, currentIndex]);

  // Reset progress on manual index switch
  const handleSelectIndex = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? bannerList.length - 1 : prev - 1));
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerList.length);
    setProgress(0);
  };

  if (!currentItem) return null;

  const isCurrentInList = myListIds.length > 0 
    ? myListIds.includes(currentItem.id) 
    : inMyList;

  return (
    <section
      id="hero-banner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full min-h-[78vh] md:min-h-[88vh] lg:h-[90vh] flex items-end overflow-hidden pb-16 pt-24 select-none"
    >
      {/* Background Animated Image Layers with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`backdrop-${currentItem.id}`}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <img
            src={currentItem.backdropUrl}
            alt={currentItem.title}
            className="w-full h-full object-cover object-center transform scale-105"
          />

          {/* Cinematic Vignettes and Multi-layer Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07070b] via-[#07070b]/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070b] via-[#07070b]/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07070b]/70 via-transparent to-transparent z-10" />
          
          {/* Subtle Ambient Glow */}
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none z-10" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content Information with Motion Transitions */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentItem.id}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-4"
            >
              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <motion.span 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="px-2.5 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-600/40 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>
                    {currentItem.genres.includes('Animation') ? 'Featured Anime & Animation' : '#1 Featured Original'}
                  </span>
                </motion.span>

                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-amber-300 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{currentItem.rating.toFixed(1)}</span>
                </div>

                <span className="text-xs font-semibold text-neutral-300">{currentItem.releaseYear}</span>
                
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">
                  {currentItem.ageRating}
                </span>

                <span className="text-xs font-semibold text-neutral-300">
                  {currentItem.type === 'movie' ? currentItem.runtime : `${currentItem.seasonsCount || 1} Season${(currentItem.seasonsCount || 1) > 1 ? 's' : ''}`}
                </span>

                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Ultra HD 4K
                </span>
              </div>

              {/* Title or Official Logo */}
              {currentItem.logoUrl ? (
                <div className="py-2">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45 }}
                    src={currentItem.logoUrl}
                    alt={currentItem.title}
                    referrerPolicy="no-referrer"
                    className="max-h-24 sm:max-h-32 md:max-h-40 w-auto object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)]"
                  />
                  <h1 className="sr-only">{currentItem.title}</h1>
                </div>
              ) : (
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none drop-shadow-md"
                >
                  {currentItem.title}
                </motion.h1>
              )}

              {/* Tagline / Subtitle */}
              {currentItem.tagline && (
                <p className="text-sm sm:text-base font-medium text-violet-300/90 italic">
                  "{currentItem.tagline}"
                </p>
              )}

              {/* Description */}
              <p className="text-xs sm:text-sm md:text-base text-neutral-300 line-clamp-3 leading-relaxed max-w-xl drop-shadow">
                {currentItem.description}
              </p>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {currentItem.genres.map((g) => (
                  <span
                    key={g}
                    className={`text-xs px-2.5 py-1 rounded-lg backdrop-blur-md border font-medium ${
                      g === 'Animation' 
                        ? 'bg-fuchsia-600/20 border-fuchsia-500/40 text-fuchsia-200'
                        : 'bg-white/[0.06] border-white/[0.08] text-neutral-300'
                    }`}
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  id="hero-watch-now-btn"
                  onClick={() => onPlay(currentItem)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold flex items-center gap-2.5 shadow-xl shadow-purple-900/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>Watch Now</span>
                </button>

                {onOpenTrailer && (
                  <button
                    onClick={() => onOpenTrailer(currentItem)}
                    className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium flex items-center gap-2 backdrop-blur-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Clapperboard className="w-5 h-5 text-violet-300" />
                    <span>Trailer</span>
                  </button>
                )}

                <button
                  id="hero-mylist-btn"
                  onClick={(e) => onToggleMyList(currentItem, e)}
                  className={`px-5 py-3 rounded-xl border font-medium flex items-center gap-2 backdrop-blur-md hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                    isCurrentInList
                      ? 'bg-violet-600/30 border-violet-400 text-violet-200'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  {isCurrentInList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  <span>{isCurrentInList ? 'In My List' : 'Add to My List'}</span>
                </button>

                <button
                  id="hero-details-btn"
                  onClick={() => onViewDetails(currentItem)}
                  className="px-4 py-3 rounded-xl bg-black/40 hover:bg-white/10 border border-white/15 text-neutral-200 hover:text-white flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer"
                >
                  <Info className="w-5 h-5" />
                  <span>More Info</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Carousel Navigation & Indicators (When multiple banners exist) */}
      {bannerList.length > 1 && (
        <div className="absolute bottom-6 right-4 sm:right-8 lg:right-12 z-30 flex items-center gap-3">
          {/* Arrow Buttons */}
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md p-1 rounded-2xl border border-white/10">
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Slide Dots with Animated Progress */}
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10">
            {bannerList.map((b, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={b.id}
                  onClick={() => handleSelectIndex(idx)}
                  className="group relative h-2.5 rounded-full overflow-hidden transition-all cursor-pointer"
                  style={{ width: isActive ? '36px' : '10px' }}
                  title={b.title}
                >
                  <div className="absolute inset-0 bg-white/20 rounded-full" />
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
