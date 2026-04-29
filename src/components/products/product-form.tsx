'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/services/product/create-product-client';
import { updateProduct } from '@/services/product/update-product-client';
import { createProductSchema } from '@/lib/validations/product';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type Props = {
  product?: any;
  isEdit?: boolean;
};

export function ProductForm({ product, isEdit }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: product?.name || '',
    description: product?.description || '',
    sku: product?.sku || '',
    category: product?.category || '',
    price: product?.price?.toString() || '',
    stock: product?.stock?.toString() || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;

    setErrors({});
    setSuccess('');

    const parsed = createProductSchema.safeParse(form);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};

      parsed.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      if (isEdit && product?.id) {
        await updateProduct(product.id, parsed.data);
        setSuccess('Produto atualizado com sucesso!');
      } else {
        await createProduct(parsed.data);
        setSuccess('Produto cadastrado com sucesso!');

        setForm({
          name: '',
          description: '',
          sku: '',
          category: '',
          price: '',
          stock: '',
        });
      }

      setTimeout(() => {
        router.push('/produtos');
      }, 1200);
    } catch (err: any) {
      setErrors({ global: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-6 space-y-6 max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.global && (
          <p className="text-sm text-destructive">{errors.global}</p>
        )}

        {success && <p className="text-sm text-emerald-600">{success}</p>}

        {/* Nome */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Nome</label>
          <Input name="name" value={form.name} onChange={handleChange} />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name}</p>
          )}
        </div>

        {/* Descrição */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Descrição</label>
          <Input
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {/* SKU */}
        <div className="space-y-1">
          <label className="text-sm font-medium">SKU</label>
          <Input name="sku" value={form.sku} onChange={handleChange} />
        </div>

        {/* Categoria */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Categoria</label>
          <Input
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        {/* Preço */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Preço</label>
          <Input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
          />
          {errors.price && (
            <p className="text-xs text-destructive">{errors.price}</p>
          )}
        </div>

        {/* Estoque */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Estoque</label>
          <Input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
          />
          {errors.stock && (
            <p className="text-xs text-destructive">{errors.stock}</p>
          )}
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading
            ? 'Salvando...'
            : isEdit
              ? 'Atualizar produto'
              : 'Cadastrar produto'}
        </Button>
      </form>
    </Card>
  );
}
