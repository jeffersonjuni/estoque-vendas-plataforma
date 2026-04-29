'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'

interface Props {
  product: {
    id: string
    name: string
  }
  type: 'IN' | 'OUT'
  onClose: () => void
  onSuccess: () => void
}

export function StockMovementModal({
  product,
  type,
  onClose,
  onSuccess,
}: Props) {
  const [quantity, setQuantity] = useState('')
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setError('')

    if (!quantity || Number(quantity) <= 0) {
      setError('Informe uma quantidade válida.')
      return
    }

    if (!reason.trim()) {
      setError('Informe o motivo da movimentação.')
      return
    }

    const endpoint =
      type === 'IN'
        ? '/api/stock/add'
        : '/api/stock/remove'

    try {
      setLoading(true)

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: Number(quantity),
          reason,
        }),
      })

      if (!response.ok) {
        const data = await response.json()

        setError(
          data.error || 'Erro ao realizar movimentação.'
        )
        return
      }

      await onSuccess()
      onClose()
    } catch (err) {
      setError('Erro inesperado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={
        type === 'IN'
          ? 'Entrada de Estoque'
          : 'Saída de Estoque'
      }
    >
      <div className="space-y-5">

        {/* PRODUTO */}
        <div>
          <p className="text-sm text-muted-foreground">
            Produto selecionado
          </p>
          <p className="font-medium text-foreground">
            {product.name}
          </p>
        </div>

        {/* QUANTIDADE */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Quantidade
          </p>
          <Input
            type="number"
            placeholder="Ex: 10"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
          />
        </div>

        {/* MOTIVO */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Motivo
          </p>
          <Input
            placeholder="Ex: Reposição, venda, ajuste..."
            value={reason}
            onChange={(e) =>
              setReason(e.target.value)
            }
          />
        </div>

        {/* ERRO */}
        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}

        {/* BOTÃO */}
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? 'Processando...'
            : type === 'IN'
              ? 'Confirmar entrada'
              : 'Confirmar saída'}
        </Button>
      </div>
    </Modal>
  )
}