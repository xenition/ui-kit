import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { CARD_SHELL, SLOT_BORDER_L, SLOT_TEXT, SLOT_TINT, type WellnessSlot } from './_tokens';

export type JournalCategory = 'reflection' | 'gratitude' | 'intention' | 'growth' | 'emotion';

interface JournalMeta {
  glyph: string;
  label: string;
  color: WellnessSlot;
}

const JOURNAL_META: Record<JournalCategory, JournalMeta> = {
  reflection: { glyph: '🪞', label: 'Reflection', color: 'primary' },
  gratitude: { glyph: '🙏', label: 'Gratitude', color: 'success' },
  intention: { glyph: '🎯', label: 'Intention', color: 'accent' },
  growth: { glyph: '🌱', label: 'Growth', color: 'success' },
  emotion: { glyph: '💭', label: 'Emotion', color: 'primary' },
};

export interface JournalPromptProps {
  /** The reflective prompt / question. */
  prompt: string;
  /** Category — drives the icon, tag, and accent tone. Default `'reflection'`. */
  category?: JournalCategory;
  /** The user's saved response, if any (rendered as a preview). */
  response?: string;
  /** Whether the prompt has been answered (shows a done affordance). */
  answered?: boolean;
  /** Fires when the write / continue action is tapped. */
  onWrite?: () => void;
  /** Fires when the shuffle control is tapped (omit to hide it). */
  onShuffle?: () => void;
  /** Write button label. Defaults to "Write" (or "Continue" when answered). */
  writeLabel?: string;
  className?: string;
}

/**
 * A journaling prompt card (web parity of the native block): a category-tinted
 * header, the prompt itself, an optional saved-response preview, and a write /
 * continue action with an optional shuffle control for a fresh prompt.
 * `answered` adds a "✓ Done" marker and flips the CTA to continue (state via
 * marker + label, not color alone). Token-only colors.
 */
export const JournalPrompt = React.forwardRef<HTMLDivElement, JournalPromptProps>(function JournalPrompt(
  { prompt, category = 'reflection', response, answered = false, onWrite, onShuffle, writeLabel, className },
  ref
) {
  const meta = JOURNAL_META[category] ?? JOURNAL_META.reflection;
  const cta = writeLabel ?? (answered ? 'Continue' : 'Write');

  return (
    <div
      ref={ref}
      data-xen-journal-prompt=""
      aria-label={`${meta.label} prompt${answered ? ', answered' : ''}: ${prompt}`}
      className={cn(CARD_SHELL, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className)}
    >
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <span
          aria-hidden="true"
          className={cn('flex h-9 w-9 items-center justify-center rounded-full text-base', SLOT_TINT[meta.color])}
        >
          {meta.glyph}
        </span>
        <span className={cn('flex-1 text-xs font-bold uppercase tracking-wide', SLOT_TEXT[meta.color])}>
          {meta.label}
        </span>
        {answered ? <span className="text-xs font-bold text-success">✓ Done</span> : null}
      </div>

      <p className="text-lg font-semibold text-on-surface">{prompt}</p>

      {response ? (
        <div className={cn('border-l-[3px] pl-[var(--xen-space-sm)]', SLOT_BORDER_L[meta.color])}>
          <p className="line-clamp-3 text-sm italic text-muted">{response}</p>
        </div>
      ) : null}

      <div className="flex gap-[var(--xen-space-sm)]">
        {onWrite ? (
          <div className="flex-1">
            <Button variant="primary" className="w-full" onClick={onWrite}>
              {cta}
            </Button>
          </div>
        ) : null}
        {onShuffle ? (
          <Button variant="outline" onClick={onShuffle} aria-label="Shuffle prompt">
            🔀
          </Button>
        ) : null}
      </div>
    </div>
  );
});
