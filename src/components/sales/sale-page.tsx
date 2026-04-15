'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Product } from '@/types/product';

import { getProductsClient } from '@/services/product/get-products-client';

import { SaleLoading } from './sale-loading';
import { SaleEmptyState } from './sale-empty-state';
import { SaleProductList } from './sale-product-list';
import { SaleCart, CartItem } from './sale-cart';
import { SaleSummary } from './sale-summary';
import { createSaleClient } from '@/services/sales/create-sale-client';

export function SalesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const totalCartItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const totalSaleValue = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }, [cart]);

  const handleAddToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.productId === product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity:
                  item.quantity < item.stock
                    ? item.quantity + 1
                    : item.quantity,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: Number(product.price),
          stock: product.stock,
          quantity: 1,
        },
      ];
    });
  }, []);

  const handleIncrease = useCallback((productId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  const handleDecrease = useCallback((productId: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const handleRemove = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  async function handleCheckout() {
    if (cart.length === 0) return;

    try {
      setError('');
      setIsSubmitting(true);

      await createSaleClient({
        items: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      });

      setSuccessMessage('Venda realizada com sucesso!');

      setCart([]);

      await loadProducts();

      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : 'Erro ao finalizar venda.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const data = await getProductsClient();

      const availableProducts = data.filter((product) => product.stock > 0);

      setProducts(availableProducts);
    } catch (error) {
      console.error(error);
      setError('Não foi possível carregar os produtos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (isLoading) return <SaleLoading />;

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return <SaleEmptyState />;
  }

  return (
    <div className="space-y-6">
      {successMessage && (
        <div className="fixed bottom-4 right-4 z-50 rounded-xl bg-emerald-500 px-4 py-2 text-white shadow">
          {successMessage}
        </div>
      )}

      <h1 className="text-2xl font-bold">Vendas</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-3 flex justify-between">
            <span className="text-sm text-muted-foreground">
              Produtos disponíveis
            </span>
          </div>
          <strong className="text-2xl font-bold">{products.length}</strong>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-3 flex justify-between">
            <span className="text-sm text-muted-foreground">
              Itens no carrinho
            </span>
          </div>
          <strong className="text-2xl font-bold">{totalCartItems}</strong>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-3 flex justify-between">
            <span className="text-sm text-muted-foreground">
              Total da venda
            </span>
          </div>
          <strong className="text-2xl font-bold">
            {totalSaleValue.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </strong>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SaleProductList products={products} onAddToCart={handleAddToCart} />
        </div>

        <div className="space-y-6">
          <SaleCart
            cart={cart}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
          />

          <SaleSummary
            totalItems={totalCartItems}
            totalValue={totalSaleValue}
            onCheckout={handleCheckout}
            loading={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
