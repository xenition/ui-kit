import * as React from 'react';
import type { PackageCardProps } from './PackageCard';
/** Drop-in alternate of {@link PackageCardProps} — identical prop contract. */
export type PackageCardV2Props = PackageCardProps;
/**
 * PackageCard — design variant **V2**: an **elevated pricing card** with a
 * corner **ribbon**. Featured packages float on an `xl` shadow, an accent ribbon
 * band runs across the top-right corner, and a big centred price sits above a
 * checked feature list and a full-width CTA — the "recommended tier" look of a
 * pricing table. Featured state carries the labelled ribbon, not colour alone.
 * Same props as {@link PackageCardProps}; token-only, empty-features fallback.
 */
export declare function PackageCardV2({ name, tagline, priceCents, currency, priceSuffix, features, featured, featuredLabel, onSelect, ctaLabel, emptyFeaturesLabel, formatMoney, style, }: PackageCardV2Props): React.ReactElement;
//# sourceMappingURL=PackageCardV2.d.ts.map