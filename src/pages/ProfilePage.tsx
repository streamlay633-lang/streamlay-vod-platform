import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Sparkles, 
  CreditCard, 
  ShieldCheck, 
  Settings, 
  Bookmark, 
  History, 
  Play, 
  Trash2, 
  Edit3, 
  Check, 
  LogOut, 
  Sliders, 
  Globe, 
  Bell, 
  Layers,
  Heart
} from 'lucide-react';
import { MediaItem, UserProfile } from '../types';
import { MediaCard } from '../components/MediaCard';

interface ProfilePageProps {
  user: UserProfile;
  mediaList: MediaItem[];
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onToggleMyList: (item: MediaItem, e: React.MouseEvent) => void;
  onPlay: (item: MediaItem) => void;
  onViewDetails: (item: MediaItem) => void;
  onLogout: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  mediaList,
  onUpdateUser,
  onToggleMyList,
  onPlay,
  onViewDetails,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'mylist' | 'history' | 'subscription' | 'settings'>('mylist');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editAvatar, setEditAvatar] = useState(user.avatarUrl);

  const avatarOptions = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  ];

  // My List items
  const myListItems = mediaList.filter((m) => user.myListIds.includes(m.id));

  // Watch history items mapped to media
  const historyItems = user.watchHistory
    .map((wh) => {
      const media = mediaList.find((m) => m.id === wh.mediaId);
      return media ? { ...media, watchedAt: wh.watchedAt, progress: wh.progressPercentage } : null;
    })
    .filter(Boolean) as (MediaItem & { watchedAt: string; progress: number })[];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name: editName.trim() || user.name,
      email: editEmail.trim() || user.email,
      avatarUrl: editAvatar,
    });
    setIsEditingProfile(false);
  };

  const handleClearHistory = () => {
    onUpdateUser({ watchHistory: [] });
  };

  return (
    <div id="profile-page" className="min-h-screen pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Profile Header Hero Card */}
      <div className="rounded-3xl bg-gradient-to-r from-[#11111c] via-[#141424] to-[#10101a] border border-white/[0.08] p-6 sm:p-8 mb-8 relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          {/* Avatar with glow */}
          <div className="relative group">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-violet-500/40 shadow-xl"
            />
            <button
              onClick={() => setIsEditingProfile(true)}
              className="absolute bottom-1 right-1 p-1.5 rounded-lg bg-violet-600 text-white shadow hover:scale-105 transition-transform cursor-pointer"
              title="Change avatar"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* User Details */}
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2.5">
                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                    {user.name || 'StreamLay User'}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-violet-600/30 text-violet-300 border border-violet-500/40">
                    VIP 4K
                  </span>
                </div>
                <p className="text-sm text-neutral-400 mt-0.5 flex items-center justify-center sm:justify-start gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{user.email}</span>
                </p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <button
                  id="edit-profile-btn"
                  onClick={() => setIsEditingProfile(true)}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-semibold text-white transition-all cursor-pointer flex items-center gap-2"
                >
                  <Edit3 className="w-3.5 h-3.5 text-violet-400" />
                  <span>Edit Profile</span>
                </button>

                <button
                  id="profile-logout-btn"
                  onClick={onLogout}
                  className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-semibold text-red-400 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-6 pt-5 border-t border-white/[0.08] grid grid-cols-3 sm:flex sm:items-center sm:gap-8 text-center sm:text-left">
              <div>
                <span className="text-xs text-neutral-400">My Watchlist</span>
                <p className="text-lg sm:text-xl font-bold text-white">{myListItems.length} titles</p>
              </div>
              <div>
                <span className="text-xs text-neutral-400">Watched</span>
                <p className="text-lg sm:text-xl font-bold text-violet-400">{user.watchHistory.length} streams</p>
              </div>
              <div>
                <span className="text-xs text-neutral-400">Membership</span>
                <p className="text-lg sm:text-xl font-bold text-white">Ultra 4K</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] mb-8 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setActiveTab('mylist')}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'mylist'
              ? 'border-violet-500 text-white font-bold'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>My Watchlist ({myListItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'history'
              ? 'border-violet-500 text-white font-bold'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Watch History</span>
        </button>

        <button
          onClick={() => setActiveTab('subscription')}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'subscription'
              ? 'border-violet-500 text-white font-bold'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Subscription & Billing</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'settings'
              ? 'border-violet-500 text-white font-bold'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Playback & Preferences</span>
        </button>
      </div>

      {/* Tab 1: My Watchlist */}
      {activeTab === 'mylist' && (
        <div>
          {myListItems.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">{myListItems.length} titles saved to your personal library</span>
                <button
                  onClick={() => onUpdateUser({ myListIds: [] })}
                  className="text-xs text-neutral-400 hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Watchlist</span>
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {myListItems.map((item) => (
                  <div key={item.id} className="flex justify-center">
                    <MediaCard
                      item={item}
                      inMyList={true}
                      onToggleMyList={onToggleMyList}
                      onPlay={onPlay}
                      onViewDetails={onViewDetails}
                      size="compact"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-[#0f0f18]/60 border border-white/[0.08] p-12 text-center max-w-md mx-auto space-y-4">
              <Bookmark className="w-12 h-12 text-neutral-600 mx-auto" />
              <h3 className="font-display text-lg font-bold text-white">Your Watchlist is empty</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Save movies and series you want to watch later by clicking the "+" button on any title card.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Watch History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-neutral-400">Recently watched titles across all synced devices</span>
            {historyItems.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="text-xs text-neutral-400 hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
            )}
          </div>

          {historyItems.length > 0 ? (
            <div className="space-y-3">
              {historyItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#0f0f18]/80 border border-white/[0.06] hover:border-violet-500/30 transition-all group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      className="w-16 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-white truncate text-base">{item.title}</h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.08] text-neutral-300">
                          {item.type.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-1">
                        Watched: <span className="text-neutral-300">{item.watchedAt}</span>
                      </p>
                      {/* Mini progress */}
                      <div className="mt-2 w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-violet-500 rounded-full"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onPlay(item)}
                      className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-violet-600/30"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Resume</span>
                    </button>
                    <button
                      onClick={() => onViewDetails(item)}
                      className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-[#0f0f18]/60 border border-white/[0.08] p-12 text-center max-w-md mx-auto space-y-4">
              <History className="w-12 h-12 text-neutral-600 mx-auto" />
              <h3 className="font-display text-lg font-bold text-white">No history recorded</h3>
              <p className="text-xs text-neutral-400">Stream your first movie or show to view your history log here.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Subscription Information */}
      {activeTab === 'subscription' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-[#0f0f18]/90 border border-white/[0.08] p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-400" />
                <h3 className="font-display text-lg font-bold text-white">Current Plan</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>

            <div>
              <h4 className="font-display text-2xl font-extrabold text-white">{user.plan}</h4>
              <p className="text-xs text-neutral-400 mt-1">Next auto-renewal date: {user.renewalDate}</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/[0.08] text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Unlimited 4K Ultra HD + HDR10 + Dolby Vision</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Immersive Spatial Audio & Dolby Atmos 7.1</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Up to 6 Simultaneous Device Screens</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>100% Ad-Free Premium Experience</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => alert('Plan managed: You are currently on the top-tier Ultra 4K plan.')}
                className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all cursor-pointer"
              >
                Manage Membership
              </button>
              <button
                onClick={() => alert('Invoice downloaded to system.')}
                className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-neutral-300 text-xs font-semibold transition-all cursor-pointer"
              >
                View Invoices
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-[#0f0f18]/90 border border-white/[0.08] p-6 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-violet-400" />
              <h3 className="font-display text-lg font-bold text-white">Active Devices</h3>
            </div>
            <p className="text-xs text-neutral-400">Manage registered TVs, tablets, and phones signed into your account.</p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <div>
                  <h5 className="text-xs font-semibold text-white">Web Browser (Current Session)</h5>
                  <p className="text-[11px] text-neutral-400">Chrome on Linux • Active Now</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                  This Device
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <div>
                  <h5 className="text-xs font-semibold text-white">Apple TV 4K Living Room</h5>
                  <p className="text-[11px] text-neutral-400">StreamLay App v4.2 • 2 hours ago</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.08] text-neutral-400">
                  Registered
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Settings & Playback Preferences */}
      {activeTab === 'settings' && (
        <div className="rounded-3xl bg-[#0f0f18]/90 border border-white/[0.08] p-6 sm:p-8 max-w-2xl space-y-6">
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-1">Playback Settings</h3>
            <p className="text-xs text-neutral-400">Customize video resolution, default subtitles, and stream behavior.</p>
          </div>

          <div className="space-y-4 divide-y divide-white/[0.06]">
            {/* Stream Quality */}
            <div className="pt-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-white">Default Video Quality</h4>
                <p className="text-xs text-neutral-400">Automatic adjusts to network bandwidth.</p>
              </div>
              <select
                value={user.streamQuality}
                onChange={(e) => onUpdateUser({ streamQuality: e.target.value as any })}
                className="bg-[#171724] border border-white/[0.12] text-xs text-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:border-violet-500 cursor-pointer"
              >
                <option value="Auto (4K)">Auto (Up to 4K UHD)</option>
                <option value="1080p FHD">1080p FHD (Balanced)</option>
                <option value="720p HD">720p HD (Data Saver)</option>
              </select>
            </div>

            {/* Language Selection */}
            <div className="pt-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-white">Interface & Audio Language</h4>
                <p className="text-xs text-neutral-400">Default audio track and subtitles.</p>
              </div>
              <select
                value={user.preferredLanguage}
                onChange={(e) => onUpdateUser({ preferredLanguage: e.target.value })}
                className="bg-[#171724] border border-white/[0.12] text-xs text-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:border-violet-500 cursor-pointer"
              >
                <option value="English (US)">English (US)</option>
                <option value="Spanish (ES)">Español</option>
                <option value="French (FR)">Français</option>
                <option value="German (DE)">Deutsch</option>
                <option value="Japanese (JP)">日本語</option>
              </select>
            </div>

            {/* Autoplay Next Episode */}
            <div className="pt-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-white">Autoplay Next Episode</h4>
                <p className="text-xs text-neutral-400">Automatically queue and play next episode in series.</p>
              </div>
              <button
                onClick={() => onUpdateUser({ autoplayNext: !user.autoplayNext })}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  user.autoplayNext ? 'bg-violet-600' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    user.autoplayNext ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Sound effects / Audio Enhancements */}
            <div className="pt-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-white">Spatial Audio Normalization</h4>
                <p className="text-xs text-neutral-400">Balances dynamic range between whisper dialogue and loud action.</p>
              </div>
              <button
                onClick={() => onUpdateUser({ soundEffects: !user.soundEffects })}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  user.soundEffects ? 'bg-violet-600' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    user.soundEffects ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Email Notifications */}
            <div className="pt-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-white">New Release Alerts</h4>
                <p className="text-xs text-neutral-400">Receive notifications when your favorite actors release new movies.</p>
              </div>
              <button
                onClick={() => onUpdateUser({ emailNotifications: !user.emailNotifications })}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  user.emailNotifications ? 'bg-violet-600' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    user.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12121e] rounded-3xl border border-white/10 p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <h3 className="font-display text-xl font-bold text-white">Edit Profile</h3>

            {/* Choose Avatar */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2">Choose Avatar</label>
              <div className="flex items-center gap-3">
                {avatarOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setEditAvatar(opt)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      editAvatar === opt ? 'border-violet-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={opt} alt="Avatar option" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Display Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-neutral-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-violet-600/40"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
