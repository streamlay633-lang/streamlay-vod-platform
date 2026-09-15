import React, { useState } from 'react';
import { Clapperboard, Filter, Sparkles, Star } from 'lucide-react';
import { MediaItem, UserProfile } from '../types';
import { HeroBanner } from '../components/HeroBanner';
import { ContentRow } from '../components/ContentRow';
import { MediaCard } from '../components/MediaCard';

interface SeriesPageProps {
  seriesList: MediaItem[];
  user: UserProfile;
  onToggleMyList: (item: MediaItem, e: React.MouseEvent) => void;
  onPlay: (item: MediaItem) => void;
  onViewDetails: (item: MediaItem) => void;
  onOpenTrailer: (item: MediaItem) => void;
}

export const SeriesPage: React.FC<SeriesPageProps> = ({
  seriesList,
  user,
  onToggleMyList,
  onPlay,
  onViewDetails,
  onOpenTrailer,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');

  const genres = ['All', 'Sci-Fi', 'Fantasy', 'Drama', 'Action', 'Mystery', 'Crime', 'Animation'];

  const featuredSeries = seriesList.find((s) => s.id === 'ser-1') || seriesList[0];
  const trendingSeries = seriesList.filter((s) => s.isTrending);
  const popularSeries = seriesList.filter((s) => s.isPopular);
  const topRatedSeries = [...seriesList].sort((a, b) => b.rating - a.rating);

  // Filtered series grid
  const filteredSeries = seriesList
    .filter((s) => selectedGenre === 'All' || s.genres.includes(selectedGenre))
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.releaseYear - a.releaseYear;
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });

  return (
    <div id="series-page" className="min-h-screen pb-24 overflow-x-hidden">
      {/* Featured Series Hero */}
      {featuredSeries && (
        <HeroBanner
          item={featuredSeries}
          inMyList={user.myListIds.includes(featuredSeries.id)}
          onToggleMyList={onToggleMyList}
          onPlay={onPlay}
          onViewDetails={onViewDetails}
          onOpenTrailer={onOpenTrailer}
        />
      )}

      {/* Rows & Catalog */}
      <div className="relative z-20 -mt-10 sm:-mt-14 space-y-8 max-w-7xl mx-auto">
        {/* Trending Series Row */}
        <ContentRow
          title="Trending TV Series"
          subtitle="The most streamed serialized storytelling right now"
          items={trendingSeries}
          myListIds={user.myListIds}
          onToggleMyList={onToggleMyList}
          onPlay={onPlay}
          onViewDetails={onViewDetails}
        />

        {/* Top Rated Series Row */}
        <ContentRow
          title="Acclaimed Masterpieces"
          subtitle="Top reviewed multi-season prestige dramas"
          items={topRatedSeries}
          myListIds={user.myListIds}
          onToggleMyList={onToggleMyList}
          onPlay={onPlay}
          onViewDetails={onViewDetails}
        />

        {/* Explore All Series Section with Genre Pills & Grid */}
        <div className="px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/[0.08] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Clapperboard className="w-5 h-5 text-violet-400" />
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                  All TV Series Catalog
                </h2>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">Filter by genre and sort by popularity or StreamScore</p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Genre Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {genres.map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGenre(g)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedGenre === g
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                        : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/[0.06]'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              {/* Sort Select */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#171724] border border-white/[0.12] text-xs text-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:border-violet-500 cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Responsive Series Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {filteredSeries.map((item) => (
              <div key={item.id} className="flex justify-center">
                <MediaCard
                  item={item}
                  inMyList={user.myListIds.includes(item.id)}
                  onToggleMyList={onToggleMyList}
                  onPlay={onPlay}
                  onViewDetails={onViewDetails}
                  size="compact"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
