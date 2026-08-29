import * as React from 'react';
import type { AccordionItemData, AccordionProps } from './Accordion';
export type { AccordionProps as AccordionV4Props, AccordionItemData };
/**
 * **V4 accordion** — same props as {@link Accordion}, a different design line.
 *
 * A disclosure is a motion component whose motion was an afterthought.
 *
 * 1. **The chevron turns; it does not snap.** The base rotated it by swapping
 *    a static `transform` between renders, so the panel eased open underneath a
 *    marker that had already jumped. V4 drives the rotation with the same
 *    duration and curve as the reveal, so one gesture reads as one movement
 *    (§36.1 — motion should be functional, and a marker that teleports is not
 *    telling you anything).
 * 2. **The curve matches the action.** `easeInEaseOut` accelerates into the
 *    reveal, which is the curve for something leaving. A panel arriving should
 *    decelerate (§36.3), so both the height and the chevron run on an ease-out
 *    cubic.
 * 3. **Reduced motion is respected.** `LayoutAnimation` ignores the OS Reduce
 *    Motion switch entirely — the base animated every expand regardless. V4
 *    reads {@link useReducedMotion} and, when it is on, changes state with no
 *    animation at all and sets the chevron to its final angle immediately. The
 *    interaction is identical; only the movement goes (§36.10).
 * 4. **The header is a real target.** The row was as tall as its padding made
 *    it. It now has a floor of 44pt, which is the whole control's tap area.
 *
 * The chevron comes from the kit's named icon set rather than a `▾` typed into
 * this file, so it cannot drift from the chevron on the next screen; it is
 * decorative, because `accessibilityState.expanded` already carries the state.
 * The body text is run through `ensureContrast` — `muted` is `neutral[600]`
 * and the compiler guarantees the on-pairs, not that one.
 *
 * No fill, no gradient, no shadow. An accordion is a list with rules between
 * its rows (§11), and §35.11 keeps the sweep for the hero and the one action.
 */
export declare function AccordionV4({ items, type, defaultValue, style, }: AccordionProps): React.ReactElement;
//# sourceMappingURL=AccordionV4.d.ts.map