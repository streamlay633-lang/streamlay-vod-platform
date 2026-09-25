import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  ArrowLeft, 
  Subtitles, 
  Settings, 
  SkipForward, 
  Sparkles, 
  Check, 
  Sliders, 
  ExternalLink,
  FastForward
} from 'lucide-react';
import { MediaItem, Episode } from '../types';
import { getTranslation } from '../utils/translations';

interface VideoPlayerPageProps {
  item: MediaItem;
  episode?: Episode;
  onBack: () => void;
  onPlayNextEpisode?: () => void;
  onProgressUpdate?: (mediaId: string, progressPercentage: number) => void;
  nextItem?: MediaItem;
  lang?: string;
}

export const VideoPlayerPage: React.FC<VideoPlayerPageProps> = ({
  item,
  episode,
  onBack,
  onPlayNextEpisode,
  onProgressUpdate,
  nextItem,
  lang,
}) => {
  const activeLang = lang || (typeof document !== 'undefined' ? document.documentElement.lang : 'en');
  const t = (key: Parameters<typeof getTranslation>[0]) => getTranslation(key, activeLang);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<any>(null);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [videoQuality, setVideoQuality] = useState('4K Ultra HD');
  const [subtitle, setSubtitle] = useState<'Off' | 'English' | 'Spanish' | 'French' | 'German'>('English');
  const [audioTrack, setAudioTrack] = useState('English [Original] (Dolby Atmos 5.1)');

  // Settings menu toggle
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'main' | 'speed' | 'quality' | 'subtitles' | 'audio'>('main');

  // Skip intro state (visible in first 90 seconds)
  const [showSkipIntro, setShowSkipIntro] = useState(true);

  // Up Next end card overlay state
  const [showUpNextOverlay, setShowUpNextOverlay] = useState(false);

  // Timeline hover scrub preview
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number>(0);

  const videoSource = episode?.videoUrl || item.videoUrl;
  const displayTitle = episode ? `${item.title} — S${episode.seasonNumber}:E${episode.episodeNumber} "${episode.title}"` : item.title;

  // Helper to detect and extract embed URL if videoSource is an iframe tag or web embed URL
  const extractEmbedUrl = (source?: string): string | null => {
    if (!source) return null;
    const trimmed = source.trim();
    if (trimmed.toLowerCase().includes('<iframe')) {
      const match = trimmed.match(/src=["']?([^"'>\s]+)["']?/i);
      return match ? match[1] : null;
    }
    if (
      trimmed.includes('playmogo.com') ||
      trimmed.includes('goodstream.one') ||
      trimmed.includes('/embed') ||
      trimmed.includes('embed-') ||
      trimmed.includes('/e/') ||
      trimmed.includes('youtube.com') ||
      trimmed.includes('youtu.be') ||
      trimmed.includes('player.vimeo.com')
    ) {
      return trimmed;
    }
    if (
      (trimmed.startsWith('http://') || trimmed.startsWith('https://')) &&
      !trimmed.match(/\.(mp4|webm|ogg|m3u8|mov)(\?|$)/i)
    ) {
      return trimmed;
    }
    return null;
  };

  const embedUrl = extractEmbedUrl(videoSource);

  // Auto hide controls after inactivity
  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !isSettingsOpen) {
        setShowControls(false);
      }
    }, 3500);
  };

  useEffect(() => {
    handleMouseMove();
    return () => clearTimeout(controlsTimeoutRef.current);
  }, [isPlaying, isSettingsOpen]);

  // Keyboard shortcuts (Space = play/pause, M = mute, F = fullscreen, Esc/Backspace = back, Left/Right = seek)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'KeyM') {
        toggleMute();
      } else if (e.code === 'KeyF') {
        toggleFullscreen();
      } else if (e.code === 'ArrowLeft') {
        seekRelative(-10);
      } else if (e.code === 'ArrowRight') {
        seekRelative(10);
      } else if (e.key === 'Escape' && !document.fullscreenElement) {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted, duration]);

  // Fullscreen change listener
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Time & Duration updates
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      setCurrentTime(cur);

      // Hide skip intro after 90 seconds
      if (cur > 90 && showSkipIntro) {
        setShowSkipIntro(false);
      }

      // Show Up Next overlay during last 20 seconds
      const dur = videoRef.current.duration;
      if (dur > 0 && dur - cur <= 20) {
        setShowUpNextOverlay(true);
      } else {
        setShowUpNextOverlay(false);
      }

      // Periodically update progress
      if (dur > 0 && onProgressUpdate) {
        const pct = Math.max(1, Math.min(100, Math.round((cur / dur) * 100)));
        onProgressUpdate(item.id, pct);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const seekRelative = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickPos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = clickPos * duration;
    }
  };

  const handleTimelineHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      setHoverPosition(pos * 100);
      setHoverTime(pos * duration);
    }
  };

  const handleTimelineLeave = () => {
    setHoverTime(null);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      if (newVol > 0 && isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const togglePiP = async () => {
    if (videoRef.current) {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else {
          await videoRef.current.requestPictureInPicture();
        }
      } catch (err) {
        console.log('PiP not supported or error:', err);
      }
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setSettingsTab('main');
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const rem = Math.floor(secs % 60);
    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${rem < 10 ? '0' : ''}${rem}`;
    }
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div
      ref={containerRef}
      id="video-player-container"
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 bg-black text-white select-none overflow-hidden flex flex-col justify-between"
      style={{ cursor: showControls ? 'default' : 'none' }}
    >
      {/* Video Stream Container: Embedded IFRAME OR Native HTML5 Video */}
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={displayTitle}
          className="w-full h-full border-0 absolute inset-0 z-0 bg-black"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          scrolling="no"
          frameBorder="0"
        />
      ) : (
        <video
          ref={videoRef}
          src={videoSource}
          autoPlay
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={togglePlay}
          className="w-full h-full object-contain absolute inset-0 z-0 bg-black cursor-pointer"
        />
      )}

      {/* Simulated Subtitles Banner if enabled (Native video only) */}
      {!embedUrl && subtitle !== 'Off' && (
        <div className="absolute bottom-28 inset-x-0 flex justify-center z-10 pointer-events-none px-4 text-center">
          <span className="px-4 py-1.5 rounded-lg bg-black/75 backdrop-blur-md text-white font-medium text-sm sm:text-base md:text-lg tracking-wide border border-white/10 shadow-lg">
            [Narrator: "The neural pathways converge where memory meets synthetic intent..."]
          </span>
        </div>
      )}

      {/* Top Header Controls Bar */}
      <div
        className={`relative z-20 p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent flex items-center justify-between transition-opacity duration-300 ${
          showControls || embedUrl ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            id="player-back-btn"
            onClick={onBack}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all cursor-pointer shadow-lg"
            title={t('backToBrowse')}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-violet-400">
              {t('nowPlaying')} {embedUrl ? `• ${t('openStream')}` : `in ${videoQuality}`}
            </span>
            <h2 className="font-display font-bold text-sm sm:text-lg text-white truncate max-w-md sm:max-w-xl drop-shadow">
              {displayTitle}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {embedUrl && (
            <a
              href={embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-1.5 shadow-xl cursor-pointer"
              title={t('openStream')}
            >
              <ExternalLink className="w-3.5 h-3.5 text-violet-300" />
              <span className="hidden sm:inline">{t('openStream')}</span>
            </a>
          )}

          {/* Skip Intro Button in top right (Native video only) */}
          {!embedUrl && showSkipIntro && currentTime < 90 && (
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 90;
                  setShowSkipIntro(false);
                }
              }}
              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-1.5 shadow-xl cursor-pointer"
            >
              <span>{t('skipIntro')}</span>
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/60 border border-white/10 text-xs font-semibold text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>HDR 10+</span>
          </div>
        </div>
      </div>

      {/* Up Next Overlay Card when near the end */}
      {showUpNextOverlay && (
        <div className="absolute top-20 right-6 z-30 max-w-sm rounded-2xl bg-[#12121e]/95 backdrop-blur-xl border border-violet-500/40 p-4 shadow-2xl animate-in fade-in slide-in-from-right duration-300">
          <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400 block mb-1">
            {t('upNextIn')}
          </span>
          <h4 className="font-semibold text-white text-sm truncate">
            {nextItem ? nextItem.title : 'Season 2: The Ethereal Fracture'}
          </h4>
          <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
            {t('upNextDesc')}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => {
                if (onPlayNextEpisode) {
                  onPlayNextEpisode();
                } else if (nextItem) {
                  // Restart or trigger next
                  setShowUpNextOverlay(false);
                }
              }}
              className="flex-1 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all cursor-pointer"
            >
              {t('play')}
            </button>
            <button
              onClick={() => setShowUpNextOverlay(false)}
              className="px-3 py-2 rounded-xl bg-white/10 text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              {t('dismiss')}
            </button>
          </div>
        </div>
      )}

      {/* Bottom Controls Bar (Native Video Only) */}
      {!embedUrl && (
        <div
          className={`relative z-20 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent space-y-3 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
        {/* Timeline Scrubber */}
        <div
          className="relative w-full h-2 hover:h-3.5 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer transition-all flex items-center group/scrubber"
          onClick={handleSeek}
          onMouseMove={handleTimelineHover}
          onMouseLeave={handleTimelineLeave}
        >
          {/* Played Progress Bar */}
          <div
            className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-full relative"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          >
            {/* Scrubber thumb */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg shadow-purple-600 scale-0 group-hover/scrubber:scale-100 transition-transform" />
          </div>

          {/* Hover timestamp tooltip */}
          {hoverTime !== null && (
            <div
              className="absolute -top-9 -translate-x-1/2 px-2 py-1 rounded bg-black/85 backdrop-blur-md text-[11px] font-mono font-semibold text-white border border-white/20 pointer-events-none shadow"
              style={{ left: `${hoverPosition}%` }}
            >
              {formatTime(hoverTime)}
            </div>
          )}
        </div>

        {/* Action Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          {/* Left Controls: Play, Rewind, Fast Forward, Volume, Time */}
          <div className="flex items-center gap-3">
            <button
              id="player-toggle-play-btn"
              onClick={togglePlay}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-transform hover:scale-105 cursor-pointer"
              title={isPlaying ? t('pause') : t('play')}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
            </button>

            {/* 10s Rewind */}
            <button
              onClick={() => seekRelative(-10)}
              className="p-2 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title={t('rewind10s')}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* 10s Fast Forward */}
            <button
              onClick={() => seekRelative(10)}
              className="p-2 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title={t('forward10s')}
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Next Episode Shortcut for series */}
            {onPlayNextEpisode && (
              <button
                onClick={onPlayNextEpisode}
                className="p-2 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title={t('nextEpisode')}
              >
                <FastForward className="w-4 h-4" />
              </button>
            )}

            {/* Volume & Mute */}
            <div className="flex items-center gap-2 group/vol">
              <button
                onClick={toggleMute}
                className="p-2 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title={isMuted ? t('unmute') : t('mute')}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-16 sm:w-20 h-1 bg-white/30 accent-violet-500 rounded-lg cursor-pointer"
              />
            </div>

            {/* Timestamp Display */}
            <div className="text-xs font-mono text-neutral-300 pl-2">
              <span>{formatTime(currentTime)}</span>
              <span className="text-neutral-500 mx-1">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Controls: Subtitles, Speed, Settings, PiP, Fullscreen */}
          <div className="flex items-center gap-2 relative">
            {/* Subtitles shortcut */}
            <button
              onClick={() => {
                setSettingsTab('subtitles');
                setIsSettingsOpen(true);
              }}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                subtitle !== 'Off'
                  ? 'bg-violet-600/30 border-violet-400 text-violet-300'
                  : 'bg-transparent border-transparent text-neutral-300 hover:text-white'
              }`}
              title={t('subtitles')}
            >
              <Subtitles className="w-4 h-4" />
            </button>

            {/* Settings Dialog Toggle */}
            <button
              id="player-settings-btn"
              onClick={() => {
                setIsSettingsOpen(!isSettingsOpen);
                setSettingsTab('main');
              }}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isSettingsOpen ? 'bg-white/20 text-white' : 'text-neutral-300 hover:text-white'
              }`}
              title={t('streamPreferences')}
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Picture-in-Picture */}
            <button
              onClick={togglePiP}
              className="p-2 text-neutral-300 hover:text-white transition-colors cursor-pointer hidden sm:block"
              title={t('pictureInPicture')}
            >
              <ExternalLink className="w-4 h-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              id="player-fullscreen-btn"
              onClick={toggleFullscreen}
              className="p-2 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title={isFullscreen ? t('exitFullscreen') : t('enterFullscreen')}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* In-Player Settings Popup Menu */}
            {isSettingsOpen && (
              <div className="absolute right-0 bottom-14 w-72 rounded-2xl bg-[#10101c]/95 backdrop-blur-2xl border border-white/10 p-3 shadow-2xl shadow-black/90 z-50 text-xs">
                {/* Main Settings View */}
                {settingsTab === 'main' && (
                  <div className="space-y-1">
                    <div className="px-2 py-1.5 font-bold text-white border-b border-white/[0.08] mb-1 flex items-center justify-between">
                      <span>{t('streamPreferences')}</span>
                      <span className="text-[10px] text-violet-400 font-semibold">{videoQuality}</span>
                    </div>

                    <button
                      onClick={() => setSettingsTab('quality')}
                      className="w-full px-2.5 py-2 rounded-xl hover:bg-white/[0.06] flex items-center justify-between text-neutral-300 hover:text-white transition-colors"
                    >
                      <span>{t('quality')}</span>
                      <span className="text-neutral-400">{videoQuality} &rarr;</span>
                    </button>

                    <button
                      onClick={() => setSettingsTab('speed')}
                      className="w-full px-2.5 py-2 rounded-xl hover:bg-white/[0.06] flex items-center justify-between text-neutral-300 hover:text-white transition-colors"
                    >
                      <span>{t('playbackSpeed')}</span>
                      <span className="text-neutral-400">{playbackSpeed}x &rarr;</span>
                    </button>

                    <button
                      onClick={() => setSettingsTab('subtitles')}
                      className="w-full px-2.5 py-2 rounded-xl hover:bg-white/[0.06] flex items-center justify-between text-neutral-300 hover:text-white transition-colors"
                    >
                      <span>{t('subtitles')}</span>
                      <span className="text-neutral-400">{subtitle === 'Off' ? t('off') : subtitle} &rarr;</span>
                    </button>

                    <button
                      onClick={() => setSettingsTab('audio')}
                      className="w-full px-2.5 py-2 rounded-xl hover:bg-white/[0.06] flex items-center justify-between text-neutral-300 hover:text-white transition-colors"
                    >
                      <span>{t('audioTrack')}</span>
                      <span className="text-neutral-400">Atmos 5.1 &rarr;</span>
                    </button>
                  </div>
                )}

                {/* Submenu: Quality */}
                {settingsTab === 'quality' && (
                  <div className="space-y-1">
                    <button
                      onClick={() => setSettingsTab('main')}
                      className="text-[11px] text-violet-400 font-semibold mb-2 block hover:underline"
                    >
                      &larr; {t('backToSettings')}
                    </button>
                    {['4K Ultra HD (Dolby Vision)', '1080p Full HD', '720p HD', 'Auto (Dynamic Bandwidth)'].map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setVideoQuality(q);
                          setSettingsTab('main');
                        }}
                        className="w-full px-2.5 py-2 rounded-xl hover:bg-white/[0.06] flex items-center justify-between text-neutral-300 hover:text-white transition-colors"
                      >
                        <span>{q}</span>
                        {videoQuality === q && <Check className="w-3.5 h-3.5 text-violet-400" />}
                      </button>
                    ))}
                  </div>
                )}

                {/* Submenu: Speed */}
                {settingsTab === 'speed' && (
                  <div className="space-y-1">
                    <button
                      onClick={() => setSettingsTab('main')}
                      className="text-[11px] text-violet-400 font-semibold mb-2 block hover:underline"
                    >
                      &larr; {t('backToSettings')}
                    </button>
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSpeedChange(s)}
                        className="w-full px-2.5 py-2 rounded-xl hover:bg-white/[0.06] flex items-center justify-between text-neutral-300 hover:text-white transition-colors"
                      >
                        <span>{s === 1 ? t('normalSpeed') : `${s}x`}</span>
                        {playbackSpeed === s && <Check className="w-3.5 h-3.5 text-violet-400" />}
                      </button>
                    ))}
                  </div>
                )}

                {/* Submenu: Subtitles */}
                {settingsTab === 'subtitles' && (
                  <div className="space-y-1">
                    <button
                      onClick={() => setSettingsTab('main')}
                      className="text-[11px] text-violet-400 font-semibold mb-2 block hover:underline"
                    >
                      &larr; {t('backToSettings')}
                    </button>
                    {(['Off', 'English', 'Spanish', 'French', 'German'] as const).map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          setSubtitle(sub);
                          setSettingsTab('main');
                        }}
                        className="w-full px-2.5 py-2 rounded-xl hover:bg-white/[0.06] flex items-center justify-between text-neutral-300 hover:text-white transition-colors"
                      >
                        <span>{sub === 'Off' ? t('off') : sub}</span>
                        {subtitle === sub && <Check className="w-3.5 h-3.5 text-violet-400" />}
                      </button>
                    ))}
                  </div>
                )}

                {/* Submenu: Audio */}
                {settingsTab === 'audio' && (
                  <div className="space-y-1">
                    <button
                      onClick={() => setSettingsTab('main')}
                      className="text-[11px] text-violet-400 font-semibold mb-2 block hover:underline"
                    >
                      &larr; {t('backToSettings')}
                    </button>
                    {[
                      'English [Original] (Dolby Atmos 5.1)',
                      'Spanish (Latin America 5.1)',
                      'French (Studio Stereo)',
                      'Director Commentary Track'
                    ].map((aud) => (
                      <button
                        key={aud}
                        onClick={() => {
                          setAudioTrack(aud);
                          setSettingsTab('main');
                        }}
                        className="w-full px-2.5 py-2 rounded-xl hover:bg-white/[0.06] flex items-center justify-between text-neutral-300 hover:text-white transition-colors"
                      >
                        <span className="truncate pr-2">{aud}</span>
                        {audioTrack === aud && <Check className="w-3.5 h-3.5 text-violet-400 shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
