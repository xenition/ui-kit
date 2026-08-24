import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { formatMoney, type MoneyFormatter } from './internal/format';

export interface CoverageItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Coverage name (e.g. "Collision", "Water damage"). */
  label: string;
  /** Whether this coverage is included in the policy (default `true`). */
  included?: boolean;
  /** Coverage limit / benefit in integer **cents** (omit for "no limit"). */
  limitCents?: number;
  /** Supporting detail line (e.g. "Up to actual cash value"). */
  detail?: string;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
}

/**
 * One coverage line in a benefits breakdown: an included/excluded marker
 * (glyph + color, never color alone), the coverage label with optional detail,
 * and a right-aligned limit. Included reads `text-success`, excluded reads
 * `text-muted` — both semantic token slots. Limit is integer cents via
 * `formatMoney`; when omitted the line shows "—" rather than a fabricated value.
 * Web parity of the native `CoverageItem`.
 */
export const CoverageItem = React.forwardRef<HTMLDivElement, CoverageItemProps>(function CoverageItem(
  {
    label,
    included = true,
    limitCents,
    detail,
    currency = 'USD',
    formatMoney: format = formatMoney,
    className,
    ...rest
  },
  ref
) {
  const glyph = included ? '✓' : '✕';

  return (
    <div
      ref={ref}
      className={cn('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', className)}
      {...rest}
    >
      <span
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
          included ? 'bg-success/10' : 'bg-neutral-100'
        )}
      >
        <Icon
          glyph={glyph}
          size="sm"
          color={included ? 'success' : 'muted'}
          aria-label={included ? 'Included' : 'Not included'}
        />
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'truncate text-base font-semibold',
            included ? 'text-on-surface' : 'text-muted line-through'
          )}
        >
          {label}
        </p>
        {detail != null ? <p className="line-clamp-2 text-xs text-muted">{detail}</p> : null}
      </div>
      <span className="text-sm font-semibold text-on-surface">
        {included && limitCents != null ? format(Math.max(0, Math.trunc(limitCents)), currency) : '—'}
      </span>
    </div>
  );
});
