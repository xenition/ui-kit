import * as React from 'react';
import type { FundraiserCardProps } from './FundraiserCard';
/** Drop-in for {@link FundraiserCardProps} — same props, the V4 "rally" design. */
export type FundraiserCardV4Props = FundraiserCardProps;
/**
 * FundraiserCard — **V4** "rally" design. The warm, mission-driven peer-to-peer
 * fundraiser card: an elevated rounded card with a soft shadow, an organizer
 * identity row, a cover (image or a friendly glyph in a soft-primary well), a
 * bold title, an inline `CampaignProgressV4` meter (raised/goal in integer cents,
 * with the donor meta), and donate / share actions. Honors all three `variant`s —
 * `default` (cover on top), `compact` (cover-less dense row), and `featured`
 * (larger cover + title) — identical props/behavior to {@link FundraiserCardProps}.
 * Token-only colors via `useXenitionTheme()`.
 */
export declare function FundraiserCardV4({ title, organizerName, organizerAvatarUrl, imageUrl, imageAlt, raisedCents, goalCents, currency, donorCount, variant, onDonate, onShare, loading, style, }: FundraiserCardV4Props): React.ReactElement;
//# sourceMappingURL=FundraiserCardV4.d.ts.map