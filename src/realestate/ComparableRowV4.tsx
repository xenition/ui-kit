import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives';
import { formatMoney } from '../commerce';
import { clickableProps } from './internal';
import type { ComparableRowProps, ComparableStatus } from './ComparableRow';

/** Drop-in for {@link ComparableRowProps} — same props, the V4 "listing" design. */
export type ComparableRowV4Props = ComparableRowProps;

const STATUS_TONE: Record<ComparableStatus, BadgeTone> = {
  active: 'success',
  pending: 'warn',
  sold: 'neutral',
};

/**
 * ComparableRow — **V4** "listing" design (web parity of the native V4). The
 * image-forward, editorial take on a comparable-sale ("comp") row: a small
 * rounded thumbnail, the address, the price-forward sold figure, beds/baths/sqft
 * facts as soft-primary chips, and a derived $/sqft indicator. The row itself
 * stays clean surface (no gradient). The $/sqft is guarded against a missing or
 * zero `sqft`. Same props/behavior as {@link ComparableRowProps}. All colors
 * from `--xen-*` token classes (no literals). Pass `onClick` to make the row a
 * keyboard-activatable button.
 */
export const ComparableRowV4 = React.forwardRef<HTMLDivElement, ComparableRowV4Props>(function ComparableRowV4(
  { address, priceCents, currency = 'USD', sqft, beds, baths, distance, status, onClick, className, ...rest },
  ref
) {
  const perSqft = typeof sqft === 'number' && sqft > 0 ? Math.round(priceCents / sqft) : null;
  const facts: string[] = [];
  if (typeof beds === 'number') facts.push(`${beds} bd`);
  if (typeof baths === 'number') facts.push(`${baths} ba`);
  if (typeof sqft === 'number') facts.push(`${sqft.toLocaleString()} sqft`);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-md)] text-on-surface shadow-md',
        onClick && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...clickableProps(
        onClick as React.MouseEventHandler | undefined,
        `${address}, ${formatMoney(priceCents, currency)}${facts.length ? `, ${facts.join(', ')}` : ''}`
      )}
      {...rest}
    >
      {/* Small rounded thumbnail placeholder — image-forward even for a comp. */}
      <span
        aria-hidden="true"
        className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-primary/10 text-base"
      >
        🏠
      </span>
      <div className="flex flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="min-w-0 shrink truncate text-sm font-bold text-on-surface">{address}</span>
          {status ? (
            <Badge tone={STATUS_TONE[status]} variant="soft">
              {status}
            </Badge>
          ) : null}
        </div>
        {facts.length > 0 || distance ? (
          <div className="mt-0.5 flex flex-wrap items-center gap-1">
            {facts.map((f) => (
              <span key={f} className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-on-surface">
                {f}
              </span>
            ))}
            {distance ? <span className="text-xs text-muted">{distance}</span> : null}
          </div>
        ) : null}
      </div>
      <div className="flex flex-col items-end">
        <span className="text-base font-bold text-on-surface">{formatMoney(priceCents, currency)}</span>
        {perSqft != null ? <span className="text-xs text-muted">{`${formatMoney(perSqft, currency)}/sqft`}</span> : null}
      </div>
    </div>
  );
});
