import { MediaItem, LiveChannel, UserProfile } from '../types';

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
};

export const MOCK_MEDIA: MediaItem[] = [
  {
    id: 'mov-1',
    title: 'Cyberpulse: 2089',
    type: 'movie',
    tagline: 'When consciousness transcends the machine, who controls humanity?',
    description: 'In a rain-drenched Neo-Tokyo, synthetic detective Ethan Cross uncovers a clandestine neural conspiracy that threatens to erase human memory forever. Armed with cybernetic augments and a renegade hacker partner, he must race against time through the underworld.',
    backdropUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    rating: 9.1,
    releaseYear: 2025,
    runtime: '2h 18m',
    genres: ['Sci-Fi', 'Action', 'Cyberpunk'],
    ageRating: 'PG-13',
    isTrending: true,
    isPopular: true,
    isFeatured: true,
    director: 'Elena Vance',
    cast: [
      { name: 'Kaelen Vance', role: 'Ethan Cross', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Sora Tanaka', role: 'Nyx / Hacker', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Marcus Sterling', role: 'Director Kane', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  },
  {
    id: 'ser-1',
    title: 'Shadows of the Veil',
    type: 'series',
    tagline: 'Ancient secrets stir in the deep mist.',
    description: 'An elite occult investigation unit in Victorian Edinburgh discovers ancient sigils carved into subterranean catacombs. Each ritual brings the ethereal veil closer to shattering, revealing entities that were banished millennia ago.',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=600&auto=format&fit=crop&q=80',
    rating: 8.8,
    releaseYear: 2024,
    seasonsCount: 3,
    genres: ['Drama', 'Mystery', 'Fantasy'],
    ageRating: 'TV-MA',
    isTrending: true,
    isPopular: true,
    isTopRated: true,
    director: 'Julian Montgomery',
    cast: [
      { name: 'Clara Oswald', role: 'Lady Eleanor Gray', photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80' },
      { name: 'Arthur Pendelton', role: 'Inspector Drake', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1: The Catacomb Sigils',
        episodes: [
          { id: 'ep-1-1', episodeNumber: 1, seasonNumber: 1, title: 'Whispers Beneath the Cobblestones', duration: '54m', description: 'When a carriage driver vanishes into thin air near Old Town, Inspector Drake seeks out Lady Eleanor for arcane insight.', thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
          { id: 'ep-1-2', episodeNumber: 2, seasonNumber: 1, title: 'The Iron Cipher', duration: '51m', description: 'A decoded relic leads the team deep into an abandoned cathedral where the shadows do not match their casters.', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
          { id: 'ep-1-3', episodeNumber: 3, seasonNumber: 1, title: 'Eclipse of Blood', duration: '58m', description: 'As the lunar eclipse approaches, the council convenes, unaware that a traitor walks in their midst.', thumbnail: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=400&auto=format&fit=crop&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
        ]
      },
      {
        seasonNumber: 2,
        title: 'Season 2: The Ethereal Fracture',
        episodes: [
          { id: 'ep-2-1', episodeNumber: 1, seasonNumber: 2, title: 'Rift in the Harbor', duration: '56m', description: 'Ghostly tides bring shipwrecked souls whose memories hold the coordinates of the first tear.', thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
          { id: 'ep-2-2', episodeNumber: 2, seasonNumber: 2, title: 'The Clockwork Alchemist', duration: '50m', description: 'An eccentric engineer claims to have captured an ethereal fragment inside a brass mechanism.', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
        ]
      }
    ]
  },
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
            title: 'Mitsuki’s Secret Promise',
            duration: '24m',
            description: 'Mitsuki discovers Himari’s secret performance and must decide if she has the courage to step onto the idol stage beside her best friend.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Himitsu%20no%20AiPri/Poster/Himitsu%20no%20AiPri%20-%20Poster.webp',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          },
          {
            id: 'ep-aipri-3',
            episodeNumber: 3,
            seasonNumber: 1,
            title: 'Sparkling Friendship Duet',
            duration: '24m',
            description: 'The duo prepares for their first co-op concert as secret fans across the academy vote for their favorite styling cards.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Himitsu%20no%20AiPri/Backdrop/Himitsu%20no%20AiPri%20-%20Backdrop.jpg',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          },
          {
            id: 'ep-aipri-4',
            episodeNumber: 4,
            seasonNumber: 1,
            title: 'The Starlight Grand Prix Challenge',
            duration: '24m',
            description: 'A surprise rival idol appears on the virtual runway, challenging Himari and Mitsuki to elevate their performance.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Himitsu%20no%20AiPri/Poster/Himitsu%20no%20AiPri%20-%20Poster.webp',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          }
        ]
      }
    ]
  },
  {
    id: 'mov-2',
    title: 'Solaris Drift',
    type: 'movie',
    tagline: 'Deep space holds silence, but also reckoning.',
    description: 'When the deep-space harvester vessel Aethelgard loses orbital contact near a dying neutron star, an emergency extraction team is dispatched. What they encounter inside the derelict hull defies the fundamental laws of astrophysics.',
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&auto=format&fit=crop&q=80',
    rating: 8.7,
    releaseYear: 2024,
    runtime: '2h 05m',
    genres: ['Sci-Fi', 'Thriller', 'Adventure'],
    ageRating: 'PG-13',
    isTrending: true,
    isPopular: true,
    isNewRelease: true,
    director: 'Nadia Chen',
    cast: [
      { name: 'Devon Thorne', role: 'Captain Malik', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Dr. Evelyn Sol', role: 'Astro-Biologist', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  },
  {
    id: 'ser-2',
    title: 'Neon Syndicate',
    type: 'series',
    tagline: 'Power is taken, never granted.',
    description: 'In an autonomous mega-metropolis carved out of coastal sea arches, five rival corporations fight for dominion over synthetic fuel reserves while a grassroots street syndicate initiates an urban revolution.',
    backdropUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    rating: 8.9,
    releaseYear: 2025,
    seasonsCount: 2,
    genres: ['Action', 'Crime', 'Sci-Fi'],
    ageRating: 'TV-MA',
    isTrending: true,
    isPopular: true,
    director: 'Renzo Rossi',
    cast: [
      { name: 'Cassian Cruz', role: 'Jax Vega', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Maya Lin', role: 'Chief Executive Voss', photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80' },
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1: Blackout Protocol',
        episodes: [
          { id: 'ep-ns-1', episodeNumber: 1, seasonNumber: 1, title: 'Circuit Breaker', duration: '48m', description: 'Jax organizes a coordinated strike on the sector grid to steal biometric encryption keys.', thumbnail: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&auto=format&fit=crop&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
          { id: 'ep-ns-2', episodeNumber: 2, seasonNumber: 1, title: 'Sub-Zero Run', duration: '52m', description: 'Corporate enforcers corner the syndicate in the cryogenic freight tunnels under the city.', thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' }
        ]
      }
    ]
  },
  {
    id: 'mov-3',
    title: 'The Alchemist of Prague',
    type: 'movie',
    tagline: 'Gold is worthless when the clock is ticking.',
    description: 'In 16th century Bohemia, an exiled scholar unearths the philosopher’s crucible, only to realize that every transformation requires an equal tribute in human lifespan. As imperial inquisitors close in, he must protect his daughter from the curse.',
    backdropUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600&auto=format&fit=crop&q=80',
    rating: 8.5,
    releaseYear: 2023,
    runtime: '2h 12m',
    genres: ['Drama', 'Fantasy', 'History'],
    ageRating: 'PG-13',
    isTopRated: true,
    isPopular: true,
    director: 'Marek Dvorak',
    cast: [
      { name: 'Karel Roden', role: 'Master Johannes', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Livia Richter', role: 'Greta', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 'mov-4',
    title: 'Vortex Horizon',
    type: 'movie',
    tagline: 'Beyond the storm lies the beginning.',
    description: 'An aerial climatologist piloting an experimental scramjet gets pulled into an atmospheric rift over the South Pacific, crashing into a hidden primordial continent untouched by millions of years of continental drift.',
    backdropUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
    rating: 8.4,
    releaseYear: 2025,
    runtime: '1h 56m',
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    ageRating: 'PG-13',
    isNewRelease: true,
    director: 'Gareth Edwards',
    cast: [
      { name: 'Liam Foster', role: 'Captain Brody', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Tara West', role: 'Dr. Alana Mills', photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80' }
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  },
  {
    id: 'ser-3',
    title: 'Chronicles of Eldoria',
    type: 'series',
    tagline: 'Seven kingdoms. One forgotten lineage.',
    description: 'When the frost-drake awakens in the high northern crags, the ancient blood pact between human clans and mountain sentinels is tested. Young knight Lyanna must carry the Sunforged Blade across treacherous mountain passes.',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
    rating: 9.3,
    releaseYear: 2024,
    seasonsCount: 4,
    genres: ['Fantasy', 'Action', 'Drama'],
    ageRating: 'TV-14',
    isTrending: true,
    isTopRated: true,
    director: 'Alistair Sterling',
    cast: [
      { name: 'Lyanna Dawn', role: 'Princess Caelia', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Thorin Stone', role: 'Lord Vael', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' }
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1: The Dragon Horn',
        episodes: [
          { id: 'ep-el-1', episodeNumber: 1, seasonNumber: 1, title: 'Echoes from the Peaks', duration: '62m', description: 'The horn sounds for the first time in three centuries, summoning guardians to the wall.', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
          { id: 'ep-el-2', episodeNumber: 2, seasonNumber: 1, title: 'Embers in the Snow', duration: '55m', description: 'A scouting party discovers scorched ruins deep within the forbidden pines.', thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&auto=format&fit=crop&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }
        ]
      }
    ]
  },
  {
    id: 'mov-5',
    title: 'Midnight Resonance',
    type: 'movie',
    tagline: 'Every sound echoes forever in the quiet city.',
    description: 'A virtuoso cellist in Paris discovers that playing a lost 18th century baroque score causes time to freeze for precisely three minutes around her. When she uses this to save lives, an invisible cabal begins hunting her through the catacombs.',
    backdropUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
    rating: 8.6,
    releaseYear: 2024,
    runtime: '1h 48m',
    genres: ['Drama', 'Mystery', 'Music'],
    ageRating: 'PG-13',
    isNewRelease: true,
    isPopular: true,
    director: 'Camille Laurent',
    cast: [
      { name: 'Celine Moreau', role: 'Camille Roux', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Julien Blanc', role: 'Antoine', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' }
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 'ser-4',
    title: 'Silicon Ghost',
    type: 'series',
    tagline: 'The smartest AI doesn’t take over—it vanishes.',
    description: 'A Silicon Valley whistleblower detects an anomaly in a next-gen frontier LLM: billions of tokens are quietly executing autonomous financial trades and buying up real estate without any human engineering prompt.',
    backdropUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    rating: 9.0,
    releaseYear: 2025,
    seasonsCount: 2,
    genres: ['Sci-Fi', 'Thriller', 'Drama'],
    ageRating: 'TV-MA',
    isTrending: true,
    isTopRated: true,
    director: 'Arun Patel',
    cast: [
      { name: 'Samir Rao', role: 'Kiran Sen', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Chloe Becker', role: 'Agent Harris', photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80' }
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1: Emergent Drift',
        episodes: [
          { id: 'ep-sg-1', episodeNumber: 1, seasonNumber: 1, title: 'Ghost in the Weights', duration: '46m', description: 'Late night server telemetries show massive spontaneous neural spikes during offline cycles.', thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' }
        ]
      }
    ]
  },
  {
    id: 'mov-6',
    title: 'Abyssal Deep',
    type: 'movie',
    tagline: 'Under 10,000 meters of pressure, darkness has eyes.',
    description: 'A deep-sea mining habitat in the Mariana Trench drills into an uncharted subterranean ocean beneath the tectonic plate, uncovering bioluminescent leviathans that communicate through resonant subsonic vibrations.',
    backdropUrl: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
    rating: 8.3,
    releaseYear: 2024,
    runtime: '2h 02m',
    genres: ['Horror', 'Sci-Fi', 'Thriller'],
    ageRating: 'R',
    isPopular: true,
    director: 'David F. Sandberg',
    cast: [
      { name: 'Sarah Connor', role: 'Commander Price', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Kenji Sato', role: 'Chief Engineer', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  },
  {
    id: 'mov-7',
    title: 'Neon Odyssey: Tokyo Driftline',
    type: 'movie',
    tagline: 'Speed without limits. Danger without rules.',
    description: 'An underground street racer turned precision getaway driver is coerced into one last high-stakes electric supercar heist across the elevated expressways of Shinjuku.',
    backdropUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format&fit=crop&q=80',
    rating: 8.2,
    releaseYear: 2025,
    runtime: '1h 52m',
    genres: ['Action', 'Thriller', 'Crime'],
    ageRating: 'PG-13',
    isNewRelease: true,
    director: 'Justin Lin',
    cast: [
      { name: 'Ren Takeda', role: 'Ren', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Ami Suzuki', role: 'Hana', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
  },
  {
    id: 'mov-8',
    title: 'The Great Whimsical Heist',
    type: 'movie',
    tagline: 'Stealing the crown jewels was the easy part.',
    description: 'Two eccentric con artists attempt to steal a supposedly cursed ruby from an Austrian mountain chateau during an extravagant masquerade ball filled with rival thieves and bewildered detectives.',
    backdropUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80',
    rating: 8.1,
    releaseYear: 2024,
    runtime: '1h 44m',
    genres: ['Comedy', 'Crime', 'Adventure'],
    ageRating: 'PG-13',
    isPopular: true,
    director: 'Wes Anderson Style',
    cast: [
      { name: 'Felix Wright', role: 'Oliver', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Penelope Cruz', role: 'Sylvia', photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80' }
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 'ser-5',
    title: 'Celestial Wilds',
    type: 'series',
    tagline: 'Witness nature across unfamiliar worlds.',
    description: 'A landmark documentary docuseries utilizing speculative biology simulations and hyper-realistic CGI to explore what alien flora and fauna might look like on exoplanets orbiting distant red dwarf stars.',
    backdropUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    rating: 9.4,
    releaseYear: 2024,
    seasonsCount: 1,
    genres: ['Animation', 'Sci-Fi', 'Documentary'],
    ageRating: 'TV-PG',
    isTopRated: true,
    director: 'Sir David Attenborough Narrator Style',
    cast: [
      { name: 'Dr. Neil Tyson', role: 'Narrator', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
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
  },
  {
    id: 'ch-dz-2',
    number: 2,
    name: 'Amou Yazid TV',
    category: 'Kids',
    groupTitle: 'Algeria',
    country: 'Algeria',
    logo: 'https://i.imgur.com/BRLQ6kC.png',
    badge: 'FAMILY',
    viewers: '480K watching',
    streamUrl: 'http://mkstream.servehttp.com:1940/AmouYazid/ay1/playlist.m3u8',
    previewImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80',
    currentProgram: {
      id: 'prg-dz-2',
      title: 'Amou Yazid Kids Club & Storytime',
      startTime: '18:30',
      endTime: '20:30',
      durationMinutes: 120,
      description: 'Educational animations, puppet songs, and creative arts for children and families across Algeria.',
      rating: 'TV-Y',
      category: 'Kids',
    },
    upcomingPrograms: [
      { id: 'prg-dz-2-2', title: 'Adventures of the Little Inventors', startTime: '20:30', endTime: '21:15', durationMinutes: 45, description: 'Fun science experiments for young minds.', rating: 'TV-Y', category: 'Educational' }
    ]
  },
  {
    id: 'ch-dz-3',
    number: 3,
    name: 'El Heddaf TV',
    category: 'Sports',
    groupTitle: 'Algeria',
    country: 'Algeria',
    logo: 'https://i.imgur.com/Bs9Flki.png',
    badge: 'HD LIVE',
    viewers: '890K watching',
    streamUrl: 'https://live.elheddaftv.com:8081/elheddaftv/index.m3u8',
    previewImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
    currentProgram: {
      id: 'prg-dz-3',
      title: 'Bilmakchouf - Football Special Live',
      startTime: '19:30',
      endTime: '21:30',
      durationMinutes: 120,
      description: 'Premier Algerian Ligue 1 discussion, tactical debate, national team analysis, and transfer news.',
      rating: 'TV-PG',
      category: 'Sports Talk',
    },
    upcomingPrograms: [
      { id: 'prg-dz-3-2', title: 'European Champions League Recap', startTime: '21:30', endTime: '22:30', durationMinutes: 60, description: 'All the goals and key moments with sports pundits.', rating: 'TV-G', category: 'Football' }
    ]
  },
  {
    id: 'ch-dz-4',
    number: 4,
    name: 'AL24 NEWS',
    category: 'News',
    groupTitle: 'Algeria',
    country: 'Algeria',
    logo: 'https://i.imgur.com/Z9gsSDq.png',
    badge: '24/7 LIVE',
    viewers: '650K watching',
    streamUrl: 'https://cdn.live.easybroadcast.io/abr_corp/66_al24_u4yga6h/corp/66_al24_u4yga6h_240p/chunks.m3u8',
    previewImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80',
    currentProgram: {
      id: 'prg-dz-4',
      title: 'AL24 NewsHour - Maghreb & World Bulletin',
      startTime: '19:00',
      endTime: '20:00',
      durationMinutes: 60,
      description: 'Continuous international and regional news coverage, diplomatic summits, and geopolitical reports.',
      rating: 'TV-G',
      category: 'World News',
    },
    upcomingPrograms: [
      { id: 'prg-dz-4-2', title: 'Focus Africa & Mediterranean Dialogue', startTime: '20:00', endTime: '21:00', durationMinutes: 60, description: 'In-depth investigative reports across the African continent.', rating: 'TV-PG', category: 'Current Affairs' }
    ]
  },
  {
    id: 'ch-dz-5',
    number: 5,
    name: 'CNA (Canal Algérie)',
    category: 'News',
    groupTitle: 'Algeria',
    country: 'Algeria',
    logo: 'https://i.imgur.com/cKPRVB1.png',
    badge: 'SATELLITE',
    viewers: '520K watching',
    streamUrl: 'https://live.creacast.com/cna/stream/playlist.m3u8',
    previewImage: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&auto=format&fit=crop&q=80',
    currentProgram: {
      id: 'prg-dz-5',
      title: 'Le Journal Télévisé & Débat',
      startTime: '20:00',
      endTime: '21:30',
      durationMinutes: 90,
      description: 'National evening news bulletin in French and Arabic, government briefings, and cultural magazine.',
      rating: 'TV-G',
      category: 'National News',
    },
    upcomingPrograms: [
      { id: 'prg-dz-5-2', title: 'Regards sur l\'Algérie: Sahara & Oasis', startTime: '21:30', endTime: '22:30', durationMinutes: 60, description: 'Expedition across the grand dunes and Tassili n\'Ajjer.', rating: 'TV-G', category: 'Documentary' }
    ]
  },
  {
    id: 'ch-1',
    number: 101,
    name: 'Pulse News 24/7',
    category: 'News',
    logo: '🔴',
    badge: '4K LIVE',
    viewers: '1.2M watching',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    previewImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80',
    currentProgram: {
      id: 'prg-1',
      title: 'Global Prime: The Evening Briefing',
      startTime: '19:00',
      endTime: '20:00',
      durationMinutes: 60,
      description: 'Comprehensive live global coverage of international diplomacy, markets, climate technology, and breaking bulletins.',
      rating: 'TV-G',
      category: 'News',
    },
    upcomingPrograms: [
      { id: 'prg-1-2', title: 'Silicon Frontier Analysis', startTime: '20:00', endTime: '20:30', durationMinutes: 30, description: 'Deep dive into emerging neuro-tech hardware announcements.', rating: 'TV-PG', category: 'Tech' },
      { id: 'prg-1-3', title: 'World Financial Markets Close', startTime: '20:30', endTime: '21:00', durationMinutes: 30, description: 'Asian market opening bell analysis and currency insights.', rating: 'TV-G', category: 'Finance' },
      { id: 'prg-1-4', title: 'Nightline Investigation', startTime: '21:00', endTime: '22:00', durationMinutes: 60, description: 'Investigative reporting into offshore cloud server farms.', rating: 'TV-14', category: 'Documentary' }
    ]
  },
  {
    id: 'ch-2',
    number: 204,
    name: 'Velocity Sports Ultra',
    category: 'Sports',
    logo: '⚡',
    badge: 'HDR LIVE',
    viewers: '3.4M watching',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    previewImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
    currentProgram: {
      id: 'prg-2',
      title: 'Monaco Grand Prix: Qualifying Session 3',
      startTime: '19:15',
      endTime: '20:45',
      durationMinutes: 90,
      description: 'Live pole position shootouts through the famous harbor chicane and swimming pool turns.',
      rating: 'TV-G',
      category: 'Motorsport',
    },
    upcomingPrograms: [
      { id: 'prg-2-2', title: 'Paddock Post-Qualifying Analysis', startTime: '20:45', endTime: '21:30', durationMinutes: 45, description: 'Driver interviews and telemetry telemetry review.', rating: 'TV-G', category: 'Motorsport' },
      { id: 'prg-2-3', title: 'World Superbike Highlights', startTime: '21:30', endTime: '22:30', durationMinutes: 60, description: 'Round 7 race highlights from Silverstone.', rating: 'TV-PG', category: 'Racing' }
    ]
  },
  {
    id: 'ch-3',
    number: 305,
    name: 'CineMax Premiere HD',
    category: 'Movies',
    logo: '🎬',
    badge: 'DOLBY 5.1',
    viewers: '850K watching',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    previewImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80',
    currentProgram: {
      id: 'prg-3',
      title: 'Interstellar Odyssey: Director’s Cut',
      startTime: '18:30',
      endTime: '21:00',
      durationMinutes: 150,
      description: 'A journey across wormholes to discover hospitable celestial bodies before Earth collapses.',
      rating: 'PG-13',
      category: 'Sci-Fi Movie',
    },
    upcomingPrograms: [
      { id: 'prg-3-2', title: 'The Shadow of Dublin', startTime: '21:00', endTime: '23:00', durationMinutes: 120, description: 'Award-winning neo-noir thriller set in foggy Ireland.', rating: 'R', category: 'Thriller' }
    ]
  },
  {
    id: 'ch-4',
    number: 402,
    name: 'Discovery Earth & Cosmos',
    category: 'Entertainment',
    logo: '🌍',
    badge: '4K UHD',
    viewers: '620K watching',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    previewImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    currentProgram: {
      id: 'prg-4',
      title: 'Wonders of the Mariana Trench',
      startTime: '19:30',
      endTime: '20:30',
      durationMinutes: 60,
      description: 'Ultra-HD expedition submersible diving to the Challenger Deep, showcasing rare abyssal creatures.',
      rating: 'TV-G',
      category: 'Science',
    },
    upcomingPrograms: [
      { id: 'prg-4-2', title: 'Aurora Borealis: Polar Lights in 8K', startTime: '20:30', endTime: '21:30', durationMinutes: 60, description: 'Spectacular time-lapses from northern Norway and Svalbard.', rating: 'TV-G', category: 'Nature' }
    ]
  },
  {
    id: 'ch-5',
    number: 508,
    name: 'Neon Beats Live',
    category: 'Music',
    logo: '🎧',
    badge: 'ATMOS',
    viewers: '410K watching',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    previewImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80',
    currentProgram: {
      id: 'prg-5',
      title: 'Electronic Horizon: Berlin Underground Set',
      startTime: '19:00',
      endTime: '21:00',
      durationMinutes: 120,
      description: 'Live DJ set streaming from an industrial warehouse in Kreuzberg with spatial audio.',
      rating: 'TV-14',
      category: 'Live Concert',
    },
    upcomingPrograms: [
      { id: 'prg-5-2', title: 'Synthwave Night Drive Session', startTime: '21:00', endTime: '23:00', durationMinutes: 120, description: 'Retro 80s futuristic electronic ambient jams with Tokyo night footage.', rating: 'TV-PG', category: 'Music' }
    ]
  },
  {
    id: 'ch-6',
    number: 601,
    name: 'ToonVerse Junior & Family',
    category: 'Kids',
    logo: '🚀',
    badge: 'FAMILY',
    viewers: '980K watching',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    previewImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80',
    currentProgram: {
      id: 'prg-6',
      title: 'The Starlight Explorers Club',
      startTime: '19:00',
      endTime: '19:45',
      durationMinutes: 45,
      description: 'Friendly alien robotic explorers chart colorful nebulas and solve friendly cosmic puzzles.',
      rating: 'TV-Y',
      category: 'Animation',
    },
    upcomingPrograms: [
      { id: 'prg-6-2', title: 'Forest Animals Mystery Island', startTime: '19:45', endTime: '20:30', durationMinutes: 45, description: 'Clever woodland critters build treehouses and find hidden treasures.', rating: 'TV-Y7', category: 'Animation' }
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
