import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { TicketStatus } from './TicketRow';
import type { Priority } from './TicketPriority';
export interface TicketDetailHeaderProps {
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
    /** When `true`, the SLA tile reads as breached (warning glyph + "breached" a11y). */
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
    style?: StyleProp<ViewStyle>;
}
/**
 * TicketDetailHeader — the gradient "console" hero shown when an agent opens a
 * ticket. The one saturated surface at the top of the detail view: the subject
 * reads as big near-white ink over the console gradient, with the ticket id,
 * status, optional priority, and SLA countdown carried on frosted tiles. A
 * requester row (avatar + requester → assignee), optional tag chips, and a
 * near-white primary "Solve" pill beside a ghost "Assign" button complete it.
 * Status/priority/SLA carry a glyph so meaning is never color-only.
 * Presentational — shaped data + callbacks only; every color derives from the
 * compiled theme ramps (token-only, no literals), light + dark safe.
 */
export declare function TicketDetailHeader({ subject, ticketId, status, priority, requester, requesterAvatar, assignee, slaLabel, slaBreached, tags, onSolve, solveLabel, onAssign, assignLabel, style, }: TicketDetailHeaderProps): React.ReactElement;
//# sourceMappingURL=TicketDetailHeader.d.ts.map