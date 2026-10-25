import React, { useState } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import {
  LayoutDashboard,
  Users,
  Shield,
  FolderTree,
  CreditCard,
  Store,
  BadgePercent,
  Cpu,
  BellRing,
  Bot,
  BarChart3,
  Lock,
  Sliders,
  ArrowLeft,
  Search,
  Menu,
  X,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentPath, navigate } = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const adminNavItems = [
    { path: '/admin/dashboard', label: 'Admin Overview', icon: LayoutDashboard },
    { path: '/admin/users', label: 'User Management', icon: Users },
    { path: '/admin/roles', label: 'Roles & Permissions', icon: Shield },
    { path: '/admin/categories', label: 'Global Categories', icon: FolderTree },
    { path: '/admin/cards', label: 'Bank & Card Catalog', icon: CreditCard },
    { path: '/admin/merchants', label: 'Merchant Management', icon: Store },
    { path: '/admin/offers', label: 'Offers & Campaigns', icon: BadgePercent },
    { path: '/admin/integrations', label: 'External Integrations', icon: Cpu },
    { path: '/admin/notifications', label: 'Notification Broadcasts', icon: BellRing },
    { path: '/admin/ai', label: 'AI Configuration', icon: Bot },
    { path: '/admin/analytics', label: 'Platform Analytics', icon: BarChart3 },
    { path: '/admin/security', label: 'Security & Audit Logs', icon: Lock },
    { path: '/admin/settings', label: 'Application Settings', icon: Sliders },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8F1] text-[#1C302A] flex flex-col antialiased">
      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 bg-[#103C34] text-white border-b border-[#174D42] shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-white/80 hover:bg-[#174D42]"
              aria-label="Open Admin Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/admin/dashboard" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#B8E4A5] text-[#103C34] flex items-center justify-center font-bold font-heading">
                SW
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-base tracking-tight text-white">SpendWise Admin</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#174D42] text-[#B8E4A5] border border-[#B8E4A5]/30">
                    CONSOLE
                  </span>
                </div>
                <p className="text-[10px] text-white/60 hidden sm:block">Enterprise Financial Operations</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Live System Health */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#174D42]/80 border border-white/10 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#B8E4A5] animate-pulse" />
              <span className="text-white/90 font-mono text-[11px]">System Status: Nominal</span>
            </div>

            {/* Back to User Application */}
            <Link
              to="/app/dashboard"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#B8E4A5] text-[#103C34] text-xs font-bold hover:bg-[#B8E4A5]/90 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to User App</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Admin Body */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Desktop Admin Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-[#DFE8DC] bg-white p-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#64756D] px-3 mb-3">
            Admin Navigation
          </div>
          <nav className="space-y-1 flex-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#103C34] text-white shadow-sm font-semibold'
                      : 'text-[#1C302A] hover:bg-[#EDF3E9]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#B8E4A5]' : 'text-[#64756D]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#DFE8DC] text-xs text-[#64756D]">
            <div className="p-3 rounded-xl bg-[#EDF3E9] space-y-1">
              <p className="font-semibold text-[#1C302A]">SpendWise Core v2.4</p>
              <p className="text-[11px]">GCP Asia-Southeast1</p>
            </div>
          </div>
        </aside>

        {/* Mobile Admin Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-[#103C34]/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative w-4/5 max-w-xs bg-white h-full flex flex-col p-5 shadow-2xl z-10 overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-[#DFE8DC]">
                <span className="font-heading font-bold text-base text-[#103C34]">Admin Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-[#64756D] hover:bg-[#EDF3E9]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="py-4 space-y-1 flex-1">
                {adminNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-left ${
                        isActive
                          ? 'bg-[#103C34] text-white font-semibold'
                          : 'text-[#1C302A] hover:bg-[#EDF3E9]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#B8E4A5]' : 'text-[#64756D]'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
              <div className="pt-4 border-t border-[#DFE8DC]">
                <button
                  onClick={() => {
                    navigate('/app/dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#174D42] text-white text-xs font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Exit to User App</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admin Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
