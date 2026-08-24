import * as React from 'react';
export interface NotificationItemProps {
    title: string;
    /** Optional supporting body line. */
    body?: string;
    /** Timestamp label, e.g. "5m ago". */
    time?: string;
    /** Shows an unread dot and a subtly tinted surface. */
    unread?: boolean;
    /** When set, the row renders as a button. */
    onClick?: () => void;
    className?: string;
}
/**
 * A single notification row: title, optional body, timestamp, and an unread
 * indicator. Renders as a `<button>` when `onClick` is supplied. Token-only.
 */
export declare const NotificationItem: React.ForwardRefExoticComponent<NotificationItemProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=NotificationItem.d.ts.map