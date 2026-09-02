import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { SHIPMENT_META, formatWeight, pressableProps } from './internal';
import type { PackageRowProps } from './PackageRow';

/** V4 layout choices for the "dispatch" design. */
export type PackageRowLayout = 'full' | 'compact';

/** Drop-in for {@link PackageRowProps} — same props, the V4 "dispatch" design. */
export interface PackageRowV4Props extends PackageRowProps {
  /** V4 layout: `full` (default) or `compact` (denser single line). */
  variant?: PackageRowLayout;
}

/**
 * PackageRow — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a parcel row: an elevated rounded row with
 * a soft shadow, a parcel glyph in a soft-primary well, the package-id headline,
 * a contents sub-line, a weight · dimensions metric chip, and a labelled glyph +
 * word status badge (never color alone). Selection is shown by a primary ring +
 * `aria-selected`; clickable when `onClick` is set. Honors the V4 `variant` —
 * `full` (default) and `compact` (a denser single line that hides the metric
 * detail) — identical props/behavior to {@link PackageRowProps}. All colors from
 * `--xen-*` token classes (no literals).
 */
export const PackageRowV4 = React.forwardRef<HTMLDivElement, PackageRowV4Props>(function PackageRowV4(
  {
    packageId,
    contents,
    weight,
    weightUnit = 'kg',
    dimensions,
    status,
    selected = false,
    variant = 'full',
    onClick,
    className,
    ...rest
  },
  ref
) {
  const meta = status ? SHIPMENT_META[status] : undefined;
  const interactive = pressableProps(onClick);
  const metric = [weight != null ? formatWeight(weight, weightUnit) : null, dimensions]
    .filter(Boolean)
    .join(' · ');
  const shell = 'rounded-[var(--xen-radius-lg)] border bg-surface text-on-surface shadow-sm';
  const a11y = `Package ${packageId}${meta ? `, ${meta.label}` : ''}`;

  const statusBadge = meta ? (
    <Badge tone={meta.tone} variant="soft" size="sm">
      <span aria-hidden="true">{meta.glyph}</span> {meta.label}
    </Badge>
  ) : null;

  // ── compact: denser single line ──
  if (variant === 'compact') {
    return (
      <div
        ref={ref}
        data-xen-package-row=""
        aria-label={interactive ? a11y : undefined}
        aria-selected={interactive ? selected : undefined}
        className={cn(
          shell,
          'flex min-h-[44px] items-center gap-[var(--xen-space-sm)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          selected ? 'border-primary' : 'border-border',
          interactive &&
            'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...interactive}
        {...rest}
      >
        <span aria-hidden="true" className="text-base">
          📦
        </span>
        <span className="truncate text-sm font-semibold text-on-surface">{packageId}</span>
        {weight != null ? (
          <span className="whitespace-nowrap text-xs tabular-nums text-muted">{formatWeight(weight, weightUnit)}</span>
        ) : null}
        <span className="ml-auto">{statusBadge}</span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-xen-package-row=""
      aria-label={interactive ? a11y : undefined}
      aria-selected={interactive ? selected : undefined}
      className={cn(
        shell,
        'flex min-h-[56px] items-center gap-[var(--xen-space-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        selected ? 'border-primary' : 'border-border',
        interactive &&
          'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10 text-lg">
        <span aria-hidden="true">📦</span>
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-base font-semibold text-on-surface">{packageId}</span>
        {contents ? <span className="truncate text-xs text-muted">{contents}</span> : null}
        {metric ? (
          <span className="inline-flex w-fit items-center rounded-[var(--xen-radius-sm)] bg-primary/10 px-[var(--xen-space-xs)] text-xs tabular-nums text-muted">
            {metric}
          </span>
        ) : null}
      </div>

      {statusBadge}
    </div>
  );
});
