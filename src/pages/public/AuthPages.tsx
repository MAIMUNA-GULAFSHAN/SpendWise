import React, { useState } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useApp } from '../../context/AppContext';
import { Wallet, Lock, Mail, ArrowRight, ShieldCheck, User } from 'lucide-react';

export function LoginPage() {
  const { navigate } = useRouter();
  const { login, startCleanWorkspace, loadDemoWorkspace } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalEmail = email.trim() || 'me@spendwise.app';
    const extractedName = finalEmail.split('@')[0];
    const capitalized = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
    login(finalEmail, capitalized);
    navigate('/app/dashboard');
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#DFE8DC] p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(23,77,66,0.08)]">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#174D42] text-[#B8E4A5] flex items-center justify-center shadow-sm mb-3">
            <Wallet className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-[#103C34]">Welcome to SpendWise</h1>
          <p className="text-xs text-[#64756D] mt-1">Sign in or initialize your clean personal expense ledger</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1C302A] mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#64756D] absolute left-3.5 top-3" />
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-medium text-[#1C302A] placeholder:text-[#64756D]/60 focus:bg-white focus:outline-none focus:border-[#174D42]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#1C302A]">Password</label>
              <Link to="/forgot-password" className="text-xs font-medium text-[#174D42] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#64756D] absolute left-3.5 top-3" />
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-medium text-[#1C302A] placeholder:text-[#64756D]/60 focus:bg-white focus:outline-none focus:border-[#174D42]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] transition-all shadow-md flex items-center justify-center gap-2 mt-2"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4 text-[#B8E4A5]" />
          </button>
        </form>

        {/* Quick Launch Options */}
        <div className="mt-5 pt-5 border-t border-[#DFE8DC] space-y-2.5">
          <button
            type="button"
            onClick={() => {
              startCleanWorkspace({
                name: 'Personal User',
                email: 'user@spendwise.app',
                monthlySalary: 50000,
                startingBalance: 30000,
              });
              navigate('/app/dashboard');
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-[#E6F3DD] text-[#174D42] border border-[#B8E4A5]/60 hover:bg-[#B8E4A5]/40 transition-all text-xs font-bold flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-[#27865D]" />
            <span>Launch Clean Workspace (0 Transactions, Ready for Expenses)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              loadDemoWorkspace();
              navigate('/app/dashboard');
            }}
            className="w-full py-2 px-3 rounded-xl bg-transparent text-[#64756D] hover:bg-[#EDF3E9] text-xs font-medium transition-colors text-center"
          >
            Preview Sample Demo Data (Rohan Sharma)
          </button>
        </div>

        <div className="mt-5 pt-4 border-t border-[#DFE8DC] text-center text-xs text-[#64756D]">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-[#174D42] hover:underline">
            Create Free Account
          </Link>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#64756D]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#174D42]" />
          <span>Biometric &amp; AES-256 Protected</span>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const { navigate } = useRouter();
  const { startCleanWorkspace } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [salary, setSalary] = useState('50000');
  const [startingBalance, setStartingBalance] = useState('30000');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || 'Personal User';
    const finalEmail = email.trim() || 'me@spendwise.app';
    startCleanWorkspace({
      name: finalName,
      email: finalEmail,
      monthlySalary: parseFloat(salary) || 50000,
      startingBalance: parseFloat(startingBalance) || 30000,
      paydayDate: 30,
    });
    navigate('/app/dashboard');
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#DFE8DC] p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(23,77,66,0.08)]">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#174D42] text-[#B8E4A5] flex items-center justify-center shadow-sm mb-3">
            <Wallet className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-[#103C34]">Start with SpendWise</h1>
          <p className="text-xs text-[#64756D] mt-1">Unlock crystal-clear cashflow clarity in minutes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1C302A] mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#64756D] absolute left-3.5 top-3" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-medium text-[#1C302A] focus:bg-white focus:outline-none focus:border-[#174D42]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C302A] mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#64756D] absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-medium text-[#1C302A] focus:bg-white focus:outline-none focus:border-[#174D42]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C302A] mb-1.5">Choose Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#64756D] absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-medium text-[#1C302A] focus:bg-white focus:outline-none focus:border-[#174D42]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] transition-all shadow-md flex items-center justify-center gap-2 mt-2"
          >
            <span>Proceed to Financial Onboarding</span>
            <ArrowRight className="w-4 h-4 text-[#B8E4A5]" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-[#DFE8DC] text-center text-xs text-[#64756D]">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#174D42] hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ForgotPasswordPage() {
  const { navigate } = useRouter();
  const [email, setEmail] = useState('rohan.sharma@spendwise.app');
  const [sent, setSent] = useState(false);

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#DFE8DC] p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(23,77,66,0.08)]">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#E6F3DD] text-[#174D42] flex items-center justify-center shadow-sm mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-[#103C34]">Password Recovery</h1>
          <p className="text-xs text-[#64756D] mt-1">Enter your registered email to receive an instant recovery link</p>
        </div>

        {sent ? (
          <div className="p-4 rounded-2xl bg-[#E6F3DD] border border-[#B8E4A5] text-center space-y-3">
            <p className="text-xs font-semibold text-[#174D42]">
              Recovery email sent to <strong>{email}</strong>
            </p>
            <p className="text-[11px] text-[#64756D]">Check your inbox and follow the secure verification link.</p>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-2.5 rounded-xl bg-[#174D42] text-white text-xs font-bold"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1.5">Registered Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-medium text-[#1C302A] focus:bg-white focus:outline-none focus:border-[#174D42]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] transition-all shadow-md"
            >
              Send Recovery Link
            </button>
          </form>
        )}

        <div className="mt-6 pt-6 border-t border-[#DFE8DC] text-center text-xs text-[#64756D]">
          Remember your password?{' '}
          <Link to="/login" className="font-bold text-[#174D42] hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export function OnboardingPage() {
  const { navigate } = useRouter();
  const { user, startCleanWorkspace } = useApp();
  const [step, setStep] = useState(1);
  const [salary, setSalary] = useState('50000');
  const [payday, setPayday] = useState('30');
  const [primaryBank, setPrimaryBank] = useState('HDFC Bank');
  const [startingBalance, setStartingBalance] = useState('35000');
  const [creditCard, setCreditCard] = useState('HDFC Regalia Gold');

  const handleFinish = () => {
    startCleanWorkspace({
      name: user?.name && user.name !== 'Rohan' ? user.name : 'Personal User',
      email: user?.email && !user.email.includes('rohan') ? user.email : 'user@spendwise.app',
      monthlySalary: parseFloat(salary) || 50000,
      paydayDate: parseInt(payday) || 30,
      startingBalance: parseFloat(startingBalance) || 35000,
      bankName: primaryBank,
      primaryCardName: creditCard,
    });
    navigate('/app/dashboard');
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-[#DFE8DC] p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(23,77,66,0.08)]">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === s
                    ? 'bg-[#174D42] text-white'
                    : step > s
                    ? 'bg-[#E6F3DD] text-[#174D42]'
                    : 'bg-[#EDF3E9] text-[#64756D]'
                }`}
              >
                {s}
              </div>
            ))}
          </div>
          <span className="text-xs font-medium text-[#64756D]">Step {step} of 3</span>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="font-heading text-xl font-bold text-[#103C34]">Set your Monthly Payday &amp; Income</h2>
              <p className="text-xs text-[#64756D] mt-1">This configures your Salary Runway calculation and safe daily burn rate.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1.5">Monthly Net Salary (₹)</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-sm font-bold text-[#1C302A] font-mono-num"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1.5">Day of Month Credited</label>
              <select
                value={payday}
                onChange={(e) => setPayday(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-medium text-[#1C302A]"
              >
                <option value="1">1st of the month</option>
                <option value="5">5th of the month</option>
                <option value="25">25th of the month</option>
                <option value="30">30th (Last day of month)</option>
              </select>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] flex items-center justify-center gap-2 mt-4"
            >
              <span>Next: Primary Account &amp; Balance</span>
              <ArrowRight className="w-4 h-4 text-[#B8E4A5]" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="font-heading text-xl font-bold text-[#103C34]">Primary Salary Account &amp; Balance</h2>
              <p className="text-xs text-[#64756D] mt-1">Set your starting bank balance to begin tracking expenses from today.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1.5">Bank Institution</label>
              <select
                value={primaryBank}
                onChange={(e) => setPrimaryBank(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-medium text-[#1C302A]"
              >
                <option value="HDFC Bank">HDFC Bank Salary Account</option>
                <option value="ICICI Bank">ICICI Bank Wealth Management</option>
                <option value="Axis Bank">Axis Bank Burgundy</option>
                <option value="State Bank of India">State Bank of India</option>
                <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1.5">Current Available Balance (₹)</label>
              <input
                type="number"
                value={startingBalance}
                onChange={(e) => setStartingBalance(e.target.value)}
                placeholder="35000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-sm font-bold text-[#1C302A] font-mono-num"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs text-[#64756D]">
              SpendWise will track all new transactions against this balance with zero past demo transactions.
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setStep(1)}
                className="py-3 px-4 rounded-xl border border-[#DFE8DC] text-xs font-semibold text-[#64756D]"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] flex items-center justify-center gap-2"
              >
                <span>Next: Cards &amp; Limits</span>
                <ArrowRight className="w-4 h-4 text-[#B8E4A5]" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="font-heading text-xl font-bold text-[#103C34]">Credit Card Setup</h2>
              <p className="text-xs text-[#64756D] mt-1">Add your primary card with 0 starting balance due.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1C302A] mb-1.5">Primary Card</label>
              <select
                value={creditCard}
                onChange={(e) => setCreditCard(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF3E9] border border-[#DFE8DC] text-xs font-medium text-[#1C302A]"
              >
                <option value="HDFC Regalia Gold">HDFC Regalia Gold (Limit ₹1,50,000)</option>
                <option value="ICICI Amazon Pay">ICICI Amazon Pay (Limit ₹1,00,000)</option>
                <option value="Axis Magnus">Axis Magnus (Limit ₹3,50,000)</option>
                <option value="SBI Cashback Card">SBI Cashback Card (Limit ₹1,00,000)</option>
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-[#E6F3DD] border border-[#B8E4A5] text-xs text-[#174D42] space-y-1">
              <div className="font-bold">Setup Ready for Your Expenses!</div>
              <p className="text-[11px] text-[#64756D]">
                Your workspace will start with ₹{parseFloat(startingBalance || '0').toLocaleString('en-IN')} available balance and 0 past transactions, ready to record your real spending.
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-xl bg-[#174D42] text-white text-xs font-bold hover:bg-[#103C34] shadow-md flex items-center justify-center gap-2 mt-4"
            >
              <span>Launch Clean Personal Workspace</span>
              <ArrowRight className="w-4 h-4 text-[#B8E4A5]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
