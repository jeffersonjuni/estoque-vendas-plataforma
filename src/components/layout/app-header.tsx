import { ThemeToggle } from '@/components/theme/theme-toggle';

type AppHeaderProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export function AppHeader({
  isSidebarOpen,
  onToggleSidebar,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          {isSidebarOpen ? '✕' : '☰'}
        </button>

        <div>
          <h2 className="text-lg font-semibold text-foreground">Painel</h2>
          <p className="text-sm text-muted-foreground">
            Visão geral da plataforma
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        <div className="rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">
          Jefferson Junior
        </div>

        <button
          type="button"
          className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          Sair
        </button>
      </div>
    </header>
  );
}