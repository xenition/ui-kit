import * as React from 'react';
import type { MatchingGiftBannerProps } from './MatchingGiftBanner';
/** Drop-in for {@link MatchingGiftBannerProps} — same props, the V4 "rally" design. */
export type MatchingGiftBannerV4Props = MatchingGiftBannerProps;
/**
 * MatchingGiftBanner — **V4** "rally" design (web parity of the native V4). A
 * rallying banner announcing a gift-matching offer, drawn with the warm "rally"
 * identity: a glyph in the tone color, the sponsor + match ratio in a bold
 * legible line, an optional matched/cap progress bar (integer cents →
 * `formatMoney`, cap divide-by-zero guarded via `goalPct`), a deadline, and an
 * optional CTA. Honors all three `variant`s — `solid` (a strong primary fill
 * with near-white `on-primary` ink), `soft` (a soft-primary tint), and
 * `outline` (a bordered surface) — identical props/behavior to
 * {@link MatchingGiftBannerProps}. These are token FILL treatments, not a brand
 * gradient. Progress is a `role="progressbar"` bar plus a printed cap figure —
 * not color alone. All colors come from the `--xen-*` token classes — no
 * literals.
 */
export declare const MatchingGiftBannerV4: React.ForwardRefExoticComponent<MatchingGiftBannerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MatchingGiftBannerV4.d.ts.map