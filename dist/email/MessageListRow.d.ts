import * as React from 'react';
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
    /** Sender avatar image URL. */
    avatarUri?: string;
    /** Unread → bold sender/subject + a leading unread dot (announced, not color-alone). */
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
    onClick?: () => void;
    /** Context / long-press affordance (enter selection / context menu). */
    onLongPress?: () => void;
    className?: string;
}
/**
 * One row in a mail list — avatar, sender, subject, preview snippet, timestamp,
 * plus star / attachment / thread-count / label affordances. The row is an
 * interactive `role="button"` element (keyboard-operable via Enter/Space); the
 * star lives in its own real `<button>` and stops propagation. The `unread`
 * variant bolds the sender+subject, shows a leading accent dot, and spells out
 * "unread" in the accessible label so the state is never color-alone. Data +
 * callbacks only; every color from token classes. No literal colors.
 */
export declare const MessageListRow: React.ForwardRefExoticComponent<MessageListRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MessageListRow.d.ts.map