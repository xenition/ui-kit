import * as React from 'react';
import type { ComplaintPriority, ComplaintRowProps, ComplaintStatus } from './ComplaintRow';
export interface ComplaintRowV4Props extends ComplaintRowProps {
    /** Override the four priority words (`'Urgent'`, `'High'`, …). */
    priorityLabels?: Partial<Record<ComplaintPriority, string>>;
    /** Override the five status words (`'In progress'`, `'Resolved'`, …). */
    statusLabels?: Partial<Record<ComplaintStatus, string>>;
}
/**
 * **V4 complaint row** — same props as {@link ComplaintRow} plus
 * `priorityLabels` and `statusLabels`.
 *
 * ## Five changes
 *
 * 1. **"Urgent" joins the name.** Priority is the module's only triage
 *    escalation, it is drawn as a pill, and the row announced
 *    `` `Request ${ticket}, ${title}, ${status}` `` — so the one field that
 *    says *this one first* never reached a reader at all. The category and the
 *    filed date were pruned with it.
 * 2. **The ticket number is labelled**, visibly and in the name, instead of a
 *    bare "311-88214" a reader cannot place.
 * 3. **One badge shape.** The status pill was `soft` and the priority pill
 *    `outline` in the same row, which reads as two different kinds of thing
 *    rather than two facts about one request.
 * 4. **It is a row from the shared row line** — the family's 44 leading slot
 *    and metrics — with a state layer in place of `opacity: 0.7`, and a status
 *    disc inked with the contrast-corrected slot on an opaque ground rather
 *    than a fill slot washed over whatever is behind it, which is a different
 *    colour on every surface it lands on.
 * 5. **A queue position is not a status.** `open` was `primary` and `assigned`
 *    was `accent` — brand colours spent on where a request sits in a queue,
 *    the way `fieldservice` spent them on `en-route` and `on-site`. Both are
 *    `IDENTITY_TONE` now, so the tones that survive mean an outcome:
 *    `resolved` is done, `urgent` needs you.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export declare function ComplaintRowV4({ ticketNumber, title, status, category, priority, date, priorityLabels, statusLabels, onPress, style, }: ComplaintRowV4Props): React.ReactElement | null;
//# sourceMappingURL=ComplaintRowV4.d.ts.map