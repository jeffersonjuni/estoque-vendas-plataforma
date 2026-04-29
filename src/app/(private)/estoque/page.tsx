'use client';

import { useEffect, useMemo, useState } from 'react';

import { SearchInput } from '@/components/ui/search-input';

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

  // 🔎 SEARCH STATES
  const [searchProduct, setSearchProduct] = useState('');
  const [searchHistory, setSearchHistory] = useState('');

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

  // 🔎 FILTRO PRODUTOS
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchProduct.toLowerCase())
    );
  }, [products, searchProduct]);

  // 🔎 FILTRO HISTÓRICO
  const filteredHistory = useMemo(() => {
    return history.filter((item) =>
      item.product.name.toLowerCase().includes(searchHistory.toLowerCase())
    );
  }, [history, searchHistory]);

  return (
    <div className="space-y-6">
      <StockSummary products={products} history={history} />

      {/* 🔎 SEARCH PRODUTOS */}
      <SearchInput
        value={searchProduct}
        onChange={setSearchProduct}
        placeholder="Buscar produto no estoque..."
      />

      <StockTable products={filteredProducts} onRefresh={fetchData} />

      {/* 🔎 SEARCH HISTÓRICO */}
      <SearchInput
        value={searchHistory}
        onChange={setSearchHistory}
        placeholder="Buscar no histórico..."
      />

      <StockHistory history={filteredHistory} />
    </div>
  );
}
