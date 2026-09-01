import * as React from 'react';
import type { EmailThreadRowProps } from './EmailThreadRow';
export interface EmailThreadRowV4Props extends EmailThreadRowProps {
    /** Announced for an unread thread. Default `'Unread'`. */
    unreadLabel?: string;
    /** How the message count is spelled. Default `'4 messages'`. */
    formatMessageCount?: (count: number) => string;
}
/**
 * **V4 email thread row** — same props as {@link EmailThreadRow} plus
 * `unreadLabel` and `formatMessageCount`.
 *
 * ## Five changes
 *
 * 1. **Unread bolds the *subject*.** Both twins' docblocks always said
 *    "unread → bold subject"; both bolded the **sender**, so the one line a
 *    user scans an inbox for was the one line the state did not emphasise.
 * 2. **The unread wash is one colour on both twins.** Web painted
 *    `bg-primary-50` — a ramp step that ignores the seed — against native's
 *    `withAlpha(primary, .06)`, whose rendered colour depended on whatever was
 *    behind the row. Both now take `selected`/`onSelected`, the compiler's
 *    opaque pair for exactly this.
 * 3. **The message count carries a unit.** The badge printed a bare `4`, which
 *    a reader announces as the number four and nothing else.
 * 4. **The row is only a button when it is interactive.** Native set
 *    `accessibilityRole="button"` unconditionally with `disabled={!onPress}`,
 *    so a read-only row announced as a **disabled button**.
 * 5. **One spoken name** carrying sender, subject, snippet, time, unread and
 *    the count (rule A), a real press layer (rule B) and `BADGE_V4` (rule C).
 *
 * **Renders nothing without a `subject`.**
 */
export declare function EmailThreadRowV4({ subject, from, snippet, avatarUrl, timestamp, unread, messageCount, hasAttachment, unreadLabel, formatMessageCount, onPress, testID, style, }: EmailThreadRowV4Props): React.ReactElement | null;
//# sourceMappingURL=EmailThreadRowV4.d.ts.map