import * as React from 'react';
export interface ActivityItem {
    id: string;
    title: string;
    /** Secondary line, e.g. "by Ada · Billing". */
    meta?: string;
    /** Relative or absolute timestamp label, e.g. "2h ago". */
    time?: string;
}
export interface ActivityFeedProps extends React.HTMLAttributes<HTMLDivElement> {
    items: ActivityItem[];
    /** Optional section heading. */
    title?: string;
    /** Copy for the empty state when `items` is empty. */
    emptyMessage?: string;
}
/**
 * A vertical activity/event log with a dot rail. Renders a real empty state
 * (per design.md §15) when there is nothing to show rather than a blank box.
 * Token-only.
 */
export declare const ActivityFeed: React.ForwardRefExoticComponent<ActivityFeedProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ActivityFeed.d.ts.map