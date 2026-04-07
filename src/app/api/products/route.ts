import { NextRequest, NextResponse } from "next/server";

import { getAuthSession } from "@/lib/auth";
import { createProduct } from "@/services/product/create-product";
import { getProducts } from "@/services/product/get-products";
import { createProductSchema } from "@/lib/validations/product";

export async function GET() {
  try {
    const session = await getAuthSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Não autorizado." },
        { status: 401 }
      );
    }

    const products = await getProducts({
      userId: session.user.id,
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);

    return NextResponse.json(
      { message: "Erro ao buscar produtos." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Não autorizado." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const parsedData = createProductSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          message: "Dados inválidos.",
          errors: parsedData.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const product = await createProduct({
      ...parsedData.data,
      userId: session.user.id,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar produto:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Erro ao criar produto." },
      { status: 500 }
    );
  }
}