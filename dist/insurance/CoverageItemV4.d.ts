import * as React from 'react';
import type { CoverageItemProps } from './CoverageItem';
export interface CoverageItemV4Props extends CoverageItemProps {
    /** What an included coverage with no ceiling says. Default `'Unlimited'`. */
    unlimitedLabel?: string;
    /** What an excluded coverage says in place of a limit. Default `'Not covered'`. */
    excludedLabel?: string;
    /** The included marker's spoken word. Default `'Included'`. */
    includedLabel?: string;
}
/**
 * **V4 coverage item** — same props as {@link CoverageItem} plus
 * `unlimitedLabel`, `excludedLabel` and `includedLabel`.
 *
 * ## Four changes
 *
 * 1. **"—" no longer means two opposite things.** The base printed an em dash
 *    both for an included coverage with no ceiling — unlimited, the best line
 *    on the policy — and for a coverage that is excluded outright. Those are
 *    the two ends of the range and they rendered identically, so a reader
 *    comparing two quotes could not tell "we will pay whatever it costs" from
 *    "we will not pay". They are now `unlimitedLabel` and `excludedLabel`.
 * 2. **Inclusion stops spending a status colour.** `included → success`,
 *    `excluded → muted` said that a policy covering water damage is good news
 *    and that one excluding it is a failure. Inclusion is a property of the
 *    contract, and half of any benefits list is always excluded; a page of
 *    green ticks over grey struck-through lines teaches the eye to stop
 *    reading both. The glyph and, now, the word carry it. `muted` was also a
 *    **fill** slot with no contrast promise, and `bg-neutral-100` behind the
 *    excluded mark mirrors under `[data-theme="dark"]`.
 * 3. **`limitCents={-1}` no longer prints "$0.00".** The base clamped with
 *    `Math.max(0, …)`, so a bad value looked like a real zero benefit.
 * 4. **The line is one thought, not three stops.** The mark carried its own
 *    `aria-label`, so the reader heard "Included" and "Collision" and
 *    "$50,000.00" as three separate items; the mark is now decorative and the
 *    row's own text says all three in order.
 */
export declare const CoverageItemV4: React.ForwardRefExoticComponent<CoverageItemV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CoverageItemV4.d.ts.map