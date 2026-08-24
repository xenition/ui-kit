import * as React from 'react';
/** Lifecycle of a citizen complaint / 311 service request. */
export type ComplaintStatus = 'open' | 'assigned' | 'in-progress' | 'resolved' | 'closed';
/** Triage priority of the request. */
export type ComplaintPriority = 'low' | 'normal' | 'high' | 'urgent';
export interface ComplaintRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
    /** Ticket / request reference (e.g. "311-88214"). */
    ticketNumber: string;
    /** Short description of the complaint (e.g. "Pothole on 5th Ave"). */
    title: string;
    /** Lifecycle status — conveyed by text + glyph + color. */
    status: ComplaintStatus;
    /** Category (e.g. "Roads", "Sanitation"). */
    category?: string;
    /** Triage priority — rendered as a text+glyph badge when `high`/`urgent`. */
    priority?: ComplaintPriority;
    /** Localized filed / updated date. */
    date?: string;
    /** Fires on row click (open request detail); button only when supplied. */
    onClick?: () => void;
}
/**
 * One line in a citizen-complaint / 311 service-request list: a tinted status
 * glyph disc, a title/ticket stack, and status + optional priority pills — each
 * conveyed by **glyph + label + a color that traces to a semantic token slot**
 * (resolved → success, urgent → danger), never color alone. Becomes a
 * keyboard-operable button only when `onClick` is supplied. Web parity of the
 * native `ComplaintRow`.
 */
export declare const ComplaintRow: React.ForwardRefExoticComponent<ComplaintRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ComplaintRow.d.ts.map