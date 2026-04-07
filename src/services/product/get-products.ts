import { prisma } from "@/lib/prisma";

type GetProductsParams = {
  userId: string;
};

export async function getProducts({ userId }: GetProductsParams) {
  return prisma.product.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}