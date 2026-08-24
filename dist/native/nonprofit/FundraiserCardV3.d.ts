import * as React from 'react';
import type { FundraiserCardProps } from './FundraiserCard';
/** Drop-in alternate of {@link FundraiserCardProps} — identical prop contract. */
export type FundraiserCardV3Props = FundraiserCardProps;
/**
 * FundraiserCard — design variant **V3**: a **compact list row**. Organizer
 * avatar on the left, title + a hairline progress bar with a raised/percent line
 * in the middle, and a small Donate button on the right — a dense row for feeds
 * and search results. Progress is sized via `goalPct` (divide-by-zero guarded)
 * and always paired with a printed percent, never color alone. Same props as
 * {@link FundraiserCardProps}. Token-only; money is integer cents.
 */
export declare function FundraiserCardV3({ title, organizerName, organizerAvatarUrl, raisedCents, goalCents, currency, donorCount, onDonate, loading, style, }: FundraiserCardV3Props): React.ReactElement;
//# sourceMappingURL=FundraiserCardV3.d.ts.map