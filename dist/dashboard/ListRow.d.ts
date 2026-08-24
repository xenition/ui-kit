import * as React from 'react';
export interface ListRowProps {
    title: string;
    /** Secondary line under the title. */
    meta?: string;
    /** Optional avatar image URL; when omitted, initials from `title` are shown. */
    avatarUrl?: string;
    /** Set false to omit the avatar entirely (plain text row). */
    showAvatar?: boolean;
    /** Custom leading slot; overrides the avatar. */
    leading?: React.ReactNode;
    /** Trailing slot: value text, badge, chevron, control, … */
    action?: React.ReactNode;
    /** When set, the row renders as a button. */
    onClick?: () => void;
    className?: string;
}
/**
 * A generic list row: leading avatar/slot, title + meta, and a trailing action
 * slot. The workhorse row for lists of people, files, items, etc. Renders as a
 * `<button>` when `onClick` is provided. Token-only.
 */
export declare const ListRow: React.ForwardRefExoticComponent<ListRowProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=ListRow.d.ts.map