import { NextResponse } from "next/server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateProductSchema } from "@/lib/validations/product";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(request: Request, context: RouteContext) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Não autorizado." },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { message: "ID do produto não informado." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = updateProductSchema.parse(body);

    const existingProduct = await prisma.product.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { message: "Produto não encontrado." },
        { status: 404 }
      );
    }

    if (validatedData.sku && validatedData.sku !== existingProduct.sku) {
      const duplicatedSku = await prisma.product.findFirst({
        where: {
          userId: session.user.id,
          sku: validatedData.sku,
          NOT: {
            id: existingProduct.id,
          },
        },
      });

      if (duplicatedSku) {
        return NextResponse.json(
          { message: "Já existe um produto com esse SKU." },
          { status: 409 }
        );
      }
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: existingProduct.id,
      },
      data: {
        ...validatedData,
        description:
          validatedData.description !== undefined
            ? validatedData.description || null
            : undefined,
        sku:
          validatedData.sku !== undefined
            ? validatedData.sku || null
            : undefined,
        category:
          validatedData.category !== undefined
            ? validatedData.category || null
            : undefined,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error: any) {
    console.error("[UPDATE_PRODUCT_ERROR]", error);

    if (error?.name === "ZodError") {
      return NextResponse.json(
        {
          message: "Dados inválidos.",
          errors: error.flatten(),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Erro ao atualizar produto." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Não autorizado." },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { message: "ID do produto não informado." },
        { status: 400 }
      );
    }

    const existingProduct = await prisma.product.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { message: "Produto não encontrado." },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: {
        id: existingProduct.id,
      },
    });

    return NextResponse.json(
      { message: "Produto excluído com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[DELETE_PRODUCT_ERROR]", error);

    return NextResponse.json(
      { message: "Erro ao excluir produto." },
      { status: 500 }
    );
  }
}