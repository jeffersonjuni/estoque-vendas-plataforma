'use client';

export function ProductLoading() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-2xl bg-muted animate-pulse"
          />
        ))}
      </div>

      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-16 rounded-xl bg-muted animate-pulse"
        />
      ))}
    </div>
  );
}
