import * as React from 'react';
import type { ChildMood, ChildProfileCardProps } from './ChildProfileCard';
export interface ChildProfileCardV4Props extends ChildProfileCardProps {
    /** Replace the six mood words. They were hard-coded English. */
    moodLabels?: Partial<Record<ChildMood, string>>;
}
/**
 * **V4 child profile card** — same props as {@link ChildProfileCard} plus
 * `moodLabels`.
 *
 * ## Six changes
 *
 * 1. **The card's accessible name was being dropped on the floor.** It was an
 *    `aria-label` on a `div` with no role — which browsers ignore outright —
 *    for every card without an `onClick`, which is most of them. The name now
 *    belongs to a real `<button>` when the card is activatable, and to nothing
 *    at all when it is not, because the visible text is already the name.
 * 2. **The activation is a real `<button>`.** A `div` with `role="button"`,
 *    `tabIndex={0}` and a hand-written Enter/Space handler is three
 *    approximations of what a button already does — and it wrapped the whole
 *    card, so the interest chips and the mood block were swallowed into one
 *    stop.
 * 3. **`{...rest}` is spread first.** It was spread after `onClick`, so a
 *    caller passing any handler through silently replaced the card's own.
 * 4. **A mood is not a status and a sad child is not an error.** The mood
 *    block keeps its glyph and gains a replaceable word; nothing about it is
 *    carried by colour.
 * 5. **The interest chips match their native twin.** Native drew them
 *    `accent`/`soft`/`sm`, web drew them `primary`/`solid`/`md` — one call,
 *    two chips — because of a comment claiming the web `Badge` has no `accent`
 *    tone. It has had one for a while.
 * 6. **Tokens and targets.** `hover:bg-neutral-50` is a light-scheme ramp step
 *    that paints a near-white slab on a dark page; press is the M3 state layer;
 *    the skeleton is opaque and card-relative rather than `bg-neutral-200`; the
 *    card sits on `card`/`on-card`; the activation clears 44.
 */
export declare const ChildProfileCardV4: React.ForwardRefExoticComponent<ChildProfileCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ChildProfileCardV4.d.ts.map