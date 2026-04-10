export function serializeProduct(product: any) {
  return {
    ...product,
    price: Number(product.price),
  };
}