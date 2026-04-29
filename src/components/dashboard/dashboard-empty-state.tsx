import { BarChart3 } from 'lucide-react';

export function DashboardEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border p-10 text-center">
      <BarChart3 className="mb-4 h-10 w-10 text-muted-foreground" />

      <h2 className="text-lg font-semibold">
        Nenhum dado disponível
      </h2>

      <p className="text-sm text-muted-foreground">
        Realize vendas para começar a visualizar métricas.
      </p>
    </div>
  );
}