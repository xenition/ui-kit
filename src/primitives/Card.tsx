import * as React from 'react';
import { cn } from './cn';

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

/** Themed surface container: token-bound background, border, and radius. */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-surface text-on-surface border border-border shadow-sm',
        'rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    />
  );
});
