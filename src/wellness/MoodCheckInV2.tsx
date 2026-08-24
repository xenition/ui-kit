import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button, Textarea } from '../primitives';
import { SLOT_TINT, SLOT_TEXT, type WellnessSlot } from './_tokens';
import type { MoodCheckInProps, Mood } from './MoodCheckIn';

/** Same public contract as {@link MoodCheckIn} — a drop-in alternate design. */
export type MoodCheckInV2Props = MoodCheckInProps;

const META: Record<Mood, { glyph: string; label: string; color: WellnessSlot }> = {
  awful: { glyph: '😣', label: 'Awful', color: 'danger' },
  bad: { glyph: '🙁', label: 'Bad', color: 'warn' },
  okay: { glyph: '😐', label: 'Okay', color: 'muted' },
  good: { glyph: '🙂', label: 'Good', color: 'primary' },
  great: { glyph: '😄', label: 'Great', color: 'success' },
};
const ORDER: Mood[] = ['awful', 'bad', 'okay', 'good', 'great'];

/**
 * MoodCheckIn, redesigned (v2): a **big face picker**. The prompt tops a row of
 * large mood tiles (selected fills its slot tint + ring with the label), an
 * optional note field, and a Save button. Bolder than v1. Same props, token-only.
 */
export const MoodCheckInV2 = React.forwardRef<HTMLDivElement, MoodCheckInV2Props>(
  function MoodCheckInV2({ prompt = 'How are you feeling?', value, options, showNote = false, note, notePlaceholder = 'Add a note…', onChange, onNoteChange, onSubmit, submitLabel = 'Save check-in', className }, ref) {
    const moods = options && options.length > 0 ? options : ORDER;
    return (
      <div ref={ref} data-xen-mood-check-in="" className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-md', className)}>
        <p className="text-base font-bold text-on-surface">{prompt}</p>
        <div className="flex justify-between gap-1.5" role="radiogroup" aria-label={prompt}>
          {moods.map((mood) => {
            const m = META[mood] ?? META.okay;
            const selected = value === mood;
            return (
              <button
                key={mood}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={m.label}
                onClick={() => onChange?.(mood)}
                className={cn('flex flex-1 flex-col items-center gap-1 rounded-lg py-2 transition-colors', selected ? cn(SLOT_TINT[m.color], 'ring-2 ring-primary') : 'hover:bg-neutral-50')}
              >
                <span className="text-2xl" aria-hidden>{m.glyph}</span>
                <span className={cn('text-[10px]', selected ? SLOT_TEXT[m.color] : 'text-muted')}>{m.label}</span>
              </button>
            );
          })}
        </div>
        {showNote ? (
          <Textarea value={note} placeholder={notePlaceholder} aria-label="Note" onChange={(e) => onNoteChange?.(e.target.value)} />
        ) : null}
        {onSubmit ? (
          <Button size="md" variant="primary" className="w-full" disabled={!value} onClick={() => value && onSubmit({ mood: value, note })}>{submitLabel}</Button>
        ) : null}
      </div>
    );
  }
);
