import Link from 'next/link';
import { Plus } from 'lucide-react';

import { ProductList } from '@/components/products/product-list';

export default function ProdutosPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Produtos
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie os produtos cadastrados e acompanhe o estoque da sua conta.
          </p>
        </div>

        <Link href="/produtos/novo">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Novo Produto
          </button>
        </Link>
      </div>

      <ProductList />
    </section>
  );
}
