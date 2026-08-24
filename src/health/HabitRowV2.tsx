import * as React from 'react';
import { cn } from '../primitives/cn';
import type { HabitRowProps } from './HabitRow';

/** Drop-in for {@link HabitRowProps} — same props, a different design. */
export type HabitRowV2Props = HabitRowProps;

/**
 * HabitRow — **circular tile** design (v2). A grid-friendly square: a large
 * ring (full & `success` when done, an empty `border` track when not) with a
 * check in its center, the habit name beneath, and a streak flame chip. The
 * whole tile is one tap target that toggles `done`. Elevated surface that lifts
 * on hover. Same props as {@link HabitRowProps}; token-only colors.
 */
export const HabitRowV2 = React.forwardRef<HTMLDivElement, HabitRowV2Props>(function HabitRowV2(
  { name, done, streak = 0, meta, onToggle, className, ...rest },
  ref
) {
  const safeStreak = Math.max(Math.floor(streak), 0);
  const a11y = `${name}, ${done ? 'done' : 'not done'}${
    safeStreak > 0 ? `, ${safeStreak} day streak` : ''
  }`;

  const ring = (
    <span
      className={cn(
        'flex h-[68px] w-[68px] items-center justify-center rounded-full border-4',
        done ? 'border-success bg-success/10' : 'border-border bg-surface'
      )}
    >
      <span
        aria-hidden="true"
        className={cn('text-2xl font-extrabold', done ? 'text-success' : 'text-muted')}
      >
        {done ? '✓' : ''}
      </span>
    </span>
  );

  const body = (
    <>
      {ring}
      <span
        className={cn(
          'line-clamp-2 text-center text-sm font-bold',
          done ? 'text-on-surface' : 'text-muted'
        )}
      >
        {name}
      </span>
      {meta ? <span className="truncate text-center text-xs text-muted">{meta}</span> : null}
      {safeStreak > 0 ? (
        <span className="flex items-center gap-[var(--xen-space-xs)] rounded-full bg-warn/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]">
          <span aria-hidden="true" className="text-sm leading-none">
            🔥
          </span>
          <span className="text-xs font-bold text-warn">{safeStreak}</span>
        </span>
      ) : null}
    </>
  );

  const tileClass =
    'flex flex-col items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-lg)] shadow-md';

  if (!onToggle) {
    return (
      <div ref={ref} aria-label={a11y} className={cn(tileClass, className)} {...rest}>
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
        tileClass,
        'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none',
        className
      )}
      {...rest}
    >
      {body}
    </div>
  );
});
