'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Props = {
  data: {
    date: string;
    totalSales: number;
    revenue: number;
  }[];
};

export function ReportChart({ data }: Props) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Visão de Receita
        </h2>

        <p className="text-sm text-muted-foreground">
          Acompanhe o desempenho ao longo do tempo
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              stroke="var(--muted-foreground)"
            />

            <YAxis
              tick={{ fontSize: 12 }}
              stroke="var(--muted-foreground)"
            />

            <Tooltip
              contentStyle={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
              }}
              formatter={(value: unknown, name: unknown) => {
                const num = Number(value);

                if (isNaN(num)) {
                  return [String(value), String(name)];
                }

                const labelMap: Record<string, string> = {
                  revenue: 'Receita',
                  totalSales: 'Vendas',
                };

                return [
                  num.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }),
                  labelMap[String(name)] || String(name),
                ];
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--primary)"   // ✅ IGUAL DASHBOARD
              fill="var(--primary)"     // ✅ IGUAL DASHBOARD
              fillOpacity={0.1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}