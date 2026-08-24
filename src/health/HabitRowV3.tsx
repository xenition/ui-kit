import * as React from 'react';
import { cn } from '../primitives/cn';
import type { HabitRowProps } from './HabitRow';

/** Drop-in for {@link HabitRowProps} — same props, a different design. */
export type HabitRowV3Props = HabitRowProps;

/** How many streak dots the minimal line renders at most. */
const MAX_DOTS = 7;

/**
 * HabitRow — **minimal line** design (v3). A single quiet line: a small round
 * check on the left, the habit name, a compact row of week dots (the last
 * {@link MAX_DOTS} filled in `success`), then a `flame + count`. A left accent
 * bar switches to `success` when done; no surface fill — separation comes from
 * spacing. Tapping toggles `done`. Same props as {@link HabitRowProps};
 * token-only colors.
 */
export const HabitRowV3 = React.forwardRef<HTMLDivElement, HabitRowV3Props>(function HabitRowV3(
  { name, done, streak = 0, meta, onToggle, className, ...rest },
  ref
) {
  const safeStreak = Math.max(Math.floor(streak), 0);
  const a11y = `${name}, ${done ? 'done' : 'not done'}${
    safeStreak > 0 ? `, ${safeStreak} day streak` : ''
  }`;
  const filled = Math.min(safeStreak, MAX_DOTS);
  const dots = Array.from({ length: MAX_DOTS }, (_, i) => i < filled);

  const box = (
    <span
      className={cn(
        'flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2',
        done ? 'border-success bg-success' : 'border-border bg-surface'
      )}
    >
      {done ? (
        <span aria-hidden="true" className="text-[10px] font-extrabold leading-none text-on-success">
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
        {meta ? <span className="truncate text-xs text-muted">{meta}</span> : null}
      </span>
      <span aria-hidden="true" className="flex shrink-0 items-center gap-[3px]">
        {dots.map((on, i) => (
          <span key={i} className={cn('h-1.5 w-1.5 rounded-full', on ? 'bg-success' : 'bg-border')} />
        ))}
      </span>
      {safeStreak > 0 ? (
        <span className="flex shrink-0 items-center gap-0.5">
          <span aria-hidden="true" className="text-sm leading-none">
            🔥
          </span>
          <span className="text-sm font-bold text-warn">{safeStreak}</span>
        </span>
      ) : null}
    </>
  );

  const lineClass =
    'flex min-h-[44px] items-center gap-[var(--xen-space-sm)] border-l-2 py-[var(--xen-space-sm)] pl-[var(--xen-space-sm)] pr-[var(--xen-space-xs)]';
  const accent = done ? 'border-success' : 'border-border';

  if (!onToggle) {
    return (
      <div ref={ref} aria-label={a11y} className={cn(lineClass, accent, className)} {...rest}>
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
        lineClass,
        accent,
        'cursor-pointer transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      {body}
    </div>
  );
});
