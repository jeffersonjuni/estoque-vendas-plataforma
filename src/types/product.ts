export type ProductInput = {
  name: string;
  description?: string;
  sku?: string;
  category?: string;
  price: number;
  stock?: number;
};

export type UpdateProductInput = Partial<ProductInput>;