import { DollarSign, ShoppingCart, BarChart3, Package } from 'lucide-react';

type Props = {
  data: {
    totalRevenue: number;
    totalSales: number;
    ticketAverage: number;
    totalItems: number;
  };
};

const cards = [
  {
    label: 'Receita total',
    icon: DollarSign,
    key: 'totalRevenue',
    isCurrency: true,
  },
  {
    label: 'Vendas',
    icon: ShoppingCart,
    key: 'totalSales',
  },
  {
    label: 'Ticket médio',
    icon: BarChart3,
    key: 'ticketAverage',
    isCurrency: true,
  },
  {
    label: 'Itens vendidos',
    icon: Package,
    key: 'totalItems',
  },
];

export function DashboardCards({ data }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const value = data[card.key as keyof Props['data']];

        return (
          <div
            key={card.key}
            className="rounded-2xl border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">
                {card.label}
              </span>
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>

            <strong className="text-2xl font-semibold">
              {card.isCurrency
                ? Number(value).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                : value}
            </strong>
          </div>
        );
      })}
    </div>
  );
}