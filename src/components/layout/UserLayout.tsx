import React, { useState, useRef, useEffect } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  ReceiptText,
  PlusCircle,
  Banknote,
  Wallet,
  Tags,
  PieChart,
  CreditCard,
  PiggyBank,
  Sparkles,
  TrendingUp,
  Gift,
  Bot,
  Calendar,
  Repeat,
  Bell,
  Heart,
  ShieldCheck,
  Settings,
  ShieldAlert,
  Search,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Compass,
  ArrowUpRight,
  Eye,
  EyeOff,
  User,
  RotateCcw,
} from 'lucide-react';

export function UserLayout({ children }: { children: React.ReactNode }) {
  const { currentPath, navigate } = useRouter();
  const {
    user,
    workspaceMode,
    startCleanWorkspace,
    loadDemoWorkspace,
    logout,
    resetDemoData,
    isBalanceHidden,
    setIsBalanceHidden,
    totalAvailableBalance,
    notifications,
    transactions,
    cards,
    savingsGoals,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navSections = [
    {
      group: 'Overview',
      items: [
        { path: '/app/dashboard', label: 'Financial Overview', icon: LayoutDashboard },
      ],
    },
    {
      group: 'Daily Finance',
      items: [
        { path: '/app/transactions', label: 'All Transactions', icon: ReceiptText },
        { path: '/app/transactions/new', label: 'Add Transaction', icon: PlusCircle },
        { path: '/app/income', label: 'Salary & Income', icon: Banknote },
        { path: '/app/accounts', label: 'Accounts & Wallets', icon: Wallet },
        { path: '/app/categories', label: 'Categories & Labels', icon: Tags },
        { path: '/app/budgets', label: 'Budget Management', icon: PieChart },
      ],
    },
    {
      group: 'Cards & Savings',
      items: [
        { path: '/app/cards', label: 'Credit Cards', icon: CreditCard },
        { path: '/app/savings', label: 'Savings & Goals', icon: PiggyBank },
        { path: '/app/life-moments', label: 'Life Moments', icon: Sparkles },
      ],
    },
    {
      group: 'Intelligence',
      items: [
        { path: '/app/analytics', label: 'Analytics & Trends', icon: TrendingUp },
        { path: '/app/offers', label: 'Offers & Rewards', icon: Gift },
        { path: '/app/payment-advisor', label: 'Payment Advisor', icon: Compass },
        { path: '/app/assistant', label: 'AI Assistant', icon: Bot },
        { path: '/app/wellness', label: 'Financial Wellness', icon: Heart },
      ],
    },
    {
      group: 'Planning & Tools',
      items: [
        { path: '/app/calendar', label: 'Financial Calendar', icon: Calendar },
        { path: '/app/subscriptions', label: 'Subscriptions', icon: Repeat },
        { path: '/app/notifications', label: 'Notification Center', icon: Bell, badge: unreadNotificationsCount },
        { path: '/app/wishlist', label: 'Wishlist & Planner', icon: Heart },
        { path: '/app/settings', label: 'Settings & Profile', icon: Settings },
      ],
    },
  ];

  // Global Search results across screens, transactions, and cards
  const allNavItems = navSections.flatMap((s) => s.items);

  const matchedScreens = allNavItems.filter((i) =>
    i.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const matchedTransactions = searchQuery.trim()
    ? transactions.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const matchedCards = searchQuery.trim()
    ? cards.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="min-h-screen bg-[#F6F8F1] text-[#1C302A] flex flex-col antialiased">
      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-[#103C34]/40 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
          <div className="bg-white rounded-3xl border border-[#DFE8DC] shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-[#DFE8DC] flex items-center gap-3">
              <Search className="w-5 h-5 text-[#64756D]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search screens, merchants, transactions, cards..."
                className="w-full bg-transparent border-none text-[#1C302A] placeholder:text-[#64756D] focus:outline-none text-sm font-medium"
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-lg text-[#64756D] hover:bg-[#EDF3E9]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-3 space-y-3">
              {/* Screen Results */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#64756D] px-2 mb-1">
                  Screens &amp; Navigation
                </div>
                <div className="space-y-1">
                  {(searchQuery.trim() ? matchedScreens : allNavItems.slice(0, 6)).map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.path}
                        onClick={() => {
                          navigate(item.path);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#EDF3E9] text-left transition-colors text-xs font-semibold"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[#E6F3DD] flex items-center justify-center text-[#174D42]">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span>{item.label}</span>
                        </div>
                        <span className="text-[11px] text-[#64756D] font-mono">{item.path}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Transaction Matches */}
              {matchedTransactions.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#64756D] px-2 mb-1">
                    Matching Transactions ({matchedTransactions.length})
                  </div>
                  <div className="space-y-1">
                    {matchedTransactions.slice(0, 4).map((tx) => (
                      <button
                        key={tx.id}
                        onClick={() => {
                          navigate('/app/transactions');
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#EDF3E9] text-left text-xs"
                      >
                        <div>
                          <p className="font-bold text-[#1C302A]">{tx.title}</p>
                          <p className="text-[11px] text-[#64756D]">{tx.category} • {tx.date}</p>
                        </div>
                        <span className="font-bold font-mono-num text-[#103C34]">
                          ₹{tx.amount.toLocaleString('en-IN')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Card Matches */}
              {matchedCards.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#64756D] px-2 mb-1">
                    Matching Credit Cards
                  </div>
                  <div className="space-y-1">
                    {matchedCards.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          navigate(`/app/cards/${c.id}`);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#EDF3E9] text-left text-xs"
                      >
                        <div>
                          <p className="font-bold text-[#1C302A]">{c.name}</p>
                          <p className="text-[11px] text-[#64756D]">{c.bank} • {c.cardNumberMasked}</p>
                        </div>
                        <span className="text-[11px] text-[#174D42] font-semibold">Due: ₹{c.usedAmount}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Top Header - Always Visible */}
      <header className="sticky top-0 z-40 bg-[#F6F8F1]/90 backdrop-blur-md border-b border-[#DFE8DC]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-4">
          {/* Left: Mobile hamburger & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#174D42] hover:bg-[#EDF3E9] transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link to="/app/dashboard" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#174D42] text-[#B8E4A5] flex items-center justify-center shadow-sm">
                <Wallet className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-bold text-lg text-[#103C34] tracking-tight">SpendWise</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#E6F3DD] text-[#174D42] border border-[#B8E4A5]/40">
                    PRO
                  </span>
                </div>
                <span className="text-[11px] text-[#64756D] hidden sm:block">Cycle: 1st – 30th Nov</span>
              </div>
            </Link>
          </div>

          {/* Center: Search Trigger (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs text-[#64756D] hover:bg-[#E6F3DD]/40 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#174D42]" />
                <span>Jump to any screen or transaction...</span>
              </div>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#DFE8DC] text-[10px] font-mono text-[#64756D]">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right: Quick Actions, Alerts, Admin Switch, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 rounded-xl text-[#64756D] hover:bg-[#EDF3E9]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Quick Balance Peek */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#DFE8DC]">
              <span className="text-xs text-[#64756D]">Liquid:</span>
              <span className="text-xs font-bold text-[#174D42] font-mono-num">
                {isBalanceHidden ? '••••••' : `₹${totalAvailableBalance.toLocaleString('en-IN')}`}
              </span>
              <button
                onClick={() => setIsBalanceHidden(!isBalanceHidden)}
                className="text-[#64756D] hover:text-[#174D42]"
                title="Toggle Balance Visibility"
              >
                {isBalanceHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Add Transaction Button */}
            <Link
              to="/app/transactions/new"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#174D42] text-white text-xs font-semibold hover:bg-[#103C34] transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-[#B8E4A5]" />
              <span>Add Expense</span>
            </Link>

            {/* Notifications */}
            <Link
              to="/app/notifications"
              className="relative p-2 rounded-xl text-[#64756D] hover:text-[#174D42] hover:bg-[#EDF3E9] transition-colors"
              title="Notification Center"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#BA1A1A] ring-2 ring-[#F6F8F1]" />
              )}
            </Link>

            {/* Admin Console Switcher */}
            <Link
              to="/admin/dashboard"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E6F3DD] text-[#174D42] text-xs font-semibold border border-[#B8E4A5]/60 hover:bg-[#B8E4A5]/40 transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#174D42]" />
              <span>Admin Console</span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 pl-1 focus:outline-none"
              >
                <div className="relative">
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#174D42]/20 hover:border-[#174D42] transition-colors">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#27865D] ring-2 ring-[#F6F8F1]" />
                </div>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-[#DFE8DC] shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="p-3 border-b border-[#DFE8DC] mb-1">
                    <p className="text-xs font-bold text-[#103C34]">{user.name}</p>
                    <p className="text-[11px] text-[#64756D] truncate">{user.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#E6F3DD] text-[#174D42]">
                      Pro Tier Active
                    </span>
                  </div>

                  <Link
                    to="/app/settings"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#1C302A] hover:bg-[#EDF3E9]"
                  >
                    <User className="w-4 h-4 text-[#174D42]" />
                    <span>Profile &amp; Settings</span>
                  </Link>

                  <Link
                    to="/admin/dashboard"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#174D42] hover:bg-[#E6F3DD]"
                  >
                    <ShieldAlert className="w-4 h-4 text-[#174D42]" />
                    <span>Admin Console</span>
                  </Link>

                  <button
                    onClick={() => {
                      startCleanWorkspace({ name: 'Personal User', email: 'user@spendwise.app' });
                      setIsProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#174D42] hover:bg-[#E6F3DD]"
                  >
                    <PlusCircle className="w-4 h-4 text-[#27865D]" />
                    <span>Start Clean for My Expenses</span>
                  </button>

                  <button
                    onClick={() => {
                      loadDemoWorkspace();
                      setIsProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#64756D] hover:bg-[#EDF3E9]"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Load Demo Data (Rohan)</span>
                  </button>

                  <div className="pt-1 mt-1 border-t border-[#DFE8DC]">
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileDropdownOpen(false);
                        navigate('/login');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#ba1a1a] hover:bg-[#ffdad6]/40"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto overflow-x-hidden">
        {/* Desktop Sidebar (1440px / 1280px) */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-[#DFE8DC] bg-white/70 backdrop-blur-sm p-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex-1 space-y-6">
            {navSections.map((section) => (
              <div key={section.group}>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#64756D] px-3 mb-2">
                  {section.group}
                </div>
                <nav className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-[#174D42] text-white shadow-sm font-semibold'
                            : 'text-[#1C302A] hover:bg-[#EDF3E9]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-[#B8E4A5]' : 'text-[#64756D]'}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge ? (
                          <span
                            className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                              isActive ? 'bg-[#B8E4A5] text-[#103C34]' : 'bg-[#E6F3DD] text-[#174D42]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        ) : null}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="pt-4 mt-4 border-t border-[#DFE8DC] space-y-2">
            <Link
              to="/admin/dashboard"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#174D42] bg-[#E6F3DD] hover:bg-[#B8E4A5]/30 transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#174D42]" />
                <span className="font-semibold">Admin Panel</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#174D42]" />
            </Link>

            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[#64756D] hover:text-[#1C302A] hover:bg-[#EDF3E9] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Public Landing</span>
            </Link>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-[#103C34]/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative w-4/5 max-w-xs bg-white h-full flex flex-col p-5 shadow-2xl z-10 overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-[#DFE8DC]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#174D42] text-[#B8E4A5] flex items-center justify-center">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <span className="font-heading font-bold text-base text-[#103C34]">SpendWise</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-[#64756D] hover:bg-[#EDF3E9]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-6 flex-1">
                {navSections.map((section) => (
                  <div key={section.group}>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#64756D] px-2 mb-1.5">
                      {section.group}
                    </div>
                    <nav className="space-y-1">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentPath === item.path;
                        return (
                          <button
                            key={item.path}
                            onClick={() => {
                              navigate(item.path);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                              isActive
                                ? 'bg-[#174D42] text-white font-semibold'
                                : 'text-[#1C302A] hover:bg-[#EDF3E9]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon className={`w-4 h-4 ${isActive ? 'text-[#B8E4A5]' : 'text-[#64756D]'}`} />
                              <span>{item.label}</span>
                            </div>
                            {item.badge ? (
                              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#E6F3DD] text-[#174D42]">
                                {item.badge}
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                    </nav>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#DFE8DC] space-y-2">
                <button
                  onClick={() => {
                    navigate('/admin/dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#174D42] bg-[#E6F3DD]"
                >
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Switch to Admin</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[#ba1a1a]"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Responsive Content Area */}
        <main className="flex-1 min-w-0 w-full max-w-full overflow-x-hidden p-3.5 sm:p-6 lg:p-8 pb-24 lg:pb-12">
          {children}
        </main>
      </div>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-[#DFE8DC] shadow-[0_-8px_30px_rgba(16,60,52,0.08)]">
        <div className="flex items-center justify-around h-16 w-full max-w-md mx-auto px-1 sm:px-2">
          <Link
            to="/app/dashboard"
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 text-[11px] font-medium transition-colors ${
              currentPath === '/app/dashboard' ? 'text-[#174D42] font-bold' : 'text-[#64756D]'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/app/transactions"
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 text-[11px] font-medium transition-colors ${
              currentPath === '/app/transactions' ? 'text-[#174D42] font-bold' : 'text-[#64756D]'
            }`}
          >
            <ReceiptText className="w-5 h-5" />
            <span>Ledger</span>
          </Link>

          {/* Elevated Center Add Button */}
          <div className="flex-1 flex items-center justify-center -mt-6">
            <Link
              to="/app/transactions/new"
              className="w-12 h-12 rounded-full bg-[#174D42] text-white flex items-center justify-center shadow-[0_10px_20px_rgba(23,77,66,0.35)] ring-4 ring-[#F6F8F1] active:scale-95 transition-transform"
              title="Add New Transaction"
            >
              <PlusCircle className="w-6 h-6 text-[#B8E4A5]" />
            </Link>
          </div>

          <Link
            to="/app/life-moments"
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 text-[11px] font-medium transition-colors ${
              currentPath.startsWith('/app/life-moments') ? 'text-[#174D42] font-bold' : 'text-[#64756D]'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span>Moments</span>
          </Link>

          <Link
            to="/app/analytics"
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 text-[11px] font-medium transition-colors ${
              currentPath === '/app/analytics' ? 'text-[#174D42] font-bold' : 'text-[#64756D]'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Insights</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
