'use client';

import { ReactNode, useState } from 'react';
import { AppFooter } from './app-footer';
import { AppHeader } from './app-header';
import { AppSidebar } from './app-sidebar';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <AppSidebar isOpen={isSidebarOpen} />

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