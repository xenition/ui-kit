import * as React from 'react';
import { cn } from '../primitives/cn';
import { TEXT_CLASS, type HealthColor } from './internal';
import type { WorkoutCardProps, WorkoutVariant } from './WorkoutCard';

/** Drop-in for {@link WorkoutCardProps} — same props, a different design. */
export type WorkoutCardV3Props = WorkoutCardProps;

const META: Record<WorkoutVariant, { glyph: string; label: string; color: HealthColor }> = {
  strength: { glyph: '🏋️', label: 'Strength', color: 'primary' },
  cardio: { glyph: '❤️', label: 'Cardio', color: 'danger' },
  yoga: { glyph: '🧘', label: 'Yoga', color: 'accent' },
  cycling: { glyph: '🚴', label: 'Cycling', color: 'primary' },
  running: { glyph: '🏃', label: 'Running', color: 'warn' },
  swimming: { glyph: '🏊', label: 'Swimming', color: 'accent' },
  hiit: { glyph: '🔥', label: 'HIIT', color: 'danger' },
  walking: { glyph: '🚶', label: 'Walking', color: 'success' },
};

/** Soft tint background per accent slot (the web equal of native `withAlpha`). */
const TINT_BG: Record<HealthColor, string> = {
  primary: 'bg-primary/10',
  accent: 'bg-accent/10',
  success: 'bg-success/10',
  warn: 'bg-warn/10',
  danger: 'bg-danger/10',
};

/**
 * WorkoutCard — **compact row** design (v3). A tinted glyph square leads, then
 * the title with its discipline label and an inline `duration · kcal` stat
 * strip, and a trailing soft start chip (or a `success` check when completed).
 * Borderless — reads as one line in a list. Same props as
 * {@link WorkoutCardProps}; token-only colors.
 */
export const WorkoutCardV3 = React.forwardRef<HTMLDivElement, WorkoutCardV3Props>(function WorkoutCardV3(
  {
    title,
    variant,
    durationMin,
    calories,
    description,
    completed = false,
    startLabel = 'Start',
    onStart,
    className,
    ...rest
  },
  ref
) {
  const meta = META[variant];
  const stats: string[] = [];
  if (durationMin != null) stats.push(`${durationMin} min`);
  if (calories != null) stats.push(`${calories} kcal`);
  const showStart = !completed && !!onStart;
  const tail = stats.length ? `  ·  ${stats.join('  ·  ')}` : description ? `  ·  ${description}` : '';

  return (
    <div
      ref={ref}
      aria-label={`${meta.label} workout: ${title}${completed ? ', completed' : ''}`}
      className={cn(
        'flex min-h-[60px] items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)] px-[var(--xen-space-md)]',
        className
      )}
      {...rest}
    >
      <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]', TINT_BG[meta.color])}>
        <span aria-hidden="true" className="text-lg leading-none">
          {meta.glyph}
        </span>
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-base font-bold text-on-surface">{title}</span>
        <span className="truncate text-xs text-muted">
          <span className={cn('font-bold', TEXT_CLASS[meta.color])}>{meta.label}</span>
          {tail}
        </span>
      </div>

      {completed ? (
        <span className="shrink-0 text-sm font-extrabold text-success" aria-hidden="true">
          ✓
        </span>
      ) : showStart ? (
        <button
          type="button"
          aria-label={`${startLabel} ${title}`}
          onClick={onStart}
          className="shrink-0 rounded-full bg-primary/10 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-bold text-primary transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          {startLabel}
        </button>
      ) : null}
    </div>
  );
});
