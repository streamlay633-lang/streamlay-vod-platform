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
