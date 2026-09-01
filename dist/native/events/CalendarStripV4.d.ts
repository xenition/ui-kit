import * as React from 'react';
import type { CalendarStripProps } from './CalendarStrip';
export interface CalendarStripV4Props extends CalendarStripProps {
    /** BCP-47 locale for the weekday, month and day numerals. Default: the device's. */
    locale?: string;
    /** Announced for a day carrying a mark. Default `'Has events'`. */
    markedLabel?: string;
    /** Initial selection for the uncontrolled case. Ignored when `selected` is given. */
    defaultSelected?: Date;
    /** The day the strip starts from when `startDate` and `dates` are both absent. */
    today?: Date;
}
/**
 * **V4 calendar strip** — same props as {@link CalendarStrip} plus `locale`,
 * `markedLabel`, `defaultSelected` and `today`.
 *
 * ## Six changes
 *
 * 1. **A marked day keeps its dot on the 1st of the month.** The month caption
 *    and the has-events marker shared one slot as an either/or, and the base
 *    showed the month on the first pill and on every 1st — so the day most
 *    likely to open a month of a schedule was the one day whose events were
 *    silently unmarked. The two now have a slot each.
 * 2. **The mark is announced.** It was drawn and never spoken, on either
 *    twin, so a screen-reader user had no way to tell a day with sessions from
 *    an empty one.
 * 3. **The names come from `Intl`.** `format.ts` holds `WEEKDAYS_SHORT` and
 *    `MONTHS_SHORT` as inline English arrays, so the strip was English-only
 *    whatever locale the app ran in. `locale` steers all three fields, day
 *    numerals included.
 * 4. **`today` replaces the bare `new Date()`**, so a strip can be pinned for
 *    a test, a story or a server-rendered screenshot instead of drifting with
 *    the wall clock.
 * 5. **`defaultSelected` gives the uncontrolled case somewhere to live.** A
 *    consumer who passed only `onSelectDate` got a strip where nothing ever
 *    highlighted, because `selected` was the only source of truth.
 * 6. **The pills are buttons, not a tablist.** Fourteen tab stops with no
 *    roving focus is not a tablist on either platform; each pill is a real
 *    button that clears 44, and a press is a state layer rather than a
 *    hand-picked ramp step.
 */
export declare function CalendarStripV4({ startDate, days, dates, selected, marks, locale, markedLabel, defaultSelected, today, onSelectDate, style, }: CalendarStripV4Props): React.ReactElement;
//# sourceMappingURL=CalendarStripV4.d.ts.map