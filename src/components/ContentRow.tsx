import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaItem } from '../types';
import { MediaCard } from './MediaCard';

interface ContentRowProps {
  title: string;
  subtitle?: string;
  items: MediaItem[];
  myListIds: string[];
  onToggleMyList: (item: MediaItem, e: React.MouseEvent) => void;
  onPlay: (item: MediaItem, e?: React.MouseEvent) => void;
  onViewDetails: (item: MediaItem) => void;
  onSeeAll?: () => void;
  cardSize?: 'normal' | 'large' | 'compact';
}

export const ContentRow: React.FC<ContentRowProps> = ({
  title,
  subtitle,
  items,
  myListIds,
  onToggleMyList,
  onPlay,
  onViewDetails,
  onSeeAll,
  cardSize = 'normal',
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="relative py-4 group/row">
      {/* Row Header */}
      <div className="flex items-end justify-between px-4 sm:px-6 lg:px-8 mb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
              {title}
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-600/10 text-violet-400 border border-violet-500/20">
              {items.length}
            </span>
          </div>
          {subtitle && <p className="text-xs text-neutral-400 mt-0.5">{subtitle}</p>}
        </div>

        {onSeeAll && (
          <button
            onClick={onSeeAll}
            className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Explore all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Row Carousel Area */}
      <div className="relative">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute -left-2 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-violet-600 border border-white/10 hover:border-violet-400 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover/row:opacity-100 transition-all duration-200 shadow-xl cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={rowRef}
          className="flex items-stretch gap-4 px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar scroll-smooth py-2"
        >
          {items.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              inMyList={myListIds.includes(item.id)}
              onToggleMyList={onToggleMyList}
              onPlay={onPlay}
              onViewDetails={onViewDetails}
              size={cardSize}
            />
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute -right-2 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-violet-600 border border-white/10 hover:border-violet-400 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover/row:opacity-100 transition-all duration-200 shadow-xl cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
