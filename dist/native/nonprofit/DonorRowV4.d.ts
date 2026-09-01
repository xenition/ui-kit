import * as React from 'react';
import type { DonorRowProps } from './DonorRow';
/** Drop-in for {@link DonorRowProps} — same props, the V4 "rally" design. */
export type DonorRowV4Props = DonorRowProps;
/**
 * DonorRow — **V4** "rally" design. An elevated, rounded donor / leaderboard row
 * on a clean surface (no gradient): a leading avatar in a soft-primary well, an
 * optional rank, a bold donor name with a glyph + labelled recognition-tier
 * {@link Badge} (never color alone), an optional gift-count chip, and a trailing
 * bold lifetime-giving total (integer cents → `formatMoney`). Anonymous donors
 * show a generic label + placeholder avatar. The whole row is pressable via
 * `onPress`. Identical props/behavior to {@link DonorRowProps}. Token-only colors
 * via `useXenitionTheme()`.
 */
export declare function DonorRowV4({ name, avatarUrl, totalCents, currency, giftCount, tier, rank, anonymous, onPress, style, }: DonorRowV4Props): React.ReactElement;
//# sourceMappingURL=DonorRowV4.d.ts.map