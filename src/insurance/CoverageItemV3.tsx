import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { formatMoney } from './internal/format';
import type { CoverageItemProps } from './CoverageItem';

/** Same public contract as {@link CoverageItem} — a drop-in alternate design. */
export type CoverageItemV3Props = CoverageItemProps;

/**
 * CoverageItem, redesigned (**V3**) — a **compact list line**. A bare leading
 * glyph (✓ included / ✕ excluded, colored by the success/muted slot but always
 * paired with the glyph and, for excluded, a struck label — never color-alone)
 * runs into the label and, on the right, the limit or an em-dash. No disc, no
 * card — the tightest possible benefits line. Same `CoverageItemProps` (integer
 * cents via `formatMoney`); drops in for `CoverageItem`. Token-pure.
 */
export const CoverageItemV3 = React.forwardRef<HTMLDivElement, CoverageItemV3Props>(
  function CoverageItemV3(
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
    const limit =
      included && limitCents != null ? format(Math.max(0, Math.trunc(limitCents)), currency) : '—';

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-xs)]',
          className
        )}
        {...rest}
      >
        <Icon
          glyph={included ? '✓' : '✕'}
          size="sm"
          color={included ? 'success' : 'muted'}
          aria-label={included ? 'Included' : 'Not included'}
          className="w-4 shrink-0 text-center"
        />
        <div className="flex min-w-0 flex-1 items-baseline gap-[var(--xen-space-xs)]">
          <span
            className={cn(
              'min-w-0 shrink truncate text-sm font-medium',
              included ? 'text-on-surface' : 'text-muted line-through'
            )}
          >
            {label}
          </span>
          {detail != null ? (
            <span className="min-w-0 shrink truncate text-xs text-muted">{detail}</span>
          ) : null}
        </div>
        <span
          className={cn(
            'shrink-0 text-xs font-semibold',
            included ? 'text-on-surface' : 'text-muted'
          )}
        >
          {limit}
        </span>
      </div>
    );
  }
);
