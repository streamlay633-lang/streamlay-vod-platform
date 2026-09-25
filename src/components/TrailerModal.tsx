import React, { useEffect, useRef } from 'react';
import { X, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { MediaItem } from '../types';
import { getTranslation, getGenreTranslation } from '../utils/translations';

interface TrailerModalProps {
  item: MediaItem | null;
  onClose: () => void;
  onPlayFull: (item: MediaItem) => void;
  lang?: string;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({ item, onClose, onPlayFull, lang }) => {
  const activeLang = lang || (typeof document !== 'undefined' ? document.documentElement.lang : 'en');
  const t = (key: Parameters<typeof getTranslation>[0]) => getTranslation(key, activeLang);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      id="trailer-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="trailer-modal-content"
        className="relative w-full max-w-4xl bg-[#0e0e17] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-950/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] bg-[#12121e]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-500/20 px-2 py-0.5 rounded">
              {t('officialTrailer')}
            </span>
            <h3 className="font-semibold text-white text-base truncate">{item.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPlayFull(item)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <span>{t('playNow')}</span>
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              id="trailer-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title={t('close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video stream container */}
        <div className="relative aspect-video w-full bg-black">
          <video
            ref={videoRef}
            src={item.trailerUrl}
            autoPlay
            controls
            playsInline
            className="w-full h-full object-contain"
          />
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#0a0a12] flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span>{item.releaseYear}</span>
            <span>•</span>
            <span>{item.genres.map(g => getGenreTranslation(g, activeLang)).join(', ')}</span>
            <span>•</span>
            <span className="text-white font-medium">{item.runtime || `${item.seasonsCount} ${t('seasonsPlural')}`}</span>
          </div>
          <button
            onClick={() => onPlayFull(item)}
            className="text-violet-400 hover:text-violet-300 font-semibold cursor-pointer"
          >
            {t('startWatchingNow')} &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
