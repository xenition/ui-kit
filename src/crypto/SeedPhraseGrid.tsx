import * as React from 'react';
import { cn } from '../primitives/cn';

export interface SeedPhraseGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The ordered recovery words (typically 12 or 24). */
  words: string[];
  /** Columns in the grid (default `3`). */
  columns?: number;
  /**
   * Controlled reveal state. When provided the component is controlled and
   * `onToggleReveal` drives it; otherwise it manages its own state and starts
   * HIDDEN — a seed phrase is never shown by default.
   */
  revealed?: boolean;
  /** Fires with the next reveal state when the reveal control is pressed. */
  onToggleReveal?: (revealed: boolean) => void;
  /** Reveal-button label when hidden (default `Reveal`). */
  revealLabel?: string;
  /** Reveal-button label when shown (default `Hide`). */
  hideLabel?: string;
  /** Sensitive-warning line shown above the grid. */
  warning?: string;
}

/**
 * A recovery-phrase grid that is **hidden by default** — the words are masked
 * with dots and each tile is `aria-hidden` to screen readers until the holder
 * explicitly reveals them (uncontrolled: internal state starts hidden;
 * controlled: pass `revealed` + `onToggleReveal`). Each tile shows its 1-based
 * index. A `warning` line reinforces the sensitivity. Token-bound; no literal
 * colors. Indexing into `words` is guarded. Web parity of the native
 * `SeedPhraseGrid`.
 */
export const SeedPhraseGrid = React.forwardRef<HTMLDivElement, SeedPhraseGridProps>(
  function SeedPhraseGrid(
    {
      words,
      columns = 3,
      revealed,
      onToggleReveal,
      revealLabel = 'Reveal',
      hideLabel = 'Hide',
      warning = 'Never share your recovery phrase.',
      className,
      ...rest
    },
    ref
  ) {
    const isControlled = revealed !== undefined;
    const [internal, setInternal] = React.useState(false);
    const isRevealed = isControlled ? Boolean(revealed) : internal;
    const cols = Math.max(1, Math.trunc(columns));
    const safeWords = Array.isArray(words) ? words : [];

    const toggle = (): void => {
      const next = !isRevealed;
      if (!isControlled) setInternal(next);
      onToggleReveal?.(next);
    };

    return (
      <div ref={ref} className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)} {...rest}>
        {warning != null ? (
          <p className="text-xs font-semibold text-warn">{warning}</p>
        ) : null}

        <div className="grid gap-[var(--xen-space-xs)]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {safeWords.map((word, index) => {
            const shown = isRevealed ? word ?? '' : '••••••';
            return (
              <div
                key={index}
                aria-hidden={!isRevealed || undefined}
                aria-label={isRevealed ? `Word ${index + 1}, ${word ?? ''}` : undefined}
                className="flex items-center gap-1 rounded-[var(--xen-radius-sm)] border border-border bg-neutral-100 px-2 py-1"
              >
                <span className="text-xs tabular-nums text-muted">{index + 1}</span>
                <span className="truncate text-sm font-semibold text-on-surface">{shown}</span>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          aria-expanded={isRevealed}
          onClick={toggle}
          className={cn(
            'inline-flex items-center gap-1 self-start rounded-[var(--xen-radius-md)] border border-border px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-semibold text-on-surface',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
          )}
        >
          <span aria-hidden="true">{isRevealed ? '🙈' : '👁'}</span>
          {isRevealed ? hideLabel : revealLabel}
        </button>
      </div>
    );
  }
);
