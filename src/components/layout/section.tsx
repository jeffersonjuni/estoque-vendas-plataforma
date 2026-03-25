import { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export function Section({ children, className = '' }: SectionProps) {
  return (
    <section
      className={`rounded-2xl border border-border bg-card p-5 shadow-sm ${className}`}
    >
      {children}
    </section>
  );
}