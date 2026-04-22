import { prisma } from "@/lib/prisma";

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
      createdAt: "asc",
    },
  });

  // Agrupar por dia
  const grouped: Record<
    string,
    { revenue: number; sales: number }
  > = {};

  sales.forEach((sale) => {
    const date = sale.createdAt.toISOString().split("T")[0];

    if (!grouped[date]) {
      grouped[date] = {
        revenue: 0,
        sales: 0,
      };
    }

    grouped[date].revenue += Number(sale.total);
    grouped[date].sales += 1;
  });

  // Converter para array
  return Object.entries(grouped).map(([date, data]) => ({
    date,
    revenue: data.revenue,
    sales: data.sales,
  }));
}