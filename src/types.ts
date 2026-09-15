export type MediaType = 'movie' | 'series';

export interface Episode {
  id: string;
  episodeNumber: number;
  seasonNumber: number;
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

export interface Season {
  seasonNumber: number;
  title: string;
  episodes: Episode[];
}

export interface CastMember {
  name: string;
  role: string;
  photoUrl: string;
}

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  tagline?: string;
  description: string;
  backdropUrl: string;
  posterUrl: string;
  rating: number; // e.g. 8.9
  releaseYear: number;
  runtime?: string; // e.g. "2h 14m" (movies)
  seasonsCount?: number; // e.g. 3 (series)
  genres: string[];
  ageRating: string; // e.g. "PG-13", "TV-MA", "R"
  isTrending?: boolean;
  isPopular?: boolean;
  isNewRelease?: boolean;
  isTopRated?: boolean;
  isFeatured?: boolean;
  director?: string;
  cast: CastMember[];
  videoUrl: string;
  trailerUrl: string;
  seasons?: Season[];
  // For continue watching
  progressPercentage?: number;
  lastWatchedTimestamp?: string;
}

export interface LiveProgram {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  description: string;
  rating: string;
  category: string;
}

export interface LiveChannel {
  id: string;
  number: number;
  name: string;
  category: 'News' | 'Sports' | 'Entertainment' | 'Movies' | 'Kids' | 'Music' | 'Algeria' | string;
  groupTitle?: string;
  country?: string;
  logo: string;
  badge: string;
  viewers: string;
  streamUrl: string;
  previewImage: string;
  currentProgram: LiveProgram;
  upcomingPrograms: LiveProgram[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  plan: string;
  renewalDate: string;
  preferredLanguage: string;
  streamQuality: 'Auto (4K)' | '1080p FHD' | '720p HD';
  autoplayNext: boolean;
  soundEffects: boolean;
  emailNotifications: boolean;
  myListIds: string[];
  watchHistory: {
    mediaId: string;
    watchedAt: string;
    progressPercentage: number;
  }[];
  favoriteIds: string[];
}

export type AppPage =
  | 'onboarding'
  | 'home'
  | 'movies'
  | 'series'
  | 'livetv'
  | 'search'
  | 'profile'
  | 'details'
  | 'player';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'warning';
}
