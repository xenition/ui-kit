import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Badge } from '../primitives/Badge';
import { formatMoney } from './internal/format';
import type { CoverageItemProps } from './CoverageItem';

/** Same public contract as {@link CoverageItem} — a drop-in alternate design. */
export type CoverageItemV2Props = CoverageItemProps;

/**
 * CoverageItem, redesigned (**V2**) — a **standalone elevated card**. An
 * included / excluded `Badge` (glyph + text + color, never color-alone) sits
 * top-right of the coverage label and detail; the limit lives in its own tinted
 * block below so the benefit ceiling is easy to scan. Excluded coverage dims and
 * strikes the label and shows "Not covered". Same `CoverageItemProps` (integer
 * cents via `formatMoney`); drops in for `CoverageItem`. Token-pure.
 */
export const CoverageItemV2 = React.forwardRef<HTMLDivElement, CoverageItemV2Props>(
  function CoverageItemV2(
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
      included && limitCents != null ? format(Math.max(0, Math.trunc(limitCents)), currency) : null;

    return (
      <Card
        ref={ref}
        variant="elevated"
        padding="md"
        radius="md"
        className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)}
        {...rest}
      >
        <div className="flex items-start gap-[var(--xen-space-md)]">
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                'text-base font-bold',
                included ? 'text-on-surface' : 'text-muted line-through'
              )}
            >
              {label}
            </p>
            {detail != null ? <p className="line-clamp-3 text-xs text-muted">{detail}</p> : null}
          </div>
          <Badge tone={included ? 'success' : 'neutral'} variant="soft" size="sm">
            <span aria-hidden="true">{included ? '✓' : '✕'}</span>{' '}
            {included ? 'Included' : 'Excluded'}
          </Badge>
        </div>

        <div
          className={cn(
            'flex items-center justify-between rounded-[var(--xen-radius-sm)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
            included ? 'bg-success/10' : 'bg-neutral-100'
          )}
        >
          <span className="text-xs font-semibold text-muted">
            {included ? 'Coverage limit' : 'Status'}
          </span>
          <span
            className={cn('text-sm font-bold', included ? 'text-on-surface' : 'text-muted')}
          >
            {included ? limit ?? 'No limit' : 'Not covered'}
          </span>
        </div>
      </Card>
    );
  }
);
