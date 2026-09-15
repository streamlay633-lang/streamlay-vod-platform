import React from 'react';
import { Play, Plus, Check, Info, Star, Volume2, VolumeX } from 'lucide-react';
import { MediaItem } from '../types';

interface HeroBannerProps {
  item: MediaItem;
  inMyList: boolean;
  onToggleMyList: (item: MediaItem, e: React.MouseEvent) => void;
  onPlay: (item: MediaItem) => void;
  onViewDetails: (item: MediaItem) => void;
  onOpenTrailer?: (item: MediaItem) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  item,
  inMyList,
  onToggleMyList,
  onPlay,
  onViewDetails,
  onOpenTrailer,
}) => {
  const [isMuted, setIsMuted] = React.useState(true);

  return (
    <section
      id="hero-banner"
      className="relative w-full min-h-[75vh] md:min-h-[85vh] lg:h-[88vh] flex items-end overflow-hidden pb-16 pt-24"
    >
      {/* Background Image & Ambient Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src={item.backdropUrl}
          alt={item.title}
          className="w-full h-full object-cover object-center transform scale-105 animate-pulse duration-1000"
          style={{ animationDuration: '8s' }}
        />
        {/* Cinematic Vignettes and Multi-layer Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070b] via-[#07070b]/75 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070b] via-[#07070b]/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070b]/60 via-transparent to-transparent z-10" />
      </div>

      {/* Hero Content Information */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl space-y-4">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider bg-violet-600/90 text-white shadow-lg shadow-violet-600/40">
              #1 StreamLay Original
            </span>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-amber-300 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{item.rating.toFixed(1)}</span>
            </div>
            <span className="text-xs font-semibold text-neutral-300">{item.releaseYear}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">
              {item.ageRating}
            </span>
            <span className="text-xs font-semibold text-neutral-300">
              {item.type === 'movie' ? item.runtime : `${item.seasonsCount} Seasons`}
            </span>
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Ultra HD 4K
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none drop-shadow-md">
            {item.title}
          </h1>

          {/* Tagline / Subtitle */}
          {item.tagline && (
            <p className="text-sm sm:text-base font-medium text-violet-300/90 italic">
              "{item.tagline}"
            </p>
          )}

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-base text-neutral-300 line-clamp-3 leading-relaxed max-w-xl drop-shadow">
            {item.description}
          </p>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {item.genres.map((g) => (
              <span
                key={g}
                className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.06] backdrop-blur-md border border-white/[0.08] text-neutral-300 font-medium"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              id="hero-watch-now-btn"
              onClick={() => onPlay(item)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold flex items-center gap-2.5 shadow-xl shadow-purple-900/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Watch Now</span>
            </button>

            <button
              id="hero-mylist-btn"
              onClick={(e) => onToggleMyList(item, e)}
              className={`px-5 py-3 rounded-xl border font-medium flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer ${
                inMyList
                  ? 'bg-violet-600/30 border-violet-400 text-violet-200'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }`}
            >
              {inMyList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              <span>{inMyList ? 'In My List' : 'Add to My List'}</span>
            </button>

            <button
              id="hero-details-btn"
              onClick={() => onViewDetails(item)}
              className="px-4 py-3 rounded-xl bg-black/40 hover:bg-white/10 border border-white/15 text-neutral-200 hover:text-white flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer"
            >
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
