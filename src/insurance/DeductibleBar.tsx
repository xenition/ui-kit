import * as React from 'react';
import { cn } from '../primitives/cn';
import { Progress } from '../primitives/Progress';
import { formatMoney, type MoneyFormatter, formatPct } from './internal/format';

export interface DeductibleBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Amount already applied toward the deductible, in integer **cents**. */
  metCents: number;
  /** Deductible ceiling, in integer **cents**. */
  deductibleCents: number;
  /** Label above the bar (default "Deductible"). */
  label?: string;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
}

/**
 * Progress toward an annual deductible: a token `Progress` bar sized to
 * `met / deductible` with a "met of ceiling" caption and a remaining/"met"
 * line. The bar tone shifts as the deductible is satisfied — `warn` in
 * progress, `success` once fully met — both tracing to semantic token slots. A
 * `deductibleCents <= 0` ceiling is guarded (treated as fully met, no
 * divide-by-zero). Amounts are integer cents via `formatMoney`. Web parity of
 * the native `DeductibleBar`.
 */
export const DeductibleBar = React.forwardRef<HTMLDivElement, DeductibleBarProps>(
  function DeductibleBar(
    {
      metCents,
      deductibleCents,
      label = 'Deductible',
      currency = 'USD',
      formatMoney: format = formatMoney,
      className,
      ...rest
    },
    ref
  ) {
    const met = Number.isFinite(metCents) ? Math.max(0, Math.trunc(metCents)) : 0;
    const ceiling = Number.isFinite(deductibleCents) ? Math.max(0, Math.trunc(deductibleCents)) : 0;
    const clampedMet = ceiling > 0 ? Math.min(met, ceiling) : met;
    const ratio = ceiling > 0 ? clampedMet / ceiling : 1;
    const fullyMet = ratio >= 1;
    const remaining = Math.max(0, ceiling - met);

    return (
      <div ref={ref} className={cn('flex flex-col gap-[var(--xen-space-xs)]', className)} {...rest}>
        <div className="flex items-baseline justify-between">
          <span className="min-w-0 flex-1 truncate text-sm font-semibold text-on-surface">{label}</span>
          <span className="text-xs text-muted">
            {format(clampedMet, currency)} / {format(ceiling, currency)}
          </span>
        </div>
        <Progress
          value={ratio * 100}
          max={100}
          tone={fullyMet ? 'success' : 'warn'}
          aria-label={`${label}, ${formatPct(ratio * 100)} met`}
        />
        <span className={cn('text-xs', fullyMet ? 'text-success' : 'text-muted')}>
          {fullyMet ? 'Deductible met' : `${format(remaining, currency)} to go`}
        </span>
      </div>
    );
  }
);
