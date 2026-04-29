'use client';

import { Boxes, Package, WalletCards } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { getProductsClient } from '@/services/product/get-products-client';
import { Product } from '@/types/product';

import { ProductCardList } from './product-card-list';
import { ProductEmptyState } from './product-empty-state';
import { ProductLoading } from './product-loading';
import { ProductTable } from './product-table';
import { SearchInput } from '@/components/ui/search-input';

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  async function loadProducts() {
    try {
      setIsLoading(true);
      setError('');

      const data = await getProductsClient();
      setProducts(data);
    } catch (error) {
      console.error(error);
      setError('Não foi possível carregar os produtos.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  // 🔍 FILTRO GLOBAL
  const filteredProducts = useMemo(() => {
    const term = search.toLowerCase();

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(term) ||
        product.category?.toLowerCase().includes(term) ||
        product.sku?.toLowerCase().includes(term)
      );
    });
  }, [products, search]);

  const totalProducts = filteredProducts.length;

  const totalStock = useMemo(() => {
    return filteredProducts.reduce((acc, product) => acc + product.stock, 0);
  }, [filteredProducts]);

  const totalStockValue = useMemo(() => {
    return filteredProducts.reduce((acc, product) => {
      return acc + Number(product.price) * product.stock;
    }, 0);
  }, [filteredProducts]);

  if (isLoading) return <ProductLoading />;

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive">
        {error}
      </div>
    );
  }

 if (filteredProducts.length === 0) return <ProductEmptyState />;

  return (
    <div className="space-y-6">
      {/* 🔍 SEARCH */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h1 className="text-2xl font-bold">Produtos</h1>

        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nome, SKU ou categoria..."
        />
      </div>

      {/* CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-3 flex justify-between">
            <span className="text-sm text-muted-foreground">
              Total de produtos
            </span>
            <Package className="h-5 w-5 text-muted-foreground" />
          </div>
          <strong className="text-2xl font-bold">{totalProducts}</strong>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-3 flex justify-between">
            <span className="text-sm text-muted-foreground">
              Itens em estoque
            </span>
            <Boxes className="h-5 w-5 text-muted-foreground" />
          </div>
          <strong className="text-2xl font-bold">{totalStock}</strong>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-3 flex justify-between">
            <span className="text-sm text-muted-foreground">
              Valor estimado
            </span>
            <WalletCards className="h-5 w-5 text-muted-foreground" />
          </div>
          <strong className="text-2xl font-bold">
            {totalStockValue.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </strong>
        </div>
      </div>

      {/* LISTAS FILTRADAS */}
      <ProductCardList
        products={filteredProducts}
        reloadProducts={loadProducts}
      />

      <ProductTable
        products={filteredProducts}
        reloadProducts={loadProducts}
      />
    </div>
  );
}