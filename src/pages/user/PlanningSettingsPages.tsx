import React, { useState } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useApp } from '../../context/AppContext';
import {
  Calendar as CalendarIcon,
  Repeat,
  Bell,
  Heart,
  Settings as SettingsIcon,
  CheckCircle2,
  PlusCircle,
  Trash2,
  ArrowRight,
  Shield,
  CreditCard,
  Sparkles,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';

/* =========================================================================
   1. FINANCIAL CALENDAR PAGE (/app/calendar)
========================================================================= */
export function CalendarPage() {
  const events = [
    { date: 'Nov 22', title: 'HDFC Regalia Auto-Debit Trigger', amount: '₹12,500', type: 'bill' },
    { date: 'Nov 24', title: 'HDFC Regalia Payment Due Date', amount: '₹12,500', type: 'due' },
    { date: 'Nov 28', title: 'Date Night & Anniversary Celebration', amount: '₹3,000', type: 'moment' },
    { date: 'Nov 28', title: 'Google One 2TB Cloud Renewal', amount: '₹650', type: 'subscription' },
    { date: 'Nov 30', title: 'Monthly Salary Credit (Payday)', amount: '+₹45,000', type: 'income' },
    { date: 'Dec 02', title: 'ICICI Amazon Pay Due Date', amount: '₹4,200', type: 'due' },
    { date: 'Dec 14', title: "Mom's 55th Birthday Celebration", amount: '₹6,000', type: 'moment' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Financial Calendar</h1>
        <p className="text-xs text-[#64756D] mt-1">
          Chronological timeline of upcoming dues, subscription cycles, salary credits, and milestones.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#DFE8DC] p-6 shadow-sm">
        <h2 className="font-heading font-bold text-base text-[#103C34] mb-4">Upcoming Schedule</h2>
        <div className="divide-y divide-[#DFE8DC]">
          {events.map((ev, i) => (
            <div key={i} className="py-4 flex items-center justify-between hover:bg-[#F6F8F1] px-2 rounded-xl transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-16 h-12 rounded-xl bg-[#EDF3E9] text-[#174D42] flex flex-col items-center justify-center font-bold text-xs">
                  <span>{ev.date}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1C302A]">{ev.title}</p>
                  <p className="text-[11px] text-[#64756D] capitalize">{ev.type}</p>
                </div>
              </div>
              <span
                className={`text-sm font-bold font-mono-num ${
                  ev.type === 'income' ? 'text-[#27865D]' : 'text-[#103C34]'
                }`}
              >
                {ev.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. SUBSCRIPTIONS & RECURRING BILLS PAGE (/app/subscriptions)
========================================================================= */
export function SubscriptionsPage() {
  const { subscriptions, toggleSubscriptionStatus } = useApp();

  const activeSubs = subscriptions.filter((s) => s.isActive);
  const totalMonthlyCost = activeSubs.reduce(
    (sum, s) => sum + (s.frequency === 'yearly' ? Math.round(s.amount / 12) : s.amount),
    0
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Subscriptions &amp; Recurring Bills</h1>
          <p className="text-xs text-[#64756D] mt-1">
            Automated recurring charges and digital entertainment memberships.
          </p>
        </div>
        <div className="p-3 rounded-2xl bg-white border border-[#DFE8DC] text-right">
          <span className="text-[10px] text-[#64756D] uppercase">Monthly Recurring Burn</span>
          <p className="text-xl font-bold text-[#103C34] font-mono-num">₹{totalMonthlyCost.toLocaleString('en-IN')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#174D42]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#64756D]">{sub.category}</span>
                <button
                  onClick={() => toggleSubscriptionStatus(sub.id)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                    sub.isActive ? 'bg-[#E6F3DD] text-[#27865D]' : 'bg-[#EDF3E9] text-[#64756D]'
                  }`}
                >
                  {sub.isActive ? 'Active' : 'Paused'}
                </button>
              </div>

              <div className="mt-4">
                <h3 className="font-heading font-bold text-base text-[#103C34]">{sub.name}</h3>
                <div className="text-2xl font-bold text-[#103C34] font-mono-num mt-1">
                  ₹{sub.amount.toLocaleString('en-IN')}{' '}
                  <span className="text-xs font-normal text-[#64756D]">/{sub.frequency}</span>
                </div>
              </div>

              <div className="mt-3 text-xs text-[#64756D] space-y-1">
                <p>Payment: {sub.paymentMethod}</p>
                <p>Next billing: {sub.nextBillingDate}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#DFE8DC] flex items-center justify-between text-xs text-[#174D42] font-semibold">
              <span>Card Autopay Synced</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   3. NOTIFICATIONS CENTER PAGE (/app/notifications)
========================================================================= */
export function NotificationsPage() {
  const { notifications, markNotificationAsRead, markAllNotificationsRead } = useApp();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Notification Center</h1>
          <p className="text-xs text-[#64756D] mt-1">
            System alerts, card payment reminders, and AI optimization signals.
          </p>
        </div>
        <button
          onClick={markAllNotificationsRead}
          className="text-xs font-bold text-[#174D42] hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-[#DFE8DC] divide-y divide-[#DFE8DC] overflow-hidden shadow-sm">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markNotificationAsRead(n.id)}
            className={`p-5 flex items-start gap-4 transition-colors cursor-pointer ${
              n.isRead ? 'bg-white hover:bg-[#F6F8F1]' : 'bg-[#E6F3DD]/40 hover:bg-[#E6F3DD]/70'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                n.type === 'tip'
                  ? 'bg-[#174D42] text-[#B8E4A5]'
                  : n.type === 'alert'
                  ? 'bg-[#F3D9A4] text-[#3B2C06]'
                  : 'bg-[#EDF3E9] text-[#174D42]'
              }`}
            >
              <Bell className="w-5 h-5" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#103C34]">{n.title}</h3>
                <span className="text-[11px] text-[#64756D]">{n.timestamp}</span>
              </div>
              <p className="text-xs text-[#64756D] mt-1 leading-relaxed">{n.message}</p>
              {n.actionUrl && (
                <Link
                  to={n.actionUrl}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#174D42] hover:underline mt-2"
                >
                  <span>Review action</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   4. WISHLIST & PURCHASE PLANNER PAGE (/app/wishlist)
========================================================================= */
export function WishlistPage() {
  const { wishlist, addWishlistItem, contributeToWishlist } = useApp();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;

    addWishlistItem({
      title,
      price: parseFloat(price),
      priority: 'high',
      targetPurchaseMonth: 'Dec 2026',
      affordabilityStatus: 'save-more',
      notes: 'Added from planner',
    });

    setTitle('');
    setPrice('');
    setIsCreating(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Wishlist &amp; Purchase Planner</h1>
          <p className="text-xs text-[#64756D] mt-1">
            Intentional buying without guilt or credit debt.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] flex items-center gap-1.5 shadow-sm"
        >
          <PlusCircle className="w-4 h-4 text-[#B8E4A5]" />
          <span>Add Wishlist Item</span>
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-base text-[#103C34]">Add Planned Purchase</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1">Item Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Ergonomic Keyboard, Kindle..."
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1">Price (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="15000"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-mono-num font-bold"
              />
            </div>
          </div>
          <button
            type="submit"
            className="py-2.5 px-4 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34]"
          >
            Add to Wishlist
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wishlist.map((item) => {
          const percent = Math.min(100, Math.round((item.savedTowardsItem / item.price) * 100));

          return (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#174D42]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#174D42] bg-[#E6F3DD] px-2 py-0.5 rounded-full">
                    {item.priority} priority
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      item.affordabilityStatus === 'ready' ? 'text-[#27865D]' : 'text-[#64756D]'
                    }`}
                  >
                    {item.affordabilityStatus === 'ready' ? 'Ready to Buy!' : `${percent}% Funded`}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="font-heading font-bold text-base text-[#103C34]">{item.title}</h3>
                  <div className="text-2xl font-bold font-mono-num text-[#103C34] mt-1">
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  <div className="w-full h-2 rounded-full bg-[#EDF3E9] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#174D42]"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#64756D]">
                    <span>Saved: ₹{item.savedTowardsItem.toLocaleString('en-IN')}</span>
                    <span>Target: {item.targetPurchaseMonth}</span>
                  </div>
                </div>

                {item.notes && <p className="text-xs text-[#64756D] mt-2 italic">{item.notes}</p>}
              </div>

              <div className="pt-3 border-t border-[#DFE8DC] flex items-center justify-between">
                <button
                  onClick={() => contributeToWishlist(item.id, 1000)}
                  className="text-xs font-bold text-[#174D42] hover:underline"
                >
                  + Stash ₹1,000
                </button>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#64756D] hover:text-[#174D42] flex items-center gap-1"
                  >
                    <span>Store Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================================
   5. PROFILE & SETTINGS PAGE (/app/settings)
========================================================================= */
export function SettingsPage() {
  const { user, setUser, workspaceMode, startCleanWorkspace, loadDemoWorkspace, resetDemoData } = useApp();
  const [name, setName] = useState(user.name);
  const [salary, setSalary] = useState(`${user.monthlySalary}`);
  const [payday, setPayday] = useState(`${user.paydayDate || 30}`);
  const [saved, setSaved] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [cleanConfirm, setCleanConfirm] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name,
      monthlySalary: parseFloat(salary),
      paydayDate: parseInt(payday),
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleStartClean = () => {
    startCleanWorkspace({
      name: name.trim() || 'Personal User',
      monthlySalary: parseFloat(salary) || 50000,
      paydayDate: parseInt(payday) || 30,
    });
    setCleanConfirm(true);
    setTimeout(() => setCleanConfirm(false), 2500);
  };

  const handleReset = () => {
    loadDemoWorkspace();
    setResetConfirm(true);
    setTimeout(() => setResetConfirm(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Profile &amp; Application Settings</h1>
        <p className="text-xs text-[#64756D] mt-1">
          Manage currency, payroll timing, biometrics, and security preferences.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-[#E6F3DD] border border-[#B8E4A5] text-xs font-bold text-[#174D42] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#27865D]" />
          <span>Profile configuration saved successfully!</span>
        </div>
      )}

      {cleanConfirm && (
        <div className="p-4 rounded-2xl bg-[#E6F3DD] border border-[#B8E4A5] text-xs font-bold text-[#174D42] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#27865D]" />
          <span>Clean personal workspace created with 0 transactions! Ready for your expenses.</span>
        </div>
      )}

      {resetConfirm && (
        <div className="p-4 rounded-2xl bg-[#E6F3DD] border border-[#B8E4A5] text-xs font-bold text-[#174D42] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#27865D]" />
          <span>Workspace switched to sample demo data (Rohan Sharma)!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-[#DFE8DC] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-[#DFE8DC]">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#174D42]"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-heading font-bold text-lg text-[#103C34]">{user.name}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6F3DD] text-[#174D42] border border-[#B8E4A5]/60">
                {workspaceMode === 'personal' ? 'PERSONAL CLEAN LEDGER' : 'DEMO MODE'}
              </span>
            </div>
            <p className="text-xs text-[#64756D]">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1C302A] mb-1">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C302A] mb-1">Monthly Salary Baseline (₹)</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-mono-num font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C302A] mb-1">Reporting Currency</label>
            <select className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs">
              <option value="INR">₹ INR (Indian Rupee)</option>
              <option value="USD">$ USD (US Dollar)</option>
              <option value="EUR">€ EUR (Euro)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C302A] mb-1">Payday Day of Month</label>
            <select
              value={payday}
              onChange={(e) => setPayday(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs"
            >
              <option value="30">30th (Last day of month)</option>
              <option value="1">1st of Month</option>
              <option value="5">5th of Month</option>
              <option value="25">25th of Month</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-[#DFE8DC] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleStartClean}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E6F3DD] text-xs font-bold text-[#174D42] border border-[#B8E4A5]/60 hover:bg-[#B8E4A5]/40 transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-[#27865D]" />
              <span>Start Clean (0 Transactions)</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EDF3E9] text-xs font-semibold text-[#64756D] hover:bg-[#E6F3DD] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Load Sample Demo Data</span>
            </button>
          </div>

          <button
            type="submit"
            className="py-2.5 px-6 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] shadow-sm"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
