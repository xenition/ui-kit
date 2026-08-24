import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import type { MatrixRow, SurveyChoice } from './types';

export interface MatrixQuestionProps {
  /** The statement rows. Empty (rows or columns) renders the empty state. */
  rows: MatrixRow[];
  /** The shared column choices applied to every row. */
  columns: SurveyChoice[];
  /** Controlled answers keyed by row id → selected column id. */
  value: Record<string, string>;
  /** Fires with the row and the column just chosen for it. */
  onChange: (rowId: string, columnId: string) => void;
  /** Accessible name for the matrix. Default `'Rating matrix'`. */
  'aria-label'?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * A matrix / grid question — one `radiogroup` per statement row, each sharing
 * the same column choices, laid out as a header row plus one selectable cell per
 * column. The chosen cell in a row fills with the primary token and is announced
 * via `aria-checked` (state is never color-only). An empty `rows` or `columns`
 * list renders a muted {@link EmptyState}. No literal colors.
 */
export const MatrixQuestion = React.forwardRef<HTMLDivElement, MatrixQuestionProps>(
  function MatrixQuestion(
    { rows, columns, value, onChange, 'aria-label': ariaLabel = 'Rating matrix', disabled = false, className },
    ref
  ) {
    if (rows.length === 0 || columns.length === 0) {
      return <EmptyState ref={ref} title="Nothing to rate here." className={className} />;
    }

    return (
      <div ref={ref} aria-label={ariaLabel} className={cn('flex flex-col gap-sm', className)}>
        {/* Column header. The leading spacer aligns with the row-label column. */}
        <div className="flex items-end">
          <div className="flex-[1.4]" />
          {columns.map((c) => (
            <div key={c.id} className="flex flex-1 items-center justify-center">
              <span className="text-center text-xs font-semibold text-muted">{c.label}</span>
            </div>
          ))}
        </div>

        {rows.map((row) => {
          const chosen = value[row.id];
          return (
            <div
              key={row.id}
              role="radiogroup"
              aria-label={row.label}
              className="flex items-center border-t border-border py-xs"
            >
              <span className="flex-[1.4] text-sm font-semibold text-on-surface">{row.label}</span>
              {columns.map((c) => {
                const selected = chosen === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={`${row.label}: ${c.label}`}
                    disabled={disabled}
                    onClick={() => onChange(row.id, c.id)}
                    className="flex flex-1 items-center justify-center py-xs disabled:pointer-events-none disabled:opacity-50"
                  >
                    <span
                      className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-full',
                        selected ? 'bg-primary' : 'border border-border bg-surface'
                      )}
                    >
                      {selected ? <span className="h-2.5 w-2.5 rounded-full bg-on-primary" /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
);
