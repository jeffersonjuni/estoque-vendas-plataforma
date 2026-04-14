import { prisma } from '@/lib/prisma'

interface AddStockParams {
  productId: string
  quantity: number
  reason?: string
  userId: string
}

export async function addStock({
  productId,
  quantity,
  reason,
  userId,
}: AddStockParams) {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      userId,
    },
  })

  if (!product) {
    throw new Error('Produto não encontrado')
  }

  await prisma.product.update({
    where: { id: productId },
    data: {
      stock: {
        increment: quantity,
      },
    },
  })

  await prisma.stockMovement.create({
    data: {
      productId,
      quantity,
      reason,
      type: 'IN',
    },
  })
}