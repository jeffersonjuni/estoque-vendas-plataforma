import { Product } from "@/types/product";

type ProductCardListProps = {
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

export function ProductCardList({ products }: ProductCardListProps) {
  return (
    <div className="grid gap-4 md:hidden">
      {products.map((product) => {
        const stockStatus = getStockStatus(product.stock);

        return (
          <div
            key={product.id}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {product.description || "Sem descrição"}
                </p>
              </div>

              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ${stockStatus.className}`}
              >
                {stockStatus.label}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">SKU</span>
                <span className="font-medium text-foreground">
                  {product.sku || "—"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Categoria</span>
                <span className="font-medium text-foreground">
                  {product.category || "—"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Preço</span>
                <span className="font-medium text-foreground">
                  {Number(product.price).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Estoque</span>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                  {product.stock}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}