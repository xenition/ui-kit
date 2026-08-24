import * as React from 'react';
export interface QuickReply {
    /** Stable identifier passed back to `onSelect`. */
    id: string;
    /** Chip label. */
    label: string;
}
export interface QuickRepliesProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Suggested replies to render as tappable chips. */
    replies: QuickReply[];
    /** Called with the reply id when a chip is clicked. */
    onSelect?: (id: string) => void;
}
/**
 * Horizontal strip of suggested-reply chips (smart replies / canned responses).
 * Scrolls horizontally when the suggestions overflow. Each chip is a button.
 * Renders nothing when `replies` is empty. No literal colors.
 */
export declare const QuickReplies: React.ForwardRefExoticComponent<QuickRepliesProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuickReplies.d.ts.map