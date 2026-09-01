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
     * locked door*. §27-28 asks a gate to sell: the three lines are what turns
     * "Unlimited exports 🔒" into a reason to tap.
     */
    benefits?: string[];
    /**
     * A dimmed glimpse of the gated feature, drawn above the copy.
     *
     * The most persuasive thing a gate can show is the thing itself. The kit
     * ships no artwork, so this is a slot: pass a chart, a screenshot, a sample
     * row. It is rendered at reduced opacity behind nothing — no blur, because
     * React Native has no portable one and a fake blur is worse than an honest
     * dim.
     */
    preview?: React.ReactNode;
    /**
     * A price or terms hint under the CTA (e.g. `'From $4.99/mo · cancel
     * anytime'`). `xs`, `mutedText`, centred.
     */
    priceHint?: string;
}
/**
 * **V4 locked-feature teaser** — same props as {@link FeatureLockCard} plus
 * `accent`, `benefits`, `preview` and `priceHint`.
 *
 * Still drawn as a §8 feature row so a teaser met mid-app reads as the same
 * object as the rows on the paywall it leads to.
 *
 * ## Four changes
 *
 * 1. **The badge tint survives dark mode.** The base branched on `scheme` and
 *    reached into `tokens.ramps.primary[50 | 900]` — the ramps carry the light
 *    orientation in both schemes, so the branch was a workaround for reading
 *    the wrong tokens. `flowGrounds()` mixes the tint from resolved semantic
 *    colours instead, which lands on the right side of the page with no
 *    branch, and gives the whole module one tint rather than four copies.
 * 2. **It sells.** `benefits` and `priceHint` — a gate that only names what is
 *    locked is a dead end with a lock on it (§27-28).
 * 3. **The card is raised on `card`, not flat on `surface`.** `CardV4` paints
 *    the raised ground the base line did not have, which is what makes a
 *    teaser inside a scrolling page read as an object rather than as a region.
 * 4. **The glyph takes a contrast-corrected tone.** `primaryText`, not
 *    `primary` — a fill slot used as ink measured as low as 1.3:1 on a pale
 *    seed.
 *
 * `inline` still collapses to a compact borderless row for list contexts, and
 * drops the preview and the price hint with it: a row inside a list is not the
 * place for either. **Renders nothing without a `title`** (§4.5).
 */
export declare function FeatureLockCardV4({ title, description, icon, planLabel, unlockLabel, onUnlock, variant, accent, benefits, preview, priceHint, style, }: FeatureLockCardV4Props): React.ReactElement | null;
//# sourceMappingURL=FeatureLockCardV4.d.ts.map