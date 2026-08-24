import * as React from 'react';
import { cn } from '../primitives/cn';
import { BORDER_CLASS, TEXT_CLASS, type HealthColor } from './internal';

export type Mood = 'awful' | 'bad' | 'okay' | 'good' | 'great';

interface MoodMeta {
  glyph: string;
  label: string;
  color: HealthColor | 'muted';
}

const MOOD_META: Record<Mood, MoodMeta> = {
  awful: { glyph: '😣', label: 'Awful', color: 'danger' },
  bad: { glyph: '🙁', label: 'Bad', color: 'warn' },
  okay: { glyph: '😐', label: 'Okay', color: 'muted' },
  good: { glyph: '🙂', label: 'Good', color: 'primary' },
  great: { glyph: '😄', label: 'Great', color: 'success' },
};

const MOOD_ORDER: Mood[] = ['awful', 'bad', 'okay', 'good', 'great'];

export interface MoodPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Currently selected mood, if any. */
  value?: Mood;
  /** Restrict / reorder the moods shown; defaults to all five. */
  options?: Mood[];
  /** Show the text label under each face. */
  showLabels?: boolean;
  /** Fires with the tapped mood. */
  onChange?: (mood: Mood) => void;
}

/**
 * A mood check-in: a row of emoji faces from awful to great. The selected face
 * gets a tinted ring in its mood color; the rest read muted. Each face is an
 * accessible radio labelled with its mood. `onChange` fires with the tapped
 * mood. Web parity of the native `MoodPicker`; token-only colors.
 */
export const MoodPicker = React.forwardRef<HTMLDivElement, MoodPickerProps>(function MoodPicker(
  { value, options = MOOD_ORDER, showLabels = true, onChange, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      role="radiogroup"
      className={cn('flex justify-between gap-[var(--xen-space-xs)]', className)}
      {...rest}
    >
      {options.map((mood) => {
        const meta = MOOD_META[mood];
        const selected = value === mood;
        const ringClass =
          selected && meta.color !== 'muted' ? BORDER_CLASS[meta.color] : 'border-border';
        const labelClass = selected ? TEXT_CLASS[meta.color] : 'text-muted';

        const face = (
          <span className="flex flex-col items-center gap-[var(--xen-space-xs)]">
            <span
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full border-2 bg-surface text-xl',
                ringClass,
                selected || value == null ? 'opacity-100' : 'opacity-50'
              )}
            >
              <span aria-hidden="true">{meta.glyph}</span>
            </span>
            {showLabels ? (
              <span className={cn('text-xs', selected ? 'font-bold' : 'font-normal', labelClass)}>
                {meta.label}
              </span>
            ) : null}
          </span>
        );

        if (!onChange) {
          return (
            <span key={mood} aria-label={meta.label}>
              {face}
            </span>
          );
        }
        return (
          <button
            key={mood}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={meta.label}
            onClick={() => onChange(mood)}
            className="transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            {face}
          </button>
        );
      })}
    </div>
  );
});
