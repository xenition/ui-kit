import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { TournamentBracketProps } from './TournamentBracket';
import { TABULAR_CLASS, spokenLine } from './internal/arcade-v4';

export interface TournamentBracketV4Props extends TournamentBracketProps {
  /** How the advancing side is said. Default `'Ada advanced'`. */
  advancedLabel?: (name: string) => string;
}

const CARD_STATE = stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties;

function Side({
  name,
  score,
  isWinner,
}: {
  name?: string;
  score?: number;
  isWinner: boolean;
}): React.ReactElement {
  return (
    <span className="flex items-center justify-between gap-sm">
      <span
        className={cn(
          'min-w-0 flex-1 truncate text-sm',
          name ? 'text-on-card' : 'text-muted-text',
          isWinner ? 'font-bold' : 'font-normal'
        )}
      >
        {name ?? 'TBD'}
      </span>
      <span
        className={cn(
          'text-sm',
          TABULAR_CLASS,
          isWinner ? 'font-bold text-on-card' : 'font-normal text-muted-text'
        )}
      >
        {score == null ? '–' : String(score)}
      </span>
    </span>
  );
}

/**
 * **V4 tournament bracket** — same props as {@link TournamentBracket} plus
 * `advancedLabel`.
 *
 * ## Four changes
 *
 * 1. **A reader can learn a score.** The match's name was
 *    `"Ada versus Kite"` — no scores — and it sat on a `role="button"`, which
 *    makes the whole subtree presentational. So the two sides that render the
 *    scores were removed from the accessibility tree by the same element that
 *    failed to mention them, and a screen-reader user could not learn a single
 *    score anywhere in the bracket. The name is built with `spokenLine()` and
 *    carries both sides and both scores.
 * 2. **Opening a match stops claiming to be a toggle.** It announced
 *    `aria-pressed={decided}` — pressed because the match had a *winner*,
 *    which the user cannot change and which has nothing to do with whether
 *    they have pressed anything. It opens a detail view; it is an action.
 * 3. **Who advanced is on the screen.** It lived in a `title` attribute:
 *    invisible on touch, invisible to the keyboard, announced by some readers
 *    and not others, and untranslatable by the app. `advancedLabel` puts it in
 *    the card as text and in the match's name.
 * 4. **The rounds are lists, press is a state layer and scores are tabular.**
 *    Each round was a stack of anonymous `div`s; `hover:opacity-85` dimmed the
 *    match's own content, which is M3's *disabled* signal; and proportional
 *    digits made the score column shift as a live bracket updated.
 */
export const TournamentBracketV4 = React.forwardRef<HTMLDivElement, TournamentBracketV4Props>(
  function TournamentBracketV4(
    {
      rounds,
      emptyLabel = 'No matches scheduled',
      onMatchClick,
      advancedLabel = (name: string) => `${name} advanced`,
      className,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const list = rounds ?? [];
    const totalMatches = list.reduce((n, round) => n + (round.matches?.length ?? 0), 0);
    if (totalMatches === 0) {
      return <EmptyStateV4 ref={ref} title={emptyLabel} className={className} />;
    }

    return (
      <div ref={ref} className={cn('flex gap-lg overflow-x-auto p-xs', className)}>
        {list.map((round, ri) => (
          <div
            key={`${round.name}-${ri}`}
            className="flex min-w-[calc(var(--xen-space-2xl)_*_4)] flex-col gap-sm"
          >
            <h4 className="font-heading text-xs font-bold uppercase text-muted-text">
              {round.name}
            </h4>
            <ul aria-label={round.name} className="flex flex-col gap-sm">
              {(round.matches ?? []).map((match, mi) => {
                const winnerName =
                  match.winner === 'home'
                    ? match.home
                    : match.winner === 'away'
                      ? match.away
                      : undefined;
                const advanced = winnerName ? advancedLabel(winnerName) : undefined;

                const body = (
                  <>
                    <Side
                      name={match.home}
                      score={match.homeScore}
                      isWinner={match.winner === 'home'}
                    />
                    <span aria-hidden="true" className="block h-px bg-border" />
                    <Side
                      name={match.away}
                      score={match.awayScore}
                      isWinner={match.winner === 'away'}
                    />
                    {/* Was a `title` attribute — see change 3. */}
                    {advanced ? (
                      <span className="truncate text-xs text-muted-text">{advanced}</span>
                    ) : null}
                  </>
                );

                const cardClass = cn(
                  'flex flex-col gap-xs rounded-[var(--xen-radius-md)] border border-border',
                  'bg-card p-sm text-on-card'
                );

                if (!onMatchClick) {
                  return (
                    <li key={match.id} className={cardClass}>
                      {body}
                    </li>
                  );
                }
                return (
                  <li key={match.id}>
                    <button
                      type="button"
                      // No `aria-pressed`: opening a match is an action.
                      aria-label={spokenLine([
                        match.home ?? 'TBD',
                        match.homeScore != null ? String(match.homeScore) : undefined,
                        match.away ?? 'TBD',
                        match.awayScore != null ? String(match.awayScore) : undefined,
                        advanced,
                      ])}
                      onClick={() => onMatchClick(match, ri, mi)}
                      data-xen-v4-state=""
                      style={CARD_STATE}
                      className={cn(
                        cardClass,
                        'w-full text-left',
                        MIN_TAP_CLASS,
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                      )}
                    >
                      {body}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    );
  }
);
