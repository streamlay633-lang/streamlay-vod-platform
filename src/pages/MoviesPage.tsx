import React, { useState } from 'react';
import { Film, Filter, Sparkles, Star } from 'lucide-react';
import { MediaItem, UserProfile } from '../types';
import { HeroBanner } from '../components/HeroBanner';
import { ContentRow } from '../components/ContentRow';
import { MediaCard } from '../components/MediaCard';

interface MoviesPageProps {
  moviesList: MediaItem[];
  user: UserProfile;
  onToggleMyList: (item: MediaItem, e: React.MouseEvent) => void;
  onPlay: (item: MediaItem) => void;
  onViewDetails: (item: MediaItem) => void;
  onOpenTrailer: (item: MediaItem) => void;
}

export const MoviesPage: React.FC<MoviesPageProps> = ({
  moviesList,
  user,
  onToggleMyList,
  onPlay,
  onViewDetails,
  onOpenTrailer,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');

  const movieGenres = ['All', 'Action', 'Sci-Fi', 'Thriller', 'Drama', 'Comedy', 'Horror', 'Adventure'];

  const featuredMovie = moviesList.find((m) => m.id === 'mov-1') || moviesList[0];
  const trendingMovies = moviesList.filter((m) => m.isTrending);
  const popularMovies = moviesList.filter((m) => m.isPopular);
  const newReleases = moviesList.filter((m) => m.isNewRelease || m.releaseYear >= 2025);
  const topRatedMovies = [...moviesList].sort((a, b) => b.rating - a.rating);

  // Filtered movies grid
  const filteredMovies = moviesList
    .filter((m) => selectedGenre === 'All' || m.genres.includes(selectedGenre))
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.releaseYear - a.releaseYear;
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });

  if (moviesList.length === 0) {
    return (
      <div id="movies-page" className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-violet-400 mb-4 shadow-xl">
          <Film className="w-8 h-8" />
        </div>
        <h2 className="font-display text-2xl font-bold text-white mb-2">No Movies in Catalog</h2>
        <p className="text-sm text-neutral-400 max-w-md mb-6">
          Movies have been removed from the catalog. Enjoy streaming <span className="text-violet-300 font-medium">Himitsu no AiPri</span> in TV Series or explore Live TV channels.
        </p>
      </div>
    );
  }

  return (
    <div id="movies-page" className="min-h-screen pb-24 overflow-x-hidden">
      {/* Featured Movie Hero */}
      {featuredMovie && (
        <HeroBanner
          item={featuredMovie}
          inMyList={user.myListIds.includes(featuredMovie.id)}
          onToggleMyList={onToggleMyList}
          onPlay={onPlay}
          onViewDetails={onViewDetails}
          onOpenTrailer={onOpenTrailer}
        />
      )}

      {/* Rows & Catalog */}
      <div className="relative z-20 -mt-10 sm:-mt-14 space-y-8 max-w-7xl mx-auto">
        {/* Trending Movies Row */}
        <ContentRow
          title="Trending Blockbusters"
          subtitle="The most popular cinema experiences right now"
          items={trendingMovies}
          myListIds={user.myListIds}
          onToggleMyList={onToggleMyList}
          onPlay={onPlay}
          onViewDetails={onViewDetails}
        />

        {/* New Releases Row */}
        <ContentRow
          title="New In 4K UHD"
          subtitle="Just added to the StreamLay cinematic vault"
          items={newReleases}
          myListIds={user.myListIds}
          onToggleMyList={onToggleMyList}
          onPlay={onPlay}
          onViewDetails={onViewDetails}
        />

        {/* All-Time Top Rated Row */}
        <ContentRow
          title="Critic Favorites"
          subtitle="Highest rated movies across all genres"
          items={topRatedMovies}
          myListIds={user.myListIds}
          onToggleMyList={onToggleMyList}
          onPlay={onPlay}
          onViewDetails={onViewDetails}
        />

        {/* Explore All Movies Section with Genre Filter & Grid */}
        <div className="px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/[0.08] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-violet-400" />
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                  All Feature Films
                </h2>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">Explore movies with custom genre filters and sort options</p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Genre Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {movieGenres.map((g) => (
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

          {/* Responsive Movie Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {filteredMovies.map((item) => (
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
