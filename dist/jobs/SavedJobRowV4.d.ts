import * as React from 'react';
import type { SavedJobRowProps } from './SavedJobRow';
export interface SavedJobRowV4Props extends SavedJobRowProps {
    /** Names the ★. Default `'Remove <title> from saved'`. */
    removeLabel?: string;
    /** Render the saved age. Default `'3d ago'`, floored. */
    formatRelative?: (iso: string) => string;
    /** The last row in a list — drops the separator that would hang off the end. */
    last?: boolean;
}
/**
 * **V4 saved job row** — same props as {@link SavedJobRow} plus `removeLabel`,
 * `formatRelative` and `last`.
 *
 * ## Six changes
 *
 * 1. **The ★ removes the job from the keyboard.** It was a `<button>` inside a
 *    `<div role="button">` whose Enter/Space handler ran `preventDefault()` on
 *    the bubbled keydown — which cancels the star's own activation and fires
 *    the row instead. So a keyboard user pressing Enter on "Remove from saved"
 *    removed nothing and opened the job. The row is now a plain container with
 *    a real `<button>` activation and the ★ as its **sibling**.
 * 2. **The ★ stops claiming to be a toggle.** It hard-coded
 *    `aria-pressed={true}`, so it announced "pressed" — a state the user can
 *    never change and that is not what the control does. Removing a job from a
 *    list is an action; it now announces as one.
 * 3. **The row is one accessible name.** The base's `aria-label` sat on a
 *    `generic` element, which ARIA forbids naming, so on Chrome and Firefox
 *    nothing carried the title at all and the pay and the saved age were
 *    separate stops.
 * 4. **Employment type stops spending a status colour** — `contract → warn`,
 *    `remote → success`. An arrangement is identity.
 * 5. **The saved age stops rounding up.** 25 days saved read "1mo ago".
 * 6. **It joins the shared row family** — one height, one 44 leading slot, one
 *    state layer, one separator — with `ListRow`, `NotificationItem` and
 *    `ConversationRow`, instead of its own `border-b` and `hover:opacity-95`.
 */
export declare const SavedJobRowV4: React.ForwardRefExoticComponent<SavedJobRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SavedJobRowV4.d.ts.map