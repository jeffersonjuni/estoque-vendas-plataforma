'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';
import { deleteProduct } from '@/services/product/delete-product-client';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

type Props = {
  products: Product[];
  reloadProducts: () => Promise<void>;
};

export function ProductTable({ products, reloadProducts }: Props) {
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleDelete() {
    if (!selectedId) return;

    await deleteProduct(selectedId);

    setOpenModal(false);

    setMessage('Produto excluído com sucesso!');

    setTimeout(async () => {
      await reloadProducts();
    }, 800);

    // remove depois
    setTimeout(() => {
      setMessage(null);
    }, 4000);
  }

  function getStockStatus(stock: number) {
    if (stock === 0) {
      return {
        label: 'Sem estoque',
        className:
          'bg-destructive/10 text-destructive border border-destructive/20',
      };
    }

    if (stock <= 5) {
      return {
        label: 'Estoque baixo',
        className:
          'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20',
      };
    }

    return {
      label: 'Em estoque',
      className:
        'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20',
    };
  }

  return (
    <>
      {message && (
        <div className="fixed bottom-4 right-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow">
          {message}
        </div>
      )}

      <div className="hidden md:block overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            {/* HEADER */}
            <thead className="bg-muted/50 text-left">
              <tr className="border-b border-border">
                <th className="px-6 py-4 font-medium text-muted-foreground">
                  Produto
                </th>
                <th className="px-6 py-4 font-medium text-muted-foreground">
                  SKU
                </th>
                <th className="px-6 py-4 font-medium text-muted-foreground">
                  Categoria
                </th>
                <th className="px-6 py-4 font-medium text-muted-foreground text-right">
                  Preço
                </th>
                <th className="px-6 py-4 font-medium text-muted-foreground text-center">
                  Estoque
                </th>
                <th className="px-6 py-4 font-medium text-muted-foreground text-center">
                  Status
                </th>
                <th className="px-6 py-4 font-medium text-muted-foreground text-center">
                  Criado
                </th>
                <th className="px-6 py-4">
                  <div className="flex w-full justify-end text-muted-foreground font-medium">
                    Ações
                  </div>
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {products.map((product) => {
                const status = getStockStatus(product.stock);

                return (
                  <tr
                    key={product.id}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    {/* PRODUTO */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {product.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {product.description || 'Sem descrição'}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-muted-foreground">
                      {product.sku || '—'}
                    </td>

                    <td className="px-6 py-4 text-muted-foreground">
                      {product.category || '—'}
                    </td>

                    {/* PREÇO */}
                    <td className="px-6 py-4 text-right font-medium text-foreground">
                      {Number(product.price).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>

                    {/* ESTOQUE */}
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium">
                        {product.stock}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex px-3 py-1 text-xs rounded-full font-medium ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </td>

                    {/* DATA */}
                    <td className="px-6 py-4 text-center text-muted-foreground">
                      {new Date(product.createdAt).toLocaleDateString('pt-BR')}
                    </td>

                    {/* AÇÕES */}
                    <td className="px-6 py-4 flex justify-end gap-2">
                      <Button
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => router.push(`/produtos/${product.id}`)}
                      >
                        Editar
                      </Button>

                      <Button
                        size="sm"
                        variant="danger"
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedId(product.id);
                          setOpenModal(true);
                        }}
                      >
                        Excluir
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={openModal}
        title="Excluir produto"
        onClose={() => setOpenModal(false)}
        onConfirm={handleDelete}
      >
        <p>Essa ação não pode ser desfeita.</p>
      </Modal>
    </>
  );
}
