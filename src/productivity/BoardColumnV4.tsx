import * as React from 'react';
import { cn } from '../primitives/cn';
import { TaskRow } from './TaskRow';
import type { BoardColumnProps } from './BoardColumn';

/** Drop-in for {@link BoardColumnProps} — same props, the V4 "flow" design. */
export type BoardColumnV4Props = BoardColumnProps;

/**
 * BoardColumn — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a Kanban column: a calm header with the title and a
 * **soft-primary count pill**, a subtle column surface, the stack of
 * {@link TaskRow} cards, and the "+ Add" affordance. Guards a missing array and
 * keeps title/count/cards/toggle behavior. Same props/behavior as
 * {@link BoardColumnProps}; all colors from `--xen-*` token classes (no literals).
 */
export const BoardColumnV4 = React.forwardRef<HTMLDivElement, BoardColumnV4Props>(
  function BoardColumnV4(
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
          'flex flex-col gap-2 rounded-[var(--xen-radius-lg)] bg-primary/[0.04] p-3',
          className
        )}
      >
        <div className="flex items-center gap-2 px-1">
          <span className="flex-1 text-base font-bold text-on-surface">{title}</span>
          <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
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
              className="bg-surface"
            />
          ))
        )}

        {onAddCard ? (
          <button
            type="button"
            aria-label="Add card"
            onClick={onAddCard}
            className="min-h-[44px] rounded-[var(--xen-radius-md)] py-1 text-center text-sm font-semibold text-primary transition-opacity hover:opacity-70"
          >
            + Add
          </button>
        ) : null}
      </div>
    );
  }
);
