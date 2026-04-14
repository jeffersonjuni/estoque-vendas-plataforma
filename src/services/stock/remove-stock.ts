import { prisma } from '@/lib/prisma'

interface RemoveStockParams {
  productId: string
  quantity: number
  reason?: string
  userId: string
}

export async function removeStock({
  productId,
  quantity,
  reason,
  userId,
}: RemoveStockParams) {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      userId,
    },
  })

  if (!product) {
    throw new Error('Produto não encontrado')
  }

  if (product.stock < quantity) {
    throw new Error('Estoque insuficiente')
  }

  await prisma.product.update({
    where: { id: productId },
    data: {
      stock: {
        decrement: quantity,
      },
    },
  })

  await prisma.stockMovement.create({
    data: {
      productId,
      quantity,
      reason,
      type: 'OUT',
    },
  })
}