import * as React from 'react';
import type { TableOfContentsProps } from './TableOfContents';
export interface TableOfContentsV4Props extends TableOfContentsProps {
    /**
     * The navigation's accessible name when `title` is not a string. Default
     * `'Contents'`.
     *
     * The base fell back to a hard-coded `'Contents'` in exactly that case, so a
     * caller who passed `title={null}` to hide the heading could not name the
     * region at all.
     */
    navLabel?: string;
}
/**
 * **V4 table of contents** — the web twin of the native `TableOfContentsV4`,
 * same props as {@link TableOfContents} plus `navLabel`.
 *
 * ## Six changes
 *
 * 1. **A read-only table of contents is a list of headings.** Both twins
 *    passed `disabled={!onSelect}`, and `onSelect` is optional — so a TOC
 *    rendered for reading, the ordinary case, turned every heading into a
 *    `<button disabled>`: greyed by the UA, out of the tab order, announced
 *    "unavailable". Without a handler it now renders plain list items.
 * 2. **Both twins say navigation.** Native said `menu`/`menuitem`, which
 *    promises a popup widget with menu keyboard semantics that neither twin
 *    implements.
 * 3. **The indent comes from the spacing scale**, not a typed `depth * 16`.
 * 4. **The active heading takes `accentText`** — the contrast-corrected slot —
 *    and is marked by weight and `aria-current` as well as by colour.
 * 5. **A selectable row clears 44 and presses with the state layer**, not
 *    `opacity: 0.6`, which reads as unavailable.
 * 6. **`navLabel` names the region** when `title` is hidden.
 */
export declare const TableOfContentsV4: React.ForwardRefExoticComponent<TableOfContentsV4Props & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=TableOfContentsV4.d.ts.map