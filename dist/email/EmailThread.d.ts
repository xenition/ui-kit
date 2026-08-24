import * as React from 'react';
import { type AttachmentKind } from './AttachmentChip';
import { type MailLabelTone } from './MailLabelChip';
export interface ThreadAttachment {
    id: string;
    name: string;
    kind?: AttachmentKind;
    size?: string;
}
export interface ThreadMessage {
    id: string;
    /** Sender name. */
    sender: string;
    /** Sender avatar URL. */
    avatarUri?: string;
    /** Timestamp label. */
    timestamp?: string;
    /** Full body text (shown when expanded). */
    body: string;
    /** Starred state for this message. */
    starred?: boolean;
    /** Attachments on this message. */
    attachments?: ThreadAttachment[];
}
export interface ThreadLabelRef {
    id: string;
    label: string;
    tone?: MailLabelTone;
}
export interface EmailThreadProps {
    /** Thread subject line. */
    subject: string;
    /** Ordered messages in the conversation. */
    messages?: ThreadMessage[];
    /** Labels applied to the thread. */
    labels?: ThreadLabelRef[];
    /** Ids of expanded messages; others render collapsed (sender + snippet). */
    expandedIds?: string[];
    /** Toggle a message open/closed. */
    onToggleMessage?: (id: string) => void;
    /** Star toggle for a specific message. */
    onToggleStar?: (id: string, starred: boolean) => void;
    /** Click an attachment. */
    onPressAttachment?: (messageId: string, attachmentId: string) => void;
    /** Loading state → spinner. */
    loading?: boolean;
    className?: string;
}
/**
 * A full email conversation view — the subject header with thread labels, then
 * a stack of message cards. Each card header is an interactive `role="button"`
 * toggle: expanded shows the body + attachments, collapsed shows just sender +
 * a one-line snippet. Handles `loading` (spinner) and empty (no messages via
 * `EmptyState`) states. Data + callbacks only; every color from token classes.
 * No literal colors.
 */
export declare const EmailThread: React.ForwardRefExoticComponent<EmailThreadProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EmailThread.d.ts.map