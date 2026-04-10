import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ProductForm } from '@/components/products/product-form';
import { serializeProduct } from '@/lib/serializers/product';

type Props = {
  params: any;
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">
        {product ? 'Editar Produto' : 'Novo Produto'}
      </h1>
      <ProductForm product={serializeProduct(product)} isEdit />
    </div>
  );
}
