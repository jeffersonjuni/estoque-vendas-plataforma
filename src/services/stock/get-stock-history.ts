import { prisma } from '@/lib/prisma'

interface GetStockHistoryParams {
  userId: string
}

export async function getStockHistory({
  userId,
}: GetStockHistoryParams) {
  return prisma.stockMovement.findMany({
    where: {
      product: {
        userId,
      },
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}