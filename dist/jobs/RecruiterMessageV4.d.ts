import * as React from 'react';
import type { RecruiterMessageProps } from './RecruiterMessage';
export interface RecruiterMessageV4Props extends RecruiterMessageProps {
    /** Copy on the reply action. Default `'Reply'`. */
    replyLabel?: string;
    /** Render the sent age. Default `'3d ago'`, floored. */
    formatRelative?: (iso: string) => string;
    /** The last row in a list — drops the separator that would hang off the end. */
    last?: boolean;
}
/**
 * **V4 recruiter message** — same props as {@link RecruiterMessage} plus
 * `replyLabel`, `formatRelative` and `last`.
 *
 * ## Five changes
 *
 * 1. **Reply works from the keyboard.** It was a `<button>` inside a
 *    `<div role="button">` that ran `preventDefault(); onClick()` on the
 *    bubbled keydown — cancelling Reply's own activation and opening the
 *    thread instead. Tab to Reply, press Enter, and you are reading the
 *    message you meant to answer. The row is a plain container now and Reply
 *    is a **sibling** of the activation.
 * 2. **The message is announced.** The base's `aria-label` sat on a bare
 *    `<div>`, which ARIA forbids naming, so on Chrome and Firefox the sender,
 *    the company and the unread state reached nobody — and the preview, the
 *    part that decides whether the message is worth opening, was never in the
 *    label at all. It is now one sentence: unread, sender, company, preview,
 *    age.
 * 3. **Reply is a real tap target.** It was a bare `text-xs` word — roughly 16
 *    CSS pixels tall — and it is one of two controls on the row.
 * 4. **The sent age stops rounding up.** A message sent 90 minutes ago read
 *    "2h ago", which is a different afternoon.
 * 5. **It joins the shared row family**, and the preview and meta lines take
 *    `muted-text` rather than `muted` — a fill slot with no contrast promise —
 *    with press as a state layer rather than `hover:opacity-95`.
 */
export declare const RecruiterMessageV4: React.ForwardRefExoticComponent<RecruiterMessageV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RecruiterMessageV4.d.ts.map