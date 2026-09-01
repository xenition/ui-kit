import * as React from 'react';
import type { ReorderRowProps } from './ReorderRow';
/** Adds nothing: every change here is structural. */
export interface ReorderRowV4Props extends ReorderRowProps {
}
/**
 * **V4 reorder row** — the web twin of the native `ReorderRowV4`, with exactly
 * the same props as {@link ReorderRow}.
 *
 * ## Four changes
 *
 * 1. **Enter on Reorder reorders.** The Reorder button sat *inside* a
 *    `role="button"` row — invalid ARIA, and a live keyboard bug: the row's
 *    `onKeyDown` caught the keydown bubbling out of the button and ran
 *    `e.preventDefault(); onClick()`. Enter's default action on a `<button>`
 *    **is** the click that was just cancelled, and Space's click fires on
 *    keyup, cancelled too — so a keyboard user pressed Enter on Reorder and
 *    opened the past order instead of reordering it. The fix is structural:
 *    the row's activation is a real `<button>` around the thumbnail and the
 *    text, and Reorder is its **sibling**. No `stopPropagation`, no key guard,
 *    nothing left to double-fire.
 * 2. **The items summary is spoken.** `aria-label` was the title and the meta
 *    line on a children-presentational root, so "2× Pad Thai, 1× Spring rolls"
 *    — the one line that says what the order actually was — never reached the
 *    reader. It is the whole point of a reorder row.
 * 3. **`disabled` means disabled.** The base set `aria-disabled` on the row
 *    and passed `onClick` through unguarded, so a row it had just announced as
 *    unavailable still opened.
 * 4. **Dimming and hover stop fighting.** `opacity-60` and `hover:opacity-90`
 *    shared a node, so a disabled row got *brighter* under the pointer. M3
 *    disables content at 0.38 and draws press as a state layer; both live in
 *    `v4-state` and neither is a guess.
 */
export declare const ReorderRowV4: React.ForwardRefExoticComponent<ReorderRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ReorderRowV4.d.ts.map