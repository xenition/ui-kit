import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { EmptyState } from '../commerce/EmptyState';
import type { ScoreEntry } from './types';

export type ScoreBoardVariant = 'ranked' | 'versus';

export interface ScoreBoardProps {
  /** Rows to render. `ranked` sorts by score desc; `versus` keeps order. */
  entries: ScoreEntry[];
  /**
   * - `ranked` — ordered list with position + highlighted leader (default).
   * - `versus` — two-side head-to-head (uses the first two entries).
   */
  variant?: ScoreBoardVariant;
  /** Optional board title / header. */
  title?: string;
  /** Message shown when there are no entries. */
  emptyLabel?: string;
  /** Extra classes on the root. */
  className?: string;
}

function Crest({ entry, size }: { entry: ScoreEntry; size: 'sm' | 'lg' }): React.ReactElement {
  if (entry.avatarUrl) {
    return (
      <img
        src={entry.avatarUrl}
        alt=""
        loading="lazy"
        className={cn(
          'rounded-[var(--xen-radius-sm)] bg-neutral-200 object-cover',
          size === 'lg' ? 'h-12 w-12' : 'h-7 w-7'
        )}
      />
    );
  }
  return <Avatar name={entry.name} size={size} />;
}

function VersusSide({
  entry,
  score,
  winner,
  align,
}: {
  entry?: ScoreEntry;
  score?: number;
  winner: boolean;
  align: 'left' | 'right';
}): React.ReactElement {
  return (
    <div
      className="flex flex-1 flex-col items-center gap-[var(--xen-space-xs)]"
      aria-label={`${entry?.name ?? 'TBD'}, ${score ?? 0}${winner ? ', leading' : ''}`}
    >
      {entry ? <Crest entry={entry} size="lg" /> : <Avatar name="?" size="lg" />}
      <span
        className={cn(
          'w-full truncate text-sm',
          winner ? 'font-bold' : 'font-medium',
          'text-on-surface',
          align === 'left' ? 'text-left' : 'text-right'
        )}
      >
        {entry?.name ?? 'TBD'}
      </span>
      <span className={cn('text-2xl font-bold', winner ? 'text-primary' : 'text-muted')}>{score ?? 0}</span>
    </div>
  );
}

/**
 * A scoreboard — a `ranked` ordered standings list (leader highlighted in weight
 * + position, not color alone) or a `versus` head-to-head between the first two
 * entries. Renders an `EmptyState` when there are no entries. Uses guarded
 * indexing for the versus sides. Composes `Card`, `Avatar`, `EmptyState`.
 * Token-only.
 */
export function ScoreBoard({
  entries,
  variant = 'ranked',
  title,
  emptyLabel = 'No scores yet',
  className,
}: ScoreBoardProps): React.ReactElement {
  if (entries.length === 0) {
    return (
      <EmptyState
        icon={<Icon glyph="🏁" size="2xl" color="muted" aria-label="Scores" />}
        title={emptyLabel}
        className={className}
      />
    );
  }

  const header = title ? <h3 className="text-base font-bold text-on-surface">{title}</h3> : null;

  if (variant === 'versus') {
    const home = entries[0];
    const away = entries[1];
    const homeWins = home != null && away != null && home.score > away.score;
    const awayWins = home != null && away != null && away.score > home.score;
    return (
      <Card className={cn('flex flex-col gap-[var(--xen-space-md)]', className)}>
        {header}
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <VersusSide entry={home} score={home?.score} winner={homeWins} align="left" />
          <span className="text-sm font-bold text-muted">VS</span>
          <VersusSide entry={away} score={away?.score} winner={awayWins} align="right" />
        </div>
      </Card>
    );
  }

  const ranked = [...entries].sort((a, b) => b.score - a.score);
  return (
    <Card className={cn('flex flex-col gap-[var(--xen-space-xs)]', className)}>
      {header}
      {ranked.map((e, i) => {
        const leader = i === 0;
        return (
          <div
            key={e.id}
            className="flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-xs)]"
            aria-label={`Rank ${i + 1}, ${e.name}, ${e.score} points`}
          >
            <span className={cn('w-[22px] text-sm font-bold', leader ? 'text-primary' : 'text-muted')}>
              {i + 1}
            </span>
            <Crest entry={e} size="sm" />
            <div className="min-w-0 flex-1">
              <p className={cn('truncate text-sm text-on-surface', leader ? 'font-bold' : 'font-medium')}>
                {e.name}
              </p>
              {e.detail ? <p className="truncate text-xs text-muted">{e.detail}</p> : null}
            </div>
            <span className="text-base font-bold text-on-surface">{e.score}</span>
          </div>
        );
      })}
    </Card>
  );
}
