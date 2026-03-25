'use client';

import { ReactNode, useEffect, useState } from 'react';
import { AppFooter } from './app-footer';
import { AppHeader } from './app-header';
import { AppSidebar } from './app-sidebar';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const handleResize = () => {
      const mobile = mediaQuery.matches;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    handleResize();
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <AppSidebar
          isOpen={isSidebarOpen}
          isMobile={isMobile}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex min-h-screen flex-1 flex-col">
          <AppHeader
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          />

          <main className="flex-1">{children}</main>
          <AppFooter />
        </div>
      </div>
    </div>
  );
}