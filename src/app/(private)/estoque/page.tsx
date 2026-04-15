'use client';

import { useEffect, useState } from 'react';

import { StockSummary } from '@/components/stock/stock-summary';
import { StockTable } from '@/components/stock/stock-table';
import { StockHistory } from '@/components/stock/stock-history';

interface Product {
  id: string;
  name: string;
  stock: number;
}

interface Movement {
  id: string;
  type: 'IN' | 'OUT';
  quantity: number;
  reason?: string;
  createdAt: string;
  product: {
    name: string;
  };
}

export default function EstoquePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [history, setHistory] = useState<Movement[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const [productsRes, historyRes] = await Promise.all([
      fetch('/api/products'),
      fetch('/api/stock/history'),
    ]);

    const productsData = await productsRes.json();
    const historyData = await historyRes.json();

    setProducts(productsData);
    setHistory(Array.isArray(historyData.data) ? historyData.data : []);
  }

  return (
    <div className="space-y-6">
      <StockSummary products={products} history={history} />

      <StockTable products={products} onRefresh={fetchData} />

      <StockHistory history={history} />
    </div>
  );
}
