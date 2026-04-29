'use client';

import { useEffect, useState } from 'react';
import { DollarSign, ShoppingCart } from 'lucide-react';

import { ReportsLoading } from './reports-loading';
import { ReportsEmptyState } from './reports-empty-state';
import { ReportChart } from './report-chart';
import { ReportExport } from './report-export';

type SalesData = {
  date: string;
  totalSales: number;
  revenue: number;
};

type RevenueReport = {
  totalRevenue: number;
  monthlyRevenue: number;
  totalSales: number;
};

export function ReportsList() {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [report, setReport] = useState<RevenueReport | null>(null);
  const [days, setDays] = useState(30);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadReports() {
    try {
      setIsLoading(true);
      setError('');

      const [salesRes, reportRes] = await Promise.all([
        fetch(`/api/reports/sales?days=${days}`),
        fetch('/api/reports/revenue'),
      ]);

      const salesJson = await salesRes.json();
      const revenueJson = await reportRes.json();

      setSalesData(salesJson.data || []);
      setReport(revenueJson.data || revenueJson);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar relatórios');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadReports();
  }, [days]);

  if (isLoading) return <ReportsLoading />;

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive">
        {error}
      </div>
    );
  }

  if (!salesData.length) return <ReportsEmptyState />;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <ReportExport days={days} />

      {/* FILTRO */}
      <div className="flex gap-2">
        {[7, 30, 90].map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              days === d
                ? 'bg-primary text-white'
                : 'bg-card border border-border text-muted-foreground hover:bg-muted'
            }`}
          >
            {d} dias
          </button>
        ))}
      </div>

      {/* CARDS (PADRÃO DASHBOARD) */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-3 flex justify-between">
            <span className="text-sm text-muted-foreground">
              Receita total
            </span>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </div>

          <strong className="text-2xl font-bold">
            {report?.totalRevenue?.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }) || 'R$ 0,00'}
          </strong>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-3 flex justify-between">
            <span className="text-sm text-muted-foreground">
              Vendas totais
            </span>
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
          </div>

          <strong className="text-2xl font-bold">
            {report?.totalSales || 0}
          </strong>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-3 flex justify-between">
            <span className="text-sm text-muted-foreground">
              Receita do mês
            </span>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </div>

          <strong className="text-2xl font-bold">
            {report?.monthlyRevenue?.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }) || 'R$ 0,00'}
          </strong>
        </div>
      </div>

      {/* CHART */}
      <ReportChart data={salesData} />
    </div>
  );
}