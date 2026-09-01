import * as React from 'react';
import { type OnboardingAccentV4 } from './internal/flow-v4';
import type { PaywallFeatureRowsProps } from './PaywallScreen';
export interface PaywallFeatureRowsV4Props extends PaywallFeatureRowsProps {
    /** Which brand slot the badges answer in. Default `'primary'`. */
    accent?: OnboardingAccentV4;
    /**
     * Number the rows instead of drawing their glyphs.
     *
     * The same anatomy answers two different questions — "what do I get" (icons)
     * and "how does this work" (1, 2, 3) — and an onboarding needs both. Without
     * it every host that wanted a numbered how-it-works list rebuilt the row.
     */
    numbered?: boolean;
}
/**
 * **V4 feature rows** — same props as {@link PaywallFeatureRows} plus `accent`
 * and `numbered`.
 *
 * The §8 anatomy, and the component the reference welcome-offer screen is
 * mostly made of: a circular tinted badge, a semibold title, a muted
 * description, and a hairline rail joining the badges into one list.
 *
 * ## Four changes
 *
 * 1. **The tint is mixed, not ramped.** The base read
 *    `tokens.ramps.primary[50]` behind a `scheme` branch — the ramps carry the
 *    light orientation in both schemes, so the branch existed to undo the
 *    wrong token. `flowGrounds()` mixes from resolved semantic colours and the
 *    branch goes away.
 * 2. **The rail joins badges, not rows.** It runs between the badge centres
 *    and stops at the last badge. The base drew it down the full height of the
 *    group, so it overshot past the final badge into the description below it.
 * 3. **`numbered`** — the same rows as an ordered list.
 * 4. **Descriptions take `mutedText`.** `muted` carries no contrast promise
 *    and this is the copy carrying the value proposition.
 *
 * **Renders nothing for an empty `rows`** (§4.5) — a heading with no list under
 * it is worse than no section.
 */
export declare function PaywallFeatureRowsV4({ rows, heading, rail, dense, accent, numbered, style, }: PaywallFeatureRowsV4Props): React.ReactElement | null;
//# sourceMappingURL=PaywallFeatureRowsV4.d.ts.map