import * as React from 'react';
import type { MessageGroupProps } from './MessageGroup';
export interface MessageGroupV4Props extends MessageGroupProps {
    /**
     * Fires when a failed group's retry is pressed. Passed through to the
     * receipt, which is where a failure is actually shown.
     */
    onRetry?: () => void;
    /** Copy on that retry. Default `'Retry'`. */
    retryLabel?: string;
}
/**
 * **V4 message group** — same props as {@link MessageGroup} plus `onRetry`
 * and `retryLabel`.
 *
 * ## Four changes
 *
 * 1. **A failed group can be retried.** The receipt was the only place a
 *    failure showed and it was inert; the handler now reaches it.
 * 2. **The group is announced as one turn.** The base left the author, each
 *    bubble and the receipt as separate stops, so a reader walking a thread
 *    heard "Ada", "hi", "9:04", "Read" as four unrelated things.
 * 3. **The avatar column's width is reserved on every group**, so consecutive
 *    groups from the same author line up instead of shifting when the avatar
 *    is hidden.
 * 4. **The time is tabular**, so a stack of bubbles has a straight right edge.
 *
 * **Renders nothing for an empty `messages`** (§4.5).
 */
export declare function MessageGroupV4({ side, messages, authorName, avatarUri, showAvatar, receipt, onRetry, retryLabel, style, }: MessageGroupV4Props): React.ReactElement | null;
//# sourceMappingURL=MessageGroupV4.d.ts.map