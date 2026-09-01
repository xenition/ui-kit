import * as React from 'react';
import type { InboxHeaderProps } from './InboxHeader';
export interface InboxHeaderV4Props extends InboxHeaderProps {
    /** Turn `unreadCount` into the words a reader hears. Default `'42 unread'`. */
    formatUnread?: (count: number) => string;
    /** The syncing caption. Default `'Syncing…'`. */
    syncingLabel?: string;
}
/**
 * **V4 inbox header** — same props as {@link InboxHeader} plus `formatUnread`
 * and `syncingLabel`.
 *
 * ## Four changes
 *
 * 1. **The count says what it counts.** A reader heard "Inbox" and then "42",
 *    with nothing between them to say what 42 was. The title and the numeral
 *    are now one accessible name — "Inbox, 42 unread" — with the numeral
 *    itself drawn tabular so it does not shift as it counts down.
 * 2. **Syncing is announced.** The caption appeared and disappeared silently;
 *    it is a polite live region now, and `polite` rather than `assertive`
 *    because a background refresh is not worth interrupting a sentence for.
 * 3. **The heading role sits on the heading.** The base put
 *    `accessibilityRole="header"` on the whole bar, back button and actions
 *    included, so the row of icons was part of the heading. It sits on the
 *    title group — the same element the web twin marks up — and the bar itself
 *    is just a bar.
 * 4. **Every button clears 44** and answers a press with M3's state layer.
 *    `padding: spacing.xs` around a glyph plus `hitSlop={8}` is roughly 28
 *    points of real target, and `opacity: 0.6` reads as unavailable.
 */
export declare function InboxHeaderV4({ title, unreadCount, onBack, actions, syncing, formatUnread, syncingLabel, style, }: InboxHeaderV4Props): React.ReactElement | null;
//# sourceMappingURL=InboxHeaderV4.d.ts.map