import { Product } from "@/types/product";

type ProductTableProps = {
  products: Product[];
};

function getStockStatus(stock: number) {
  if (stock === 0) {
    return {
      label: "Sem estoque",
      className:
        "bg-destructive/10 text-destructive border border-destructive/20",
    };
  }

  if (stock <= 5) {
    return {
      label: "Estoque baixo",
      className:
        "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20",
    };
  }

  return {
    label: "Em estoque",
    className:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    };
}

export function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:block">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-muted/50 text-left">
            <tr className="border-b border-border">
              <th className="px-6 py-4 font-medium text-muted-foreground">Produto</th>
              <th className="px-6 py-4 font-medium text-muted-foreground">SKU</th>
              <th className="px-6 py-4 font-medium text-muted-foreground">Categoria</th>
              <th className="px-6 py-4 font-medium text-muted-foreground">Preço</th>
              <th className="px-6 py-4 font-medium text-muted-foreground">Estoque</th>
              <th className="px-6 py-4 font-medium text-muted-foreground">Status</th>
              <th className="px-6 py-4 font-medium text-muted-foreground">Criado em</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const stockStatus = getStockStatus(product.stock);

              return (
                <tr
                  key={product.id}
                  className="border-b border-border transition-colors hover:bg-muted/30"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {product.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {product.description || "Sem descrição"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-muted-foreground">
                    {product.sku || "—"}
                  </td>

                  <td className="px-6 py-4 text-muted-foreground">
                    {product.category || "—"}
                  </td>

                  <td className="px-6 py-4 font-medium text-foreground">
                    {Number(product.price).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                      {product.stock}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${stockStatus.className}`}
                    >
                      {stockStatus.label}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(product.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}