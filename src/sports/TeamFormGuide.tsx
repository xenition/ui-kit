import * as React from 'react';
import { cn } from '../primitives/cn';
import { tappableProps, FOCUS_RING } from './interactive';

/** One recent result — a Win, Draw or Loss. */
export type TeamFormResult = 'W' | 'D' | 'L';

/** Glyph + accessible word + semantic tint per result (color reinforces the letter, never alone). */
const RESULT_META: Record<TeamFormResult, { word: string; pill: string }> = {
  W: { word: 'Win', pill: 'bg-success/10 text-success' },
  D: { word: 'Draw', pill: 'bg-warn/10 text-warn' },
  L: { word: 'Loss', pill: 'bg-danger/10 text-danger' },
};

export interface TeamFormGuideProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'results'> {
  /**
   * Recent results as a row of `'W' | 'D' | 'L'` letters. Ordered
   * **most-recent-first** (index `0` is the latest match). Rendered left→right
   * in that order.
   */
  results: readonly TeamFormResult[];
  /** Optional leading caption for the row (e.g. `"Last 5"`). Omit for pills only. */
  label?: string;
  /**
   * Optional press handler for a single result pill; receives the pill's index
   * in {@link results}. When supplied each pill becomes a keyboard-focusable
   * button; when omitted the row is purely presentational.
   */
  onResultPress?: (index: number) => void;
}

/**
 * TeamFormGuide — **V4** "broadcast" design. A compact form line: an optional
 * caption followed by a row of small circular soft-tint pills, one per recent
 * result, ordered most-recent-first. Each pill shows its letter (W / D / L) and
 * carries a semantic tint — win→success, draw→warn, loss→danger — so the result
 * reads from letter + color together, never color alone. When `onResultPress`
 * is given each pill is an accessible ≥44px button. All colors from `--xen-*`
 * token classes (no literals); dark-mode safe.
 */
export const TeamFormGuide = React.forwardRef<HTMLDivElement, TeamFormGuideProps>(
  function TeamFormGuide({ results, label, onResultPress, className, ...rest }, ref) {
    const shell = cn(
      'flex items-center gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-3 text-on-surface shadow-sm',
      className
    );

    const summary = results.map((r) => RESULT_META[r]?.word ?? r).join(', ');
    const a11yRow = label ? `${label}: ${summary}` : `Recent form: ${summary}`;

    return (
      <div ref={ref} className={shell} {...rest}>
        {label ? (
          <span className="flex-none text-xs font-bold uppercase tracking-wide text-muted">
            {label}
          </span>
        ) : null}
        <div role="list" aria-label={a11yRow} className="flex flex-1 flex-wrap items-center gap-1.5">
          {results.map((r, i) => {
            const meta = RESULT_META[r] ?? RESULT_META.D;
            const pill = (
              <span
                className={cn(
                  'inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-extrabold',
                  meta.pill
                )}
              >
                {r}
              </span>
            );

            if (onResultPress) {
              return (
                <div
                  key={i}
                  role="listitem"
                  className={cn(
                    'inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full',
                    FOCUS_RING
                  )}
                  {...tappableProps(() => onResultPress(i), `${meta.word}`)}
                >
                  {pill}
                </div>
              );
            }

            return (
              <div
                key={i}
                role="listitem"
                aria-label={meta.word}
                className="inline-flex items-center justify-center"
              >
                {pill}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
