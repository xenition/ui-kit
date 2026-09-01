import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button, Icon } from '../primitives';
import { PriceTag } from '../commerce';
import type { PackageCardProps } from './PackageCard';

/** Drop-in for {@link PackageCardProps} — same props, the V4 "studio" design. */
export type PackageCardV4Props = PackageCardProps;

/**
 * PackageCard — **V4** "studio" design (web parity of the native V4). The clean,
 * price-forward take on a pricing package: an elevated surface card (no gradient
 * — pricing stays a crisp, legible surface) whose headline is the big, bold
 * {@link PriceTag} (`size="lg"`), the package name set bold above it with a muted
 * tagline, and the inclusions listed with a ✓ glyph. A `featured` ("popular")
 * package earns a labelled soft-primary chip **and** a primary ring — a marker,
 * never color alone. Identical props/behavior to {@link PackageCardProps}: honors
 * `formatMoney`, `priceSuffix`, `features`/`emptyFeaturesLabel`, and renders the
 * `onSelect` CTA when provided. All colors from `--xen-*` token classes (no
 * literals); ≥44px CTA tap target on 8-pt spacing.
 */
export const PackageCardV4 = React.forwardRef<HTMLDivElement, PackageCardV4Props>(
  function PackageCardV4(
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
      <div
        ref={ref}
        data-xen-package-card=""
        className={cn(
          'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-lg)] text-on-surface shadow-md',
          featured ? 'border-2 border-primary ring-1 ring-inset ring-primary' : 'border border-border',
          className
        )}
        {...rest}
      >
        <div className="flex items-start justify-between gap-[var(--xen-space-sm)]">
          <div className="flex flex-1 flex-col gap-0.5">
            <h3 className="font-heading text-lg font-bold text-on-surface">{name}</h3>
            {tagline ? <p className="text-sm text-muted">{tagline}</p> : null}
          </div>
          {featured ? (
            <Badge tone="primary" variant="soft">
              {featuredLabel}
            </Badge>
          ) : null}
        </div>

        {/* The price is the visual peak: big, bold PriceTag. */}
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
          <Button
            variant={featured ? 'primary' : 'outline'}
            className="min-h-[44px]"
            onClick={onSelect}
          >
            {ctaLabel}
          </Button>
        ) : null}
      </div>
    );
  }
);
