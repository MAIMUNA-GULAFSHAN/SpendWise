import React from 'react';
import { Link } from '../../context/RouterContext';
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  Sparkles,
  PieChart,
  CheckCircle2,
  Lock,
  Zap,
} from 'lucide-react';

export function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Organic background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#B8E4A5]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-80 h-80 rounded-full bg-[#174D42]/10 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F3DD] border border-[#B8E4A5]/60 text-xs font-semibold text-[#174D42] mb-6">
            <Sparkles className="w-4 h-4 text-[#174D42]" />
            <span>Introducing SpendWise 2.0 • Real-Time Wealth &amp; Runway Intelligence</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#103C34] tracking-tight max-w-4xl leading-tight">
            Know exactly what is{' '}
            <span className="text-[#174D42] underline decoration-[#B8E4A5] decoration-wavy decoration-2">
              Safe to Spend
            </span>{' '}
            every single day.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#64756D] max-w-2xl font-normal leading-relaxed">
            Eliminate month-end financial anxiety. SpendWise automatically reserves your obligations, optimizes credit card cashback, and projects your salary survival runway.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/app/dashboard"
              className="px-6 py-3.5 rounded-xl bg-[#174D42] text-white font-semibold text-sm hover:bg-[#103C34] transition-all shadow-[0_12px_24px_-4px_rgba(23,77,66,0.3)] flex items-center gap-2"
            >
              <span>Explore Live Dashboard</span>
              <ArrowRight className="w-4 h-4 text-[#B8E4A5]" />
            </Link>
            <Link
              to="/onboarding"
              className="px-6 py-3.5 rounded-xl bg-white border border-[#DFE8DC] text-[#174D42] font-semibold text-sm hover:bg-[#EDF3E9] transition-colors"
            >
              Start 3-Step Onboarding
            </Link>
          </div>

          {/* Social Proof Strip */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#64756D]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#174D42]" />
              <span>Bank-grade 256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#174D42]" />
              <span>Multi-Wallet Auto-Sync</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#174D42]" />
              <span>Zero-Pill Multi-Page Design</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Preview Card */}
        <div className="max-w-4xl mx-auto mt-14 bg-white rounded-3xl border border-[#DFE8DC] p-6 sm:p-8 shadow-[0_20px_50px_-15px_rgba(23,77,66,0.12)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#174D42] text-white flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-white/70 font-semibold">Total Available Balance</span>
                <div className="text-3xl font-bold font-mono-num mt-2 text-[#B8E4A5]">₹42,850.00</div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span>Safe to Spend:</span>
                <span className="font-bold font-mono-num text-[#B8E4A5]">₹18,350</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#EDF3E9] border border-[#DFE8DC] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#103C34]">Salary Runway</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6F3DD] text-[#174D42]">On Track</span>
                </div>
                <div className="text-2xl font-bold text-[#1C302A] mt-2">18 Days Remaining</div>
                <p className="text-xs text-[#64756D] mt-1">Safe burn: ₹420 / day</p>
              </div>
              <div className="w-full bg-[#DFE8DC] h-2 rounded-full overflow-hidden mt-4">
                <div className="bg-[#174D42] h-full rounded-full" style={{ width: '60%' }} />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#DFE8DC] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#103C34]">Active Credit Card Due</span>
                <div className="text-2xl font-bold text-[#1C302A] mt-2 font-mono-num">₹12,500</div>
                <p className="text-xs text-[#64756D] mt-1">HDFC Regalia Gold • Due Nov 24</p>
              </div>
              <Link
                to="/app/cards/card-1"
                className="mt-4 text-xs font-bold text-[#174D42] hover:underline flex items-center gap-1"
              >
                <span>View Card Breakdown</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillar Highlights */}
      <section className="py-16 px-4 sm:px-6 bg-white border-y border-[#DFE8DC]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">
              Engineered for Complete Financial Mastery
            </h2>
            <p className="text-sm text-[#64756D] mt-2">
              Every feature resides in its own dedicated, purpose-built screen—no crowded monolithic feeds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#F6F8F1] border border-[#DFE8DC] flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#174D42] text-[#B8E4A5] flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#103C34]">Salary Survival Runway</h3>
              <p className="text-xs text-[#64756D] leading-relaxed">
                Dynamic burn rate calculations tell you exactly how much you can spend per day without eating into reserved bill pools.
              </p>
              <Link to="/app/income" className="text-xs font-bold text-[#174D42] hover:underline flex items-center gap-1 mt-auto">
                Explore Income Engine <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-[#F6F8F1] border border-[#DFE8DC] flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#426835] text-[#B8E4A5] flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#103C34]">Card &amp; Reward Optimization</h3>
              <p className="text-xs text-[#64756D] leading-relaxed">
                Compare payment methods on the fly to maximize reward points and cashback for fuel, travel, dining, and grocery runs.
              </p>
              <Link to="/app/cards" className="text-xs font-bold text-[#174D42] hover:underline flex items-center gap-1 mt-auto">
                Explore Credit Cards <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-[#F6F8F1] border border-[#DFE8DC] flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#53421A] text-[#F3D9A4] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#103C34]">Life Moments &amp; Occasions</h3>
              <p className="text-xs text-[#64756D] leading-relaxed">
                Stash money for anniversaries, birthdays, and holidays in dedicated mini-funds so you never stress about celebration costs.
              </p>
              <Link to="/app/life-moments" className="text-xs font-bold text-[#174D42] hover:underline flex items-center gap-1 mt-auto">
                Explore Life Moments <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
