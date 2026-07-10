import * as React from 'react';
import { cn } from './cn';

export interface TableColumn<T> {
  /** Stable key; also the default field read from the row when `render` is omitted. */
  key: string;
  header: React.ReactNode;
  /** Custom cell renderer; falls back to `String(row[key])`. */
  render?: (row: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  /** Stable row key; defaults to the row index. */
  getRowKey?: (row: T, index: number) => string;
  /** Rendered when `rows` is empty. */
  empty?: React.ReactNode;
  className?: string;
}

/** Themed data table — the control every list/CRM/support queue needs. Horizontally
 *  scrollable, token-bound, with a built-in empty state. */
export function Table<T>({
  columns,
  rows,
  getRowKey,
  empty,
  className,
}: TableProps<T>): React.ReactElement {
  return (
    <div
      className={cn(
        'w-full overflow-x-auto rounded-[var(--xen-radius-md)] border border-border',
        className
      )}
    >
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-neutral-50">
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-2.5 text-left font-semibold text-on-surface">
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-muted">
                {empty ?? 'No data'}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={getRowKey ? getRowKey(row, i) : String(i)}
                className="border-b border-border last:border-0 hover:bg-neutral-50"
              >
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-2.5 text-on-surface">
                    {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
