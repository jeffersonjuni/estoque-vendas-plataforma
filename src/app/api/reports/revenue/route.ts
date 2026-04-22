import { NextResponse } from "next/server";
import { getRevenueReport } from "@/services/reports/getRevenueReport";
import { getAuthSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getAuthSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await getRevenueReport(session.user.id);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erro ao gerar relatório" },
      { status: 500 }
    );
  }
}