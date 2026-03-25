'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/' },
  { label: 'Produtos', href: '/produtos' },
  { label: 'Estoque', href: '/estoque' },
  { label: 'Vendas', href: '/vendas' },
  { label: 'Relatórios', href: '/relatorios' },
  { label: 'Configurações', href: '/configuracoes' },
];

type AppSidebarProps = {
  isOpen: boolean;
};

export function AppSidebar({ isOpen }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`hidden shrink-0 overflow-hidden border-r border-border bg-card transition-all duration-300 ease-in-out md:flex md:flex-col ${
        isOpen
          ? 'w-64 translate-x-0 opacity-100'
          : 'w-0 -translate-x-4 opacity-0'
      }`}
    >
      <div
        className={`flex h-full flex-col px-4 py-6 transition-opacity duration-200 ${
          isOpen ? 'opacity-100 delay-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="mb-8 whitespace-nowrap">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            StockSales
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Controle de Estoque e Vendas
          </p>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}