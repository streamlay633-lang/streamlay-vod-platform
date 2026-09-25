import React from 'react';
import { Play, Plus, Check, Star, Info } from 'lucide-react';
import { MediaItem } from '../types';
import { getTranslation, getGenreTranslation, normalizeLanguage } from '../utils/translations';

interface MediaCardProps {
  item: MediaItem;
  inMyList: boolean;
  onToggleMyList: (item: MediaItem, e: React.MouseEvent) => void;
  onPlay: (item: MediaItem, e?: React.MouseEvent) => void;
  onViewDetails: (item: MediaItem) => void;
  size?: 'normal' | 'large' | 'compact';
  lang?: string;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  item,
  inMyList,
  onToggleMyList,
  onPlay,
  onViewDetails,
  size = 'normal',
  lang,
}) => {
  const activeLang = lang || (typeof document !== 'undefined' ? document.documentElement.lang : 'en');
  const widthClasses = {
    compact: 'w-[160px] sm:w-[180px]',
    normal: 'w-[180px] sm:w-[220px]',
    large: 'w-[240px] sm:w-[280px]',
  }[size];

  const seasonsLabel = item.seasonsCount === 1 
    ? getTranslation('seasonSingular', activeLang) 
    : getTranslation('seasonsPlural', activeLang);

  return (
    <div
      id={`media-card-${item.id}`}
      onClick={() => onViewDetails(item)}
      className={`group relative flex-none ${widthClasses} rounded-2xl overflow-hidden bg-[#12121c] border border-white/[0.06] hover:border-violet-500/50 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-purple-900/30 cursor-pointer select-none`}
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-900">
        <img
          src={item.posterUrl}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-transparent to-black/30 opacity-70 group-hover:opacity-90 transition-opacity" />

        {/* Badges: Rating & Format */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-amber-300 text-xs font-semibold">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{item.rating.toFixed(1)}</span>
          </div>

          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider bg-black/60 backdrop-blur-md border border-white/10 text-neutral-300 uppercase">
            {item.type === 'series' ? 'TV' : '4K'}
          </span>
        </div>

        {/* Progress bar for continue watching */}
        {typeof item.progressPercentage === 'number' && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
              style={{ width: `${item.progressPercentage}%` }}
            />
          </div>
        )}

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <button
              id={`card-play-btn-${item.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onPlay(item, e);
              }}
              className="w-10 h-10 rounded-full bg-violet-600 hover:bg-violet-500 text-white flex items-center justify-center shadow-lg shadow-violet-600/50 hover:scale-105 active:scale-95 transition-all"
              title={getTranslation('playNow', activeLang)}
            >
              <Play className="w-4 h-4 fill-white ltr:ml-0.5 rtl:mr-0.5" />
            </button>

            <button
              id={`card-toggle-list-btn-${item.id}`}
              onClick={(e) => onToggleMyList(item, e)}
              className={`w-9 h-9 rounded-full border flex items-center justify-center backdrop-blur-md transition-all ${
                inMyList
                  ? 'bg-violet-600/30 border-violet-400 text-violet-300'
                  : 'bg-black/60 border-white/20 text-white hover:border-white/50'
              }`}
              title={inMyList ? getTranslation('inList', activeLang) : getTranslation('addToList', activeLang)}
            >
              {inMyList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>

            <button
              id={`card-details-btn-${item.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(item);
              }}
              className="w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white hover:border-white/50 flex items-center justify-center backdrop-blur-md ms-auto hover:bg-white/10 transition-all"
              title={getTranslation('moreInfo', activeLang)}
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[11px] text-neutral-300 flex items-center gap-2">
            <span>{item.releaseYear}</span>
            <span>•</span>
            <span>{item.type === 'movie' ? item.runtime : `${item.seasonsCount} ${seasonsLabel}`}</span>
          </div>
        </div>
      </div>

      {/* Info footer */}
      <div className="p-3">
        <h3 className="font-semibold text-sm text-white truncate group-hover:text-violet-300 transition-colors">
          {item.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-neutral-400 mt-1">
          <span className="truncate">
            {item.genres.slice(0, 2).map((g) => getGenreTranslation(g, activeLang)).join(' • ')}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-neutral-300 shrink-0 ms-1">
            {item.ageRating}
          </span>
        </div>
      </div>
    </div>
  );
};

