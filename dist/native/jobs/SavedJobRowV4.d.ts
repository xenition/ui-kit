import * as React from 'react';
import type { SavedJobRowProps } from './SavedJobRow';
export interface SavedJobRowV4Props extends SavedJobRowProps {
    /** Name of the un-save affordance. Default `'Remove from saved'`. */
    removeLabel?: string;
    /** Re-word the saved age. Default `'2d ago'`. */
    formatRelative?: (iso: string) => string;
    /** The last row in a list — drops the separator that would hang off the end. */
    last?: boolean;
}
/**
 * **V4 saved-job row** — same props as {@link SavedJobRow} plus `removeLabel`,
 * `formatRelative` and `last`.
 *
 * ## Five changes
 *
 * 1. **The remove control is reachable.** It sat inside the row's own
 *    `Pressable`, which flattens its subtree on native — so the only way to
 *    un-save a job was invisible to a screen reader, and on the web twin
 *    pressing Enter on it opened the job instead of removing it. The row
 *    container is now a plain `View`, the activation wraps the avatar and text,
 *    and the ★ sits beside it as a real focus stop with a 44 target.
 * 2. **Removing is an action, not a toggle.** The base hard-coded
 *    `accessibilityState={{ selected: true }}` on it (and `aria-pressed={true}`
 *    on web), so the reader announced a permanently-on toggle. Pressing it
 *    removes the job; there is no second state to be in.
 * 3. **The row says what it is.** Its name was the title and the company. The
 *    pay, the employment type and the saved age are all inside the activation
 *    and flattened into it, so they are now part of the name — otherwise they
 *    are drawn for sighted users only.
 * 4. **Employment type lost its status colour.** `contract → warn` and
 *    `remote → success` are identity wearing the palette's two warning
 *    colours. A neutral chip carries the same fact and leaves `warn` meaning
 *    "caution".
 * 5. **It is a row from the shared row line** — one height, one 44 leading
 *    slot, one state layer, one hairline — with `mutedText` inking the
 *    captions instead of `muted`, which is a fill with no contrast promise.
 *
 * **Renders nothing without a job title** (§4.5).
 */
export declare function SavedJobRowV4({ job, savedAt, onPress, onRemove, removeLabel, formatRelative, last, style, }: SavedJobRowV4Props): React.ReactElement | null;
//# sourceMappingURL=SavedJobRowV4.d.ts.map