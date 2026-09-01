import * as React from 'react';
import type { MatchingGiftBannerProps } from './MatchingGiftBanner';
/** Drop-in for {@link MatchingGiftBannerProps} — same props, the V4 "rally" design. */
export type MatchingGiftBannerV4Props = MatchingGiftBannerProps;
/**
 * MatchingGiftBanner — **V4** "rally" design. A rallying banner announcing a
 * gift-matching offer, drawn with the warm "rally" identity: a glyph in the tone
 * color, the sponsor + match ratio in a bold legible line, an optional
 * matched/cap progress bar (integer cents → `formatMoney`, cap divide-by-zero
 * guarded via `goalPct`), a deadline, and an optional CTA. Honors all three
 * `variant`s — `solid` (a strong primary fill with near-white `onPrimary` ink),
 * `soft` (a soft-primary tint via `withAlpha`), and `outline` (a bordered
 * surface) — identical props/behavior to {@link MatchingGiftBannerProps}. These
 * are token FILL treatments, not a brand gradient. Progress is a bar plus a
 * printed cap figure — not color alone. Token-only colors via
 * `useXenitionTheme()`.
 */
export declare function MatchingGiftBannerV4({ matcherName, multiplier, matchedCents, capCents, currency, deadlineLabel, actionLabel, onAction, variant, style, }: MatchingGiftBannerV4Props): React.ReactElement;
//# sourceMappingURL=MatchingGiftBannerV4.d.ts.map