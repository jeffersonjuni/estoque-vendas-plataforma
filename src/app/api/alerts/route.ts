import { NextResponse } from 'next/server';
import { checkLowStock } from '@/services/alerts/check-low-stock';

export async function GET() {
  try {
    const alerts = await checkLowStock();

    return NextResponse.json({
      success: true,
      data: alerts,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erro ao buscar alertas' },
      { status: 500 }
    );
  }
}