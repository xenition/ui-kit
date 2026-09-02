import * as React from 'react';
import { cn } from '../primitives/cn';
import { ButtonV4 } from '../primitives/ButtonV4';
import { TONE_INK } from '../primitives/internal/tone-v4';
import type { WorkoutCardProps, WorkoutVariant } from './WorkoutCard';
import {
  appearanceClass,
  HEALTH_CARD_CLASS,
  spokenLine,
  type Appearance,
} from './internal/tone-v4';

export interface WorkoutCardV4Props extends WorkoutCardProps {
  /** Override the two stat captions. Default `'Duration'` and `'Calories'`. */
  statLabels?: { duration?: string; calories?: string };
  /** Copy on the completed note. Default `'Completed'`. */
  completedLabel?: string;
  /** Surface preset, matching the native twin. Default `'classic'`. */
  appearance?: Appearance;
}

interface WorkoutMeta {
  glyph: string;
  label: string;
}

/**
 * Identity only — a glyph and a name.
 *
 * The base's third field was a tone, and it read `cardio: 'danger'`,
 * `running: 'warn'`, `walking: 'success'`. See the docblock's change 1.
 */
const WORKOUT_META: Record<WorkoutVariant, WorkoutMeta> = {
  strength: { glyph: '🏋️', label: 'Strength' },
  cardio: { glyph: '❤️', label: 'Cardio' },
  yoga: { glyph: '🧘', label: 'Yoga' },
  cycling: { glyph: '🚴', label: 'Cycling' },
  running: { glyph: '🏃', label: 'Running' },
  swimming: { glyph: '🏊', label: 'Swimming' },
  hiit: { glyph: '🔥', label: 'HIIT' },
  walking: { glyph: '🚶', label: 'Walking' },
};

/**
 * **V4 workout card** — same props as {@link WorkoutCard} plus `statLabels`,
 * `completedLabel` and `appearance`.
 *
 * ## Four changes
 *
 * 1. **A walk stopped reading as good news and a cardio session as an alarm.**
 *    The discipline tag was tinted by `variant` — `cardio: 'danger'`,
 *    `running: 'warn'`, `walking: 'success'` — so the kit's status vocabulary
 *    was spent saying which *kind* of exercise this is. A run is not a warning.
 *    The glyph carries the discipline; the tag is neutral ink.
 * 2. **The card's whole summary was on a bare `<div>`.** Role `generic` cannot
 *    be named, so browsers drop `aria-label` from it outright and the sentence
 *    reached nobody. It is a named `group` now — and "Completed" is inside that
 *    name, where before it was a green tick only a sighted user could see.
 * 3. **The two stat captions and the completed word are props.** A localised
 *    app had to fork the component to translate "Duration".
 * 4. **The tag's ink is the corrected slot**, not the fill token: `text-warn`
 *    is `var(--xen-warn)`, which has no contrast promise as text and was being
 *    used at `text-xs` — the smallest type on the card in the weakest colour.
 */
export const WorkoutCardV4 = React.forwardRef<HTMLDivElement, WorkoutCardV4Props>(
  function WorkoutCardV4(
    {
      title,
      variant,
      durationMin,
      calories,
      description,
      completed = false,
      startLabel = 'Start',
      onStart,
      statLabels,
      completedLabel = 'Completed',
      appearance = 'classic',
      className,
      ...rest
    },
    ref
  ) {
    const meta = WORKOUT_META[variant];
    const durationLabel = statLabels?.duration ?? 'Duration';
    const caloriesLabel = statLabels?.calories ?? 'Calories';
    const hasStats = durationMin != null || calories != null;

    return (
      <div
        ref={ref}
        role="group"
        aria-label={spokenLine([
          meta.label,
          title,
          durationMin != null ? `${durationLabel} ${durationMin} min` : undefined,
          calories != null ? `${caloriesLabel} ${calories} kcal` : undefined,
          completed ? completedLabel : undefined,
        ])}
        className={cn(
          'flex flex-col gap-md',
          HEALTH_CARD_CLASS,
          appearanceClass(appearance),
          className
        )}
        {...rest}
      >
        <div className="flex items-center gap-sm">
          <span aria-hidden className="text-xl leading-none">
            {meta.glyph}
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-xs">
            {/* Neutral: the discipline is identity, and identity is not status. */}
            <span className="text-xs font-bold uppercase text-muted-text">{meta.label}</span>
            <span className="truncate text-lg font-bold text-on-card">{title}</span>
          </div>
        </div>

        {description ? (
          <p className="line-clamp-2 text-sm text-muted-text">{description}</p>
        ) : null}

        {hasStats ? (
          <div className="flex gap-xl">
            {durationMin != null ? (
              <div className="flex flex-col gap-xs">
                <span className="text-xs text-muted-text">{durationLabel}</span>
                <span className="text-base font-semibold text-on-card">{`${durationMin} min`}</span>
              </div>
            ) : null}
            {calories != null ? (
              <div className="flex flex-col gap-xs">
                <span className="text-xs text-muted-text">{caloriesLabel}</span>
                <span className="text-base font-semibold text-on-card">{`${calories} kcal`}</span>
              </div>
            ) : null}
          </div>
        ) : null}

        {/*
          The action is a sibling of the card's own content, never nested in an
          activation: the card itself is not pressable, so there is nothing here
          for a bubbled keydown to hijack.
        */}
        {completed ? (
          <span className={cn('text-sm font-bold', TONE_INK.success)}>
            <span aria-hidden>✓ </span>
            {completedLabel}
          </span>
        ) : onStart ? (
          <ButtonV4 variant="primary" onClick={onStart}>
            {startLabel}
          </ButtonV4>
        ) : null}
      </div>
    );
  }
);
