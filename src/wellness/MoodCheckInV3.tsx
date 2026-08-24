import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import type { MoodCheckInProps, Mood } from './MoodCheckIn';

/** Same public contract as {@link MoodCheckIn} — a drop-in alternate design. */
export type MoodCheckInV3Props = MoodCheckInProps;

const GLYPH: Record<Mood, string> = { awful: '😣', bad: '🙁', okay: '😐', good: '🙂', great: '😄' };
const LABEL: Record<Mood, string> = { awful: 'Awful', bad: 'Bad', okay: 'Okay', good: 'Good', great: 'Great' };
const ORDER: Mood[] = ['awful', 'bad', 'okay', 'good', 'great'];

/**
 * MoodCheckIn, redesigned (v3): a **compact inline check-in**. The prompt, a tight
 * row of small mood glyphs (selected ringed), and a quiet Save button — sized for
 * a widget or list. The note field is folded away. The opposite of v2's big
 * tiles. Same props, token-only.
 */
export const MoodCheckInV3 = React.forwardRef<HTMLDivElement, MoodCheckInV3Props>(
  function MoodCheckInV3({ prompt = 'How are you feeling?', value, options, showNote, note, notePlaceholder, onChange, onNoteChange, onSubmit, submitLabel = 'Save', className }, ref) {
    void showNote;
    void note;
    void notePlaceholder;
    void onNoteChange;
    const moods = options && options.length > 0 ? options : ORDER;
    return (
      <div ref={ref} data-xen-mood-check-in="" className={cn('flex flex-col gap-2 border-b border-border py-3', className)}>
        <p className="text-sm font-semibold text-on-surface">{prompt}</p>
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-1.5" role="radiogroup" aria-label={prompt}>
            {moods.map((mood) => {
              const selected = value === mood;
              return (
                <button
                  key={mood}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={LABEL[mood]}
                  onClick={() => onChange?.(mood)}
                  className={cn('flex h-9 w-9 items-center justify-center rounded-full text-lg transition-colors', selected ? 'bg-primary/10 ring-2 ring-primary' : 'hover:bg-neutral-100')}
                >
                  <span aria-hidden>{GLYPH[mood]}</span>
                </button>
              );
            })}
          </div>
          {onSubmit ? (
            <Button size="sm" variant="primary" disabled={!value} onClick={() => value && onSubmit({ mood: value, note })}>{submitLabel}</Button>
          ) : null}
        </div>
      </div>
    );
  }
);
