import * as React from 'react';
import type { PackageCardProps } from './PackageCard';
/** Drop-in alternate of {@link PackageCardProps} — identical prop contract. */
export type PackageCardV3Props = PackageCardProps;
/**
 * PackageCard — design variant **V3**: a **minimal price line**. Name + tagline
 * on the left, the price hugging the right on a single hairline-separated row,
 * with the feature list collapsed to a muted count and the whole row tappable to
 * select — a lightweight list entry for a stacked package menu, not a pricing
 * card. Featured still shows a labelled `Badge`. Same props as
 * {@link PackageCardProps}; token-only, empty-features safe.
 */
export declare function PackageCardV3({ name, tagline, priceCents, currency, priceSuffix, features, featured, featuredLabel, onSelect, emptyFeaturesLabel, formatMoney, style, }: PackageCardV3Props): React.ReactElement;
//# sourceMappingURL=PackageCardV3.d.ts.map