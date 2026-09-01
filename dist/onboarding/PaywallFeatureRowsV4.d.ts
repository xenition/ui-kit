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
 * **V4 feature rows** — the web twin of the native `PaywallFeatureRowsV4`,
 * same props as {@link PaywallFeatureRows} plus `accent` and `numbered`.
 *
 * The §8 anatomy, and the component the reference welcome-offer screen is
 * mostly made of: a circular tinted badge, a semibold title, a muted
 * description, and a hairline rail joining the badges into one list.
 *
 * ## Four changes
 *
 * 1. **The tint is mixed, not ramped.** `bg-primary-50` carries the light
 *    orientation in both schemes, so the base's badge was a near-white circle
 *    on a dark page.
 * 2. **The rail is `aria-hidden`.** It is decoration between two badges and it
 *    was reaching the accessibility tree as an empty element in each row.
 * 3. **`numbered`** — the same rows as an ordered list.
 * 4. **Descriptions take `muted-text`.** `muted` carries no contrast promise,
 *    and this is the copy carrying the value proposition.
 *
 * **Renders nothing for an empty `rows`** (§4.5) — a heading with no list under
 * it is worse than no section.
 */
export declare const PaywallFeatureRowsV4: React.ForwardRefExoticComponent<PaywallFeatureRowsV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PaywallFeatureRowsV4.d.ts.map