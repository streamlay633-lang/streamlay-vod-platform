/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppPage, MediaItem, Episode, UserProfile, ToastMessage, LiveChannel } from './types';
import { INITIAL_USER, MOCK_MEDIA } from './data/mockData';
import { Navbar } from './components/Navbar';
import { ToastContainer } from './components/ToastContainer';
import { TrailerModal } from './components/TrailerModal';

// Pages
import { OnboardingPage } from './pages/OnboardingPage';
import { HomePage } from './pages/HomePage';
import { MoviesPage } from './pages/MoviesPage';
import { SeriesPage } from './pages/SeriesPage';
import { LiveTvPage } from './pages/LiveTvPage';
import { SearchPage } from './pages/SearchPage';
import { ProfilePage } from './pages/ProfilePage';
import { DetailsPage } from './pages/DetailsPage';
import { VideoPlayerPage } from './pages/VideoPlayerPage';
import { PinInput } from './components/PinInput';
import { Play, Sparkles, Tv, Shield, Heart, Lock, ShieldAlert } from 'lucide-react';
import { normalizeLanguage, SUPPORTED_LANGUAGES, getTranslation } from './utils/translations';

const STORAGE_USER_KEY = 'streamlay_user_profile';
const STORAGE_PAGE_KEY = 'streamlay_current_page';

// Helper to check whether an item is restricted by current user's parental controls
const isMediaRestricted = (media: MediaItem, user: UserProfile): boolean => {
  const isEnabled = user.parentalControlsEnabled ?? user.parentalControls?.isEnabled;
  const pin = user.parentalPin || user.parentalControls?.pin;
  if (!isEnabled || !pin) return false;

  const level = user.parentalControls?.restrictionLevel || 'TV-MA / R / M';
  const rating = (media.ageRating || '').toUpperCase();

  if (level === 'All Content') {
    return true;
  }
  if (level === 'TV-14 / PG-13') {
    return ['TV-MA', 'R', 'M', 'TV-14', 'PG-13', 'NC-17'].some((r) => rating.includes(r));
  }
  // Standard 'TV-MA / R / M'
  return ['TV-MA', 'R', 'M', 'NC-17'].some((r) => rating.includes(r));
};

export default function App() {
  // Load initial user from localStorage if present
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USER_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clear any old mock pre-seeded watchlist or history if present
        const isLegacyMockWatchlist =
          Array.isArray(parsed.myListIds) &&
          parsed.myListIds.length === 3 &&
          parsed.myListIds.includes('mov-1') &&
          parsed.myListIds.includes('ser-1') &&
          parsed.myListIds.includes('mov-3');

        const isLegacyMockHistory =
          Array.isArray(parsed.watchHistory) &&
          parsed.watchHistory.some((w: any) => w.watchedAt === '2 hours ago' || w.watchedAt === 'Yesterday');

        return {
          ...INITIAL_USER,
          ...parsed,
          myListIds: isLegacyMockWatchlist ? [] : (parsed.myListIds || []),
          watchHistory: isLegacyMockHistory ? [] : (parsed.watchHistory || []),
          favoriteIds: parsed.favoriteIds || [],
        };
      }
    } catch (e) {
      console.error('Failed to load user from localStorage', e);
    }
    return INITIAL_USER;
  });

  // Current active page (defaults to onboarding if user has no name)
  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_USER_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.name && parsed.name.trim()) {
          const savedPage = localStorage.getItem(STORAGE_PAGE_KEY);
          if (savedPage && savedPage !== 'player' && savedPage !== 'onboarding') {
            return savedPage as AppPage;
          }
          return 'home';
        }
      }
    } catch (e) {}
    return 'onboarding';
  });

  const [mediaList, setMediaList] = useState<MediaItem[]>(MOCK_MEDIA);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(() => MOCK_MEDIA[0]);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | undefined>(undefined);
  const [trailerItem, setTrailerItem] = useState<MediaItem | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist user
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
    } catch (e) {}
  }, [user]);

  // Synchronize document direction and language code for French, Arabic (RTL), and English
  useEffect(() => {
    const lang = normalizeLanguage(user.preferredLanguage);
    const langInfo = SUPPORTED_LANGUAGES[lang];
    document.documentElement.setAttribute('dir', langInfo.dir);
    document.documentElement.setAttribute('lang', langInfo.code);
  }, [user.preferredLanguage]);

  // Persist page
  useEffect(() => {
    if (currentPage !== 'player' && currentPage !== 'onboarding') {
      try {
        localStorage.setItem(STORAGE_PAGE_KEY, currentPage);
      } catch (e) {}
    }
  }, [currentPage]);

  // Toast helper
  const addToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    const newToast: ToastMessage = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle My List
  const handleToggleMyList = (item: MediaItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const inList = user.myListIds.includes(item.id);
    let updatedListIds: string[];

    if (inList) {
      updatedListIds = user.myListIds.filter((id) => id !== item.id);
      addToast('Removed from My Watchlist', `"${item.title}" was removed`, 'info');
    } else {
      updatedListIds = [...user.myListIds, item.id];
      addToast('Added to My Watchlist', `"${item.title}" was added`, 'success');
    }

    setUser((prev) => ({ ...prev, myListIds: updatedListIds }));
  };

  // Parental gate challenge state for playing sensitive titles
  const [parentalGateTarget, setParentalGateTarget] = useState<{
    item: MediaItem;
    episode?: Episode;
  } | null>(null);
  const [parentalGatePin, setParentalGatePin] = useState('');
  const [parentalGateError, setParentalGateError] = useState('');
  const [unlockedMediaIds, setUnlockedMediaIds] = useState<string[]>([]);

  // Start playback routine
  const startPlayback = (item: MediaItem, episode?: Episode) => {
    const episodeToPlay = episode || (item.type === 'series' && item.seasons?.[0]?.episodes?.[0] ? item.seasons[0].episodes[0] : undefined);
    setSelectedMedia(item);
    setSelectedEpisode(episodeToPlay);
    setCurrentPage('player');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update watch history
    setUser((prev) => {
      const existing = prev.watchHistory.filter((w) => w.mediaId !== item.id);
      return {
        ...prev,
        watchHistory: [
          {
            mediaId: item.id,
            watchedAt: 'Just now',
            progressPercentage: item.progressPercentage || 5,
          },
          ...existing,
        ],
      };
    });
  };

  // Play video with parental control verification
  const handlePlay = (item: MediaItem, episode?: Episode) => {
    // Check if item is restricted and not yet unlocked in current session
    if (isMediaRestricted(item, user) && !unlockedMediaIds.includes(item.id)) {
      setParentalGateTarget({ item, episode });
      setParentalGatePin('');
      setParentalGateError('');
      return;
    }

    startPlayback(item, episode);
  };

  // Verify PIN entered in playback parental gate
  const handleVerifyParentalGate = () => {
    const correctPin = user.parentalPin || user.parentalControls?.pin;
    if (!correctPin || parentalGatePin === correctPin) {
      if (parentalGateTarget) {
        setUnlockedMediaIds((prev) => [...prev, parentalGateTarget.item.id]);
        startPlayback(parentalGateTarget.item, parentalGateTarget.episode);
        setParentalGateTarget(null);
        addToast('Content Unlocked', `Parental PIN verified for "${parentalGateTarget.item.title}".`, 'success');
      }
    } else {
      setParentalGateError('Incorrect 4-digit PIN. Please try again.');
    }
  };

  // Update dynamic watch progress from active player
  const handleProgressUpdate = (mediaId: string, progressPercentage: number) => {
    setUser((prev) => {
      const existingIndex = prev.watchHistory.findIndex((w) => w.mediaId === mediaId);
      if (existingIndex >= 0) {
        const updated = [...prev.watchHistory];
        updated[existingIndex] = {
          ...updated[existingIndex],
          progressPercentage,
          watchedAt: 'Just now',
        };
        return { ...prev, watchHistory: updated };
      }
      return {
        ...prev,
        watchHistory: [
          {
            mediaId,
            watchedAt: 'Just now',
            progressPercentage,
          },
          ...prev.watchHistory,
        ],
      };
    });
  };

  // View details
  const handleViewDetails = (item: MediaItem) => {
    setSelectedMedia(item);
    setSelectedEpisode(undefined);
    setCurrentPage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open trailer modal
  const handleOpenTrailer = (item: MediaItem) => {
    setTrailerItem(item);
  };

  // Share item (copies link and triggers toast)
  const handleShare = (item: MediaItem) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Copied to Clipboard', `Share "${item.title}" with your friends`, 'info');
    } else {
      addToast('Shared', `"${item.title}" ready to share`, 'info');
    }
  };

  // Complete onboarding
  const handleCompleteOnboarding = (name: string, avatarUrl?: string) => {
    setUser((prev) => ({
      ...prev,
      name,
      ...(avatarUrl ? { avatarUrl } : {}),
    }));
    setCurrentPage('home');
    addToast(`Welcome to StreamLay, ${name}!`, 'Your ultra-cinematic 4K streaming journey begins now.');
  };

  // Logout / Switch Profile
  const handleLogout = () => {
    setCurrentPage('onboarding');
    addToast('Signed Out', 'You have returned to the profile select screen.', 'info');
  };

  // Update user profile fields
  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
    addToast('Profile Updated', 'Your personal account preferences were saved.', 'success');
  };

  // Handle playing next episode in series
  const handlePlayNextEpisode = () => {
    if (!selectedMedia || !selectedMedia.seasons) return;
    const episodes = selectedMedia.seasons.flatMap((s) => s.episodes);
    if (!selectedEpisode) {
      if (episodes.length > 1) {
        setSelectedEpisode(episodes[1]);
        addToast('Playing Next Episode', episodes[1].title);
      }
      return;
    }
    const curIdx = episodes.findIndex((e) => e.id === selectedEpisode.id);
    if (curIdx >= 0 && curIdx < episodes.length - 1) {
      setSelectedEpisode(episodes[curIdx + 1]);
      addToast('Playing Next Episode', episodes[curIdx + 1].title);
    } else {
      addToast('Series Complete', 'You have reached the latest available episode.');
    }
  };

  return (
    <div className="min-h-screen bg-[#07070b] text-white flex flex-col justify-between selection:bg-purple-600 selection:text-white">
      {/* Top Navigation Bar (Hidden during Onboarding and Fullscreen Player) */}
      {currentPage !== 'onboarding' && currentPage !== 'player' && (
        <Navbar
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          user={user}
          onOpenSearch={() => {
            setCurrentPage('search');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onLogout={handleLogout}
          onUpdateUser={handleUpdateUser}
        />
      )}

      {/* Main Page Routing Container */}
      <main className="flex-1">
        {/* Page 1: Enter Your Name Page (Onboarding) */}
        {currentPage === 'onboarding' && (
          <OnboardingPage
            onComplete={handleCompleteOnboarding}
            initialName={user.name}
            initialAvatar={user.avatarUrl}
            lang={user.preferredLanguage}
          />
        )}

        {/* Page 2: Home Page */}
        {currentPage === 'home' && (
          <HomePage
            mediaList={mediaList}
            user={user}
            onToggleMyList={handleToggleMyList}
            onPlay={handlePlay}
            onViewDetails={handleViewDetails}
            onOpenTrailer={handleOpenTrailer}
            onNavigatePage={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Page 3: Search Page */}
        {currentPage === 'search' && (
          <SearchPage
            mediaList={mediaList}
            user={user}
            onToggleMyList={handleToggleMyList}
            onPlay={handlePlay}
            onViewDetails={handleViewDetails}
          />
        )}

        {/* Page 4: Live TV Page */}
        {currentPage === 'livetv' && <LiveTvPage lang={user.preferredLanguage} />}

        {/* Page 5: Profile Page */}
        {currentPage === 'profile' && (
          <ProfilePage
            user={user}
            mediaList={mediaList}
            onUpdateUser={handleUpdateUser}
            onToggleMyList={handleToggleMyList}
            onPlay={handlePlay}
            onViewDetails={handleViewDetails}
            onLogout={handleLogout}
          />
        )}

        {/* Page 6: Details Page */}
        {currentPage === 'details' && selectedMedia && (
          <DetailsPage
            item={selectedMedia}
            allMedia={mediaList}
            user={user}
            onToggleMyList={handleToggleMyList}
            onPlay={handlePlay}
            onOpenTrailer={handleOpenTrailer}
            onViewDetails={handleViewDetails}
            onShare={handleShare}
          />
        )}

        {/* Page 7: Video Player Page */}
        {currentPage === 'player' && selectedMedia && (
          <VideoPlayerPage
            item={selectedMedia}
            episode={selectedEpisode}
            lang={user.preferredLanguage}
            onBack={() => {
              // Return to details or home
              setCurrentPage(selectedMedia ? 'details' : 'home');
            }}
            onPlayNextEpisode={selectedMedia.type === 'series' ? handlePlayNextEpisode : undefined}
            onProgressUpdate={handleProgressUpdate}
            nextItem={mediaList.find((m) => m.id !== selectedMedia.id)}
          />
        )}

        {/* Page 8: Series Page */}
        {currentPage === 'series' && (
          <SeriesPage
            seriesList={mediaList.filter((m) => m.type === 'series')}
            user={user}
            onToggleMyList={handleToggleMyList}
            onPlay={handlePlay}
            onViewDetails={handleViewDetails}
            onOpenTrailer={handleOpenTrailer}
          />
        )}

        {/* Page 9: Movies Page */}
        {currentPage === 'movies' && (
          <MoviesPage
            moviesList={mediaList.filter((m) => m.type === 'movie')}
            user={user}
            onToggleMyList={handleToggleMyList}
            onPlay={handlePlay}
            onViewDetails={handleViewDetails}
            onOpenTrailer={handleOpenTrailer}
          />
        )}
      </main>

      {/* Global Trailer Modal */}
      <TrailerModal
        item={trailerItem}
        lang={user.preferredLanguage}
        onClose={() => setTrailerItem(null)}
        onPlayFull={(item) => {
          setTrailerItem(null);
          handlePlay(item);
        }}
      />

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Footer (Visible on normal browsing pages) */}
      {currentPage !== 'onboarding' && currentPage !== 'player' && (
        <footer className="border-t border-white/[0.08] bg-[#050508] py-12 px-4 sm:px-6 lg:px-8 relative z-10 text-xs text-neutral-400">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-600/30">
                <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
              </div>
              <span className="font-display font-extrabold text-xl text-white">
                Stream<span className="text-violet-400">Lay</span>
              </span>
              <span className="text-neutral-500">|</span>
              <span>Next-Gen Cinema & Live Broadcasting</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-400">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage('movies');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Movies
              </button>
              <button
                onClick={() => {
                  setCurrentPage('series');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Series
              </button>
              <button
                onClick={() => {
                  setCurrentPage('livetv');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Live TV Guide
              </button>
              <button
                onClick={() => {
                  setCurrentPage('profile');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Account & Settings
              </button>
            </div>

            <div className="text-center md:text-right text-neutral-500">
              <p>&copy; {new Date().getFullYear()} StreamLay Inc. All rights reserved.</p>
              <p className="text-[11px] text-neutral-600 mt-0.5">
                Dolby Vision, Dolby Atmos, and 4K HDR are registered trademarks.
              </p>
            </div>
          </div>
        </footer>
      )}

      {/* Parental Gate Modal for Sensitive Playback */}
      {parentalGateTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12121e] rounded-3xl border border-white/10 p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-500/20 text-red-300 border border-red-500/30">
                {parentalGateTarget.item.ageRating || 'RATED M'} • {getTranslation('parentalLockActive', user.preferredLanguage)}
              </span>
              <h3 className="font-display text-xl font-bold text-white mt-2">
                {getTranslation('parentalPinRequiredModal', user.preferredLanguage)}
              </h3>
              <p className="text-xs text-neutral-300 mt-1">
                Access to <span className="font-semibold text-white">"{parentalGateTarget.item.title}"</span> is restricted by parental controls. {getTranslation('enterPinToUnlock', user.preferredLanguage)}.
              </p>
            </div>

            <div className="py-2">
              <PinInput
                idPrefix="gate-pin"
                value={parentalGatePin}
                onChange={(val) => {
                  setParentalGatePin(val);
                  setParentalGateError('');
                }}
                isMasked={true}
                autoFocus={true}
                hasError={Boolean(parentalGateError)}
              />
            </div>

            {parentalGateError && (
              <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">
                {parentalGateError}
              </div>
            )}

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setParentalGateTarget(null)}
                className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-neutral-300 text-xs font-semibold cursor-pointer"
              >
                {getTranslation('cancel', user.preferredLanguage)}
              </button>
              <button
                type="button"
                disabled={parentalGatePin.length !== 4}
                onClick={handleVerifyParentalGate}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-violet-600 hover:from-amber-500 hover:to-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-lg shadow-amber-600/20 cursor-pointer"
              >
                {getTranslation('verifyAndUnlock', user.preferredLanguage)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
