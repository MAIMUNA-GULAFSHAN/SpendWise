import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  goBack: () => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

// Helper to extract path params e.g. /app/cards/card-1 matches /app/cards/:id -> { id: 'card-1' }
function matchRouteParams(pattern: string, actual: string): Record<string, string> | null {
  const patternSegments = pattern.split('/').filter(Boolean);
  const actualSegments = actual.split('/').filter(Boolean);

  if (patternSegments.length !== actualSegments.length) {
    return null;
  }

  const params: Record<string, string> = {};
  for (let i = 0; i < patternSegments.length; i++) {
    const p = patternSegments[i];
    const a = actualSegments[i];
    if (p.startsWith(':')) {
      params[p.slice(1)] = a;
    } else if (p !== a) {
      return null;
    }
  }

  return params;
}

export function RouterProvider({ children, initialPath = '/app/dashboard' }: { children: ReactNode; initialPath?: string }) {
  // Use window.location.pathname if valid, otherwise fallback to initialPath
  const getInitialPath = () => {
    if (typeof window !== 'undefined' && window.location.pathname && window.location.pathname !== '/') {
      return window.location.pathname;
    }
    return initialPath;
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/app/dashboard');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL and state
  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  // Derive parameters for parameterized routes
  useEffect(() => {
    const knownParamRoutes = [
      '/app/cards/:id',
      '/app/savings/:id',
      '/app/life-moments/:id',
      '/app/offers/:id',
    ];

    for (const pattern of knownParamRoutes) {
      const matched = matchRouteParams(pattern, currentPath);
      if (matched) {
        setParams(matched);
        return;
      }
    }
    setParams({});
  }, [currentPath]);

  return (
    <RouterContext.Provider value={{ currentPath, navigate, goBack, params }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

export function Link({
  to,
  children,
  className = '',
  activeClassName = '',
  onClick,
  ...props
}: {
  to: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: any;
}) {
  const { currentPath, navigate } = useRouter();
  const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to) && to !== '/app');

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={`${className} ${isActive ? activeClassName : ''}`}
      {...props}
    >
      {children}
    </a>
  );
}
