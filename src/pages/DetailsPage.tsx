import React, { useState } from 'react';
import { 
  Play, 
  Plus, 
  Check, 
  Share2, 
  Clapperboard, 
  Star, 
  Clock, 
  Calendar, 
  Layers, 
  ChevronDown,
  Volume2,
  Film,
  Sparkles
} from 'lucide-react';
import { MediaItem, Episode, UserProfile } from '../types';
import { ContentRow } from '../components/ContentRow';

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

  // Season management for series
  const seasons = item.seasons || [];
  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState<number>(
    seasons.length > 0 ? seasons[0].seasonNumber : 1
  );

  const currentSeason = seasons.find((s) => s.seasonNumber === selectedSeasonNumber) || seasons[0];

  // Related recommended items (same genre or type)
  const relatedItems = allMedia
    .filter((m) => m.id !== item.id && (m.genres.some((g) => item.genres.includes(g)) || m.type === item.type))
    .slice(0, 8);

  return (
    <div id="details-page" className="min-h-screen pb-24 overflow-x-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070b] via-[#07070b]/60 to-black/40" />
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
                  {item.type === 'series' ? 'TV Series' : 'Feature Film'}
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
                  {item.type === 'movie' ? item.runtime : `${item.seasonsCount} Seasons`}
                </span>
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
                  <span>Play Now</span>
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
                  <span>{inMyList ? 'In My List' : 'Add to My List'}</span>
                </button>

                <button
                  id="details-trailer-btn"
                  onClick={() => onOpenTrailer(item)}
                  className="px-4 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer"
                >
                  <Clapperboard className="w-4 h-4 text-violet-400" />
                  <span>Trailer</span>
                </button>

                <button
                  id="details-share-btn"
                  onClick={() => onShare(item)}
                  className="p-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                  title="Share with friends"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-10">
        {/* Cast & Director Section */}
        <section className="rounded-3xl bg-[#0e0e18] border border-white/[0.06] p-6 sm:p-8">
          <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Film className="w-5 h-5 text-violet-400" />
            <span>Cast & Production</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {item.cast.map((c) => (
              <div
                key={c.name}
                className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center flex flex-col items-center hover:bg-white/[0.05] transition-all"
              >
                <img
                  src={c.photoUrl}
                  alt={c.name}
                  className="w-16 h-16 rounded-full object-cover mb-2 ring-2 ring-violet-500/30"
                />
                <h4 className="font-semibold text-white text-xs truncate w-full">{c.name}</h4>
                <p className="text-[11px] text-neutral-400 truncate w-full mt-0.5">{c.role}</p>
              </div>
            ))}

            {item.director && (
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-violet-600/20 text-violet-300 flex items-center justify-center text-lg font-bold mb-2">
                  🎬
                </div>
                <h4 className="font-semibold text-white text-xs truncate w-full">{item.director}</h4>
                <p className="text-[11px] text-violet-400 font-semibold uppercase mt-0.5">Director</p>
              </div>
            )}
          </div>
        </section>

        {/* Season & Episode Selector for Series */}
        {item.type === 'series' && seasons.length > 0 && (
          <section className="rounded-3xl bg-[#0e0e18] border border-white/[0.06] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">Episodes</h3>
                <p className="text-xs text-neutral-400">Select a season to browse and stream all episodes in 4K.</p>
              </div>

              {/* Season Selector Dropdown */}
              <div className="relative">
                <select
                  value={selectedSeasonNumber}
                  onChange={(e) => setSelectedSeasonNumber(Number(e.target.value))}
                  className="bg-[#171724] border border-white/[0.15] text-sm text-white font-semibold rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:border-violet-500 cursor-pointer appearance-none"
                >
                  {seasons.map((s) => (
                    <option key={s.seasonNumber} value={s.seasonNumber} className="bg-[#171724] text-white">
                      {s.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            {/* Episode Cards Grid */}
            <div className="space-y-3">
              {currentSeason?.episodes.map((ep) => (
                <div
                  key={ep.id}
                  onClick={() => onPlay(item, ep)}
                  className="group flex flex-col md:flex-row items-start md:items-center justify-between p-3 sm:p-4 rounded-2xl bg-white/[0.02] hover:bg-violet-950/20 border border-white/[0.04] hover:border-violet-500/40 transition-all cursor-pointer gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0 w-full md:w-auto">
                    {/* Thumbnail */}
                    <div className="relative w-28 sm:w-36 aspect-video rounded-xl overflow-hidden bg-black shrink-0">
                      <img
                        src={ep.thumbnail}
                        alt={ep.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center shadow">
                          <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-violet-400">EP {ep.episodeNumber}</span>
                        <h4 className="font-semibold text-white text-sm sm:text-base truncate group-hover:text-violet-300 transition-colors">
                          {ep.title}
                        </h4>
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                        {ep.description}
                      </p>
                    </div>
                  </div>

                  {/* Duration & Play button */}
                  <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 shrink-0 pl-32 md:pl-0">
                    <span className="text-xs font-medium text-neutral-400">{ep.duration}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlay(item, ep);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.06] group-hover:bg-violet-600 text-neutral-300 group-hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Play</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Content Row */}
        {relatedItems.length > 0 && (
          <ContentRow
            title="More Like This"
            subtitle={`Recommended titles fans of ${item.title} also loved`}
            items={relatedItems}
            myListIds={user.myListIds}
            onToggleMyList={onToggleMyList}
            onPlay={onPlay}
            onViewDetails={onViewDetails}
          />
        )}
      </div>
    </div>
  );
};
