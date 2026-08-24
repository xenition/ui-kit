import * as React from 'react';
import { cn } from './cn';
import { Input } from './Input';
import { Pagination } from './Pagination';

/**
 * Guiding two-line empty state (design.md §15): a title plus a hint on what
 * makes rows appear, instead of a bare "No data".
 */
const DEFAULT_EMPTY = (
  <div className="flex flex-col items-center gap-1">
    <span className="font-medium text-on-surface">Nothing here yet</span>
    <span className="text-muted text-xs">Rows will appear once data is added.</span>
  </div>
);

export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  /** Custom cell renderer; falls back to `String(accessor(row))`. */
  render?: (row: T) => React.ReactNode;
  /** Enable click-to-sort on this column. */
  sortable?: boolean;
  /** Value used for sort + search (defaults to `row[key]`). */
  accessor?: (row: T) => string | number;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  /** Rows per page (default 10). */
  pageSize?: number;
  /** Show a search box that filters across accessors. */
  searchable?: boolean;
  getRowKey?: (row: T, index: number) => string;
  onRowClick?: (row: T) => void;
  empty?: React.ReactNode;
  className?: string;
}

/**
 * Sortable, searchable, paginated data table — the control every list/CRM/admin
 * screen needs. Client-side; bound to the theme tokens. For a full
 * create/edit/delete screen use {@link CrudTable}.
 */
export function DataTable<T>({
  columns,
  rows,
  pageSize = 10,
  searchable = false,
  getRowKey,
  onRowClick,
  empty = DEFAULT_EMPTY,
  className,
}: DataTableProps<T>): React.ReactElement {
  const [sort, setSort] = React.useState<{ key: string; dir: 'asc' | 'desc' } | null>(null);
  const [query, setQuery] = React.useState('');
  const [page, setPage] = React.useState(1);

  const accessorFor = React.useCallback(
    (col: DataTableColumn<T>) => col.accessor ?? ((row: T) => (row as Record<string, unknown>)[col.key] as string | number),
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

  const toggleSort = (key: string) =>
    setSort((s) => (s && s.key === key ? (s.dir === 'asc' ? { key, dir: 'desc' } : null) : { key, dir: 'asc' }));

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {searchable && (
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search…"
          className="max-w-xs"
        />
      )}
      <div className="w-full overflow-x-auto rounded-[var(--xen-radius-md)] border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-neutral-50">
              {columns.map((c) => {
                const active = sort?.key === c.key;
                return (
                  <th
                    key={c.key}
                    className={cn(
                      'px-4 py-2.5 text-left font-medium text-muted',
                      c.sortable && 'cursor-pointer select-none'
                    )}
                    onClick={c.sortable ? () => toggleSort(c.key) : undefined}
                  >
                    <span className="inline-flex items-center gap-1">
                      {c.header}
                      {c.sortable && (
                        <span className="text-xs">{active ? (sort?.dir === 'asc' ? '▲' : '▼') : '⇅'}</span>
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
                <td colSpan={columns.length} className="px-4 py-10 text-center text-muted">
                  {empty}
                </td>
              </tr>
            ) : (
              pageRows.map((row, i) => (
                <tr
                  key={getRowKey ? getRowKey(row, i) : i}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={cn(
                    'border-b border-border last:border-0',
                    onRowClick && 'cursor-pointer transition-colors hover:bg-neutral-50'
                  )}
                >
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-2.5 text-on-surface">
                      {c.render ? c.render(row) : String(accessorFor(c)(row) ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pageCount > 1 && (
        <div className="flex justify-end">
          <Pagination page={current} pageCount={pageCount} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
