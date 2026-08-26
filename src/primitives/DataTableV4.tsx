import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { shadowCss, useOptionalCompiledTheme } from './internal/v4-depth';
import {
  V4_TABLE_CSS,
  V4_TABLE_STYLE_ID,
  isControlColumn,
  isNumericColumn,
} from './internal/v4-data';
import { Input } from './Input';
import { Pagination } from './Pagination';
import type { DataTableColumn, DataTableProps } from './DataTable';

export type { DataTableProps as DataTableV4Props, DataTableColumn };

/**
 * Guiding two-line empty state (design.md §15): a title plus a hint on what
 * makes rows appear, instead of a bare "No data".
 */
const DEFAULT_EMPTY = (
  <div className="flex flex-col items-center gap-[var(--xen-space-xs)]">
    <span className="font-semibold text-on-surface">Nothing here yet</span>
    <span className="text-muted-text text-xs">Rows will appear once data is added.</span>
  </div>
);

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
export function DataTableV4<T>({
  columns,
  rows,
  pageSize = 10,
  searchable = false,
  getRowKey,
  onRowClick,
  empty = DEFAULT_EMPTY,
  className,
}: DataTableProps<T>): React.ReactElement {
  injectStyleOnce(V4_TABLE_STYLE_ID, V4_TABLE_CSS);
  const theme = useOptionalCompiledTheme();
  const [sort, setSort] = React.useState<{ key: string; dir: 'asc' | 'desc' } | null>(null);
  const [query, setQuery] = React.useState('');
  const [page, setPage] = React.useState(1);

  const accessorFor = React.useCallback(
    (col: DataTableColumn<T>) =>
      col.accessor ?? ((row: T) => (row as Record<string, unknown>)[col.key] as string | number),
    []
  );

  const filtered = React.useMemo(() => {
    if (!searchable || !query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter((r) =>
      columns.some((c) => String(accessorFor(c)(r) ?? '').toLowerCase().includes(q))
    );
  }, [rows, query, searchable, columns, accessorFor]);

  const sorted = React.useMemo(() => {
    if (!sort) return filtered;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return filtered;
    const acc = accessorFor(col);
    const copy = [...filtered].sort((a, b) => {
      const av = acc(a);
      const bv = acc(b);
      if (av < bv) return -1;
      if (av > bv) return 1;
      return 0;
    });
    return sort.dir === 'asc' ? copy : copy.reverse();
  }, [filtered, sort, columns, accessorFor]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const current = Math.min(page, pageCount);
  const pageRows = sorted.slice((current - 1) * pageSize, current * pageSize);

  const toggleSort = (key: string): void =>
    setSort((s) =>
      s && s.key === key ? (s.dir === 'asc' ? { key, dir: 'desc' } : null) : { key, dir: 'asc' }
    );

  // Alignment follows the rows actually on screen, using the same accessor the
  // sort and the search read — so a column stays aligned across pages.
  const numeric = React.useMemo(() => {
    const set = new Set<string>();
    columns.forEach((c) => {
      if (c.render) return;
      if (isNumericColumn(pageRows.map((r) => String(accessorFor(c)(r) ?? '')))) set.add(c.key);
    });
    return set;
  }, [columns, pageRows, accessorFor]);

  const vars: Record<string, string> = {};
  if (theme !== null) {
    vars['--xen-v4-lift-l'] = shadowCss(theme.lightElevation.card);
    vars['--xen-v4-lift-d'] = shadowCss(theme.darkElevation.card);
  }

  // A row-actions column shrinks to its buttons (`w-px` + `whitespace-nowrap`
  // is the table-layout idiom for "as narrow as the content"). Letting it take
  // an equal share is how a four-column table spends a quarter of its width on
  // two ghost buttons while the data gets squeezed.
  const controlCell = (c: DataTableColumn<T>): string =>
    isControlColumn(c.header, c.render !== undefined) ? 'w-px whitespace-nowrap text-right' : '';

  const first = (current - 1) * pageSize + 1;
  const last = (current - 1) * pageSize + pageRows.length;
  const showRange = pageRows.length > 0 && (pageCount > 1 || sorted.length !== rows.length);

  return (
    <div className={cn('flex flex-col gap-[var(--xen-space-md)]', className)}>
      {searchable && (
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search…"
          aria-label="Search"
          className="max-w-xs"
        />
      )}

      <div
        data-xen-v4-table=""
        className="w-full overflow-x-auto rounded-[var(--xen-radius-md)] border border-border bg-surface"
        style={vars as React.CSSProperties}
      >
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {columns.map((c) => {
                const active = sort?.key === c.key;
                return (
                  <th
                    key={c.key}
                    scope="col"
                    data-numeric={numeric.has(c.key) ? 'true' : 'false'}
                    aria-sort={active ? (sort?.dir === 'asc' ? 'ascending' : 'descending') : undefined}
                    onClick={c.sortable ? () => toggleSort(c.key) : undefined}
                    className={cn(
                      'px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-left text-xs',
                      controlCell(c),
                      // Promotion, not decoration: the sorted column is the one
                      // that reads at full strength.
                      active ? 'font-bold text-on-surface' : 'font-semibold text-muted-text',
                      c.sortable && 'cursor-pointer select-none'
                    )}
                  >
                    <span className="inline-flex items-center gap-[var(--xen-space-xs)]">
                      {c.header}
                      {c.sortable && (
                        <span aria-hidden>{active ? (sort?.dir === 'asc' ? '↑' : '↓') : '⇅'}</span>
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-[var(--xen-space-md)] py-[var(--xen-space-xl)] text-center text-muted-text"
                >
                  {empty}
                </td>
              </tr>
            ) : (
              pageRows.map((row, i) => (
                <tr
                  key={getRowKey ? getRowKey(row, i) : String(i)}
                  data-clickable={onRowClick ? 'true' : 'false'}
                  role={onRowClick ? 'button' : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  onKeyDown={
                    onRowClick
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onRowClick(row);
                          }
                        }
                      : undefined
                  }
                >
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      data-numeric={numeric.has(c.key) ? 'true' : 'false'}
                      className={cn(
                        'h-[calc(var(--xen-space-xl)_+_var(--xen-space-xs))] px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-on-surface',
                        controlCell(c)
                      )}
                    >
                      {c.render ? c.render(row) : String(accessorFor(c)(row) ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {(showRange || pageCount > 1) && (
        <div className="flex items-center justify-between gap-[var(--xen-space-md)]">
          {showRange ? (
            <span
              data-xen-v4-range=""
              className="text-xs text-muted-text [font-variant-numeric:tabular-nums]"
            >
              {`${first}–${last} of ${sorted.length}`}
            </span>
          ) : (
            <span />
          )}
          {pageCount > 1 ? (
            <Pagination page={current} pageCount={pageCount} onPageChange={setPage} />
          ) : (
            <span />
          )}
        </div>
      )}
    </div>
  );
}
