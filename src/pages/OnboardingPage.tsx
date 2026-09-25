import React, { useState } from 'react';
import {
  Play,
  ArrowRight,
  Sparkles,
  Film,
  ShieldCheck,
  Check,
  Star,
  Tv,
  Clapperboard,
  Pause,
  Info,
  X,
} from 'lucide-react';
import { PROFILE_PICTURE_CATEGORIES, ONBOARDING_TICKER_POSTERS } from '../data/mockData';
import { TickerPoster } from '../types';
import { getTranslation, getGenreTranslation } from '../utils/translations';

interface OnboardingPageProps {
  onComplete: (name: string, avatarUrl?: string) => void;
  initialName?: string;
  initialAvatar?: string;
  lang?: string;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({
  onComplete,
  initialName = '',
  initialAvatar,
  lang,
}) => {
  const activeLang = lang || (typeof document !== 'undefined' ? document.documentElement.lang : 'en');
  const t = (key: Parameters<typeof getTranslation>[0]) => getTranslation(key, activeLang);

  const [name, setName] = useState(initialName);
  const [error, setError] = useState('');
  const [isTickerPaused, setIsTickerPaused] = useState(false);
  const [selectedPosterPreview, setSelectedPosterPreview] = useState<TickerPoster | null>(null);

  // Default to Inori Konomi or initialAvatar
  const onegaiAipriAvatars = PROFILE_PICTURE_CATEGORIES[0]?.items || [];
  const [selectedAvatar, setSelectedAvatar] = useState<string>(
    initialAvatar || onegaiAipriAvatars[3]?.url || onegaiAipriAvatars[0]?.url || ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError(t('nameRequiredError'));
      return;
    }
    onComplete(trimmed, selectedAvatar);
  };

  // Duplicate arrays to achieve seamless infinite marquee loop
  const tickerRow1 = [...ONBOARDING_TICKER_POSTERS, ...ONBOARDING_TICKER_POSTERS, ...ONBOARDING_TICKER_POSTERS];
  const reversedPosters = [...ONBOARDING_TICKER_POSTERS].reverse();
  const tickerRow2 = [...reversedPosters, ...reversedPosters, ...reversedPosters];

  return (
    <div
      id="onboarding-page"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#060609] text-white select-none"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC BACKGROUND POSTERS TICKER WALL                              */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-900/25 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[400px] bg-violet-800/20 blur-[130px] rounded-full pointer-events-none" />

        {/* Diagonal Perspective Poster Wall Container */}
        <div className="absolute inset-0 flex flex-col justify-around py-4 gap-6 transform -rotate-1 scale-105">
          {/* Ticker Row 1 (Scrolling Left) */}
          <div className="w-full overflow-hidden flex">
            <div
              className={`flex gap-5 py-2 ${
                isTickerPaused ? '' : 'animate-ticker-left'
              }`}
              style={{ animationDuration: '48s' }}
            >
              {tickerRow1.map((item, idx) => (
                <div
                  key={`bg-row1-${item.id}-${idx}`}
                  className="w-36 sm:w-44 md:w-48 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 shrink-0 relative bg-neutral-900 group transform transition-all duration-300"
                >
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-violet-600/80 text-white w-max mb-1">
                      {item.type}
                    </span>
                    <span className="text-xs font-bold text-white truncate drop-shadow-md">
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ticker Row 2 (Scrolling Right) */}
          <div className="w-full overflow-hidden flex">
            <div
              className={`flex gap-5 py-2 ${
                isTickerPaused ? '' : 'animate-ticker-right'
              }`}
              style={{ animationDuration: '46s' }}
            >
              {tickerRow2.map((item, idx) => (
                <div
                  key={`bg-row2-${item.id}-${idx}`}
                  className="w-36 sm:w-44 md:w-48 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 shrink-0 relative bg-neutral-900 group transform transition-all duration-300"
                >
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-pink-600/80 text-white w-max mb-1">
                      {item.type}
                    </span>
                    <span className="text-xs font-bold text-white truncate drop-shadow-md">
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Master Darkening Vignette Gradients */}
        <div className="absolute inset-0 bg-[#060609]/75 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060609] via-transparent to-[#060609]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060609] via-transparent to-[#060609]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#060609_85%)]" />
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP INTERACTIVE TICKER STRIP (TV SERIES & MOVIES)                      */}
      {/* ========================================================================= */}
      <header className="relative z-20 w-full pt-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 bg-black/60 backdrop-blur-xl border border-white/[0.08] px-4 py-2.5 rounded-2xl shadow-xl">
          {/* Brand Tag & Title */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-600/40">
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-lg text-white tracking-tight">
                  Stream<span className="text-violet-400">Lay</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-500/30">
                  4K CINEMA
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t('featuredTickerSubtitle')}
              </p>
            </div>
          </div>

          {/* Interactive Fast Ticker Marquee of Posters */}
          <div
            id="onboarding-posters-ticker"
            className="flex-1 overflow-hidden relative group/ticker py-0.5"
            title={t('clickToPreview')}
          >
            {/* Edge Fade Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none" />

            <div
              className={`flex items-center gap-2.5 ${
                isTickerPaused ? '' : 'animate-ticker-fast-left'
              }`}
            >
              {tickerRow1.map((item, idx) => (
                <button
                  key={`top-ticker-${item.id}-${idx}`}
                  type="button"
                  onClick={() => setSelectedPosterPreview(item)}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.12] border border-white/[0.07] hover:border-violet-500/50 transition-all cursor-pointer shrink-0 text-left"
                >
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    className="w-7 h-10 rounded-md object-cover ring-1 ring-white/10"
                    loading="lazy"
                  />
                  <div className="flex flex-col pr-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white truncate max-w-[130px]">
                        {item.title}
                      </span>
                      {item.type === 'Movie' ? (
                        <Clapperboard className="w-3 h-3 text-amber-400 shrink-0" />
                      ) : (
                        <Tv className="w-3 h-3 text-violet-400 shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                      <span className="text-pink-300 font-semibold">{item.badge || (item.type === 'Movie' ? t('movie') : t('tvSeries'))}</span>
                      <span>•</span>
                      <span className="flex items-center text-amber-300 font-bold">
                        <Star className="w-2.5 h-2.5 fill-amber-400 mr-0.5" />
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Pause / Info Ticker Control */}
          <div className="flex items-center gap-1.5 shrink-0 self-end md:self-auto">
            <button
              type="button"
              onClick={() => setIsTickerPaused(!isTickerPaused)}
              className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1 border border-white/[0.06]"
              title={isTickerPaused ? t('playTicker') : t('pauseTicker')}
            >
              {isTickerPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span className="text-[11px] font-medium hidden sm:inline">{t('playTicker')}</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium hidden sm:inline">{t('pauseTicker')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. CENTER ONBOARDING CARD                                                 */}
      {/* ========================================================================= */}
      <main className="relative z-20 w-full max-w-xl mx-auto px-4 py-6">
        <div className="rounded-3xl bg-[#0f0f18]/92 backdrop-blur-2xl border border-white/[0.1] p-6 sm:p-8 shadow-2xl shadow-black/90">
          {/* Card Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-3 shadow-lg shadow-violet-950/40">
              <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              <span>{t('unlimitedShowsMovies')}</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              {t('whoIsWatching')}
            </h1>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
              {t('onboardingDesc')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
              <label
                htmlFor="user-name-input"
                className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2"
              >
                {t('profileNameOrNickname')}
              </label>
              <div className="relative">
                <input
                  id="user-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder={t('namePlaceholder')}
                  maxLength={32}
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.12] text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 text-sm font-medium transition-all"
                />
                <Sparkles className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400/60 pointer-events-none" />
              </div>
              {error && <p className="text-xs text-rose-400 mt-2 font-medium">{error}</p>}
            </div>

            {/* Quick Profile Suggestions */}
            <div className="flex items-center flex-wrap gap-2 pt-0.5">
              <span className="text-[11px] text-neutral-500 font-medium">{t('suggestions')}</span>
              {['Cinema Lover', 'Alex', 'Jordan', 'Guest'].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setName(suggestion);
                    if (error) setError('');
                  }}
                  className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/[0.06] transition-colors cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Onegai AiPri Avatar Selection */}
            <div className="pt-2 border-t border-white/[0.06]">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>{t('chooseProfileAvatar')}</span>
                </span>
                <span className="text-[10px] font-bold text-pink-300 bg-pink-500/20 px-2 py-0.5 rounded-full border border-pink-500/30">
                  {t('onegaiAiPriSeries')}
                </span>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {onegaiAipriAvatars.map((avatar) => {
                  const isSelected = selectedAvatar === avatar.url;
                  return (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => setSelectedAvatar(avatar.url)}
                      title={avatar.name}
                      className={`group relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer p-0.5 flex flex-col items-center ${
                        isSelected
                          ? 'border-pink-500 bg-pink-500/25 scale-105 shadow-lg shadow-pink-500/30'
                          : 'border-white/[0.08] hover:border-pink-400/50 bg-white/[0.03] opacity-75 hover:opacity-100'
                      }`}
                    >
                      <div className="w-full aspect-square rounded-lg overflow-hidden">
                        <img
                          src={avatar.url}
                          alt={avatar.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-pink-500 text-white flex items-center justify-center shadow">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-neutral-400 text-center mt-2">
                {t('avatar')}: <strong className="text-pink-300">{onegaiAipriAvatars.find((a) => a.url === selectedAvatar)?.name || 'Custom Avatar'}</strong>
              </p>
            </div>

            {/* Submit Button */}
            <button
              id="onboarding-continue-btn"
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-900/40 hover:shadow-purple-900/60 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              <span>{t('startWatchingNow')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Value Props Footer */}
          <div className="mt-5 pt-4 border-t border-white/[0.06] grid grid-cols-2 gap-3 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-400">
              <Film className="w-3.5 h-3.5 text-violet-400" />
              <span>{t('ultraHdAndSound')}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>{t('instantPlaybackNoAds')}</span>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. BOTTOM POSTERS SHOWCASE TICKER (DISCOVER CATALOG)                      */}
      {/* ========================================================================= */}
      <footer className="relative z-20 w-full pb-4 px-4">
        <div className="max-w-7xl mx-auto bg-black/65 backdrop-blur-xl border border-white/[0.08] p-3.5 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>{t('streamingNowOn')}</span>
              </span>
              <span className="hidden sm:inline-block text-[11px] text-neutral-400">
                • {t('featuredTickerSubtitle')}
              </span>
            </div>
            <span className="text-[11px] text-violet-400 font-semibold">
              {t('clickToPreview')}
            </span>
          </div>

          {/* Grid of Posters with Exact URLs */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
            {ONBOARDING_TICKER_POSTERS.map((item) => (
              <button
                key={`footer-poster-${item.id}`}
                type="button"
                onClick={() => setSelectedPosterPreview(item)}
                className="group relative rounded-xl overflow-hidden border border-white/[0.08] hover:border-violet-500 bg-[#12121e] aspect-[2/3] transition-all duration-300 hover:scale-[1.04] hover:shadow-xl hover:shadow-purple-900/30 cursor-pointer text-left"
              >
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />

                {/* Badge Overlay */}
                <div className="absolute top-1.5 left-1.5 z-10">
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-md ${
                      item.type === 'Movie'
                        ? 'bg-amber-500 text-black'
                        : 'bg-violet-600 text-white'
                    }`}
                  >
                    {item.type === 'Movie' ? t('movie') : t('tvSeries')}
                  </span>
                </div>

                {/* Rating badge */}
                <div className="absolute top-1.5 right-1.5 z-10 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded text-[9px] font-bold text-amber-300 flex items-center">
                  ★ {item.rating}
                </div>

                {/* Bottom title gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-2 opacity-90 group-hover:opacity-100 transition-opacity">
                  <p className="text-[11px] font-bold text-white truncate line-clamp-1">
                    {item.title}
                  </p>
                  <span className="text-[9px] text-neutral-400 truncate">
                    {getGenreTranslation(item.genres[0], activeLang)} • {item.releaseYear}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 5. QUICK POSTER PREVIEW MODAL                                             */}
      {/* ========================================================================= */}
      {selectedPosterPreview && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPosterPreview(null)}
        >
          <div
            className="bg-[#10101c] rounded-3xl border border-white/[0.12] overflow-hidden max-w-lg w-full shadow-2xl relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Poster Header with Backdrop */}
            <div className="relative h-48 sm:h-56 bg-neutral-900 overflow-hidden">
              <img
                src={selectedPosterPreview.backdropUrl || selectedPosterPreview.posterUrl}
                alt={selectedPosterPreview.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10101c] via-[#10101c]/40 to-transparent" />

              <button
                type="button"
                onClick={() => setSelectedPosterPreview(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                title={t('close')}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 flex items-end gap-3.5">
                <img
                  src={selectedPosterPreview.posterUrl}
                  alt={selectedPosterPreview.title}
                  className="w-16 sm:w-20 aspect-[2/3] object-cover rounded-xl border-2 border-white/20 shadow-2xl shrink-0"
                />
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-violet-600 text-white mb-1 inline-block">
                    {selectedPosterPreview.type === 'Movie' ? t('movie') : t('tvSeries')}
                  </span>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-white drop-shadow-md">
                    {selectedPosterPreview.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-neutral-300 mt-0.5">
                    <span className="text-amber-400 font-bold flex items-center">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                      {selectedPosterPreview.rating}
                    </span>
                    <span>•</span>
                    <span>{selectedPosterPreview.releaseYear}</span>
                    <span>•</span>
                    <span>{selectedPosterPreview.genres.map(g => getGenreTranslation(g, activeLang)).join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Poster Body */}
            <div className="p-5 space-y-4">
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {t('onboardingPreviewDesc')}
              </p>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setSelectedPosterPreview(null)}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t('close')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPosterPreview(null);
                    // focus the name input
                    document.getElementById('user-name-input')?.focus();
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-xs font-bold text-white transition-all cursor-pointer shadow-lg shadow-purple-900/30 flex items-center gap-1.5"
                >
                  <span>{t('startWatchingNow')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
