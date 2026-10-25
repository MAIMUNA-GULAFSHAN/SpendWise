import React, { useState } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useApp } from '../../context/AppContext';
import {
  Eye,
  EyeOff,
  CheckCircle2,
  Lock,
  PlusCircle,
  CreditCard as CreditCardIcon,
  ArrowUpRight,
  TrendingUp,
  ShoppingBag,
  PiggyBank,
  Sparkles,
  ArrowRight,
  Coffee,
  Fuel,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  Zap,
  X,
  Check,
  RotateCcw,
  ReceiptText,
} from 'lucide-react';

export function UserDashboardPage() {
  const { navigate } = useRouter();
  const {
    user,
    workspaceMode,
    startCleanWorkspace,
    loadDemoWorkspace,
    isBalanceHidden,
    setIsBalanceHidden,
    isAiSignalDismissed,
    dismissAiSignal,
    totalAvailableBalance,
    safeToSpend,
    reservedBills,
    cards,
    transactions,
    accounts,
    savingsGoals,
    lifeMoments,
    depositToGoal,
    addMoneyToAccount,
    transferBetweenAccounts,
    payCardDue,
    categorySpending,
    totalSpentThisCycle,
    safeDailyBurn,
  } = useApp();

  // Modals state
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [addAmount, setAddAmount] = useState('5000');
  const [selectedAccId, setSelectedAccId] = useState(accounts[0]?.id || 'acc-1');

  const [isPayDuesOpen, setIsPayDuesOpen] = useState(false);
  const [payDueCardId, setPayDueCardId] = useState(cards[0]?.id || 'card-1');
  const [payDueAmount, setPayDueAmount] = useState('12500');

  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [transferFromId, setTransferFromId] = useState(accounts[0]?.id || 'acc-1');
  const [transferToId, setTransferToId] = useState(accounts[1]?.id || 'acc-2');
  const [transferAmount, setTransferAmount] = useState('2000');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const primaryCard = cards[0] || {
    id: 'card-1',
    name: 'HDFC Regalia Gold',
    bank: 'HDFC Bank',
    cardNumberMasked: '•••• •••• •••• 8842',
    tier: 'Signature Privilege',
    totalLimit: 150000,
    usedAmount: 12500,
    dueDate: 'Nov 24, 2026',
  };

  const primaryCardUtil = Math.round((primaryCard.usedAmount / primaryCard.totalLimit) * 1000) / 10;
  const dateNightMoment = lifeMoments[0] || {
    id: 'moment-1',
    title: 'Date Night & Anniversary',
    date: 'Nov 28, 2026',
    daysRemaining: 8,
    savedBudget: 2200,
    targetBudget: 3000,
  };

  const handleTuckGoaGoal = () => {
    depositToGoal('goal-2', 850, 'AI Signal dining surplus auto-allocation');
    showToast('₹850 successfully stashed into your Goa Coastal Trip Buffer!');
  };

  const handleConfirmAddMoney = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(addAmount);
    if (amt > 0) {
      addMoneyToAccount(selectedAccId, amt, 'Manual wallet top-up');
      setIsAddMoneyOpen(false);
      showToast(`₹${amt.toLocaleString('en-IN')} added to ${accounts.find((a) => a.id === selectedAccId)?.name}!`);
    }
  };

  const handleConfirmPayDue = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(payDueAmount);
    if (amt > 0) {
      payCardDue(payDueCardId, amt);
      setIsPayDuesOpen(false);
      showToast(`Settlement of ₹${amt.toLocaleString('en-IN')} submitted successfully!`);
    }
  };

  const handleConfirmTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(transferAmount);
    if (amt > 0) {
      transferBetweenAccounts(transferFromId, transferToId, amt);
      setIsTransferOpen(false);
      showToast(`Transferred ₹${amt.toLocaleString('en-IN')} successfully!`);
    }
  };

  // SVG Donut calculation from real dynamic category spending
  const isSpendingEmpty = totalSpentThisCycle === 0;
  const grocerySpend = isSpendingEmpty ? 0 : (categorySpending['Groceries'] || 0);
  const diningSpend = isSpendingEmpty ? 0 : (categorySpending['Dining & Food'] || 0);
  const discSpend = isSpendingEmpty ? 0 : (categorySpending['Discretionary'] || 0);
  const fuelSpend = isSpendingEmpty ? 0 : (categorySpending['Fuel & Transit'] || 0);
  const subSpend = isSpendingEmpty ? 0 : (categorySpending['Subscriptions'] || 0);
  const totalCategorySum = Math.max(1, grocerySpend + diningSpend + discSpend + fuelSpend + subSpend);

  const circum = 2 * Math.PI * 38; // ~238.76
  const grocLen = (grocerySpend / totalCategorySum) * circum;
  const dinLen = (diningSpend / totalCategorySum) * circum;
  const discLen = (discSpend / totalCategorySum) * circum;
  const fuelLen = (fuelSpend / totalCategorySum) * circum;
  const subLen = (subSpend / totalCategorySum) * circum;

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-5 sm:space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#174D42] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-[#B8E4A5]/40 text-xs font-semibold animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4 text-[#B8E4A5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Workspace State Switch Banner */}
      {workspaceMode === 'demo' ? (
        <div className="p-3 sm:p-3.5 rounded-2xl bg-[#E6F3DD] border border-[#B8E4A5] text-[#174D42] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-xs">
          <div className="flex items-center gap-2 text-xs">
            <Sparkles className="w-4 h-4 text-[#27865D] shrink-0" />
            <span>Currently previewing <strong>Sample Demo Mode (Rohan Sharma)</strong>.</span>
          </div>
          <button
            onClick={() => {
              startCleanWorkspace({ name: 'Personal User', email: 'me@spendwise.app' });
              showToast('Clean personal workspace activated with 0 transactions!');
            }}
            className="px-3.5 py-1.5 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] active:scale-95 transition-all text-center shrink-0 shadow-xs"
          >
            Start Clean Workspace (0 Transactions)
          </button>
        </div>
      ) : (
        <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#DFE8DC] text-[#103C34] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-xs">
          <div className="flex items-center gap-2 text-xs min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#27865D] animate-pulse shrink-0" />
            <span className="truncate"><strong>Personal Expense Mode</strong>: Clean ledger with {transactions.length} personal transactions.</span>
          </div>
          <button
            onClick={() => {
              loadDemoWorkspace();
              showToast('Switched to Sample Demo Data (Rohan)');
            }}
            className="text-xs font-bold text-[#174D42] hover:underline shrink-0 text-left sm:text-right"
          >
            Load Sample Demo Data
          </button>
        </div>
      )}

      {/* Top Context Greeting & Auto-Sync Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full max-w-full">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34] tracking-tight truncate">
              Hi, {user.name}
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6F3DD] text-[#174D42] border border-[#B8E4A5]/60">
              {workspaceMode === 'personal' ? 'PERSONAL LEDGER' : 'DEMO PRO'}
            </span>
          </div>
          <p className="text-xs text-[#64756D] mt-0.5 truncate">
            Cycle: 1st - 30th Nov • Multi-wallet real-time ledger
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white border border-[#DFE8DC] text-[11px] text-[#64756D]">
            <span className="w-2 h-2 rounded-full bg-[#27865D] animate-pulse shrink-0" />
            <span>Auto-synced</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E6F3DD] border border-[#B8E4A5]/40 text-[11px] text-[#174D42] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#27865D] shrink-0" />
            <span>Encrypted Ledger</span>
          </div>
        </div>
      </div>

      {/* 1. HERO BALANCE CARD */}
      <div className="relative overflow-hidden rounded-3xl bg-[#174D42] text-white p-5 sm:p-7 shadow-[0_20px_40px_-12px_rgba(16,60,52,0.22)] w-full max-w-full">
        {/* Ambient Organic Layer Gradients */}
        <div className="absolute -top-24 -right-20 w-64 h-64 rounded-full bg-[#B8E4A5]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-20 w-64 h-64 rounded-full bg-[#103C34]/80 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4 sm:gap-5">
          {/* Balance Header Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-white/75 font-semibold">
                Total Available Balance
              </span>
              <button
                onClick={() => setIsBalanceHidden(!isBalanceHidden)}
                className="text-white/70 hover:text-white p-1 rounded-lg transition-colors"
                title="Toggle balance visibility"
              >
                {isBalanceHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[#B8E4A5] text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8E4A5]" />
              <span>Live Sync</span>
            </div>
          </div>

          {/* Main Balance Figure */}
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#B8E4A5] font-heading">₹</span>
            <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-mono-num truncate">
              {isBalanceHidden ? '••••••••' : totalAvailableBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          {/* Sub-metrics Asymmetric Pill Deck */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
            <div className="flex flex-col gap-1 p-3.5 rounded-2xl bg-[#B8E4A5] text-[#103C34] shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wide font-bold opacity-80">Safe to Spend</span>
                <CheckCircle2 className="w-4 h-4 text-[#174D42]" />
              </div>
              <span className="text-xl sm:text-2xl font-bold font-mono-num truncate">
                {isBalanceHidden ? '••••••' : `₹${safeToSpend.toLocaleString('en-IN')}`}
              </span>
              <span className="text-xs opacity-75 font-medium">Liquid for Nov</span>
            </div>

            <div className="flex flex-col gap-1 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md text-white border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wide text-white/70 font-semibold">Reserved Bills</span>
                <Lock className="w-4 h-4 text-white/70" />
              </div>
              <span className="text-xl sm:text-2xl font-bold font-mono-num truncate">
                {isBalanceHidden ? '••••••' : `₹${reservedBills.toLocaleString('en-IN')}`}
              </span>
              <span className="text-xs text-white/70">Locked for auto-debit</span>
            </div>
          </div>

          {/* Quick Action Deck */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-3 pt-1 w-full max-w-full">
            <button
              onClick={() => setIsAddMoneyOpen(true)}
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 transition-all text-white text-[11px] sm:text-xs font-semibold text-center min-w-0"
            >
              <PlusCircle className="w-4 h-4 text-[#B8E4A5] shrink-0" />
              <span className="truncate">Add Money</span>
            </button>
            <button
              onClick={() => setIsPayDuesOpen(true)}
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl bg-[#F3D9A4] text-[#3B2C06] hover:bg-[#fae0aa] active:scale-95 transition-all text-[11px] sm:text-xs font-bold shadow-sm text-center min-w-0"
            >
              <CreditCardIcon className="w-4 h-4 shrink-0" />
              <span className="truncate">Pay Dues</span>
            </button>
            <button
              onClick={() => setIsTransferOpen(true)}
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 transition-all text-white text-[11px] sm:text-xs font-semibold text-center min-w-0"
            >
              <ArrowUpRight className="w-4 h-4 shrink-0" />
              <span className="truncate">Transfer</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. SALARY SURVIVAL & PAYDAY WIDGET */}
      <div className="rounded-2xl bg-white p-5 border border-[#DFE8DC] shadow-[0_4px_20px_-2px_rgba(23,77,66,0.05)] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E6F3DD] text-[#174D42] flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <span className="font-heading text-base font-bold text-[#103C34]">Salary Runway</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-[#E6F3DD] text-[#174D42] text-xs font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#27865D]" />
              <span>On Track</span>
            </span>
            <Link to="/app/income" className="text-xs font-bold text-[#174D42] hover:underline flex items-center gap-0.5">
              <span>Runway Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pt-1">
          <div>
            <p className="text-xl sm:text-2xl font-bold text-[#103C34] font-heading">18 Days Until Payday</p>
            <p className="text-xs text-[#64756D]">Scheduled for Sunday, 30th Nov</p>
          </div>
          <div className="sm:text-right">
            <p className="text-base sm:text-lg font-bold text-[#27865D] font-mono-num">₹{safeDailyBurn} / day</p>
            <p className="text-xs text-[#64756D]">Safe daily burn</p>
          </div>
        </div>

        {/* Segmented Multi-Tone Progress Runway Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-3 rounded-full bg-[#EDF3E9] overflow-hidden flex p-0.5 gap-0.5">
            <div className="h-full rounded-l-full bg-[#174D42]" style={{ width: '40%' }} title="12d Past" />
            <div className="h-full bg-[#B8E4A5]" style={{ width: '45%' }} title="18d Ahead" />
            <div className="h-full rounded-r-full bg-[#F3D9A4]" style={{ width: '15%' }} title="Target Buffer" />
          </div>
          <div className="flex items-center justify-between text-xs text-[#64756D]">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#174D42]" />
              <span>12d Past</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#B8E4A5]" />
              <span>18d Ahead</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#F3D9A4]" />
              <span>Target Buffer</span>
            </div>
          </div>
        </div>

        {/* Smart Runway Tooltip Pill */}
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#E6F3DD]/70 border border-[#B8E4A5]/40 text-xs text-[#103C34]">
          <Sparkles className="w-4 h-4 text-[#174D42] shrink-0" />
          <p>
            At current velocity, you will lock a <strong className="text-[#174D42] font-semibold">₹6,800 reserve surplus</strong> on Nov 30.
          </p>
        </div>
      </div>

      {/* 3. KPI SUMMARY CARDS (2x2 Asymmetric Grid with links) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Monthly Salary */}
        <Link
          to="/app/income"
          className="rounded-2xl p-4 bg-white border border-[#DFE8DC] hover:border-[#174D42]/30 transition-all shadow-sm flex flex-col justify-between gap-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-[#E6F3DD] text-[#174D42] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#E6F3DD] text-[#27865D]">
              +5%
            </span>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#64756D] uppercase">Monthly Salary</p>
            <p className="text-lg font-bold text-[#103C34] font-mono-num mt-0.5">₹45,000</p>
            <p className="text-xs text-[#64756D] truncate mt-0.5">Credited 1st Nov</p>
          </div>
        </Link>

        {/* Card 2: Total Spent */}
        <Link
          to="/app/transactions"
          className="rounded-2xl p-4 bg-white border border-[#DFE8DC] hover:border-[#174D42]/30 transition-all shadow-sm flex flex-col justify-between gap-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-[#EDF3E9] text-[#1C302A] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#EDF3E9] text-[#64756D]">
              59% burnt
            </span>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#64756D] uppercase">Total Spent</p>
            <p className="text-lg font-bold text-[#103C34] font-mono-num mt-0.5">
              ₹{totalSpentThisCycle.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-[#64756D] truncate mt-0.5">{transactions.length} transactions logged</p>
          </div>
        </Link>

        {/* Card 3: Card Obligations */}
        <Link
          to="/app/cards"
          className="rounded-2xl p-4 bg-white border border-[#DFE8DC] hover:border-[#174D42]/30 transition-all shadow-sm flex flex-col justify-between gap-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-[#F3D9A4]/60 text-[#3B2C06] flex items-center justify-center">
              <CreditCardIcon className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#F3D9A4] text-[#3B2C06]">
              Due in 6d
            </span>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#64756D] uppercase">Card Obligations</p>
            <p className="text-lg font-bold text-[#103C34] font-mono-num mt-0.5">
              ₹{primaryCard.usedAmount.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-[#64756D] truncate mt-0.5">{primaryCard.name}</p>
          </div>
        </Link>

        {/* Card 4: Reserves Pool */}
        <Link
          to="/app/savings"
          className="rounded-2xl p-4 bg-white border border-[#DFE8DC] hover:border-[#174D42]/30 transition-all shadow-sm flex flex-col justify-between gap-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-[#E6F3DD] text-[#174D42] flex items-center justify-center">
              <PiggyBank className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#B8E4A5]/60 text-[#103C34]">
              70% Goal
            </span>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#64756D] uppercase">Reserves Pool</p>
            <p className="text-lg font-bold text-[#103C34] font-mono-num mt-0.5">
              ₹{savingsGoals[0]?.currentAmount.toLocaleString('en-IN') || '10,500'}
            </p>
            <p className="text-xs text-[#64756D] truncate mt-0.5">Target ₹15,000</p>
          </div>
        </Link>
      </div>

      {/* 4. CREDIT CARD EXPOSURE & CATEGORY VELOCITY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Credit Exposure Widget (Digital Card Mimicry) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="font-heading text-base font-bold text-[#103C34]">Credit Exposure</span>
            <Link to="/app/cards" className="text-xs font-bold text-[#174D42] hover:underline">
              Manage Cards
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-[#00352C] text-white p-5 shadow-md flex flex-col justify-between gap-4 min-h-[200px]">
            {/* Ambient Card Glow */}
            <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#426835]/30 blur-2xl pointer-events-none" />

            {/* Top Issuer Row */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-6 rounded-md bg-[#ddc490]/90 flex items-center justify-center shadow-inner">
                  <span className="w-5 h-3.5 rounded-sm bg-[#3b2c06]/20" />
                </div>
                <span className="text-xs tracking-wider text-white/70">CONTACTLESS</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold tracking-wide text-white">{primaryCard.name}</p>
                <p className="text-[11px] text-white/70">{primaryCard.tier}</p>
              </div>
            </div>

            {/* Masked Card Number & Utilisation Bar */}
            <div className="relative z-10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm tracking-widest text-white/80 font-mono-num">{primaryCard.cardNumberMasked}</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#B8E4A5] text-[#00352C]">
                  {primaryCardUtil}% Used (Healthy)
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
                <div className="h-full rounded-full bg-[#B8E4A5]" style={{ width: `${Math.min(100, primaryCardUtil)}%` }} />
              </div>
              <div className="flex items-center justify-between text-xs text-white/70">
                <span>Owed: <strong className="text-white font-semibold font-mono-num">₹{primaryCard.usedAmount.toLocaleString('en-IN')}</strong></span>
                <span>Limit: ₹{primaryCard.totalLimit.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Card Due Date & Pay CTA Row */}
            <div className="relative z-10 flex items-center justify-between pt-1 border-t border-white/10">
              <div>
                <span className="text-[10px] uppercase text-white/70">Payment Due Date</span>
                <p className="text-xs font-bold text-[#fae0aa]">{primaryCard.dueDate}</p>
              </div>
              <button
                onClick={() => {
                  setPayDueCardId(primaryCard.id);
                  setPayDueAmount(`${primaryCard.usedAmount}`);
                  setIsPayDuesOpen(true);
                }}
                className="py-1.5 px-4 rounded-xl bg-[#c2efaf] text-[#032100] hover:bg-[#a7d295] active:scale-95 transition-all text-xs font-bold shadow-sm"
              >
                Pay Bill
              </button>
            </div>
          </div>
        </div>

        {/* Category Velocity Widget with SVG Donut */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="font-heading text-base font-bold text-[#103C34]">Category Velocity</span>
            <Link to="/app/categories" className="text-xs font-bold text-[#174D42] hover:underline">
              This Cycle
            </Link>
          </div>

          <div className="rounded-2xl bg-white p-4 sm:p-5 border border-[#DFE8DC] shadow-sm flex flex-col sm:flex-row items-center gap-4 sm:gap-5 min-h-[200px] w-full max-w-full overflow-hidden">
            {/* SVG Donut Chart */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="none" r="38" stroke="#EDF3E9" strokeWidth="12" />
                {isSpendingEmpty ? (
                  <circle cx="50" cy="50" fill="none" r="38" stroke="#B8E4A5" strokeWidth="12" strokeDasharray="238.76" strokeDashoffset="0" />
                ) : (
                  <>
                    {/* Groceries */}
                    <circle
                      cx="50"
                      cy="50"
                      fill="none"
                      r="38"
                      stroke="#174d42"
                      strokeWidth="12"
                      strokeDasharray={`${grocLen} ${circum - grocLen}`}
                      strokeDashoffset="0"
                    />
                    {/* Dining */}
                    <circle
                      cx="50"
                      cy="50"
                      fill="none"
                      r="38"
                      stroke="#426835"
                      strokeWidth="12"
                      strokeDasharray={`${dinLen} ${circum - dinLen}`}
                      strokeDashoffset={`${-grocLen}`}
                    />
                    {/* Discretionary */}
                    <circle
                      cx="50"
                      cy="50"
                      fill="none"
                      r="38"
                      stroke="#9cd1c2"
                      strokeWidth="12"
                      strokeDasharray={`${discLen} ${circum - discLen}`}
                      strokeDashoffset={`${-(grocLen + dinLen)}`}
                    />
                    {/* Fuel */}
                    <circle
                      cx="50"
                      cy="50"
                      fill="none"
                      r="38"
                      stroke="#fae0aa"
                      strokeWidth="12"
                      strokeDasharray={`${fuelLen} ${circum - fuelLen}`}
                      strokeDashoffset={`${-(grocLen + dinLen + discLen)}`}
                    />
                    {/* Subscriptions */}
                    <circle
                      cx="50"
                      cy="50"
                      fill="none"
                      r="38"
                      stroke="#53421a"
                      strokeWidth="12"
                      strokeDasharray={`${subLen} ${circum - subLen}`}
                      strokeDashoffset={`${-(grocLen + dinLen + discLen + fuelLen)}`}
                    />
                  </>
                )}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-[#64756D] font-medium">Spent</span>
                <span className="text-sm sm:text-base font-bold text-[#103C34] font-mono-num">
                  ₹{isSpendingEmpty ? '0' : (totalSpentThisCycle / 1000).toFixed(1) + 'k'}
                </span>
              </div>
            </div>

            {/* Legend Column */}
            <div className="w-full sm:flex-1 space-y-1.5 text-xs min-w-0">
              {isSpendingEmpty ? (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-[#E6F3DD]/60 border border-[#B8E4A5]/40 text-[#174D42] text-xs">
                    <p className="font-semibold">Clean Slate Active</p>
                    <p className="text-[11px] text-[#64756D] mt-0.5">
                      No expenses logged this cycle yet. All ₹{safeToSpend.toLocaleString('en-IN')} available balance is safe to spend!
                    </p>
                  </div>
                  <Link
                    to="/app/transactions/new"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174D42] hover:underline"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-[#27865D]" />
                    <span>Record your first expense</span>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#174D42] shrink-0" />
                      <span className="truncate">Groceries</span>
                    </div>
                    <span className="font-semibold font-mono-num shrink-0">₹{grocerySpend.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#426835] shrink-0" />
                      <span className="truncate">Dining &amp; Food</span>
                    </div>
                    <span className="font-semibold font-mono-num shrink-0">₹{diningSpend.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#9CD1C2] shrink-0" />
                      <span className="truncate">Discretionary</span>
                    </div>
                    <span className="font-semibold font-mono-num shrink-0">₹{discSpend.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#fae0aa] shrink-0" />
                      <span className="truncate">Fuel &amp; Transit</span>
                    </div>
                    <span className="font-semibold font-mono-num shrink-0">₹{fuelSpend.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#53421a] shrink-0" />
                      <span className="truncate">Subscriptions</span>
                    </div>
                    <span className="font-semibold font-mono-num shrink-0">₹{subSpend.toLocaleString('en-IN')}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5. RECENT ENTRIES (TRANSACTIONS) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="font-heading text-base font-bold text-[#103C34]">Recent Entries</span>
          <Link to="/app/transactions" className="text-xs font-bold text-[#174D42] hover:underline flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {transactions.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white border border-[#DFE8DC] text-center flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F3DD] text-[#174D42] flex items-center justify-center">
              <ReceiptText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-sm font-bold text-[#103C34]">No Transactions Recorded Yet</h3>
              <p className="text-xs text-[#64756D] max-w-sm mt-0.5">
                Your personal ledger is clean and ready. Click below to record your first income or expense.
              </p>
            </div>
            <Link
              to="/app/transactions/new"
              className="px-4 py-2 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] flex items-center gap-1.5 shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4 text-[#B8E4A5]" />
              <span>+ Add Your First Expense</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {transactions.slice(0, 4).map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-white border border-[#DFE8DC] hover:bg-[#F6F8F1] transition-colors shadow-sm gap-2 min-w-0 overflow-hidden"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#dcf3ea] flex items-center justify-center text-[#174D42] shrink-0">
                    {tx.category.includes('Food') || tx.category.includes('Dining') ? (
                      <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : tx.category.includes('Fuel') ? (
                      <Fuel className="w-4 h-4 sm:w-5 sm:h-5 text-[#3b2c06]" />
                    ) : (
                      <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-[#27865D]" />
                    )}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-bold text-[#1C302A] truncate">{tx.title}</span>
                      {tx.cashbackEarned ? (
                        <span className="px-1.5 py-0.2 rounded bg-[#c2efaf]/60 text-[#2b4f20] text-[10px] font-bold shrink-0">
                          5% Back
                        </span>
                      ) : null}
                    </div>
                    <span className="text-[11px] text-[#64756D] truncate">
                      {tx.category} • {tx.date} • {tx.paymentMethod}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-xs sm:text-sm font-bold font-mono-num ${
                      tx.type === 'income' ? 'text-[#27865D]' : 'text-[#1C302A]'
                    }`}
                  >
                    {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                  </span>
                  {tx.cashbackEarned ? (
                    <p className="text-[10px] text-[#426835] font-medium">+₹{tx.cashbackEarned} saved</p>
                  ) : (
                    <p className="text-[10px] text-[#64756D]">{tx.status}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. AI INSIGHT & LIFE MOMENT PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SpendWise AI Signal */}
        {!isAiSignalDismissed ? (
          <div className="rounded-2xl p-4 sm:p-5 bg-[#c2efaf]/30 border border-[#B8E4A5] text-[#1C302A] shadow-sm flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#426835] text-white flex items-center justify-center shadow-sm">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#486e3b] uppercase tracking-wide">
                    SpendWise AI Signal
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#426835]">Smart Optimization</span>
              </div>
              <p className="text-xs sm:text-sm text-[#1C302A] leading-relaxed">
                You spent <strong className="text-[#426835]">18% less on food delivery</strong> this week! That automatically unlocked <strong className="text-[#174D42]">₹850 surplus</strong> ready to tuck into your Goa trip buffer.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleTuckGoaGoal}
                className="py-2 px-3.5 rounded-xl bg-[#00352c] text-white hover:bg-[#174d42] active:scale-95 transition-all text-xs font-bold shadow-sm flex items-center gap-1.5"
              >
                <span>Tuck Into Goa Goal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={dismissAiSignal}
                className="py-2 px-3 rounded-xl bg-transparent text-[#64756D] hover:text-[#1C302A] text-xs font-medium"
              >
                Dismiss
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl p-4 bg-white border border-[#DFE8DC] text-xs text-[#64756D] flex items-center justify-between">
            <span>AI Signal dismissed for this cycle.</span>
            <button
              onClick={() => showToast('AI suggestions refresh automatically every 24 hours.')}
              className="text-[#174D42] font-semibold hover:underline"
            >
              Refresh Insights
            </button>
          </div>
        )}

        {/* Life Moment Preview Widget */}
        <div className="rounded-2xl bg-white p-4 sm:p-5 border border-[#DFE8DC] shadow-sm flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#fae0aa] text-[#251a00] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-[#103C34]">{dateNightMoment.title}</span>
                  <p className="text-[11px] text-[#64756D]">Scheduled for Nov 28 • 8 days to go</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#c2efaf] text-[#032100]">
                73% Ready
              </span>
            </div>

            <div className="space-y-1.5 mt-3">
              <div className="w-full h-2 rounded-full bg-[#EDF3E9] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#00352c] to-[#c2efaf]" style={{ width: '73.3%' }} />
              </div>
              <div className="flex items-center justify-between text-xs text-[#64756D]">
                <span>Stashed: <strong className="text-[#00352c] font-semibold font-mono-num">₹{dateNightMoment.savedBudget}</strong></span>
                <span>Target: ₹{dateNightMoment.targetBudget}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-[#DFE8DC]">
            <Link
              to={`/app/life-moments/${dateNightMoment.id}`}
              className="text-xs font-bold text-[#174D42] hover:underline flex items-center gap-1"
            >
              <span>View Moment Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/app/life-moments" className="text-xs text-[#64756D] hover:text-[#174D42]">
              All Moments
            </Link>
          </div>
        </div>
      </div>

      {/* QUICK ACTION MODALS */}

      {/* 1. ADD MONEY MODAL */}
      {isAddMoneyOpen && (
        <div className="fixed inset-0 z-50 bg-[#103C34]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#DFE8DC] p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#DFE8DC]">
              <h3 className="font-heading font-bold text-base text-[#103C34]">Add Funds to Account</h3>
              <button onClick={() => setIsAddMoneyOpen(false)} className="text-[#64756D] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleConfirmAddMoney} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1C302A] mb-1">Target Account / Wallet</label>
                <select
                  value={selectedAccId}
                  onChange={(e) => setSelectedAccId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs"
                >
                  {accounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} (Current: ₹{a.balance.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C302A] mb-1">Amount (₹)</label>
                <input
                  type="number"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-sm font-bold font-mono-num text-[#103C34]"
                  required
                />
              </div>

              <div className="flex gap-2">
                {['1000', '5000', '10000'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAddAmount(preset)}
                    className="flex-1 py-1.5 rounded-lg bg-[#EDF3E9] text-xs font-semibold text-[#174D42] hover:bg-[#E6F3DD]"
                  >
                    +₹{parseInt(preset).toLocaleString()}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] shadow-md"
              >
                Confirm Add Funds
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. PAY DUES MODAL */}
      {isPayDuesOpen && (
        <div className="fixed inset-0 z-50 bg-[#103C34]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#DFE8DC] p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#DFE8DC]">
              <h3 className="font-heading font-bold text-base text-[#103C34]">Settle Credit Card Dues</h3>
              <button onClick={() => setIsPayDuesOpen(false)} className="text-[#64756D] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleConfirmPayDue} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1C302A] mb-1">Select Credit Card</label>
                <select
                  value={payDueCardId}
                  onChange={(e) => {
                    setPayDueCardId(e.target.value);
                    const selected = cards.find((c) => c.id === e.target.value);
                    if (selected) setPayDueAmount(`${selected.usedAmount}`);
                  }}
                  className="w-full p-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs"
                >
                  {cards.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} (Due: ₹{c.usedAmount.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C302A] mb-1">Amount to Settle (₹)</label>
                <input
                  type="number"
                  value={payDueAmount}
                  onChange={(e) => setPayDueAmount(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-sm font-bold font-mono-num text-[#103C34]"
                  required
                />
              </div>

              <div className="p-3 rounded-xl bg-[#E6F3DD] text-[11px] text-[#174D42]">
                Paid from your primary HDFC Salary Account (••4920). Instant statement clearance.
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] shadow-md"
              >
                Confirm Settlement
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. TRANSFER MODAL */}
      {isTransferOpen && (
        <div className="fixed inset-0 z-50 bg-[#103C34]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#DFE8DC] p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#DFE8DC]">
              <h3 className="font-heading font-bold text-base text-[#103C34]">Transfer Between Accounts</h3>
              <button onClick={() => setIsTransferOpen(false)} className="text-[#64756D] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleConfirmTransfer} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1C302A] mb-1">From Account</label>
                <select
                  value={transferFromId}
                  onChange={(e) => setTransferFromId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs"
                >
                  {accounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} (₹{a.balance.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C302A] mb-1">To Account</label>
                <select
                  value={transferToId}
                  onChange={(e) => setTransferToId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs"
                >
                  {accounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} (₹{a.balance.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C302A] mb-1">Transfer Amount (₹)</label>
                <input
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-sm font-bold font-mono-num text-[#103C34]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] shadow-md"
              >
                Execute Transfer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
