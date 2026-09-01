import * as React from 'react';
import type { LookbookGridProps } from './LookbookGrid';
export interface LookbookGridV4Props extends LookbookGridProps {
    /**
     * Build a tile's accessible name when the item carries no `label`. Default
     * `'Look 3 of 12'` — the base fell back to the raw `id`, which is a database
     * key read aloud.
     */
    formatItemLabel?: (position: number, total: number) => string;
}
/**
 * **V4 lookbook grid** — same props as {@link LookbookGrid} plus
 * `formatItemLabel`.
 *
 * ## Four changes
 *
 * 1. **The placeholder ground is `colors.muted`**, not a translucent wash: a
 *    translucent fill borrows whatever is behind it, so an image that has not
 *    loaded is a different colour on every screen it appears on.
 * 2. **A tile without a label is named by position**, not by its `id` — the
 *    base read a database key aloud.
 * 3. **Press is a state layer**, not an opacity on the tile.
 * 4. **The caption overlay uses the scrim colour**, which is dark in both
 *    schemes, rather than `onSurface`, which inverts and turned the strip
 *    near-white on a dark page.
 */
export declare function LookbookGridV4({ items, columns, aspectRatio, emptyLabel, formatItemLabel, onSelect, style, }: LookbookGridV4Props): React.ReactElement;
//# sourceMappingURL=LookbookGridV4.d.ts.map