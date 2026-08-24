import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Badge, Button, Icon } from '../primitives';
import type { BadgeTone } from '../primitives';

/** Completion state of a chore. Drives the status chip + whether the action shows. */
export type ChoreStatus = 'todo' | 'in-progress' | 'done' | 'skipped';

interface StatusMeta {
  glyph: string;
  label: string;
  tone: BadgeTone;
}

const STATUS_META: Record<ChoreStatus, StatusMeta> = {
  todo: { glyph: '⬜', label: 'To do', tone: 'neutral' },
  'in-progress': { glyph: '🔄', label: 'In progress', tone: 'primary' },
  done: { glyph: '✅', label: 'Done', tone: 'success' },
  skipped: { glyph: '⏭️', label: 'Skipped', tone: 'warn' },
};

export interface ChoreCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  /** Chore title, e.g. "Make the bed". */
  title: string;
  /** Who the chore is assigned to. */
  assignee?: string;
  /** Reward points for completing the chore. */
  points?: number;
  /** Due label already formatted, e.g. "Today" or "Fri 5pm". */
  due?: string;
  /** Emoji/glyph shown as the chore icon. */
  icon?: string;
  /** Completion status; drives the chip + whether the action shows. */
  status?: ChoreStatus;
  /** Loading placeholder state. */
  loading?: boolean;
  /** Fires when the "Mark done" action is pressed (only shown when not done). */
  onComplete?: () => void;
  /** Fires when the card body is activated. */
  onClick?: () => void;
}

/**
 * A single chore: an icon, title, assignee + due line, a reward-points chip, a
 * status chip, and a "Mark done" button. Status is conveyed by glyph + text +
 * a11y label (never color alone). The action stops propagation so it never
 * triggers the card's `onClick`. Renders a muted skeleton while `loading`.
 * Token-bound throughout — no literal colors.
 */
export const ChoreCard = React.forwardRef<HTMLDivElement, ChoreCardProps>(function ChoreCard(
  { title, assignee, points, due, icon = '🧹', status = 'todo', loading = false, onComplete, onClick, className, ...rest },
  ref
) {
  const meta = STATUS_META[status] ?? STATUS_META.todo;
  const isDone = status === 'done';

  if (loading) {
    return (
      <Card ref={ref} data-xen-chore-card="" aria-label="Loading chore" className={className} {...rest}>
        <div className="space-y-2">
          <div className="h-3.5 w-3/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
          <div className="h-2.5 w-2/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
        </div>
      </Card>
    );
  }

  const subParts = [assignee, due].filter((s): s is string => !!s);
  const interactive = typeof onClick === 'function';
  const a11y = `${title}${assignee ? `, ${assignee}` : ''}, ${meta.label}`;
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <Card
      ref={ref}
      data-xen-chore-card=""
      className={cn(interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={a11y}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      {...rest}
    >
      <div className="flex items-center gap-3">
        <Icon glyph={icon} size="2xl" />
        <div className="min-w-0 flex-1">
          <p className={cn('truncate text-base font-bold text-on-surface', isDone && 'line-through')}>{title}</p>
          {subParts.length > 0 ? (
            <p className="truncate text-xs text-muted">{subParts.join(' · ')}</p>
          ) : null}
        </div>
        {typeof points === 'number' ? <Badge tone="primary">{`⭐ ${points}`}</Badge> : null}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <Badge tone={meta.tone}>{`${meta.glyph} ${meta.label}`}</Badge>
        {!isDone && onComplete ? (
          <Button
            size="sm"
            variant="primary"
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
          >
            Mark done
          </Button>
        ) : null}
      </div>
    </Card>
  );
});
