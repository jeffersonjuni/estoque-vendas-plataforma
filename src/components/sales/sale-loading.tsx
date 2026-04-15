'use client';

export function SaleLoading() {
  return (
    <div className="space-y-4">
      <div className="h-20 w-full animate-pulse rounded-2xl bg-muted" />
      <div className="h-64 w-full animate-pulse rounded-2xl bg-muted" />
      <div className="h-48 w-full animate-pulse rounded-2xl bg-muted" />
    </div>
  );
}