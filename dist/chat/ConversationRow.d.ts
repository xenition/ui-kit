import * as React from 'react';
import { type Presence } from './PresenceDot';
export interface ConversationRowProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
    /** Contact / group name. */
    name: string;
    /** Preview of the most recent message. */
    lastMessage?: string;
    /** Timestamp label (e.g. "09:41", "Tue"). */
    timestamp?: string;
    /** Avatar image URL. */
    avatarUri?: string;
    /** Presence badge on the avatar. */
    presence?: Presence;
    /** Unread count; > 0 renders a badge and bolds the row. */
    unreadCount?: number;
    /** Muted conversations dim and show a mute glyph. */
    muted?: boolean;
    /** When true the preview is replaced by a live "typing…" indicator. */
    typing?: boolean;
    /** Selected/active state (e.g. tablet split view). */
    selected?: boolean;
    /** Click handler (open the conversation). */
    onClick?: () => void;
    /** Context-menu (long-press analog) handler. */
    onLongPress?: () => void;
}
/**
 * A single row in a conversation/inbox list — avatar with presence, name,
 * message preview, timestamp, and unread badge. Supports `unread` (bold +
 * count badge), `muted` (dimmed + mute glyph), and `typing` (live indicator
 * replaces the preview) states. No literal colors.
 */
export declare const ConversationRow: React.ForwardRefExoticComponent<ConversationRowProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ConversationRow.d.ts.map