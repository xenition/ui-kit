import * as React from 'react';
import type { PackageCardProps } from './PackageCard';
/** Same public contract as {@link PackageCard} — a drop-in alternate design. */
export type PackageCardV2Props = PackageCardProps;
/**
 * PackageCard, redesigned (v2): a **bold pricing card**. A centered name/tagline
 * over a large {@link PriceTag} hero and suffix, then a checked feature list and
 * a full-width CTA; featured packages gain an accent ring + ribbon. A punchier
 * pricing block than v1. Same props, token-only.
 */
export declare const PackageCardV2: React.ForwardRefExoticComponent<PackageCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PackageCardV2.d.ts.map