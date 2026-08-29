import * as React from 'react';
import type { TableColumn, TableProps } from './Table';
export type { TableProps as TableV4Props, TableColumn };
/**
 * **V4 table** — same props as {@link Table}, a different design line.
 *
 * The base table draws a border under every row. That is the reflex §9 warns
 * about: a rule per row costs a line of ink for every item and buys nothing
 * the eye was not already getting from a steady baseline, and on a
 * twenty-row table it turns the data into a grid the reader has to look
 * *through*. A table that reads faster is the premium version — not a table
 * with more chrome on it.
 *
 * Four changes, all of them about scanning (§33):
 *
 * 1. **One rule, not `n` rules.** The single horizontal line left is the one
 *    that means something: labels above it, data below it. Row separation
 *    becomes a steady row height plus an optional zebra band — spacing as
 *    structure (§9), not borders everywhere.
 * 2. **A zebra that survives dark mode.** The band is mixed from `surface`
 *    toward `onSurface`, both of which the provider has already resolved for
 *    the active scheme, so it darkens a light page and lightens a dark one
 *    with no branch. `tokens.ramps` would have been the obvious reach and the
 *    wrong one — it carries the LIGHT orientation in both schemes, so
 *    `ramps.neutral[50]` paints a near-white band across a dark table.
 * 3. **Numerals line up.** A column whose fallback text is entirely quantities
 *    is right-aligned and set in tabular figures, header included. A column of
 *    numbers whose decimal points do not line up cannot be compared by eye,
 *    and that comparison is why the column is on screen. Nothing was added to
 *    the props to say so: alignment is a fact about the data, and a column
 *    with a custom `render` opts out by construction.
 * 4. **A steady baseline.** Every row takes the same minimum height and
 *    centres its cells in it, so the eye tracks across a row and down a column
 *    without re-finding the line each time.
 *
 * **No depth anywhere in the body.** Depth marks a layer, not a row — a table
 * whose rows each cast a shadow is the "cards inside cards inside cards" §8
 * bans, wearing a different hat. The container keeps its hairline because a
 * table genuinely is one object (§11); the rows inside it are not eleven more.
 */
export declare function TableV4<T>({ columns, rows, getRowKey, empty, style, }: TableProps<T>): React.ReactElement;
//# sourceMappingURL=TableV4.d.ts.map