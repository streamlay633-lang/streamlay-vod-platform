import React, { useState, useMemo } from 'react';
import { Search, X, Filter, SlidersHorizontal, Sparkles, Film, Clapperboard, Star } from 'lucide-react';
import { MediaItem, MediaType, UserProfile } from '../types';
import { MediaCard } from '../components/MediaCard';
import { GENRE_LIST } from '../data/mockData';

interface SearchPageProps {
  mediaList: MediaItem[];
  user: UserProfile;
  onToggleMyList: (item: MediaItem, e: React.MouseEvent) => void;
  onPlay: (item: MediaItem) => void;
  onViewDetails: (item: MediaItem) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  mediaList,
  user,
  onToggleMyList,
  onPlay,
  onViewDetails,
}) => {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | MediaType>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'popular' | 'rating'>('relevance');

  // Popular search tags suggestions
  const popularKeywords = ['Cyberpunk', 'Space', 'Mystery', 'Prague', 'Tokyo', 'Heist', 'Sci-Fi', 'Occult'];

  // Real-time suggestions based on current query
  const suggestions = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    const matches: string[] = [];
    mediaList.forEach((m) => {
      if (m.title.toLowerCase().includes(q) && !matches.includes(m.title)) {
        matches.push(m.title);
      }
      m.genres.forEach((g) => {
        if (g.toLowerCase().includes(q) && !matches.includes(g)) {
          matches.push(g);
        }
      });
    });
    return matches.slice(0, 5);
  }, [query, mediaList]);

  // Filtered and sorted results
  const filteredResults = useMemo(() => {
    return mediaList.filter((item) => {
      // Query filter
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesGenre = item.genres.some((g) => g.toLowerCase().includes(q));
        const matchesCast = item.cast.some((c) => c.name.toLowerCase().includes(q));
        const matchesDirector = item.director?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesGenre && !matchesCast && !matchesDirector) {
          return false;
        }
      }

      // Type filter
      if (selectedType !== 'all' && item.type !== selectedType) {
        return false;
      }

      // Genre filter
      if (selectedGenre !== 'All' && !item.genres.includes(selectedGenre)) {
        return false;
      }

      // Year filter
      if (selectedYear !== 'all') {
        if (selectedYear === '2025' && item.releaseYear !== 2025) return false;
        if (selectedYear === '2024' && item.releaseYear !== 2024) return false;
        if (selectedYear === 'older' && item.releaseYear >= 2024) return false;
      }

      // Rating filter
      if (minRating > 0 && item.rating < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return b.releaseYear - a.releaseYear;
      if (sortBy === 'popular') return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      if (sortBy === 'rating') return b.rating - a.rating;
      // relevance: if query exists, title match first
      if (query.trim()) {
        const aTitle = a.title.toLowerCase().includes(query.toLowerCase());
        const bTitle = b.title.toLowerCase().includes(query.toLowerCase());
        if (aTitle && !bTitle) return -1;
        if (!aTitle && bTitle) return 1;
      }
      return b.rating - a.rating;
    });
  }, [mediaList, query, selectedType, selectedGenre, selectedYear, minRating, sortBy]);

  const resetFilters = () => {
    setQuery('');
    setSelectedType('all');
    setSelectedGenre('All');
    setSelectedYear('all');
    setMinRating(0);
    setSortBy('relevance');
  };

  return (
    <div id="search-page" className="min-h-screen pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Search Header */}
      <div className="max-w-3xl mx-auto mb-8 text-center space-y-4">
        <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Search Stream<span className="text-violet-400">Lay</span>
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Find movies, television series, directors, genres, and 4K cinema titles.
        </p>

        {/* Big Search Input Box */}
        <div className="relative mt-4">
          <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 sm:h-6 sm:w-6 text-violet-400" />
          </div>

          <input
            id="search-input-field"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, genre, actor, or keyword..."
            autoFocus
            className="w-full pl-12 sm:pl-14 pr-12 py-4 rounded-2xl bg-[#12121e]/90 border border-white/[0.12] text-white placeholder-neutral-500 text-sm sm:text-lg focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 shadow-2xl transition-all"
          />

          {query && (
            <button
              id="search-clear-btn"
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Clear search"
            >
              <div className="p-1 rounded-full bg-white/10 hover:bg-white/20">
                <X className="h-4 w-4" />
              </div>
            </button>
          )}
        </div>

        {/* Real-time suggestions while typing */}
        {suggestions.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="text-neutral-500 font-medium">Suggestions:</span>
            {suggestions.map((sug) => (
              <button
                key={sug}
                onClick={() => setQuery(sug)}
                className="px-2.5 py-1 rounded-full bg-violet-600/20 text-violet-300 hover:bg-violet-600/40 border border-violet-500/30 transition-all cursor-pointer"
              >
                {sug}
              </button>
            ))}
          </div>
        )}

        {/* Quick Popular Keywords Chips */}
        {!query && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="text-xs text-neutral-500 font-medium">Popular:</span>
            {popularKeywords.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="text-xs px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter and Sorting Controls Toolbar */}
      <div className="rounded-2xl bg-[#0f0f18]/80 border border-white/[0.08] p-4 mb-8 backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Content Type Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedType === 'all'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setSelectedType('movie')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedType === 'movie'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Movies</span>
            </button>
            <button
              onClick={() => setSelectedType('series')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedType === 'series'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Clapperboard className="w-3.5 h-3.5" />
              <span>Series</span>
            </button>
          </div>

          {/* Genre, Year, Rating Dropdowns */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Genre Select */}
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-[#171724] border border-white/[0.12] text-xs text-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:border-violet-500 cursor-pointer"
            >
              {GENRE_LIST.map((g) => (
                <option key={g} value={g} className="bg-[#171724] text-white">
                  {g === 'All' ? 'All Genres' : g}
                </option>
              ))}
            </select>

            {/* Year Select */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-[#171724] border border-white/[0.12] text-xs text-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:border-violet-500 cursor-pointer"
            >
              <option value="all">All Years</option>
              <option value="2025">2025 (Newest)</option>
              <option value="2024">2024</option>
              <option value="older">2023 & Earlier</option>
            </select>

            {/* Rating Select */}
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="bg-[#171724] border border-white/[0.12] text-xs text-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:border-violet-500 cursor-pointer"
            >
              <option value={0}>Any Rating</option>
              <option value={8.5}>8.5+ ⭐ Critical Acclaim</option>
              <option value={8.0}>8.0+ ⭐ Highly Rated</option>
              <option value={7.5}>7.5+ ⭐ Good</option>
            </select>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-white/[0.1]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#171724] border border-white/[0.12] text-xs text-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:border-violet-500 cursor-pointer"
              >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Reset button if filters applied */}
            {(query || selectedType !== 'all' || selectedGenre !== 'All' || selectedYear !== 'all' || minRating > 0) && (
              <button
                onClick={resetFilters}
                className="text-xs text-violet-400 hover:text-violet-300 font-medium px-2 py-1 transition-colors cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-neutral-400 font-medium">
            Showing <span className="text-white font-semibold">{filteredResults.length}</span> titles
            {query && (
              <span>
                {' '}for "<span className="text-violet-300 font-semibold">{query}</span>"
              </span>
            )}
          </p>
        </div>

        {/* Results Grid */}
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {filteredResults.map((item) => (
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
        ) : (
          /* Empty State Design */
          <div
            id="search-empty-state"
            className="rounded-3xl bg-[#0f0f18]/60 border border-white/[0.08] p-12 text-center max-w-lg mx-auto my-8 space-y-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mx-auto text-violet-400">
              <Search className="w-8 h-8 opacity-70" />
            </div>

            <h3 className="font-display text-xl font-bold text-white">No streamable titles found</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              We couldn't find any matches for your query. Try broadening your keywords, resetting your filters, or browsing our trending recommendations.
            </p>

            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Reset Filters & Explore All</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
