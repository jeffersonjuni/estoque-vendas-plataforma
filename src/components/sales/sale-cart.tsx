'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  stock: number;
  quantity: number;
};

type Props = {
  cart: CartItem[];
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
};

export function SaleCart({
  cart,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  return (
    <Card className="p-5 space-y-5">
      <h2 className="text-lg font-semibold">Carrinho</h2>

      {cart.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">
          Nenhum item adicionado.
        </p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => {
            const subtotal = item.price * item.quantity;

            return (
              <div
                key={item.productId}
                className="rounded-xl border border-border p-4 space-y-3 hover:bg-muted/30 transition"
              >
                {/* HEADER */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-medium text-foreground">
                      {item.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {item.quantity}x{' '}
                      {item.price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => onRemove(item.productId)}
                  >
                    Remover
                  </Button>
                </div>

                {/* CONTROLES */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onDecrease(item.productId)}
                    >
                      -
                    </Button>

                    <span className="min-w-[32px] text-center font-medium">
                      {item.quantity}
                    </span>

                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onIncrease(item.productId)}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </Button>
                  </div>

                  {/* SUBTOTAL */}
                  <span className="text-sm font-semibold text-primary">
                    {subtotal.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}