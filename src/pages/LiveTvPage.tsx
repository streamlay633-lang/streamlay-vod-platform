import React, { useState, useRef, useEffect } from 'react';
import Hls from 'hls.js';
import { 
  Tv, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Users, 
  Clock, 
  Calendar, 
  Play, 
  Sparkles,
  Signal,
  Upload,
  Plus,
  RotateCw,
  ExternalLink,
  AlertCircle,
  Search,
  Check
} from 'lucide-react';
import { LiveChannel, LiveProgram } from '../types';
import { MOCK_LIVE_CHANNELS } from '../data/mockData';
import { parseM3U } from '../utils/m3uParser';

const STORAGE_CUSTOM_CHANNELS_KEY = 'streamlay_custom_channels';

interface LiveTvPageProps {
  onPlayFullscreen?: (channel: LiveChannel) => void;
}

export const LiveTvPage: React.FC<LiveTvPageProps> = () => {
  const [channels, setChannels] = useState<LiveChannel[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CUSTOM_CHANNELS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {}
    return MOCK_LIVE_CHANNELS;
  });

  const [selectedChannel, setSelectedChannel] = useState<LiveChannel>(() => channels[0] || MOCK_LIVE_CHANNELS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMuted, setIsMuted] = useState(true);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [isLoadingStream, setIsLoadingStream] = useState(true);

  // M3U Import Modal
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [m3uText, setM3uText] = useState('');
  const [importSuccessMsg, setImportSuccessMsg] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  // Categories list with Algeria highlighted
  const categories = ['All', 'Algeria', 'News', 'Sports', 'Kids', 'Entertainment', 'Movies', 'Music'];

  // Filter channels
  const filteredChannels = channels.filter((c) => {
    const matchesCat =
      selectedCategory === 'All'
        ? true
        : selectedCategory === 'Algeria'
        ? c.country === 'Algeria' || c.groupTitle?.toLowerCase().includes('algeria') || c.category?.toLowerCase() === 'algeria'
        : c.category.toLowerCase() === selectedCategory.toLowerCase() ||
          c.groupTitle?.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch =
      searchQuery.trim() === '' ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.currentProgram.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.groupTitle && c.groupTitle.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  // Attach and play stream via HLS.js or native video
  const loadStream = (channel: LiveChannel) => {
    setStreamError(null);
    setIsLoadingStream(true);

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const video = videoRef.current;
    if (!video) return;

    const streamUrl = channel.streamUrl;
    const isHls = streamUrl.includes('.m3u8') || streamUrl.includes('chunks.m3u8');

    if (isHls && Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 60,
      });
      hlsRef.current = hls;

      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoadingStream(false);
        video.play().catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              setIsLoadingStream(false);
              setStreamError('Network or CORS error connecting to live broadcast feed.');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              setIsLoadingStream(false);
              hls.recoverMediaError();
              break;
            default:
              setIsLoadingStream(false);
              setStreamError('Unable to decode live stream broadcast. The stream might be geo-restricted or temporarily offline.');
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', () => {
        setIsLoadingStream(false);
        video.play().catch(() => {});
      });
      video.addEventListener('error', () => {
        setIsLoadingStream(false);
        setStreamError('Live stream error. Browser may be blocking HTTP mixed content or cross-origin stream.');
      });
    } else {
      // Standard MP4 fallback
      video.src = streamUrl;
      video.load();
      video.play().catch(() => {});
      setIsLoadingStream(false);
    }
  };

  useEffect(() => {
    loadStream(selectedChannel);

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [selectedChannel]);

  const handleSelectChannel = (channel: LiveChannel) => {
    setSelectedChannel(channel);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  const handleImportM3U = (e: React.FormEvent) => {
    e.preventDefault();
    if (!m3uText.trim()) return;

    try {
      const parsedChannels = parseM3U(m3uText, channels.length + 1);
      if (parsedChannels.length === 0) {
        alert('No valid channels found in the provided M3U playlist. Check the formatting.');
        return;
      }

      const combined = [...parsedChannels, ...channels];
      setChannels(combined);
      setSelectedChannel(parsedChannels[0]);
      localStorage.setItem(STORAGE_CUSTOM_CHANNELS_KEY, JSON.stringify(combined));

      setImportSuccessMsg(`Successfully imported ${parsedChannels.length} channel(s)!`);
      setTimeout(() => {
        setIsImportModalOpen(false);
        setImportSuccessMsg(null);
        setM3uText('');
      }, 1500);
    } catch (err) {
      alert('Error parsing M3U playlist.');
    }
  };

  const handleResetChannels = () => {
    localStorage.removeItem(STORAGE_CUSTOM_CHANNELS_KEY);
    setChannels(MOCK_LIVE_CHANNELS);
    setSelectedChannel(MOCK_LIVE_CHANNELS[0]);
  };

  // Helper to render channel logo
  const renderLogo = (logo: string, name: string) => {
    if (logo && (logo.startsWith('http://') || logo.startsWith('https://'))) {
      return (
        <img
          src={logo}
          alt={name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback to Tv icon on error
            (e.target as HTMLElement).style.display = 'none';
          }}
          className="w-full h-full object-contain p-0.5 rounded-lg"
        />
      );
    }
    return <span className="text-lg">{logo || '📺'}</span>;
  };

  return (
    <div id="live-tv-page" className="min-h-screen pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Live TV Guide
            </h1>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider">LIVE 24/7</span>
            </div>
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              HLS .m3u8 Ready
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Real-time IPTV broadcast streams, Algerian channels, live sports, news, and Electronic Program Guide.
          </p>
        </div>

        {/* Action Controls: Search & Import Playlist */}
        <div className="flex items-center gap-2.5">
          <button
            id="open-import-m3u-btn"
            onClick={() => setIsImportModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-violet-300 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-violet-900/20"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import M3U</span>
          </button>

          {channels !== MOCK_LIVE_CHANNELS && (
            <button
              onClick={handleResetChannels}
              className="px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-400 hover:text-white text-xs font-medium transition-colors cursor-pointer"
              title="Reset default channels"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Category Pills & Channel Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              {cat === 'Algeria' ? '🇩🇿 Algeria' : cat}
            </button>
          ))}
        </div>

        {/* Search Channel Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Find channel or show..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Main Broadcast Stage: Video Preview + Now Playing Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Live Stream Player (Left 8 cols) */}
        <div className="lg:col-span-8 rounded-3xl overflow-hidden bg-[#0c0c14] border border-white/[0.1] shadow-2xl relative group">
          <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
            {/* Native Video element connected to HLS.js */}
            <video
              ref={videoRef}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-contain"
            />

            {/* Loading Spinner */}
            {isLoadingStream && !streamError && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center pointer-events-none">
                <div className="w-10 h-10 border-3 border-violet-500 border-t-transparent rounded-full animate-spin mb-3" />
                <span className="text-xs font-semibold text-neutral-300">Tuning into live satellite feed...</span>
              </div>
            )}

            {/* Error Overlay with Fallback Action */}
            {streamError && (
              <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
                <AlertCircle className="w-10 h-10 text-amber-400 mb-2" />
                <h4 className="font-display text-base font-bold text-white mb-1">
                  Live Stream Offline or Protected
                </h4>
                <p className="text-xs text-neutral-400 max-w-md mb-4 leading-relaxed">
                  {streamError}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => loadStream(selectedChannel)}
                    className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Retry Stream</span>
                  </button>
                  <a
                    href={selectedChannel.streamUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-neutral-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Direct Link</span>
                  </a>
                </div>
              </div>
            )}

            {/* Overlaid Channel & LIVE Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none z-10">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-white text-xs font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-md shadow-red-500 animate-pulse" />
                <span className="text-red-400 uppercase tracking-wider">LIVE</span>
                <span className="text-neutral-500">|</span>
                <span className="text-white">CH {selectedChannel.number}</span>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-violet-600/80 backdrop-blur-md text-white text-xs font-semibold border border-violet-400/30">
                {selectedChannel.badge}
              </span>
            </div>

            {/* Viewer Count Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-neutral-300 text-xs font-medium z-10">
              <Users className="w-3.5 h-3.5 text-violet-400" />
              <span>{selectedChannel.viewers}</span>
            </div>

            {/* Player Quick Controls on Hover */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between opacity-90 group-hover:opacity-100 transition-opacity z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                  {renderLogo(selectedChannel.logo, selectedChannel.name)}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base leading-tight drop-shadow">
                    {selectedChannel.name}
                  </h3>
                  <p className="text-xs text-neutral-300 drop-shadow flex items-center gap-2">
                    <span className="text-violet-300 font-medium">{selectedChannel.currentProgram.title}</span>
                    <span>•</span>
                    <span>{selectedChannel.currentProgram.startTime} - {selectedChannel.currentProgram.endTime}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-xl bg-black/60 hover:bg-white/20 text-white backdrop-blur-md transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-white" />}
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-xl bg-black/60 hover:bg-white/20 text-white backdrop-blur-md transition-colors cursor-pointer"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Current Program Details Banner Below Video */}
          <div className="p-5 sm:p-6 bg-[#0f0f18] border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-violet-400">
                    {selectedChannel.currentProgram.category} • {selectedChannel.currentProgram.rating}
                  </span>
                  {selectedChannel.country && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.08] text-neutral-300 font-medium">
                      {selectedChannel.country}
                    </span>
                  )}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  {selectedChannel.currentProgram.title}
                </h2>
              </div>

              {/* Progress time indicator */}
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Clock className="w-4 h-4 text-neutral-500" />
                <span>{selectedChannel.currentProgram.startTime} – {selectedChannel.currentProgram.endTime}</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.06] text-neutral-300 font-semibold">
                  {selectedChannel.currentProgram.durationMinutes} min
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
              {selectedChannel.currentProgram.description}
            </p>
          </div>
        </div>

        {/* Up Next & Quick Channel Switcher (Right 4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* "What's On Now" & "Up Next" preview */}
          <div className="rounded-3xl bg-[#0f0f18]/90 border border-white/[0.08] p-5 backdrop-blur-xl">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-neutral-300 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>Upcoming On {selectedChannel.name}</span>
            </h3>

            <div className="space-y-3">
              {selectedChannel.upcomingPrograms.map((up) => (
                <div
                  key={up.id}
                  className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] transition-all"
                >
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                    <span className="font-semibold text-violet-300">{up.startTime}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-neutral-400">
                      {up.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white truncate">{up.title}</h4>
                  <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">{up.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Signal Health Status */}
          <div className="rounded-3xl bg-[#0f0f18]/90 border border-white/[0.08] p-4 flex items-center justify-between text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <Signal className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-white font-medium block">IPTV Engine Active</span>
                <span className="text-[11px] text-neutral-500">HLS Video Streaming</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
              1080p 60FPS
            </span>
          </div>
        </div>
      </div>

      {/* Electronic Program Guide (EPG) Section */}
      <div className="mt-8 rounded-3xl bg-[#0d0d16] border border-white/[0.08] p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-violet-400" />
            <h3 className="font-display text-lg sm:text-xl font-bold text-white">
              Electronic Program Guide (EPG)
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/[0.06] text-neutral-400">
              {filteredChannels.length} channels
            </span>
          </div>
          <span className="text-xs text-neutral-400">Click any channel row to tune in live</span>
        </div>

        {/* EPG Timeline Guide */}
        <div className="overflow-x-auto no-scrollbar">
          <div className="min-w-[700px] space-y-2">
            {/* Header Timeline Columns */}
            <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-neutral-400 pb-2 border-b border-white/[0.08] px-3">
              <div className="col-span-4">CHANNEL</div>
              <div className="col-span-4 text-violet-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>NOW (LIVE)</span>
              </div>
              <div className="col-span-2">NEXT</div>
              <div className="col-span-2">LATER</div>
            </div>

            {/* Channel EPG Rows */}
            {filteredChannels.map((channel) => {
              const isCurrent = selectedChannel.id === channel.id;
              const nextProgram = channel.upcomingPrograms[0];
              const laterProgram = channel.upcomingPrograms[1];

              return (
                <div
                  key={channel.id}
                  id={`epg-channel-${channel.id}`}
                  onClick={() => handleSelectChannel(channel)}
                  className={`grid grid-cols-12 gap-2 p-3 rounded-2xl items-center cursor-pointer transition-all ${
                    isCurrent
                      ? 'bg-violet-950/40 border border-violet-500/40 shadow-lg shadow-violet-900/20'
                      : 'bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04]'
                  }`}
                >
                  {/* Channel identity */}
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-black/50 flex items-center justify-center border border-white/[0.08] shrink-0 overflow-hidden">
                      {renderLogo(channel.logo, channel.name)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-mono font-bold text-violet-400">#{channel.number}</span>
                        <h4 className="text-sm font-semibold text-white truncate">{channel.name}</h4>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                        <span>{channel.category}</span>
                        {channel.country && <span>• {channel.country}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Program Now */}
                  <div className="col-span-4 p-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-0.5">
                      <span className="text-violet-300 font-semibold">{channel.currentProgram.startTime}</span>
                      <span className="text-red-400 font-bold text-[10px] uppercase">Live</span>
                    </div>
                    <p className="text-xs font-semibold text-white truncate">{channel.currentProgram.title}</p>
                  </div>

                  {/* Program Next */}
                  <div className="col-span-2 p-2 rounded-xl bg-white/[0.02] border border-white/[0.03]">
                    <span className="text-[11px] text-neutral-400 font-semibold block mb-0.5">
                      {nextProgram?.startTime || '--:--'}
                    </span>
                    <p className="text-xs text-neutral-300 truncate">{nextProgram?.title || 'Programming'}</p>
                  </div>

                  {/* Program Later */}
                  <div className="col-span-2 p-2 rounded-xl bg-white/[0.01]">
                    <span className="text-[11px] text-neutral-500 block mb-0.5">
                      {laterProgram?.startTime || '--:--'}
                    </span>
                    <p className="text-xs text-neutral-400 truncate">{laterProgram?.title || 'Up Next'}</p>
                  </div>
                </div>
              );
            })}

            {filteredChannels.length === 0 && (
              <div className="py-12 text-center text-neutral-400 space-y-2">
                <Tv className="w-8 h-8 mx-auto text-neutral-600" />
                <p className="text-sm">No live channels match your search filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* M3U Playlist Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12121e] rounded-3xl border border-white/10 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-violet-400" />
                <h3 className="font-display text-xl font-bold text-white">Import M3U Playlist</h3>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="text-neutral-400 hover:text-white text-xs cursor-pointer"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Paste raw M3U / M3U8 text containing <code className="text-violet-300">#EXTINF</code> tags and stream URLs to add your custom IPTV channels directly into StreamLay.
            </p>

            {importSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{importSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleImportM3U} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  M3U Content
                </label>
                <textarea
                  rows={8}
                  value={m3uText}
                  onChange={(e) => setM3uText(e.target.value)}
                  placeholder={`#EXTM3U\n#EXTINF:-1 tvg-name="My Channel" tvg-logo="https://..." group-title="News",My Channel\nhttps://example.com/stream.m3u8`}
                  className="w-full font-mono text-xs p-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white focus:outline-none focus:border-violet-500 resize-none placeholder-neutral-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-neutral-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-violet-600/40"
                >
                  Import Channels
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
