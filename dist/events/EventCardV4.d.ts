import * as React from 'react';
import type { EventCardProps } from './EventCard';
export interface EventCardV4Props extends EventCardProps {
    /** Announced while the skeleton is up. Default `'Loading event'`. */
    loadingLabel?: string;
}
/**
 * **V4 event card** — the web twin of the native `EventCardV4`, same props as
 * {@link EventCard} plus `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The card's activation is a real `<button>`, and the heading survives
 *    it.** The base was a `div` with `role="button"`, a `tabIndex` and a
 *    hand-written Enter/Space handler that ended in
 *    `e.preventDefault(); currentTarget.click()` — three approximations of what
 *    a button already does. Worse, `role="button"` makes its whole subtree
 *    presentational, so the `<h3>` was erased from the accessibility tree: a
 *    screen-reader user browsing an events page by heading found none. The
 *    heading is now the button's **parent**, not its child.
 * 2. **The name carries the event.** `aria-label={title}` replaced everything
 *    the card drew, so the date, the time, the venue and the attendee count
 *    were unreachable. `spokenLine()` joins them.
 * 3. **The compact skeleton keeps its row layout.** `compact` is a row and its
 *    loading state was a column, so the card changed shape and jumped as the
 *    data landed — and the skeleton's `bg-neutral-100`/`200` are ramp steps
 *    that mirror under `[data-theme="dark"]` into pale plates on a dark page.
 * 4. **Loading announces.** The base put `aria-label` on a role-less `div`,
 *    where it is ignored; `role="status"` gives it somewhere to land.
 * 5. **Press is a state layer**, not `hover:opacity-95` — dimming a card's own
 *    content is M3's *disabled* signal — and the focus ring is `--xen-ring`,
 *    the slot corrected to 3:1 against the page, rather than `primary-300`.
 */
export declare const EventCardV4: React.ForwardRefExoticComponent<EventCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EventCardV4.d.ts.map