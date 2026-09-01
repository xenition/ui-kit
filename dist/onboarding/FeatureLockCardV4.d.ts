import * as React from 'react';
import { type OnboardingAccentV4 } from './internal/flow-v4';
import type { FeatureLockCardProps } from './FeatureLockCard';
export interface FeatureLockCardV4Props extends FeatureLockCardProps {
    /** Which brand slot the badge and CTA answer in. Default `'primary'`. */
    accent?: OnboardingAccentV4;
    /**
     * What the user would get — up to three short outcome lines under the
     * description.
     *
     * The base named the feature and stopped, which makes a teaser a *label on a
     * locked door*. §27-28 asks a gate to sell.
     */
    benefits?: string[];
    /**
     * A dimmed glimpse of the gated feature, above the copy.
     *
     * The most persuasive thing a gate can show is the thing itself. Pass a
     * chart, a screenshot, a sample row — the kit ships no artwork.
     */
    preview?: React.ReactNode;
    /** A price or terms hint under the CTA. `xs`, muted, centred. */
    priceHint?: string;
}
/**
 * **V4 locked-feature teaser** — the web twin of the native
 * `FeatureLockCardV4`, same props as {@link FeatureLockCard} plus `accent`,
 * `benefits`, `preview` and `priceHint`.
 *
 * Still drawn as a §8 feature row, so a teaser met mid-app reads as the same
 * object as the rows on the paywall it leads to.
 *
 * ## Four changes
 *
 * 1. **The badge tint is a `color-mix()`, not `bg-primary-50`.** The ramp step
 *    carries the light orientation, so on a dark page the base's badge was a
 *    near-white circle. A mix of `surface` and `primary` inverts with the
 *    scheme because both sides of it already have.
 * 2. **It sells** — `benefits` and `priceHint`.
 * 3. **The card is `CardV4`'s raised ground**, which is what makes a teaser
 *    inside a scrolling page read as an object rather than a region.
 * 4. **The glyph takes the contrast-corrected brand slot.**
 *
 * `inline` still collapses to a compact borderless row, and drops the preview
 * and the price hint with it. **Renders nothing without a `title`** (§4.5).
 */
export declare const FeatureLockCardV4: React.ForwardRefExoticComponent<FeatureLockCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FeatureLockCardV4.d.ts.map