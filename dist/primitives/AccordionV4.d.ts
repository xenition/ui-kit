import * as React from 'react';
import type { AccordionItemData, AccordionProps } from './Accordion';
export type { AccordionProps as AccordionV4Props, AccordionItemData };
/**
 * **V4 accordion** — the web twin of the native `AccordionV4`, same props as
 * {@link Accordion}, a different design line.
 *
 * A disclosure is a motion component whose motion was an afterthought.
 *
 * 1. **The panel opens; it does not appear.** The base mounted and unmounted
 *    the body, so the only animated thing on the whole control was a chevron
 *    turning next to content that had already popped into place. V4 animates
 *    the height itself with `grid-template-rows: 0fr → 1fr` — the technique
 *    that needs no measurement and no `max-height` guess — so the marker and
 *    the content move together (§36.1, §36.5: spatial continuity).
 * 2. **The curve matches the action.** A panel arriving decelerates (§36.3),
 *    and both the height and the chevron run on the same ease-out over the same
 *    180ms, so one gesture reads as one movement.
 * 3. **Reduced motion is respected.** The base's bare `transition-transform`
 *    ran regardless of the OS switch. Both transitions now drop under
 *    `prefers-reduced-motion` and the state change is instant (§36.10).
 * 4. **The panel is a panel, and the header opens it.** There was no
 *    `aria-controls`, no `id`, and no region: a screen reader heard a button
 *    that expanded something unnamed. Each header now points at its panel, and
 *    the panel names itself back.
 * 5. **A real target and a real focus ring.** `py-3` made a roughly 40px row,
 *    under the 44 a finger needs, and nothing at all marked the focused header.
 *
 * The chevron comes from the kit's named icon set rather than a `▾` typed into
 * this file, and both muted inks are re-measured — `muted` is `neutral[600]`,
 * and the compiler guarantees the on-pairs, not that one. Padding is on the
 * spacing scale: `px-4 py-3` was 16/12 against native's 24/16.
 *
 * No fill, no gradient, no shadow. An accordion is a list with rules between
 * its rows (§11), and §35.11 keeps the sweep for the hero and the one action.
 */
export declare function AccordionV4({ items, type, defaultValue, className, }: AccordionProps): React.ReactElement;
//# sourceMappingURL=AccordionV4.d.ts.map