import * as React from 'react';
import { cn } from '../primitives/cn';

export interface ComparisonColumn {
  /** Column (plan) name shown in the header. */
  name: React.ReactNode;
  /** Emphasize this column as the recommended choice. */
  highlight?: boolean;
}

export interface ComparisonRow {
  /** Feature label for the row (leading cell). */
  label: React.ReactNode;
  /** One value per column: `true` → check, `false` → dash, string → text. */
  values: (boolean | string)[];
}

export interface ComparisonTableProps
  extends Omit<React.HTMLAttributes<HTMLTableElement>, 'children'> {
  /** Plan columns compared across the top. */
  columns: ComparisonColumn[];
  /** Feature rows; each `values[i]` maps to `columns[i]`. */
  rows: ComparisonRow[];
  /** Label for the empty top-left corner cell. */
  featureLabel?: React.ReactNode;
  /** Badge text on the highlighted column header. */
  highlightLabel?: React.ReactNode;
}

const CheckCell = (): React.ReactElement => (
  <svg
    aria-hidden="true"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mx-auto text-success"
  >
    <path d="M3 8.5l3.5 3.5L13 4.5" />
  </svg>
);

const DashCell = (): React.ReactElement => (
  <svg
    aria-hidden="true"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    className="mx-auto text-muted"
  >
    <path d="M4 8h8" />
  </svg>
);

const renderValue = (value: boolean | string): React.ReactNode => {
  if (value === true) return <CheckCell />;
  if (value === false) return <DashCell />;
  return <span className="text-sm text-on-surface">{value}</span>;
};

/**
 * Feature-comparison grid: plan `columns` across the top × feature `rows`
 * down the side, with check/dash/text cells and an optional highlighted
 * recommended column.
 */
export const ComparisonTable = React.forwardRef<HTMLTableElement, ComparisonTableProps>(
  function ComparisonTable(
    { columns, rows, featureLabel = '', highlightLabel = 'Recommended', className, ...rest },
    ref
  ) {
    return (
      <div className="w-full overflow-x-auto">
        <table
          ref={ref}
          data-xen-comparison=""
          className={cn(
            'w-full border-collapse text-left',
            'overflow-hidden rounded-[var(--xen-radius-lg)] border border-border',
            className
          )}
          {...rest}
        >
          <thead>
            <tr className="border-b border-border bg-neutral-50">
              <th scope="col" className="p-[var(--xen-space-md)] text-sm font-semibold text-on-surface">
                {featureLabel}
              </th>
              {columns.map((column, i) => (
                <th
                  key={i}
                  scope="col"
                  data-highlight={column.highlight ? 'true' : 'false'}
                  className={cn(
                    'p-[var(--xen-space-md)] text-center text-sm font-semibold',
                    column.highlight ? 'bg-primary-50 text-primary' : 'text-on-surface'
                  )}
                >
                  <span className="flex flex-col items-center gap-[var(--xen-space-xs)]">
                    {column.name}
                    {column.highlight ? (
                      <span className="rounded-[var(--xen-radius-full)] bg-primary px-2 py-0.5 text-xs font-medium text-on-primary">
                        {highlightLabel}
                      </span>
                    ) : null}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, r) => (
              <tr key={r}>
                <th
                  scope="row"
                  className="p-[var(--xen-space-md)] text-sm font-medium text-on-surface"
                >
                  {row.label}
                </th>
                {columns.map((column, c) => (
                  <td
                    key={c}
                    data-highlight={column.highlight ? 'true' : 'false'}
                    className={cn(
                      'p-[var(--xen-space-md)] text-center align-middle',
                      column.highlight && 'bg-primary-50'
                    )}
                  >
                    {renderValue(row.values[c] ?? false)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);
