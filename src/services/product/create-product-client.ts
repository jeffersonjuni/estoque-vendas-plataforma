import { ProductInput } from "@/types/product";

export async function createProduct(data: ProductInput) {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao criar produto");
  }

  return response.json();
}