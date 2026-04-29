'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

type Props = {
  days: number;
};

export function ReportExport({ days }: Props) {
  const [loading, setLoading] = useState<'csv' | 'pdf' | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleExport(type: 'csv' | 'pdf') {
    try {
      setLoading(type);

      const response = await fetch(`/api/reports/export/${type}?days=${days}`);

      if (!response.ok) throw new Error();

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio-${days}dias.${type}`;
      a.click();

      window.URL.revokeObjectURL(url);

      setMessage(`Exportação ${type.toUpperCase()} concluída!`);
    } catch {
      setMessage('Erro ao exportar relatório');
    } finally {
      setLoading(null);
      setTimeout(() => setMessage(null), 3000);
    }
  }

  return (
    <>
      {message && (
        <div className="fixed bottom-4 right-4 z-50 rounded-xl bg-emerald-500 px-4 py-2 text-white shadow">
          {message}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold">Relatórios</h2>

        <div className="flex gap-2">
          <Button
            onClick={() => handleExport('csv')}
            disabled={loading !== null}
          >
            <FileDown className="mr-2 h-4 w-4" />
            {loading === 'csv' ? 'Exportando...' : 'CSV'}
          </Button>

          <Button
            variant="secondary"
            onClick={() => handleExport('pdf')}
            disabled={loading !== null}
          >
            <FileDown className="mr-2 h-4 w-4" />
            {loading === 'pdf' ? 'Exportando...' : 'PDF'}
          </Button>
        </div>
      </div>
    </>
  );
}