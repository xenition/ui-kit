import * as React from 'react';
import type { SchoolEventRowProps, SchoolEventType } from './SchoolEventRow';
export interface SchoolEventRowV4Props extends SchoolEventRowProps {
    /** The word each event type is printed and announced with. */
    typeLabels?: Partial<Record<SchoolEventType, string>>;
}
/**
 * **V4 school event row** — same props as {@link SchoolEventRow} plus
 * `typeLabels`.
 *
 * ## Four changes
 *
 * 1. **An exam is not an error and a holiday is not a success.** The base drew
 *    `exam → danger` and `holiday → success`, spending two status colours on
 *    what is plainly a *category*. A child looking at their own calendar saw a
 *    red chip on the exam. Every type now wears the same neutral chip and is
 *    told apart by its glyph and its word, which is the only version that also
 *    survives greyscale and a screen reader.
 * 2. **The row's summary is not silently dropped.** The non-pressable branch
 *    put `accessibilityLabel` on a bare `View` with no `accessible`, which
 *    Android ignores entirely — so the row read as one name on iOS and as four
 *    loose fragments on Android.
 * 3. **The spoken name carries the whole row**, including the time, the
 *    location and which child it concerns. It stopped at the date before, so
 *    "Room 12" and "Maya" were on screen and nowhere else.
 * 4. **`card`/`onCard` and a state layer** instead of the page's `surface` and
 *    `opacity: pressed ? 0.85 : 1`, which is inside M3's *disabled* band.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export declare function SchoolEventRowV4({ title, type, date, time, location, childName, typeLabels, onPress, style, }: SchoolEventRowV4Props): React.ReactElement | null;
//# sourceMappingURL=SchoolEventRowV4.d.ts.map