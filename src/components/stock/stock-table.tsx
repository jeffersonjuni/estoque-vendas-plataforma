'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { StockMovementModal } from './stock-movement-modal';
import { StockCard } from './stock-card';

interface Product {
  id: string;
  name: string;
  stock: number;
}

interface StockTableProps {
  products: Product[];
  onRefresh: () => Promise<void>;
}

export function StockTable({ products, onRefresh }: StockTableProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [movementType, setMovementType] = useState<'IN' | 'OUT'>('IN');

  function openMovementModal(product: Product, type: 'IN' | 'OUT') {
    setSelectedProduct(product);
    setMovementType(type);
  }

  function closeModal() {
    setSelectedProduct(null);
  }

  return (
    <>
      {/* MOBILE */}
      <div className="grid gap-4 md:hidden">
        {products.map((product) => (
          <StockCard
            key={product.id}
            product={product}
            onEntry={() => openMovementModal(product, 'IN')}
            onExit={() => openMovementModal(product, 'OUT')}
          />
        ))}
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            {/* HEADER */}
            <thead className="bg-muted/50 text-left">
              <tr className="border-b border-border">
                <th className="px-6 py-4 font-medium text-muted-foreground">
                  Produto
                </th>

                <th className="px-6 py-4 font-medium text-center text-muted-foreground">
                  Estoque Atual
                </th>

                <th className="px-6 py-4">
                  <div className="flex w-full justify-end text-muted-foreground font-medium">
                    Ações
                  </div>
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  {/* PRODUTO */}
                  <td className="px-6 py-4">
                    <span className="font-medium text-foreground">
                      {product.name}
                    </span>
                  </td>

                  {/* ESTOQUE */}
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium">
                      {product.stock} un.
                    </span>
                  </td>

                  {/* AÇÕES */}
                  <td className="px-6 py-4">
                    <div className="flex w-full justify-end gap-2">
                      <Button
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => openMovementModal(product, 'IN')}
                      >
                        Entrada
                      </Button>

                      <Button
                        size="sm"
                        variant="danger"
                        className="cursor-pointer"
                        onClick={() => openMovementModal(product, 'OUT')}
                      >
                        Saída
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <StockMovementModal
          product={selectedProduct}
          type={movementType}
          onClose={closeModal}
          onSuccess={onRefresh}
        />
      )}
    </>
  );
}
