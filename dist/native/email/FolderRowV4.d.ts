import * as React from 'react';
import type { FolderRowProps } from './FolderRow';
export interface FolderRowV4Props extends FolderRowProps {
    /**
     * Turn `count` into the words a reader hears. Default `'3 items'`.
     *
     * The prop it describes is documented as an "unread / item count", so the
     * unit belongs to the caller — a Drafts folder counts drafts.
     */
    formatCount?: (count: number) => string;
}
/**
 * **V4 folder row** — same props as {@link FolderRow} plus `formatCount`.
 *
 * ## Four changes
 *
 * 1. **It stops asserting "unread".** The base announced `` `${name}, ${count}
 *    unread` `` for a prop its own doc defines as an "unread / item count", so
 *    "Drafts, 3 unread" was wrong in every folder where the number is a count
 *    of items. `formatCount` names the unit and defaults to `'3 items'`.
 * 2. **Selected and pressed are different colours.** The base drew pressed as
 *    `colors.border` — a hairline token as a fill — so a finger held on Inbox
 *    made it look like the folder you were already in. Both grounds come from
 *    the shared row line now.
 * 3. **The label and count are their ground's guaranteed pair.** `selected`
 *    inked the name with `colors.primary`, a fill slot with no contrast
 *    promise as text, over a tint nobody measured; and the count pill mixed
 *    `withAlpha(colors.onSurface, 0.1)` by hand. The count is a `BadgeV4`,
 *    which owns its ground and re-measures its own ink.
 * 4. **The row clears 44** and joins the row family's one height and rhythm.
 */
export declare function FolderRowV4({ name, glyph, count, selected, depth, formatCount, onPress, style, }: FolderRowV4Props): React.ReactElement | null;
//# sourceMappingURL=FolderRowV4.d.ts.map