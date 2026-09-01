import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button, Textarea } from '../primitives';
import { Icon } from '../primitives/Icon';
import { type MoodCheckInProps } from './MoodCheckIn';

export type MoodCheckInV4Props = MoodCheckInProps;

type Mood = NonNullable<MoodCheckInProps['value']>;

interface MoodMeta {
  glyph: string;
  label: string;
}

const MOOD_META: Record<Mood, MoodMeta> = {
  awful: { glyph: '😣', label: 'Awful' },
  bad: { glyph: '🙁', label: 'Bad' },
  okay: { glyph: '😐', label: 'Okay' },
  good: { glyph: '🙂', label: 'Good' },
  great: { glyph: '😄', label: 'Great' },
};

const MOOD_ORDER: Mood[] = ['awful', 'bad', 'okay', 'good', 'great'];

/**
 * MoodCheckInV4 — the calm redesign of {@link MoodCheckIn}. Same props, defaults,
 * labels, radiogroup a11y, note field, and disabled-until-selected submit. Only
 * the visuals change: a clean surface card where the *selected* face sits on a
 * small gradient circle (the one calm accent), the others staying soft neutral.
 */
export const MoodCheckInV4 = React.forwardRef<HTMLDivElement, MoodCheckInV4Props>(function MoodCheckInV4(
  {
    prompt = 'How are you feeling?',
    value,
    options,
    showNote = false,
    note = '',
    notePlaceholder = 'Add a note (optional)',
    onChange,
    onNoteChange,
    onSubmit,
    submitLabel = 'Save check-in',
    className,
    ...rest
  },
  ref
) {
  const moods = options && options.length > 0 ? options : MOOD_ORDER;

  return (
    <div
      ref={ref}
      data-xen-mood-check-in=""
      className={cn(
        'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-5',
        'flex flex-col gap-[var(--xen-space-md)]',
        className
      )}
      {...rest}
    >
      <p className="text-lg font-bold text-on-surface">{prompt}</p>

      <div role="radiogroup" aria-label={prompt} className="flex justify-between gap-[var(--xen-space-xs)]">
        {moods.map((mood) => {
          const meta = MOOD_META[mood] ?? MOOD_META.okay;
          const selected = value === mood;
          const dimmed = !selected && value != null;
          return (
            <button
              key={mood}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={meta.label}
              onClick={() => onChange?.(mood)}
              className={cn(
                'flex flex-1 flex-col items-center gap-[var(--xen-space-xs)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded-[var(--xen-radius-md)]'
              )}
            >
              {selected ? (
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-xl"
                >
                  <Icon glyph={meta.glyph} size="xl" color="onPrimary" />
                </span>
              ) : (
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-xl',
                    dimmed && 'opacity-50'
                  )}
                >
                  {meta.glyph}
                </span>
              )}
              <span className={cn('text-xs', selected ? 'font-bold text-primary' : 'text-muted')}>
                {meta.label}
              </span>
            </button>
          );
        })}
      </div>

      {showNote ? (
        <Textarea
          rows={3}
          value={note}
          onChange={(e) => onNoteChange?.(e.target.value)}
          placeholder={notePlaceholder}
          aria-label="Mood note"
        />
      ) : null}

      {onSubmit ? (
        <Button
          variant="primary"
          disabled={value == null}
          onClick={() => {
            if (value != null) onSubmit({ mood: value, note: showNote ? note : undefined });
          }}
        >
          {submitLabel}
        </Button>
      ) : null}
    </div>
  );
});
