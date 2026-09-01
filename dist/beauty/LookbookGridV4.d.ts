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
 * **V4 lookbook grid** — the web twin of the native `LookbookGridV4`, same
 * props as {@link LookbookGrid} plus `formatItemLabel`.
 *
 * ## Four changes
 *
 * 1. **The placeholder ground is `bg-muted`**, not a translucent wash that
 *    borrows whatever is behind it.
 * 2. **A tile without a label is named by position**, not by its `id` — the
 *    base read a database key aloud.
 * 3. **The caption overlay uses the elevation colour**, dark in both schemes,
 *    rather than `on-surface`, which inverts.
 * 4. **The grid is a real list**, so a reader announces how many looks there
 *    are before walking them.
 */
export declare const LookbookGridV4: React.ForwardRefExoticComponent<LookbookGridV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LookbookGridV4.d.ts.map