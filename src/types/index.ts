export type UserRole = 'user' | 'admin' | 'superadmin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  isPro: boolean;
  avatar: string;
  currency: string;
  monthlySalary: number;
  paydayDate: number; // day of month (e.g. 30)
  cycleStartDay: number;
  cycleEndDay: number;
}

export type TransactionType = 'expense' | 'income' | 'transfer';

export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: TransactionType;
  date: string;
  time?: string;
  paymentMethod: string;
  accountId?: string;
  cardId?: string;
  notes?: string;
  isRecurring?: boolean;
  cashbackEarned?: number;
  tags?: string[];
  status: 'completed' | 'pending' | 'cleared';
}

export interface Account {
  id: string;
  name: string;
  type: 'bank' | 'wallet' | 'cash' | 'investment';
  accountNumberMasked: string;
  institution: string;
  balance: number;
  color: string;
  isPrimary?: boolean;
  lastSynced?: string;
}

export interface CreditCard {
  id: string;
  name: string;
  bank: string;
  cardNumberMasked: string;
  cardNetwork: 'visa' | 'mastercard' | 'rupay' | 'amex';
  tier: string;
  totalLimit: number;
  usedAmount: number;
  availableLimit: number;
  dueDate: string;
  billingCycle: string;
  apr: number;
  rewardPoints: number;
  cashbackRate: string;
  colorTheme: string;
  isAutoDebitEnabled: boolean;
}

export interface Budget {
  id: string;
  category: string;
  allocatedAmount: number;
  spentAmount: number;
  period: 'monthly' | 'weekly';
  alertThresholdPercent: number;
  icon: string;
  color: string;
}

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: 'travel' | 'emergency' | 'gadget' | 'home' | 'education' | 'general';
  autoSaveMonthly: number;
  isLocked: boolean;
  notes: string;
  recentContributions?: { date: string; amount: number; note: string }[];
}

export interface LifeMoment {
  id: string;
  title: string;
  date: string;
  daysRemaining: number;
  targetBudget: number;
  savedBudget: number;
  category: 'anniversary' | 'birthday' | 'holiday' | 'festival' | 'wedding' | 'personal';
  giftIdeas: string[];
  status: 'planning' | 'funded' | 'completed';
  notes: string;
}

export interface Offer {
  id: string;
  merchant: string;
  title: string;
  discount: string;
  applicableCard: string;
  minSpend: number;
  validUntil: string;
  category: 'dining' | 'travel' | 'shopping' | 'groceries' | 'fuel' | 'entertainment';
  code: string;
  terms: string;
  popularity: number;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'yearly';
  nextBillingDate: string;
  paymentMethod: string;
  category: string;
  isActive: boolean;
  icon: string;
}

export interface WishlistItem {
  id: string;
  title: string;
  price: number;
  priority: 'low' | 'medium' | 'high';
  targetPurchaseMonth: string;
  affordabilityStatus: 'ready' | 'save-more' | 'wait-sale';
  savedTowardsItem: number;
  url?: string;
  notes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'success' | 'tip' | 'billing';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'User' | 'Manager' | 'Admin' | 'Auditor';
  status: 'Active' | 'Suspended' | 'Pending';
  joinedDate: string;
  lastLogin: string;
  transactionsCount: number;
  totalBalanceTracked: number;
}

export interface AdminRole {
  id: string;
  name: string;
  description: string;
  usersCount: number;
  permissions: string[];
}

export interface AdminMerchant {
  id: string;
  name: string;
  category: string;
  activeCampaigns: number;
  partnershipTier: 'Gold' | 'Silver' | 'Platinum' | 'Standard';
  avgDiscount: string;
  status: 'Active' | 'Under Review';
}
