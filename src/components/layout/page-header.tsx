import { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>

      {action && <div className="w-full sm:w-auto">{action}</div>}
    </div>
  );
}