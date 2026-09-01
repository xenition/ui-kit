import * as React from 'react';
import type { ComplaintPriority, ComplaintRowProps, ComplaintStatus } from './ComplaintRow';
export interface ComplaintRowV4Props extends ComplaintRowProps {
    /** Override the four priority words — `'Low'`, `'Normal'`, `'High'`, `'Urgent'`. */
    priorityLabels?: Partial<Record<ComplaintPriority, string>>;
    /** Override the five status words — `'Open'`, `'In progress'`, … */
    statusLabels?: Partial<Record<ComplaintStatus, string>>;
}
/**
 * **V4 complaint row** — the web twin of the native `ComplaintRowV4`, same
 * props as {@link ComplaintRow} plus `priorityLabels` and `statusLabels`.
 *
 * ## Five changes
 *
 * 1. **"Urgent" reaches a reader.** Priority is the module's only triage
 *    escalation, and the row's fixed
 *    `` `Request ${n}, ${title}, ${status}` `` name omitted it — so an urgent
 *    pothole and a routine one announced identically. Priority, category and
 *    the filing date all join the name.
 * 2. **An interactive row is a real `<button>`** rather than a `div` with
 *    `role="button"` and a hand-written Enter/Space handler — which also makes
 *    the two pills reachable, since `role="button"` renders its subtree
 *    presentational.
 * 3. **The ticket number is labelled.** A reader heard "311-88214" with no idea
 *    what it identified, and the category was glued on with a bare `·` span.
 * 4. **Open and Assigned stop wearing the brand colour.** They are stages, not
 *    outcomes; identity gets the neutral chip so `resolved` → success and
 *    `urgent` → danger stay the only coloured signals on the row.
 * 5. **It joins the shared row family** — one height, one 44 leading slot, one
 *    state layer. `hover:opacity-80` is M3's *disabled* band applied as press
 *    feedback, `ring-primary-300` is a ramp step that inverts in dark, and the
 *    leading disc drew its glyph in the `success` / `danger` **fill** on a tint
 *    of itself.
 */
export declare const ComplaintRowV4: React.ForwardRefExoticComponent<ComplaintRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ComplaintRowV4.d.ts.map