import * as React from 'react';
import type { TechnicianCardProps } from './TechnicianCard';
export interface TechnicianCardV4Props extends TechnicianCardProps {
    /** The call action's label. Default `'Call'`. */
    callLabel?: string;
    /** The assign action's label. Default `'Assign'`. */
    assignLabel?: string;
    /** Render the phone number. Default: the string as given. */
    formatPhone?: (phone: string) => string;
}
/**
 * **V4 technician card** — same props as {@link TechnicianCard} plus
 * `callLabel`, `assignLabel` and `formatPhone`.
 *
 * ## Five changes
 *
 * 1. **The phone number is on the card.** The base accepted `phone` and used
 *    it only as a boolean gate, so the number never appeared anywhere — and a
 *    caller who wired `onCall` without one silently got no button at all. It
 *    renders through `formatPhone` now, and the button is gated on `onCall`
 *    alone, which is the thing that decides whether calling is possible.
 * 2. **The presence dot is `Avatar`'s own `status`.** The web twin hand-rolled
 *    a second palette in which `busy` is blue while this twin's `Avatar` draws
 *    it **red** — the same technician, two colours, depending on which
 *    platform you opened.
 * 3. **The card announces its whole state** — name, role, status, jobs today
 *    and the number — instead of leaving a reader to walk loose text nodes.
 * 4. **Skill chips stop inking themselves with a fill token.** They drew
 *    `color: colors.primary` text on a 10% `primary` wash; `primary` is a fill
 *    slot with no contrast promise as text, and a skill is an identity, so the
 *    chips are neutral badges from the module's one badge shape.
 * 5. **Call and Assign clear 44.** `size="sm"` is ~34, on a card a dispatcher
 *    uses one-handed.
 *
 * **Renders nothing without a `name`.**
 */
export declare function TechnicianCardV4({ name, role, status, avatarUrl, skills, jobsToday, phone, callLabel, assignLabel, formatPhone, onCall, onAssign, style, }: TechnicianCardV4Props): React.ReactElement | null;
//# sourceMappingURL=TechnicianCardV4.d.ts.map