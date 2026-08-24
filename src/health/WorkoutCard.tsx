import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { TEXT_CLASS, type HealthColor } from './internal';

export type WorkoutVariant =
  | 'strength'
  | 'cardio'
  | 'yoga'
  | 'cycling'
  | 'running'
  | 'swimming'
  | 'hiit'
  | 'walking';

interface WorkoutMeta {
  glyph: string;
  label: string;
  color: HealthColor;
}

const WORKOUT_META: Record<WorkoutVariant, WorkoutMeta> = {
  strength: { glyph: '🏋️', label: 'Strength', color: 'primary' },
  cardio: { glyph: '❤️', label: 'Cardio', color: 'danger' },
  yoga: { glyph: '🧘', label: 'Yoga', color: 'accent' },
  cycling: { glyph: '🚴', label: 'Cycling', color: 'primary' },
  running: { glyph: '🏃', label: 'Running', color: 'warn' },
  swimming: { glyph: '🏊', label: 'Swimming', color: 'accent' },
  hiit: { glyph: '🔥', label: 'HIIT', color: 'danger' },
  walking: { glyph: '🚶', label: 'Walking', color: 'success' },
};

export interface WorkoutCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Workout name, e.g. "Upper body push". */
  title: string;
  /** Discipline; drives the icon, tag label, and accent tone. */
  variant: WorkoutVariant;
  /** Duration in minutes. */
  durationMin?: number;
  /** Calories burned / estimated. */
  calories?: number;
  /** Optional short description or focus. */
  description?: string;
  /** Whether the workout is already completed. */
  completed?: boolean;
  /** CTA label; defaults to "Start". Hidden when `completed` or no `onStart`. */
  startLabel?: string;
  onStart?: () => void;
}

/**
 * A workout summary card: discipline icon + tag, title, a duration / calories
 * stat strip, and a single dominant "Start" action. Completed workouts swap the
 * CTA for a `success` "Completed" note. The `variant` sets the icon and accent
 * tone. Web parity of the native `WorkoutCard`; token-only colors, `onStart`
 * fires from a real `<button>`.
 */
export const WorkoutCard = React.forwardRef<HTMLDivElement, WorkoutCardProps>(function WorkoutCard(
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
  const meta = WORKOUT_META[variant];

  return (
    <div
      ref={ref}
      aria-label={`${meta.label} workout: ${title}${completed ? ', completed' : ''}`}
      className={cn(
        'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <span aria-hidden="true" className="text-xl leading-none">
          {meta.glyph}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className={cn('text-xs font-bold uppercase', TEXT_CLASS[meta.color])}>
            {meta.label}
          </span>
          <span className="truncate text-lg font-bold text-on-surface">{title}</span>
        </div>
      </div>

      {description ? (
        <p className="line-clamp-2 text-sm text-muted">{description}</p>
      ) : null}

      {durationMin != null || calories != null ? (
        <div className="flex gap-[var(--xen-space-xl)]">
          {durationMin != null ? (
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted">Duration</span>
              <span className="text-base font-semibold text-on-surface">{durationMin} min</span>
            </div>
          ) : null}
          {calories != null ? (
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted">Calories</span>
              <span className="text-base font-semibold text-on-surface">{calories} kcal</span>
            </div>
          ) : null}
        </div>
      ) : null}

      {completed ? (
        <span className="text-sm font-bold text-success">✓ Completed</span>
      ) : onStart ? (
        <Button variant="primary" onClick={onStart}>
          {startLabel}
        </Button>
      ) : null}
    </div>
  );
});
