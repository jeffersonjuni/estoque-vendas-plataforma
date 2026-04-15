'use client';

import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type Props = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export function SaleProductList({ products, onAddToCart }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <Card key={product.id} className="p-5 space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{product.name}</h3>

            <p className="text-sm text-muted-foreground">
              {product.description || 'Sem descrição'}
            </p>
          </div>

          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">Categoria:</span>{' '}
              {product.category || '—'}
            </p>

            <p>
              <span className="font-medium">Estoque:</span> {product.stock}
            </p>

            <p className="font-semibold text-primary">
              {Number(product.price).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          </div>

          <Button className="w-full" onClick={() => onAddToCart(product)}>
            Adicionar ao Carrinho
          </Button>
        </Card>
      ))}
    </div>
  );
}