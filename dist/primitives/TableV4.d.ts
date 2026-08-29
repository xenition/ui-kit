import * as React from 'react';
import type { TableColumn, TableProps } from './Table';
export type { TableProps as TableV4Props, TableColumn };
/**
 * **V4 table** — the web twin of the native `TableV4`, same props as
 * {@link Table}, a different design line.
 *
 * The base table draws a border under every row and fills its header with
 * `bg-neutral-50`. Both are the reflex §9 warns about: a rule per row costs a
 * line of ink for every item and buys nothing a steady baseline was not
 * already giving the eye, and a ramp-step header fill is a second surface
 * whose only job was to look like a header. On a twenty-row table the two
 * together turn the data into a grid the reader has to look *through*. A table
 * that reads faster is the premium version — not a table with more chrome.
 *
 * Five changes, all of them about scanning (§33):
 *
 * 1. **One rule, not `n` rules.** The single horizontal line left is the one
 *    that means something: labels above it, data below it.
 * 2. **A zebra that survives dark mode.** The band is `color-mix`ed from
 *    `--xen-surface` toward `--xen-on-surface`, both re-emitted under
 *    `[data-theme="dark"]`, so it darkens a light page and lightens a dark one
 *    with no dark rule of its own. `--xen-neutral-50` — what the base header
 *    used — was the obvious reach and the wrong one.
 * 3. **Numerals line up.** A column whose fallback text is entirely quantities
 *    is right-aligned and set in tabular figures, header included. Nothing was
 *    added to the props to say so: alignment is a fact about the data, and a
 *    column with a custom `render` opts out by construction.
 * 4. **A steady baseline.** Every row takes the same minimum height, so the
 *    eye tracks across a row and down a column without re-finding the line.
 * 5. **The header lifts, and only the header.** It is sticky, and it carries
 *    `elevation.card` — the one legitimate use of depth in a table, because it
 *    is genuinely a layer above the rows once they scroll under it. A data row
 *    never lifts. The compiler zeroes the token for a `depth: 'flat'` seed, so
 *    this needs no check.
 */
export declare function TableV4<T>({ columns, rows, getRowKey, empty, className, }: TableProps<T>): React.ReactElement;
//# sourceMappingURL=TableV4.d.ts.map