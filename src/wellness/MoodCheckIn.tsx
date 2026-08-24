import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button, Textarea } from '../primitives';
import { CARD_SHELL, SLOT_BORDER, SLOT_TEXT, SLOT_TINT, type WellnessSlot } from './_tokens';

export type Mood = 'awful' | 'bad' | 'okay' | 'good' | 'great';

interface MoodMeta {
  glyph: string;
  label: string;
  color: WellnessSlot;
}

const MOOD_META: Record<Mood, MoodMeta> = {
  awful: { glyph: '😣', label: 'Awful', color: 'danger' },
  bad: { glyph: '🙁', label: 'Bad', color: 'warn' },
  okay: { glyph: '😐', label: 'Okay', color: 'muted' },
  good: { glyph: '🙂', label: 'Good', color: 'primary' },
  great: { glyph: '😄', label: 'Great', color: 'success' },
};

const MOOD_ORDER: Mood[] = ['awful', 'bad', 'okay', 'good', 'great'];

export interface MoodCheckInProps {
  /** Heading prompt. Default "How are you feeling?". */
  prompt?: string;
  /** Currently selected mood. */
  value?: Mood;
  /** Restrict / reorder the moods shown; defaults to all five. */
  options?: Mood[];
  /** Show a free-text note field under the faces. */
  showNote?: boolean;
  /** Controlled note text. */
  note?: string;
  /** Note placeholder. */
  notePlaceholder?: string;
  /** Fires with the tapped mood. */
  onChange?: (mood: Mood) => void;
  /** Fires as the note text changes. */
  onNoteChange?: (text: string) => void;
  /** Fires when the check-in is submitted (mood is required). */
  onSubmit?: (result: { mood: Mood; note?: string }) => void;
  /** Submit button label. Default "Save check-in". */
  submitLabel?: string;
  className?: string;
}

/**
 * A daily mood check-in (web parity of the native block): a prompt, a
 * `radiogroup` of emoji faces from awful to great, an optional note field, and a
 * submit action. The selected face keeps a tinted ring in its mood tone and is
 * announced with `aria-checked` (state, not color alone); submit is disabled
 * until a mood is chosen. `onSubmit` returns the mood plus the note. Token-only
 * colors.
 */
export const MoodCheckIn = React.forwardRef<HTMLDivElement, MoodCheckInProps>(function MoodCheckIn(
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
  },
  ref
) {
  const moods = options && options.length > 0 ? options : MOOD_ORDER;

  return (
    <div
      ref={ref}
      data-xen-mood-check-in=""
      className={cn(CARD_SHELL, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className)}
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
              <span
                aria-hidden="true"
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-full border-2 text-xl transition-opacity',
                  selected
                    ? cn(SLOT_BORDER[meta.color], SLOT_TINT[meta.color])
                    : 'border-border bg-surface',
                  dimmed && 'opacity-50'
                )}
              >
                {meta.glyph}
              </span>
              <span className={cn('text-xs', selected ? cn('font-bold', SLOT_TEXT[meta.color]) : 'text-muted')}>
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
