"use client";

import { Menu, LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";

type AppHeaderProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export function AppHeader({
  onToggleSidebar,
}: AppHeaderProps) {
  const { data: session } = useSession();

  const userName = session?.user?.name ?? "Usuário";
  const userEmail = session?.user?.email ?? "";

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onToggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Plataforma
            </p>
            <h2 className="text-base font-semibold text-foreground">
              StockSales
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <div className="hidden items-center gap-3 rounded-xl border border-border bg-card px-3 py-2 sm:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-4 w-4" />
            </div>

            <div className="max-w-45">
              <p className="truncate text-sm font-semibold text-foreground">
                {userName}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {userEmail}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
}