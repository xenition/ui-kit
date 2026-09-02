import * as React from 'react';
import type { RecruiterMessageProps } from './RecruiterMessage';
export interface RecruiterMessageV4Props extends RecruiterMessageProps {
    /** Copy on the reply action. Default `'Reply'`. */
    replyLabel?: string;
    /** Re-word the sent age. Default `'2d ago'`. */
    formatRelative?: (iso: string) => string;
    /** The last row in a list — drops the separator that would hang off the end. */
    last?: boolean;
}
/**
 * **V4 recruiter message** — same props as {@link RecruiterMessage} plus
 * `replyLabel`, `formatRelative` and `last`.
 *
 * ## Four changes
 *
 * 1. **Reply is reachable.** It was a `Pressable` inside the row's own
 *    `Pressable`, which is `accessible` by default and flattens everything
 *    under it — so on native the reply affordance was not a focus stop at all,
 *    and on the web twin Enter on it bubbled to the row and opened the thread
 *    instead of replying. It is now a sibling of the row's activation, a real
 *    button with its own name and a 44 target, where it had `hitSlop={6}` —
 *    about 26 points of target on the one control in the row a candidate
 *    actually presses.
 * 2. **The message is announced whole.** The name stopped at "Unread. Message
 *    from Dana at Acme": no preview, no age. A reader had to open a thread to
 *    find out what it was about, which is the difference between scanning an
 *    inbox and reading it.
 * 3. **`muted` stopped inking text.** The company, the age and a read
 *    message's whole preview were drawn in `muted` — a ramp step with no
 *    contrast promise — which is exactly the "read messages are unreadable"
 *    failure. `mutedText` is that colour corrected against the surface.
 * 4. **It is a row from the shared row line**, with the state layer instead of
 *    `opacity: 0.9`.
 *
 * Unread stays a dot **and** a weight **and** a word, as the base intended;
 * only the word was missing from anywhere a reader could hear it.
 *
 * **Renders nothing without a sender name** (§4.5).
 */
export declare function RecruiterMessageV4({ message, onPress, onReply, replyLabel, formatRelative, last, style, }: RecruiterMessageV4Props): React.ReactElement | null;
//# sourceMappingURL=RecruiterMessageV4.d.ts.map