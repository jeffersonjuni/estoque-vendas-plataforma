import { prisma } from "@/lib/prisma";

type DeleteProductParams = {
  id: string;
  userId: string;
};

export async function deleteProduct({
  id,
  userId,
}: DeleteProductParams) {
  const product = await prisma.product.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!product) {
    throw new Error("Produto não encontrado.");
  }

  await prisma.product.delete({
    where: {
      id,
    },
  });

  return { message: "Produto excluído com sucesso." };
}