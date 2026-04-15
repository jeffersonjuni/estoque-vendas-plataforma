import { NextRequest, NextResponse } from "next/server";
import { createSale } from "@/services/sales/create-sale";
import { getAuthSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Não autorizado." },
        { status: 401 }
      );
    }

    const body = await req.json();

    const sale = await createSale({
      userId: session.user.id,
      items: body.items,
    });

    return NextResponse.json(
      {
        success: true,
        sale,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao criar venda.",
      },
      { status: 400 }
    );
  }
}