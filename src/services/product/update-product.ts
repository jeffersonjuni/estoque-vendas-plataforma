import { prisma } from "@/lib/prisma";
import { UpdateProductInput } from "@/types/product";

type UpdateProductParams = UpdateProductInput & {
  id: string;
  userId: string;
};

export async function updateProduct({
  id,
  userId,
  name,
  description,
  sku,
  category,
  price,
  stock,
}: UpdateProductParams) {
  const product = await prisma.product.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!product) {
    throw new Error("Produto não encontrado.");
  }

  if (sku && sku !== product.sku) {
    const existingProduct = await prisma.product.findFirst({
      where: {
        userId,
        sku,
        NOT: {
          id,
        },
      },
    });

    if (existingProduct) {
      throw new Error("Já existe um produto com esse SKU.");
    }
  }

  return prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      description: description === "" ? null : description,
      sku: sku === "" ? null : sku,
      category: category === "" ? null : category,
      price,
      stock,
    },
  });
}