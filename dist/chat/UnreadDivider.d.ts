import * as React from 'react';
export interface UnreadDividerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Divider label (default "Unread messages"). */
    label?: string;
    /** Optional count of unread messages, prepended to the label when > 0. */
    count?: number;
}
/**
 * Full-width rule marking the first unread message in a thread — the "New
 * messages" line. Uses the primary token so it reads as an active marker.
 * Exposed as a `separator`. No literal colors.
 */
export declare const UnreadDivider: React.ForwardRefExoticComponent<UnreadDividerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=UnreadDivider.d.ts.map