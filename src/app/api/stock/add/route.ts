import { NextResponse } from 'next/server'
import { addStock } from '@/services/stock/add-stock'
import { getAuthSession } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const body = await req.json()

    await addStock({
      ...body,
      userId: session.user.id,
    })

    return NextResponse.json({
      success: true,
      message: 'Estoque adicionado com sucesso',
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Erro interno',
      },
      { status: 400 }
    )
  }
}