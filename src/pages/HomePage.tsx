import React from 'react';
import { MediaItem, UserProfile } from '../types';
import { HeroBanner } from '../components/HeroBanner';
import { ContentRow } from '../components/ContentRow';

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
  // Featured hero item
  const featuredItem = mediaList.find((m) => m.isFeatured) || mediaList[0];

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
      {/* Hero Banner Section */}
      {featuredItem && (
        <HeroBanner
          item={featuredItem}
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
            title={`Continue Watching, ${user.name || 'Friend'}`}
            subtitle="Pick up right where you left off"
            items={continueWatchingItems}
            myListIds={user.myListIds}
            onToggleMyList={onToggleMyList}
            onPlay={onPlay}
            onViewDetails={onViewDetails}
            cardSize="normal"
          />
        )}

        {/* Trending Now */}
        <ContentRow
          title="Trending Now"
          subtitle="Top streamed titles on StreamLay this week"
          items={trendingNow}
          myListIds={user.myListIds}
          onToggleMyList={onToggleMyList}
          onPlay={onPlay}
          onViewDetails={onViewDetails}
          onSeeAll={() => onNavigatePage('movies')}
        />

        {/* Popular Movies */}
        <ContentRow
          title="Blockbuster Movies"
          subtitle="Critically acclaimed Hollywood and international films"
          items={popularMovies}
          myListIds={user.myListIds}
          onToggleMyList={onToggleMyList}
          onPlay={onPlay}
          onViewDetails={onViewDetails}
          onSeeAll={() => onNavigatePage('movies')}
        />

        {/* Popular Series */}
        <ContentRow
          title="Binge-Worthy Series"
          subtitle="Multi-season dramas, thrillers, and epics"
          items={popularSeries}
          myListIds={user.myListIds}
          onToggleMyList={onToggleMyList}
          onPlay={onPlay}
          onViewDetails={onViewDetails}
          onSeeAll={() => onNavigatePage('series')}
        />

        {/* New Releases */}
        <ContentRow
          title="New Releases"
          subtitle="Fresh additions to our 4K Ultra HD catalog"
          items={newReleases}
          myListIds={user.myListIds}
          onToggleMyList={onToggleMyList}
          onPlay={onPlay}
          onViewDetails={onViewDetails}
        />

        {/* Recommended For You */}
        <ContentRow
          title="Recommended For You"
          subtitle={`Curated based on your high-octane taste`}
          items={recommendedForYou}
          myListIds={user.myListIds}
          onToggleMyList={onToggleMyList}
          onPlay={onPlay}
          onViewDetails={onViewDetails}
        />

        {/* Top Rated */}
        <ContentRow
          title="All-Time Top Rated"
          subtitle="Titles boasting 8.5+ ratings from our global community"
          items={topRated}
          myListIds={user.myListIds}
          onToggleMyList={onToggleMyList}
          onPlay={onPlay}
          onViewDetails={onViewDetails}
        />
      </div>
    </div>
  );
};
