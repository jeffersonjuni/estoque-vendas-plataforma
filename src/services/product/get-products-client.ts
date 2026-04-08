import { Product } from "@/types/product";

export async function getProductsClient(): Promise<Product[]> {
  const response = await fetch("/api/products", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos.");
  }

  return response.json();
}