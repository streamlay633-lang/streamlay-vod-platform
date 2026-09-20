import { MediaItem, LiveChannel, UserProfile, ProfilePictureCategory, TickerPoster } from '../types';

export const ONBOARDING_TICKER_POSTERS: TickerPoster[] = [
  {
    id: 'ticker-star-detective-precure',
    title: 'Star Detective Precure!',
    type: 'TV Series',
    posterUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Star%20Detective%20Precure!/Poster/Star%20Detective%20Precure!%20-%20Poster.webp',
    backdropUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Star%20Detective%20Precure!/Backdrop/Star%20Detective%20Precure!%20-%20Backdrop.webp',
    badge: 'NEW SERIES',
    genres: ['Animation', 'Mystery', 'Fantasy'],
    rating: 9.5,
    releaseYear: 2026,
  },
  {
    id: 'ticker-platformer-the-show',
    title: 'Platformer The Show',
    type: 'TV Series',
    posterUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Platformer%20The%20Show/Poster/Platformer%20The%20Show%20-%20Poster.png',
    backdropUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Platformer%20The%20Show/Backdrop/Platformer%20The%20Show%20-%20Backdrop.png',
    badge: 'ORIGINAL',
    genres: ['Gaming', 'Adventure', 'Comedy'],
    rating: 9.0,
    releaseYear: 2024,
  },
  {
    id: 'ticker-onegai-aipri',
    title: 'Onegai AiPri',
    type: 'TV Series',
    posterUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Onegai%20Aipri/Poster/Onegai%20Aipri%20-%20Poster.jpg',
    backdropUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Onegai%20Aipri/Backdrop/Onegai%20Aipri%20-%20Backdrop.jpeg',
    badge: 'NEW RELEASE',
    genres: ['Idol', 'Music', 'Animation'],
    rating: 9.3,
    releaseYear: 2025,
  },
  {
    id: 'ticker-gta-6',
    title: 'Grand Theft Auto VI: An Extended Look',
    type: 'Movie',
    posterUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Movies/Grand%20Theft%20Auto%20VI:%20An%20Extended%20Look/Poster/Grand%20Theft%20Auto%20VI%20An%20Extended%20Look%20-%20Poster.webp',
    backdropUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Movies/Grand%20Theft%20Auto%20VI:%20An%20Extended%20Look/Backdrop/Grand%20Theft%20Auto%20VI%20An%20Extended%20Look%20-%20Backdrop.webp',
    badge: '4K CINEMA',
    genres: ['Action', 'Crime', 'Documentary'],
    rating: 9.9,
    releaseYear: 2025,
  },
  {
    id: 'ticker-nyanko-days',
    title: 'Nyanko Days',
    type: 'TV Series',
    posterUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Nyanko%20Days/Poster/Nyanko%20Days%20-%20Poster.jpg',
    backdropUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Nyanko%20Days/Backdrop/Nyanko%20Days%20-%20Backdrop.webp',
    badge: 'FAN FAVORITE',
    genres: ['Slice of Life', 'Comedy', 'Animation'],
    rating: 8.8,
    releaseYear: 2017,
  },
  {
    id: 'ticker-man-vs-baby',
    title: 'Man vs Baby',
    type: 'TV Series',
    posterUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Man%20vs%20Baby/Poster/Man%20vs%20Baby%20-%20Poster.jpg',
    backdropUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Man%20vs%20Baby/Backdrop/Man%20vs%20Baby%20-%20Backdrop.jpg',
    badge: 'TRENDING',
    genres: ['Comedy', 'Family'],
    rating: 8.9,
    releaseYear: 2025,
  },
  {
    id: 'ticker-himitsu-no-aipri',
    title: 'Himitsu no AiPri',
    type: 'TV Series',
    posterUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Himitsu%20no%20AiPri/Poster/Himitsu%20no%20AiPri%20-%20Poster.webp',
    backdropUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Himitsu%20no%20AiPri/Backdrop/Himitsu%20no%20AiPri%20-%20Backdrop.jpg',
    badge: 'TOP RATED',
    genres: ['Animation', 'Music', 'Fantasy'],
    rating: 9.2,
    releaseYear: 2024,
  }
];

export const PROFILE_PICTURE_CATEGORIES: ProfilePictureCategory[] = [
  {
    category: 'Onegai AiPri',
    description: 'Official idols and characters from Onegai AiPri',
    items: [
      {
        id: 'pfp-aoi-yumemiya',
        name: 'Aoi Yumemiya',
        url: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Profile%20Pictures/Onegai%20Aipri/Aoi%20Yumemiya.png',
        category: 'Onegai AiPri'
      },
      {
        id: 'pfp-ema-mochinaga',
        name: 'Ema Mochinaga',
        url: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Profile%20Pictures/Onegai%20Aipri/Ema%20Mochinaga.png',
        category: 'Onegai AiPri'
      },
      {
        id: 'pfp-gumi-tomosaka',
        name: 'Gumi Tomosaka',
        url: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Profile%20Pictures/Onegai%20Aipri/Gumi%20Tomosaka.png',
        category: 'Onegai AiPri'
      },
      {
        id: 'pfp-inori-konomi',
        name: 'Inori Konomi',
        url: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Profile%20Pictures/Onegai%20Aipri/Inori%20Konomi.png',
        category: 'Onegai AiPri'
      },
      {
        id: 'pfp-nana-atami',
        name: 'Nana Atami',
        url: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Profile%20Pictures/Onegai%20Aipri/Nana%20Atami.png',
        category: 'Onegai AiPri'
      },
      {
        id: 'pfp-olivia-yuki',
        name: 'Olivia Yuki',
        url: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Profile%20Pictures/Onegai%20Aipri/Olivia%20Yuki.png',
        category: 'Onegai AiPri'
      }
    ]
  },
  {
    category: 'Classic Avatars',
    description: 'StreamLay aesthetic portrait avatars',
    items: [
      {
        id: 'pfp-classic-1',
        name: 'Violet Chic',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        category: 'Classic Avatars'
      },
      {
        id: 'pfp-classic-2',
        name: 'Urban Chill',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        category: 'Classic Avatars'
      },
      {
        id: 'pfp-classic-3',
        name: 'Studio Neon',
        url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
        category: 'Classic Avatars'
      },
      {
        id: 'pfp-classic-4',
        name: 'Golden Radiance',
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
        category: 'Classic Avatars'
      }
    ]
  }
];

export const INITIAL_USER: UserProfile = {
  name: '',
  email: 'streamlay633@gmail.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  plan: 'StreamLay Ultra 4K HDR',
  renewalDate: 'October 15, 2026',
  preferredLanguage: 'English (US)',
  streamQuality: 'Auto (4K)',
  autoplayNext: true,
  soundEffects: true,
  emailNotifications: true,
  myListIds: [],
  watchHistory: [],
  favoriteIds: [],
  parentalControlsEnabled: false,
  parentalPin: '',
  parentalControls: {
    isEnabled: false,
    pin: '',
    restrictionLevel: 'TV-MA / R / M',
    restrictPurchases: false,
  },
};

export const MOCK_MEDIA: MediaItem[] = [
  {
    id: 'ser-aipri',
    title: 'Himitsu no AiPri',
    type: 'series',
    tagline: 'Step into the secret virtual stage and sparkle like an idol!',
    description: 'First-year middle school students Himari Aozora and Mitsuki Hoshikawa enroll in Private Paradise Academy. Using their mysterious AiPri Bracelets and cards, they debut on the secret virtual stage where singing, dancing, and heartfelt friendships sparkle.',
    backdropUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Himitsu%20no%20AiPri/Backdrop/Himitsu%20no%20AiPri%20-%20Backdrop.jpg',
    posterUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Himitsu%20no%20AiPri/Poster/Himitsu%20no%20AiPri%20-%20Poster.webp',
    logoUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Himitsu%20no%20AiPri/Logo/Himitsu%20no%20AiPri%20-%20Logo.png',
    rating: 9.2,
    releaseYear: 2024,
    seasonsCount: 1,
    genres: ['Animation', 'Comedy', 'Music', 'Fantasy'],
    ageRating: 'TV-PG',
    isTrending: true,
    isPopular: true,
    isNewRelease: true,
    isTopRated: true,
    isFeatured: true,
    director: 'Junichi Fujisaku & Kentaro Yamaguchi',
    cast: [
      { name: 'Minori Fujidera', role: 'Himari Aozora (Voice)', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Sae Hiratsuka', role: 'Mitsuki Hoshikawa (Voice)', photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80' },
      { name: 'Yuriko Kubota', role: 'Tsumugi Suzukaze (Voice)', photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80' },
      { name: 'Yurika Kubo', role: 'Sakura Ichijo (Voice)', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    ],
    videoUrl: 'https://goodstream.one/embed-020836gc8oi8.html',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1: The Secret AiPri Stage',
        episodes: [
          {
            id: 'ep-aipri-1',
            episodeNumber: 1,
            seasonNumber: 1,
            title: "Himari's AiPri Debut!",
            duration: '24:22',
            description: 'Himari enrolls in Private Paradise Academy and is drawn into the glittering virtual world of AiPri with her dazzling new bracelet.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Himitsu%20no%20AiPri/Episodes%20Thumbnail/E1.jpg',
            videoUrl: 'https://goodstream.one/embed-020836gc8oi8.html'
          },
          {
            id: 'ep-aipri-2',
            episodeNumber: 2,
            seasonNumber: 1,
            title: "Mitsuki's Secret Promise",
            duration: '24:22',
            description: 'Mitsuki discovers Himari’s secret performance and must decide if she has the courage to step onto the idol stage beside her best friend.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Himitsu%20no%20AiPri/Episodes%20Thumbnail/E2.jpg',
            videoUrl: 'https://goodstream.one/embed-nznzag6p34va.html'
          },
          {
            id: 'ep-aipri-3',
            episodeNumber: 3,
            seasonNumber: 1,
            title: "The Student Council's Secret Lesson",
            duration: '24:22',
            description: 'The duo prepares for their first co-op concert as secret fans across the academy vote for their favorite styling cards.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Himitsu%20no%20AiPri/Episodes%20Thumbnail/E3.jpg',
            videoUrl: 'https://goodstream.one/embed-kw13yvquzng6.html'
          },
          {
            id: 'ep-aipri-4',
            episodeNumber: 4,
            seasonNumber: 1,
            title: 'Heart-pounding! First Visit Day',
            duration: '24:22',
            description: 'A surprise rival idol appears on the virtual runway, challenging Himari and Mitsuki to elevate their performance.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Himitsu%20no%20AiPri/Episodes%20Thumbnail/E4.jpg',
            videoUrl: 'https://goodstream.one/embed-u4yaj09rp5ht.html'
          }
        ]
      }
    ]
  },
  {
    id: 'ser-onegai-aipri',
    title: 'Onegai AiPri',
    type: 'series',
    tagline: 'Make a wish with the Mirror Pact and sparkle on the AiPri Verse stage!',
    description: 'Inori Konomi moves to Onegai Town with a deep love for the virtual idols of AiPri Verse. After encountering popular idol Aoi Yumemiya and the magical wish plushie Fortu, Inori receives the mystical Mirror Pact to debut on the idol stage. Together as the Wish-Fulfilling Squad, they perform heartwarming live shows to grant the townspeople’s wishes.',
    backdropUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Onegai%20Aipri/Backdrop/Onegai%20Aipri%20-%20Backdrop.jpeg',
    posterUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Onegai%20Aipri/Poster/Onegai%20Aipri%20-%20Poster.jpg',
    logoUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Onegai%20Aipri/Logo/Onegai%20Aipri%20-%20Logo.webp',
    rating: 9.3,
    releaseYear: 2026,
    seasonsCount: 1,
    genres: ['Animation', 'Music', 'Comedy', 'Fantasy'],
    ageRating: 'TV-PG',
    isTrending: true,
    isPopular: true,
    isNewRelease: true,
    isTopRated: true,
    isFeatured: true,
    director: 'Junichi Fujisaku & Masahiro Matsunaga',
    cast: [
      { name: 'Hanaka Ogawa', role: 'Inori Konomi (Voice)', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Rika Kanaya', role: 'Aoi Yumemiya (Voice)', photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80' },
      { name: 'Yo Taichi', role: 'Fortu (Voice)', photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80' }
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1: Wish-Fulfilling Squad',
        episodes: [
          {
            id: 'ep-onegai-1',
            episodeNumber: 1,
            seasonNumber: 1,
            title: 'Please Grant My Wish! AiPri Debut',
            duration: '24m',
            description: 'Inori moves to Onegai Town and meets Aoi Yumemiya and Fortu, unlocking her new stage with the sacred Mirror Pact.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Onegai%20Aipri/Backdrop/Onegai%20Aipri%20-%20Backdrop.jpeg',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          }
        ]
      }
    ]
  },
  {
    id: 'ser-platformer-the-show',
    title: 'Platformer The Show',
    type: 'series',
    tagline: 'Level up, dodge the obstacles, and master the digital stage.',
    description: 'An action-packed animated gaming adventure set across vibrant retro worlds and intricate platforming challenges. Follow agile heroes running, leaping, and solving intricate level mechanics while uncovering secrets across dynamic game dimensions.',
    backdropUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Platformer%20The%20Show/Backdrop/Platformer%20The%20Show%20-%20Backdrop.png',
    posterUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Platformer%20The%20Show/Poster/Platformer%20The%20Show%20-%20Poster.png',
    logoUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Platformer%20The%20Show/Logo/Platformer%20The%20Show%20-%20Logo.png',
    rating: 9.4,
    releaseYear: 2025,
    seasonsCount: 1,
    genres: ['Animation', 'Action', 'Adventure', 'Comedy'],
    ageRating: 'TV-PG',
    isTrending: true,
    isPopular: true,
    isNewRelease: true,
    isTopRated: true,
    isFeatured: true,
    director: 'Studio Platformer',
    cast: [
      { name: 'Alex Knight', role: 'Hero Runner', photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80' },
      { name: 'Maya Speed', role: 'Acrobat Dash', photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80' },
      { name: 'Pixel Commander', role: 'Level Guide', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1: World 1-1',
        episodes: [
          {
            id: 'ep-plat-1',
            episodeNumber: 1,
            seasonNumber: 1,
            title: 'World 1-1: Press Start',
            duration: '22m',
            description: 'The adventurers jump into the first challenging sector, learning the rules of the terrain while avoiding spike traps and tricky moving platforms.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Platformer%20The%20Show/Backdrop/Platformer%20The%20Show%20-%20Backdrop.png',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          }
        ]
      }
    ]
  },
  {
    id: 'ser-star-detective-precure',
    title: 'Star Detective Precure!',
    type: 'series',
    tagline: 'Unravel the truth, solve the mystery, and shine across time!',
    description: 'Transported from 2027 back to 1999 by the time-space fairy Pochitan, Anna Akechi teams up with aspiring detective Mikuru Kobayashi. Together as Cure Answer and Cure Mystique of the CUREtto Detective Agency, they combine sharp deduction, heart, and magical power to solve perplexing cases and stop phantom thieves who steal precious memories.',
    backdropUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Star%20Detective%20Precure!/Backdrop/Star%20Detective%20Precure!%20-%20Backdrop.webp',
    posterUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Star%20Detective%20Precure!/Poster/Star%20Detective%20Precure!%20-%20Poster.webp',
    logoUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Star%20Detective%20Precure!/Logo/Star%20Detective%20Precure!%20-%20Logo.webp',
    rating: 9.5,
    releaseYear: 2026,
    seasonsCount: 1,
    genres: ['Animation', 'Mystery', 'Fantasy', 'Action'],
    ageRating: 'TV-PG',
    isTrending: true,
    isPopular: true,
    isNewRelease: true,
    isTopRated: true,
    isFeatured: true,
    director: 'Toei Animation',
    cast: [
      { name: 'Anna Akechi', role: 'Cure Answer (Voice)', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Mikuru Kobayashi', role: 'Cure Mystique (Voice)', photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80' },
      { name: 'Luluka Moria', role: 'Cure Arcana Shadow (Voice)', photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80' }
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1: CUREtto Detective Agency',
        episodes: [
          {
            id: 'ep-precure-1',
            episodeNumber: 1,
            seasonNumber: 1,
            title: 'Case 1: Time Leap to 1999! Cure Answer is Born',
            duration: '24m',
            description: 'On Anna’s 14th birthday, a magical clock pendant transports her back to 1999 where she meets detective Mikuru and awakens her true detective powers.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Star%20Detective%20Precure!/Backdrop/Star%20Detective%20Precure!%20-%20Backdrop.webp',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          }
        ]
      }
    ]
  },
  {
    id: 'ser-man-vs-baby',
    title: 'Man vs Baby',
    type: 'series',
    tagline: 'New job. Luxury penthouse. One tiny, unpredictable adversary.',
    description: 'Following the events of Man vs Bee, Trevor Bingley takes on a lucrative housesitting assignment at a high-tech London penthouse over the Christmas holidays. His plans for an easy paycheck dissolve into sheer slapstick chaos when an unexpected infant enters the picture, leading to an escalating battle of wits and catastrophic accidents.',
    backdropUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Man%20vs%20Baby/Backdrop/Man%20vs%20Baby%20-%20Backdrop.jpg',
    posterUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Man%20vs%20Baby/Poster/Man%20vs%20Baby%20-%20Poster.jpg',
    logoUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Man%20vs%20Baby/Logo/Man%20vs%20Baby%20-%20Logo.webp',
    rating: 8.9,
    releaseYear: 2025,
    seasonsCount: 1,
    genres: ['Comedy', 'Family'],
    ageRating: 'TV-PG',
    isTrending: true,
    isPopular: true,
    isNewRelease: true,
    isTopRated: false,
    isFeatured: true,
    director: 'David Kerr',
    cast: [
      { name: 'Rowan Atkinson', role: 'Trevor Bingley', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Jing Lusi', role: 'Nina', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Julian Rhind-Tutt', role: 'Christian', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' }
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1: Penthouse Pandemonium',
        episodes: [
          {
            id: 'ep-mvb-1',
            episodeNumber: 1,
            seasonNumber: 1,
            title: 'Episode 1: The New Arrival',
            duration: '28m',
            description: 'Trevor arrives at an ultramodern penthouse for Christmas housesitting, but an unexpected infant guest turns his high-tech dream into slapstick disaster.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Man%20vs%20Baby/Backdrop/Man%20vs%20Baby%20-%20Backdrop.jpg',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          },
          {
            id: 'ep-mvb-2',
            episodeNumber: 2,
            seasonNumber: 1,
            title: 'Episode 2: Smart House Sabotage',
            duration: '29m',
            description: 'Trevor attempts to navigate smart nursery tech and bottle warming, accidentally triggering high-tech penthouse lockdown alarms.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Man%20vs%20Baby/Backdrop/Man%20vs%20Baby%20-%20Backdrop.jpg',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          }
        ]
      }
    ]
  },
  {
    id: 'ser-nyanko-days',
    title: 'Nyanko Days',
    type: 'series',
    tagline: 'Every day is filled with fluffy, tiny cat companions!',
    description: 'Yuuko Konagai is a shy high school freshman who finds it difficult to talk to her classmates. However, returning home is pure joy thanks to her three adorable, palm-sized anthropomorphic kittens: the mischievous munchkin Maa, the gentle and smart Russian Blue Rou, and the timid Singapore cat Shii. Together, they bring warmth, laughs, and new friendships to Yuuko’s daily life.',
    backdropUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Nyanko%20Days/Backdrop/Nyanko%20Days%20-%20Backdrop.webp',
    posterUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Nyanko%20Days/Poster/Nyanko%20Days%20-%20Poster.jpg',
    logoUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Nyanko%20Days/Logo/Nyanko%20Days%20-%20Logo.png',
    rating: 8.8,
    releaseYear: 2017,
    seasonsCount: 1,
    genres: ['Animation', 'Comedy', 'Slice of Life'],
    ageRating: 'TV-G',
    isTrending: true,
    isPopular: true,
    isNewRelease: false,
    isTopRated: true,
    isFeatured: true,
    director: 'Yoshimasa Hiraike',
    cast: [
      { name: 'Akari Uehara', role: 'Yuuko Konagai (Voice)', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Ibuki Kido', role: 'Maa (Voice)', photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80' },
      { name: 'Erii Yamazaki', role: 'Shii (Voice)', photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80' },
      { name: 'Mikako Komatsu', role: 'Rou (Voice)', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1: Me and My Cute Kittens',
        episodes: [
          {
            id: 'ep-nyanko-1',
            episodeNumber: 1,
            seasonNumber: 1,
            title: 'Episode 1: My Cats and Me',
            duration: '3m',
            description: 'Yuuko rushes home after a quiet day at school to be greeted by her three energetic and loving cat companions: Maa, Shii, and Rou.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Nyanko%20Days/Backdrop/Nyanko%20Days%20-%20Backdrop.webp',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          }
        ]
      }
    ]
  },
  {
    id: 'mov-gta6',
    title: 'Grand Theft Auto VI: An Extended Look',
    type: 'movie',
    tagline: 'Welcome to Vice City, Leonida. Crime, sun, and neon.',
    description: 'An exclusive extended look into Grand Theft Auto VI, exploring the sun-soaked streets of Vice City and the broader state of Leonida. Featuring cinematic breakdowns, character insights into Lucia and Jason, next-generation visuals, and developer perspectives on the most anticipated entertainment release.',
    backdropUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Movies/Grand%20Theft%20Auto%20VI:%20An%20Extended%20Look/Backdrop/Grand%20Theft%20Auto%20VI%20An%20Extended%20Look%20-%20Backdrop.webp',
    posterUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Movies/Grand%20Theft%20Auto%20VI:%20An%20Extended%20Look/Poster/Grand%20Theft%20Auto%20VI%20An%20Extended%20Look%20-%20Poster.webp',
    thumbnailUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Movies/Grand%20Theft%20Auto%20VI:%20An%20Extended%20Look/Movie%20Thumbnail/Movie.jpg',
    logoUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Movies/Grand%20Theft%20Auto%20VI:%20An%20Extended%20Look/Logo/Grand%20Theft%20Auto%20VI%20An%20Extended%20Look%20-%20Logo.webp',
    rating: 9.9,
    releaseYear: 2025,
    runtime: '26:49',
    genres: ['Action', 'Crime', 'Documentary'],
    ageRating: 'M',
    isTrending: true,
    isPopular: true,
    isNewRelease: true,
    isFeatured: true,
    isTopRated: true,
    director: 'Rockstar Games',
    cast: [
      { name: 'Lucia', role: 'Protagonist', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Jason', role: 'Protagonist', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Sam Houser', role: 'Executive Producer', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' }
    ],
    videoUrl: 'https://goodstream.one/embed-pps4y8zgd5tl.html',
    trailerUrl: 'https://goodstream.one/embed-pps4y8zgd5tl.html'
  }
];

export const MOCK_LIVE_CHANNELS: LiveChannel[] = [
  {
    id: 'ch-dz-1',
    number: 1,
    name: 'Channel 0225 TV',
    category: 'Entertainment',
    groupTitle: 'Algeria',
    country: 'Algeria',
    logo: 'https://i.imgur.com/LreWENk.png',
    badge: 'LIVE HLS',
    viewers: '240K watching',
    streamUrl: 'https://lbgo.bozztv.com/ssh101/ssh101/channel0225tv/playlist.m3u8',
    previewImage: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1200&auto=format&fit=crop&q=80',
    currentProgram: {
      id: 'prg-dz-1',
      title: 'Channel 0225 Live Cultural Mag',
      startTime: '19:00',
      endTime: '21:00',
      durationMinutes: 120,
      description: 'Algerian general broadcast featuring entertainment, heritage documentaries, and musical sessions.',
      rating: 'TV-G',
      category: 'Culture',
    },
    upcomingPrograms: [
      { id: 'prg-dz-1-2', title: 'Late Night Cinema Classic', startTime: '21:00', endTime: '23:00', durationMinutes: 120, description: 'Golden age Arab cinema masterpiece.', rating: 'TV-PG', category: 'Movie' }
    ]
  }
];

export const GENRE_LIST = [
  'All',
  'Action',
  'Sci-Fi',
  'Drama',
  'Thriller',
  'Fantasy',
  'Mystery',
  'Comedy',
  'Horror',
  'Animation',
  'Crime',
  'Adventure',
  'Documentary'
];
