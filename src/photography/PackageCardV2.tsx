import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button, Icon } from '../primitives';
import { PriceTag } from '../commerce';
import type { PackageCardProps } from './PackageCard';

/** Same public contract as {@link PackageCard} — a drop-in alternate design. */
export type PackageCardV2Props = PackageCardProps;

/**
 * PackageCard, redesigned (v2): a **bold pricing card**. A centered name/tagline
 * over a large {@link PriceTag} hero and suffix, then a checked feature list and
 * a full-width CTA; featured packages gain an accent ring + ribbon. A punchier
 * pricing block than v1. Same props, token-only.
 */
export const PackageCardV2 = React.forwardRef<HTMLDivElement, PackageCardV2Props>(function PackageCardV2(
  { name, tagline, priceCents, currency = 'USD', priceSuffix, features = [], featured = false, featuredLabel = 'Popular', onSelect, ctaLabel = 'Choose package', emptyFeaturesLabel, formatMoney, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      data-xen-package-card=""
      className={cn(
        'relative flex flex-col items-center gap-3 rounded-lg bg-surface p-md text-center shadow-md',
        featured && 'ring-2 ring-accent',
        className
      )}
      {...rest}
    >
      {featured ? <div className="absolute -top-2"><Badge tone="accent">{featuredLabel}</Badge></div> : null}
      <div className="mt-1">
        <p className="text-lg font-bold text-on-surface">{name}</p>
        {tagline ? <p className="text-xs text-muted">{tagline}</p> : null}
      </div>
      <div className="flex items-baseline gap-1">
        <PriceTag cents={priceCents} currency={currency} formatMoney={formatMoney} size="lg" />
        {priceSuffix ? <span className="text-xs text-muted">{priceSuffix}</span> : null}
      </div>
      {features.length > 0 ? (
        <ul className="flex w-full flex-col gap-1.5 text-left">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-on-surface">
              <Icon glyph="✓" size="sm" color="success" /> {f}
            </li>
          ))}
        </ul>
      ) : emptyFeaturesLabel ? (
        <p className="text-xs text-muted">{emptyFeaturesLabel}</p>
      ) : null}
      {onSelect ? (
        <Button size="md" variant={featured ? 'primary' : 'outline'} className="w-full" onClick={onSelect}>
          {ctaLabel}
        </Button>
      ) : null}
    </div>
  );
});
