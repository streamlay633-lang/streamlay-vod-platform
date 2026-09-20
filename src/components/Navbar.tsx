import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Search, 
  Tv, 
  Film, 
  Clapperboard, 
  Bookmark, 
  User, 
  LogOut, 
  Settings, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  Heart,
  Globe,
  Check
} from 'lucide-react';
import { AppPage, UserProfile } from '../types';
import { 
  normalizeLanguage, 
  SUPPORTED_LANGUAGES, 
  SupportedLanguage, 
  getTranslation 
} from '../utils/translations';

interface NavbarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  user: UserProfile;
  onOpenSearch: () => void;
  onLogout: () => void;
  onUpdateUser?: (updated: Partial<UserProfile>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  user,
  onOpenSearch,
  onLogout,
  onUpdateUser,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const currentLang = normalizeLanguage(user.preferredLanguage);
  const currentLangInfo = SUPPORTED_LANGUAGES[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (langCode: SupportedLanguage) => {
    const info = SUPPORTED_LANGUAGES[langCode];
    if (onUpdateUser) {
      onUpdateUser({ preferredLanguage: info.name });
    }
    setIsLangMenuOpen(false);
  };

  const navLinks: { label: string; page: AppPage; icon: React.ReactNode }[] = [
    { label: getTranslation('home', user.preferredLanguage), page: 'home', icon: <Sparkles className="w-4 h-4" /> },
    { label: getTranslation('movies', user.preferredLanguage), page: 'movies', icon: <Film className="w-4 h-4" /> },
    { label: getTranslation('series', user.preferredLanguage), page: 'series', icon: <Clapperboard className="w-4 h-4" /> },
    { label: getTranslation('liveTv', user.preferredLanguage), page: 'livetv', icon: <Tv className="w-4 h-4" /> },
  ];

  const myListCount = user.myListIds.length;

  return (
    <>
      <header
        id="streamlay-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#07070bc0] backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/60 py-3'
            : 'bg-gradient-to-b from-[#07070b]/90 via-[#07070b]/40 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-8">
            <button
              id="brand-logo-btn"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform duration-300">
                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                    Stream<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">Lay</span>
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-md">
                    PLUS
                  </span>
                </div>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    id={`nav-link-${link.page}`}
                    onClick={() => onNavigate(link.page)}
                    className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'text-white bg-white/[0.08] shadow-inner font-semibold border border-white/[0.1]'
                        : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Controls: Language Selector, Search, My List, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* System Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                id="nav-lang-btn"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 sm:py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.08] hover:border-violet-500/40 transition-all cursor-pointer text-xs font-semibold"
                title={getTranslation('systemLanguage', user.preferredLanguage)}
              >
                <Globe className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                <span className="text-sm">{currentLangInfo.flag}</span>
                <span className="hidden sm:inline uppercase tracking-wider text-[11px] font-bold text-neutral-300">
                  {currentLangInfo.code}
                </span>
                <ChevronDown
                  className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${
                    isLangMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isLangMenuOpen && (
                <div
                  id="nav-lang-dropdown"
                  className="absolute end-0 mt-2 w-56 rounded-2xl bg-[#101018] border border-white/[0.12] shadow-2xl shadow-black/80 py-2 z-50 backdrop-blur-2xl space-y-1 ltr:right-0 rtl:left-0"
                >
                  <div className="px-3.5 py-1.5 border-b border-white/[0.06] text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                    <span>{getTranslation('systemLanguage', user.preferredLanguage)}</span>
                    <span className="text-violet-400 font-mono text-[9px] uppercase">{currentLangInfo.dir}</span>
                  </div>
                  {(Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguage[]).map((langKey) => {
                    const info = SUPPORTED_LANGUAGES[langKey];
                    const isSelected = currentLang === langKey;
                    return (
                      <button
                        key={langKey}
                        onClick={() => handleSelectLanguage(langKey)}
                        className={`w-full px-3.5 py-2.5 text-start text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-violet-600/20 text-violet-300 font-semibold border-s-2 border-violet-500'
                            : 'text-neutral-300 hover:bg-white/[0.06] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{info.flag}</span>
                          <div className="text-start">
                            <p className="leading-tight font-medium">{info.nativeName}</p>
                            <p className="text-[10px] text-neutral-400">
                              {info.name} {info.dir === 'rtl' && '• RTL'}
                            </p>
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-violet-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              id="nav-search-btn"
              onClick={onOpenSearch}
              className={`p-2.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                currentPage === 'search'
                  ? 'bg-violet-600/20 text-violet-300 border-violet-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.06] border-transparent'
              }`}
              title={getTranslation('searchPlaceholder', user.preferredLanguage)}
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline text-xs text-neutral-400 font-normal pe-1">
                {getTranslation('search', user.preferredLanguage)}
              </span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono text-neutral-400 bg-white/[0.06] rounded border border-white/[0.1]">
                /
              </kbd>
            </button>

            {/* My List shortcut */}
            <button
              id="nav-mylist-btn"
              onClick={() => onNavigate('profile')}
              className="relative p-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
              title={getTranslation('myWatchlist', user.preferredLanguage)}
            >
              <Bookmark className="w-4 h-4" />
              {myListCount > 0 && (
                <span className="absolute -top-0.5 ltr:-right-0.5 rtl:-left-0.5 w-4 h-4 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center shadow-md shadow-violet-600/50">
                  {myListCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                id="nav-profile-menu-btn"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2.5 p-1 pe-2 rounded-xl hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08] transition-all cursor-pointer"
              >
                <img
                  src={user.avatarUrl}
                  alt={user.name || 'User'}
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-violet-500/50 shadow"
                />
                <span className="hidden sm:inline text-xs font-medium text-neutral-200 max-w-[100px] truncate">
                  {user.name || 'Account'}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
                    isProfileOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div
                  id="profile-dropdown"
                  className="absolute end-0 mt-2 w-64 rounded-2xl bg-[#101018] border border-white/[0.12] shadow-2xl shadow-black/80 py-2 z-50 backdrop-blur-2xl ltr:right-0 rtl:left-0"
                >
                  <div className="px-4 py-3 border-b border-white/[0.06] text-start">
                    <p className="text-sm font-semibold text-white truncate">{user.name || 'Guest User'}</p>
                    <p className="text-xs text-neutral-400 truncate">{user.email}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gradient-to-r from-violet-600/20 to-purple-600/20 text-violet-300 border border-violet-500/30">
                      <Sparkles className="w-3 h-3 text-violet-400" />
                      <span>{user.plan}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      id="dropdown-profile-btn"
                      onClick={() => {
                        onNavigate('profile');
                        setIsProfileOpen(false);
                      }}
                      className="w-full px-4 py-2 text-start text-sm text-neutral-300 hover:text-white hover:bg-white/[0.06] flex items-center gap-3 transition-colors cursor-pointer"
                    >
                      <User className="w-4 h-4 text-neutral-400 shrink-0" />
                      <span>{getTranslation('profile', user.preferredLanguage)}</span>
                    </button>
                    <button
                      id="dropdown-mylist-btn"
                      onClick={() => {
                        onNavigate('profile');
                        setIsProfileOpen(false);
                      }}
                      className="w-full px-4 py-2 text-start text-sm text-neutral-300 hover:text-white hover:bg-white/[0.06] flex items-center gap-3 transition-colors cursor-pointer"
                    >
                      <Bookmark className="w-4 h-4 text-neutral-400 shrink-0" />
                      <div className="flex items-center justify-between w-full">
                        <span>{getTranslation('myWatchlist', user.preferredLanguage)}</span>
                        <span className="text-xs text-violet-400 font-semibold">{myListCount}</span>
                      </div>
                    </button>
                    <button
                      id="dropdown-settings-btn"
                      onClick={() => {
                        onNavigate('profile');
                        setIsProfileOpen(false);
                      }}
                      className="w-full px-4 py-2 text-start text-sm text-neutral-300 hover:text-white hover:bg-white/[0.06] flex items-center gap-3 transition-colors cursor-pointer"
                    >
                      <Settings className="w-4 h-4 text-neutral-400 shrink-0" />
                      <span>{getTranslation('settings', user.preferredLanguage)}</span>
                    </button>
                  </div>

                  <div className="border-t border-white/[0.06] pt-1 mt-1">
                    <button
                      id="dropdown-logout-btn"
                      onClick={() => {
                        setIsProfileOpen(false);
                        onLogout();
                      }}
                      className="w-full px-4 py-2 text-start text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-3 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 shrink-0" />
                      <span>{getTranslation('signOut', user.preferredLanguage)}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-400 hover:text-white md:hidden cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-drawer"
            className="md:hidden bg-[#0a0a10]/98 backdrop-blur-2xl border-b border-white/[0.1] px-4 pt-3 pb-6 space-y-2 mt-2"
          >
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  id={`mobile-nav-${link.page}`}
                  onClick={() => {
                    onNavigate(link.page);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30 font-semibold'
                      : 'text-neutral-300 hover:bg-white/[0.05]'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              );
            })}

            {/* Mobile System Language Picker */}
            <div className="pt-3 pb-2 border-t border-white/[0.08]">
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2 px-1 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-violet-400" />
                <span>{getTranslation('systemLanguage', user.preferredLanguage)}</span>
              </p>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguage[]).map((langKey) => {
                  const info = SUPPORTED_LANGUAGES[langKey];
                  const isSelected = currentLang === langKey;
                  return (
                    <button
                      key={langKey}
                      onClick={() => {
                        handleSelectLanguage(langKey);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-violet-600/20 border-violet-500 text-white font-bold'
                          : 'bg-white/[0.04] border-white/[0.08] text-neutral-300 hover:bg-white/[0.08]'
                      }`}
                    >
                      <div className="text-base">{info.flag}</div>
                      <div className="text-[11px] mt-0.5 truncate">{info.nativeName}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.08] flex gap-2">
              <button
                id="mobile-search-btn"
                onClick={() => {
                  onOpenSearch();
                  setIsMobileMenuOpen(false);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.06] text-white text-sm font-medium"
              >
                <Search className="w-4 h-4" />
                <span>{getTranslation('search', user.preferredLanguage)}</span>
              </button>
              <button
                id="mobile-profile-btn"
                onClick={() => {
                  onNavigate('profile');
                  setIsMobileMenuOpen(false);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-medium"
              >
                <User className="w-4 h-4" />
                <span>{getTranslation('profile', user.preferredLanguage)}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar for quick switching */}
      <nav
        id="mobile-bottom-nav"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#09090fc0] backdrop-blur-xl border-t border-white/[0.08] px-3 py-2 flex items-center justify-around"
      >
        {navLinks.map((link) => {
          const isActive = currentPage === link.page;
          return (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[11px] font-medium transition-colors ${
                isActive ? 'text-violet-400 font-bold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          );
        })}
        <button
          onClick={onOpenSearch}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[11px] font-medium transition-colors ${
            currentPage === 'search' ? 'text-violet-400 font-bold' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
        <button
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[11px] font-medium transition-colors ${
            currentPage === 'profile' ? 'text-violet-400 font-bold' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Account</span>
        </button>
      </nav>
    </>
  );
};
