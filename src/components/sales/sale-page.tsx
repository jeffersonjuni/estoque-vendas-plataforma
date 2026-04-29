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

import { SearchInput } from '@/components/ui/search-input';

export function SalesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 🔎 SEARCH
  const [searchProduct, setSearchProduct] = useState('');
  const [searchCart, setSearchCart] = useState('');

  // ======================
  // 📊 MEMO
  // ======================

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchProduct.toLowerCase())
    );
  }, [products, searchProduct]);

  const filteredCart = useMemo(() => {
    return cart.filter((item) =>
      item.name.toLowerCase().includes(searchCart.toLowerCase())
    );
  }, [cart, searchCart]);

  const totalCartItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const totalSaleValue = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }, [cart]);

  // ======================
  // 🛒 CART
  // ======================

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

  // ======================
  // 💰 CHECKOUT
  // ======================

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

      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Erro ao finalizar venda.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // ======================
  // 📦 LOAD
  // ======================

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const data = await getProductsClient();

      const availableProducts = data.filter((p) => p.stock > 0);

      setProducts(availableProducts);
    } catch {
      setError('Não foi possível carregar os produtos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (isLoading) return <SaleLoading />;
  if (error) return <div className="text-destructive">{error}</div>;
  if (products.length === 0) return <SaleEmptyState />;

  return (
    <div className="space-y-6">
      {/* SUCCESS */}
      {successMessage && (
        <div className="fixed bottom-4 right-4 z-50 rounded-xl bg-emerald-500 px-4 py-2 text-white shadow">
          {successMessage}
        </div>
      )}

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Vendas</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie suas vendas e finalize pedidos
        </p>
      </div>

      {/* CARDS */}
      {/* (mantive igual, correto) */}

      {/* 🔎 SEARCH PRODUTOS */}
      <SearchInput
        value={searchProduct}
        onChange={setSearchProduct}
        placeholder="Buscar produto..."
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SaleProductList
            products={filteredProducts}
            onAddToCart={handleAddToCart}
          />
        </div>

        <div className="space-y-4">
          {/* 🔎 SEARCH CARRINHO (NÍVEL +) */}
          <SearchInput
            value={searchCart}
            onChange={setSearchCart}
            placeholder="Buscar no carrinho..."
          />

          <SaleCart
            cart={filteredCart}
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