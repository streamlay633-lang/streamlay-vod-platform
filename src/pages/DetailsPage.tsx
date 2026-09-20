import React, { useState, useMemo } from 'react';
import { 
  Play, 
  Plus, 
  Check, 
  Share2, 
  Clapperboard, 
  Star, 
  Clock, 
  Calendar, 
  ChevronDown, 
  Film, 
  Sparkles,
  Users,
  Tv,
  Compass,
  Quote,
  Flame,
  Filter,
  Search,
  BookOpen,
  Orbit,
  ArrowRight,
  Info,
  CheckCircle2
} from 'lucide-react';
import { MediaItem, Episode, UserProfile, CastMember, MovieChapter } from '../types';
import { ContentRow } from '../components/ContentRow';
import { TRANSLATIONS, normalizeLanguage } from '../utils/translations';

interface DetailsPageProps {
  item: MediaItem;
  allMedia: MediaItem[];
  user: UserProfile;
  onToggleMyList: (item: MediaItem, e: React.MouseEvent) => void;
  onPlay: (item: MediaItem, episode?: Episode) => void;
  onOpenTrailer: (item: MediaItem) => void;
  onViewDetails: (item: MediaItem) => void;
  onShare: (item: MediaItem) => void;
}

type TabType = 'episodes' | 'characters' | 'related' | 'more_like_this';

export const DetailsPage: React.FC<DetailsPageProps> = ({
  item,
  allMedia,
  user,
  onToggleMyList,
  onPlay,
  onOpenTrailer,
  onViewDetails,
  onShare,
}) => {
  const inMyList = user.myListIds.includes(item.id);
  const langKey = normalizeLanguage(user.language);
  const t = TRANSLATIONS[langKey] || TRANSLATIONS.en;
  const isRTL = langKey === 'ar';

  // Active Tab state
  const [activeTab, setActiveTab] = useState<TabType>('episodes');

  // Season management for series
  const seasons = item.seasons || [];
  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState<number>(
    seasons.length > 0 ? seasons[0].seasonNumber : 1
  );
  const currentSeason = seasons.find((s) => s.seasonNumber === selectedSeasonNumber) || seasons[0];

  // Episode filter ('all' vs 'new')
  const [episodeFilter, setEpisodeFilter] = useState<'all' | 'new'>('all');
  const [episodeSearch, setEpisodeSearch] = useState('');

  // Character filtering & selection
  const [characterFilter, setCharacterFilter] = useState<'all' | 'main' | 'supporting'>('all');
  const [selectedCharacter, setSelectedCharacter] = useState<CastMember | null>(null);

  // Genre filter for "More Like This"
  const [recommendationGenre, setRecommendationGenre] = useState<string>('all');

  // New episodes count
  const newEpisodesCount = useMemo(() => {
    if (item.type !== 'series') return 0;
    let count = 0;
    seasons.forEach((s) => {
      s.episodes.forEach((ep) => {
        if (ep.isNew) count++;
      });
    });
    return count;
  }, [item, seasons]);

  // Filtered episodes for current season
  const filteredEpisodes = useMemo(() => {
    if (!currentSeason) return [];
    let list = currentSeason.episodes;
    if (episodeFilter === 'new') {
      list = list.filter((ep) => ep.isNew);
    }
    if (episodeSearch.trim()) {
      const q = episodeSearch.toLowerCase();
      list = list.filter((ep) => 
        ep.title.toLowerCase().includes(q) || 
        ep.description.toLowerCase().includes(q) ||
        ep.episodeNumber.toString().includes(q)
      );
    }
    return list;
  }, [currentSeason, episodeFilter, episodeSearch]);

  // Filtered characters
  const filteredCharacters = useMemo(() => {
    if (!item.cast || item.cast.length === 0) return [];
    if (characterFilter === 'main') {
      return item.cast.filter((c) => c.isMain);
    }
    if (characterFilter === 'supporting') {
      return item.cast.filter((c) => !c.isMain);
    }
    return item.cast;
  }, [item.cast, characterFilter]);

  // Franchise & Universe related items
  const franchiseUniverseName = item.franchiseUniverse || (
    item.genres.includes('Animation') && item.genres.includes('Music') 
      ? 'AiPri Verse' 
      : item.genres.includes('Action') && item.genres.includes('Crime')
      ? 'Rockstar Action Universe'
      : `${item.genres[0]} Universe`
  );

  const franchiseItems = useMemo(() => {
    return allMedia.filter((m) => {
      if (m.id === item.id) return false;
      if (item.franchiseUniverse && m.franchiseUniverse === item.franchiseUniverse) {
        return true;
      }
      // AiPri connections
      if (item.id.includes('aipri') && m.id.includes('aipri')) {
        return true;
      }
      // Default related by universe genre match
      return m.type === item.type && m.genres.some((g) => item.genres.includes(g));
    });
  }, [allMedia, item]);

  // More Like This algorithmic matching
  const moreLikeThisItems = useMemo(() => {
    return allMedia
      .filter((m) => m.id !== item.id)
      .map((m) => {
        // Calculate dynamic similarity score
        const commonGenres = m.genres.filter((g) => item.genres.includes(g));
        let matchScore = 75 + (commonGenres.length * 7);
        if (m.type === item.type) matchScore += 6;
        if (m.ageRating === item.ageRating) matchScore += 3;
        matchScore = Math.min(99, matchScore);
        return { item: m, matchScore };
      })
      .filter(({ item: m }) => {
        if (recommendationGenre === 'all') return true;
        return m.genres.includes(recommendationGenre);
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [allMedia, item, recommendationGenre]);

  return (
    <div id="details-page" className="min-h-screen pb-24 overflow-x-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Full-width Cinematic Backdrop Hero */}
      <div className="relative w-full min-h-[60vh] md:min-h-[75vh] flex items-end pt-20 pb-12 overflow-hidden">
        {/* Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={item.backdropUrl}
            alt={item.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070b] via-[#07070b]/65 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07070b] via-[#07070b]/80 to-transparent" />
        </div>

        {/* Hero Details Info */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-end">
            {/* Poster Card */}
            <div className="w-48 sm:w-56 md:w-64 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/10 shrink-0 hidden sm:block">
              <img
                src={item.posterUrl}
                alt={item.title}
                className="w-full aspect-[2/3] object-cover"
              />
            </div>

            {/* Details Column */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              {/* Badges */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-violet-600 text-white shadow-md shadow-violet-600/40">
                  {item.type === 'series' ? t.series : t.movies}
                </span>

                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-amber-300 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{item.rating.toFixed(1)} StreamScore</span>
                </div>

                <span className="text-xs font-medium text-neutral-300">{item.releaseYear}</span>

                <span className="px-1.5 py-0.5 rounded text-[11px] font-bold bg-white/10 text-neutral-200 border border-white/10">
                  {item.ageRating}
                </span>

                <span className="text-xs font-medium text-neutral-300">
                  {item.type === 'movie' ? item.runtime : `${item.seasonsCount} ${t.seasons}`}
                </span>

                {newEpisodesCount > 0 && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-gradient-to-r from-emerald-500 to-teal-500 text-black uppercase tracking-wider animate-pulse">
                    ★ {newEpisodesCount} {t.newBadge} EPISODES
                  </span>
                )}

                {item.franchiseUniverse && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30 flex items-center gap-1">
                    <Orbit className="w-3 h-3 text-violet-400" />
                    <span>{item.franchiseUniverse}</span>
                  </span>
                )}

                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  4K ULTRA HD
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  DOLBY ATMOS
                </span>
              </div>

              {/* Title or Official Logo */}
              {item.logoUrl ? (
                <div className="py-2">
                  <img
                    src={item.logoUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="max-h-20 sm:max-h-28 md:max-h-36 w-auto object-contain mx-auto md:mx-0 drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)]"
                  />
                  <h1 className="sr-only">{item.title}</h1>
                </div>
              ) : (
                <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                  {item.title}
                </h1>
              )}

              {item.tagline && (
                <p className="text-sm sm:text-base font-medium text-violet-300/90 italic">
                  "{item.tagline}"
                </p>
              )}

              {/* Synopsis */}
              <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed max-w-2xl">
                {item.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <button
                  id="details-play-now-btn"
                  onClick={() => onPlay(item)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold flex items-center gap-2.5 shadow-xl shadow-purple-900/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>{t.playNow}</span>
                </button>

                <button
                  id="details-toggle-mylist-btn"
                  onClick={(e) => onToggleMyList(item, e)}
                  className={`px-5 py-3 rounded-xl border font-medium flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer ${
                    inMyList
                      ? 'bg-violet-600/30 border-violet-400 text-violet-200'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  {inMyList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  <span>{inMyList ? t.inList : t.addToList}</span>
                </button>

                <button
                  id="details-trailer-btn"
                  onClick={() => onOpenTrailer(item)}
                  className="px-4 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer"
                >
                  <Clapperboard className="w-4 h-4 text-violet-400" />
                  <span>{t.watchTrailer}</span>
                </button>

                <button
                  id="details-share-btn"
                  onClick={() => onShare(item)}
                  className="p-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                  title={t.share}
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern High-End Tab Navigation Bar */}
      <div className="sticky top-16 z-30 bg-[#08080f]/90 backdrop-blur-xl border-y border-white/[0.08] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto no-scrollbar py-3" aria-label="Details Tabs">
            {/* Tab 1: Episodes / New Episodes */}
            <button
              id="tab-btn-episodes"
              onClick={() => setActiveTab('episodes')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                activeTab === 'episodes'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <Tv className="w-4 h-4" />
              <span>{item.type === 'series' ? t.tabEpisodes : t.scenesAndChapters}</span>
              {newEpisodesCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-400 text-black leading-none">
                  {newEpisodesCount} {t.newBadge}
                </span>
              )}
            </button>

            {/* Tab 2: Characters */}
            <button
              id="tab-btn-characters"
              onClick={() => setActiveTab('characters')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                activeTab === 'characters'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{t.tabCharacters}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/10 text-neutral-300 font-mono">
                {item.cast.length}
              </span>
            </button>

            {/* Tab 3: Related / Franchise Universe */}
            <button
              id="tab-btn-related"
              onClick={() => setActiveTab('related')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                activeTab === 'related'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <Orbit className="w-4 h-4" />
              <span>{t.tabRelated}</span>
              {franchiseItems.length > 0 && (
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 font-mono">
                  {franchiseItems.length}
                </span>
              )}
            </button>

            {/* Tab 4: More Like This */}
            <button
              id="tab-btn-more-like-this"
              onClick={() => setActiveTab('more_like_this')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                activeTab === 'more_like_this'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{t.tabMoreLikeThis}</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Tab Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* ========================================================================= */}
        {/* TAB 1: EPISODES / NEW EPISODES OR MOVIE CHAPTERS                          */}
        {/* ========================================================================= */}
        {activeTab === 'episodes' && (
          <div className="space-y-8 animate-fadeIn">
            {item.type === 'movie' ? (
              /* Movie Feature Film Stream & Chapters Breakdown */
              <div className="space-y-8">
                {/* Feature Presentation Stream Box */}
                <div className="rounded-3xl bg-[#0e0e18] border border-white/[0.08] p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-violet-600/30 text-violet-300 border border-violet-500/40 uppercase">
                          4K Feature Film
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                          Full Extended Stream
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                        Watch the high-definition production with spatial audio and pristine master footage.
                      </p>
                    </div>

                    <button
                      onClick={() => onPlay(item)}
                      className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all shadow-lg shadow-violet-600/30 flex items-center gap-2 self-start sm:self-auto cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>{t.playNow} ({item.runtime})</span>
                    </button>
                  </div>

                  <div
                    onClick={() => onPlay(item)}
                    className="relative aspect-video max-w-4xl rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 group cursor-pointer shadow-2xl"
                  >
                    <img
                      src={item.thumbnailUrl || item.backdropUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 group-hover:via-black/10 transition-all flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-violet-600/90 group-hover:bg-violet-500 text-white flex items-center justify-center shadow-2xl shadow-purple-950/80 transform group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 fill-current translate-x-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-black/80 text-[11px] font-bold text-emerald-400 border border-emerald-500/30">
                          MASTER CUT
                        </span>
                        <span className="text-sm font-bold text-white drop-shadow">{item.title}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-xs font-semibold text-neutral-200 border border-white/10">
                        {item.runtime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Movie Chapters / Key Sequences */}
                {item.chapters && item.chapters.length > 0 && (
                  <div className="rounded-3xl bg-[#0e0e18] border border-white/[0.08] p-6 sm:p-8">
                    <div className="mb-6">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-violet-400" />
                        <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                          {t.scenesAndChapters}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                        Jump directly into curated scenes, breakdowns, and developer commentary.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.chapters.map((chap: MovieChapter) => (
                        <div
                          key={chap.id}
                          onClick={() => onPlay(item)}
                          className="group p-4 rounded-2xl bg-white/[0.02] hover:bg-violet-950/30 border border-white/[0.05] hover:border-violet-500/40 transition-all cursor-pointer flex gap-4 items-center"
                        >
                          <div className="relative w-36 aspect-video rounded-xl overflow-hidden bg-neutral-900 shrink-0">
                            <img
                              src={chap.thumbnail}
                              alt={chap.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center">
                                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                              </div>
                            </div>
                            <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[10px] text-neutral-200">
                              {chap.timestamp}
                            </span>
                          </div>

                          <div className="min-w-0 flex-1">
                            <span className="text-[11px] font-mono font-bold text-violet-400">
                              CHAPTER 0{chap.chapterNumber}
                            </span>
                            <h4 className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors truncate">
                              {chap.title}
                            </h4>
                            <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                              {chap.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* TV Series Episodes & New Releases */
              <div className="space-y-6">
                {/* Highlight Spotlight: If there are new episodes */}
                {newEpisodesCount > 0 && (
                  <div className="rounded-3xl bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-[#0e0e18] border border-emerald-500/30 p-5 sm:p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                          <Flame className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-400 text-black uppercase tracking-wider">
                              {t.newBadge}
                            </span>
                            <h4 className="text-base font-bold text-white">
                              {newEpisodesCount} Fresh Episode{newEpisodesCount > 1 ? 's' : ''} Recently Streamed
                            </h4>
                          </div>
                          <p className="text-xs text-neutral-300 mt-1 max-w-xl">
                            Catch up on the latest storylines, 4K stages, and special performances as soon as they air.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setEpisodeFilter(episodeFilter === 'new' ? 'all' : 'new')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto ${
                          episodeFilter === 'new'
                            ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                            : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        <Filter className="w-3.5 h-3.5" />
                        <span>{episodeFilter === 'new' ? 'Show All Episodes' : `Filter ${newEpisodesCount} New Only`}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Season Selector & Episode Search Filter Bar */}
                <div className="rounded-3xl bg-[#0e0e18] border border-white/[0.08] p-5 sm:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Season Dropdown & Tab Filter */}
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Season Selector */}
                      {seasons.length > 1 ? (
                        <div className="relative">
                          <select
                            value={selectedSeasonNumber}
                            onChange={(e) => setSelectedSeasonNumber(Number(e.target.value))}
                            className="bg-[#171724] border border-white/[0.15] text-xs sm:text-sm text-white font-semibold rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:border-violet-500 cursor-pointer appearance-none"
                          >
                            {seasons.map((s) => (
                              <option key={s.seasonNumber} value={s.seasonNumber} className="bg-[#171724] text-white">
                                {s.title}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                        </div>
                      ) : (
                        <span className="font-display text-lg font-bold text-white">
                          {currentSeason?.title || 'Episodes'}
                        </span>
                      )}

                      {/* Episode Filter Pills */}
                      <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/[0.08]">
                        <button
                          onClick={() => setEpisodeFilter('all')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            episodeFilter === 'all'
                              ? 'bg-violet-600 text-white shadow'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          All ({currentSeason?.episodes.length || 0})
                        </button>
                        <button
                          onClick={() => setEpisodeFilter('new')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                            episodeFilter === 'new'
                              ? 'bg-emerald-500 text-black font-bold shadow'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          <span>{t.newBadge}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        </button>
                      </div>
                    </div>

                    {/* Search episodes */}
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search episodes by title or topic..."
                        value={episodeSearch}
                        onChange={(e) => setEpisodeSearch(e.target.value)}
                        className="w-full bg-[#171724] border border-white/[0.1] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Episode Cards List */}
                <div className="space-y-4">
                  {filteredEpisodes.length === 0 ? (
                    <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-8 text-center text-neutral-400">
                      <Info className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
                      <p className="text-sm font-medium">No episodes found matching your filter.</p>
                      <button
                        onClick={() => {
                          setEpisodeFilter('all');
                          setEpisodeSearch('');
                        }}
                        className="mt-3 px-4 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-semibold cursor-pointer"
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    filteredEpisodes.map((ep) => (
                      <div
                        key={ep.id}
                        onClick={() => onPlay(item, ep)}
                        className="group flex flex-col md:flex-row items-start md:items-center justify-between p-4 sm:p-5 rounded-3xl bg-[#0e0e18] hover:bg-violet-950/20 border border-white/[0.06] hover:border-violet-500/40 transition-all cursor-pointer gap-5 shadow-lg"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 min-w-0 w-full md:w-auto">
                          {/* Thumbnail with overlay badges */}
                          <div className="relative w-full sm:w-44 md:w-52 aspect-video rounded-2xl overflow-hidden bg-black shrink-0 shadow-md">
                            <img
                              src={ep.thumbnail}
                              alt={ep.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            
                            {/* NEW Episode Badge */}
                            {ep.isNew && (
                              <div className="absolute top-2 left-2 z-10">
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-400 text-black shadow-lg uppercase tracking-wider flex items-center gap-1">
                                  <Flame className="w-3 h-3 fill-black" />
                                  <span>{t.newBadge}</span>
                                </span>
                              </div>
                            )}

                            {/* Resolution tag */}
                            <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[9px] font-bold text-neutral-300 border border-white/10">
                              {ep.quality || '4K UHD'}
                            </span>

                            {/* Duration overlay */}
                            <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[10px] text-neutral-200">
                              {ep.duration}
                            </span>

                            {/* Hover Play Button */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-11 h-11 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                                <Play className="w-4 h-4 fill-white ml-0.5" />
                              </div>
                            </div>
                          </div>

                          {/* Episode Details */}
                          <div className="min-w-0 flex-1 space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2 py-0.5 rounded-md bg-violet-500/20 text-violet-300 text-xs font-mono font-bold border border-violet-500/30">
                                EP {ep.episodeNumber}
                              </span>
                              <h4 className="font-semibold text-white text-base sm:text-lg group-hover:text-violet-300 transition-colors">
                                {ep.title}
                              </h4>
                            </div>

                            {/* Subtitle / Air Date / Audio */}
                            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                              {ep.airDate && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-neutral-500" />
                                  <span>{ep.airDate}</span>
                                </span>
                              )}
                              {ep.audioLanguage && (
                                <>
                                  <span>•</span>
                                  <span className="text-neutral-400">{ep.audioLanguage}</span>
                                </>
                              )}
                            </div>

                            <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2 leading-relaxed pt-1">
                              {ep.description}
                            </p>
                          </div>
                        </div>

                        {/* Stream Action Button */}
                        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/[0.06]">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onPlay(item, ep);
                            }}
                            className="px-4 py-2.5 rounded-xl bg-violet-600/20 group-hover:bg-violet-600 text-violet-300 group-hover:text-white text-xs font-bold transition-all flex items-center gap-2 shadow cursor-pointer w-full md:w-auto justify-center"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>{t.play}</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CHARACTERS & CAST GALLERY                                          */}
        {/* ========================================================================= */}
        {activeTab === 'characters' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header & Filter Controls */}
            <div className="rounded-3xl bg-[#0e0e18] border border-white/[0.08] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-violet-400" />
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                    {t.tabCharacters}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Meet the idol performers, detectives, heroes, and voice talents behind the production.
                </p>
              </div>

              {/* Character Filter Buttons */}
              <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/[0.08] self-start md:self-auto">
                <button
                  onClick={() => setCharacterFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    characterFilter === 'all'
                      ? 'bg-violet-600 text-white shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {t.allCharacters} ({item.cast.length})
                </button>
                <button
                  onClick={() => setCharacterFilter('main')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    characterFilter === 'main'
                      ? 'bg-violet-600 text-white shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {t.mainCharacters}
                </button>
                <button
                  onClick={() => setCharacterFilter('supporting')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    characterFilter === 'supporting'
                      ? 'bg-violet-600 text-white shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {t.supportingCast}
                </button>
              </div>
            </div>

            {/* Character Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCharacters.map((c) => (
                <div
                  key={c.name}
                  onClick={() => setSelectedCharacter(c)}
                  className="group rounded-3xl bg-[#0e0e18] border border-white/[0.06] hover:border-violet-500/50 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-violet-950/40 cursor-pointer"
                >
                  <div>
                    {/* Portrait & Role Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <img
                          src={c.photoUrl}
                          alt={c.characterName || c.name}
                          className="w-20 h-20 rounded-2xl object-cover ring-2 ring-violet-500/40 shadow-lg group-hover:scale-105 transition-transform"
                        />
                        {c.isMain && (
                          <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-amber-400 text-black text-[9px] font-black shadow uppercase">
                            STAR
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        {c.characterBadge && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30 uppercase tracking-wider inline-block mb-1">
                            {c.characterBadge}
                          </span>
                        )}
                        <h4 className="font-display font-bold text-lg text-white group-hover:text-violet-300 transition-colors truncate">
                          {c.characterName || c.name}
                        </h4>
                        <p className="text-xs text-neutral-400 truncate">
                          {c.actorName || c.name}
                        </p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          {c.role}
                        </p>
                      </div>
                    </div>

                    {/* Personality Traits Chips */}
                    {c.personalityTraits && c.personalityTraits.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {c.personalityTraits.map((trait) => (
                          <span
                            key={trait}
                            className="px-2 py-0.5 rounded-lg text-[11px] font-medium bg-white/[0.04] text-neutral-300 border border-white/[0.06]"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Signature Quote Callout */}
                    {c.signatureQuote && (
                      <div className="p-3 rounded-2xl bg-violet-950/20 border border-violet-500/20 mb-4 text-xs text-violet-200/90 italic flex gap-2">
                        <Quote className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                        <span>"{c.signatureQuote}"</span>
                      </div>
                    )}

                    {/* Character Bio */}
                    {c.characterBio && (
                      <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                        {c.characterBio}
                      </p>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
                    <span className="text-[11px] text-neutral-500">
                      {c.voiceActor ? `Voice: ${c.voiceActor}` : 'Character Profile'}
                    </span>
                    <span className="text-violet-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <span>View Lore</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Director & Creative Vision Card */}
            {item.director && (
              <div className="rounded-3xl bg-gradient-to-r from-violet-950/40 to-[#0e0e18] border border-violet-500/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-violet-600/30 border border-violet-500/40 text-violet-300 flex items-center justify-center text-2xl shadow-xl">
                    🎬
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-violet-400 uppercase tracking-wider">
                      Executive Director & Vision
                    </span>
                    <h4 className="font-display font-bold text-xl text-white">
                      {item.director}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1 max-w-lg">
                      Oversees artistic direction, stage choreography, character styling, and musical narrative.
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-medium text-neutral-300">
                  {item.releaseYear} Production
                </div>
              </div>
            )}

            {/* Detailed Character Modal / Expanded Dialog */}
            {selectedCharacter && (
              <div 
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
                onClick={() => setSelectedCharacter(null)}
              >
                <div 
                  className="bg-[#12121e] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-scaleUp"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={selectedCharacter.photoUrl}
                      alt={selectedCharacter.characterName || selectedCharacter.name}
                      className="w-24 h-24 rounded-2xl object-cover ring-4 ring-violet-500/50 shadow-xl"
                    />
                    <div className="flex-1 min-w-0">
                      {selectedCharacter.characterBadge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30 uppercase">
                          {selectedCharacter.characterBadge}
                        </span>
                      )}
                      <h3 className="font-display font-extrabold text-2xl text-white mt-1">
                        {selectedCharacter.characterName || selectedCharacter.name}
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Actor: <span className="text-white font-medium">{selectedCharacter.actorName || selectedCharacter.name}</span>
                      </p>
                      {selectedCharacter.voiceActor && (
                        <p className="text-xs text-neutral-400">
                          Voice Artist: <span className="text-white font-medium">{selectedCharacter.voiceActor}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {selectedCharacter.signatureQuote && (
                    <div className="p-4 rounded-2xl bg-violet-950/30 border border-violet-500/30 text-sm text-violet-200 italic flex gap-3">
                      <Quote className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                      <span>"{selectedCharacter.signatureQuote}"</span>
                    </div>
                  )}

                  {selectedCharacter.personalityTraits && (
                    <div>
                      <h5 className="text-xs font-bold uppercase text-neutral-400 mb-2">
                        {t.personality}
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedCharacter.personalityTraits.map((tr) => (
                          <span key={tr} className="px-2.5 py-1 rounded-lg text-xs bg-white/10 text-white font-medium">
                            {tr}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedCharacter.characterBio && (
                    <div>
                      <h5 className="text-xs font-bold uppercase text-neutral-400 mb-1.5">
                        {t.biography}
                      </h5>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        {selectedCharacter.characterBio}
                      </p>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setSelectedCharacter(null)}
                      className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold cursor-pointer"
                    >
                      {t.close}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: RELATED / FRANCHISE & UNIVERSE                                      */}
        {/* ========================================================================= */}
        {activeTab === 'related' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Franchise Universe Banner */}
            <div className="rounded-3xl bg-gradient-to-r from-purple-950/50 via-indigo-950/40 to-[#0e0e18] border border-purple-500/30 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
              <div className="relative z-10 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-purple-500/30 text-purple-200 border border-purple-500/40 flex items-center gap-1.5 uppercase">
                    <Orbit className="w-3.5 h-3.5 text-purple-400" />
                    <span>{t.franchiseUniverse}</span>
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    CANONICAL TIMELINE
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  {franchiseUniverseName}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
                  {item.franchiseConnection || `Connected titles, spin-offs, and companion chapters sharing themes, creative direction, and storylines within the ${franchiseUniverseName}.`}
                </p>
              </div>
            </div>

            {/* Franchise Titles Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <Film className="w-5 h-5 text-violet-400" />
                  <span>Canon Series & Direct Spin-Offs</span>
                </h4>
                <span className="text-xs text-neutral-400">
                  {franchiseItems.length} Connected Work{franchiseItems.length > 1 ? 's' : ''}
                </span>
              </div>

              {franchiseItems.length === 0 ? (
                <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-8 text-center text-neutral-400">
                  <Orbit className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
                  <p className="text-sm font-medium">This is currently the debut entry in the {franchiseUniverseName}.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {franchiseItems.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onViewDetails(rel)}
                      className="group rounded-3xl bg-[#0e0e18] border border-white/[0.06] hover:border-violet-500/50 p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-950/40 cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        {/* Thumbnail image with play overlay */}
                        <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-neutral-900">
                          <img
                            src={rel.backdropUrl || rel.posterUrl}
                            alt={rel.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-violet-600 text-white uppercase shadow">
                            {rel.type === 'series' ? 'Series' : 'Film'}
                          </span>
                          <span className="absolute bottom-2 right-2 flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-black/70 px-2 py-0.5 rounded">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span>{rel.rating.toFixed(1)}</span>
                          </span>
                        </div>

                        <h5 className="font-display font-bold text-base text-white group-hover:text-violet-300 transition-colors">
                          {rel.title}
                        </h5>

                        <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                          {rel.description}
                        </p>
                      </div>

                      {/* Card Action Controls */}
                      <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                        <span className="text-xs text-neutral-400">
                          {rel.releaseYear} • {rel.genres.slice(0, 2).join(', ')}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlay(rel);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>{t.play}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: MORE LIKE THIS (RECOMMENDATION ENGINE)                             */}
        {/* ========================================================================= */}
        {activeTab === 'more_like_this' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Genre Filter Bar */}
            <div className="rounded-3xl bg-[#0e0e18] border border-white/[0.08] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-violet-400" />
                  <span>{t.tabMoreLikeThis}</span>
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                  Algorithmic matches curated based on shared genres, themes, and community ratings.
                </p>
              </div>

              {/* Genre Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                <button
                  onClick={() => setRecommendationGenre('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    recommendationGenre === 'all'
                      ? 'bg-violet-600 text-white shadow'
                      : 'bg-white/[0.04] text-neutral-400 hover:text-white'
                  }`}
                >
                  All Recommended
                </button>
                {Array.from(new Set(allMedia.flatMap((m) => m.genres))).slice(0, 5).map((g) => (
                  <button
                    key={g}
                    onClick={() => setRecommendationGenre(g)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      recommendationGenre === g
                        ? 'bg-violet-600 text-white shadow'
                        : 'bg-white/[0.04] text-neutral-400 hover:text-white'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Recommendation Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
              {moreLikeThisItems.map(({ item: m, matchScore }) => (
                <div
                  key={m.id}
                  onClick={() => onViewDetails(m)}
                  className="group rounded-2xl sm:rounded-3xl bg-[#0e0e18] border border-white/[0.06] hover:border-violet-500/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-violet-950/40 cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-[2/3] overflow-hidden bg-neutral-900">
                    <img
                      src={m.posterUrl}
                      alt={m.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Match Score Badge */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-black bg-emerald-500 text-black shadow-lg">
                        {matchScore}% {t.matchScore}
                      </span>
                    </div>

                    {/* Age Rating */}
                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-black/70 text-neutral-200 border border-white/20">
                        {m.ageRating}
                      </span>
                    </div>

                    {/* Hover Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlay(m);
                        }}
                        className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform"
                      >
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 space-y-1.5">
                    <h5 className="font-semibold text-white text-xs sm:text-sm truncate group-hover:text-violet-300 transition-colors">
                      {m.title}
                    </h5>
                    
                    <div className="flex items-center justify-between text-[11px] text-neutral-400">
                      <span>{m.releaseYear}</span>
                      <div className="flex items-center gap-1 text-amber-300 font-semibold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{m.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {m.genres.slice(0, 2).map((genre) => (
                        <span key={genre} className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.05] text-neutral-400">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
