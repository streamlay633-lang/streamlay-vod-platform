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
  Heart,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  ShieldAlert,
  AlertTriangle,
  RotateCcw,
  Film,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Shield
} from 'lucide-react';
import { MediaItem, UserProfile, ParentalRestrictionLevel } from '../types';
import { MediaCard } from '../components/MediaCard';
import { PROFILE_PICTURE_CATEGORIES } from '../data/mockData';
import { PinInput } from '../components/PinInput';

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
  const [activeTab, setActiveTab] = useState<'mylist' | 'history' | 'avatars' | 'subscription' | 'settings' | 'parental'>('mylist');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editAvatar, setEditAvatar] = useState(user.avatarUrl);
  const [modalCategory, setModalCategory] = useState<string>('Onegai AiPri');

  // Parental Controls state
  const currentSavedPin = user.parentalControls?.pin || user.parentalPin || '';
  const isParentalEnabled = Boolean(user.parentalControls?.isEnabled && currentSavedPin);
  
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pinModalMode, setPinModalMode] = useState<'set' | 'change' | 'disable' | 'reset'>('set');
  const [pinStep, setPinStep] = useState<'verify_current' | 'enter_new' | 'confirm_new'>('enter_new');
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [isPinMasked, setIsPinMasked] = useState(true);
  const [pinModalError, setPinModalError] = useState('');
  const [pinSuccessToast, setPinSuccessToast] = useState('');
  const [revealStoredPin, setRevealStoredPin] = useState(false);

  // Sandbox tester state
  const [sandboxPinInput, setSandboxPinInput] = useState('');
  const [sandboxStatus, setSandboxStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [sandboxUnlocked, setSandboxUnlocked] = useState(false);

  // Handlers for Parental Controls
  const handleOpenSetPinModal = (mode: 'set' | 'change' | 'disable' | 'reset' = 'set') => {
    setPinModalMode(mode);
    setPinModalError('');
    setCurrentPinInput('');
    setNewPinInput('');
    setConfirmPinInput('');
    
    if (mode === 'change' || mode === 'disable' || mode === 'reset') {
      setPinStep('verify_current');
    } else {
      setPinStep('enter_new');
    }
    setIsPinModalOpen(true);
  };

  const handleToggleParentalControls = () => {
    if (!isParentalEnabled) {
      if (!currentSavedPin) {
        handleOpenSetPinModal('set');
      } else {
        onUpdateUser({
          parentalControlsEnabled: true,
          parentalControls: {
            isEnabled: true,
            pin: currentSavedPin,
            restrictionLevel: user.parentalControls?.restrictionLevel || 'TV-MA / R / M',
            restrictPurchases: user.parentalControls?.restrictPurchases || false,
          },
        });
      }
    } else {
      handleOpenSetPinModal('disable');
    }
  };

  const handleVerifyCurrentPin = () => {
    if (currentPinInput !== currentSavedPin) {
      setPinModalError('Incorrect current PIN. Please try again.');
      return;
    }
    setPinModalError('');
    if (pinModalMode === 'disable') {
      onUpdateUser({
        parentalControlsEnabled: false,
        parentalControls: {
          ...(user.parentalControls || {
            pin: currentSavedPin,
            restrictionLevel: 'TV-MA / R / M',
          }),
          isEnabled: false,
        },
      });
      setIsPinModalOpen(false);
      setPinSuccessToast('Parental Controls have been disabled.');
      setTimeout(() => setPinSuccessToast(''), 4000);
      return;
    }
    if (pinModalMode === 'reset') {
      onUpdateUser({
        parentalPin: '',
        parentalControlsEnabled: false,
        parentalControls: {
          isEnabled: false,
          pin: '',
          restrictionLevel: 'TV-MA / R / M',
        },
      });
      setIsPinModalOpen(false);
      setPinSuccessToast('Parental PIN cleared from user profile.');
      setTimeout(() => setPinSuccessToast(''), 4000);
      return;
    }
    // Mode is 'change', move to enter_new
    setPinStep('enter_new');
  };

  const handleAdvanceToConfirm = () => {
    if (newPinInput.length !== 4) {
      setPinModalError('Please enter a full 4-digit numeric PIN.');
      return;
    }
    setPinModalError('');
    setPinStep('confirm_new');
  };

  const handleSaveNewPin = () => {
    if (confirmPinInput.length !== 4) {
      setPinModalError('Please enter the 4 digits to confirm.');
      return;
    }
    if (confirmPinInput !== newPinInput) {
      setPinModalError('PINs do not match. Please re-enter confirmation PIN.');
      return;
    }

    const currentLevel = user.parentalControls?.restrictionLevel || 'TV-MA / R / M';
    onUpdateUser({
      parentalPin: newPinInput,
      parentalControlsEnabled: true,
      parentalControls: {
        isEnabled: true,
        pin: newPinInput,
        restrictionLevel: currentLevel,
        restrictPurchases: false,
      },
    });

    setIsPinModalOpen(false);
    setPinSuccessToast('4-digit Parental PIN saved and locked!');
    setTimeout(() => setPinSuccessToast(''), 4000);
  };

  const handleSelectRestrictionLevel = (level: ParentalRestrictionLevel) => {
    onUpdateUser({
      parentalControls: {
        isEnabled: isParentalEnabled,
        pin: currentSavedPin,
        restrictionLevel: level,
        restrictPurchases: user.parentalControls?.restrictPurchases || false,
      },
    });
    setPinSuccessToast(`Restriction level updated to ${level}`);
    setTimeout(() => setPinSuccessToast(''), 3000);
  };

  const handleTestSandboxPin = () => {
    if (!currentSavedPin) {
      setSandboxStatus('error');
      return;
    }
    if (sandboxPinInput === currentSavedPin) {
      setSandboxStatus('success');
      setSandboxUnlocked(true);
    } else {
      setSandboxStatus('error');
    }
  };


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
                  id="choose-avatar-header-btn"
                  onClick={() => setActiveTab('avatars')}
                  className="px-4 py-2 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/30 text-xs font-semibold text-pink-300 transition-all cursor-pointer flex items-center gap-1.5"
                  title="Browse Onegai AiPri & Classic Profile Pictures"
                >
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>Avatars</span>
                </button>

                <button
                  id="header-parental-btn"
                  onClick={() => setActiveTab('parental')}
                  className={`px-4 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isParentalEnabled
                      ? 'bg-amber-500/15 hover:bg-amber-500/25 border-amber-500/30 text-amber-300'
                      : 'bg-white/[0.06] hover:bg-white/[0.12] border-white/[0.1] text-neutral-300'
                  }`}
                  title="Parental Controls & 4-Digit PIN"
                >
                  <Lock className={`w-3.5 h-3.5 ${isParentalEnabled ? 'text-amber-400' : 'text-neutral-400'}`} />
                  <span>PIN Controls</span>
                  {isParentalEnabled && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </button>

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
          onClick={() => setActiveTab('avatars')}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'avatars'
              ? 'border-violet-500 text-white font-bold'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span>Profile Pictures</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
            Onegai AiPri
          </span>
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

        <button
          id="profile-parental-tab-btn"
          onClick={() => setActiveTab('parental')}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'parental'
              ? 'border-violet-500 text-white font-bold'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Lock className={`w-4 h-4 ${isParentalEnabled ? 'text-amber-400' : ''}`} />
          <span>Parental Controls</span>
          {isParentalEnabled ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              PIN Active
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] text-neutral-400 bg-white/[0.06] border border-white/[0.08]">
              Off
            </span>
          )}
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

            {/* Parental Controls Shortcut */}
            <div className="pt-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-white">Parental Controls & PIN</h4>
                  {isParentalEnabled ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      PIN Active
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] text-neutral-400 bg-white/[0.06] border border-white/[0.08]">
                      Disabled
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-400">
                  {isParentalEnabled
                    ? `Restricting mature content (${user.parentalControls?.restrictionLevel || 'TV-MA / R / M'}) with a 4-digit master PIN.`
                    : 'Set a 4-digit PIN to restrict sensitive movies and TV series.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('parental')}
                className="px-3 py-1.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-xs font-semibold text-violet-300 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Configure PIN</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Profile Pictures (Featuring Onegai AiPri) */}
      {activeTab === 'avatars' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header Card */}
          <div className="rounded-2xl bg-gradient-to-r from-purple-950/40 via-violet-900/20 to-pink-950/30 border border-white/[0.08] p-6 sm:p-8 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-pink-500/20 text-pink-300 border border-pink-500/40 flex items-center gap-1.5 shadow-lg shadow-pink-500/20">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                    Onegai AiPri Series
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    High Resolution
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Choose Your Profile Picture
                </h3>
                <p className="text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed">
                  Select your favorite character from the beloved anime series <strong className="text-pink-300">Onegai AiPri</strong> or classic StreamLay icons. Click any avatar to apply it instantly across your profile, navbar, and streaming session.
                </p>
              </div>

              {/* Current Active Avatar Preview */}
              <div className="flex items-center gap-4 bg-white/[0.05] p-3 sm:p-4 rounded-2xl border border-white/[0.1] backdrop-blur-md shrink-0">
                <img
                  src={user.avatarUrl}
                  alt="Active avatar"
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-violet-500 shadow-xl"
                />
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-violet-400">Current Avatar</span>
                  <p className="text-sm font-bold text-white mt-0.5 truncate max-w-[140px]">{user.name || 'StreamLay User'}</p>
                  <span className="inline-block mt-1 text-[11px] text-emerald-400 font-medium">● Active in session</span>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          {PROFILE_PICTURE_CATEGORIES.map((cat) => (
            <div key={cat.category} className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2.5">
                  <h4 className="font-display text-lg font-bold text-white flex items-center gap-2">
                    {cat.category === 'Onegai AiPri' ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse shadow-sm shadow-pink-500" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                    )}
                    {cat.category}
                  </h4>
                  {cat.description && (
                    <span className="hidden sm:inline-block text-xs text-neutral-400">• {cat.description}</span>
                  )}
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/[0.05] text-neutral-300 border border-white/[0.08]">
                  {cat.items.length} Avatars
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
                {cat.items.map((item) => {
                  const isSelected = user.avatarUrl === item.url;
                  return (
                    <div
                      key={item.id}
                      onClick={() => onUpdateUser({ avatarUrl: item.url })}
                      className={`group relative rounded-2xl p-4 border transition-all cursor-pointer flex flex-col items-center text-center ${
                        isSelected
                          ? 'bg-gradient-to-b from-pink-500/20 to-violet-600/20 border-pink-500/80 shadow-xl shadow-pink-500/20 scale-[1.03]'
                          : 'bg-[#12121e]/90 hover:bg-[#181829] border-white/[0.08] hover:border-violet-500/60 hover:scale-[1.02]'
                      }`}
                    >
                      {/* Avatar Image */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden mb-3 bg-black/40 shadow-md">
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-pink-600/30 backdrop-blur-[1px] flex items-center justify-center">
                            <span className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg shadow-pink-600/50">
                              <Check className="w-5 h-5 stroke-[3]" />
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Character Details */}
                      <span className="text-xs sm:text-sm font-bold text-white group-hover:text-pink-300 transition-colors line-clamp-1 w-full">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">
                        {item.category}
                      </span>

                      {/* Action Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateUser({ avatarUrl: item.url });
                        }}
                        className={`mt-3 w-full py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-md shadow-pink-500/30'
                            : 'bg-white/[0.06] hover:bg-violet-600 hover:text-white text-neutral-300 border border-white/[0.08]'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Active Avatar</span>
                          </>
                        ) : (
                          <span>Use Avatar</span>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 6: Parental Controls */}
      {activeTab === 'parental' && (
        <div className="space-y-8 animate-fadeIn max-w-4xl">
          {/* Toast feedback if any */}
          {pinSuccessToast && (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-semibold">{pinSuccessToast}</span>
              </div>
              <button
                onClick={() => setPinSuccessToast('')}
                className="text-emerald-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* Header Hero Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-[#141226] via-[#17142b] to-[#121220] border border-white/[0.08] p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                    isParentalEnabled
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-lg shadow-amber-500/10'
                      : 'bg-white/[0.06] text-neutral-300 border-white/[0.1]'
                  }`}>
                    <ShieldAlert className={`w-3.5 h-3.5 ${isParentalEnabled ? 'text-amber-400' : 'text-neutral-400'}`} />
                    {isParentalEnabled ? 'Parental Lock Active' : 'Parental Controls Disabled'}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/25">
                    Profile Security
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  Parental Controls & PIN
                </h2>
                <p className="text-sm text-neutral-300 max-w-xl leading-relaxed">
                  Protect sensitive content with a 4-digit PIN stored directly in your user profile. When enabled, viewers must enter the PIN before playing mature titles or restricted ratings.
                </p>
              </div>

              {/* Master Switch Card */}
              <div className="bg-white/[0.04] p-5 rounded-2xl border border-white/[0.08] backdrop-blur-md shrink-0 flex flex-col sm:items-end justify-center gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    {isParentalEnabled ? 'Lock is Active' : 'Lock is Off'}
                  </span>
                  <button
                    id="master-parental-toggle-btn"
                    onClick={handleToggleParentalControls}
                    className={`w-14 h-7 rounded-full transition-colors relative cursor-pointer p-0.5 ${
                      isParentalEnabled ? 'bg-amber-500' : 'bg-white/20'
                    }`}
                    title={isParentalEnabled ? 'Click to disable parental controls' : 'Click to enable parental controls'}
                  >
                    <div
                      className={`w-6 h-6 rounded-full bg-white transition-transform shadow-md ${
                        isParentalEnabled ? 'translate-x-7' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <span className="text-[11px] text-neutral-400">
                  {isParentalEnabled ? '4-Digit PIN required for sensitive playback' : 'Anyone can stream all ratings'}
                </span>
              </div>
            </div>
          </div>

          {/* 4-Digit PIN Card & Management */}
          <div className="rounded-3xl bg-[#0f0f18]/90 border border-white/[0.08] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-violet-400" />
                  <h3 className="font-display text-lg font-bold text-white">4-Digit Master PIN</h3>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  This 4-digit numeric code authorizes access to restricted content across this profile.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {currentSavedPin ? (
                  <>
                    <button
                      id="change-pin-btn"
                      onClick={() => handleOpenSetPinModal('change')}
                      className="px-3.5 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-xs font-semibold text-violet-300 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Change PIN</span>
                    </button>
                    <button
                      id="reset-pin-btn"
                      onClick={() => handleOpenSetPinModal('reset')}
                      className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-semibold text-red-300 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove PIN</span>
                    </button>
                  </>
                ) : (
                  <button
                    id="setup-initial-pin-btn"
                    onClick={() => handleOpenSetPinModal('set')}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-amber-600 hover:from-violet-500 hover:to-amber-500 text-xs font-bold text-white transition-all cursor-pointer shadow-lg shadow-violet-600/20 flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Set 4-Digit PIN</span>
                  </button>
                )}
              </div>
            </div>

            {/* Current PIN Status Box */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  currentSavedPin ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : 'bg-white/[0.05] text-neutral-400'
                }`}>
                  {currentSavedPin ? <Lock className="w-6 h-6" /> : <Unlock className="w-6 h-6" />}
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Current PIN Status</span>
                  <div className="flex items-center gap-3 mt-0.5">
                    {currentSavedPin ? (
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg font-bold tracking-widest text-white">
                          {revealStoredPin ? currentSavedPin : '••••'}
                        </span>
                        <button
                          onClick={() => setRevealStoredPin(!revealStoredPin)}
                          className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                          title={revealStoredPin ? 'Hide PIN' : 'Reveal PIN'}
                        >
                          {revealStoredPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm font-semibold text-neutral-400">No PIN configured yet</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[11px] text-neutral-400 block">User Profile Storage</span>
                <span className="text-xs font-mono text-violet-300">
                  {currentSavedPin ? `user.parentalPin: "${revealStoredPin ? currentSavedPin : '••••'}"` : 'user.parentalPin: undefined'}
                </span>
              </div>
            </div>
          </div>

          {/* Maturity Restriction Rating Levels */}
          <div className="rounded-3xl bg-[#0f0f18]/90 border border-white/[0.08] p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-violet-400" />
                <h3 className="font-display text-lg font-bold text-white">Content Restriction Rating</h3>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Select the rating threshold. Any content meeting or exceeding this classification requires the 4-digit PIN.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Option 1: TV-MA / R / M */}
              <button
                type="button"
                onClick={() => handleSelectRestrictionLevel('TV-MA / R / M')}
                className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  user.parentalControls?.restrictionLevel === 'TV-MA / R / M' || !user.parentalControls?.restrictionLevel
                    ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/15'
                    : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-red-500/20 text-red-300 border border-red-500/30">
                      TV-MA / R / M
                    </span>
                    {(user.parentalControls?.restrictionLevel === 'TV-MA / R / M' || !user.parentalControls?.restrictionLevel) && (
                      <Check className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white">Mature Audiences (17+)</h4>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    Restricts mature titles such as Grand Theft Auto VI: An Extended Look, intense violence, coarse language, and mature documentaries.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Recommended Filter</span>
                  <span className="text-amber-400 font-semibold">Standard</span>
                </div>
              </button>

              {/* Option 2: TV-14 / PG-13 */}
              <button
                type="button"
                onClick={() => handleSelectRestrictionLevel('TV-14 / PG-13')}
                className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  user.parentalControls?.restrictionLevel === 'TV-14 / PG-13'
                    ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/15'
                    : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                      TV-14 / PG-13
                    </span>
                    {user.parentalControls?.restrictionLevel === 'TV-14 / PG-13' && (
                      <Check className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white">Teens & Above (14+)</h4>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    Restricts all teen and mature titles. Allows child-friendly programming (TV-G, TV-PG, TV-Y) without PIN entry.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Family Guidance</span>
                  <span className="text-yellow-400 font-semibold">Moderate</span>
                </div>
              </button>

              {/* Option 3: All Content */}
              <button
                type="button"
                onClick={() => handleSelectRestrictionLevel('All Content')}
                className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  user.parentalControls?.restrictionLevel === 'All Content'
                    ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/15'
                    : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      All Content
                    </span>
                    {user.parentalControls?.restrictionLevel === 'All Content' && (
                      <Check className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white">Strict Lock (All Ratings)</h4>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    Requires entering the 4-digit PIN prior to playing any title in the entire StreamLay catalog.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Maximum Guard</span>
                  <span className="text-violet-400 font-semibold">Strict</span>
                </div>
              </button>
            </div>
          </div>

          {/* Live PIN Protection Sandbox / Tester */}
          <div className="rounded-3xl bg-gradient-to-br from-[#121021] to-[#0f0f18] border border-white/[0.08] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-amber-400" />
                  <h3 className="font-display text-lg font-bold text-white">Live PIN Verification Sandbox</h3>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  Test unlocking sensitive content in real-time with your configured 4-digit PIN.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-full">
                Interactive Demo
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.08] flex flex-col md:flex-row items-center gap-6">
              {/* Mockup card */}
              <div className="relative w-full md:w-56 aspect-video md:aspect-[3/4] rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-lg">
                <img
                  src="https://oxspfjyamtfmniiuqmwv.supabase.co/storage/v1/object/public/Movies/Grand%20Theft%20Auto%20VI:%20An%20Extended%20Look/Poster/Grand%20Theft%20Auto%20VI%20An%20Extended%20Look%20-%20Poster.webp"
                  alt="GTA VI"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-3 text-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-lg ${
                    sandboxUnlocked ? 'bg-emerald-500 text-white' : 'bg-red-500/30 border border-red-500 text-red-300'
                  }`}>
                    {sandboxUnlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-bold text-white leading-tight line-clamp-2">
                    Grand Theft Auto VI
                  </span>
                  <span className="text-[10px] mt-1 px-1.5 py-0.5 rounded font-extrabold bg-red-600/80 text-white">
                    RATED M
                  </span>
                  <span className="text-[10px] text-neutral-400 mt-1">
                    {sandboxUnlocked ? 'Unlocked' : 'PIN Locked'}
                  </span>
                </div>
              </div>

              {/* Sandbox controls */}
              <div className="flex-1 w-full space-y-4">
                {sandboxUnlocked ? (
                  <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <h5 className="font-bold text-sm">Access Granted!</h5>
                    </div>
                    <p className="text-xs leading-relaxed">
                      Your 4-digit master PIN successfully unlocked sensitive content access. The viewer would now proceed directly to full 4K stream playback.
                    </p>
                    <button
                      onClick={() => {
                        setSandboxUnlocked(false);
                        setSandboxPinInput('');
                        setSandboxStatus('idle');
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-black text-xs font-bold hover:bg-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Lock Again</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-sm font-semibold text-white">Enter 4-Digit PIN to Unlock</h5>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {currentSavedPin
                          ? 'Type your 4-digit PIN below to test the unlock authorization.'
                          : 'You have not set a PIN yet. Please click "Set 4-Digit PIN" above first.'}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <PinInput
                        idPrefix="sandbox-pin"
                        value={sandboxPinInput}
                        onChange={(val) => {
                          setSandboxPinInput(val);
                          setSandboxStatus('idle');
                        }}
                        isMasked={true}
                        hasError={sandboxStatus === 'error'}
                      />

                      <button
                        id="test-sandbox-pin-btn"
                        onClick={handleTestSandboxPin}
                        disabled={!currentSavedPin || sandboxPinInput.length !== 4}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-violet-600 hover:from-amber-500 hover:to-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-lg shadow-amber-600/20 cursor-pointer whitespace-nowrap"
                      >
                        Verify & Unlock
                      </button>
                    </div>

                    {sandboxStatus === 'error' && (
                      <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>
                          {!currentSavedPin
                            ? 'No PIN configured. Set a 4-digit PIN first.'
                            : 'Incorrect PIN. Please re-enter your configured 4-digit PIN.'}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12121e] rounded-3xl border border-white/10 p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-white">Edit Profile</h3>
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-neutral-400 hover:text-white flex items-center justify-center text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Choose Avatar with Category Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                  Select Profile Picture
                </label>
                <div className="flex items-center gap-1.5 bg-white/[0.04] p-1 rounded-xl border border-white/[0.06]">
                  {PROFILE_PICTURE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.category}
                      type="button"
                      onClick={() => setModalCategory(cat.category)}
                      className={`text-xs font-semibold px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        modalCategory === cat.category
                          ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-md'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {cat.category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Avatar Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-h-60 overflow-y-auto pr-1 no-scrollbar p-1">
                {PROFILE_PICTURE_CATEGORIES.find((c) => c.category === modalCategory)
                  ?.items.map((opt) => {
                    const isSelected = editAvatar === opt.url;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setEditAvatar(opt.url)}
                        title={opt.name}
                        className={`group relative rounded-2xl p-1.5 border-2 transition-all cursor-pointer flex flex-col items-center text-center ${
                          isSelected
                            ? 'border-pink-500 bg-pink-500/20 scale-105 shadow-lg shadow-pink-500/30'
                            : 'border-transparent bg-white/[0.03] hover:bg-white/[0.08] opacity-80 hover:opacity-100'
                        }`}
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden mb-1.5 bg-black/40">
                          <img src={opt.url} alt={opt.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <span className="text-[11px] font-semibold text-neutral-200 truncate w-full text-center">
                          {opt.name.split(' ')[0]}
                        </span>
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-pink-500 text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 pt-2 border-t border-white/[0.06]">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Display Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white focus:outline-none focus:border-violet-500 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white focus:outline-none focus:border-violet-500 text-sm font-medium"
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
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-purple-600/40"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4-Digit Parental PIN Setup / Change / Disable Modal */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12121e] rounded-3xl border border-white/10 p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {pinModalMode === 'set' && 'Create 4-Digit PIN'}
                    {pinModalMode === 'change' && 'Change 4-Digit PIN'}
                    {pinModalMode === 'disable' && 'Disable Parental Controls'}
                    {pinModalMode === 'reset' && 'Remove 4-Digit PIN'}
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    {pinModalMode === 'disable' || pinModalMode === 'reset'
                      ? 'Security verification required'
                      : 'Saved directly to your user profile'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPinModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-neutral-400 hover:text-white flex items-center justify-center text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Step 1: Verify Current PIN */}
            {pinStep === 'verify_current' && (
              <div className="space-y-5">
                <div className="text-center">
                  <h4 className="text-sm font-semibold text-white">Enter Current 4-Digit PIN</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Please confirm your current master PIN to authorize changes.
                  </p>
                </div>

                <PinInput
                  idPrefix="verify-pin"
                  value={currentPinInput}
                  onChange={(val) => {
                    setCurrentPinInput(val);
                    setPinModalError('');
                  }}
                  isMasked={isPinMasked}
                  autoFocus={true}
                  hasError={Boolean(pinModalError)}
                />

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setIsPinMasked(!isPinMasked)}
                    className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 cursor-pointer py-1 px-2.5 rounded-lg hover:bg-white/[0.05]"
                  >
                    {isPinMasked ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{isPinMasked ? 'Show Digits' : 'Hide Digits'}</span>
                  </button>
                </div>

                {pinModalError && (
                  <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl text-center">
                    {pinModalError}
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPinModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-neutral-300 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={currentPinInput.length !== 4}
                    onClick={handleVerifyCurrentPin}
                    className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold cursor-pointer"
                  >
                    Verify PIN
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Enter New PIN */}
            {pinStep === 'enter_new' && (
              <div className="space-y-5">
                <div className="text-center">
                  <h4 className="text-sm font-semibold text-white">Enter New 4-Digit PIN</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Choose a 4-digit code that is easy for you to remember and hard for others to guess.
                  </p>
                </div>

                <PinInput
                  idPrefix="new-pin"
                  value={newPinInput}
                  onChange={(val) => {
                    setNewPinInput(val);
                    setPinModalError('');
                  }}
                  isMasked={isPinMasked}
                  autoFocus={true}
                  hasError={Boolean(pinModalError)}
                />

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setIsPinMasked(!isPinMasked)}
                    className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 cursor-pointer py-1 px-2.5 rounded-lg hover:bg-white/[0.05]"
                  >
                    {isPinMasked ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{isPinMasked ? 'Show Digits' : 'Hide Digits'}</span>
                  </button>
                </div>

                {pinModalError && (
                  <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl text-center">
                    {pinModalError}
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPinModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-neutral-300 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={newPinInput.length !== 4}
                    onClick={handleAdvanceToConfirm}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-amber-600 hover:from-violet-500 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold cursor-pointer"
                  >
                    Next: Confirm PIN
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirm New PIN */}
            {pinStep === 'confirm_new' && (
              <div className="space-y-5">
                <div className="text-center">
                  <h4 className="text-sm font-semibold text-white">Confirm 4-Digit PIN</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Re-enter the same 4-digit code to confirm and save.
                  </p>
                </div>

                <PinInput
                  idPrefix="confirm-pin"
                  value={confirmPinInput}
                  onChange={(val) => {
                    setConfirmPinInput(val);
                    setPinModalError('');
                  }}
                  isMasked={isPinMasked}
                  autoFocus={true}
                  hasError={Boolean(pinModalError)}
                />

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setIsPinMasked(!isPinMasked)}
                    className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 cursor-pointer py-1 px-2.5 rounded-lg hover:bg-white/[0.05]"
                  >
                    {isPinMasked ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{isPinMasked ? 'Show Digits' : 'Hide Digits'}</span>
                  </button>
                </div>

                {pinModalError && (
                  <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl text-center">
                    {pinModalError}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPinStep('enter_new');
                      setConfirmPinInput('');
                      setPinModalError('');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-neutral-300 text-xs font-semibold cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={confirmPinInput.length !== 4}
                    onClick={handleSaveNewPin}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-amber-600 hover:from-violet-500 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold cursor-pointer shadow-lg shadow-violet-600/30"
                  >
                    Save & Activate PIN
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
