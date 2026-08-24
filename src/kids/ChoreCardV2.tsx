import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button, Icon } from '../primitives';
import type { BadgeTone } from '../primitives';
import type { ChoreCardProps, ChoreStatus } from './ChoreCard';

/** Same public contract as {@link ChoreCard} — a drop-in alternate design. */
export type ChoreCardV2Props = ChoreCardProps;

const STATUS_META: Record<ChoreStatus, { glyph: string; label: string; tone: BadgeTone }> = {
  todo: { glyph: '⬜', label: 'To do', tone: 'neutral' },
  'in-progress': { glyph: '🔄', label: 'In progress', tone: 'primary' },
  done: { glyph: '✅', label: 'Done', tone: 'success' },
  skipped: { glyph: '⏭️', label: 'Skipped', tone: 'warn' },
};

/**
 * ChoreCard, redesigned (v2): a **big tappable quest card**. The icon rides in a
 * large primary-tinted disc up top, the title is oversized, the reward points
 * are a hero star chip, and "Mark done" is a full-width primary button anchoring
 * the card. Elevated with a shadow that lifts on hover. Same props as
 * {@link ChoreCard}, token-only.
 */
export const ChoreCardV2 = React.forwardRef<HTMLDivElement, ChoreCardV2Props>(function ChoreCardV2(
  { title, assignee, points, due, icon = '🧹', status = 'todo', loading = false, onComplete, onClick, className, ...rest },
  ref
) {
  const meta = STATUS_META[status] ?? STATUS_META.todo;
  const isDone = status === 'done';
  const interactive = typeof onClick === 'function';

  if (loading) {
    return (
      <div
        ref={ref}
        data-xen-chore-card=""
        aria-label="Loading chore"
        className={cn('flex flex-col items-center gap-3 rounded-lg bg-surface p-md shadow-md', className)}
        {...rest}
      >
        <div className="h-16 w-16 animate-pulse rounded-full bg-neutral-200" />
        <div className="h-4 w-3/5 animate-pulse rounded-sm bg-neutral-200" />
        <div className="h-9 w-full animate-pulse rounded-md bg-neutral-200" />
      </div>
    );
  }

  const subParts = [assignee, due].filter((s): s is string => !!s);
  const a11y = `${title}${assignee ? `, ${assignee}` : ''}, ${meta.label}`;
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
        'flex flex-col items-center gap-2 rounded-lg bg-surface p-md text-center shadow-md transition-transform',
        interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        className
      )}
      {...rest}
    >
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Icon glyph={icon} size="2xl" />
        {typeof points === 'number' ? (
          <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 py-0.5 text-xs font-bold text-on-primary">
            {`⭐${points}`}
          </span>
        ) : null}
      </div>
      <p className={cn('text-lg font-bold text-on-surface', isDone && 'line-through')}>{title}</p>
      {subParts.length > 0 ? <p className="text-xs text-muted">{subParts.join(' · ')}</p> : null}
      <Badge tone={meta.tone}>{`${meta.glyph} ${meta.label}`}</Badge>
      {!isDone && onComplete ? (
        <Button
          size="md"
          variant="primary"
          className="mt-1 w-full"
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
        >
          Mark done
        </Button>
      ) : null}
    </div>
  );
});
