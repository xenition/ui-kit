import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { Icon } from '../primitives/Icon';
import { type JournalPromptProps } from './JournalPrompt';

export type JournalPromptV4Props = JournalPromptProps;

type JournalCategory = NonNullable<JournalPromptProps['category']>;

interface JournalMeta {
  glyph: string;
  label: string;
}

const JOURNAL_META: Record<JournalCategory, JournalMeta> = {
  reflection: { glyph: '🪞', label: 'Reflection' },
  gratitude: { glyph: '🙏', label: 'Gratitude' },
  intention: { glyph: '🎯', label: 'Intention' },
  growth: { glyph: '🌱', label: 'Growth' },
  emotion: { glyph: '💭', label: 'Emotion' },
};

/**
 * JournalPromptV4 — the calm redesign of {@link JournalPrompt}. Same props,
 * defaults, labels, answered affordance, and write/shuffle controls. Only the
 * visuals change: a clean surface card with a small gradient category badge as
 * the single calm accent; the prompt, response preview, and controls stay calm.
 */
export const JournalPromptV4 = React.forwardRef<HTMLDivElement, JournalPromptV4Props>(function JournalPromptV4(
  { prompt, category = 'reflection', response, answered = false, onWrite, onShuffle, writeLabel, className, ...rest },
  ref
) {
  const meta = JOURNAL_META[category] ?? JOURNAL_META.reflection;
  const cta = writeLabel ?? (answered ? 'Continue' : 'Write');

  return (
    <div
      ref={ref}
      data-xen-journal-prompt=""
      aria-label={`${meta.label} prompt${answered ? ', answered' : ''}: ${prompt}`}
      className={cn(
        'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-5',
        'flex flex-col gap-[var(--xen-space-md)]',
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700"
        >
          <Icon glyph={meta.glyph} size="base" color="onPrimary" />
        </span>
        <span className="flex-1 text-xs font-bold uppercase tracking-wide text-primary">{meta.label}</span>
        {answered ? <span className="text-xs font-bold text-success">✓ Done</span> : null}
      </div>

      <p className="text-lg font-semibold text-on-surface">{prompt}</p>

      {response ? (
        <div className="border-l-[3px] border-l-primary pl-[var(--xen-space-sm)]">
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
