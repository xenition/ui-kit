import * as React from 'react';
import { cn } from '../primitives/cn';
import type { Salary } from './types';
import { formatSalary } from './format';

export type SalaryRangeSize = 'sm' | 'md' | 'lg';

export interface SalaryRangeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** The salary band. Either bound may be omitted. */
  salary?: Salary | null;
  /** Text size from the type scale. Default `'md'`. */
  size?: SalaryRangeSize;
  /** Override the rendered label (bypasses the built-in formatter). */
  format?: (salary: Salary) => string;
  /** Shown when the band has no bounds. Default `'Salary not disclosed'`. */
  emptyLabel?: string;
  /** Leading glyph. Default `'💰'`; pass `null` to hide. */
  glyph?: string | null;
}

const TEXT_CLASS: Record<SalaryRangeSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

/**
 * Inline salary-band label — e.g. `💰 $90k – $120k/yr`. Data-only: pass a
 * {@link Salary} and it formats a compact range, a `From …`/`Up to …` label for
 * a single bound, or the `emptyLabel` when nothing is disclosed. All colors come
 * from theme tokens (`text-on-surface` for the amount, `text-muted` for the
 * empty hint) — no literal colors (kit lint rule).
 */
export const SalaryRange = React.forwardRef<HTMLSpanElement, SalaryRangeProps>(function SalaryRange(
  { salary, size = 'md', format, emptyLabel = 'Salary not disclosed', glyph = '💰', className, ...rest },
  ref
) {
  const label = salary && format ? format(salary) : formatSalary(salary);
  const disclosed = label != null;
  const text = disclosed ? label : emptyLabel;

  return (
    <span
      ref={ref}
      data-xen-salary-range=""
      role="text"
      aria-label={disclosed ? `Salary ${text}` : emptyLabel}
      className={cn('inline-flex items-center gap-xs', TEXT_CLASS[size], className)}
      {...rest}
    >
      {glyph && disclosed ? (
        <span aria-hidden="true">{glyph}</span>
      ) : null}
      <span
        className={cn(
          disclosed ? 'font-semibold text-on-surface' : 'italic font-normal text-muted'
        )}
      >
        {text}
      </span>
    </span>
  );
});
