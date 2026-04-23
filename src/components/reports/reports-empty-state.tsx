'use client'

import { BarChart3 } from "lucide-react"

export function ReportsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
      
      <div className="mb-4 rounded-full bg-muted p-4">
        <BarChart3 className="h-10 w-10 text-muted-foreground" />
      </div>

      <h2 className="text-xl font-semibold text-foreground">
        Sem dados de vendas
      </h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Ainda não há dados suficientes para gerar relatórios.
        Realize vendas para visualizar os dados aqui.
      </p>
    </div>
  )
}