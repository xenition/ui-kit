import * as React from 'react';
import type { MessageGroupProps } from './MessageGroup';
export interface MessageGroupV4Props extends MessageGroupProps {
    /**
     * Fires when the failed receipt's retry is clicked. Passed straight to
     * {@link ReadReceiptV4} — the receipt is where a failure actually shows.
     */
    onRetry?: () => void;
    /** Copy on that retry. */
    retryLabel?: string;
}
/**
 * **V4 message group** — the web twin of the native `MessageGroupV4`, same
 * props as {@link MessageGroup} plus `onRetry` and `retryLabel`.
 *
 * ## Four changes
 *
 * 1. **A failed send can be retried**, through the receipt.
 * 2. **The group is one labelled list**, so a reader hears "Ada, 3 messages"
 *    and can step through them, rather than meeting a wall of bubbles with no
 *    author attached to any of them.
 * 3. **The avatar column is reserved even when the avatar is hidden**, so
 *    consecutive groups from the same author stay on one left edge instead of
 *    stepping in and out.
 * 4. **Renders nothing for an empty `messages`** (§4.5) — the base drew an
 *    avatar and a receipt attached to no message at all.
 */
export declare const MessageGroupV4: React.ForwardRefExoticComponent<MessageGroupV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MessageGroupV4.d.ts.map