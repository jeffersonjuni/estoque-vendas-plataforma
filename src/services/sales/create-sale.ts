import { prisma } from "@/lib/prisma";

type SaleItemInput = {
  productId: string;
  quantity: number;
};

type CreateSaleRequest = {
  userId: string;
  items: SaleItemInput[];
};

export async function createSale({
  userId,
  items,
}: CreateSaleRequest) {
  if (!items.length) {
    throw new Error("A venda deve possuir ao menos um item.");
  }

  const productIds = items.map((item) => item.productId);

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
      userId,
    },
  });

  if (products.length !== items.length) {
    throw new Error("Um ou mais produtos não foram encontrados.");
  }

  let total = 0;

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);

    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    if (item.quantity <= 0) {
      throw new Error("Quantidade inválida.");
    }

    if (product.stock < item.quantity) {
      throw new Error(
        `Estoque insuficiente para o produto ${product.name}.`
      );
    }

    total += Number(product.price) * item.quantity;
  }

  const sale = await prisma.$transaction(async (tx) => {
    const createdSale = await tx.sale.create({
      data: {
        userId,
        total,
      },
    });

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId)!;

      await tx.saleItem.create({
        data: {
          saleId: createdSale.id,
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
        },
      });

      await tx.product.update({
        where: {
          id: product.id,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });

      await tx.stockMovement.create({
        data: {
          productId: product.id,
          type: "OUT",
          quantity: item.quantity,
          reason: "Venda realizada",
        },
      });
    }

    return createdSale;
  });

  return sale;
}