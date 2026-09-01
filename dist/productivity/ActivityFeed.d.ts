import * as React from 'react';
/** The kinds of task activity a feed row can describe. */
export type ActivityAction = 'completed' | 'created' | 'commented' | 'assigned' | 'moved';
/** One activity entry in the {@link ActivityFeed}. */
export interface ActivityItem {
    /** Stable identity for the entry; used as the row `key`. */
    id: string;
    /** Who performed the action — drives the leading avatar. */
    actor: {
        /** Display name (also the avatar's initials fallback). */
        name: string;
        /** Optional avatar image URL. */
        avatarUrl?: string;
    };
    /** What happened; selects the kind glyph and its semantic tint. */
    action: ActivityAction;
    /** Optional object of the action (e.g. a task title), rendered bold. */
    target?: string;
    /** Optional pre-formatted relative time (e.g. `'2h ago'`), rendered muted. */
    time?: string;
}
export interface ActivityFeedProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** The activity entries, newest first. */
    items: readonly ActivityItem[];
    /** Section heading above the list. Defaults to `'Activity'`. Pass `null` to hide it. */
    title?: string | null;
}
/**
 * ActivityFeed — **V4** "flow" task activity feed (web parity of the native
 * twin). A calm vertical list: each row an actor {@link Avatar} pinned with a
 * kind glyph badge (✓ / ＋ / 💬 / 👤 / ↔) tinted by its **semantic** token, the
 * action sentence with its **target in bold**, and a muted timestamp. Exposes a
 * `list` for screen readers. Presentational only. All colors from `--xen-*`
 * token classes — no literals.
 */
export declare const ActivityFeed: React.ForwardRefExoticComponent<ActivityFeedProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ActivityFeed.d.ts.map