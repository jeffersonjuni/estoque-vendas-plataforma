'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface Movement {
  id: string;
  type: 'IN' | 'OUT';
  quantity: number;
  reason?: string;
  createdAt: string;
  product: {
    name: string;
  };
}

interface StockHistoryProps {
  history: Movement[];
}

export function StockHistory({ history }: StockHistoryProps) {
  return (
    <>
      {/* MOBILE */}
      <div className="grid gap-4 md:hidden">
        {history.map((movement) => (
          <div
            key={movement.id}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-3"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium">{movement.product.name}</p>

                <Badge variant={movement.type === 'IN' ? 'success' : 'danger'}>
                  {movement.type === 'IN' ? 'Entrada' : 'Saída'}
                </Badge>
              </div>

              <p className="text-sm font-medium">
                Quantidade: {movement.quantity}
              </p>

              <p className="text-sm text-muted-foreground">
                {movement.reason || 'Sem motivo informado'}
              </p>

              <p className="text-xs text-muted-foreground">
                {new Date(movement.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold">Histórico de Movimentações</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-muted/50 text-left">
              <tr className="border-b border-border">
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4 text-center">Tipo</th>
                <th className="px-6 py-4 text-center">Quantidade</th>
                <th className="px-6 py-4">Motivo</th>
                <th className="px-6 py-4 text-center">Data</th>
              </tr>
            </thead>

            <tbody>
              {history.map((movement) => (
                <tr
                  key={movement.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">{movement.product.name}</td>

                  <td className="px-6 py-4 text-center">
                    <Badge
                      variant={movement.type === 'IN' ? 'success' : 'danger'}
                    >
                      {movement.type === 'IN' ? 'Entrada' : 'Saída'}
                    </Badge>
                  </td>

                  <td className="px-6 py-4 text-center font-medium">
                    {movement.quantity}
                  </td>

                  <td className="px-6 py-4">{movement.reason || '—'}</td>

                  <td className="px-6 py-4 text-center">
                    {new Date(movement.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
