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
  const [filterLoading, setFilterLoading] = useState(false);
  const [error, setError] = useState('');
  const [days, setDays] = useState(30);

  async function loadInitialData() {
    try {
      setLoading(true);
      setError('');

      const [reportData, sales] = await Promise.all([
        getRevenueReportClient(),
        getSalesDataClient(days),
      ]);

      setReport(reportData);
      setSalesData(sales);
    } catch (err) {
      console.error(err);
      setError('Não foi possível carregar o dashboard.');
    } finally {
      setLoading(false);
    }
  }

  async function loadFilteredData(selectedDays: number) {
    try {
      setFilterLoading(true);

      const sales = await getSalesDataClient(selectedDays);

      setSalesData(sales);
    } catch (err) {
      console.error(err);
      setError('Erro ao atualizar os dados.');
    } finally {
      setFilterLoading(false);
    }
  }

  // 🔹 load inicial (uma vez)
  useEffect(() => {
    loadInitialData();
  }, []);

  // 🔹 load ao mudar filtro
  useEffect(() => {
    loadFilteredData(days);
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

      <div className="flex flex-wrap gap-2">
        {[7, 30, 90].map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            disabled={filterLoading}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-all duration-200 ${
              days === d
                ? 'bg-primary text-white'
                : 'bg-card border-border text-muted-foreground hover:bg-muted'
            } ${filterLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {d} dias
          </button>
        ))}
      </div>

      {filterLoading ? (
        <DashboardLoading />
      ) : (
        <DashboardChart data={salesData} />
      )}
    </div>
  );
}