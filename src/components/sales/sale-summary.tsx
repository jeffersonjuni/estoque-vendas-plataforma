'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Props = {
  totalItems: number;
  totalValue: number;
  onCheckout: () => void;
  loading?: boolean;
};

export function SaleSummary({
  totalItems,
  totalValue,
  onCheckout,
  loading,
}: Props) {
  return (
    <Card className="p-5 space-y-5">
      <h2 className="text-lg font-semibold">Resumo da Venda</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Itens</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between font-semibold text-base border-t pt-3">
          <span>Total</span>
          <span className="text-primary">
            {totalValue.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
      </div>

      <Button
        className="w-full"
        disabled={totalItems === 0 || loading}
        onClick={onCheckout}
      >
        {loading ? 'Finalizando...' : 'Finalizar Venda'}
      </Button>
    </Card>
  );
}