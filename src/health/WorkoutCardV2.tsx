import * as React from 'react';
import { cn } from '../primitives/cn';
import { TEXT_CLASS, type HealthColor } from './internal';
import type { WorkoutCardProps, WorkoutVariant } from './WorkoutCard';

/** Drop-in for {@link WorkoutCardProps} — same props, a different design. */
export type WorkoutCardV2Props = WorkoutCardProps;

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
 * WorkoutCard — **hero** design (v2). A large discipline glyph on a tinted disc
 * anchors the card, with a soft tag chip, title, and an emphasized stat pair.
 * The primary action is a circular **start FAB** floating bottom-right;
 * completed workouts replace it with a `success` chip. Elevated surface that
 * lifts on hover. Same props as {@link WorkoutCardProps}; token-only colors.
 */
export const WorkoutCardV2 = React.forwardRef<HTMLDivElement, WorkoutCardV2Props>(function WorkoutCardV2(
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
  const showFab = !completed && !!onStart;

  return (
    <div
      ref={ref}
      aria-label={`${meta.label} workout: ${title}${completed ? ', completed' : ''}`}
      className={cn(
        'relative flex flex-col gap-[var(--xen-space-md)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-lg)] shadow-md',
        showFab ? 'pb-[var(--xen-space-2xl)]' : null,
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <span className={cn('flex h-16 w-16 shrink-0 items-center justify-center rounded-full', TINT_BG[meta.color])}>
          <span aria-hidden="true" className="text-2xl leading-none">
            {meta.glyph}
          </span>
        </span>
        <div className="flex min-w-0 flex-1 flex-col items-start gap-[var(--xen-space-xs)]">
          <span className={cn('rounded-full px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold uppercase', TINT_BG[meta.color], TEXT_CLASS[meta.color])}>
            {meta.label}
          </span>
          <span className="line-clamp-2 text-xl font-extrabold text-on-surface">{title}</span>
        </div>
      </div>

      {description ? <p className="line-clamp-2 text-sm text-muted">{description}</p> : null}

      {durationMin != null || calories != null ? (
        <div className="flex gap-[var(--xen-space-xl)]">
          {durationMin != null ? (
            <div className="flex flex-col gap-0.5">
              <span className={cn('text-2xl font-extrabold', TEXT_CLASS[meta.color])}>{durationMin}</span>
              <span className="text-xs text-muted">minutes</span>
            </div>
          ) : null}
          {calories != null ? (
            <div className="flex flex-col gap-0.5">
              <span className="text-2xl font-extrabold text-on-surface">{calories}</span>
              <span className="text-xs text-muted">kcal</span>
            </div>
          ) : null}
        </div>
      ) : null}

      {completed ? (
        <span className="w-fit rounded-full bg-success/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-sm font-bold text-success">
          ✓ Completed
        </span>
      ) : null}

      {showFab ? (
        <button
          type="button"
          aria-label={`${startLabel} ${title}`}
          onClick={onStart}
          className="absolute bottom-[var(--xen-space-lg)] right-[var(--xen-space-lg)] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-primary text-lg font-extrabold text-on-primary shadow-lg transition duration-200 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none"
        >
          <span aria-hidden="true">▶</span>
        </button>
      ) : null}
    </div>
  );
});
