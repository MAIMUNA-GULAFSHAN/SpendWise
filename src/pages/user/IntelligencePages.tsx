import React, { useState } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Gift,
  Compass,
  Bot,
  Heart,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Check,
  Send,
  Sparkles,
  ShieldCheck,
  BarChart2,
  CreditCard,
  Percent,
} from 'lucide-react';

/* =========================================================================
   1. ANALYTICS & COMPARISONS PAGE (/app/analytics)
========================================================================= */
export function AnalyticsPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Financial Analytics &amp; Trends</h1>
        <p className="text-xs text-[#64756D] mt-1">
          Historical velocity, month-over-month shifts, and net worth accumulation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm">
          <span className="text-xs text-[#64756D] uppercase">Savings Ratio</span>
          <div className="text-3xl font-bold text-[#27865D] font-mono-num mt-1">40.7%</div>
          <p className="text-xs text-[#64756D] mt-1">₹18,350 retained from ₹45,000 earnings</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm">
          <span className="text-xs text-[#64756D] uppercase">Dining &amp; Delivery Shift</span>
          <div className="text-3xl font-bold text-[#174D42] font-mono-num mt-1">-18%</div>
          <p className="text-xs text-[#27865D] mt-1">Saved ₹850 vs last month's velocity</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm">
          <span className="text-xs text-[#64756D] uppercase">Fixed vs Flexible Ratio</span>
          <div className="text-3xl font-bold text-[#103C34] font-mono-num mt-1">54 / 46</div>
          <p className="text-xs text-[#64756D] mt-1">Optimal rule-of-thumb compliance</p>
        </div>
      </div>

      {/* Visual Velocity Chart Strip */}
      <div className="bg-white rounded-3xl border border-[#DFE8DC] p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-base text-[#103C34]">Monthly Spending Velocity (Last 6 Months)</h2>
          <span className="text-xs font-semibold text-[#174D42]">In Thousands (₹)</span>
        </div>

        <div className="h-48 flex items-end justify-between gap-4 pt-6 px-2 border-b border-[#DFE8DC]">
          {[
            { month: 'Jun', spent: 28, saved: 17 },
            { month: 'Jul', spent: 31, saved: 14 },
            { month: 'Aug', spent: 25, saved: 20 },
            { month: 'Sep', spent: 29, saved: 16 },
            { month: 'Oct', spent: 27, saved: 18 },
            { month: 'Nov (Now)', spent: 26.6, saved: 18.3, isCurrent: true },
          ].map((bar) => (
            <div key={bar.month} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full max-w-[48px] flex flex-col justify-end gap-1 h-36">
                <div
                  className={`w-full rounded-t-lg transition-all ${bar.isCurrent ? 'bg-[#174D42]' : 'bg-[#9CD1C2]'}`}
                  style={{ height: `${(bar.spent / 35) * 100}%` }}
                  title={`Spent ₹${bar.spent}k`}
                />
              </div>
              <span className={`text-[11px] ${bar.isCurrent ? 'font-bold text-[#174D42]' : 'text-[#64756D]'}`}>
                {bar.month}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. OFFERS & REWARDS PAGE (/app/offers)
========================================================================= */
export function OffersPage() {
  const { offers } = useApp();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Offers &amp; Card Perks</h1>
        <p className="text-xs text-[#64756D] mt-1">
          Exclusive discounts matched directly to your active credit cards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm flex flex-col justify-between min-h-[220px] hover:border-[#174D42]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-[#174D42]">{offer.merchant}</span>
                <span className="text-[10px] uppercase font-bold text-[#27865D] bg-[#E6F3DD] px-2 py-0.5 rounded-full">
                  {offer.category}
                </span>
              </div>
              <h3 className="font-heading font-bold text-base text-[#103C34]">{offer.title}</h3>
              <p className="text-xs text-[#64756D] mt-1">Card: {offer.applicableCard}</p>
              <p className="text-xs font-semibold text-[#174D42] mt-2 font-mono-num">{offer.discount}</p>
            </div>

            <div className="pt-4 border-t border-[#DFE8DC] flex items-center justify-between">
              <span className="text-[11px] text-[#64756D]">Valid till {offer.validUntil}</span>
              <Link
                to={`/app/offers/${offer.id}`}
                className="text-xs font-bold text-[#174D42] hover:underline flex items-center gap-1"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   3. OFFER DETAILS PAGE (/app/offers/:id)
========================================================================= */
export function OfferDetailsPage() {
  const { params } = useRouter();
  const { offers } = useApp();
  const [copied, setCopied] = useState(false);

  const offer = offers.find((o) => o.id === params.id) || offers[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <Link to="/app/offers" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174D42] hover:underline mb-2">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Offers</span>
        </Link>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">{offer.merchant}</h1>
        <p className="text-xs text-[#64756D] mt-1">{offer.title}</p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm space-y-5">
        <div className="p-4 rounded-2xl bg-[#E6F3DD] border border-[#B8E4A5] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#174D42]">Voucher Code</span>
            <p className="text-lg font-bold font-mono text-[#103C34]">{offer.code}</p>
          </div>
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl bg-[#174D42] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#103C34]"
          >
            {copied ? <Check className="w-4 h-4 text-[#B8E4A5]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        <div className="space-y-2 text-xs text-[#1C302A]">
          <h3 className="font-bold text-sm text-[#103C34]">Terms &amp; Redemption Guidelines</h3>
          <p className="text-[#64756D] leading-relaxed">{offer.terms}</p>
          <div className="pt-2 flex items-center gap-4 text-[#64756D]">
            <span>Minimum Spend: ₹{offer.minSpend}</span>
            <span>Applicable Card: {offer.applicableCard}</span>
            <span>Valid Until: {offer.validUntil}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. PAYMENT METHOD ADVISOR PAGE (/app/payment-advisor)
========================================================================= */
export function PaymentAdvisorPage() {
  const [merchant, setMerchant] = useState('Swiggy');
  const [amount, setAmount] = useState('1800');

  // Interactive recommendation engine
  const getRecommendation = () => {
    const amt = parseFloat(amount) || 0;
    if (merchant.toLowerCase().includes('swiggy') || merchant.toLowerCase().includes('dine') || merchant.toLowerCase().includes('restaurant')) {
      return {
        card: 'HDFC Regalia Gold (••8842)',
        benefit: '20% Instant Discount via Dineout + 4X Reward Points',
        savingsEst: Math.min(360, amt * 0.2),
        reason: 'Optimal for dining & gourmet spends with verified coupon HDFCGOLD20.',
      };
    }
    if (merchant.toLowerCase().includes('amazon') || merchant.toLowerCase().includes('shopping')) {
      return {
        card: 'ICICI Amazon Pay (••4129)',
        benefit: '5% Unlimited Cashback (Auto-statement credit)',
        savingsEst: amt * 0.05,
        reason: 'Direct 5% statement credit without promo code friction.',
      };
    }
    if (merchant.toLowerCase().includes('flight') || merchant.toLowerCase().includes('travel') || merchant.toLowerCase().includes('hotel')) {
      return {
        card: 'Axis Magnus (••9011)',
        benefit: 'Flat ₹1,250 Off + 25,000 Bonus EDGE Miles',
        savingsEst: 1250,
        reason: 'Maximum air-mile conversion rate on domestic & international airlines.',
      };
    }
    return {
      card: 'HDFC Regalia Gold (••8842)',
      benefit: '4X Points on Luxury retail & 1% Fuel surcharge waiver',
      savingsEst: amt * 0.03,
      reason: 'General lifestyle card with strong baseline reward yield.',
    };
  };

  const rec = getRecommendation();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Smart Payment Advisor</h1>
        <p className="text-xs text-[#64756D] mt-1">
          Tell SpendWise what you're buying, and get the highest cashback / reward yield recommendation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-base text-[#103C34]">Purchase Details</h2>
          <div>
            <label className="block text-xs font-semibold text-[#1C302A] mb-1">Merchant / Platform</label>
            <input
              type="text"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              placeholder="e.g. Swiggy, Amazon, Shell, MakeMyTrip..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1C302A] mb-1">Estimated Purchase Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1500"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-mono-num font-bold"
            />
          </div>
        </div>

        {/* Output card */}
        <div className="p-6 rounded-3xl bg-[#174D42] text-white flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wide text-[#B8E4A5] font-bold">Recommended Card</span>
              <span className="text-xs font-bold bg-[#B8E4A5] text-[#103C34] px-2 py-0.5 rounded-full">
                Optimal Choice
              </span>
            </div>
            <h3 className="font-heading font-bold text-xl text-white">{rec.card}</h3>
            <p className="text-xs text-[#F3D9A4] font-semibold mt-2">{rec.benefit}</p>
            <p className="text-xs text-white/80 mt-2 leading-relaxed">{rec.reason}</p>
          </div>

          <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between">
            <span className="text-xs text-white/70">Estimated Net Savings:</span>
            <span className="text-lg font-bold font-mono-num text-[#B8E4A5]">
              ₹{rec.savingsEst.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. AI FINANCIAL ASSISTANT PAGE (/app/assistant)
========================================================================= */
export function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello Rohan! I'm your SpendWise Financial Copilot. You are currently tracking an ₹18,350 safe-to-spend buffer with 18 days until your Nov 30 payday. How can I optimize your cashflow today?",
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    const newMessages = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);
    setInput('');

    // Instant realistic rule-based financial reasoning response
    setTimeout(() => {
      let aiResponse = "I've analyzed your cycle. You have plenty of runway with ₹420/day safe burn. If you hold discretionary dining under ₹3,000 this week, you will lock a ₹6,800 reserve surplus on Nov 30.";
      if (userText.toLowerCase().includes('flight') || userText.toLowerCase().includes('goa')) {
        aiResponse = "For your Goa coastal trip, you have ₹18,500 stashed out of your ₹25,000 goal. Use Axis Magnus for flights to trigger 25,000 EDGE miles and save ₹1,250 instantly!";
      } else if (userText.toLowerCase().includes('coffee') || userText.toLowerCase().includes('starbucks')) {
        aiResponse = "You've visited coffee shops 6 times this month (₹2,280 spent). Switching to a weekday office brew could free up ₹1,400 monthly for your tech wishlist.";
      }
      setMessages([...newMessages, { sender: 'ai', text: aiResponse }]);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto h-[calc(100vh-10rem)] flex flex-col">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">AI Financial Assistant</h1>
        <p className="text-xs text-[#64756D] mt-1">
          Automated cashflow insights, purchase viability analysis, and proactive runway optimization.
        </p>
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-[#DFE8DC] p-4 sm:p-6 shadow-sm flex flex-col justify-between overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-[#174D42] text-[#B8E4A5] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`p-3.5 rounded-2xl max-w-md text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#174D42] text-white rounded-br-sm'
                    : 'bg-[#EDF3E9] text-[#1C302A] rounded-bl-sm border border-[#DFE8DC]'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="pt-4 border-t border-[#DFE8DC] flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your salary runway, card rewards, or saving goals..."
            className="flex-1 px-4 py-3 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs text-[#1C302A] focus:outline-none focus:bg-white focus:border-[#174D42]"
          />
          <button
            type="submit"
            className="p-3 rounded-xl bg-[#174D42] text-white hover:bg-[#103C34] transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

/* =========================================================================
   6. FINANCIAL WELLNESS PAGE (/app/wellness)
========================================================================= */
export function WellnessPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#103C34]">Financial Wellness Healthcheck</h1>
        <p className="text-xs text-[#64756D] mt-1">
          Holistic diagnostic score based on liquidity runway, debt-to-income, and savings buffer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#174D42] text-white flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase text-[#B8E4A5] font-bold">Overall Score</span>
            <div className="text-5xl font-bold font-heading mt-2">84 / 100</div>
            <p className="text-xs text-white/80 mt-2">Tier: Excellent Wealth Composure</p>
          </div>
          <p className="text-xs text-[#B8E4A5] pt-4 border-t border-white/10">Top 12% among peer income cohorts</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm">
          <span className="text-xs text-[#64756D] uppercase">Credit Health</span>
          <div className="text-3xl font-bold text-[#103C34] font-mono-num mt-1">785 CIBIL</div>
          <p className="text-xs text-[#27865D] font-semibold mt-1">Utilization locked at 8.3%</p>
          <div className="mt-4 pt-3 border-t border-[#DFE8DC] text-xs text-[#64756D]">
            Zero missed payments in 24 months
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#DFE8DC] shadow-sm">
          <span className="text-xs text-[#64756D] uppercase">Emergency Cushion</span>
          <div className="text-3xl font-bold text-[#103C34] font-mono-num mt-1">4.2 Months</div>
          <p className="text-xs text-[#27865D] font-semibold mt-1">₹85,000 liquid vault</p>
          <div className="mt-4 pt-3 border-t border-[#DFE8DC] text-xs text-[#64756D]">
            Target: 6 months of basic living costs
          </div>
        </div>
      </div>
    </div>
  );
}
