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

  const [period, setPeriod] = useState(30); // 🔥 novo

  async function loadData(selectedPeriod = period) {
    try {
      setLoading(true);
      setError('');

      const [reportData, sales] = await Promise.all([
        getRevenueReportClient(),
        getSalesDataClient(selectedPeriod),
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
  }, []);

  function handleChangePeriod(days: number) {
    setPeriod(days);
    loadData(days);
  }

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

      
      <div className="flex gap-2">
        {[7, 30, 90].map((days) => (
          <button
            key={days}
            onClick={() => handleChangePeriod(days)}
            className={`px-4 py-2 rounded-xl text-sm border transition ${
              period === days
                ? 'bg-primary text-primary-foreground'
                : 'bg-card hover:bg-muted'
            }`}
          >
            {days} dias
          </button>
        ))}
      </div>

      <DashboardChart data={salesData} />
    </div>
  );
}