import { prisma } from "@/lib/prisma";
import { ProductInput } from "@/types/product";

type CreateProductParams = ProductInput & {
  userId: string;
};

export async function createProduct({
  name,
  description,
  sku,
  category,
  price,
  stock = 0,
  userId,
}: CreateProductParams) {
  if (sku) {
    const existingProduct = await prisma.product.findFirst({
      where: {
        userId,
        sku,
      },
    });

    if (existingProduct) {
      throw new Error("Já existe um produto com esse SKU.");
    }
  }

  return prisma.product.create({
    data: {
      name,
      description: description || null,
      sku: sku || null,
      category: category || null,
      price,
      stock,
      userId,
    },
  });
}