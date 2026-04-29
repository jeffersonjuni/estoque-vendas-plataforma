'use client';

import Link from 'next/link';
import { PackageSearch, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProductEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
      <div className="mb-4 rounded-full bg-muted p-4">
        <PackageSearch className="h-10 w-10 text-muted-foreground" />
      </div>

      <h2 className="text-xl font-semibold text-foreground">
        Nenhum produto cadastrado
      </h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Você ainda não possui produtos cadastrados. Cadastre seu primeiro
        produto para começar a gerenciar seu estoque.
      </p>

      <Link href="/produtos/novo" className="mt-6">
        <Button>
          <Plus className="h-4 w-4" />
          Cadastrar produto
        </Button>
      </Link>
    </div>
  );
}