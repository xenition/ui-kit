import * as React from 'react';
import type { DonationCardProps } from './DonationCard';
/** Same public contract as {@link DonationCard} — a drop-in alternate design. */
export type DonationCardV3Props = DonationCardProps;
/**
 * DonationCard, redesigned (v3): a **compact inline ask**. The title on one line,
 * a horizontal strip of small preset pills, and a right-aligned Donate button —
 * borderless and tight for embedding in a feed. The opposite of v2's bold grid
 * card. Same props, token-only.
 */
export declare const DonationCardV3: React.ForwardRefExoticComponent<DonationCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DonationCardV3.d.ts.map