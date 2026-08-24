import * as React from 'react';
import type { PackageCardProps } from './PackageCard';
/** Same public contract as {@link PackageCard} — a drop-in alternate design. */
export type PackageCardV3Props = PackageCardProps;
/**
 * PackageCard, redesigned (v3): a **compact package row**. The name (+ a Popular
 * chip) over a tagline·first-feature line, the price pinned right with its
 * suffix, and a small CTA — hairline-bordered for a packages list. The opposite
 * of v2's bold pricing card. Same props, token-only.
 */
export declare const PackageCardV3: React.ForwardRefExoticComponent<PackageCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PackageCardV3.d.ts.map