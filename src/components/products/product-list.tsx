"use client";

import { Boxes, Package, WalletCards } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { getProductsClient } from "@/services/product/get-products-client";
import { Product } from "@/types/product";

import { ProductCardList } from "./product-card-list";
import { ProductEmptyState } from "./product-empty-state";
import { ProductLoading } from "./product-loading";
import { ProductTable } from "./product-table";

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getProductsClient();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("Não foi possível carregar os produtos.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const totalProducts = products.length;

  const totalStock = useMemo(() => {
    return products.reduce((acc, product) => acc + product.stock, 0);
  }, [products]);

  const totalStockValue = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.stock;
    }, 0);
  }, [products]);

  if (isLoading) {
    return <ProductLoading />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return <ProductEmptyState />;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total de produtos</span>
            <Package className="h-5 w-5 text-muted-foreground" />
          </div>
          <strong className="text-2xl font-bold text-foreground">
            {totalProducts}
          </strong>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Itens em estoque</span>
            <Boxes className="h-5 w-5 text-muted-foreground" />
          </div>
          <strong className="text-2xl font-bold text-foreground">
            {totalStock}
          </strong>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:col-span-2 xl:col-span-1">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Valor estimado</span>
            <WalletCards className="h-5 w-5 text-muted-foreground" />
          </div>
          <strong className="text-2xl font-bold text-foreground">
            {totalStockValue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>
        </div>
      </div>

      <div className="space-y-4">
        <ProductCardList products={products} />
        <ProductTable products={products} />
      </div>
    </div>
  );
}