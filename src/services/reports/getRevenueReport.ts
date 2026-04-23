import { prisma } from '@/lib/prisma';
import { getSalesData } from './getSaleData';

export async function getRevenueReport(userId: string, days = 30) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const salesAggregate = await prisma.sale.aggregate({
    where: { userId },
    _sum: { total: true },
    _count: { id: true },
  });

  const monthlyRevenue = await prisma.sale.aggregate({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth,
      },
    },
    _sum: { total: true },
  });

  const itemsAggregate = await prisma.saleItem.aggregate({
    _sum: { quantity: true },
    where: {
      sale: { userId },
    },
  });

  const topProduct = await prisma.saleItem.groupBy({
    by: ['productId'],
    where: {
      sale: { userId },
    },
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: 'desc',
      },
    },
    take: 1,
  });

  let topProductData = null;

  if (topProduct.length > 0) {
    const product = await prisma.product.findUnique({
      where: { id: topProduct[0].productId },
      select: { name: true },
    });

    topProductData = {
      name: product?.name,
      quantity: topProduct[0]._sum.quantity,
    };
  }

  const totalRevenue = Number(salesAggregate._sum.total || 0);
  const totalSales = salesAggregate._count.id || 0;
  const totalItems = itemsAggregate._sum.quantity || 0;

  const ticketAverage = totalSales > 0 ? totalRevenue / totalSales : 0;

  const salesData = await getSalesData(userId, days);

  return {
    totalRevenue,
    monthlyRevenue: Number(monthlyRevenue._sum.total || 0),
    totalSales,
    totalItems,
    ticketAverage,
    topProduct: topProductData,

    salesData,
  };
}
