import * as React from 'react';
import type { CalendarProps } from './Calendar';
export type { CalendarProps as CalendarV4Props };
/**
 * **V4 calendar** — the web twin of `CalendarV4`, the same props as
 * {@link Calendar}, a different design line.
 *
 * ## It still looks like a calendar
 *
 * §31 asks for familiar interactions, and a month grid is about as settled a
 * pattern as software has: seven columns, a weekday header, chevrons to page.
 * Nothing here is reinvented. What changes is everything that made the base
 * grid fiddly to actually use.
 *
 * ## The three changes
 *
 * 1. **Day cells you can hit.** The base sizes its day pill at `h-8 w-8` — 32px
 *    — inside a seven-column row. That is well under the 44px floor both
 *    platform guidelines set, and on a calendar it is the difference between
 *    clicking the 14th and clicking the 15th. Every cell here is at least
 *    `--xen-space-2xl` (48px) in both axes with the visible disc just inside
 *    it, so the target is larger than the thing it looks like — which is the
 *    right way round. The chevrons get the same floor.
 * 2. **A selection you cannot miss, in either scheme.** The selected day is a
 *    filled `primary` disc with `on-primary` ink — a pair the compiler
 *    contrast-checks, so it survives a dark page where a tinted outline would
 *    dissolve. Today, when it is not the selection, is ringed in `primary`
 *    rather than the base's `border`, so "today" and "a cell edge" can never be
 *    confused. Hover is a `color-mix` against `--xen-surface`, never
 *    `hover:bg-neutral-100`: the neutral ramp carries the light orientation in
 *    both schemes, so step 100 is a near-white flash on a dark page.
 * 3. **A panel that is a panel.** `--xen-elevation-card` and the `lg` radius,
 *    with the hairline kept. The base's `md` radius and flat fill made the
 *    calendar read as a fieldset rather than a surface you are choosing from.
 *
 * Glass is the one thing asked for rather than assumed: `flatten()` neutralises
 * gradients and elevation for a flat seed and stops there, so elevation is
 * consumed unconditionally and `depth: 'glass'` is checked once. No gradient —
 * §35.11 keeps those for the hero and the one primary action.
 */
export declare const CalendarV4: React.ForwardRefExoticComponent<CalendarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CalendarV4.d.ts.map