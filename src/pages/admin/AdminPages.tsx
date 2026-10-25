import React, { useState } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useApp } from '../../context/AppContext';
import {
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
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Search,
  PlusCircle,
  Eye,
  RefreshCw,
  Server,
  Zap,
} from 'lucide-react';

/* =========================================================================
   1. ADMIN DASHBOARD (/admin/dashboard)
========================================================================= */
export function AdminDashboardPage() {
  const { adminUsers, adminMerchants, cards } = useApp();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Admin Operations Center</h1>
          <p className="text-xs text-[#64756D] mt-1">
            Global ledger telemetry, active tenant tracking, and system health metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#27865D]" />
          <span className="text-xs font-semibold text-[#174D42]">GCP Services Online</span>
        </div>
      </div>

      {/* KPI Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/admin/users" className="p-5 rounded-2xl bg-white border border-[#DFE8DC] shadow-sm hover:border-[#174D42] transition-colors">
          <span className="text-xs text-[#64756D] uppercase font-bold">Total Platform Users</span>
          <div className="text-2xl font-bold text-[#103C34] font-mono-num mt-1">14,831</div>
          <p className="text-[11px] text-[#27865D] mt-1">+128 registered this week</p>
        </Link>

        <Link to="/admin/merchants" className="p-5 rounded-2xl bg-white border border-[#DFE8DC] shadow-sm hover:border-[#174D42] transition-colors">
          <span className="text-xs text-[#64756D] uppercase font-bold">Partner Merchants</span>
          <div className="text-2xl font-bold text-[#103C34] font-mono-num mt-1">{adminMerchants.length}</div>
          <p className="text-[11px] text-[#27865D] mt-1">12 live discount campaigns</p>
        </Link>

        <Link to="/admin/cards" className="p-5 rounded-2xl bg-white border border-[#DFE8DC] shadow-sm hover:border-[#174D42] transition-colors">
          <span className="text-xs text-[#64756D] uppercase font-bold">Catalogued Cards</span>
          <div className="text-2xl font-bold text-[#103C34] font-mono-num mt-1">48 issuers</div>
          <p className="text-[11px] text-[#64756D] mt-1">HDFC, ICICI, Axis, SBI</p>
        </Link>

        <Link to="/admin/security" className="p-5 rounded-2xl bg-white border border-[#DFE8DC] shadow-sm hover:border-[#174D42] transition-colors">
          <span className="text-xs text-[#64756D] uppercase font-bold">Audit Events (24h)</span>
          <div className="text-2xl font-bold text-[#103C34] font-mono-num mt-1">1,940</div>
          <p className="text-[11px] text-[#27865D] mt-1">0 security violations</p>
        </Link>
      </div>

      {/* Recent Users Table Preview */}
      <div className="bg-white rounded-3xl border border-[#DFE8DC] p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-base text-[#103C34]">Active Platform Tenants</h2>
          <Link to="/admin/users" className="text-xs font-bold text-[#174D42] hover:underline flex items-center gap-1">
            <span>Manage All Users</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-[#DFE8DC] text-xs">
          {adminUsers.slice(0, 4).map((u) => (
            <div key={u.id} className="py-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-[#1C302A]">{u.name}</p>
                <p className="text-[#64756D] text-[11px]">{u.email} • Joined {u.joinedDate}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono-num font-semibold text-[#103C34]">
                  ₹{u.totalBalanceTracked.toLocaleString('en-IN')}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    u.status === 'Active' ? 'bg-[#E6F3DD] text-[#27865D]' : 'bg-[#EDF3E9] text-[#BA1A1A]'
                  }`}
                >
                  {u.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. USER MANAGEMENT (/admin/users)
========================================================================= */
export function AdminUsersPage() {
  const { adminUsers, updateAdminUserStatus } = useApp();
  const [search, setSearch] = useState('');

  const filtered = adminUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">User Management</h1>
          <p className="text-xs text-[#64756D] mt-1">
            Provision roles, inspect multi-wallet sync status, and enforce account governance.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#64756D] absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name or email..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#DFE8DC] text-xs"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#DFE8DC] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#EDF3E9] border-b border-[#DFE8DC] text-[#64756D] uppercase text-[10px] font-semibold">
              <tr>
                <th className="p-4">User Name</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Ledger Balance</th>
                <th className="p-4">Last Activity</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DFE8DC]">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-[#F6F8F1]">
                  <td className="p-4">
                    <p className="font-bold text-[#1C302A]">{user.name}</p>
                    <p className="text-[11px] text-[#64756D]">{user.email}</p>
                  </td>
                  <td className="p-4 font-semibold text-[#103C34]">{user.role}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        user.status === 'Active'
                          ? 'bg-[#E6F3DD] text-[#27865D]'
                          : 'bg-[#ffdad6] text-[#ba1a1a]'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono-num font-semibold">
                    ₹{user.totalBalanceTracked.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-[#64756D]">{user.lastLogin}</td>
                  <td className="p-4 text-right">
                    {user.status === 'Active' ? (
                      <button
                        onClick={() => updateAdminUserStatus(user.id, 'Suspended')}
                        className="text-[11px] font-bold text-[#ba1a1a] hover:underline"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => updateAdminUserStatus(user.id, 'Active')}
                        className="text-[11px] font-bold text-[#27865D] hover:underline"
                      >
                        Reactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. ROLES & PERMISSIONS (/admin/roles)
========================================================================= */
export function AdminRolesPage() {
  const { adminRoles } = useApp();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Roles &amp; Permissions</h1>
        <p className="text-xs text-[#64756D] mt-1">
          Role-based access control matrix (RBAC) and security boundary policies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {adminRoles.map((role) => (
          <div key={role.id} className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-[#103C34]">{role.name}</h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EDF3E9] text-[#174D42]">
                {role.usersCount} users
              </span>
            </div>
            <p className="text-xs text-[#64756D]">{role.description}</p>
            <div className="space-y-1.5 pt-2 border-t border-[#DFE8DC]">
              <span className="text-[11px] font-bold uppercase text-[#64756D]">Entitlements:</span>
              <div className="flex flex-wrap gap-1.5">
                {role.permissions.map((p, i) => (
                  <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#EDF3E9] text-[#1C302A]">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   4. GLOBAL CATEGORIES (/admin/categories)
========================================================================= */
export function AdminCategoriesPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Global Categories Taxonomy</h1>
        <p className="text-xs text-[#64756D] mt-1">
          System-wide transaction category ontology, MCC mappings, and auto-tagging heuristics.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#DFE8DC] p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Dining & Food Delivery', mcc: '5812, 5814', count: '14,290 tx' },
            { name: 'Groceries & Quick Commerce', mcc: '5411', count: '9,810 tx' },
            { name: 'Fuel & Transportation', mcc: '5541, 4121', count: '6,450 tx' },
            { name: 'Digital Subscriptions', mcc: '4899, 5815', count: '4,120 tx' },
            { name: 'Discretionary Lifestyle', mcc: '5651, 5691', count: '5,300 tx' },
            { name: 'Health & Fitness', mcc: '7997', count: '2,110 tx' },
          ].map((cat, i) => (
            <div key={i} className="p-4 rounded-2xl bg-[#EDF3E9] border border-[#DFE8DC] space-y-1">
              <h4 className="font-bold text-xs text-[#103C34]">{cat.name}</h4>
              <p className="text-[11px] text-[#64756D]">MCC: {cat.mcc}</p>
              <p className="text-[10px] text-[#27865D] font-medium">{cat.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. BANK & CARD CATALOG (/admin/cards)
========================================================================= */
export function AdminCardsCatalogPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Bank &amp; Credit Card Catalog</h1>
        <p className="text-xs text-[#64756D] mt-1">
          Configure issuer BIN ranges, reward point valuations, and cashback formula tiers.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#DFE8DC] p-6 shadow-sm space-y-4">
        <div className="divide-y divide-[#DFE8DC]">
          {[
            { bank: 'HDFC Bank', card: 'Regalia Gold', rewardVal: '₹0.35 per point', multiplier: '4X on dining & luxury' },
            { bank: 'ICICI Bank', card: 'Amazon Pay', rewardVal: '₹1.00 per ₹ cash', multiplier: '5% unlimited' },
            { bank: 'Axis Bank', card: 'Magnus Metal', rewardVal: '₹0.40 per EDGE mile', multiplier: '25k bonus miles' },
            { bank: 'SBI Card', card: 'Cashback Card', rewardVal: '₹1.00 statement credit', multiplier: '5% online shopping' },
          ].map((item, idx) => (
            <div key={idx} className="py-3.5 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#103C34]">{item.bank} • {item.card}</p>
                <p className="text-[#64756D] text-[11px]">{item.multiplier}</p>
              </div>
              <span className="font-mono-num font-semibold text-[#174D42]">{item.rewardVal}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   6. MERCHANT MANAGEMENT (/admin/merchants)
========================================================================= */
export function AdminMerchantsPage() {
  const { adminMerchants } = useApp();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Merchant Partner Management</h1>
        <p className="text-xs text-[#64756D] mt-1">
          Affiliate relationships, API webhook feeds, and commission agreements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminMerchants.map((m) => (
          <div key={m.id} className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#103C34]">{m.name}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6F3DD] text-[#174D42]">
                {m.partnershipTier}
              </span>
            </div>
            <p className="text-xs text-[#64756D]">{m.category}</p>
            <div className="pt-3 border-t border-[#DFE8DC] flex items-center justify-between text-[11px]">
              <span className="text-[#27865D] font-semibold">{m.avgDiscount}</span>
              <span className="text-[#64756D]">{m.activeCampaigns} campaigns</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   7. OFFERS & CAMPAIGNS (/admin/offers)
========================================================================= */
export function AdminOffersPage() {
  const { offers } = useApp();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Campaign &amp; Offers Management</h1>
        <p className="text-xs text-[#64756D] mt-1">
          Publish and expire promotional codes for cardholder discount algorithms.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#DFE8DC] p-6 shadow-sm space-y-4">
        <div className="divide-y divide-[#DFE8DC]">
          {offers.map((o) => (
            <div key={o.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#103C34]">{o.merchant} • {o.title}</p>
                <p className="text-[#64756D] text-[11px]">Card: {o.applicableCard} • Promo: {o.code}</p>
              </div>
              <span className="font-semibold text-[#27865D]">{o.discount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   8. EXTERNAL INTEGRATIONS (/admin/integrations)
========================================================================= */
export function AdminIntegrationsPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">External Bank &amp; Aggregator Integrations</h1>
        <p className="text-xs text-[#64756D] mt-1">
          Open Banking gateways, Account Aggregator (AA) handles, and webhook bridges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Reserve Bank AA Gateway', status: 'Connected', uptime: '99.98%' },
          { name: 'NPCI UPI Instant Auto-Debit', status: 'Connected', uptime: '99.95%' },
          { name: 'Google Cloud BigQuery Pipeline', status: 'Connected', uptime: '100%' },
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-bold text-[#27865D] bg-[#E6F3DD] px-2 py-0.5 rounded-full">
              {item.status}
            </span>
            <h3 className="font-bold text-sm text-[#103C34] mt-2">{item.name}</h3>
            <p className="text-xs text-[#64756D]">Telemetry Uptime: {item.uptime}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   9. NOTIFICATIONS BROADCASTS (/admin/notifications)
========================================================================= */
export function AdminNotificationsPage() {
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Push Notification Broadcasts</h1>
        <p className="text-xs text-[#64756D] mt-1">
          Broadcast system announcements, cycle reminders, and feature alerts.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm space-y-4">
        {sent && (
          <div className="p-3.5 rounded-xl bg-[#E6F3DD] text-xs font-bold text-[#174D42]">
            Broadcast dispatched to 14,831 active device tokens!
          </div>
        )}
        <div>
          <label className="block text-xs font-semibold text-[#1C302A] mb-1">Broadcast Title</label>
          <input
            type="text"
            value={broadcastTitle}
            onChange={(e) => setBroadcastTitle(e.target.value)}
            placeholder="e.g. Nov 30 Payday Cashflow Sweep Now Live"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs"
          />
        </div>
        <button
          onClick={() => {
            setSent(true);
            setTimeout(() => setSent(false), 3000);
          }}
          className="py-2.5 px-4 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34]"
        >
          Send System Broadcast
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   10. AI CONFIGURATION (/admin/ai)
========================================================================= */
export function AdminAIPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">AI Engine &amp; Model Configuration</h1>
        <p className="text-xs text-[#64756D] mt-1">
          Control underlying model routing, latency thresholds, and financial reasoning prompts.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm space-y-4 text-xs">
        <div className="p-4 rounded-2xl bg-[#E6F3DD] border border-[#B8E4A5] text-[#174D42]">
          <p className="font-bold">Active Engine: Gemini 2.5 / 3.0 Flash Financial Reasoning Matrix</p>
          <p className="text-[11px] text-[#64756D] mt-1">Average inference time: 140ms • Grounded in ledger schemas</p>
        </div>

        <div className="space-y-2">
          <label className="font-semibold text-[#1C302A]">Surplus Allocation Sensitivity</label>
          <input type="range" className="w-full accent-[#174D42]" defaultValue="75" />
          <div className="flex justify-between text-[11px] text-[#64756D]">
            <span>Conservative (High cash buffer)</span>
            <span>Aggressive (Direct to high-yield lockbox)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   11. PLATFORM ANALYTICS (/admin/analytics)
========================================================================= */
export function AdminAnalyticsPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Platform-Wide Analytics</h1>
        <p className="text-xs text-[#64756D] mt-1">
          Aggregate Gross Merchandise Value (GMV), card volume, and user retention.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm">
          <span className="text-xs text-[#64756D] uppercase">Monthly Tracked Volume</span>
          <div className="text-3xl font-bold text-[#103C34] font-mono-num mt-1">₹63.4 Cr</div>
          <p className="text-xs text-[#27865D] mt-1">+18.4% month over month</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm">
          <span className="text-xs text-[#64756D] uppercase">Average Monthly Savings Rate</span>
          <div className="text-3xl font-bold text-[#27865D] font-mono-num mt-1">32.8%</div>
          <p className="text-xs text-[#64756D] mt-1">Benchmark: 20%</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm">
          <span className="text-xs text-[#64756D] uppercase">Card Optimization Savings</span>
          <div className="text-3xl font-bold text-[#174D42] font-mono-num mt-1">₹4.2 Cr</div>
          <p className="text-xs text-[#64756D] mt-1">Delivered via advisor vouchers</p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   12. SECURITY & AUDIT LOGS (/admin/security)
========================================================================= */
export function AdminSecurityPage() {
  const logs = [
    { event: 'User Auth: rohan.sharma@spendwise.app', ip: '14.139.241.10', time: 'Today, 23:45', status: 'Success' },
    { event: 'AES-256 Key Rotation Cycle', ip: 'Cloud KMS Vault', time: 'Today, 18:00', status: 'Verified' },
    { event: 'Open Banking Consent Refresh', ip: 'HDFC Node #4', time: 'Today, 14:20', status: 'Approved' },
    { event: 'RBAC Policy Modification: Auditor Role', ip: '115.240.18.9', time: 'Yesterday', status: 'Logged' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Security &amp; Audit Logs</h1>
        <p className="text-xs text-[#64756D] mt-1">
          Immutable cryptographic audit log compliance conforming to ISO 27001 &amp; SOC2.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#DFE8DC] p-6 shadow-sm">
        <div className="divide-y divide-[#DFE8DC] text-xs">
          {logs.map((l, i) => (
            <div key={i} className="py-3.5 flex items-center justify-between">
              <div>
                <p className="font-bold text-[#1C302A]">{l.event}</p>
                <p className="text-[#64756D] text-[11px]">{l.ip} • {l.time}</p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E6F3DD] text-[#27865D]">
                {l.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   13. APPLICATION SETTINGS (/admin/settings)
========================================================================= */
export function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Application Governance Settings</h1>
        <p className="text-xs text-[#64756D] mt-1">
          Global database constraints, caching rules, and platform maintenance toggles.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-[#E6F3DD] border border-[#B8E4A5] text-xs font-bold text-[#174D42] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#27865D]" />
          <span>Global platform configuration updated across all nodes!</span>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-[#DFE8DC] p-6 shadow-sm space-y-5 text-xs">
        <div className="flex items-center justify-between pb-4 border-b border-[#DFE8DC]">
          <div>
            <p className="font-bold text-sm text-[#103C34]">Maintenance Mode</p>
            <p className="text-[#64756D]">Suspend write operations during database migrations</p>
          </div>
          <input type="checkbox" className="accent-[#174D42] w-4 h-4" />
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-[#DFE8DC]">
          <div>
            <p className="font-bold text-sm text-[#103C34]">Strict Open-Banking Audit</p>
            <p className="text-[#64756D]">Require biometric step-up authentication on transfers &gt; ₹10,000</p>
          </div>
          <input type="checkbox" defaultChecked className="accent-[#174D42] w-4 h-4" />
        </div>

        <button
          onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
          }}
          className="py-2.5 px-6 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34]"
        >
          Save Global Settings
        </button>
      </div>
    </div>
  );
}
