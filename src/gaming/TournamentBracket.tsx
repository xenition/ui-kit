import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { EmptyState } from '../commerce/EmptyState';
import type { BracketMatch, BracketRound } from './types';

export interface TournamentBracketProps {
  /** Rounds left→right (e.g. Quarterfinals → Final). */
  rounds: BracketRound[];
  /** Message shown when there are no rounds/matches. */
  emptyLabel?: string;
  /** Called when a match is clicked — open its detail. */
  onMatchClick?: (match: BracketMatch, roundIndex: number, matchIndex: number) => void;
  /** Extra classes on the root. */
  className?: string;
}

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
    <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
      <span
        className={cn(
          'min-w-0 flex-1 truncate text-sm',
          name ? 'text-on-surface' : 'text-muted',
          isWinner ? 'font-bold' : 'font-normal'
        )}
      >
        {name ?? 'TBD'}
      </span>
      <span className={cn('text-sm', isWinner ? 'font-bold text-primary' : 'font-normal text-muted')}>
        {score == null ? '–' : String(score)}
      </span>
    </div>
  );
}

/**
 * A single-elimination bracket — rounds render as horizontally scrollable
 * columns of match cards, each showing two sides, scores, and the advancing team
 * (marked in weight + color + an "advanced" hint, never color alone).
 * `onMatchClick` fires with the match and its guarded `[round, match]` indices;
 * an interactive match is a real `<button>`. Renders an `EmptyState` when there
 * are no matches. Composes `Card`, `EmptyState`. Token-only.
 */
export function TournamentBracket({
  rounds,
  emptyLabel = 'No matches scheduled',
  onMatchClick,
  className,
}: TournamentBracketProps): React.ReactElement {
  const totalMatches = rounds.reduce((n, r) => n + (r.matches?.length ?? 0), 0);
  if (rounds.length === 0 || totalMatches === 0) {
    return (
      <EmptyState
        icon={<Icon glyph="🏆" size="2xl" color="muted" aria-label="Bracket" />}
        title={emptyLabel}
        className={className}
      />
    );
  }

  return (
    <div className={cn('flex gap-[var(--xen-space-lg)] overflow-x-auto p-[var(--xen-space-xs)]', className)}>
      {rounds.map((round, ri) => (
        <div key={`${round.name}-${ri}`} className="flex min-w-[176px] flex-col gap-[var(--xen-space-sm)]">
          <h4 className="text-xs font-bold uppercase text-muted">{round.name}</h4>
          {(round.matches ?? []).map((match, mi) => {
            const decided = match.winner != null;
            const winnerName =
              match.winner === 'home' ? match.home : match.winner === 'away' ? match.away : undefined;
            const body = (
              <Card className="flex flex-col gap-[var(--xen-space-xs)] p-[var(--xen-space-sm)]">
                <Side name={match.home} score={match.homeScore} isWinner={match.winner === 'home'} />
                <div className="h-px bg-border" />
                <Side name={match.away} score={match.awayScore} isWinner={match.winner === 'away'} />
              </Card>
            );
            if (!onMatchClick) return <div key={match.id}>{body}</div>;
            return (
              <button
                key={match.id}
                type="button"
                aria-label={`${match.home ?? 'TBD'} versus ${match.away ?? 'TBD'}`}
                aria-pressed={decided}
                title={winnerName ? `${winnerName} advanced` : undefined}
                onClick={() => onMatchClick(match, ri, mi)}
                className="block w-full text-left transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              >
                {body}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
