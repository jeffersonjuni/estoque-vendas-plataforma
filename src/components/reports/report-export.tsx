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

      if (!response.ok) {
        throw new Error('Erro ao exportar');
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio-${days}dias-${new Date().toISOString()}.${type}`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);

      setMessage(`Exportação ${type.toUpperCase()} concluída!`);
    } catch (error) {
      setMessage('Erro ao exportar relatório');
    } finally {
      setLoading(null);

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {message && (
        <div className="fixed bottom-4 right-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow">
          {message}
        </div>
      )}

      <div className="flex gap-2">
        <Button onClick={() => handleExport('csv')} disabled={loading !== null}>
          <FileDown className="h-4 w-4 mr-2" />
          {loading === 'csv' ? 'Exportando...' : 'Exportar CSV'}
        </Button>

        <Button
          onClick={() => handleExport('pdf')}
          disabled={loading !== null}
          variant="secondary"
        >
          <FileDown className="h-4 w-4 mr-2" />
          {loading === 'pdf' ? 'Exportando...' : 'Exportar PDF'}
        </Button>
      </div>
    </div>
  );
}
