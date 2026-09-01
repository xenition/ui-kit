import * as React from 'react';
import type { TableOfContentsProps } from './TableOfContents';
export interface TableOfContentsV4Props extends TableOfContentsProps {
    /** The list's accessible name when `title` is hidden. Default `'Contents'`. */
    navLabel?: string;
}
/**
 * **V4 table of contents** — same props as {@link TableOfContents} plus
 * `navLabel`.
 *
 * ## Six changes
 *
 * 1. **A read-only contents list is a list of headings.** `onSelect` is
 *    optional, and both twins passed `disabled={!onSelect}` — so the ordinary
 *    case, a TOC rendered for reading, turned every heading into a disabled
 *    button: greyed, out of the tab order, announced "unavailable". Without
 *    `onSelect` the rows are now plain text.
 * 2. **It is not a menu.** This twin said `menu` / `menuitem`, which promises a
 *    popup widget with menu keyboard semantics that nothing here implements,
 *    while the web twin used a navigation landmark. Both now describe the same
 *    object: a named list of headings.
 * 3. **The indent comes from the spacing scale on both twins.** The web twin
 *    multiplied depth by a hard-coded 16.
 * 4. **The current heading is not marked by colour alone.** It takes weight as
 *    well as `accentText`, and announces as selected.
 * 5. **A selectable row clears 44** and presses as a state layer rather than
 *    `opacity: 0.6`.
 * 6. **`navLabel` names the list when `title` is hidden**, instead of the
 *    fallback being a hard-coded `'Contents'` nobody could change.
 */
export declare function TableOfContentsV4({ items, activeId, onSelect, title, emptyLabel, navLabel, style, }: TableOfContentsV4Props): React.ReactElement;
//# sourceMappingURL=TableOfContentsV4.d.ts.map