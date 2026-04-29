'use client';

import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteProduct } from '@/services/product/delete-product-client';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

type Props = {
  products: Product[];
  reloadProducts: () => Promise<void>;
};

export function ProductCardList({ products, reloadProducts }: Props) {
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleDelete() {
    if (!selectedId) return;

    await deleteProduct(selectedId);

    setOpenModal(false);

    // mostra feedback primeiro
    setMessage('Produto excluído com sucesso!');

    // espera o usuário ver o toast
    setTimeout(async () => {
      await reloadProducts();
    }, 800);

    //  remove o toast depois
    setTimeout(() => {
      setMessage(null);
    }, 4000);
  }

  function getStockStatus(stock: number) {
    if (stock === 0)
      return { label: 'Sem estoque', className: 'bg-red-100 text-red-600' };
    if (stock <= 5)
      return {
        label: 'Estoque baixo',
        className: 'bg-yellow-100 text-yellow-600',
      };
    return { label: 'Em estoque', className: 'bg-green-100 text-green-600' };
  }

  return (
    <>
      {message && (
        <div className="fixed bottom-4 right-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow">
          {message}
        </div>
      )}

      <div className="grid gap-4 md:hidden">
        {products.map((product) => {
          const status = getStockStatus(product.stock);

          return (
            <div
              key={product.id}
              className="rounded-2xl border bg-card p-5 space-y-4 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {product.description || 'Sem descrição'}
                  </p>
                </div>

                <span
                  className={`px-2 py-1 text-xs rounded ${status.className}`}
                >
                  {status.label}
                </span>
              </div>

              <div className="text-sm space-y-1 text-muted-foreground">
                <div>SKU: {product.sku || '—'}</div>
                <div>Categoria: {product.category || '—'}</div>
                <div>
                  Preço:{' '}
                  <span className="text-foreground font-medium">
                    {Number(product.price).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </div>
                <div>Estoque: {product.stock}</div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => router.push(`/produtos/${product.id}`)}
                >
                  Editar
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    setSelectedId(product.id);
                    setOpenModal(true);
                  }}
                >
                  Excluir
                </Button>
              </div>
            </div>
          );
        })}
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
