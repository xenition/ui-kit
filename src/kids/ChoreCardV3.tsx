import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import type { ChoreCardProps, ChoreStatus } from './ChoreCard';

/** Same public contract as {@link ChoreCard} — a drop-in alternate design. */
export type ChoreCardV3Props = ChoreCardProps;

const STATUS_LABEL: Record<ChoreStatus, string> = {
  todo: 'To do',
  'in-progress': 'In progress',
  done: 'Done',
  skipped: 'Skipped',
};

const STATUS_BOX: Record<ChoreStatus, string> = {
  todo: '⬜',
  'in-progress': '🔄',
  done: '✅',
  skipped: '⏭️',
};

/**
 * ChoreCard, redesigned (v3): a **dense checklist line**. A leading status box
 * glyph, the title inline with a middot-joined assignee·due·points subtitle, and
 * a quiet trailing "Done" text button. A hairline separates rows so many stack
 * as a tight to-do list — the opposite of v2's tall quest card. Same props,
 * token-only.
 */
export const ChoreCardV3 = React.forwardRef<HTMLDivElement, ChoreCardV3Props>(function ChoreCardV3(
  { title, assignee, points, due, icon, status = 'todo', loading = false, onComplete, onClick, className, ...rest },
  ref
) {
  void icon;
  const isDone = status === 'done';
  const interactive = typeof onClick === 'function';

  if (loading) {
    return (
      <div
        ref={ref}
        data-xen-chore-card=""
        aria-label="Loading chore"
        className={cn('flex items-center gap-3 border-b border-border py-2.5', className)}
        {...rest}
      >
        <div className="h-5 w-5 animate-pulse rounded-sm bg-neutral-200" />
        <div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-200" />
      </div>
    );
  }

  const subParts = [assignee, due, typeof points === 'number' ? `⭐ ${points}` : null].filter(
    (s): s is string => !!s
  );
  const a11y = `${title}, ${STATUS_LABEL[status]}`;
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      ref={ref}
      data-xen-chore-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={a11y}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      className={cn(
        'flex items-center gap-3 border-b border-border py-2.5',
        interactive && 'cursor-pointer transition-colors hover:bg-neutral-50',
        className
      )}
      {...rest}
    >
      <span aria-hidden className="text-lg leading-none">
        {STATUS_BOX[status]}
      </span>
      <div className="min-w-0 flex-1">
        <p className={cn('truncate text-sm font-semibold text-on-surface', isDone && 'text-muted line-through')}>
          {title}
        </p>
        {subParts.length > 0 ? <p className="truncate text-xs text-muted">{subParts.join(' · ')}</p> : null}
      </div>
      {!isDone && onComplete ? (
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
        >
          Done
        </Button>
      ) : null}
    </div>
  );
});
