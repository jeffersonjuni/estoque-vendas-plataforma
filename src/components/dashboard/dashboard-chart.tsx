'use client';

import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export function DashboardChart({ data }: any) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <h2 className="mb-4 text-sm text-muted-foreground">
        Receita por período
      </h2>

      <div className="h-[300px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart data={data}>
            {/*  GRADIENTE */}
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.6} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="date"
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString('pt-BR', {
                  timeZone: 'America/Sao_Paulo',
                  day: '2-digit',
                  month: '2-digit',
                })
              }
            />

            <Tooltip
              formatter={(value: any) => {
                if (typeof value === 'number') {
                  return value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  });
                }
                return value;
              }}
              labelFormatter={(label) =>
                new Date(label).toLocaleDateString('pt-BR', {
                  timeZone: 'America/Sao_Paulo',
                })
              }
              contentStyle={{
                borderRadius: '12px',
                fontSize: '12px',
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                color: 'hsl(var(--foreground))',
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              fill="url(#colorRevenue)"
              name="Receita"
              dot={false}
              activeDot={{ r: 6 }}
              isAnimationActive
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
