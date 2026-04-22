import { DollarSign, ShoppingCart, BarChart3, Package } from 'lucide-react';

export function DashboardCards({ data }: any) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      
      <div className="rounded-2xl border bg-card p-5 shadow-sm">
        <div className="flex justify-between mb-3">
          <span className="text-sm text-muted-foreground">Receita total</span>
          <DollarSign className="h-5 w-5 text-muted-foreground" />
        </div>
        <strong className="text-2xl font-bold">
          {data.totalRevenue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </strong>
      </div>

      <div className="rounded-2xl border bg-card p-5 shadow-sm">
        <div className="flex justify-between mb-3">
          <span className="text-sm text-muted-foreground">Vendas</span>
          <ShoppingCart className="h-5 w-5 text-muted-foreground" />
        </div>
        <strong className="text-2xl font-bold">{data.totalSales}</strong>
      </div>

      <div className="rounded-2xl border bg-card p-5 shadow-sm">
        <div className="flex justify-between mb-3">
          <span className="text-sm text-muted-foreground">Ticket médio</span>
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
        </div>
        <strong className="text-2xl font-bold">
          {data.ticketAverage.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </strong>
      </div>

      <div className="rounded-2xl border bg-card p-5 shadow-sm">
        <div className="flex justify-between mb-3">
          <span className="text-sm text-muted-foreground">
            Itens vendidos
          </span>
          <Package className="h-5 w-5 text-muted-foreground" />
        </div>
        <strong className="text-2xl font-bold">{data.totalItems}</strong>
      </div>
    </div>
  );
}