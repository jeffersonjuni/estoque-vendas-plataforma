import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        {
          'bg-primary text-primary-foreground hover:opacity-90': variant === 'primary',
          'bg-secondary text-secondary-foreground hover:opacity-90': variant === 'secondary',
          'border border-border bg-card text-foreground hover:bg-muted': variant === 'outline',
          'bg-destructive text-destructive-foreground hover:opacity-90': variant === 'danger',
          'bg-transparent text-foreground hover:bg-muted': variant === 'ghost',

          'h-9 px-3 text-sm': size === 'sm',
          'h-10 px-4 text-sm': size === 'md',
          'h-11 px-6 text-base': size === 'lg',

          'w-full sm:w-auto': fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}