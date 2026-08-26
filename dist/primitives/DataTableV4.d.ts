import * as React from 'react';
import type { DataTableColumn, DataTableProps } from './DataTable';
export type { DataTableProps as DataTableV4Props, DataTableColumn };
/**
 * **V4 data table** — the web twin of the native `DataTableV4`, same props as
 * {@link DataTable}, a different design line.
 *
 * It inherits everything `TableV4` establishes — one rule instead of `n`, a
 * scheme-derived zebra, right-aligned tabular numerals for quantity columns, a
 * sticky header that lifts and rows that never do — and answers the two
 * questions a *sortable, paginated* table adds, both of which the base leaves
 * the reader to work out:
 *
 * 1. **Which column is the table sorted by?** The base marks it with a caret
 *    the same weight and colour as every other caret on the row. V4 promotes
 *    the active header itself to `text-on-surface` at full weight and leaves
 *    the inactive ones muted, so the sort order reads off the header block at
 *    a glance rather than by hunting for a triangle (§33 — important
 *    information understandable through emphasis).
 * 2. **What am I looking at, out of how many?** A quiet `1–10 of 47` sits
 *    opposite the pager, in tabular figures so it does not reflow as the page
 *    changes. It is derived from data the component already has, so it costs
 *    no prop, and it is the difference between "page 2" and "page 2 of a
 *    filtered set of 47" — §37, make system status visible.
 *
 * That range line **only appears when it has something to say**: when the
 * table is paginated, or when a search has narrowed it. On a nine-row
 * unfiltered table it would be reading a number back to someone who can see
 * all nine, which is exactly the container §11 refuses to let exist.
 *
 * A clickable row also becomes reachable: `role="button"`, `tabIndex`, and
 * Enter/Space. The base bound `onRowClick` to a bare `<tr onClick>`, which is
 * unreachable without a mouse — §46 puts accessibility ahead of the design
 * line, so V4 fixes it rather than inheriting it.
 */
export declare function DataTableV4<T>({ columns, rows, pageSize, searchable, getRowKey, onRowClick, empty, className, }: DataTableProps<T>): React.ReactElement;
//# sourceMappingURL=DataTableV4.d.ts.map