import * as React from 'react';
import type { PackageCardProps } from './PackageCard';
/** Drop-in for {@link PackageCardProps} — same props, the V4 "studio" design. */
export type PackageCardV4Props = PackageCardProps;
/**
 * PackageCard — **V4** "studio" design. The clean, price-forward take on a
 * pricing package: an elevated surface card (no gradient — pricing stays a crisp,
 * legible surface) whose headline is the big, bold {@link PriceTag} (`size="lg"`),
 * the package name set bold above it with a muted tagline, and the inclusions
 * listed with a ✓ glyph. A `featured` ("popular") package earns a labelled
 * soft-primary chip **and** a primary ring — a marker, never color alone.
 * Identical props/behavior to {@link PackageCardProps}: honors `formatMoney`,
 * `priceSuffix`, `features`/`emptyFeaturesLabel`, and renders the `onSelect` CTA
 * when provided. Token-only colors via `useXenitionTheme()`; 8-pt spacing.
 */
export declare function PackageCardV4({ name, tagline, priceCents, currency, priceSuffix, features, featured, featuredLabel, onSelect, ctaLabel, emptyFeaturesLabel, formatMoney, style, }: PackageCardV4Props): React.ReactElement;
//# sourceMappingURL=PackageCardV4.d.ts.map