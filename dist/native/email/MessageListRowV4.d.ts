import * as React from 'react';
import type { MessageListRowProps } from './MessageListRow';
export interface MessageListRowV4Props extends MessageListRowProps {
    /**
     * Turn `threadCount` into the words a reader hears and the pill a user sees.
     * Default `'4 messages'`.
     */
    formatThreadCount?: (count: number) => string;
    /** The word an unread row carries. Default `'Unread'`. */
    unreadLabel?: string;
}
/**
 * **V4 message list row** — same props as {@link MessageListRow} plus
 * `formatThreadCount` and `unreadLabel`.
 *
 * ## Six changes
 *
 * 1. **The spoken name contains what the row shows.** `accessibilityRole`
 *    makes a row's children presentational, so the preview, the thread count
 *    and every label chip were removed from the accessibility tree outright —
 *    a reader got six fragments of a row whose whole job is to be skimmed.
 *    The name is built with `spokenLine` and carries all of it.
 * 2. **The star is reachable.** Nesting it inside the row's `accessible`
 *    Pressable made it presentational too, so on VoiceOver the only way to
 *    star a message was to open it. It is a sibling of the row's button now.
 * 3. **Selected and pressed are different grounds.** Both resolved to
 *    `colors.border` — a hairline token used as a fill — so in a split-view
 *    inbox the finger repainted every row it passed as "the selected one".
 * 4. **The thread count carries a unit and is the pill its prop doc
 *    promises.** It was a bare numeral in `colors.muted`, which is a ramp step
 *    with no contrast promise; it is a `BadgeV4`, and a reader hears
 *    "4 messages".
 * 5. **Unread is a word and a contrast-corrected ink.** The timestamp took
 *    `colors.primary` — the fill slot — and the state itself was carried by
 *    weight and a dot. `unreadLabel` puts it in the name.
 * 6. **Nothing renders without a sender**, rather than a row of empty boxes.
 */
export declare function MessageListRowV4({ sender, subject, preview, timestamp, avatarUri, unread, starred, onToggleStar, hasAttachments, threadCount, labels, selected, formatThreadCount, unreadLabel, onPress, onLongPress, style, }: MessageListRowV4Props): React.ReactElement | null;
//# sourceMappingURL=MessageListRowV4.d.ts.map