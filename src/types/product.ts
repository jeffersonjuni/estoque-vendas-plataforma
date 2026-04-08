export type ProductInput = {
  name: string;
  description?: string;
  sku?: string;
  category?: string;
  price: number;
  stock?: number;
};

export type UpdateProductInput = Partial<ProductInput>;

export type Product = {
  id: string;
  name: string;
  description: string | null;
  sku: string | null;
  category: string | null;
  price: string;
  stock: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
};