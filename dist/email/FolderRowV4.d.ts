import * as React from 'react';
import type { FolderRowProps } from './FolderRow';
export interface FolderRowV4Props extends FolderRowProps {
    /** How the trailing count is spoken. Default `` (n) => `${n} items` ``. */
    formatCount?: (count: number) => string;
}
/**
 * **V4 folder row** — same props as {@link FolderRow} plus `formatCount`.
 *
 * ## Four changes
 *
 * 1. **It stops saying "unread" for a number that is often not unread.** The
 *    prop's own doc defines `count` as "unread / item count", and the row
 *    announced "Drafts, 3 unread" — wrong for Drafts, wrong for Spam, wrong for
 *    any folder where the number is a total. `formatCount` names the unit and
 *    defaults to the honest one.
 * 2. **A hovered folder stops looking like the open one.** `bg-primary-50`
 *    selected against `bg-neutral-100` hover is two ramp steps a shade apart on
 *    a light page and two near-white slabs on a dark one, so running the mouse
 *    down the sidebar lit every folder as "the current one". Selected is the
 *    `selected` container; hover is the state layer over it.
 * 3. **The row clears 44.** `py-sm` on a `base` line left it near 32 — a
 *    sidebar target hit with a thumb while the other hand holds the phone.
 * 4. **The ink is the corrected slot and the pill has a guaranteed pair.**
 *    `text-primary` on the selected name and `bg-neutral-100 text-muted` on the
 *    pill were a fill used as ink and a ramp step used as a container.
 */
export declare const FolderRowV4: React.ForwardRefExoticComponent<FolderRowV4Props & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=FolderRowV4.d.ts.map