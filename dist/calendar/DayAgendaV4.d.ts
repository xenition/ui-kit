import * as React from 'react';
import type { DayAgendaProps } from './DayAgenda';
export interface DayAgendaV4Props extends DayAgendaProps {
    /** Locale for the time gutter. Default: the browser's. */
    locale?: string;
    /** Label on the "now" divider. Default `'Now'`. */
    nowLabel?: string;
}
/**
 * **V4 day agenda** — the web twin of the native `DayAgendaV4`, same props as
 * {@link DayAgenda} plus `locale` and `nowLabel`.
 *
 * ## Four changes
 *
 * 1. **The list is ordered by the shared layout pass**, so an agenda and a
 *    time grid showing the same day agree.
 * 2. **"Now" is a labelled divider**, not an unnamed rule.
 * 3. **The skeleton is opaque.**
 * 4. **It is a real `<ol>`**, so a reader hears how many events the day holds.
 */
export declare const DayAgendaV4: React.ForwardRefExoticComponent<DayAgendaV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DayAgendaV4.d.ts.map