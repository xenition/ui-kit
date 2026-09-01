import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Icon } from '../primitives';
import { PriceTag } from '../commerce';
import type { PricePackageRowProps } from './PricePackageRow';

/** Drop-in for {@link PricePackageRowProps} — same props, the V4 "studio" design. */
export type PricePackageRowV4Props = PricePackageRowProps;

/**
 * PricePackageRow — **V4** "studio" design (web parity of the native V4). The
 * clean à-la-carte price line: an elevated surface row (no gradient — pricing
 * stays a crisp, legible surface) with the label set semibold, a muted detail
 * line, and the {@link PriceTag} right-aligned. A `highlighted` row keeps the
 * clean surface but earns a primary ring, a leading ✓ glyph, and a labelled
 * soft-primary chip (`badgeLabel`) — a marker, never color alone. Identical
 * props/behavior to {@link PricePackageRowProps}: honors `formatMoney` and
 * `unitSuffix`; passing `onClick` exposes it as a keyboard-operable `button`
 * (≥44px target) for quote building. All colors from `--xen-*` token classes.
 */
export const PricePackageRowV4 = React.forwardRef<HTMLDivElement, PricePackageRowV4Props>(
  function PricePackageRowV4(
    {
      label,
      description,
      priceCents,
      currency = 'USD',
      unitSuffix,
      highlighted = false,
      badgeLabel,
      formatMoney,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const interactive = typeof onClick === 'function';

    return (
      <div
        ref={ref}
        data-xen-price-package-row=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? label : undefined}
        onClick={onClick}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.currentTarget.click();
                }
              }
            : undefined
        }
        className={cn(
          'flex min-h-[44px] items-center justify-between gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-on-surface shadow-md',
          highlighted ? 'border-2 border-primary ring-1 ring-inset ring-primary' : 'border border-border',
          interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        {...rest}
      >
        <div className="flex flex-1 flex-col gap-0.5">
          <div className="flex flex-wrap items-center gap-[var(--xen-space-xs)]">
            {highlighted ? <Icon glyph="✓" size="sm" color="primary" /> : null}
            <span className="text-base font-semibold text-on-surface">{label}</span>
            {highlighted && badgeLabel ? (
              <Badge tone="primary" variant="soft">
                {badgeLabel}
              </Badge>
            ) : null}
          </div>
          {description ? <p className="text-xs text-muted">{description}</p> : null}
        </div>
        <div className="flex items-baseline gap-[var(--xen-space-xs)]">
          <PriceTag cents={priceCents} currency={currency} formatMoney={formatMoney} size="sm" />
          {unitSuffix ? <span className="text-xs text-muted">{unitSuffix}</span> : null}
        </div>
      </div>
    );
  }
);
