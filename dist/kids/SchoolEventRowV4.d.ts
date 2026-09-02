import * as React from 'react';
import type { SchoolEventRowProps, SchoolEventType } from './SchoolEventRow';
export interface SchoolEventRowV4Props extends SchoolEventRowProps {
    /** Replace the seven type words. They were hard-coded English. */
    typeLabels?: Partial<Record<SchoolEventType, string>>;
}
/**
 * **V4 school event row** — same props as {@link SchoolEventRow} plus
 * `typeLabels`.
 *
 * ## Six changes
 *
 * 1. **An exam is not an error and a holiday is not a success.** `exam →
 *    danger`, `holiday → success` and `deadline → warn` spent three status
 *    colours on an event's *type*, which is identity. See
 *    {@link TYPE_META_V4} for the mapping that replaced them.
 * 2. **`trip` is `accent` again**, matching the native twin. A comment in this
 *    file said the web `Badge` had no `accent` tone; it has had one for a
 *    while, and the note had flattened `trip` onto `primary` on web only.
 * 3. **The row's accessible name reached nobody.** It was an `aria-label` on a
 *    plain `div` for every non-interactive row, which browsers ignore — and it
 *    dropped the time, the location and the child's name, which is most of why
 *    the row exists. The full name now belongs to a real `<button>`.
 * 4. **`{...rest}` is spread first.** It was spread after `onClick`, so a
 *    caller passing any handler through silently replaced the row's own.
 * 5. **It joins the shared row family** — one height, one 44 leading slot, one
 *    state layer — so a school calendar and a conversation list are one
 *    product. Press is that state layer, not `hover:bg-neutral-50`, a
 *    light-scheme ramp step that paints a near-white slab on a dark page.
 * 6. **The type words are replaceable**, in a component that ships to every
 *    locale.
 */
export declare const SchoolEventRowV4: React.ForwardRefExoticComponent<SchoolEventRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SchoolEventRowV4.d.ts.map