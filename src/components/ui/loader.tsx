import clsx from 'clsx';

type LoaderSize = 'sm' | 'md' | 'lg';

type LoaderProps = {
  size?: LoaderSize;
  className?: string;
};

export function Loader({ size = 'md', className }: LoaderProps) {
  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-2 border-muted border-t-primary',
        {
          'h-4 w-4': size === 'sm',
          'h-6 w-6': size === 'md',
          'h-8 w-8': size === 'lg',
        },
        className
      )}
    />
  );
}