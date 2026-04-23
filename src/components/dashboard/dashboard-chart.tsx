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
    revenue: number;
    sales: number;
  }[];
};

export function DashboardChart({ data }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h3 className="mb-4 text-sm text-muted-foreground">
        Receita ao longo do tempo
      </h3>

      <div className="h-72 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart data={data}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#888" />

            <YAxis tick={{ fontSize: 12 }} stroke="#888" />

            <Tooltip
              contentStyle={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
              }}
              formatter={(value, name) => {
                const num = Number(value);

                if (isNaN(num)) return value;

                const labelMap: Record<string, string> = {
                  revenue: 'Receita',
                  sales: 'Vendas',
                };

                return [
                  num.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }),
                  labelMap[name as string] || name,
                ];
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
