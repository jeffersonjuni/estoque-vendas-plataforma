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
        data.error ||
          'Erro ao realizar movimentação.'
      )

      return
    }

    await onSuccess()
    onClose()
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
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Produto selecionado
          </p>

          <p className="font-medium">{product.name}</p>
        </div>

        <Input
          type="number"
          placeholder="Quantidade"
          value={quantity}
          onChange={(e) =>
            setQuantity(e.target.value)
          }
        />

        <Input
          placeholder="Motivo da movimentação"
          value={reason}
          onChange={(e) =>
            setReason(e.target.value)
          }
        />

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}

        <Button
          className="w-full"
          onClick={handleSubmit}
        >
          Confirmar
        </Button>
      </div>
    </Modal>
  )
}