import * as React from 'react';
import type { TicketStatus } from './TicketRow';
import type { Priority } from './TicketPriority';
export interface TicketDetailHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Ticket subject line — the big near-white headline on the gradient. */
    subject: string;
    /** Human-readable ticket reference (e.g. `"#4821"`). */
    ticketId: string;
    /** Lifecycle status; rendered as a glyph + label frosted tile. */
    status: TicketStatus;
    /** Optional priority; rendered as a second frosted tile when set. */
    priority?: Priority;
    /** Requester display name (drives the avatar fallback + requester row). */
    requester?: string;
    /** Optional requester avatar URL. */
    requesterAvatar?: string;
    /** Agent the ticket is assigned to; shown in the requester row when set. */
    assignee?: string;
    /** SLA countdown/label (e.g. `"Due in 2h 05m"`); rendered as a frosted tile. */
    slaLabel?: string;
    /** When `true`, the SLA tile reads as breached (danger glyph + "breached" a11y). */
    slaBreached?: boolean;
    /** Optional free-form tags rendered as small frosted chips. */
    tags?: readonly string[];
    /** Primary "solve" CTA handler; the button is hidden when unset. */
    onSolve?: () => void;
    /** Primary CTA label (default `"Solve"`). */
    solveLabel?: string;
    /** Secondary "assign" CTA handler; the button is hidden when unset. */
    onAssign?: () => void;
    /** Secondary CTA label (default `"Assign"`). */
    assignLabel?: string;
}
/**
 * TicketDetailHeader — the gradient "console" hero shown when an agent opens a
 * ticket. The one saturated surface at the top of the detail view: the subject
 * reads as big near-white ink over a `from-primary-500 to-primary-700` ground,
 * with the ticket id, status, optional priority, and SLA countdown carried on
 * frosted tiles (`bg-primary-50/15`, `border-primary-50/30`). A requester row
 * (avatar + requester → assignee), optional tag chips, and a near-white primary
 * "Solve" pill beside a ghost "Assign" button complete it. Status/priority/SLA
 * carry a glyph so meaning is never color-only. Presentational — shaped data +
 * callbacks only; every color derives from the brand ramp (token-only, no
 * literals), light + dark safe.
 */
export declare const TicketDetailHeader: React.ForwardRefExoticComponent<TicketDetailHeaderProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TicketDetailHeader.d.ts.map