import * as React from 'react';
import type { TechnicianCardProps } from './TechnicianCard';
export interface TechnicianCardV4Props extends TechnicianCardProps {
    /** The call action's label. Default `'Call'`. */
    callLabel?: string;
    /** The assign action's label. Default `'Assign'`. */
    assignLabel?: string;
    /** Format the phone number for display. Defaults to the number as given. */
    formatPhone?: (phone: string) => string;
}
/**
 * **V4 technician card** — the web twin of the native `TechnicianCardV4`, same
 * props as {@link TechnicianCard} plus `callLabel`, `assignLabel` and
 * `formatPhone`.
 *
 * ## Five changes
 *
 * 1. **The `phone` it accepts is the phone it shows.** The number was used
 *    only as a boolean gate: it was never rendered, and a dispatcher who wired
 *    `onCall` without one silently got no Call button at all. It is now a meta
 *    line through `formatPhone`, and Call is gated on `onCall` alone.
 * 2. **One presence palette.** See {@link TECH_STATUS_V4} — the dot is
 *    `Avatar`'s `status`, which is also the only way it stays in step when the
 *    avatar's own dot moves.
 * 3. **The dot is not a second reader stop.** It carried `role="img"` and the
 *    status label, so the availability was announced from the dot and then
 *    again from the pill beside the name.
 * 4. **Skills are a neutral chip.** They were `text-primary` — a *fill* token
 *    used as ink, with no contrast promise — on a brand wash, which also spent
 *    the brand colour on a list of certifications.
 * 5. **Both actions clear 44** and take their labels from props.
 */
export declare const TechnicianCardV4: React.ForwardRefExoticComponent<TechnicianCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TechnicianCardV4.d.ts.map