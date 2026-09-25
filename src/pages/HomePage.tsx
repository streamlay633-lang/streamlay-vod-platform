import React from 'react';
import { MediaItem, UserProfile } from '../types';
import { HeroBanner } from '../components/HeroBanner';
import { ContentRow } from '../components/ContentRow';
import { getTranslation } from '../utils/translations';

interface HomePageProps {
  mediaList: MediaItem[];
  user: UserProfile;
  onToggleMyList: (item: MediaItem, e: React.MouseEvent) => void;
  onPlay: (item: MediaItem) => void;
  onViewDetails: (item: MediaItem) => void;
  onOpenTrailer: (item: MediaItem) => void;
  onNavigatePage: (page: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  mediaList,
  user,
  onToggleMyList,
  onPlay,
  onViewDetails,
  onOpenTrailer,
  onNavigatePage,
}) => {
  const lang = user.preferredLanguage;
  const t = (key: Parameters<typeof getTranslation>[0]) => getTranslation(key, lang);

  // Featured hero items (featuring Onegai AiPri and Himitsu no AiPri prominently)
  const featuredItems = [
    ...mediaList.filter((m) => m.id === 'ser-onegai-aipri'),
    ...mediaList.filter((m) => m.id === 'ser-aipri'),
    ...mediaList.filter((m) => m.isFeatured && m.id !== 'ser-onegai-aipri' && m.id !== 'ser-aipri'),
  ];
  const featuredItem = featuredItems[0] || mediaList[0];

  // Continue Watching items (derived strictly from user's watchHistory)
  const continueWatchingItems = user.watchHistory
    .map((wh) => {
      const media = mediaList.find((m) => m.id === wh.mediaId);
      if (!media) return null;
      return {
        ...media,
        progressPercentage: wh.progressPercentage,
      };
    })
    .filter(Boolean) as MediaItem[];

  // Category filters
  const trendingNow = mediaList.filter((m) => m.isTrending);
  const popularMovies = mediaList.filter((m) => m.type === 'movie' && (m.isPopular || m.rating >= 8.5));
  const popularSeries = mediaList.filter((m) => m.type === 'series');
  const newReleases = mediaList.filter((m) => m.isNewRelease || m.releaseYear >= 2025);
  const recommendedForYou = mediaList.filter((m) => m.rating >= 8.6);
  const topRated = [...mediaList].sort((a, b) => b.rating - a.rating);

  return (
    <div id="home-page" className="w-full pb-20 overflow-x-hidden">
      {/* Hero Banner Section with Motion Animations & Carousel */}
      {featuredItems.length > 0 && (
        <HeroBanner
          items={featuredItems}
          item={featuredItem}
          user={user}
          myListIds={user.myListIds}
          inMyList={user.myListIds.includes(featuredItem.id)}
          onToggleMyList={onToggleMyList}
          onPlay={onPlay}
          onViewDetails={onViewDetails}
          onOpenTrailer={onOpenTrailer}
        />
      )}

      {/* Content Rows Container with negative margin overlap for cinematic continuity */}
      <div className="relative z-20 -mt-10 sm:-mt-14 space-y-6 max-w-7xl mx-auto">
        {/* Continue Watching Section */}
        {continueWatchingItems.length > 0 && (
          <ContentRow
            title={`${t('continueWatching')}${user.name ? `, ${user.name}` : ''}`}
            subtitle={t('continueWatchingSubtitle')}
            items={continueWatchingItems}
            myListIds={user.myListIds}
            onToggleMyList={onToggleMyList}
            onPlay={onPlay}
            onViewDetails={onViewDetails}
            cardSize="normal"
            lang={lang}
          />
        )}

        {/* Featured Series */}
        <ContentRow
          title={t('featuredSeries')}
          subtitle={t('featuredSeriesSubtitle')}
          items={popularSeries}
          myListIds={user.myListIds}
          onToggleMyList={onToggleMyList}
          onPlay={onPlay}
          onViewDetails={onViewDetails}
          onSeeAll={() => onNavigatePage('series')}
          lang={lang}
        />

        {/* Blockbuster Movies (shown only if movies exist) */}
        {popularMovies.length > 0 && (
          <ContentRow
            title={t('blockbusterMovies')}
            subtitle={t('blockbusterMoviesSubtitle')}
            items={popularMovies}
            myListIds={user.myListIds}
            onToggleMyList={onToggleMyList}
            onPlay={onPlay}
            onViewDetails={onViewDetails}
            onSeeAll={() => onNavigatePage('movies')}
            lang={lang}
          />
        )}

        {/* Additional category rows shown if catalog has multiple media items */}
        {mediaList.length > 2 && (
          <>
            <ContentRow
              title={t('trendingNow')}
              subtitle={t('trendingNowSubtitle')}
              items={trendingNow}
              myListIds={user.myListIds}
              onToggleMyList={onToggleMyList}
              onPlay={onPlay}
              onViewDetails={onViewDetails}
              lang={lang}
            />

            <ContentRow
              title={t('newReleases')}
              subtitle={t('newReleasesSubtitle')}
              items={newReleases}
              myListIds={user.myListIds}
              onToggleMyList={onToggleMyList}
              onPlay={onPlay}
              onViewDetails={onViewDetails}
              lang={lang}
            />

            <ContentRow
              title={t('recommendedForYou')}
              subtitle={t('recommendedForYouSubtitle')}
              items={recommendedForYou}
              myListIds={user.myListIds}
              onToggleMyList={onToggleMyList}
              onPlay={onPlay}
              onViewDetails={onViewDetails}
              lang={lang}
            />

            <ContentRow
              title={t('allTimeTopRated')}
              subtitle={t('allTimeTopRatedSubtitle')}
              items={topRated}
              myListIds={user.myListIds}
              onToggleMyList={onToggleMyList}
              onPlay={onPlay}
              onViewDetails={onViewDetails}
              lang={lang}
            />
          </>
        )}
      </div>
    </div>
  );
};

