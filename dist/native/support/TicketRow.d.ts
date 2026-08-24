import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Priority } from './TicketPriority';
/** Lifecycle status of a support ticket. */
export type TicketStatus = 'open' | 'pending' | 'solved' | 'closed';
export interface Ticket {
    /** Stable id (used as the a11y key and returned to `onPress`). */
    id: string;
    /** Ticket subject line. */
    subject: string;
    /** Lifecycle status. */
    status: TicketStatus;
    /** Optional priority chip. */
    priority?: Priority;
    /** Requester display name (drives the avatar fallback). */
    requester?: string;
    /** Optional requester avatar URL. */
    requesterAvatar?: string;
    /** Human-readable "updated" hint (e.g. `"2h ago"`). */
    updatedLabel?: string;
    /** Unread reply count (renders a token badge when > 0). */
    unread?: number;
}
export interface TicketRowProps {
    /** The ticket to render. */
    ticket: Ticket;
    /** Fires with the ticket id when the row is tapped. */
    onPress?: (id: string) => void;
    /** Render a non-interactive skeleton placeholder. */
    loading?: boolean;
    /** Mark the row as currently selected (bg tint + a11y selected). */
    selected?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single ticket row for a helpdesk queue/inbox — requester avatar, subject,
 * a glyph+label status marker, an optional priority chip, an updated-time hint,
 * and an unread badge. Tapping fires `onPress(id)`. Status is encoded by glyph
 * **and** text (not color alone). Supports a `loading` skeleton and a
 * `selected` state. Colors come only from `SemanticColors`/token tints — no
 * literal hex.
 */
export declare function TicketRow({ ticket, onPress, loading, selected, style, }: TicketRowProps): React.ReactElement;
//# sourceMappingURL=TicketRow.d.ts.map