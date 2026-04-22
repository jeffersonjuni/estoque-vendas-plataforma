import { prisma } from '@/lib/prisma';

export async function getSalesData(userId: string, days = 30) {
  const now = new Date();

  const startDate = new Date();
  startDate.setDate(now.getDate() - days);

  const sales = await prisma.sale.findMany({
    where: {
      userId,
      createdAt: {
        gte: startDate,
      },
    },
    select: {
      total: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  // Agrupamento por dia (ISO - padrão correto)
  const grouped: Record<string, { revenue: number; sales: number }> = {};

  sales.forEach((sale) => {
    const dateKey = new Date(sale.createdAt).toISOString().split('T')[0];

    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        revenue: 0,
        sales: 0,
      };
    }

    grouped[dateKey].revenue += Number(sale.total);
    grouped[dateKey].sales += 1;
  });

  // retorno mantém ISO (frontend resolve timezone)
  return Object.entries(grouped).map(([date, data]) => ({
    date,
    revenue: data.revenue,
    sales: data.sales,
  }));
}
