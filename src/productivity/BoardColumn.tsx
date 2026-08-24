import * as React from 'react';
import { cn } from '../primitives/cn';
import { TaskRow } from './TaskRow';
import type { PriorityLevel } from './PriorityTag';
import type { DueDateTone } from './DueDatePill';

export interface BoardCard {
  id: string;
  title: string;
  done?: boolean;
  priority?: PriorityLevel;
  dueLabel?: string;
  dueTone?: DueDateTone;
}

export interface BoardColumnProps {
  /** Column heading (e.g. `'In progress'`). */
  title: string;
  /** Cards in this column; an empty array shows a muted placeholder. */
  cards: BoardCard[];
  /** Fires when a card is toggled done. */
  onToggleCard?: (id: string, done: boolean) => void;
  /** Fires when a card body is clicked. */
  onCardClick?: (id: string) => void;
  /** Fires from the footer "+ Add" affordance (hidden when omitted). */
  onAddCard?: () => void;
  /** Fixed column width in px (default 280). */
  width?: number;
  className?: string;
}

/**
 * A single Kanban column — the vertical half of a board: a header with a title
 * and count chip, a stack of {@link TaskRow} cards (each toggleable), an optional
 * "+ Add" footer, and a muted empty placeholder. Web parity of the native
 * `BoardColumn` (`onCardPress` → `onCardClick`). Guards a missing array. No
 * literal colors.
 */
export const BoardColumn = React.forwardRef<HTMLDivElement, BoardColumnProps>(function BoardColumn(
  { title, cards, onToggleCard, onCardClick, onAddCard, width = 280, className },
  ref
) {
  const items = Array.isArray(cards) ? cards : [];

  return (
    <div
      ref={ref}
      aria-label={`${title} column, ${items.length} cards`}
      style={{ width }}
      className={cn(
        'flex flex-col gap-2 rounded-[var(--xen-radius-md)] border border-border bg-surface p-2',
        className
      )}
    >
      <div className="flex items-center justify-between px-1">
        <span className="text-sm font-bold text-on-surface">{title}</span>
        <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-muted px-1.5 py-0.5 text-xs font-semibold text-surface">
          {items.length}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="py-6 text-center text-xs text-muted">No cards</div>
      ) : (
        items.map((c) => (
          <TaskRow
            key={c.id}
            title={c.title}
            done={c.done}
            variant={c.dueLabel ? 'dated' : 'priority'}
            priority={c.priority ?? 'low'}
            dueLabel={c.dueLabel}
            dueTone={c.dueTone}
            onToggle={(next) => onToggleCard?.(c.id, next)}
            onClick={onCardClick ? () => onCardClick(c.id) : undefined}
            className="border border-border"
          />
        ))
      )}

      {onAddCard ? (
        <button
          type="button"
          aria-label="Add card"
          onClick={onAddCard}
          className="py-1 text-center text-sm font-semibold text-primary transition-opacity hover:opacity-70"
        >
          + Add
        </button>
      ) : null}
    </div>
  );
});
