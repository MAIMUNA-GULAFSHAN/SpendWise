import React, { useState } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useApp } from '../../context/AppContext';
import {
  CreditCard as CreditCardIcon,
  PiggyBank,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  PlusCircle,
  Calendar,
  Gift,
  Lock,
  Unlock,
  AlertTriangle,
  Zap,
} from 'lucide-react';

/* =========================================================================
   1. CREDIT CARDS PAGE (/app/cards)
========================================================================= */
export function CardsPage() {
  const { cards, toggleCardAutoDebit, accounts } = useApp();

  const totalLimit = cards.reduce((sum, c) => sum + c.totalLimit, 0);
  const totalUsed = cards.reduce((sum, c) => sum + c.usedAmount, 0);
  const totalUtilization = Math.round((totalUsed / totalLimit) * 100);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Credit Card Management</h1>
          <p className="text-xs text-[#64756D] mt-1">
            Track statement cycles, maintain healthy credit utilization, and optimize reward multipliers.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#DFE8DC] text-right">
          <div className="text-[10px] text-[#64756D] uppercase font-bold">Total Credit Utilization</div>
          <div className="text-xl font-bold text-[#103C34] font-mono-num">
            {totalUtilization}% <span className="text-xs text-[#27865D] font-medium">(Healthy &lt;30%)</span>
          </div>
        </div>
      </div>

      {/* Credit Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#174D42] text-white">
          <span className="text-xs text-white/70">Total Card Obligations Due</span>
          <div className="text-2xl font-bold font-mono-num mt-1 text-[#B8E4A5]">
            ₹{totalUsed.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-white/80 mt-1">Reserved automatically in safe-to-spend math</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DFE8DC]">
          <span className="text-xs text-[#64756D]">Available Credit Line</span>
          <div className="text-2xl font-bold font-mono-num mt-1 text-[#103C34]">
            ₹{(totalLimit - totalUsed).toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-[#64756D] mt-1">Total Limit: ₹{totalLimit.toLocaleString('en-IN')}</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#E6F3DD] border border-[#B8E4A5]">
          <span className="text-xs text-[#174D42] font-semibold">Total Reward Points</span>
          <div className="text-2xl font-bold font-mono-num mt-1 text-[#174D42]">66,590 pts</div>
          <p className="text-[11px] text-[#27865D] mt-1">Worth ~₹16,640 in travel &amp; luxury vouchers</p>
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const util = Math.round((card.usedAmount / card.totalLimit) * 100);

          return (
            <div
              key={card.id}
              className="rounded-3xl p-6 bg-white border border-[#DFE8DC] shadow-sm flex flex-col justify-between min-h-[300px] hover:border-[#174D42]/40 transition-all group"
            >
              {/* Card Face Replica Header */}
              <div>
                <div className="p-4 rounded-2xl bg-[#103C34] text-white shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#B8E4A5]">{card.bank}</span>
                    <span className="text-[10px] text-white/70 uppercase tracking-widest">{card.cardNetwork}</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm tracking-wide text-white">{card.name}</h3>
                    <p className="text-[11px] text-[#F3D9A4]">{card.tier}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono-num text-white/80">
                    <span>{card.cardNumberMasked}</span>
                    <span className="text-[10px] bg-[#B8E4A5] text-[#103C34] font-bold px-2 py-0.5 rounded-full">
                      {util}% Used
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64756D]">Outstanding Due:</span>
                    <span className="font-bold text-[#103C34] font-mono-num">
                      ₹{card.usedAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64756D]">Payment Due Date:</span>
                    <span className="font-semibold text-[#174D42]">{card.dueDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64756D]">Auto-Debit Status:</span>
                    <button
                      onClick={() => toggleCardAutoDebit(card.id)}
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                        card.isAutoDebitEnabled
                          ? 'bg-[#E6F3DD] text-[#27865D]'
                          : 'bg-[#EDF3E9] text-[#64756D]'
                      }`}
                    >
                      {card.isAutoDebitEnabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-[#DFE8DC] mt-4 flex items-center justify-between">
                <span className="text-[11px] text-[#64756D]">{card.rewardPoints.toLocaleString()} pts</span>
                <Link
                  to={`/app/cards/${card.id}`}
                  className="text-xs font-bold text-[#174D42] hover:underline flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Card Details &amp; Settle</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================================
   2. INDIVIDUAL CARD DETAILS PAGE (/app/cards/:id)
========================================================================= */
export function CardDetailsPage() {
  const { params } = useRouter();
  const { cards, payCardDue, accounts } = useApp();
  const [payAmount, setPayAmount] = useState('');
  const [selectedAccId, setSelectedAccId] = useState(accounts[0]?.id || 'acc-1');
  const [isSuccess, setIsSuccess] = useState(false);

  const card = cards.find((c) => c.id === params.id) || cards[0];

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(payAmount || `${card.usedAmount}`);
    if (amt > 0) {
      payCardDue(card.id, amt, selectedAccId);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back button */}
      <div>
        <Link to="/app/cards" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174D42] hover:underline mb-2">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Cards</span>
        </Link>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">{card.name}</h1>
        <p className="text-xs text-[#64756D] mt-1">{card.bank} • {card.tier} • {card.cardNumberMasked}</p>
      </div>

      {isSuccess && (
        <div className="p-4 rounded-2xl bg-[#E6F3DD] border border-[#B8E4A5] text-xs font-bold text-[#174D42] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#27865D]" />
          <span>Payment of ₹{payAmount || card.usedAmount} recorded successfully! Statement updated.</span>
        </div>
      )}

      {/* Hero Card Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-[#103C34] text-white flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between text-xs text-white/70">
              <span>{card.bank}</span>
              <span className="uppercase">{card.cardNetwork}</span>
            </div>
            <div className="mt-6">
              <span className="text-xs text-white/70">Current Outstanding Balance</span>
              <div className="text-3xl font-bold font-mono-num text-[#B8E4A5] mt-1">
                ₹{card.usedAmount.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-white/80 mt-1">Total Credit Limit: ₹{card.totalLimit.toLocaleString('en-IN')}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-white/60 uppercase">Due Date</span>
              <p className="font-bold text-[#F3D9A4]">{card.dueDate}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-white/60 uppercase">Reward Points</span>
              <p className="font-bold text-white">{card.rewardPoints.toLocaleString()} pts</p>
            </div>
          </div>
        </div>

        {/* Bill Settlement Panel */}
        <div className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-[#103C34]">Settle Outstanding Bill</h3>
            <p className="text-xs text-[#64756D] mt-1">
              Select your payment source and amount to clear your balance.
            </p>

            <form onSubmit={handlePay} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#1C302A] mb-1">Pay From Bank Account</label>
                <select
                  value={selectedAccId}
                  onChange={(e) => setSelectedAccId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs"
                >
                  {accounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} (Balance: ₹{a.balance.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C302A] mb-1">Payment Amount (₹)</label>
                <input
                  type="number"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  placeholder={`Full Due: ₹${card.usedAmount}`}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-sm font-bold font-mono-num text-[#103C34]"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPayAmount(`${card.usedAmount}`)}
                  className="px-2.5 py-1 rounded-lg bg-[#EDF3E9] text-[11px] font-semibold text-[#174D42]"
                >
                  Pay Full (₹{card.usedAmount})
                </button>
                <button
                  type="button"
                  onClick={() => setPayAmount(`${Math.round(card.usedAmount * 0.1)}`)}
                  className="px-2.5 py-1 rounded-lg bg-[#EDF3E9] text-[11px] font-semibold text-[#64756D]"
                >
                  Min Due (₹{Math.round(card.usedAmount * 0.1)})
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] shadow-md transition-colors"
              >
                Confirm Settlement
              </button>
            </form>
          </div>

          <p className="text-[11px] text-[#64756D] mt-4">
            Cashback benefit: {card.cashbackRate}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. SAVINGS & GOALS PAGE (/app/savings)
========================================================================= */
export function SavingsPage() {
  const { savingsGoals, addSavingsGoal } = useApp();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [date, setDate] = useState('2026-12-31');

  const totalSaved = savingsGoals.reduce((s, g) => s + g.currentAmount, 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !target) return;

    addSavingsGoal({
      title,
      targetAmount: parseFloat(target),
      targetDate: date,
      category: 'travel',
      autoSaveMonthly: 2000,
      isLocked: false,
      notes: 'New personal goal',
    });

    setTitle('');
    setTarget('');
    setIsCreating(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Savings &amp; Wealth Goals</h1>
          <p className="text-xs text-[#64756D] mt-1">
            Dedicated capital vaults, emergency reserve buffers, and purchase milestones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-white border border-[#DFE8DC] text-right">
            <span className="text-[10px] text-[#64756D] uppercase font-bold">Total Stashed Wealth</span>
            <p className="text-xl font-bold text-[#103C34] font-mono-num">₹{totalSaved.toLocaleString('en-IN')}</p>
          </div>
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="px-4 py-2 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] flex items-center gap-1.5 shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-[#B8E4A5]" />
            <span>New Goal</span>
          </button>
        </div>
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-base text-[#103C34]">Create Savings Goal</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1">Goal Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Kyoto Trip, Camera, New Car..."
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1">Target Amount (₹)</label>
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="50000"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-mono-num font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1">Target Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs"
              />
            </div>
          </div>
          <button
            type="submit"
            className="py-2.5 px-4 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34]"
          >
            Create Goal Vault
          </button>
        </form>
      )}

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savingsGoals.map((g) => {
          const percent = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));

          return (
            <div
              key={g.id}
              className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#174D42]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#E6F3DD] text-[#174D42] flex items-center justify-center">
                    <PiggyBank className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-[#103C34]">{g.title}</h3>
                    <p className="text-xs text-[#64756D]">Target: {g.targetDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {g.isLocked && (
                    <span className="p-1 rounded-lg bg-[#EDF3E9] text-[#64756D]" title="High-yield Lockbox">
                      <Lock className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E6F3DD] text-[#174D42]">
                    {percent}% Funded
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold font-mono-num text-[#103C34]">
                    ₹{g.currentAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#64756D]">Goal: ₹{g.targetAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#EDF3E9] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#174D42] transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-[#64756D]">{g.notes}</p>

              <div className="pt-3 border-t border-[#DFE8DC] flex items-center justify-between">
                <span className="text-[11px] text-[#27865D] font-medium">Auto-save: ₹{g.autoSaveMonthly}/mo</span>
                <Link
                  to={`/app/savings/${g.id}`}
                  className="text-xs font-bold text-[#174D42] hover:underline flex items-center gap-1"
                >
                  <span>Goal Details &amp; Stash</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================================
   4. SAVINGS GOAL DETAILS PAGE (/app/savings/:id)
========================================================================= */
export function GoalDetailsPage() {
  const { params } = useRouter();
  const { savingsGoals, depositToGoal, accounts } = useApp();
  const [depositAmount, setDepositAmount] = useState('');
  const [depositNote, setDepositNote] = useState('');
  const [selectedAccId, setSelectedAccId] = useState(accounts[0]?.id || 'acc-1');

  const goal = savingsGoals.find((g) => g.id === params.id) || savingsGoals[0];
  const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(depositAmount);
    if (amt > 0) {
      depositToGoal(goal.id, amt, depositNote || 'Goal Stash Deposit', selectedAccId);
      setDepositAmount('');
      setDepositNote('');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <Link to="/app/savings" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174D42] hover:underline mb-2">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Goals</span>
        </Link>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">{goal.title}</h1>
        <p className="text-xs text-[#64756D] mt-1">Target Date: {goal.targetDate} • Category: {goal.category.toUpperCase()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-[#174D42] text-white space-y-4">
          <span className="text-xs uppercase text-white/70">Current Accumulated Reserve</span>
          <div className="text-4xl font-bold font-mono-num text-[#B8E4A5]">
            ₹{goal.currentAmount.toLocaleString('en-IN')}
          </div>
          <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full rounded-full bg-[#B8E4A5]" style={{ width: `${percent}%` }} />
          </div>
          <div className="flex items-center justify-between text-xs text-white/80">
            <span>{percent}% Completed</span>
            <span>Target: ₹{goal.targetAmount.toLocaleString('en-IN')}</span>
          </div>
          <p className="text-xs text-white/70 pt-2 border-t border-white/10">{goal.notes}</p>
        </div>

        {/* Quick Deposit Box */}
        <div className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm space-y-4">
          <h3 className="font-heading font-bold text-base text-[#103C34]">Stash Funds into Goal</h3>
          <form onSubmit={handleDeposit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1">Funding Account</label>
              <select
                value={selectedAccId}
                onChange={(e) => setSelectedAccId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs"
              >
                {accounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} (Balance: ₹{a.balance.toLocaleString('en-IN')})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1">Amount to Stash (₹)</label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="e.g. 1500"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-mono-num font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1">Note (Optional)</label>
              <input
                type="text"
                value={depositNote}
                onChange={(e) => setDepositNote(e.target.value)}
                placeholder="e.g. Freelance bonus deposit"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34]"
            >
              Deposit Funds
            </button>
          </form>
        </div>
      </div>

      {/* Recent Contribution History */}
      <div className="bg-white rounded-3xl border border-[#DFE8DC] p-6 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-base text-[#103C34]">Contribution Ledger</h3>
        <div className="divide-y divide-[#DFE8DC]">
          {(goal.recentContributions || []).map((c, i) => (
            <div key={i} className="py-3 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#1C302A]">{c.note}</p>
                <p className="text-[#64756D] text-[11px]">{c.date}</p>
              </div>
              <span className="font-bold font-mono-num text-[#27865D]">+₹{c.amount.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. LIFE MOMENTS & OCCASIONS PAGE (/app/life-moments)
========================================================================= */
export function LifeMomentsPage() {
  const { lifeMoments, addLifeMoment } = useApp();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [date, setDate] = useState('2026-11-28');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !target) return;

    addLifeMoment({
      title,
      targetBudget: parseFloat(target),
      savedBudget: 0,
      date,
      daysRemaining: 15,
      category: 'personal',
      giftIdeas: ['Personalized celebration gift'],
      status: 'planning',
      notes: 'New occasion plan',
    });

    setTitle('');
    setTarget('');
    setIsCreating(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Life Moments &amp; Occasions</h1>
          <p className="text-xs text-[#64756D] mt-1">
            Plan and fund gifts, anniversaries, and holidays well ahead without stress.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] flex items-center gap-1.5 shadow-sm"
        >
          <PlusCircle className="w-4 h-4 text-[#B8E4A5]" />
          <span>New Moment</span>
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-base text-[#103C34]">Schedule Life Moment</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1">Occasion Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sister's Wedding, Diwali..."
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1">Target Budget (₹)</label>
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="5000"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-mono-num font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs"
              />
            </div>
          </div>
          <button
            type="submit"
            className="py-2.5 px-4 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34]"
          >
            Save Moment
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lifeMoments.map((m) => {
          const percent = Math.min(100, Math.round((m.savedBudget / m.targetBudget) * 100));

          return (
            <div
              key={m.id}
              className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#174D42]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F3D9A4] text-[#3B2C06]">
                    {m.daysRemaining} days to go
                  </span>
                  <span className="text-xs font-bold text-[#103C34]">{percent}% Ready</span>
                </div>

                <div className="mt-4">
                  <h3 className="font-heading font-bold text-base text-[#103C34]">{m.title}</h3>
                  <p className="text-xs text-[#64756D]">{m.date}</p>
                </div>

                <div className="mt-4 space-y-1">
                  <div className="w-full h-2 rounded-full bg-[#EDF3E9] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#174D42] to-[#B8E4A5]"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#64756D]">
                    <span>Stashed: ₹{m.savedBudget.toLocaleString('en-IN')}</span>
                    <span>Target: ₹{m.targetBudget.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#DFE8DC] flex items-center justify-between">
                <span className="text-[11px] text-[#64756D]">{m.giftIdeas.length} gift ideas</span>
                <Link
                  to={`/app/life-moments/${m.id}`}
                  className="text-xs font-bold text-[#174D42] hover:underline flex items-center gap-1"
                >
                  <span>Plan &amp; Stash</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================================
   6. OCCASION DETAILS PAGE (/app/life-moments/:id)
========================================================================= */
export function MomentDetailsPage() {
  const { params } = useRouter();
  const { lifeMoments, contributeToMoment, accounts } = useApp();
  const [stashAmount, setStashAmount] = useState('');
  const [selectedAccId, setSelectedAccId] = useState(accounts[0]?.id || 'acc-1');

  const moment = lifeMoments.find((m) => m.id === params.id) || lifeMoments[0];
  const percent = Math.min(100, Math.round((moment.savedBudget / moment.targetBudget) * 100));

  const handleStash = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(stashAmount);
    if (amt > 0) {
      contributeToMoment(moment.id, amt, selectedAccId);
      setStashAmount('');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <Link to="/app/life-moments" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174D42] hover:underline mb-2">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Moments</span>
        </Link>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">{moment.title}</h1>
        <p className="text-xs text-[#64756D] mt-1">{moment.date} • {moment.daysRemaining} days remaining</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-[#174D42] text-white space-y-4">
          <span className="text-xs uppercase text-white/70">Occasion Funding Progress</span>
          <div className="text-4xl font-bold font-mono-num text-[#B8E4A5]">
            ₹{moment.savedBudget.toLocaleString('en-IN')}
          </div>
          <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full rounded-full bg-[#B8E4A5]" style={{ width: `${percent}%` }} />
          </div>
          <div className="flex items-center justify-between text-xs text-white/80">
            <span>{percent}% Funded</span>
            <span>Target: ₹{moment.targetBudget.toLocaleString('en-IN')}</span>
          </div>
          <p className="text-xs text-white/70 pt-2 border-t border-white/10">{moment.notes}</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm space-y-4">
          <h3 className="font-heading font-bold text-base text-[#103C34]">Add to Occasion Buffer</h3>
          <form onSubmit={handleStash} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1">Funding Account</label>
              <select
                value={selectedAccId}
                onChange={(e) => setSelectedAccId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs"
              >
                {accounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} (Balance: ₹{a.balance.toLocaleString('en-IN')})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1">Top-Up Amount (₹)</label>
              <input
                type="number"
                value={stashAmount}
                onChange={(e) => setStashAmount(e.target.value)}
                placeholder="e.g. 500"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-mono-num font-bold"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34]"
            >
              Stash to Occasion
            </button>
          </form>
        </div>
      </div>

      {/* Gift Ideas Checklist */}
      <div className="bg-white rounded-3xl border border-[#DFE8DC] p-6 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-base text-[#103C34]">Curated Gift Ideas &amp; Itinerary</h3>
        <div className="space-y-2">
          {moment.giftIdeas.map((gift, i) => (
            <div key={i} className="p-3 rounded-xl bg-[#F6F8F1] border border-[#DFE8DC] flex items-center gap-3 text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#27865D]" />
              <span className="font-medium text-[#1C302A]">{gift}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
