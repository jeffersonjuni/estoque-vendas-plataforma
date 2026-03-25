import { ReactNode } from 'react';
import clsx from 'clsx';

type TableProps = {
  children: ReactNode;
  className?: string;
};

type TableSectionProps = {
  children: ReactNode;
  className?: string;
};

type TableRowProps = {
  children: ReactNode;
  className?: string;
};

type TableCellProps = {
  children: ReactNode;
  className?: string;
};

export function Table({ children, className }: TableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-border">
      <table className={clsx('w-full text-left text-sm', className)}>
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children, className }: TableSectionProps) {
  return (
    <thead className={clsx('bg-muted/60 text-muted-foreground', className)}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className }: TableSectionProps) {
  return <tbody className={clsx('bg-card', className)}>{children}</tbody>;
}

export function TableRow({ children, className }: TableRowProps) {
  return (
    <tr className={clsx('border-b border-border last:border-0', className)}>
      {children}
    </tr>
  );
}

export function TableHeaderCell({
  children,
  className,
}: TableCellProps) {
  return (
    <th className={clsx('px-4 py-3 font-semibold text-foreground', className)}>
      {children}
    </th>
  );
}

export function TableCell({ children, className }: TableCellProps) {
  return (
    <td className={clsx('px-4 py-3 text-foreground', className)}>
      {children}
    </td>
  );
}