import * as React from 'react';
import type { CoverageItemProps } from './CoverageItem';
export interface CoverageItemV4Props extends CoverageItemProps {
    /** Shown for an included coverage with no `limitCents`. Default `'Unlimited'`. */
    unlimitedLabel?: string;
    /** Shown for a coverage the policy does not carry. Default `'Not covered'`. */
    excludedLabel?: string;
    /** The word for an included coverage, in the spoken name. Default `'Included'`. */
    includedLabel?: string;
}
/**
 * **V4 coverage line** — same props as {@link CoverageItem} plus
 * `unlimitedLabel`, `excludedLabel` and `includedLabel`.
 *
 * ## Four changes
 *
 * 1. **`'—'` no longer means two opposite things.** The base printed an em
 *    dash in the limit column for an included coverage with no ceiling *and*
 *    for a coverage the policy does not carry at all. So "Roadside assistance
 *    — " could mean unlimited roadside assistance or no roadside assistance,
 *    and the only way to tell was to notice which of two similar glyph discs
 *    was drawn 200px to the left. They are `unlimitedLabel` and `excludedLabel`
 *    now, and they are words.
 * 2. **Inclusion stops being a verdict.** `included → success` and
 *    `excluded → muted` spent the status palette on a property of the
 *    contract: a benefits table rendered half green and half greyed-out, so by
 *    the time something genuinely was wrong the screen had already used its
 *    alarm colours on a list of what a policy covers. Both marks are a glyph
 *    and a word on the one neutral chip ground.
 * 3. **The line is one announced object.** The mark carried its own
 *    `accessibilityLabel` ("Included") and the limit sat in a separate text
 *    node, so a reader walking a fifteen-line benefits table heard "Included",
 *    "Collision", "$50,000.00" as three unrelated stops. It is one name now:
 *    "Collision, Included, $50,000.00, Up to actual cash value".
 * 4. **A negative limit is shown.** `Math.max(0, …)` printed `$0.00` for
 *    `limitCents={-1}`, which reads as a coverage with no benefit rather than
 *    as the data error it is.
 *
 * `included={false}` keeps its strike-through: it is a non-colour signal, and
 * with the word beside it the state no longer rests on either one alone.
 *
 * **Renders nothing without a `label`** (§4.5).
 */
export declare function CoverageItemV4({ label, included, limitCents, detail, currency, unlimitedLabel, excludedLabel, includedLabel, formatMoney: format, style, }: CoverageItemV4Props): React.ReactElement | null;
//# sourceMappingURL=CoverageItemV4.d.ts.map