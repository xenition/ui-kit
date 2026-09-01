import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import type { MatrixQuestionProps } from './MatrixQuestion';

/** Drop-in for {@link MatrixQuestionProps} — same props, the V4 "focus" design. */
export type MatrixQuestionV4Props = MatrixQuestionProps;

/**
 * MatrixQuestion — **V4** "clean form / focus" design. A calm, legible row×column
 * grid: one `radiogroup` per statement row sharing the same column choices, laid
 * out as a header row plus one big-tap-target cell per column. Legible column
 * headers sit above zebra-free rows separated only by a hairline `border`. The
 * chosen cell fills with a solid **primary** disc (on a soft `bg-primary/10`
 * tint) and is announced via `aria-checked` — state is never color-only. One
 * accent, generous 8-pt air, no gradients. An empty `rows`/`columns` list renders
 * a muted {@link EmptyState}. Same props/behavior as {@link MatrixQuestionProps};
 * all colors from `--xen-*` token classes (no literal colors).
 */
export const MatrixQuestionV4 = React.forwardRef<HTMLDivElement, MatrixQuestionV4Props>(
  function MatrixQuestionV4(
    { rows, columns, value, onChange, 'aria-label': ariaLabel = 'Rating matrix', disabled = false, className },
    ref
  ) {
    if (rows.length === 0 || columns.length === 0) {
      return <EmptyState ref={ref} title="Nothing to rate here." className={className} />;
    }

    return (
      <div
        ref={ref}
        aria-label={ariaLabel}
        className={cn(
          'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface',
          className
        )}
      >
        {/* Column header — legible, calm. The leading spacer aligns with the row-label column. */}
        <div className="flex items-end px-sm pt-sm pb-xs">
          <div className="flex-[1.4]" />
          {columns.map((c) => (
            <div key={c.id} className="flex flex-1 items-center justify-center">
              <span className="text-center text-xs font-bold tracking-wide text-muted">{c.label}</span>
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
              className="flex items-center border-t border-border px-sm py-xs"
            >
              <span className="flex-[1.4] py-xs pr-sm text-sm font-semibold text-on-surface">{row.label}</span>
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
                    className={cn(
                      'flex min-h-[44px] flex-1 items-center justify-center rounded-[var(--xen-radius-md)] transition-colors',
                      'disabled:pointer-events-none disabled:opacity-50',
                      selected ? 'bg-primary/10' : 'hover:bg-primary/10'
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-7 w-7 items-center justify-center rounded-full transition-colors',
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
