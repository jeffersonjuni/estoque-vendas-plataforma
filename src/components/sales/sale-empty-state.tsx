'use client';

import { ShoppingCart, Plus } from 'lucide-react';
import Link from 'next/link';

export function SaleEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
      <div className="mb-4 rounded-full bg-muted p-4">
        <ShoppingCart className="h-10 w-10 text-muted-foreground" />
      </div>

      <h2 className="text-xl font-semibold text-foreground">
        Nenhum produto disponível para venda
      </h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Cadastre produtos com estoque disponível para começar a realizar vendas.
      </p>

      <Link
        href="/produtos/novo"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
      >
        <Plus className="h-4 w-4" />
        Cadastrar produto
      </Link>
    </div>
  );
}