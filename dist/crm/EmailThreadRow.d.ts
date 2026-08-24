import * as React from 'react';
export interface EmailThreadRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Thread subject. */
    subject: string;
    /** Sender / counterpart name. */
    from: string;
    /** Preview snippet of the latest message. */
    snippet?: string;
    /** Avatar image URL; initials fallback from `from`. */
    avatarUrl?: string;
    /** Pre-formatted time (e.g. "9:41 AM"). */
    timestamp?: string;
    /** Unread → bold subject, a leading dot and a tinted surface. */
    unread?: boolean;
    /** Number of messages in the thread (badge when > 1). */
    messageCount?: number;
    /** Show a 📎 attachment marker. */
    hasAttachment?: boolean;
    /** Click handler (renders as a keyboard-accessible button). */
    onClick?: () => void;
}
/**
 * Inbox-style row for an email thread tied to a contact / deal: sender avatar,
 * subject, snippet, timestamp and a message-count badge. Unread threads read as
 * a bold subject plus a leading primary dot **and** an "Unread" a11y hint (not
 * color alone) over a `bg-primary-50` token wash. Guards `messageCount` (badge
 * only when > 1). When `onClick` is set the row is a `role="button"` div. All
 * colors are `--xen-*` token classes.
 */
export declare const EmailThreadRow: React.ForwardRefExoticComponent<EmailThreadRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EmailThreadRow.d.ts.map