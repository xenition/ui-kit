import * as React from 'react';
import type { EmailThreadProps } from './EmailThread';
export interface EmailThreadV4Props extends EmailThreadProps {
    /**
     * Which message starts open when the caller does **not** pass `expandedIds`.
     * Defaults to the newest message, which is what the base opened.
     */
    defaultExpandedId?: string;
    /** Announced while the thread loads. Default `'Loading messages'`. */
    loadingLabel?: string;
    /**
     * What to say when the fetch failed. There was no representation of a failed
     * thread at all: it rendered as an empty conversation.
     */
    errorLabel?: string;
}
/**
 * **V4 email thread** — same props as {@link EmailThread} plus
 * `defaultExpandedId`, `loadingLabel` and `errorLabel`.
 *
 * ## Five changes
 *
 * 1. **Expansion works when nobody is driving it.** The base computed
 *    `new Set(expandedIds ?? [lastId])` fresh on every render and held no
 *    state at all — while `expandedIds` is an *optional* prop and
 *    `onToggleMessage` an optional callback. Mounted the way the module's own
 *    barrel doc describes it (`<EmailThread subject messages />`), every header
 *    tap fired into a callback nobody was listening to: the newest message
 *    stayed open, every earlier one stayed a clipped one-line snippet, and
 *    `accessibilityState.expanded` never flipped. A user tapped the third
 *    reply, saw nothing, tapped again, and concluded the app was broken; a
 *    reader heard "Expand message from Priya, collapsed" every single time.
 *    `useThreadExpansion` — shared with the web twin, so both platforms fix it
 *    the same way — leaves the **controlled** path exactly as it was and gives
 *    the uncontrolled one somewhere to put its state. `onToggleMessage` still
 *    fires on both paths.
 * 2. **The timestamp and the star are outside the toggle.** They were children
 *    of the toggle `Pressable`, so tapping a message's time collapsed it — and
 *    because that Pressable is `accessible`, the star inside it was
 *    presentational: VoiceOver could not reach it at all. Toggle, timestamp
 *    and star are three siblings now, and the toggle is the sender and the
 *    snippet, which is the part that means "open this".
 * 3. **Loading is skeleton messages that announce themselves.** A centred
 *    spinner in a padded box collapsed the layout and then jumped; and the
 *    base's loading view had no role and no live region, so a reader was told
 *    nothing was happening.
 * 4. **A failed fetch has a representation.** `errorLabel` renders it, and
 *    announces — an empty thread and a broken one looked identical before.
 * 5. **The subject is the heading**, and every ink is a `*Text` slot rather
 *    than `colors.muted`, a ramp step carrying no contrast promise.
 */
export declare function EmailThreadV4({ subject, messages, labels, expandedIds, onToggleMessage, onToggleStar, onPressAttachment, loading, defaultExpandedId, loadingLabel, errorLabel, style, }: EmailThreadV4Props): React.ReactElement;
//# sourceMappingURL=EmailThreadV4.d.ts.map