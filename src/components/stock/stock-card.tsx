'use client'

import { Button } from '@/components/ui/button'

interface Product {
  id: string
  name: string
  stock: number
}

interface Props {
  product: Product
  onEntry: () => void
  onExit: () => void
}

export function StockCard({
  product,
  onEntry,
  onExit,
}: Props) {
  return (
    <div className="rounded-2xl border p-5 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">
            {product.name}
          </h3>

          <p className="text-sm text-muted-foreground">
            Estoque atual: {product.stock}
          </p>
        </div>

        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
          {product.stock} un.
        </span>
      </div>

      <div className="flex gap-2">
        <Button onClick={onEntry}>
          Entrada
        </Button>

        <Button
          variant="danger"
          onClick={onExit}
        >
          Saída
        </Button>
      </div>
    </div>
  )
}