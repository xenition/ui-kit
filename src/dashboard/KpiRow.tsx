import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatCard, type StatCardProps } from './StatCard';

export interface KpiRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The stat cards to lay out; each wraps to the next row as space allows. */
  items: StatCardProps[];
}

/**
 * A wrapping row of {@link StatCard}s — the KPI strip at the top of a dashboard.
 * Cards flex to at least ~44% width so two sit per row on a phone and wrap
 * gracefully on wider screens. Token-only spacing.
 */
export const KpiRow = React.forwardRef<HTMLDivElement, KpiRowProps>(function KpiRow(
  { items, className, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn('flex flex-wrap gap-md', className)} {...rest}>
      {items.map((item, i) => (
        <StatCard
          key={`${item.label}-${i}`}
          {...item}
          className={cn('grow basis-[44%]', item.className)}
        />
      ))}
    </div>
  );
});
