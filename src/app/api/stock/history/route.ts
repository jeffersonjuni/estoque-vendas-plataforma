import { NextResponse } from 'next/server'
import { getStockHistory } from '@/services/stock/get-stock-history'
import { getAuthSession } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getAuthSession()

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const history = await getStockHistory({
      userId: session.user.id,
    })

    return NextResponse.json({
      success: true,
      data: history,
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Erro ao buscar histórico',
      },
      { status: 500 }
    )
  }
}