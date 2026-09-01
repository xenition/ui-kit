import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { spokenLine, TABULAR_CLASS } from './internal/market-v4';
import type { SeedPhraseGridProps } from './SeedPhraseGrid';

export interface SeedPhraseGridV4Props extends SeedPhraseGridProps {
  /**
   * Build one word's spoken form. `index` is **zero-based**, as it is in
   * `words`; the default adds one so a reader hears the position a user
   * counts. Default `` (i, word) => `Word ${i + 1}, ${word}` ``.
   */
  wordLabel?: (index: number, word: string) => string;
  /**
   * A second caution, shown only while the phrase is on screen.
   *
   * `warning` is about the phrase; this is about the *room*, and it is only
   * true once the words are visible. Default
   * `'Make sure nobody can see your screen.'`.
   */
  revealWarning?: string;
}

/** The mask a hidden tile wears. */
const MASK = '••••••';

/**
 * **V4 seed-phrase grid** — the web twin of the native `SeedPhraseGridV4`, same
 * props as {@link SeedPhraseGrid} plus `wordLabel` and `revealWarning`.
 *
 * ## Four changes
 *
 * 1. **Revealing no longer makes a reader recite the recovery phrase.** Each
 *    tile was its own accessibility element with its own
 *    `aria-label="Word 3, harvest"`, so revealing turned twelve words into
 *    twelve stops read aloud in order — observed, not theorised, and the worst
 *    possible failure mode for this particular component. The tiles are
 *    decorative now and the grid is one group carrying one name, so nothing is
 *    spoken until the holder deliberately navigates into it.
 * 2. **A second warning while the words are visible.** See `revealWarning`.
 * 3. **The reveal control clears 44 and drops `aria-expanded`**, which pointed
 *    at nothing — the grid is always in the DOM, so the attribute described a
 *    disclosure that does not exist. The button's own label already flips
 *    between Reveal and Hide.
 * 4. **A press is a state layer, and the tile ground is a token.** The tiles
 *    were `bg-neutral-100` — a light-oriented ramp step, so a pale grid on a
 *    dark page — and the warning was inked with the `warn` fill.
 */
export const SeedPhraseGridV4 = React.forwardRef<HTMLDivElement, SeedPhraseGridV4Props>(
  function SeedPhraseGridV4(
    {
      words,
      columns = 3,
      revealed,
      onToggleReveal,
      revealLabel = 'Reveal',
      hideLabel = 'Hide',
      warning = 'Never share your recovery phrase.',
      wordLabel,
      revealWarning = 'Make sure nobody can see your screen.',
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const isControlled = revealed !== undefined;
    const [internal, setInternal] = React.useState(false);
    const isRevealed = isControlled ? Boolean(revealed) : internal;
    const cols = Math.max(1, Math.trunc(columns));
    const safeWords = Array.isArray(words) ? words : [];
    const speak = wordLabel ?? ((index: number, word: string): string => `Word ${index + 1}, ${word}`);

    const toggle = (): void => {
      const next = !isRevealed;
      if (!isControlled) setInternal(next);
      onToggleReveal?.(next);
    };

    return (
      <div ref={ref} className={cn('flex flex-col gap-sm', className)} {...rest}>
        {warning != null ? (
          <p className="text-xs font-semibold text-warn-text">{warning}</p>
        ) : null}

        {isRevealed && revealWarning ? (
          <p role="status" aria-live="polite" className="text-xs font-semibold text-warn-text">
            {revealWarning}
          </p>
        ) : null}

        {/*
          One element, one name. Twelve labelled tiles meant a reader read the
          recovery words out in order the moment the grid appeared; grouping
          them means nothing is said until the holder moves into the group on
          purpose.
        */}
        <div
          role="group"
          aria-label={
            isRevealed ? spokenLine(safeWords.map((word, i) => speak(i, word ?? ''))) : undefined
          }
          aria-hidden={isRevealed ? undefined : true}
          className="grid gap-xs"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {safeWords.map((word, index) => (
            <div
              key={index}
              aria-hidden="true"
              className={cn(
                'flex items-center gap-xs rounded-[var(--xen-radius-sm)]',
                'border border-border bg-card px-sm py-xs'
              )}
            >
              <span className={cn('text-xs text-muted-text', TABULAR_CLASS)}>{index + 1}</span>
              <span className="truncate text-sm font-semibold text-on-card">
                {isRevealed ? (word ?? '') : MASK}
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={toggle}
          data-xen-v4-state=""
          style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as React.CSSProperties}
          className={cn(
            'inline-flex items-center gap-xs self-start rounded-[var(--xen-radius-md)]',
            'border border-border px-md text-sm font-semibold text-on-surface',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            MIN_TAP_CLASS
          )}
        >
          <span aria-hidden="true">{isRevealed ? '🙈' : '👁'}</span>
          {isRevealed ? hideLabel : revealLabel}
        </button>
      </div>
    );
  }
);
