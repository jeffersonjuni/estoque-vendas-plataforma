'use client';

import { useState } from 'react';
import { Menu, LogOut, User, Bell, Settings } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { useAlerts } from '@/hooks/use-alert';
import { Modal } from '@/components/ui/modal';

type AppHeaderProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export function AppHeader({ onToggleSidebar }: AppHeaderProps) {
  const { data: session } = useSession();
  const { alerts } = useAlerts();

  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const userName = session?.user?.name ?? 'Usuário';
  const userEmail = session?.user?.email ?? '';

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          {/* 🔹 ESQUERDA */}
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

          {/* 🔹 DIREITA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 🔔 ALERTS */}
            <div className="relative">
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>

              {alerts.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                  {alerts.length}
                </span>
              )}
            </div>

            {/* 🌙 THEME */}
            <ThemeToggle />

            {/* 👤 USER - DESKTOP */}
            <div className="hidden sm:flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-4 w-4" />
              </div>

              <div className="max-w-40">
                <p className="truncate text-sm font-semibold text-foreground">
                  {userName}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {userEmail}
                </p>
              </div>
            </div>

            {/* 👤 USER - MOBILE */}
            <div className="relative sm:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpenUserMenu((prev) => !prev)}
              >
                <User className="h-4 w-4" />
              </Button>

              {openUserMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card p-3 shadow-lg">
                  <div className="mb-3">
                    <p className="text-sm font-semibold">{userName}</p>
                    <p className="text-xs text-muted-foreground">{userEmail}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    {/* ⚙️ CONFIGURAÇÕES (único no menu mobile) */}
                    <Link
                      href="/configuracoes"
                      onClick={() => setOpenUserMenu(false)}
                    >
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        Configurações
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 🚪 LOGOUT - GLOBAL (mobile + desktop) */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpenLogoutModal(true)}
              className="flex items-center"
            >
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      {/* ⚠️ MODAL LOGOUT */}
      <Modal
        open={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
        title="Sair do sistema"
        description="Tem certeza que deseja sair da sua conta?"
        onConfirm={() => signOut({ callbackUrl: '/' })}
      >
        <p className="text-sm text-muted-foreground">
          Você precisará fazer login novamente para acessar o sistema.
        </p>
      </Modal>
    </>
  );
}
