'use client'

import {
  ArrowDownCircle,
  ArrowUpCircle,
  Boxes,
} from 'lucide-react'

interface Props {
  products: {
    stock: number
  }[]
  history: unknown[]
}

export function StockSummary({
  products,
  history,
}: Props) {
  const totalProducts = products.length

  const totalStock = products.reduce(
    (acc, product) => acc + product.stock,
    0
  )

  const totalMovements = history.length

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-3 flex justify-between">
          <span className="text-sm text-muted-foreground">
            Total de produtos
          </span>

          <Boxes className="h-5 w-5 text-muted-foreground" />
        </div>

        <strong className="text-2xl font-bold text-foreground">
          {totalProducts}
        </strong>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-3 flex justify-between">
          <span className="text-sm text-muted-foreground">
            Itens em estoque
          </span>

          <ArrowUpCircle className="h-5 w-5 text-muted-foreground" />
        </div>

        <strong className="text-2xl font-bold text-foreground">
          {totalStock}
        </strong>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-3 flex justify-between">
          <span className="text-sm text-muted-foreground">
            Movimentações
          </span>

          <ArrowDownCircle className="h-5 w-5 text-muted-foreground" />
        </div>

        <strong className="text-2xl font-bold text-foreground">
          {totalMovements}
        </strong>
      </div>
    </div>
  )
}