import * as React from 'react';
/** Which side of the thread a message sits on. */
export type MessageBubbleSide = 'agent' | 'customer';
/** Delivery state for an outgoing (agent) message. */
export type MessageBubbleStatus = 'sending' | 'sent' | 'failed';
export interface MessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Display name of the sender (announced for a11y, shown as a muted label). */
    author: string;
    /** The message text. */
    body: string;
    /** Optional muted timestamp (e.g. "2:14 PM"). */
    time?: string;
    /**
     * Alignment + treatment. `agent` = right-aligned soft-primary tint bubble;
     * `customer` = left-aligned surface + border bubble. Defaults to `customer`.
     */
    side?: MessageBubbleSide;
    /** Optional sender avatar image URL (initials fall back to `author`). */
    avatarUrl?: string;
    /** Optional delivery hint shown under the bubble (muted, or danger when `failed`). */
    status?: MessageBubbleStatus;
}
/**
 * MessageBubble — **V4** "calm console" chat bubble. A single message in an
 * agent↔customer thread. Agent messages align right on a soft-primary tint
 * bubble; customer messages align left on a bordered surface bubble — one accent
 * = primary, no second color. Comfortable rounded padding, a muted sender label,
 * an optional avatar, an optional muted timestamp, and an optional delivery hint
 * (`sending`/`sent`/`failed`, the last in danger). The whole row is announced as
 * "{author} said: {body}". Presentational only. All colors from `--xen-*` token
 * classes (no literal hex). Dark-mode safe.
 */
export declare const MessageBubble: React.ForwardRefExoticComponent<MessageBubbleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MessageBubble.d.ts.map