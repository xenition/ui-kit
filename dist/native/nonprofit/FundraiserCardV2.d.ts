import * as React from 'react';
import type { FundraiserCardProps } from './FundraiserCard';
/** Drop-in alternate of {@link FundraiserCardProps} — identical prop contract. */
export type FundraiserCardV2Props = FundraiserCardProps;
/**
 * FundraiserCard — design variant **V2**: an **organizer-forward profile card**.
 * Instead of a cover photo up top, V2 leads with the organizer's identity — a
 * large avatar over a tinted banner, an "Organized by" line, the title, the
 * progress meter (raised/goal in integer cents, divide-by-zero guarded
 * downstream), and donate / share actions. Floats on a drop shadow (no border).
 * Same props as {@link FundraiserCardProps}. Token-only.
 * Stays inside its own design line: the meter is {@link CampaignProgressV2}, not
 * the base one, because an app that picks V2 picks it for every surface it sees.
 */
export declare function FundraiserCardV2({ title, organizerName, organizerAvatarUrl, raisedCents, goalCents, currency, donorCount, variant, onDonate, onShare, loading, style, }: FundraiserCardV2Props): React.ReactElement;
//# sourceMappingURL=FundraiserCardV2.d.ts.map