import * as React from 'react';
import { cn } from '../primitives/cn';
import { CARD_SHELL } from './_tokens';

export interface WellnessStat {
  label: string;
  value: React.ReactNode;
  unit?: string;
  glyph?: string;
}

export interface StatsSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: WellnessStat[];
}

/**
 * StatsSummary — an overview row of headline numbers on a clean card, split by
 * thin border dividers. Each stat shows an optional glyph, a big value with a
 * muted unit, and a muted label. Restraint is the point: the card stays surface
 * + border, and only the first stat's value picks up the primary accent — one
 * colored number, not a rainbow. Token-only colors.
 */
export const StatsSummary = React.forwardRef<HTMLDivElement, StatsSummaryProps>(function StatsSummary(
  { stats, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      role="group"
      className={cn(CARD_SHELL, 'flex items-stretch p-5 shadow-sm', className)}
      {...rest}
    >
      {stats.map((stat, i) => {
        const valueText =
          typeof stat.value === 'string' || typeof stat.value === 'number' ? String(stat.value) : '';
        return (
          <div
            key={`${stat.label}-${i}`}
            aria-label={`${stat.label}: ${valueText}${stat.unit ? ' ' + stat.unit : ''}`}
            className={cn(
              'flex flex-1 flex-col items-center gap-[var(--xen-space-xs)] px-[var(--xen-space-md)]',
              i > 0 && 'border-l border-border'
            )}
          >
            {stat.glyph ? (
              <span aria-hidden="true" className="text-lg leading-none">
                {stat.glyph}
              </span>
            ) : null}
            <p className="text-center">
              <span className={cn('text-2xl font-extrabold', i === 0 ? 'text-primary' : 'text-on-surface')}>
                {stat.value}
              </span>
              {stat.unit ? <span className="text-sm font-semibold text-muted"> {stat.unit}</span> : null}
            </p>
            <span className="truncate text-xs text-muted">{stat.label}</span>
          </div>
        );
      })}
    </div>
  );
});
