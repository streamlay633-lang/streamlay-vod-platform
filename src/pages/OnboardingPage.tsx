import React, { useState } from 'react';
import { Play, ArrowRight, Sparkles, Film, ShieldCheck } from 'lucide-react';

interface OnboardingPageProps {
  onComplete: (name: string) => void;
  initialName?: string;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({
  onComplete,
  initialName = '',
}) => {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter your name or nickname to continue.');
      return;
    }
    onComplete(trimmed);
  };

  return (
    <div
      id="onboarding-page"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#07070b] text-white px-4 py-12 select-none"
    >
      {/* Cinematic Ambient Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&auto=format&fit=crop&q=80"
          alt="Cinematic background"
          className="w-full h-full object-cover object-center opacity-30 filter blur-sm scale-105 transform animate-pulse duration-1000"
          style={{ animationDuration: '10s' }}
        />
        {/* Layered Gradient Masks */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070b] via-[#07070b]/80 to-[#07070b]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-purple-950/10 to-transparent" />
      </div>

      {/* Center Onboarding Card */}
      <div className="relative z-10 w-full max-w-lg mx-auto">
        {/* StreamLay Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 flex items-center justify-center shadow-2xl shadow-purple-600/40 mb-4 transform hover:scale-105 transition-transform">
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-3xl tracking-tight text-white">
              Stream<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">Lay</span>
            </span>
            <span className="px-2 py-0.5 text-[11px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-md">
              PREMIUM
            </span>
          </div>
        </div>

        {/* Form Container */}
        <div className="rounded-3xl bg-[#0f0f18]/90 backdrop-blur-2xl border border-white/[0.09] p-6 sm:p-10 shadow-2xl shadow-black/80">
          <div className="text-center mb-6">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Welcome to StreamLay
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Who will be watching today? Enter your name to personalize your cinema experience, watchlist, and 4K stream recommendations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="user-name-input"
                className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2"
              >
                Your Name or Profile Nickname
              </label>
              <div className="relative">
                <input
                  id="user-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="e.g. Alex, Sarah, or Neo"
                  maxLength={32}
                  autoFocus
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.12] text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 text-base font-medium transition-all"
                />
                <Sparkles className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400/60 pointer-events-none" />
              </div>
              {error && <p className="text-xs text-rose-400 mt-2 font-medium">{error}</p>}
            </div>

            {/* Quick Profile Suggestions */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-neutral-500 font-medium">Quick suggestions:</span>
              {['Cinema Lover', 'Alex', 'Jordan', 'Guest'].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setName(suggestion);
                    setError('');
                  }}
                  className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/[0.06] transition-colors cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Submit Button */}
            <button
              id="onboarding-continue-btn"
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-base shadow-xl shadow-purple-900/40 hover:shadow-purple-900/60 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              <span>Continue to StreamLay</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Value Props Footer */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] grid grid-cols-2 gap-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
              <Film className="w-4 h-4 text-violet-400" />
              <span>4K HDR Cinema</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>No Ads • High Fidelity</span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-neutral-600 mt-6">
          By continuing, you enjoy unmetered access to StreamLay Originals, Movies, Series, and Live TV.
        </p>
      </div>
    </div>
  );
};
