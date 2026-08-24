import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Badge, Button, Icon } from '../primitives';
import { PriceTag, type MoneyFormatter } from '../commerce';

export interface PackageCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Package name (e.g. "Wedding — Gold"). */
  name: string;
  /** Short positioning line. */
  tagline?: string;
  /** Price in integer cents. */
  priceCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Billing / unit suffix (e.g. "per event", "starting at"). */
  priceSuffix?: string;
  /** Included features, rendered as a checked list. */
  features?: string[];
  /** Highlights this package (accent ring + "Popular" badge). */
  featured?: boolean;
  /** Ribbon text when `featured` (default `Popular`). */
  featuredLabel?: string;
  /** Book / select handler; renders the CTA when provided. */
  onSelect?: () => void;
  /** CTA label (default `Choose package`). */
  ctaLabel?: string;
  /** Copy when `features` is empty. */
  emptyFeaturesLabel?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
}

/**
 * A photography pricing package — name, tagline, a headline {@link PriceTag}
 * with a unit suffix, a checked feature list, and a select CTA. `featured`
 * rings the card in the accent token and shows a "Popular" `Badge` (a labelled
 * marker, not color alone). Falls back to an empty-features line. Composes
 * `Card`, `Badge`, `Button`, `Icon`, `PriceTag`. Token-only colors.
 */
export const PackageCard = React.forwardRef<HTMLDivElement, PackageCardProps>(function PackageCard(
  {
    name,
    tagline,
    priceCents,
    currency = 'USD',
    priceSuffix,
    features,
    featured = false,
    featuredLabel = 'Popular',
    onSelect,
    ctaLabel = 'Choose package',
    emptyFeaturesLabel = 'Details coming soon',
    formatMoney,
    className,
    ...rest
  },
  ref
) {
  const list = features ?? [];

  return (
    <Card
      ref={ref}
      data-xen-package-card=""
      className={cn(
        'flex flex-col gap-[var(--xen-space-md)]',
        featured ? 'border-2 border-accent' : 'border border-border',
        className
      )}
      {...rest}
    >
      <div className="flex items-start justify-between gap-[var(--xen-space-sm)]">
        <div className="flex flex-1 flex-col gap-0.5">
          <h3 className="font-heading text-lg font-bold text-on-surface">{name}</h3>
          {tagline ? <p className="text-sm text-muted">{tagline}</p> : null}
        </div>
        {featured ? <Badge tone="primary">{featuredLabel}</Badge> : null}
      </div>

      <div className="flex items-baseline gap-[var(--xen-space-xs)]">
        <PriceTag cents={priceCents} currency={currency} formatMoney={formatMoney} size="lg" />
        {priceSuffix ? <span className="text-sm text-muted">{priceSuffix}</span> : null}
      </div>

      <div className="flex flex-col gap-[var(--xen-space-xs)]">
        {list.length === 0 ? (
          <p className="text-sm text-muted">{emptyFeaturesLabel}</p>
        ) : (
          list.map((feature, i) => (
            <div key={i} className="flex items-center gap-[var(--xen-space-sm)]">
              <Icon glyph="✓" size="sm" color="success" />
              <span className="flex-1 text-sm text-on-surface">{feature}</span>
            </div>
          ))
        )}
      </div>

      {onSelect ? (
        <Button variant={featured ? 'primary' : 'outline'} onClick={onSelect}>
          {ctaLabel}
        </Button>
      ) : null}
    </Card>
  );
});
