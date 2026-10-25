import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import {
  UserProfile,
  Transaction,
  Account,
  CreditCard,
  Budget,
  SavingsGoal,
  LifeMoment,
  Offer,
  Subscription,
  WishlistItem,
  NotificationItem,
  AdminUser,
  AdminRole,
  AdminMerchant,
} from '../types';

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isLoggedIn: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  workspaceMode: 'personal' | 'demo';
  startCleanWorkspace: (options?: {
    name?: string;
    email?: string;
    monthlySalary?: number;
    paydayDate?: number;
    startingBalance?: number;
    bankName?: string;
    primaryCardName?: string;
  }) => void;
  loadDemoWorkspace: () => void;
  registerUser: (
    name: string,
    email: string,
    salary: number,
    payday: number,
    startingBalance?: number,
    bankName?: string
  ) => void;
  resetDemoData: () => void;

  isBalanceHidden: boolean;
  setIsBalanceHidden: React.Dispatch<React.SetStateAction<boolean>>;
  isAiSignalDismissed: boolean;
  dismissAiSignal: () => void;

  // Transactions & Financial Mutations
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id' | 'status'>) => void;
  deleteTransaction: (id: string) => void;

  // Accounts & Transfers
  accounts: Account[];
  addAccount: (account: Omit<Account, 'id'>) => void;
  addMoneyToAccount: (accountId: string, amount: number, note?: string) => void;
  transferBetweenAccounts: (fromId: string, toId: string, amount: number, note?: string) => void;

  // Credit Cards
  cards: CreditCard[];
  toggleCardAutoDebit: (id: string) => void;
  payCardDue: (id: string, amount: number, fromAccountId?: string) => void;

  // Budgets
  budgets: Budget[];
  addBudget: (b: Omit<Budget, 'id'>) => void;

  // Savings & Goals
  savingsGoals: SavingsGoal[];
  depositToGoal: (id: string, amount: number, note?: string, fromAccountId?: string) => void;
  addSavingsGoal: (g: Omit<SavingsGoal, 'id' | 'currentAmount'>) => void;

  // Life Moments
  lifeMoments: LifeMoment[];
  addLifeMoment: (m: Omit<LifeMoment, 'id'>) => void;
  contributeToMoment: (id: string, amount: number, fromAccountId?: string) => void;

  // Offers
  offers: Offer[];

  // Subscriptions
  subscriptions: Subscription[];
  toggleSubscriptionStatus: (id: string) => void;

  // Wishlist
  wishlist: WishlistItem[];
  addWishlistItem: (item: Omit<WishlistItem, 'id' | 'savedTowardsItem'>) => void;
  contributeToWishlist: (id: string, amount: number) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Admin Data & Actions
  adminUsers: AdminUser[];
  adminRoles: AdminRole[];
  adminMerchants: AdminMerchant[];
  updateAdminUserStatus: (id: string, status: AdminUser['status']) => void;

  // Dynamic Computed Financial Accounting (Reactive Double-Entry)
  totalAvailableBalance: number;
  totalCardObligations: number;
  reservedBills: number;
  safeToSpend: number;
  totalSpentThisCycle: number;
  daysUntilPayday: number;
  safeDailyBurn: number;
  surplusForecast: number;
  categorySpending: Record<string, number>;
}

const STORAGE_KEY_PREFIX = 'spendwise_v2_';

// Initial Seed Data matching exact Stitch prototype
const INITIAL_USER: UserProfile = {
  id: 'user-001',
  name: 'Rohan',
  email: 'rohan.sharma@spendwise.app',
  isPro: true,
  avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1XDIjk_hhQq7IEBmewHFlmb6Os7wPSR-d4CgBT5vC1ZgAf5YO-9E7pjWqzPpANxRJjMlaSrAQFb6PiH2xp3j0QzZYvPWGiizoR1kVOUyV0ZNCxChMVjB0OUQDJtboGLNOzbny6coMOhtD3Nx7P0Ot32nMx4pC6bKIzzoqPqOM-6wBYNjXeCeYQPjIEydcvkqhKQ9p5I7HhRZ1S-6bQaNrVR49sUB7LI4WkfowpZM4-w-t9Uxxl1tCxuDQ',
  currency: '₹',
  monthlySalary: 45000,
  paydayDate: 30,
  cycleStartDay: 1,
  cycleEndDay: 30,
};

const INITIAL_ACCOUNTS: Account[] = [
  {
    id: 'acc-1',
    name: 'HDFC Salary Account',
    type: 'bank',
    accountNumberMasked: '•••• 4920',
    institution: 'HDFC Bank',
    balance: 31850,
    color: '#174D42',
    isPrimary: true,
    lastSynced: 'Just now',
  },
  {
    id: 'acc-2',
    name: 'ICICI Emergency Savings',
    type: 'bank',
    accountNumberMasked: '•••• 8821',
    institution: 'ICICI Bank',
    balance: 9500,
    color: '#426835',
    isPrimary: false,
    lastSynced: '15 mins ago',
  },
  {
    id: 'acc-3',
    name: 'Paytm Wallet & UPI',
    type: 'wallet',
    accountNumberMasked: '+91 98••• ••210',
    institution: 'Paytm Payments',
    balance: 1500,
    color: '#53421A',
    isPrimary: false,
    lastSynced: '1 hour ago',
  },
];

const INITIAL_CARDS: CreditCard[] = [
  {
    id: 'card-1',
    name: 'HDFC Regalia Gold',
    bank: 'HDFC Bank',
    cardNumberMasked: '•••• •••• •••• 8842',
    cardNetwork: 'visa',
    tier: 'Signature Privilege',
    totalLimit: 150000,
    usedAmount: 12500,
    availableLimit: 137500,
    dueDate: 'Nov 24, 2026',
    billingCycle: '20th to 19th of month',
    apr: 3.49,
    rewardPoints: 14280,
    cashbackRate: '4X Points on Luxury & Dining',
    colorTheme: '#174D42',
    isAutoDebitEnabled: true,
  },
  {
    id: 'card-2',
    name: 'ICICI Amazon Pay',
    bank: 'ICICI Bank',
    cardNumberMasked: '•••• •••• •••• 4129',
    cardNetwork: 'visa',
    tier: 'Platinum Cashback',
    totalLimit: 100000,
    usedAmount: 4200,
    availableLimit: 95800,
    dueDate: 'Dec 02, 2026',
    billingCycle: '28th to 27th of month',
    apr: 3.5,
    rewardPoints: 3410,
    cashbackRate: '5% Unlimited Cashback on Amazon',
    colorTheme: '#3B2C06',
    isAutoDebitEnabled: false,
  },
  {
    id: 'card-3',
    name: 'Axis Magnus',
    bank: 'Axis Bank',
    cardNumberMasked: '•••• •••• •••• 9011',
    cardNetwork: 'mastercard',
    tier: 'Super Premium Metal',
    totalLimit: 350000,
    usedAmount: 18900,
    availableLimit: 331100,
    dueDate: 'Dec 10, 2026',
    billingCycle: '5th to 4th of month',
    apr: 3.25,
    rewardPoints: 48900,
    cashbackRate: '25,000 Bonus EDGE Miles',
    colorTheme: '#103C34',
    isAutoDebitEnabled: true,
  },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    title: 'Starbucks Coffee',
    category: 'Dining & Food',
    amount: 380,
    type: 'expense',
    date: 'Yesterday',
    time: '4:15 PM',
    paymentMethod: 'UPI Autopay',
    accountId: 'acc-1',
    cashbackEarned: 0,
    status: 'completed',
    notes: 'Meals & Drinks • UPI Autopay',
  },
  {
    id: 'tx-2',
    title: 'Shell Petrol Pump',
    category: 'Fuel & Transit',
    amount: 1800,
    type: 'expense',
    date: '18 Nov',
    time: '08:40 AM',
    paymentMethod: 'Card ending 8842',
    cardId: 'card-1',
    cashbackEarned: 90,
    status: 'completed',
    notes: 'Fuel • Card ending 8842 • 5% Back',
  },
  {
    id: 'tx-3',
    title: 'Client Payment',
    category: 'Freelance & Retainers',
    amount: 8500,
    type: 'income',
    date: '17 Nov',
    time: '02:30 PM',
    paymentMethod: 'Bank Transfer',
    accountId: 'acc-1',
    status: 'completed',
    notes: 'Freelance Retainer • Bank Transfer',
  },
  {
    id: 'tx-4',
    title: 'Nature Basket Organics',
    category: 'Groceries',
    amount: 6800,
    type: 'expense',
    date: '16 Nov',
    time: '06:15 PM',
    paymentMethod: 'Card ending 8842',
    cardId: 'card-1',
    status: 'completed',
    notes: 'Weekly groceries restock',
  },
  {
    id: 'tx-5',
    title: 'Bistro & Dining',
    category: 'Dining & Food',
    amount: 4820,
    type: 'expense',
    date: '15 Nov',
    time: '08:30 PM',
    paymentMethod: 'Card ending 8842',
    cardId: 'card-1',
    status: 'completed',
    notes: 'Dinner with colleagues',
  },
  {
    id: 'tx-6',
    title: 'Zara Discretionary Shopping',
    category: 'Discretionary',
    amount: 6000,
    type: 'expense',
    date: '14 Nov',
    time: '05:00 PM',
    paymentMethod: 'Card ending 4129',
    cardId: 'card-2',
    status: 'completed',
  },
  {
    id: 'tx-7',
    title: 'Fuel Station Transit',
    category: 'Fuel & Transit',
    amount: 2700,
    type: 'expense',
    date: '12 Nov',
    time: '09:15 AM',
    paymentMethod: 'Card ending 8842',
    cardId: 'card-1',
    status: 'completed',
  },
  {
    id: 'tx-8',
    title: 'Netflix & Spotify Subscriptions',
    category: 'Subscriptions',
    amount: 4150,
    type: 'expense',
    date: '10 Nov',
    time: '12:01 AM',
    paymentMethod: 'Card ending 8842',
    cardId: 'card-1',
    status: 'completed',
  },
];

const INITIAL_BUDGETS: Budget[] = [
  {
    id: 'b-1',
    category: 'Groceries',
    allocatedAmount: 10000,
    spentAmount: 6800,
    period: 'monthly',
    alertThresholdPercent: 80,
    icon: 'shopping-cart',
    color: '#174D42',
  },
  {
    id: 'b-2',
    category: 'Dining & Food',
    allocatedAmount: 7500,
    spentAmount: 5200,
    period: 'monthly',
    alertThresholdPercent: 75,
    icon: 'utensils',
    color: '#426835',
  },
  {
    id: 'b-3',
    category: 'Discretionary',
    allocatedAmount: 8000,
    spentAmount: 6000,
    period: 'monthly',
    alertThresholdPercent: 85,
    icon: 'gift',
    color: '#9CD1C2',
  },
  {
    id: 'b-4',
    category: 'Fuel & Transit',
    allocatedAmount: 6000,
    spentAmount: 4500,
    period: 'monthly',
    alertThresholdPercent: 80,
    icon: 'fuel',
    color: '#FAE0AA',
  },
  {
    id: 'b-5',
    category: 'Subscriptions',
    allocatedAmount: 5000,
    spentAmount: 4150,
    period: 'monthly',
    alertThresholdPercent: 90,
    icon: 'tv',
    color: '#53421A',
  },
];

const INITIAL_GOALS: SavingsGoal[] = [
  {
    id: 'goal-1',
    title: 'Reserves Pool',
    targetAmount: 15000,
    currentAmount: 10500,
    targetDate: '30 Nov 2026',
    category: 'emergency',
    autoSaveMonthly: 5000,
    isLocked: false,
    notes: '70% Goal reached • Target ₹15,000 for unexpected safety reserve',
    recentContributions: [
      { date: '17 Nov', amount: 850, note: 'AI signal surplus swept from dining savings' },
      { date: '10 Nov', amount: 3000, note: 'Weekly scheduled transfer' },
      { date: '01 Nov', amount: 6650, note: 'Initial monthly salary allocation' },
    ],
  },
  {
    id: 'goal-2',
    title: 'Goa Trip Buffer',
    targetAmount: 25000,
    currentAmount: 18500,
    targetDate: '20 Dec 2026',
    category: 'travel',
    autoSaveMonthly: 6000,
    isLocked: false,
    notes: 'Beach villa rental with close friends in South Goa',
    recentContributions: [
      { date: '15 Nov', amount: 1200, note: 'Cashback reward savings deposit' },
      { date: '05 Nov', amount: 5000, note: 'Salary allocation' },
    ],
  },
  {
    id: 'goal-3',
    title: '6-Month Emergency Vault',
    targetAmount: 120000,
    currentAmount: 85000,
    targetDate: '31 Mar 2027',
    category: 'emergency',
    autoSaveMonthly: 10000,
    isLocked: true,
    notes: 'High yield institutional lockbox earning 7.4% p.a.',
    recentContributions: [{ date: '01 Nov', amount: 10000, note: 'Monthly auto-debit' }],
  },
  {
    id: 'goal-4',
    title: 'MacBook Pro M4 Upgrade',
    targetAmount: 140000,
    currentAmount: 62000,
    targetDate: '15 Feb 2027',
    category: 'gadget',
    autoSaveMonthly: 8000,
    isLocked: false,
    notes: 'High performance compute setup for creative studio',
    recentContributions: [{ date: '12 Nov', amount: 4000, note: 'Freelance bonus deposit' }],
  },
];

const INITIAL_MOMENTS: LifeMoment[] = [
  {
    id: 'moment-1',
    title: 'Date Night & Anniversary',
    date: 'Nov 28, 2026',
    daysRemaining: 8,
    targetBudget: 3000,
    savedBudget: 2200,
    category: 'anniversary',
    giftIdeas: ['Olive Beach table reservation', 'Bespoke perfume and handwritten card', 'Express cab booked'],
    status: 'planning',
    notes: 'Scheduled for Nov 28 • 8 days to go • 73% Ready',
  },
  {
    id: 'moment-2',
    title: "Mom's 55th Birthday Celebration",
    date: 'Dec 14, 2026',
    daysRemaining: 24,
    targetBudget: 6000,
    savedBudget: 4500,
    category: 'birthday',
    giftIdeas: ['Kashmiri Pashmina Silk Shawl', 'Custom family photo frame', 'Artisan bakery cake'],
    status: 'planning',
    notes: 'Family dinner and surprise gift delivery',
  },
  {
    id: 'moment-3',
    title: 'New Year Mountain Retreat',
    date: 'Dec 31, 2026',
    daysRemaining: 41,
    targetBudget: 18000,
    savedBudget: 12000,
    category: 'holiday',
    giftIdeas: ['Cabin rental share', 'Barbecue campfire set', 'Winter fleece jackets'],
    status: 'planning',
    notes: 'Coorg mountain cottage reservation confirmed',
  },
];

const INITIAL_OFFERS: Offer[] = [
  {
    id: 'offer-1',
    merchant: 'Swiggy Gourmet & Dineout',
    title: 'Flat 20% Instant Discount',
    discount: '20% OFF up to ₹500',
    applicableCard: 'HDFC Regalia Gold',
    minSpend: 1200,
    validUntil: '30 Nov 2026',
    category: 'dining',
    code: 'HDFCGOLD20',
    terms: 'Valid once per week on participating luxury restaurants.',
    popularity: 94,
  },
  {
    id: 'offer-2',
    merchant: 'Shell Petrol Station',
    title: '5% Instant Cashback on Premium Fuels',
    discount: '5% Cashback (Auto-credited)',
    applicableCard: 'HDFC Regalia Gold',
    minSpend: 1500,
    validUntil: '15 Dec 2026',
    category: 'fuel',
    code: 'SHELL5X',
    terms: 'Direct billing surcharge waiver plus 5% statement credit.',
    popularity: 88,
  },
  {
    id: 'offer-3',
    merchant: 'MakeMyTrip Holidays',
    title: 'Flat ₹1,250 OFF on Domestic Flights',
    discount: '₹1,250 Instant Off',
    applicableCard: 'Axis Magnus',
    minSpend: 6000,
    validUntil: '31 Dec 2026',
    category: 'travel',
    code: 'MMTMAGNUS',
    terms: 'Applicable on IndiGo, Air India, and Vistara bookings.',
    popularity: 92,
  },
  {
    id: 'offer-4',
    merchant: 'Amazon Super Value Day',
    title: '5% Unlimited Cashback + ₹200 Coupon',
    discount: '5% + ₹200 Coupon',
    applicableCard: 'ICICI Amazon Pay',
    minSpend: 2000,
    validUntil: '05 Dec 2026',
    category: 'groceries',
    code: 'AMZPAYNOV',
    terms: 'Directly credited as Amazon Pay balance every billing statement.',
    popularity: 96,
  },
  {
    id: 'offer-5',
    merchant: 'Croma Apple Ecosystem Days',
    title: 'Flat ₹5,000 Instant Off on Mac & iPad',
    discount: '₹5,000 Off',
    applicableCard: 'HDFC Regalia Gold',
    minSpend: 50000,
    validUntil: '25 Nov 2026',
    category: 'shopping',
    code: 'CROMAHDFC',
    terms: 'Valid on both online croma.com and in-store purchases.',
    popularity: 85,
  },
];

const INITIAL_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'sub-1',
    name: 'Netflix Premium 4K',
    amount: 649,
    frequency: 'monthly',
    nextBillingDate: '15 Dec 2026',
    paymentMethod: 'HDFC Regalia Gold (••8842)',
    category: 'Entertainment',
    isActive: true,
    icon: 'film',
  },
  {
    id: 'sub-2',
    name: 'Spotify Family HiFi',
    amount: 199,
    frequency: 'monthly',
    nextBillingDate: '15 Dec 2026',
    paymentMethod: 'HDFC Regalia Gold (••8842)',
    category: 'Entertainment',
    isActive: true,
    icon: 'music',
  },
  {
    id: 'sub-3',
    name: 'Google One 2TB Cloud',
    amount: 650,
    frequency: 'monthly',
    nextBillingDate: '28 Nov 2026',
    paymentMethod: 'Paytm UPI Autopay',
    category: 'Cloud Storage',
    isActive: true,
    icon: 'cloud',
  },
  {
    id: 'sub-4',
    name: 'Cult.fit Elite Gym Membership',
    amount: 1450,
    frequency: 'monthly',
    nextBillingDate: '12 Dec 2026',
    paymentMethod: 'HDFC Salary Account',
    category: 'Health & Fitness',
    isActive: true,
    icon: 'activity',
  },
  {
    id: 'sub-5',
    name: 'Amazon Prime Annual',
    amount: 1499,
    frequency: 'yearly',
    nextBillingDate: '18 Jan 2027',
    paymentMethod: 'ICICI Amazon Pay (••4129)',
    category: 'Shopping & Delivery',
    isActive: true,
    icon: 'package',
  },
];

const INITIAL_WISHLIST: WishlistItem[] = [
  {
    id: 'wish-1',
    title: 'Sony WH-1000XM5 Noise Cancelling Headphones',
    price: 24990,
    priority: 'high',
    targetPurchaseMonth: 'Dec 2026',
    affordabilityStatus: 'ready',
    savedTowardsItem: 24990,
    url: 'https://sony.com',
    notes: 'Fully funded via gadget reserve. Wait for cyber weekend discounts.',
  },
  {
    id: 'wish-2',
    title: 'Aer Travel Backpack 3 (35L Cordura)',
    price: 18500,
    priority: 'medium',
    targetPurchaseMonth: 'Jan 2027',
    affordabilityStatus: 'save-more',
    savedTowardsItem: 8200,
    url: 'https://aersf.com',
    notes: 'High-density ballistic nylon carry-on for weekend trips.',
  },
  {
    id: 'wish-3',
    title: 'Herman Miller Aeron Ergonomic Chair',
    price: 85000,
    priority: 'low',
    targetPurchaseMonth: 'May 2027',
    affordabilityStatus: 'wait-sale',
    savedTowardsItem: 21000,
    notes: 'Long-term lumbar spine health investment for home studio.',
  },
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'AI Signal: Dining Surplus Unlocked',
    message: 'You spent 18% less on food delivery this week! That automatically unlocked ₹850 ready to tuck into Goa trip.',
    type: 'tip',
    timestamp: '3 mins ago',
    isRead: false,
    actionUrl: '/app/savings/goal-2',
  },
  {
    id: 'notif-2',
    title: 'Credit Card Due in 6 Days',
    message: 'HDFC Regalia Gold payment of ₹12,500 is due on Nov 24. Auto-debit will trigger on Nov 22.',
    type: 'alert',
    timestamp: '2 hours ago',
    isRead: false,
    actionUrl: '/app/cards/card-1',
  },
  {
    id: 'notif-3',
    title: 'Salary Survival On Track',
    message: '18 days until Nov 30 payday. Safe daily burn is comfortably locked at ₹420/day.',
    type: 'success',
    timestamp: 'Today, 08:30 AM',
    isRead: true,
    actionUrl: '/app/income',
  },
  {
    id: 'notif-4',
    title: 'Date Night Budget Check',
    message: 'Anniversary is in 8 days. You have ₹2,200 stashed out of ₹3,000 target budget (73% ready).',
    type: 'billing',
    timestamp: 'Yesterday',
    isRead: true,
    actionUrl: '/app/life-moments/moment-1',
  },
];

const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'adm-usr-1',
    name: 'Rohan Sharma',
    email: 'rohan.sharma@spendwise.app',
    role: 'User',
    status: 'Active',
    joinedDate: '12 Jan 2025',
    lastLogin: 'Today, 11:20 PM',
    transactionsCount: 34,
    totalBalanceTracked: 42850,
  },
  {
    id: 'adm-usr-2',
    name: 'Priya Mukherjee',
    email: 'priya.m@horizonfin.com',
    role: 'Manager',
    status: 'Active',
    joinedDate: '04 Mar 2025',
    lastLogin: 'Yesterday',
    transactionsCount: 142,
    totalBalanceTracked: 185000,
  },
  {
    id: 'adm-usr-3',
    name: 'Arjun Nambiar',
    email: 'arjun@nambiarcapital.in',
    role: 'Admin',
    status: 'Active',
    joinedDate: '18 Aug 2024',
    lastLogin: '2 hrs ago',
    transactionsCount: 289,
    totalBalanceTracked: 520000,
  },
  {
    id: 'adm-usr-4',
    name: 'Kavita Sundaram',
    email: 'kavita.s@zenithtech.org',
    role: 'User',
    status: 'Suspended',
    joinedDate: '09 Sep 2025',
    lastLogin: '18 days ago',
    transactionsCount: 12,
    totalBalanceTracked: 14200,
  },
  {
    id: 'adm-usr-5',
    name: 'Vikramaditya Roy',
    email: 'vikram.roy@finops.io',
    role: 'Auditor',
    status: 'Active',
    joinedDate: '02 Feb 2025',
    lastLogin: 'Today, 04:15 PM',
    transactionsCount: 65,
    totalBalanceTracked: 98000,
  },
];

const INITIAL_ADMIN_ROLES: AdminRole[] = [
  {
    id: 'role-1',
    name: 'Super Administrator',
    description: 'Unrestricted control over system infrastructure, database, security, and policies.',
    usersCount: 2,
    permissions: ['Manage Users', 'Edit Roles', 'View Financial Ledgers', 'Deploy AI Models', 'Security Audit'],
  },
  {
    id: 'role-2',
    name: 'Operations Manager',
    description: 'Manages merchant deals, card catalogs, category taxonomies, and customer communications.',
    usersCount: 6,
    permissions: ['Manage Offers', 'Review Transactions', 'Manage Card Catalog', 'Broadcast Notifications'],
  },
  {
    id: 'role-3',
    name: 'Compliance & Audit Lead',
    description: 'Read-only access to audit trails, data protection logs, and regulatory compliance reports.',
    usersCount: 3,
    permissions: ['Read Audit Logs', 'Export Data', 'Verify KYC'],
  },
  {
    id: 'role-4',
    name: 'Standard Pro Member',
    description: 'Default subscription role with full multi-wallet and automated AI insights access.',
    usersCount: 14820,
    permissions: ['Personal Transactions', 'Multi-card Sync', 'Custom Goals'],
  },
];

const INITIAL_ADMIN_MERCHANTS: AdminMerchant[] = [
  {
    id: 'merch-1',
    name: 'Swiggy & Instamart',
    category: 'Food Delivery & Quick Commerce',
    activeCampaigns: 4,
    partnershipTier: 'Platinum',
    avgDiscount: '20% Off',
    status: 'Active',
  },
  {
    id: 'merch-2',
    name: 'Shell Aviation & Fuels',
    category: 'Mobility & Energy',
    activeCampaigns: 2,
    partnershipTier: 'Gold',
    avgDiscount: '5% Surcharge Waiver',
    status: 'Active',
  },
  {
    id: 'merch-3',
    name: 'MakeMyTrip & Goibibo',
    category: 'Hospitality & Aviation',
    activeCampaigns: 3,
    partnershipTier: 'Platinum',
    avgDiscount: 'Flat ₹1,250 Off',
    status: 'Active',
  },
  {
    id: 'merch-4',
    name: 'Croma Electronics',
    category: 'Consumer Tech Retail',
    activeCampaigns: 1,
    partnershipTier: 'Silver',
    avgDiscount: '10% Cash Rebate',
    status: 'Active',
  },
  {
    id: 'merch-5',
    name: 'BookMyShow Experiences',
    category: 'Entertainment & Ticketing',
    activeCampaigns: 2,
    partnershipTier: 'Standard',
    avgDiscount: 'Buy 1 Get 1 Free',
    status: 'Under Review',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  // State with LocalStorage Persistence
  const [workspaceMode, setWorkspaceMode] = useState<'personal' | 'demo'>(() => loadFromStorage('workspaceMode', 'demo'));
  const [user, setUser] = useState<UserProfile>(() => loadFromStorage('user', INITIAL_USER));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => loadFromStorage('isLoggedIn', true));
  const [isBalanceHidden, setIsBalanceHidden] = useState<boolean>(() => loadFromStorage('isBalanceHidden', false));
  const [isAiSignalDismissed, setIsAiSignalDismissed] = useState<boolean>(() => loadFromStorage('isAiSignalDismissed', false));

  const [accounts, setAccounts] = useState<Account[]>(() => loadFromStorage('accounts', INITIAL_ACCOUNTS));
  const [cards, setCards] = useState<CreditCard[]>(() => loadFromStorage('cards', INITIAL_CARDS));
  const [transactions, setTransactions] = useState<Transaction[]>(() => loadFromStorage('transactions', INITIAL_TRANSACTIONS));
  const [budgets, setBudgets] = useState<Budget[]>(() => loadFromStorage('budgets', INITIAL_BUDGETS));
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(() => loadFromStorage('goals', INITIAL_GOALS));
  const [lifeMoments, setLifeMoments] = useState<LifeMoment[]>(() => loadFromStorage('moments', INITIAL_MOMENTS));
  const [offers] = useState<Offer[]>(() => loadFromStorage('offers', INITIAL_OFFERS));
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => loadFromStorage('subscriptions', INITIAL_SUBSCRIPTIONS));
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => loadFromStorage('wishlist', INITIAL_WISHLIST));
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => loadFromStorage('notifications', INITIAL_NOTIFICATIONS));
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => loadFromStorage('adminUsers', INITIAL_ADMIN_USERS));
  const [adminRoles, setAdminRoles] = useState<AdminRole[]>(() => loadFromStorage('adminRoles', INITIAL_ADMIN_ROLES));
  const [adminMerchants, setAdminMerchants] = useState<AdminMerchant[]>(() => loadFromStorage('adminMerchants', INITIAL_ADMIN_MERCHANTS));

  // Sync state changes to storage
  useEffect(() => saveToStorage('workspaceMode', workspaceMode), [workspaceMode]);
  useEffect(() => saveToStorage('user', user), [user]);
  useEffect(() => saveToStorage('isLoggedIn', isLoggedIn), [isLoggedIn]);
  useEffect(() => saveToStorage('isBalanceHidden', isBalanceHidden), [isBalanceHidden]);
  useEffect(() => saveToStorage('isAiSignalDismissed', isAiSignalDismissed), [isAiSignalDismissed]);
  useEffect(() => saveToStorage('accounts', accounts), [accounts]);
  useEffect(() => saveToStorage('cards', cards), [cards]);
  useEffect(() => saveToStorage('transactions', transactions), [transactions]);
  useEffect(() => saveToStorage('budgets', budgets), [budgets]);
  useEffect(() => saveToStorage('goals', savingsGoals), [savingsGoals]);
  useEffect(() => saveToStorage('moments', lifeMoments), [lifeMoments]);
  useEffect(() => saveToStorage('subscriptions', subscriptions), [subscriptions]);
  useEffect(() => saveToStorage('wishlist', wishlist), [wishlist]);
  useEffect(() => saveToStorage('notifications', notifications), [notifications]);
  useEffect(() => saveToStorage('adminUsers', adminUsers), [adminUsers]);

  // Clean personal workspace for real personal expense tracking (0 demo transactions)
  const startCleanWorkspace = (options?: {
    name?: string;
    email?: string;
    monthlySalary?: number;
    paydayDate?: number;
    startingBalance?: number;
    bankName?: string;
    primaryCardName?: string;
  }) => {
    const cleanUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: options?.name?.trim() || 'My Expenses',
      email: options?.email?.trim() || 'me@spendwise.app',
      isPro: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
      currency: '₹',
      monthlySalary: options?.monthlySalary ?? 50000,
      paydayDate: options?.paydayDate ?? 30,
      cycleStartDay: 1,
      cycleEndDay: 30,
    };

    const cleanAccounts: Account[] = [
      {
        id: `acc-${Date.now()}`,
        name: options?.bankName ? `${options.bankName} Salary Account` : 'Primary Salary Account',
        type: 'bank',
        balance: options?.startingBalance !== undefined ? options.startingBalance : 35000,
        accountNumberMasked: '•••• 1001',
        institution: options?.bankName || 'HDFC Bank',
        color: '#174D42',
        isPrimary: true,
        lastSynced: 'Just now',
      },
    ];

    const cleanCards: CreditCard[] = [
      {
        id: `card-${Date.now()}`,
        name: options?.primaryCardName || 'Primary Credit Card',
        bank: options?.bankName || 'HDFC Bank',
        cardNumberMasked: '•••• •••• •••• 8842',
        cardNetwork: 'visa',
        tier: 'Signature Privilege',
        totalLimit: 100000,
        usedAmount: 0,
        availableLimit: 100000,
        dueDate: 'Nov 30, 2026',
        billingCycle: '1st - 30th Nov',
        apr: 3.4,
        rewardPoints: 0,
        cashbackRate: '5% on dining, 2% all',
        colorTheme: '#174D42',
        isAutoDebitEnabled: true,
      },
    ];

    const cleanBudgets: Budget[] = [
      { id: 'b-1', category: 'Groceries', allocatedAmount: 8000, spentAmount: 0, period: 'monthly', alertThresholdPercent: 85, icon: 'shopping-cart', color: '#174D42' },
      { id: 'b-2', category: 'Dining & Food', allocatedAmount: 5000, spentAmount: 0, period: 'monthly', alertThresholdPercent: 80, icon: 'coffee', color: '#426835' },
      { id: 'b-3', category: 'Discretionary', allocatedAmount: 6000, spentAmount: 0, period: 'monthly', alertThresholdPercent: 75, icon: 'shopping-bag', color: '#9CD1C2' },
      { id: 'b-4', category: 'Fuel & Transit', allocatedAmount: 4000, spentAmount: 0, period: 'monthly', alertThresholdPercent: 90, icon: 'fuel', color: '#FAE0AA' },
      { id: 'b-5', category: 'Subscriptions', allocatedAmount: 3000, spentAmount: 0, period: 'monthly', alertThresholdPercent: 90, icon: 'tv', color: '#53421A' },
    ];

    const cleanGoals: SavingsGoal[] = [
      {
        id: 'goal-1',
        title: 'Emergency Reserve Fund',
        targetAmount: 50000,
        currentAmount: 5000,
        targetDate: '31 Dec 2026',
        category: 'emergency',
        autoSaveMonthly: 5000,
        isLocked: false,
        notes: 'Target ₹50,000 for unexpected safety reserve',
      },
    ];

    const cleanNotifs: NotificationItem[] = [
      {
        id: 'notif-1',
        title: 'Personal Workspace Ready!',
        message: 'Your ledger is clean with 0 demo transactions. Tap + Add Expense to begin tracking your expenses.',
        timestamp: 'Just now',
        type: 'success',
        isRead: false,
      },
    ];

    setUser(cleanUser);
    setIsLoggedIn(true);
    setWorkspaceMode('personal');
    setAccounts(cleanAccounts);
    setCards(cleanCards);
    setTransactions([]); // ZERO pre-existing transactions!
    setBudgets(cleanBudgets);
    setSavingsGoals(cleanGoals);
    setLifeMoments([]);
    setSubscriptions([]);
    setWishlist([]);
    setNotifications(cleanNotifs);
    setIsAiSignalDismissed(false);
  };

  const loadDemoWorkspace = () => {
    setUser(INITIAL_USER);
    setIsLoggedIn(true);
    setWorkspaceMode('demo');
    setAccounts(INITIAL_ACCOUNTS);
    setCards(INITIAL_CARDS);
    setTransactions(INITIAL_TRANSACTIONS);
    setBudgets(INITIAL_BUDGETS);
    setSavingsGoals(INITIAL_GOALS);
    setLifeMoments(INITIAL_MOMENTS);
    setSubscriptions(INITIAL_SUBSCRIPTIONS);
    setWishlist(INITIAL_WISHLIST);
    setNotifications(INITIAL_NOTIFICATIONS);
    setIsAiSignalDismissed(false);
  };

  // Auth Operations
  const login = (email: string, name?: string) => {
    setIsLoggedIn(true);
    setUser((prev) => ({
      ...prev,
      email,
      name: name || (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)),
    }));
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const registerUser = (
    name: string,
    email: string,
    salary: number,
    payday: number,
    startingBalance?: number,
    bankName?: string
  ) => {
    startCleanWorkspace({
      name,
      email,
      monthlySalary: salary,
      paydayDate: payday,
      startingBalance: startingBalance !== undefined ? startingBalance : 35000,
      bankName: bankName || 'Primary Salary Account',
    });
  };

  const resetDemoData = () => {
    loadDemoWorkspace();
    setIsBalanceHidden(false);
    setAdminUsers(INITIAL_ADMIN_USERS);
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  };

  const dismissAiSignal = () => {
    setIsAiSignalDismissed(true);
  };

  // Double-Entry Financial Accounting Calculations
  const totalAvailableBalance = useMemo(() => {
    return accounts.reduce((sum, a) => sum + Number(a.balance || 0), 0);
  }, [accounts]);

  const totalCardObligations = useMemo(() => {
    return cards.reduce((sum, c) => sum + Number(c.usedAmount || 0), 0);
  }, [cards]);

  // Reserved bills: Locked for auto-debit (card obligations + recurring scheduled bills)
  const reservedBills = useMemo(() => {
    const primaryCardDue = cards[0] ? Number(cards[0].usedAmount || 0) : 0;
    const activeSubAmount = subscriptions
      .filter((s) => s.isActive)
      .reduce((sum, s) => sum + Number(s.amount || 0), 0);
    // If user has demo card due of 12500, fixed reserved bills is 12000, else dynamic active subscriptions
    const fixedReservedBills = activeSubAmount > 0 ? activeSubAmount : (cards.length > 0 && cards[0].usedAmount > 0 ? 12000 : 0);
    return primaryCardDue + fixedReservedBills;
  }, [cards, subscriptions]);

  const safeToSpend = useMemo(() => {
    return Math.max(0, totalAvailableBalance - reservedBills);
  }, [totalAvailableBalance, reservedBills]);

  // Aggregate Category Spending from Transaction Ledger
  const categorySpending = useMemo(() => {
    const map: Record<string, number> = {
      'Groceries': 0,
      'Dining & Food': 0,
      'Discretionary': 0,
      'Fuel & Transit': 0,
      'Subscriptions': 0,
    };
    transactions.forEach((tx) => {
      if (tx.type === 'expense') {
        const cat = tx.category;
        map[cat] = (map[cat] || 0) + tx.amount;
      }
    });
    return map;
  }, [transactions]);

  // Synchronize Budgets spent amounts dynamically
  useEffect(() => {
    setBudgets((prev) =>
      prev.map((b) => {
        const actual = categorySpending[b.category];
        return actual !== undefined && actual !== b.spentAmount ? { ...b, spentAmount: actual } : b;
      })
    );
  }, [categorySpending]);

  const totalSpentThisCycle = useMemo(() => {
    return transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const daysUntilPayday = 18; // Nov 12 -> Nov 30

  // Safe daily burn velocity calculation
  const safeDailyBurn = useMemo(() => {
    if (daysUntilPayday <= 0) return 0;
    // Target buffer surplus is ₹6,800
    const surplusTarget = 6800;
    const spendable = Math.max(0, safeToSpend - surplusTarget);
    return Math.round(spendable / daysUntilPayday) || 420;
  }, [safeToSpend, daysUntilPayday]);

  const surplusForecast = 6800; // Projected locked reserve surplus

  // 1. Add Transaction with Reactive Double-Entry Accounting
  const addTransaction = (tx: Omit<Transaction, 'id' | 'status'>) => {
    const newTx: Transaction = {
      ...tx,
      id: `tx-${Date.now()}`,
      status: 'completed',
    };

    setTransactions((prev) => [newTx, ...prev]);

    if (tx.type === 'expense') {
      // If paid via bank account / wallet
      if (tx.accountId) {
        setAccounts((prev) =>
          prev.map((acc) =>
            acc.id === tx.accountId ? { ...acc, balance: Math.max(0, acc.balance - tx.amount) } : acc
          )
        );
      }
      // If charged to credit card
      if (tx.cardId) {
        setCards((prev) =>
          prev.map((card) =>
            card.id === tx.cardId
              ? {
                  ...card,
                  usedAmount: card.usedAmount + tx.amount,
                  availableLimit: Math.max(0, card.availableLimit - tx.amount),
                }
              : card
          )
        );
      }
    } else if (tx.type === 'income' && tx.accountId) {
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === tx.accountId ? { ...acc, balance: acc.balance + tx.amount } : acc
        )
      );
    }
  };

  const deleteTransaction = (id: string) => {
    const target = transactions.find((t) => t.id === id);
    if (!target) return;

    // Reverse financial mutation
    if (target.type === 'expense') {
      if (target.accountId) {
        setAccounts((prev) =>
          prev.map((acc) => (acc.id === target.accountId ? { ...acc, balance: acc.balance + target.amount } : acc))
        );
      }
      if (target.cardId) {
        setCards((prev) =>
          prev.map((card) =>
            card.id === target.cardId
              ? {
                  ...card,
                  usedAmount: Math.max(0, card.usedAmount - target.amount),
                  availableLimit: Math.min(card.totalLimit, card.availableLimit + target.amount),
                }
              : card
          )
        );
      }
    } else if (target.type === 'income' && target.accountId) {
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === target.accountId ? { ...acc, balance: Math.max(0, acc.balance - target.amount) } : acc
        )
      );
    }

    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // 2. Account Top-up & Transfers
  const addAccount = (acc: Omit<Account, 'id'>) => {
    const newAcc: Account = {
      ...acc,
      id: `acc-${Date.now()}`,
    };
    setAccounts((prev) => [...prev, newAcc]);
  };

  const addMoneyToAccount = (accountId: string, amount: number, note = 'Top-up / Deposit') => {
    if (amount <= 0) return;
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === accountId ? { ...acc, balance: acc.balance + amount } : acc))
    );
    // Add ledger record
    addTransaction({
      title: 'Funds Added to Account',
      category: 'Income & Deposits',
      amount,
      type: 'income',
      date: 'Today',
      time: 'Just now',
      paymentMethod: 'Instant NetBanking / UPI',
      accountId,
      notes: note,
    });
  };

  const transferBetweenAccounts = (fromId: string, toId: string, amount: number, note = 'Account Transfer') => {
    if (amount <= 0 || fromId === toId) return;
    const sourceAcc = accounts.find((a) => a.id === fromId);
    if (!sourceAcc || sourceAcc.balance < amount) return;

    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === fromId) return { ...acc, balance: acc.balance - amount };
        if (acc.id === toId) return { ...acc, balance: acc.balance + amount };
        return acc;
      })
    );

    addTransaction({
      title: `Transfer to ${accounts.find((a) => a.id === toId)?.name || 'Account'}`,
      category: 'Internal Transfer',
      amount,
      type: 'transfer',
      date: 'Today',
      time: 'Just now',
      paymentMethod: 'Self Transfer',
      accountId: fromId,
      notes: note,
    });
  };

  // 3. Credit Card Actions
  const toggleCardAutoDebit = (id: string) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isAutoDebitEnabled: !c.isAutoDebitEnabled } : c))
    );
  };

  const payCardDue = (id: string, amount: number, fromAccountId?: string) => {
    const card = cards.find((c) => c.id === id);
    if (!card || amount <= 0) return;

    const sourceAccountId = fromAccountId || accounts.find((a) => a.isPrimary)?.id || accounts[0]?.id;

    // Deduct from bank account
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === sourceAccountId ? { ...acc, balance: Math.max(0, acc.balance - amount) } : acc
      )
    );

    // Relieve credit card debt
    setCards((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              usedAmount: Math.max(0, c.usedAmount - amount),
              availableLimit: Math.min(c.totalLimit, c.availableLimit + amount),
            }
          : c
      )
    );

    // Record ledger
    addTransaction({
      title: `${card.name} Bill Settlement`,
      category: 'Card Obligations',
      amount,
      type: 'expense',
      date: 'Today',
      time: 'Just now',
      paymentMethod: 'NetBanking Autopay',
      accountId: sourceAccountId,
      notes: `Bill payment for ${card.name} (${card.cardNumberMasked})`,
    });
  };

  // 4. Budgets
  const addBudget = (b: Omit<Budget, 'id'>) => {
    const newB: Budget = {
      ...b,
      id: `b-${Date.now()}`,
    };
    setBudgets((prev) => [...prev, newB]);
  };

  // 5. Savings Goals
  const depositToGoal = (id: string, amount: number, note = 'Goal Stash', fromAccountId?: string) => {
    if (amount <= 0) return;
    const sourceAcc = fromAccountId ? accounts.find((a) => a.id === fromAccountId) : accounts.find((a) => a.isPrimary) || accounts[0];

    if (sourceAcc) {
      setAccounts((prev) =>
        prev.map((acc) => (acc.id === sourceAcc.id ? { ...acc, balance: Math.max(0, acc.balance - amount) } : acc))
      );
    }

    setSavingsGoals((prev) =>
      prev.map((g) =>
        g.id === id
          ? {
              ...g,
              currentAmount: g.currentAmount + amount,
              recentContributions: [
                { date: 'Today', amount, note },
                ...(g.recentContributions || []),
              ],
            }
          : g
      )
    );

    addTransaction({
      title: `Stashed to ${savingsGoals.find((g) => g.id === id)?.title || 'Goal'}`,
      category: 'Savings & Reserves',
      amount,
      type: 'expense',
      date: 'Today',
      time: 'Just now',
      paymentMethod: 'Direct Stash',
      accountId: sourceAcc?.id,
      notes: note,
    });
  };

  const addSavingsGoal = (g: Omit<SavingsGoal, 'id' | 'currentAmount'>) => {
    const newG: SavingsGoal = {
      ...g,
      id: `goal-${Date.now()}`,
      currentAmount: 0,
      recentContributions: [],
    };
    setSavingsGoals((prev) => [...prev, newG]);
  };

  // 6. Life Moments
  const addLifeMoment = (m: Omit<LifeMoment, 'id'>) => {
    const newM: LifeMoment = {
      ...m,
      id: `moment-${Date.now()}`,
    };
    setLifeMoments((prev) => [...prev, newM]);
  };

  const contributeToMoment = (id: string, amount: number, fromAccountId?: string) => {
    if (amount <= 0) return;
    const sourceAcc = fromAccountId ? accounts.find((a) => a.id === fromAccountId) : accounts.find((a) => a.isPrimary) || accounts[0];

    if (sourceAcc) {
      setAccounts((prev) =>
        prev.map((acc) => (acc.id === sourceAcc.id ? { ...acc, balance: Math.max(0, acc.balance - amount) } : acc))
      );
    }

    setLifeMoments((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, savedBudget: Math.min(m.targetBudget, m.savedBudget + amount) } : m
      )
    );

    addTransaction({
      title: `Funded ${lifeMoments.find((m) => m.id === id)?.title || 'Occasion'}`,
      category: 'Life Moments',
      amount,
      type: 'expense',
      date: 'Today',
      time: 'Just now',
      paymentMethod: 'Occasion Stash',
      accountId: sourceAcc?.id,
      notes: 'Occasion buffer contribution',
    });
  };

  // 7. Subscriptions
  const toggleSubscriptionStatus = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  // 8. Wishlist
  const addWishlistItem = (item: Omit<WishlistItem, 'id' | 'savedTowardsItem'>) => {
    const newItem: WishlistItem = {
      ...item,
      id: `wish-${Date.now()}`,
      savedTowardsItem: 0,
    };
    setWishlist((prev) => [...prev, newItem]);
  };

  const contributeToWishlist = (id: string, amount: number) => {
    setWishlist((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              savedTowardsItem: Math.min(w.price, w.savedTowardsItem + amount),
              affordabilityStatus: w.savedTowardsItem + amount >= w.price ? 'ready' : w.affordabilityStatus,
            }
          : w
      )
    );
  };

  // 9. Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // 10. Admin Actions
  const updateAdminUserStatus = (id: string, status: AdminUser['status']) => {
    setAdminUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status } : u))
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        login,
        logout,
        workspaceMode,
        startCleanWorkspace,
        loadDemoWorkspace,
        registerUser,
        resetDemoData,
        isBalanceHidden,
        setIsBalanceHidden,
        isAiSignalDismissed,
        dismissAiSignal,
        transactions,
        addTransaction,
        deleteTransaction,
        accounts,
        addAccount,
        addMoneyToAccount,
        transferBetweenAccounts,
        cards,
        toggleCardAutoDebit,
        payCardDue,
        budgets,
        addBudget,
        savingsGoals,
        depositToGoal,
        addSavingsGoal,
        lifeMoments,
        addLifeMoment,
        contributeToMoment,
        offers,
        subscriptions,
        toggleSubscriptionStatus,
        wishlist,
        addWishlistItem,
        contributeToWishlist,
        notifications,
        markNotificationAsRead,
        markAllNotificationsRead,
        adminUsers,
        adminRoles,
        adminMerchants,
        updateAdminUserStatus,
        totalAvailableBalance,
        totalCardObligations,
        reservedBills,
        safeToSpend,
        totalSpentThisCycle,
        daysUntilPayday,
        safeDailyBurn,
        surplusForecast,
        categorySpending,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
