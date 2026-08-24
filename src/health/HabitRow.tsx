import * as React from 'react';
import { cn } from '../primitives/cn';

export interface HabitRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onToggle'> {
  /** Habit name, e.g. "Drink water". */
  name: string;
  /** Whether the habit is done for the current period. */
  done: boolean;
  /** Current streak length; a flame + count is shown when `> 0`. */
  streak?: number;
  /** Secondary line, e.g. "Daily · 8 glasses". */
  meta?: string;
  /** Fires with the next `done` state when the row / checkbox is toggled. */
  onToggle?: (next: boolean) => void;
}

/**
 * A habit-tracker row: a tappable check control, the habit name + meta, and a
 * streak flame. Completing a habit reads in the `success` tone. `onToggle`
 * receives the next boolean state. Web parity of the native `HabitRow`;
 * token-only, `role="checkbox"` announces the done state and streak.
 */
export const HabitRow = React.forwardRef<HTMLDivElement, HabitRowProps>(function HabitRow(
  { name, done, streak = 0, meta, onToggle, className, ...rest },
  ref
) {
  const safeStreak = Math.max(Math.floor(streak), 0);
  const a11y = `${name}, ${done ? 'done' : 'not done'}${
    safeStreak > 0 ? `, ${safeStreak} day streak` : ''
  }`;

  const box = (
    <span
      className={cn(
        'flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border-2',
        done ? 'border-success bg-success' : 'border-border bg-surface'
      )}
    >
      {done ? (
        <span aria-hidden="true" className="text-sm font-bold text-on-success">
          ✓
        </span>
      ) : null}
    </span>
  );

  const body = (
    <>
      {box}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          className={cn(
            'truncate text-base font-semibold',
            done ? 'text-muted line-through' : 'text-on-surface'
          )}
        >
          {name}
        </span>
        {meta ? <span className="truncate text-sm text-muted">{meta}</span> : null}
      </span>
      {safeStreak > 0 ? (
        <span className="flex items-center gap-[var(--xen-space-xs)]">
          <span aria-hidden="true" className="text-sm leading-none">
            🔥
          </span>
          <span className="text-sm font-bold text-warn">{safeStreak}</span>
        </span>
      ) : null}
    </>
  );

  const rowClass =
    'flex min-h-[56px] items-center gap-[var(--xen-space-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]';

  if (!onToggle) {
    return (
      <div ref={ref} aria-label={a11y} className={cn(rowClass, className)} {...rest}>
        {body}
      </div>
    );
  }
  return (
    <div
      ref={ref}
      role="checkbox"
      aria-checked={done}
      aria-label={a11y}
      tabIndex={0}
      onClick={() => onToggle(!done)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle(!done);
        }
      }}
      className={cn(
        rowClass,
        'cursor-pointer transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      {body}
    </div>
  );
});
