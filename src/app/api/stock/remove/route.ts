import { NextResponse } from 'next/server'

import { getAuthSession } from '@/lib/auth'
import { removeStock } from '@/services/stock/remove-stock'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Não autorizado' },
        { status: 401 }
      )
    }

    const body = await req.json()

    await removeStock({
      productId: body.productId,
      quantity: body.quantity,
      reason: body.reason,
      userId: session.user.id,
    })

    return NextResponse.json({
      success: true,
      message: 'Estoque removido com sucesso',
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : 'Erro interno do servidor',
      },
      { status: 400 }
    )
  }
}