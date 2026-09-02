import * as React from 'react';
import type { ChoreCardProps, ChoreStatus } from './ChoreCard';
export interface ChoreCardV4Props extends ChoreCardProps {
    /** Why the chore was skipped — a neutral explanation, not a reprimand. */
    reason?: string;
    /** Replace the four status words. They were hard-coded English. */
    statusLabels?: Partial<Record<ChoreStatus, string>>;
    /** Copy on the completion action. Default `'Mark done'`. */
    completeLabel?: string;
}
/**
 * **V4 chore card** — same props as {@link ChoreCard} plus `reason`,
 * `statusLabels` and `completeLabel`.
 *
 * ## Six changes
 *
 * 1. **A keyboard user can finally mark a chore done.** The card was a
 *    `role="button"` `div` with "Mark done" nested inside it. The inner
 *    button's *click* was guarded with `stopPropagation` and its *keydown* was
 *    not, so the card's handler caught the bubbled keydown, ran
 *    `preventDefault()` and cancelled the button's own activation — Enter's
 *    default action **is** that click — then navigated instead. A mouse user
 *    never saw it. The card is now a plain container, the activation wraps only
 *    the icon-and-text region, and the action is its sibling.
 * 2. **`{...rest}` is spread first.** It was spread after `onClick`, so a
 *    caller passing any handler through silently replaced the card's own.
 * 3. **A skipped chore is not a warning.** `skipped → warn` painted a child's
 *    day in the vocabulary the kit reserves for something going wrong. It is a
 *    neutral chip with a glyph and a word, and `reason` gives the explanation
 *    somewhere to live — a status that needs one and has nowhere to put it is
 *    how a chore log turns into a tally of failures.
 * 4. **The four status words are replaceable**, as is the action's label. They
 *    were hard-coded English in a component that ships to every locale.
 * 5. **Badges converge on `soft`.** Every native call passed `variant="soft"`,
 *    no web call passed `variant` at all, and web defaults to `solid` — the
 *    same props drawing two visual weights. The points chip also moves to
 *    `accent`, matching the native twin, which the stale "web Badge has no
 *    accent" comment had been holding back.
 * 6. **Tokens and targets.** `hover:bg-neutral-50` is a light-scheme ramp step
 *    that paints a near-white slab on a dark page, and press is a state layer
 *    rather than a tint; the skeleton is opaque and card-relative; the
 *    activation clears 44.
 */
export declare const ChoreCardV4: React.ForwardRefExoticComponent<ChoreCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ChoreCardV4.d.ts.map