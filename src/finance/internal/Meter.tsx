import * as React from 'react';
import { cn } from '../../primitives/cn';

/**
 * Token color slots a finance bar / glyph can take — the web mirror of the
 * native `keyof SemanticColors` accents actually used in this module, and a
 * superset-safe match for the chart `ChartColor` union.
 */
export type FinanceColor = 'primary' | 'accent' | 'success' | 'warn' | 'danger' | 'muted';

const BAR_BG: Record<FinanceColor, string> = {
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
  muted: 'bg-muted',
};

export interface MeterProps {
  /** Fill percentage `0`–`100` (clamped, NaN → 0). */
  value: number;
  /** Token color slot for the fill (default `primary`). */
  color?: FinanceColor;
  /** Announced label for the progress bar. */
  'aria-label'?: string;
  className?: string;
}

/**
 * A thin, token-bound horizontal progress bar — the DOM analog of the native
 * `MiniBar`. A `--xen-border` track holds a `bg-<color>` fill sized by `value`
 * (percent); every color traces to a token class, never a literal.
 */
export function Meter({
  value,
  color = 'primary',
  'aria-label': ariaLabel,
  className,
}: MeterProps): React.ReactElement {
  const pct = Number.isFinite(value) ? Math.min(Math.max(value, 0), 100) : 0;
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
      className={cn(
        'h-2 w-full overflow-hidden rounded-[var(--xen-radius-full)] bg-border',
        className
      )}
    >
      <div
        className={cn('h-full rounded-[var(--xen-radius-full)]', BAR_BG[color])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
