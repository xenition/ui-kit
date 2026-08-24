import * as React from 'react';
import { cn } from './cn';

export interface KanbanCard {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Optional trailing slot (e.g. a Badge or Avatar). */
  trailing?: React.ReactNode;
}

export interface KanbanColumn {
  key: string;
  title: React.ReactNode;
  cards: KanbanCard[];
}

export interface KanbanProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: KanbanColumn[];
  /** Fires when a card is clicked. */
  onCardPress?: (card: KanbanCard, column: KanbanColumn) => void;
  /** Width of each column in px (default 260). */
  columnWidth?: number;
}

/**
 * Web parity of the native `Kanban`: a horizontally scrolling board of titled
 * columns, each a vertical stack of cards with a count chip. Non-drag (click a
 * card via `onCardPress`); wire your own DnD layer for reordering. Empty columns
 * show a muted placeholder. All colors/spacing come from the `--xen-*` tokens via
 * Tailwind classes — no literal colors.
 */
export const Kanban = React.forwardRef<HTMLDivElement, KanbanProps>(function Kanban(
  { className, columns, onCardPress, columnWidth = 260, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn('flex gap-3 overflow-x-auto', className)} {...rest}>
      {columns.map((column) => (
        <section
          key={column.key}
          style={{ width: columnWidth, minWidth: columnWidth }}
          className="bg-surface flex shrink-0 flex-col gap-2 rounded-[var(--xen-radius-md)] border border-border p-2"
        >
          <header className="flex items-center justify-between px-1 pb-1">
            <span className="text-sm font-bold text-on-surface">{column.title}</span>
            <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-muted px-1.5 py-0.5 text-xs font-semibold text-surface">
              {column.cards.length}
            </span>
          </header>

          {column.cards.length === 0 ? (
            <div className="py-6 text-center text-xs text-muted">No cards</div>
          ) : (
            column.cards.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => onCardPress?.(card, column)}
                className="bg-surface flex flex-col gap-1 rounded-[var(--xen-radius-sm)] border border-border p-2 text-left transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="min-w-0 flex-1 text-sm font-semibold text-on-surface">
                    {card.title}
                  </span>
                  {card.trailing != null ? <span className="shrink-0">{card.trailing}</span> : null}
                </div>
                {card.description != null ? (
                  <span className="text-xs text-muted">{card.description}</span>
                ) : null}
              </button>
            ))
          )}
        </section>
      ))}
    </div>
  );
});
