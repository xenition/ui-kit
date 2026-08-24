import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MailLabelTone } from './MailLabelChip';
export interface MailLabelRef {
    id: string;
    label: string;
    tone?: MailLabelTone;
}
export interface MessageListRowProps {
    /** Sender display name (or "me" for sent items). */
    sender: string;
    /** Subject line. */
    subject: string;
    /** Snippet / preview of the body. */
    preview?: string;
    /** Timestamp label (e.g. "09:41", "Tue"). */
    timestamp?: string;
    /** Sender avatar image URI. */
    avatarUri?: string;
    /** Unread → bold sender/subject + a leading unread dot. */
    unread?: boolean;
    /** Starred state (renders a trailing star toggle). */
    starred?: boolean;
    /** Toggle star; also enables the star affordance. */
    onToggleStar?: (starred: boolean) => void;
    /** Show a paperclip when the message has attachments. */
    hasAttachments?: boolean;
    /** Number of messages in the thread; > 1 shows a count pill. */
    threadCount?: number;
    /** Labels applied to the message. */
    labels?: MailLabelRef[];
    /** Selected/active state (split view / multi-select). */
    selected?: boolean;
    /** Open the message. */
    onPress?: () => void;
    /** Long-press (enter selection / context menu). */
    onLongPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * One row in a mail list — avatar, sender, subject, preview snippet, timestamp,
 * plus star / attachment / thread-count / label affordances. The `unread`
 * variant bolds the sender+subject and shows a leading accent dot, and the
 * accessibility label spells out "unread" so the state is never color-alone.
 * Data + callbacks only; all colors from theme tokens. No literal colors.
 */
export declare function MessageListRow({ sender, subject, preview, timestamp, avatarUri, unread, starred, onToggleStar, hasAttachments, threadCount, labels, selected, onPress, onLongPress, style, }: MessageListRowProps): React.ReactElement;
//# sourceMappingURL=MessageListRow.d.ts.map