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
    franchiseUniverse: 'AiPri Verse',
    franchiseConnection: 'The foundational breakout series of the secret idol virtual stage.',
    director: 'Junichi Fujisaku & Kentaro Yamaguchi',
    cast: [
      { 
        name: 'Himari Aozora',
        characterName: 'Himari Aozora',
        actorName: 'Minori Fujidera',
        voiceActor: 'Minori Fujidera',
        role: 'Protagonist • Debut Idol',
        characterBadge: 'Lead Idol',
        isMain: true,
        personalityTraits: ['Energetic', 'Radiant', 'Heartwarming Singer'],
        signatureQuote: "With this AiPri bracelet, everyone's smiles will sparkle across the world!",
        characterBio: 'An enthusiastic first-year middle school student at Private Paradise Academy. Drawn to the secret virtual world of AiPri, Himari debuts with pure enthusiasm, making friends and spreading joy with every stage.',
        photoUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Profile%20Pictures/Onegai%20Aipri/Inori%20Konomi.png'
      },
      { 
        name: 'Mitsuki Hoshikawa',
        characterName: 'Mitsuki Hoshikawa',
        actorName: 'Sae Hiratsuka',
        voiceActor: 'Sae Hiratsuka',
        role: 'Lead Idol Duo • Pianist',
        characterBadge: 'Stage Partner',
        isMain: true,
        personalityTraits: ['Talented Pianist', 'Calm & Poised', 'Steadfast Friend'],
        signatureQuote: 'I will play the melodies that lead us to our dream concert.',
        characterBio: "Himari's childhood friend and skilled pianist. Calm, reserved, yet fiercely devoted, she steps out of her comfort zone to join Himari on the dazzling AiPri virtual runway.",
        photoUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Profile%20Pictures/Onegai%20Aipri/Aoi%20Yumemiya.png'
      },
      { 
        name: 'Tsumugi Suzukaze',
        characterName: 'Tsumugi Suzukaze',
        actorName: 'Yuriko Kubota',
        voiceActor: 'Yuriko Kubota',
        role: 'AiPri Prodigy • Enigmatic Idol',
        characterBadge: 'Prodigy',
        isMain: false,
        personalityTraits: ['Mysterious', 'Incredible Instinct', 'Observant'],
        signatureQuote: 'The secret stage sings to those who truly listen with their hearts.',
        characterBio: 'A quiet, gifted girl with an intuitive grasp of AiPri cards and rhythm. Her effortless stage presence inspires Himari and Mitsuki to constantly elevate their performances.',
        photoUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Profile%20Pictures/Onegai%20Aipri/Nana%20Atami.png'
      },
      { 
        name: 'Sakura Ichijo',
        characterName: 'Sakura Ichijo',
        actorName: 'Yurika Kubo',
        voiceActor: 'Yurika Kubo',
        role: 'Student Council President • Idol Mentor',
        characterBadge: 'Mentor',
        isMain: false,
        personalityTraits: ['Charismatic', 'Disciplined', 'Compassionate Leader'],
        signatureQuote: 'An idol carries the hopes of her academy with pride and grace.',
        characterBio: 'The charismatic head of the academy student council and a seasoned idol. She oversees student activities and discreetly guides the newcomers through their virtual stage debuts.',
        photoUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Profile%20Pictures/Onegai%20Aipri/Ema%20Mochinaga.png'
      }
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
            airDate: 'April 7, 2024',
            isNew: false,
            quality: '4K Ultra HD',
            audioLanguage: 'Japanese (Original) • English Sub',
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
            airDate: 'April 14, 2024',
            isNew: false,
            quality: '4K Ultra HD',
            audioLanguage: 'Japanese (Original) • English Sub',
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
            airDate: 'April 21, 2024',
            isNew: true,
            quality: '4K Ultra HD',
            audioLanguage: 'Japanese (Original) • English Sub',
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
            airDate: 'April 28, 2024',
            isNew: true,
            quality: '4K Ultra HD',
            audioLanguage: 'Japanese (Original) • English Sub',
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
    franchiseUniverse: 'AiPri Verse',
    franchiseConnection: 'Direct successor and spiritual spin-off introducing the Wish-Fulfilling Squad.',
    director: 'Junichi Fujisaku & Masahiro Matsunaga',
    cast: [
      { 
        name: 'Inori Konomi',
        characterName: 'Inori Konomi',
        actorName: 'Hanaka Ogawa',
        voiceActor: 'Hanaka Ogawa',
        role: 'Protagonist • Wish-Fulfilling Idol',
        characterBadge: 'Lead Idol',
        isMain: true,
        personalityTraits: ['Cheerful', 'Determined', 'Wish-Maker'],
        signatureQuote: 'Mirror Pact, awaken! Let’s grant everyone’s wishes together!',
        characterBio: 'A spirited girl newly arrived in Onegai Town. Guided by the magical fairy Fortu and top idol Aoi, Inori steps onto the stage with her sacred Mirror Pact to make heartfelt dreams come true.',
        photoUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Profile%20Pictures/Onegai%20Aipri/Inori%20Konomi.png'
      },
      { 
        name: 'Aoi Yumemiya',
        characterName: 'Aoi Yumemiya',
        actorName: 'Rika Kanaya',
        voiceActor: 'Rika Kanaya',
        role: 'Top AiPri Idol • Mentor',
        characterBadge: 'Superstar',
        isMain: true,
        personalityTraits: ['Charismatic', 'Inspiring', 'Stage Virtuoso'],
        signatureQuote: 'True brilliance shines when we bring joy to everyone watching.',
        characterBio: 'One of the most celebrated idols across AiPri Verse. Aoi recognizes Inori’s boundless empathy and joins her to form the miraculous Wish-Fulfilling Squad.',
        photoUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Profile%20Pictures/Onegai%20Aipri/Aoi%20Yumemiya.png'
      },
      { 
        name: 'Ema Mochinaga',
        characterName: 'Ema Mochinaga',
        actorName: 'Ema Mochinaga',
        voiceActor: 'Ema Mochinaga',
        role: 'Dynamic Dance Ace',
        characterBadge: 'Dance Ace',
        isMain: false,
        personalityTraits: ['Athletic', 'High Energy', 'Rhythmic'],
        signatureQuote: 'Feel the rhythm, match the beat, and let’s set the stage on fire!',
        characterBio: 'A natural athlete whose electrifying choreography and sharp dance moves elevate the tempo of every group concert in the verse.',
        photoUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Profile%20Pictures/Onegai%20Aipri/Ema%20Mochinaga.png'
      },
      { 
        name: 'Gumi Tomosaka',
        characterName: 'Gumi Tomosaka',
        actorName: 'Gumi Tomosaka',
        voiceActor: 'Gumi Tomosaka',
        role: 'Stylist & Trendsetter',
        characterBadge: 'Fashionista',
        isMain: false,
        personalityTraits: ['Creative', 'Trend-Savvy', 'Aesthetic Visionary'],
        signatureQuote: 'A stunning coordinate card makes the spirit soar even higher.',
        characterBio: 'The artistic stylist who crafts bespoke idol designs, ensuring the squad’s costumes dazzle under the virtual stage lights.',
        photoUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Profile%20Pictures/Onegai%20Aipri/Gumi%20Tomosaka.png'
      },
      { 
        name: 'Nana Atami',
        characterName: 'Nana Atami',
        actorName: 'Nana Atami',
        voiceActor: 'Nana Atami',
        role: 'Harmonizer & Vocalist',
        characterBadge: 'Melody',
        isMain: false,
        personalityTraits: ['Gentle', 'Soulful Voice', 'Warmhearted'],
        signatureQuote: 'Soft melodies can heal any tired heart.',
        characterBio: 'A gentle performer whose rich acoustic harmonies and sunny demeanor bring comfort and balance to the squad.',
        photoUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Profile%20Pictures/Onegai%20Aipri/Nana%20Atami.png'
      },
      { 
        name: 'Olivia Yuki',
        characterName: 'Olivia Yuki',
        actorName: 'Olivia Yuki',
        voiceActor: 'Olivia Yuki',
        role: 'Angelic Soloist',
        characterBadge: 'Angel Voice',
        isMain: false,
        personalityTraits: ['Graceful', 'Operatic', 'Enchanting'],
        signatureQuote: 'Let the crystal notes echo into the night sky.',
        characterBio: 'Known for crystal-clear soprano tones and regal choreography, Olivia creates an ethereal atmosphere that leaves the audience spellbound.',
        photoUrl: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Profile%20Pictures/Onegai%20Aipri/Olivia%20Yuki.png'
      }
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
            duration: '24:18',
            airDate: 'April 2026',
            isNew: true,
            quality: '4K Ultra HD',
            audioLanguage: 'Japanese (Original) • English Sub',
            description: 'Inori moves to Onegai Town and meets Aoi Yumemiya and Fortu, unlocking her new stage with the sacred Mirror Pact.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Onegai%20Aipri/Backdrop/Onegai%20Aipri%20-%20Backdrop.jpeg',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          },
          {
            id: 'ep-onegai-2',
            episodeNumber: 2,
            seasonNumber: 1,
            title: "Fortu's First Wish Mission",
            duration: '24:10',
            airDate: 'May 2026',
            isNew: true,
            quality: '4K Ultra HD',
            audioLanguage: 'Japanese (Original) • English Sub',
            description: 'The Wish-Fulfilling Squad takes on their first task: helping a timid town baker share his heartfelt cakes with the community through a sweet concert.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Onegai%20Aipri/Poster/Onegai%20Aipri%20-%20Poster.jpg',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          },
          {
            id: 'ep-onegai-3',
            episodeNumber: 3,
            seasonNumber: 1,
            title: 'Mirror Pact Harmony! Dual Runways',
            duration: '24:35',
            airDate: 'June 2026',
            isNew: true,
            quality: '4K Ultra HD',
            audioLanguage: 'Japanese (Original) • English Sub',
            description: 'Aoi and Inori synchronize their Mirror Pacts to produce a dazzling twin-star stage performance that captivates Onegai Town.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Onegai%20Aipri/Backdrop/Onegai%20Aipri%20-%20Backdrop.jpeg',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          },
          {
            id: 'ep-onegai-4',
            episodeNumber: 4,
            seasonNumber: 1,
            title: 'The Great Festival of Wishes',
            duration: '25:00',
            airDate: 'July 2026',
            isNew: true,
            quality: '4K Ultra HD',
            audioLanguage: 'Japanese (Original) • English Sub',
            description: 'All idols of the AiPri Verse gather in Onegai Town for a grand midsummer celebration powered by pure friendship and dreams.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Onegai%20Aipri/Poster/Onegai%20Aipri%20-%20Poster.jpg',
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
    franchiseUniverse: 'Pixel Gaming Realm',
    franchiseConnection: 'The benchmark platformer gaming adventure series.',
    director: 'Studio Platformer',
    cast: [
      { 
        name: 'Alex Knight',
        characterName: 'Alex Knight',
        actorName: 'Alex Knight',
        role: 'Hero Runner & Speedster',
        characterBadge: 'Speedrunner',
        isMain: true,
        personalityTraits: ['Fast-Thinking', 'Fearless Leaper', 'Puzzle Solver'],
        signatureQuote: 'Never look down when there is another ledge to grab!',
        characterBio: 'A veteran platforming adventurer who masters momentum, double jumps, and wall slides across impossible cyber stages.',
        photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'
      },
      { 
        name: 'Maya Speed',
        characterName: 'Maya Speed',
        actorName: 'Maya Speed',
        role: 'Acrobat Dash Specialist',
        characterBadge: 'Acrobat',
        isMain: true,
        personalityTraits: ['High-Velocity', 'Agile', 'Brave'],
        signatureQuote: 'Momentum is everything in World 1-3!',
        characterBio: 'A precision acrobat capable of defying gravity and dodging laser grids with effortless timing.',
        photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80'
      },
      { 
        name: 'Pixel Commander',
        characterName: 'Pixel Commander',
        actorName: 'Pixel Commander',
        role: '8-Bit Sentient Guide',
        characterBadge: 'AI Overseer',
        isMain: false,
        personalityTraits: ['Analytical', 'Deadpan Humor', 'Omniscient'],
        signatureQuote: 'Calculating optimal landing trajectory. Probability of spikes: 78%.',
        characterBio: 'A sentient retro computer monitor that gives tactical hints, coordinates secret warp zones, and decodes boss patterns.',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
      }
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
            duration: '22:15',
            airDate: 'Jan 2025',
            isNew: false,
            quality: '4K Ultra HD',
            description: 'The adventurers jump into the first challenging sector, learning the rules of the terrain while avoiding spike traps and tricky moving platforms.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Platformer%20The%20Show/Backdrop/Platformer%20The%20Show%20-%20Backdrop.png',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          },
          {
            id: 'ep-plat-2',
            episodeNumber: 2,
            seasonNumber: 1,
            title: 'World 1-2: Underground Caverns',
            duration: '23:40',
            airDate: 'Feb 2025',
            isNew: true,
            quality: '4K Ultra HD',
            description: 'Diving deep underground, the team discovers bioluminescent fungi, crumbling stalactites, and treacherous falling pillars.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Platformer%20The%20Show/Poster/Platformer%20The%20Show%20-%20Poster.png',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          },
          {
            id: 'ep-plat-3',
            episodeNumber: 3,
            seasonNumber: 1,
            title: 'World 1-3: The Clockwork Fortress',
            duration: '24:10',
            airDate: 'March 2025',
            isNew: true,
            quality: '4K Ultra HD',
            description: 'Massive rotating gears and pendulum blades test Alex and Maya to their absolute limits as the timer runs down.',
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
    franchiseUniverse: 'Toei Magical Universe',
    franchiseConnection: 'Chronological time-leap mystery arc within the storied Precure franchise.',
    director: 'Toei Animation',
    cast: [
      { 
        name: 'Anna Akechi',
        characterName: 'Anna Akechi / Cure Answer',
        actorName: 'Anna Akechi',
        voiceActor: 'Anna Akechi',
        role: 'Protagonist • Time-Leap Detective',
        characterBadge: 'Lead Precure',
        isMain: true,
        personalityTraits: ['Inquisitive', 'Observant', 'Courageous'],
        signatureQuote: 'The clues align, the truth is clear: Cure Answer will uncover the light!',
        characterBio: 'A 14-year-old student from 2027 who is sent back to 1999. Through her detective transformation, she possesses keen deductive insight and shimmering star magic.',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
      },
      { 
        name: 'Mikuru Kobayashi',
        characterName: 'Mikuru Kobayashi / Cure Mystique',
        actorName: 'Mikuru Kobayashi',
        voiceActor: 'Mikuru Kobayashi',
        role: 'Resident Detective • Partner',
        characterBadge: 'Detective Prodigy',
        isMain: true,
        personalityTraits: ['Analytical', 'Traditional Sleuth', 'Loyal'],
        signatureQuote: 'No mystery is unsolvable when deduction meets heart.',
        characterBio: 'A bright 1999 investigator operating the CUREtto Detective Agency. Combining classic magnifying-glass deduction with magical energy, she solves impossible crimes.',
        photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80'
      },
      { 
        name: 'Luluka Moria',
        characterName: 'Luluka Moria / Cure Arcana Shadow',
        actorName: 'Luluka Moria',
        voiceActor: 'Luluka Moria',
        role: 'Twilight Investigator • Rival',
        characterBadge: 'Shadow Sleuth',
        isMain: false,
        personalityTraits: ['Enigmatic', 'Stealthy', 'Noble Defender'],
        signatureQuote: 'The shadows hold secrets only the moonlight can reveal.',
        characterBio: 'A lone-wolf investigator who tracks memory thieves across the neon alleys of late-90s Tokyo with elusive phantom arts.',
        photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80'
      }
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
            duration: '24:30',
            airDate: 'Feb 2026',
            isNew: false,
            quality: '4K Ultra HD',
            description: 'On Anna’s 14th birthday, a magical clock pendant transports her back to 1999 where she meets detective Mikuru and awakens her true detective powers.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Star%20Detective%20Precure!/Backdrop/Star%20Detective%20Precure!%20-%20Backdrop.webp',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          },
          {
            id: 'ep-precure-2',
            episodeNumber: 2,
            seasonNumber: 1,
            title: 'Case 2: The Phantom Thief of Stolen Memories',
            duration: '24:20',
            airDate: 'March 2026',
            isNew: true,
            quality: '4K Ultra HD',
            description: 'A notorious phantom thief steals the cherished high school memory albums of the town mayor. Anna and Mikuru investigate the crime scene for residual stardust.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Star%20Detective%20Precure!/Poster/Star%20Detective%20Precure!%20-%20Poster.webp',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          },
          {
            id: 'ep-precure-3',
            episodeNumber: 3,
            seasonNumber: 1,
            title: 'Case 3: Clockwork Mystery at Sunset High',
            duration: '24:45',
            airDate: 'April 2026',
            isNew: true,
            quality: '4K Ultra HD',
            description: 'Time begins freezing in five-minute intervals around the academy tower clock. Cure Answer unlocks a new stargazing clue to unravel the anomaly.',
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
    franchiseUniverse: 'Trevor Bingley Comedy Collection',
    franchiseConnection: 'Direct companion spin-off following the acclaimed Netflix mini-series Man vs Bee.',
    director: 'David Kerr',
    cast: [
      { 
        name: 'Trevor Bingley',
        characterName: 'Trevor Bingley',
        actorName: 'Rowan Atkinson',
        role: 'Disaster-Prone Housesitter',
        characterBadge: 'Housesitter',
        isMain: true,
        personalityTraits: ['Perseverant', 'Well-Meaning', 'Chaos Magnet'],
        signatureQuote: "Everything is under absolute control. Apart from the smart microwave.",
        characterBio: 'Armed with a new housesitting contract and a promise to stay calm, Trevor finds himself pitted against futuristic nursery gadgets, automated vacuum bots, and a remarkably cunning toddler.',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
      },
      { 
        name: 'Baby Oliver',
        characterName: 'Baby Oliver',
        actorName: 'The Infant Twins',
        role: 'Tiny Unpredictable Adversary',
        characterBadge: 'Nemesis',
        isMain: true,
        personalityTraits: ['Innocent', 'Curious', 'Unstoppable'],
        signatureQuote: '*Giggles while hitting the penthouse master lock switch*',
        characterBio: 'An adorable infant with an uncanny knack for activating biometric smart locks, dumping puree into high-end audio amps, and keeping Trevor on edge.',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
      },
      { 
        name: 'Nina',
        characterName: 'Nina',
        actorName: 'Jing Lusi',
        role: 'Penthouse Owner & Tech Executive',
        characterBadge: 'Penthouse Owner',
        isMain: false,
        personalityTraits: ['High-Strung', 'Meticulous', 'Demanding'],
        signatureQuote: 'Do not touch the smart glass gallery wall under any circumstance.',
        characterBio: 'A high-powered tech executive who leaves her multimillion-pound automated glass apartment in Trevor’s seemingly capable hands.',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
      }
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
            duration: '28:10',
            airDate: 'Dec 2025',
            isNew: false,
            quality: '4K Ultra HD',
            description: 'Trevor arrives at an ultramodern penthouse for Christmas housesitting, but an unexpected infant guest turns his high-tech dream into slapstick disaster.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Man%20vs%20Baby/Backdrop/Man%20vs%20Baby%20-%20Backdrop.jpg',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          },
          {
            id: 'ep-mvb-2',
            episodeNumber: 2,
            seasonNumber: 1,
            title: 'Episode 2: Smart House Sabotage',
            duration: '29:45',
            airDate: 'Dec 2025',
            isNew: true,
            quality: '4K Ultra HD',
            description: 'Trevor attempts to navigate smart nursery tech and bottle warming, accidentally triggering high-tech penthouse lockdown alarms.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Man%20vs%20Baby/Backdrop/Man%20vs%20Baby%20-%20Backdrop.jpg',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          },
          {
            id: 'ep-mvb-3',
            episodeNumber: 3,
            seasonNumber: 1,
            title: 'Episode 3: The Robotic Stroller Chase',
            duration: '31:20',
            airDate: 'Jan 2026',
            isNew: true,
            quality: '4K Ultra HD',
            description: 'An AI-guided smart stroller takes off through the building’s scenic atrium, sending Trevor on an acrobatic staircase pursuit.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Man%20vs%20Baby/Poster/Man%20vs%20Baby%20-%20Poster.jpg',
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
    franchiseUniverse: 'Cozy Slice of Life',
    franchiseConnection: 'Beloved short-form comedy manga adaptation about heartwarming feline friends.',
    director: 'Yoshimasa Hiraike',
    cast: [
      { 
        name: 'Yuuko Konagai',
        characterName: 'Yuuko Konagai',
        actorName: 'Akari Uehara',
        voiceActor: 'Akari Uehara',
        role: 'Protagonist • Shy High Schooler',
        characterBadge: 'Loving Caretaker',
        isMain: true,
        personalityTraits: ['Bashful', 'Affectionate', 'Gentle'],
        signatureQuote: 'Coming home to my little kittens is the greatest feeling in the world!',
        characterBio: 'A quiet, introverted high school girl whose true smiles come alive when she cares for her three lovable mini-cat companions.',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
      },
      { 
        name: 'Maa',
        characterName: 'Maa',
        actorName: 'Ibuki Kido',
        voiceActor: 'Ibuki Kido',
        role: 'Munchkin Cat • Mischief Maker',
        characterBadge: 'Playful',
        isMain: true,
        personalityTraits: ['Curious', 'Energetic', 'Cheeky'],
        signatureQuote: 'Nyaaa! Let’s play with the wool ball right now!',
        characterBio: 'A short-legged Munchkin cat who is always bouncing around the living room and begging for extra tuna treats.',
        photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80'
      },
      { 
        name: 'Rou',
        characterName: 'Rou',
        actorName: 'Mikako Komatsu',
        voiceActor: 'Mikako Komatsu',
        role: 'Russian Blue • Composed Intellect',
        characterBadge: 'Intellectual',
        isMain: false,
        personalityTraits: ['Composed', 'Quiet', 'Thoughtful'],
        signatureQuote: 'Patience and a warm sunbeam make the afternoon complete.',
        characterBio: 'A dignified Russian Blue cat who sits gracefully on Yuuko’s study desk and watches over the household.',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
      }
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
            duration: '3:20',
            airDate: 'Jan 2017',
            isNew: false,
            quality: '1080p FHD',
            description: 'Yuuko rushes home after a quiet day at school to be greeted by her three energetic and loving cat companions: Maa, Shii, and Rou.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Nyanko%20Days/Backdrop/Nyanko%20Days%20-%20Backdrop.webp',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          },
          {
            id: 'ep-nyanko-2',
            episodeNumber: 2,
            seasonNumber: 1,
            title: 'Episode 2: Weekend Catnip Party',
            duration: '3:30',
            airDate: 'Jan 2017',
            isNew: true,
            quality: '1080p FHD',
            description: 'A lazy Saturday afternoon turns into adorable chaos when Yuuko introduces a new rolling feather toy.',
            thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/TV%20Series/Nyanko%20Days/Poster/Nyanko%20Days%20-%20Poster.jpg',
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
    franchiseUniverse: 'Grand Theft Auto Universe',
    franchiseConnection: 'The next chapter in the iconic open-world crime franchise, returning to neon-lit Vice City.',
    director: 'Rockstar Games',
    cast: [
      { 
        name: 'Lucia',
        characterName: 'Lucia',
        actorName: 'Lucia',
        role: 'Protagonist • Mastermind',
        characterBadge: 'Protagonist',
        isMain: true,
        personalityTraits: ['Determined', 'Ruthless', 'Street Smart'],
        signatureQuote: "The only way we're gonna get through this is by sticking together.",
        characterBio: 'A fearless, calculating operator striving to carve out her future in the vibrant yet cutthroat underworld of Vice City and the Keys.',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
      },
      { 
        name: 'Jason',
        characterName: 'Jason',
        actorName: 'Jason',
        role: 'Protagonist • Partner in Crime',
        characterBadge: 'Partner',
        isMain: true,
        personalityTraits: ['Pragmatic', 'Sharp Shooter', 'Reliable'],
        signatureQuote: "Trust. That's all we got in this city.",
        characterBio: 'Lucia’s partner who navigates the neon-washed avenues of Leonida, balancing risk with survival as their ambitions escalate.',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
      },
      { 
        name: 'Sam Houser',
        characterName: 'Sam Houser',
        actorName: 'Rockstar Games',
        role: 'Executive Producer • Creative Lead',
        characterBadge: 'Studio Lead',
        isMain: false,
        personalityTraits: ['Visionary', 'Detail-Obsessed', 'Pioneering'],
        signatureQuote: 'Pushing the boundaries of living, breathing digital worlds beyond anything seen before.',
        characterBio: 'Creative mastermind and co-founder of Rockstar Games, providing developer commentary on the technical leaps in AI, physics, and world density.',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
      }
    ],
    chapters: [
      {
        id: 'chap-1',
        chapterNumber: 1,
        title: 'Welcome to Vice City & Leonida',
        timestamp: '00:00',
        description: 'An overview of the massive geographical scale from Ocean Beach to the swamplands of the Keys.',
        thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Movies/Grand%20Theft%20Auto%20VI:%20An%20Extended%20Look/Backdrop/Grand%20Theft%20Auto%20VI%20An%20Extended%20Look%20-%20Backdrop.webp'
      },
      {
        id: 'chap-2',
        chapterNumber: 2,
        title: 'Lucia & Jason: Underworld Dynamic',
        timestamp: '07:15',
        description: 'Deep dive into the narrative focus, dual protagonist mechanics, and dynamic dialogue systems.',
        thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Movies/Grand%20Theft%20Auto%20VI:%20An%20Extended%20Look/Poster/Grand%20Theft%20Auto%20VI%20An%20Extended%20Look%20-%20Poster.webp'
      },
      {
        id: 'chap-3',
        chapterNumber: 3,
        title: 'Next-Gen Visuals & Water Physics',
        timestamp: '14:20',
        description: 'Technical breakdown of the Rage engine updates, procedural hair physics, dynamic weather, and ocean rendering.',
        thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Movies/Grand%20Theft%20Auto%20VI:%20An%20Extended%20Look/Movie%20Thumbnail/Movie.jpg'
      },
      {
        id: 'chap-4',
        chapterNumber: 4,
        title: 'Neon Nights & Radio Culture',
        timestamp: '21:05',
        description: 'Exploration of Vice City club nightlife, curated radio stations, and cultural satire.',
        thumbnail: 'https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Movies/Grand%20Theft%20Auto%20VI:%20An%20Extended%20Look/Backdrop/Grand%20Theft%20Auto%20VI%20An%20Extended%20Look%20-%20Backdrop.webp'
      }
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
