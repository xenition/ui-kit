import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button } from '../primitives';
import { PriceTag } from '../commerce';
import type { PackageCardProps } from './PackageCard';

/** Same public contract as {@link PackageCard} — a drop-in alternate design. */
export type PackageCardV3Props = PackageCardProps;

/**
 * PackageCard, redesigned (v3): a **compact package row**. The name (+ a Popular
 * chip) over a tagline·first-feature line, the price pinned right with its
 * suffix, and a small CTA — hairline-bordered for a packages list. The opposite
 * of v2's bold pricing card. Same props, token-only.
 */
export const PackageCardV3 = React.forwardRef<HTMLDivElement, PackageCardV3Props>(function PackageCardV3(
  { name, tagline, priceCents, currency = 'USD', priceSuffix, features = [], featured = false, featuredLabel = 'Popular', onSelect, ctaLabel = 'Choose', emptyFeaturesLabel, formatMoney, className, ...rest },
  ref
) {
  void emptyFeaturesLabel;
  const sub = [tagline, features[0]].filter((s): s is string => !!s).join(' · ');

  return (
    <div
      ref={ref}
      data-xen-package-card=""
      className={cn('flex items-center gap-3 border-b border-border py-3', featured && 'border-l-2 border-l-accent pl-2', className)}
      {...rest}
    >
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-on-surface">
          {name}
          {featured ? <Badge tone="accent">{featuredLabel}</Badge> : null}
        </p>
        {sub ? <p className="truncate text-xs text-muted">{sub}</p> : null}
      </div>
      <div className="flex flex-col items-end">
        <PriceTag cents={priceCents} currency={currency} formatMoney={formatMoney} size="sm" />
        {priceSuffix ? <span className="text-xs text-muted">{priceSuffix}</span> : null}
      </div>
      {onSelect ? (
        <Button size="sm" variant="outline" onClick={onSelect}>
          {ctaLabel}
        </Button>
      ) : null}
    </div>
  );
});
