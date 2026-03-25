import { ThemeToggle } from '@/components/theme/theme-toggle';

type AppHeaderProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export function AppHeader({ isSidebarOpen, onToggleSidebar }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          {isSidebarOpen ? '✕' : '☰'}
        </button>

        <div>
          <h2 className="text-base font-semibold text-foreground sm:text-lg">
            Painel
          </h2>
          <p className="hidden text-sm text-muted-foreground sm:block">
            Visão geral da plataforma
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <ThemeToggle />

        <div className="hidden rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground sm:block">
          Jefferson Junior
        </div>

        <button
          type="button"
          className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted sm:px-4"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
