import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    /** Sender avatar URI. */
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
    /** Tap an attachment. */
    onPressAttachment?: (messageId: string, attachmentId: string) => void;
    /** Loading state → spinner. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A full email conversation view — the subject header with thread labels, then
 * a stack of message cards. Each card is collapsible: expanded shows the body
 * and attachments, collapsed shows just sender + a one-line snippet. Handles
 * `loading` (spinner) and empty (no messages) states. Data + callbacks only;
 * every color from theme tokens. No literal colors.
 */
export declare function EmailThread({ subject, messages, labels, expandedIds, onToggleMessage, onToggleStar, onPressAttachment, loading, style, }: EmailThreadProps): React.ReactElement;
//# sourceMappingURL=EmailThread.d.ts.map