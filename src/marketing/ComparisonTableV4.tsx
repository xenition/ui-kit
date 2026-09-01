import * as React from 'react';
import { cn } from '../primitives/cn';
import type { ComparisonTableProps } from './ComparisonTable';

/** Drop-in for {@link ComparisonTableProps} — same props, the V4 "showcase" design. */
export type ComparisonTableV4Props = ComparisonTableProps;

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

const CrossCell = (): React.ReactElement => (
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
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
);

const renderValue = (value: boolean | string): React.ReactNode => {
  if (value === true) return <CheckCell />;
  if (value === false) return <CrossCell />;
  return <span className="text-sm text-on-surface">{value}</span>;
};

/**
 * ComparisonTable — **V4** "showcase" design (web parity of the native V4). A
 * clean bordered feature-comparison grid: plan `columns` across the top ×
 * feature `rows` down the side. ✓ = success glyph, ✗ = muted glyph (never color
 * alone), text cells pass through, and the highlighted/recommended column gets a
 * soft-primary tint plus a soft-primary chip. Same props/behavior as
 * {@link ComparisonTableProps}; token-only colors, no literals.
 */
export const ComparisonTableV4 = React.forwardRef<HTMLTableElement, ComparisonTableV4Props>(
  function ComparisonTableV4(
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
            'overflow-hidden rounded-[var(--xen-radius-lg)] border border-border shadow-sm',
            className
          )}
          {...rest}
        >
          <thead>
            <tr className="border-b border-border bg-neutral-50">
              <th
                scope="col"
                className="p-[var(--xen-space-md)] text-sm font-extrabold tracking-tight text-on-surface"
              >
                {featureLabel}
              </th>
              {columns.map((column, i) => (
                <th
                  key={i}
                  scope="col"
                  data-highlight={column.highlight ? 'true' : 'false'}
                  className={cn(
                    'p-[var(--xen-space-md)] text-center text-sm font-extrabold tracking-tight',
                    column.highlight ? 'bg-primary-50 text-primary' : 'text-on-surface'
                  )}
                >
                  <span className="flex flex-col items-center gap-[var(--xen-space-xs)]">
                    {column.name}
                    {column.highlight ? (
                      <span className="rounded-[var(--xen-radius-full)] bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-700">
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
