import React, { useState } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useApp } from '../../context/AppContext';
import { Account } from '../../types';
import {
  ReceiptText,
  PlusCircle,
  Banknote,
  Wallet,
  Tags,
  PieChart,
  Search,
  Filter,
  Download,
  Trash2,
  Calendar,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Clock,
  Sparkles,
  Edit2,
  Check,
} from 'lucide-react';

/* =========================================================================
   1. TRANSACTIONS PAGE (/app/transactions)
========================================================================= */
export function TransactionsPage() {
  const { navigate } = useRouter();
  const { transactions, deleteTransaction } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'expense' | 'income'>('all');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered = transactions.filter((t) => {
    const matchesType = filterType === 'all' || t.type === filterType;
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.paymentMethod.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    return matchesType && matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(transactions.map((t) => t.category)));

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Title,Category,Type,Amount,Date,Payment Method,Notes']
        .concat(
          transactions.map(
            (t) =>
              `"${t.title}","${t.category}","${t.type}",${t.amount},"${t.date}","${t.paymentMethod}","${
                t.notes || ''
              }"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'spendwise_ledger.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">All Transactions</h1>
          <p className="text-xs text-[#64756D] mt-1">
            Complete transaction ledger across all synced banks, cards, and wallets.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#DFE8DC] text-xs font-semibold text-[#174D42] hover:bg-[#EDF3E9] flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <Link
            to="/app/transactions/new"
            className="px-4 py-2 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-[#B8E4A5]" />
            <span>New Transaction</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#DFE8DC] shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#64756D] absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search merchant, category, or card ending..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs text-[#1C302A] placeholder:text-[#64756D] focus:outline-none focus:bg-white focus:border-[#174D42]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Segmented Filter */}
          <div className="flex items-center p-1 bg-[#EDF3E9] rounded-xl text-xs font-medium">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterType === 'all' ? 'bg-white text-[#103C34] shadow-sm font-bold' : 'text-[#64756D]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('expense')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterType === 'expense' ? 'bg-white text-[#103C34] shadow-sm font-bold' : 'text-[#64756D]'
              }`}
            >
              Expenses
            </button>
            <button
              onClick={() => setFilterType('income')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterType === 'income' ? 'bg-white text-[#103C34] shadow-sm font-bold' : 'text-[#64756D]'
              }`}
            >
              Income
            </button>
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs text-[#1C302A] focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transactions Table / List */}
      <div className="bg-white rounded-2xl border border-[#DFE8DC] overflow-hidden shadow-sm w-full max-w-full">
        <div className="p-3.5 sm:p-4 border-b border-[#DFE8DC] flex items-center justify-between text-xs text-[#64756D]">
          <span>Showing {filtered.length} entries</span>
          <span>Encrypted Local Sync</span>
        </div>

        {filtered.length === 0 ? (
          <div className="p-10 sm:p-14 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F3DD] text-[#174D42] flex items-center justify-center shadow-xs">
              <ReceiptText className="w-6 h-6" />
            </div>
            <div>
              <p className="font-heading text-sm font-bold text-[#103C34]">
                {transactions.length === 0 ? 'Your Expense Ledger is Fresh & Clean' : 'No transactions match filters'}
              </p>
              <p className="text-xs text-[#64756D] max-w-sm mt-1">
                {transactions.length === 0
                  ? 'Ready to track your personal finances? Record your first spend or incoming salary to begin.'
                  : 'Try clearing your search keyword or selecting "All Categories".'}
              </p>
            </div>
            {transactions.length === 0 && (
              <Link
                to="/app/transactions/new"
                className="mt-2 px-4 py-2 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] flex items-center gap-1.5 shadow-sm transition-all"
              >
                <PlusCircle className="w-4 h-4 text-[#B8E4A5]" />
                <span>+ Log First Expense</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-[#DFE8DC]">
            {filtered.map((tx) => (
              <div
                key={tx.id}
                className="p-3 sm:p-4 flex items-center justify-between hover:bg-[#F6F8F1] transition-colors gap-2 min-w-0 overflow-hidden"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EDF3E9] text-[#174D42] flex items-center justify-center font-bold shrink-0">
                    <ReceiptText className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs sm:text-sm font-bold text-[#1C302A] truncate">{tx.title}</p>
                      {tx.cashbackEarned ? (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#E6F3DD] text-[#27865D] shrink-0">
                          +₹{tx.cashbackEarned} Back
                        </span>
                      ) : null}
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#64756D] truncate">
                      {tx.category} • {tx.paymentMethod} • {tx.date} {tx.time ? `at ${tx.time}` : ''}
                    </p>
                    {tx.notes && <p className="text-[11px] text-[#64756D]/80 italic mt-0.5 truncate">{tx.notes}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
                  <div className="text-right">
                    <p
                      className={`text-xs sm:text-sm font-bold font-mono-num ${
                        tx.type === 'income' ? 'text-[#27865D]' : 'text-[#1C302A]'
                      }`}
                    >
                      {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                    </p>
                    <span className="text-[10px] text-[#64756D]">{tx.status}</span>
                  </div>

                  <button
                    onClick={() => deleteTransaction(tx.id)}
                    className="p-1.5 rounded-lg text-[#64756D] hover:text-[#BA1A1A] hover:bg-[#EDF3E9] transition-colors"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   2. ADD TRANSACTION PAGE (/app/transactions/new)
========================================================================= */
export function AddTransactionPage() {
  const { navigate } = useRouter();
  const { addTransaction, accounts, cards } = useApp();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [category, setCategory] = useState('Dining & Food');
  const [paymentSourceType, setPaymentSourceType] = useState<'card' | 'account'>('card');
  const [selectedCardId, setSelectedCardId] = useState(cards[0]?.id || 'card-1');
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id || 'acc-1');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!title || isNaN(parsedAmount) || parsedAmount <= 0) return;

    let paymentMethod = '';
    let accountId: string | undefined = undefined;
    let cardId: string | undefined = undefined;

    if (type === 'income') {
      const acc = accounts.find((a) => a.id === selectedAccountId);
      paymentMethod = acc ? `${acc.name} (${acc.accountNumberMasked})` : 'Bank Transfer';
      accountId = selectedAccountId;
    } else {
      if (paymentSourceType === 'card') {
        const c = cards.find((card) => card.id === selectedCardId);
        paymentMethod = c ? `${c.name} (${c.cardNumberMasked.slice(-4)})` : 'Credit Card';
        cardId = selectedCardId;
      } else {
        const acc = accounts.find((a) => a.id === selectedAccountId);
        paymentMethod = acc ? `${acc.name} (${acc.accountNumberMasked})` : 'Bank Account';
        accountId = selectedAccountId;
      }
    }

    addTransaction({
      title,
      amount: parsedAmount,
      type,
      category,
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      paymentMethod,
      accountId,
      cardId,
      notes,
    });

    navigate('/app/transactions');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Add New Transaction</h1>
        <p className="text-xs text-[#64756D] mt-1">
          Record cash, UPI, or card expenditure with dynamic double-entry ledger balance updates.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#DFE8DC] p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type Toggle */}
          <div>
            <label className="block text-xs font-semibold text-[#1C302A] mb-2">Transaction Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`py-3 rounded-xl text-xs font-bold transition-all ${
                  type === 'expense'
                    ? 'bg-[#174D42] text-white shadow-sm'
                    : 'bg-[#EDF3E9] text-[#64756D] hover:bg-[#E6F3DD]'
                }`}
              >
                Expense (-)
              </button>
              <button
                type="button"
                onClick={() => setType('income')}
                className={`py-3 rounded-xl text-xs font-bold transition-all ${
                  type === 'income'
                    ? 'bg-[#27865D] text-white shadow-sm'
                    : 'bg-[#EDF3E9] text-[#64756D] hover:bg-[#E6F3DD]'
                }`}
              >
                Income (+)
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-semibold text-[#1C302A] mb-1.5">Amount (₹)</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-lg font-bold text-[#174D42]">₹</span>
              <input
                type="number"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xl font-bold text-[#1C302A] font-mono-num focus:bg-white focus:outline-none focus:border-[#174D42]"
              />
            </div>
          </div>

          {/* Title / Merchant */}
          <div>
            <label className="block text-xs font-semibold text-[#1C302A] mb-1.5">Merchant / Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Starbucks Coffee, Shell Petrol, Amazon Fresh..."
              required
              className="w-full px-4 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-medium text-[#1C302A] focus:bg-white focus:outline-none focus:border-[#174D42]"
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs text-[#1C302A]"
              >
                <option value="Dining & Food">Dining &amp; Food</option>
                <option value="Groceries">Groceries</option>
                <option value="Discretionary">Discretionary</option>
                <option value="Fuel & Transit">Fuel &amp; Transit</option>
                <option value="Subscriptions">Subscriptions</option>
                <option value="Wellness & Health">Wellness &amp; Health</option>
                <option value="Freelance & Retainers">Freelance &amp; Retainers</option>
                <option value="Monthly Salary">Monthly Salary</option>
              </select>
            </div>

            {/* Payment Source Selection */}
            {type === 'expense' ? (
              <div>
                <label className="block text-xs font-semibold text-[#1C302A] mb-1.5">Payment Source</label>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setPaymentSourceType('card')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold ${
                      paymentSourceType === 'card' ? 'bg-[#174D42] text-white' : 'bg-[#EDF3E9] text-[#64756D]'
                    }`}
                  >
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentSourceType('account')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold ${
                      paymentSourceType === 'account' ? 'bg-[#174D42] text-white' : 'bg-[#EDF3E9] text-[#64756D]'
                    }`}
                  >
                    Bank / Wallet
                  </button>
                </div>

                {paymentSourceType === 'card' ? (
                  <select
                    value={selectedCardId}
                    onChange={(e) => setSelectedCardId(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs text-[#1C302A]"
                  >
                    {cards.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.cardNumberMasked.slice(-4)})
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    value={selectedAccountId}
                    onChange={(e) => setSelectedAccountId(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs text-[#1C302A]"
                  >
                    {accounts.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} (₹{a.balance.toLocaleString('en-IN')})
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-[#1C302A] mb-1.5">Deposit Into</label>
                <select
                  value={selectedAccountId}
                  onChange={(e) => setSelectedAccountId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs text-[#1C302A]"
                >
                  {accounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} (₹{a.balance.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-[#1C302A] mb-1.5">Optional Notes / Tags</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Dinner with team, client review meeting..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-medium text-[#1C302A] focus:bg-white focus:outline-none focus:border-[#174D42]"
            />
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/app/transactions')}
              className="py-3 px-5 rounded-xl border border-[#DFE8DC] text-xs font-semibold text-[#64756D] hover:bg-[#EDF3E9]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] shadow-md flex items-center justify-center gap-2"
            >
              <span>Record &amp; Sync Ledger</span>
              <ArrowRight className="w-4 h-4 text-[#B8E4A5]" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================================================================
   3. SALARY & INCOME PAGE (/app/income)
========================================================================= */
export function SalaryIncomePage() {
  const { user, setUser, safeDailyBurn, daysUntilPayday, surplusForecast, safeToSpend } = useApp();
  const [isEditingSalary, setIsEditingSalary] = useState(false);
  const [tempSalary, setTempSalary] = useState(`${user.monthlySalary}`);

  const handleSaveSalary = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(tempSalary);
    if (!isNaN(parsed) && parsed > 0) {
      setUser((prev) => ({ ...prev, monthlySalary: parsed }));
      setIsEditingSalary(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Salary &amp; Income Intelligence</h1>
          <p className="text-xs text-[#64756D] mt-1">
            Payday schedule, burn rate telemetry, and cashflow surplus forecasting.
          </p>
        </div>
        <button
          onClick={() => setIsEditingSalary(!isEditingSalary)}
          className="px-3.5 py-2 rounded-xl bg-white border border-[#DFE8DC] text-xs font-semibold text-[#174D42] hover:bg-[#EDF3E9] flex items-center gap-1.5 transition-colors self-start"
        >
          <Edit2 className="w-4 h-4" />
          <span>{isEditingSalary ? 'Close Edit' : 'Edit Base Salary'}</span>
        </button>
      </div>

      {isEditingSalary && (
        <form onSubmit={handleSaveSalary} className="p-5 rounded-2xl bg-white border border-[#DFE8DC] shadow-sm flex items-center gap-3">
          <label className="text-xs font-semibold text-[#1C302A]">Monthly Net Salary (₹):</label>
          <input
            type="number"
            value={tempSalary}
            onChange={(e) => setTempSalary(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-bold font-mono-num"
          />
          <button type="submit" className="py-1.5 px-4 rounded-xl bg-[#174D42] text-white text-xs font-bold">
            Update
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#174D42] text-white flex flex-col justify-between">
          <div>
            <span className="text-xs text-white/70 uppercase tracking-wide">Base Monthly Salary</span>
            <div className="text-3xl font-bold font-mono-num text-[#B8E4A5] mt-1">
              ₹{user.monthlySalary.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-white/80 mt-2">Cycle: 1st Nov – 30th Nov</p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/70">
            Employer: FinTech Enterprise Labs • Credited via NEFT
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs text-[#64756D] uppercase tracking-wide">Salary Runway</span>
            <div className="text-3xl font-bold font-mono-num text-[#103C34] mt-1">{daysUntilPayday} Days</div>
            <p className="text-xs text-[#27865D] font-semibold mt-1">Safe Daily Burn: ₹{safeDailyBurn} / day</p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#DFE8DC] text-xs text-[#64756D]">
            Scheduled payday: Sunday, 30th Nov
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#E6F3DD] border border-[#B8E4A5] text-[#103C34] flex flex-col justify-between">
          <div>
            <span className="text-xs text-[#174D42] uppercase tracking-wide font-bold">Month-End Surplus Forecast</span>
            <div className="text-3xl font-bold font-mono-num text-[#174D42] mt-1">
              ₹{surplusForecast.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-[#64756D] mt-1">Projected free cash ready to sweep into savings</p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#B8E4A5]/40 text-xs font-semibold text-[#174D42] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>AI Auto-sweep eligible</span>
          </div>
        </div>
      </div>

      {/* Burn Velocity Calibration */}
      <div className="bg-white rounded-3xl border border-[#DFE8DC] p-6 shadow-sm space-y-4">
        <h2 className="font-heading font-bold text-base text-[#103C34]">Burn Velocity Calibration</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#EDF3E9] border border-[#DFE8DC]">
            <p className="text-xs text-[#64756D]">Conservative Burn</p>
            <p className="text-lg font-bold text-[#103C34] font-mono-num mt-1">₹350 / day</p>
            <p className="text-[11px] text-[#27865D] mt-1">+₹8,100 surplus on Nov 30</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#E6F3DD] border border-[#B8E4A5]">
            <p className="text-xs font-bold text-[#174D42]">Current Projected Burn</p>
            <p className="text-lg font-bold text-[#174D42] font-mono-num mt-1">₹{safeDailyBurn} / day</p>
            <p className="text-[11px] text-[#174D42] mt-1">+₹{surplusForecast.toLocaleString('en-IN')} surplus on Nov 30</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#EDF3E9] border border-[#DFE8DC]">
            <p className="text-xs text-[#64756D]">Maximum Safe Burn</p>
            <p className="text-lg font-bold text-[#103C34] font-mono-num mt-1">₹580 / day</p>
            <p className="text-[11px] text-[#C58A2B] mt-1">+₹3,900 surplus on Nov 30</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. ACCOUNTS & WALLETS PAGE (/app/accounts)
========================================================================= */
export function AccountsPage() {
  const { accounts, totalAvailableBalance, addAccount } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [type, setType] = useState<Account['type']>('bank');
  const [balance, setBalance] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const bal = parseFloat(balance);
    if (!name || isNaN(bal)) return;

    addAccount({
      name,
      institution: institution || name,
      type,
      accountNumberMasked: `•••• ${Math.floor(1000 + Math.random() * 9000)}`,
      balance: bal,
      color: '#174D42',
      isPrimary: false,
      lastSynced: 'Just now',
    });

    setName('');
    setInstitution('');
    setBalance('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Accounts &amp; Wallets</h1>
          <p className="text-xs text-[#64756D] mt-1">
            Connected bank accounts, digital UPI wallets, and liquid reserves.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-white border border-[#DFE8DC] text-right">
            <span className="text-[10px] text-[#64756D] uppercase">Total Liquid Balance</span>
            <p className="text-xl font-bold text-[#103C34] font-mono-num">₹{totalAvailableBalance.toLocaleString('en-IN')}</p>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2.5 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] flex items-center gap-1.5 shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-[#B8E4A5]" />
            <span>{isAdding ? 'Close' : 'Add Account'}</span>
          </button>
        </div>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-base text-[#103C34]">Connect Bank or Digital Wallet</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1">Account Label</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kotak 811 Savings"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1">Institution</label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="e.g. Kotak Mahindra Bank"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1">Initial Balance (₹)</label>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="10000"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-mono-num font-bold"
              />
            </div>
          </div>
          <button
            type="submit"
            className="py-2 px-4 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34]"
          >
            Save Account
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm flex flex-col justify-between min-h-[180px] hover:border-[#174D42]/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#EDF3E9] text-[#174D42] flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              {acc.isPrimary ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6F3DD] text-[#174D42]">
                  Primary Payroll
                </span>
              ) : (
                <span className="text-[10px] text-[#64756D]">{acc.type.toUpperCase()}</span>
              )}
            </div>

            <div className="my-4">
              <h3 className="font-heading font-bold text-base text-[#103C34]">{acc.name}</h3>
              <p className="text-xs text-[#64756D]">{acc.institution} • {acc.accountNumberMasked}</p>
              <div className="text-2xl font-bold text-[#103C34] font-mono-num mt-2">
                ₹{acc.balance.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="pt-3 border-t border-[#DFE8DC] flex items-center justify-between text-[11px] text-[#64756D]">
              <span>Last synced: {acc.lastSynced || 'Recently'}</span>
              <span className="text-[#27865D] font-medium">Encrypted Live</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   5. CATEGORIES & LABELS PAGE (/app/categories)
========================================================================= */
export function CategoriesPage() {
  const { budgets, categorySpending } = useApp();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Categories &amp; Labels</h1>
        <p className="text-xs text-[#64756D] mt-1">
          Spending taxonomies and cycle-to-date velocity breakdowns.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((b) => {
          const actualSpent = categorySpending[b.category] !== undefined ? categorySpending[b.category] : b.spentAmount;
          const percent = Math.min(100, Math.round((actualSpent / b.allocatedAmount) * 100));
          return (
            <div key={b.id} className="p-5 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: b.color }}
                  >
                    <Tags className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-[#103C34]">{b.category}</h3>
                    <p className="text-[11px] text-[#64756D]">{percent}% consumed</p>
                  </div>
                </div>
                <span className="text-xs font-bold font-mono-num text-[#103C34]">₹{actualSpent}</span>
              </div>

              <div className="space-y-1">
                <div className="w-full h-2 rounded-full bg-[#EDF3E9] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: percent > 85 ? '#D66B63' : b.color,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#64756D]">
                  <span>Spent: ₹{actualSpent.toLocaleString('en-IN')}</span>
                  <span>Limit: ₹{b.allocatedAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================================
   6. BUDGETS MANAGEMENT PAGE (/app/budgets)
========================================================================= */
export function BudgetsPage() {
  const { budgets, addBudget, categorySpending } = useApp();
  const [isCreating, setIsCreating] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory || !newAmount) return;

    addBudget({
      category: newCategory,
      allocatedAmount: parseFloat(newAmount),
      spentAmount: 0,
      period: 'monthly',
      alertThresholdPercent: 80,
      icon: 'pie-chart',
      color: '#174D42',
    });

    setNewCategory('');
    setNewAmount('');
    setIsCreating(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Budget Management</h1>
          <p className="text-xs text-[#64756D] mt-1">
            Proactive monthly spending boundaries with automatic over-burn warnings.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <PlusCircle className="w-4 h-4 text-[#B8E4A5]" />
          <span>{isCreating ? 'Close Form' : 'Create Budget'}</span>
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-base text-[#103C34]">Create New Spending Budget</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1">Category Name</label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="e.g. Travel, Gym, Courses..."
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1">Monthly Limit (₹)</label>
              <input
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                placeholder="5000"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-mono-num font-bold"
              />
            </div>
          </div>
          <button
            type="submit"
            className="py-2.5 px-4 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34]"
          >
            Save Budget
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((b) => {
          const actualSpent = categorySpending[b.category] !== undefined ? categorySpending[b.category] : b.spentAmount;
          const percent = Math.min(100, Math.round((actualSpent / b.allocatedAmount) * 100));
          const remaining = Math.max(0, b.allocatedAmount - actualSpent);

          return (
            <div key={b.id} className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-[#103C34]">{b.category}</h3>
                  <p className="text-xs text-[#64756D]">Monthly allocation</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-[#103C34] font-mono-num">
                    ₹{actualSpent.toLocaleString('en-IN')} / ₹{b.allocatedAmount.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[11px] text-[#27865D] font-medium">₹{remaining.toLocaleString('en-IN')} remaining</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="w-full h-3 rounded-full bg-[#EDF3E9] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: percent >= b.alertThresholdPercent ? '#D66B63' : '#174D42',
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-[#64756D]">
                  <span>{percent}% spent</span>
                  <span>Alert threshold: {b.alertThresholdPercent}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
