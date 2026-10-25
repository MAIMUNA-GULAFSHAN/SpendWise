import React from 'react';
import { Link } from '../../context/RouterContext';
import { Wallet, ShieldCheck, ArrowRight } from 'lucide-react';

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F6F8F1] text-[#1C302A] flex flex-col antialiased w-full max-w-full overflow-x-hidden">
      {/* Public Header */}
      <header className="sticky top-0 z-40 bg-[#F6F8F1]/90 backdrop-blur-md border-b border-[#DFE8DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#174D42] text-[#B8E4A5] flex items-center justify-center shadow-sm">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading font-bold text-xl text-[#103C34] tracking-tight">SpendWise</span>
              <p className="text-[11px] text-[#64756D] font-medium hidden sm:block">Intelligent Wealth &amp; Cashflow Engine</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#64756D]">
            <Link to="/" className="hover:text-[#174D42] transition-colors">Platform</Link>
            <Link to="/app/dashboard" className="hover:text-[#174D42] transition-colors">Live App Demo</Link>
            <Link to="/admin/dashboard" className="hover:text-[#174D42] transition-colors">Admin Console</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#174D42] hover:bg-[#EDF3E9] transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-xl bg-[#174D42] text-white text-xs sm:text-sm font-semibold hover:bg-[#103C34] transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-[#B8E4A5]" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full max-w-full overflow-x-hidden">{children}</main>

      {/* Public Footer */}
      <footer className="bg-white border-t border-[#DFE8DC] py-12 px-4 sm:px-6 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#64756D]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#174D42] text-[#B8E4A5] flex items-center justify-center font-bold font-heading text-xs">
              SW
            </div>
            <span>© 2026 SpendWise Technologies Inc. Encrypted ledger security.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/login" className="hover:text-[#174D42]">Sign In</Link>
            <Link to="/onboarding" className="hover:text-[#174D42]">Financial Onboarding</Link>
            <Link to="/app/dashboard" className="hover:text-[#174D42]">Demo Dashboard</Link>
            <Link to="/admin/dashboard" className="hover:text-[#174D42]">Admin Console</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
