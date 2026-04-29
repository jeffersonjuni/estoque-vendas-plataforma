export function DashboardLoading() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-2xl bg-muted animate-pulse"
          />
        ))}
      </div>

      <div className="h-72 rounded-2xl bg-muted animate-pulse" />
    </div>
  );
}