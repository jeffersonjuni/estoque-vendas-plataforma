import { prisma } from '@/lib/prisma';

export async function checkLowStock(threshold = 5) {
  const products = await prisma.product.findMany();

  return products
    .filter((product) => product.stock <= threshold)
    .map((product) => ({
      id: product.id,
      name: product.name,
      stock: product.stock,
      status: product.stock === 0 ? 'OUT' : 'LOW',
    }));
}