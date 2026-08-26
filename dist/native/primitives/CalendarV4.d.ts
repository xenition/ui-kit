import * as React from 'react';
import type { CalendarProps } from './Calendar';
export type { CalendarProps as CalendarV4Props };
/**
 * **V4 calendar** — the same props as {@link Calendar}, a different design
 * line.
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
 * 1. **Day cells you can hit.** The base sizes its day pill at `xl + xs` —
 *    36px — inside a seven-column row. That is under both platforms' 44px
 *    floor, and on a calendar it is the difference between tapping the 14th and
 *    tapping the 15th. Every cell here is `tapTarget()` tall (`spacing['2xl']`,
 *    48px) with the visible pill just inside it, so the target is larger than
 *    the thing it looks like — which is the right way round. The chevrons get
 *    the same floor; a 4px-padded glyph was the smallest target on the panel.
 * 2. **A selection you cannot miss, in either scheme.** The selected day is a
 *    filled `primary` disc with `onPrimary` ink — a pair the compiler
 *    contrast-checks, so it survives a dark page where a tinted outline would
 *    dissolve. Today, when it is not the selection, is ringed in `primary`
 *    rather than the base's `border`, so "today" and "a cell edge" can never be
 *    confused. Marked days keep their dot, flipped to `onPrimary` on the
 *    selected day so it stays visible on the fill.
 * 3. **A panel that is a panel.** `elevation.card` and the `lg` radius, with
 *    the hairline kept. The base's `md` radius and flat fill made the calendar
 *    read as a fieldset rather than a surface you are choosing from.
 *
 * Glass is the one thing asked for rather than assumed: `flatten()` neutralises
 * gradients and elevation for a flat seed and stops there, so elevation is
 * consumed unconditionally and `depth: 'glass'` is checked once, inside
 * `popoverSkin`. No gradient — §35.11 keeps those for the hero and the one
 * primary action, and a tinted calendar is a calendar you read past.
 */
export declare function CalendarV4({ month, selected, marks, onSelectDate, onMonthChange, style, }: CalendarProps): React.ReactElement;
//# sourceMappingURL=CalendarV4.d.ts.map