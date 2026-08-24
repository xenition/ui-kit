import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { SHIPMENT_META, formatWeight, pressableProps, type ShipmentStatus } from './internal';

export interface PackageRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Package / parcel id (headline). */
  packageId: string;
  /** Human contents description or SKU. */
  contents?: string;
  /** Weight amount in the given `weightUnit`. */
  weight?: number;
  /** Weight unit (default `kg`). */
  weightUnit?: 'kg' | 'lb' | 'g' | 'oz';
  /** Dimensions string (e.g. `30×20×15 cm`). */
  dimensions?: string;
  /** Lifecycle status — glyph + word badge, never color alone. */
  status?: ShipmentStatus;
  /** Selection state (adds a primary border + a11y selected state). */
  selected?: boolean;
  /** Makes the row clickable. */
  onClick?: () => void;
}

/**
 * Dense list row for a single package: id headline, contents/SKU sub-line, a
 * weight + dimensions metric line, and an optional glyph + word status badge.
 * Clickable when `onClick` is given (button role + descriptive label). Selection
 * is shown by a primary border plus `aria-selected`, not by color alone (the
 * status still carries a word). All colors are theme tokens. Web parity of the
 * native `PackageRow`.
 */
export const PackageRow = React.forwardRef<HTMLDivElement, PackageRowProps>(function PackageRow(
  {
    packageId,
    contents,
    weight,
    weightUnit = 'kg',
    dimensions,
    status,
    selected = false,
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

  return (
    <div
      ref={ref}
      aria-label={interactive ? `Package ${packageId}${meta ? `, ${meta.label}` : ''}` : undefined}
      aria-selected={interactive ? selected : undefined}
      className={cn(
        'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border bg-surface p-[var(--xen-space-sm)]',
        selected ? 'border-primary' : 'border-border',
        interactive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] bg-neutral-100 text-base text-muted">
        <span aria-hidden="true">📦</span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-semibold text-on-surface">{packageId}</span>
        {contents ? <span className="truncate text-xs text-muted">{contents}</span> : null}
        {metric ? <span className="truncate text-xs text-muted">{metric}</span> : null}
      </div>

      {meta ? (
        <Badge tone={meta.tone} variant="soft" size="sm">
          {`${meta.glyph} ${meta.label}`}
        </Badge>
      ) : null}
    </div>
  );
});
