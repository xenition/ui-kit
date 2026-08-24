import * as React from 'react';
export interface InboxHeaderAction {
    id: string;
    /** Glyph rendered in the click target. */
    glyph: string;
    /** Accessible label. */
    label: string;
    onClick?: () => void;
}
export interface InboxHeaderProps {
    /** Mailbox / folder title (e.g. "Inbox"). */
    title: string;
    /** Unread count shown next to the title. */
    unreadCount?: number;
    /** Back affordance (a real `<button>`); shown when provided. */
    onBack?: () => void;
    /** Trailing action buttons (search, compose, refresh…). */
    actions?: InboxHeaderAction[];
    /** Syncing state → shows a "Syncing…" caption under the title. */
    syncing?: boolean;
    className?: string;
}
/**
 * Top bar for an inbox / mailbox screen — optional back button, the folder
 * title with an unread count, an optional "Syncing…" caption, and a row of
 * trailing icon actions (each a real `<button>`). Rendered as a semantic
 * `<header>` with token-bound surface/border. Data + callbacks only. No literal
 * colors.
 */
export declare const InboxHeader: React.ForwardRefExoticComponent<InboxHeaderProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=InboxHeader.d.ts.map