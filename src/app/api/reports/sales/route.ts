import { NextRequest, NextResponse } from "next/server";
import { getSalesData } from "@/services/reports/getSaleData";
import { getAuthSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const days = Number(searchParams.get("days") || 30);

    const data = await getSalesData(session.user.id, days);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erro ao gerar gráfico" },
      { status: 500 }
    );
  }
}