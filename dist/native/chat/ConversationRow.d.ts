import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Presence } from './PresenceDot';
export interface ConversationRowProps {
    /** Contact / group name. */
    name: string;
    /** Preview of the most recent message. */
    lastMessage?: string;
    /** Timestamp label (e.g. "09:41", "Tue"). */
    timestamp?: string;
    /** Avatar image URI. */
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
    /** Tap handler (open the conversation). */
    onPress?: () => void;
    /** Long-press handler (context actions). */
    onLongPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single row in a conversation/inbox list — avatar with presence, name,
 * message preview, timestamp, and unread badge. Supports `unread` (bold +
 * count badge), `muted` (dimmed + mute glyph), and `typing` (live indicator
 * replaces the preview) states. No literal colors.
 */
export declare function ConversationRow({ name, lastMessage, timestamp, avatarUri, presence, unreadCount, muted, typing, selected, onPress, onLongPress, style, }: ConversationRowProps): React.ReactElement;
//# sourceMappingURL=ConversationRow.d.ts.map