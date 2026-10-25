/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { AppProvider } from './context/AppContext';
import { UserLayout } from './components/layout/UserLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { PublicLayout } from './components/layout/PublicLayout';

// Public Screens
import { LandingPage } from './pages/public/Landing';
import { LoginPage, RegisterPage, ForgotPasswordPage, OnboardingPage } from './pages/public/AuthPages';

// User Screens
import { UserDashboardPage } from './pages/user/UserDashboard';
import {
  TransactionsPage,
  AddTransactionPage,
  SalaryIncomePage,
  AccountsPage,
  CategoriesPage,
  BudgetsPage,
} from './pages/user/DailyFinancePages';
import {
  CardsPage,
  CardDetailsPage,
  SavingsPage,
  GoalDetailsPage,
  LifeMomentsPage,
  MomentDetailsPage,
} from './pages/user/CardsSavingsPages';
import {
  AnalyticsPage,
  OffersPage,
  OfferDetailsPage,
  PaymentAdvisorPage,
  AIAssistantPage,
  WellnessPage,
} from './pages/user/IntelligencePages';
import {
  CalendarPage,
  SubscriptionsPage,
  NotificationsPage,
  WishlistPage,
  SettingsPage,
} from './pages/user/PlanningSettingsPages';

// Admin Screens
import {
  AdminDashboardPage,
  AdminUsersPage,
  AdminRolesPage,
  AdminCategoriesPage,
  AdminCardsCatalogPage,
  AdminMerchantsPage,
  AdminOffersPage,
  AdminIntegrationsPage,
  AdminNotificationsPage,
  AdminAIPage,
  AdminAnalyticsPage,
  AdminSecurityPage,
  AdminSettingsPage,
} from './pages/admin/AdminPages';

function AppRoutes() {
  const { currentPath } = useRouter();

  // 1. PUBLIC AND AUTH SCREENS
  if (currentPath === '/') {
    return (
      <PublicLayout>
        <LandingPage />
      </PublicLayout>
    );
  }
  if (currentPath === '/login') {
    return (
      <PublicLayout>
        <LoginPage />
      </PublicLayout>
    );
  }
  if (currentPath === '/register') {
    return (
      <PublicLayout>
        <RegisterPage />
      </PublicLayout>
    );
  }
  if (currentPath === '/forgot-password') {
    return (
      <PublicLayout>
        <ForgotPasswordPage />
      </PublicLayout>
    );
  }
  if (currentPath === '/onboarding') {
    return (
      <PublicLayout>
        <OnboardingPage />
      </PublicLayout>
    );
  }

  // 2. ADMIN PANEL SCREENS
  if (currentPath.startsWith('/admin')) {
    let adminComponent = <AdminDashboardPage />;

    if (currentPath === '/admin/dashboard') {
      adminComponent = <AdminDashboardPage />;
    } else if (currentPath === '/admin/users') {
      adminComponent = <AdminUsersPage />;
    } else if (currentPath === '/admin/roles') {
      adminComponent = <AdminRolesPage />;
    } else if (currentPath === '/admin/categories') {
      adminComponent = <AdminCategoriesPage />;
    } else if (currentPath === '/admin/cards') {
      adminComponent = <AdminCardsCatalogPage />;
    } else if (currentPath === '/admin/merchants') {
      adminComponent = <AdminMerchantsPage />;
    } else if (currentPath === '/admin/offers') {
      adminComponent = <AdminOffersPage />;
    } else if (currentPath === '/admin/integrations') {
      adminComponent = <AdminIntegrationsPage />;
    } else if (currentPath === '/admin/notifications') {
      adminComponent = <AdminNotificationsPage />;
    } else if (currentPath === '/admin/ai') {
      adminComponent = <AdminAIPage />;
    } else if (currentPath === '/admin/analytics') {
      adminComponent = <AdminAnalyticsPage />;
    } else if (currentPath === '/admin/security') {
      adminComponent = <AdminSecurityPage />;
    } else if (currentPath === '/admin/settings') {
      adminComponent = <AdminSettingsPage />;
    }

    return <AdminLayout>{adminComponent}</AdminLayout>;
  }

  // 3. USER PANEL SCREENS
  let userComponent = <UserDashboardPage />;

  if (currentPath === '/app/dashboard' || currentPath === '/app') {
    userComponent = <UserDashboardPage />;
  } else if (currentPath === '/app/transactions') {
    userComponent = <TransactionsPage />;
  } else if (currentPath === '/app/transactions/new') {
    userComponent = <AddTransactionPage />;
  } else if (currentPath === '/app/income') {
    userComponent = <SalaryIncomePage />;
  } else if (currentPath === '/app/accounts') {
    userComponent = <AccountsPage />;
  } else if (currentPath === '/app/categories') {
    userComponent = <CategoriesPage />;
  } else if (currentPath === '/app/budgets') {
    userComponent = <BudgetsPage />;
  } else if (currentPath === '/app/cards') {
    userComponent = <CardsPage />;
  } else if (currentPath.startsWith('/app/cards/')) {
    userComponent = <CardDetailsPage />;
  } else if (currentPath === '/app/savings') {
    userComponent = <SavingsPage />;
  } else if (currentPath.startsWith('/app/savings/')) {
    userComponent = <GoalDetailsPage />;
  } else if (currentPath === '/app/life-moments') {
    userComponent = <LifeMomentsPage />;
  } else if (currentPath.startsWith('/app/life-moments/')) {
    userComponent = <MomentDetailsPage />;
  } else if (currentPath === '/app/analytics') {
    userComponent = <AnalyticsPage />;
  } else if (currentPath === '/app/offers') {
    userComponent = <OffersPage />;
  } else if (currentPath.startsWith('/app/offers/')) {
    userComponent = <OfferDetailsPage />;
  } else if (currentPath === '/app/payment-advisor') {
    userComponent = <PaymentAdvisorPage />;
  } else if (currentPath === '/app/assistant') {
    userComponent = <AIAssistantPage />;
  } else if (currentPath === '/app/calendar') {
    userComponent = <CalendarPage />;
  } else if (currentPath === '/app/subscriptions') {
    userComponent = <SubscriptionsPage />;
  } else if (currentPath === '/app/notifications') {
    userComponent = <NotificationsPage />;
  } else if (currentPath === '/app/wishlist') {
    userComponent = <WishlistPage />;
  } else if (currentPath === '/app/wellness') {
    userComponent = <WellnessPage />;
  } else if (currentPath === '/app/settings') {
    userComponent = <SettingsPage />;
  } else {
    // Default fallback to dashboard
    userComponent = <UserDashboardPage />;
  }

  return <UserLayout>{userComponent}</UserLayout>;
}

export default function App() {
  return (
    <RouterProvider initialPath="/app/dashboard">
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </RouterProvider>
  );
}
