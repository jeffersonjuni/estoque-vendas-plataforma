"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Produtos", href: "/produtos" },
  { label: "Estoque", href: "/estoque" },
  { label: "Vendas", href: "/vendas" },
  { label: "Exportar Relatórios", href: "/relatorios" },
  { label: "Configurações", href: "/configuracoes" },
];

type AppSidebarProps = {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
};

export function AppSidebar({
  isOpen,
  isMobile,
  onClose,
}: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isMobile && (
        <div
          onClick={onClose}
          className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        />
      )}

      <aside
        className={`z-50 flex shrink-0 flex-col overflow-hidden border-r border-border bg-card transition-all duration-300 ease-in-out ${
          isMobile
            ? `fixed inset-y-0 left-0 w-64 px-4 py-6 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : `${isOpen ? "w-64 px-4 py-6" : "w-0 px-0 py-0"} relative`
        }`}
      >
        <div
          className={`flex h-full flex-col transition-opacity duration-200 ${
            isOpen ? "opacity-100 delay-100" : "pointer-events-none opacity-0"
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
                  onClick={() => {
                    if (isMobile) onClose();
                  }}
                  className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}