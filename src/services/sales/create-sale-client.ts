type CreateSalePayload = {
  items: {
    productId: string;
    quantity: number;
  }[];
};

export async function createSaleClient(payload: CreateSalePayload) {
  const response = await fetch('/api/sales', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Erro ao finalizar venda.');
  }

  return data;
}