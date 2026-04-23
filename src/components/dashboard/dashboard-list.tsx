'use client';

import { useEffect, useState } from 'react';

import { DashboardCards } from './dashboard-cards';
import { DashboardChart } from './dashboard-chart';
import { DashboardLoading } from './dashboard-loading';
import { DashboardEmptyState } from './dashboard-empty-state';

import { getRevenueReportClient } from '@/services/reports/get-revenue-report-client';
import { getSalesDataClient } from '@/services/reports/get-sale-data-client';

export function DashboardList() {
  const [report, setReport] = useState<any>(null);
  const [salesData, setSalesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [days, setDays] = useState(30);

  async function loadData(selectedDays = days) {
    try {
      setLoading(true);
      setError('');

      const [reportData, sales] = await Promise.all([
        getRevenueReportClient(),
        getSalesDataClient(selectedDays),
      ]);

      setReport(reportData);
      setSalesData(sales);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar dashboard');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [days]); 

  if (loading) return <DashboardLoading />;

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive">
        {error}
      </div>
    );
  }

  if (!report) return <DashboardEmptyState />;

  return (
    <div className="space-y-6">
      <DashboardCards data={report} />

      {/* 🔥 FILTRO PADRÃO (igual reports) */}
      <div className="flex gap-2">
        {[7, 30, 90].map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            className={`px-3 py-1 rounded-lg text-sm border transition ${
              days === d
                ? 'bg-primary text-white'
                : 'bg-card border-border text-muted-foreground hover:bg-muted'
            }`}
          >
            {d} dias
          </button>
        ))}
      </div>

      <DashboardChart data={salesData} />
    </div>
  );
}
