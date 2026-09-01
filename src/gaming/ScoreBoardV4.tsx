import * as React from 'react';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import type { ScoreBoardProps } from './ScoreBoard';
import type { ScoreEntry } from './types';
import { PLACEHOLDER_CLASS, TABULAR_CLASS, spokenLine } from './internal/arcade-v4';

export interface ScoreBoardV4Props extends ScoreBoardProps {
  /** The unit a score is announced in. Default `'points'`. */
  scoreUnit?: string;
}

function Crest({ entry, size }: { entry?: ScoreEntry; size: 'sm' | 'lg' }): React.ReactElement {
  if (entry?.avatarUrl) {
    return (
      <img
        src={entry.avatarUrl}
        alt=""
        loading="lazy"
        className={cn(
          'rounded-[var(--xen-radius-sm)] object-cover',
          PLACEHOLDER_CLASS,
          size === 'lg' ? 'h-2xl w-2xl' : 'h-lg w-lg'
        )}
      />
    );
  }
  return <AvatarV4 name={entry?.name ?? '?'} size={size} alt="" />;
}

/**
 * **V4 scoreboard** — same props as {@link ScoreBoard} plus `scoreUnit`.
 *
 * ## Four changes
 *
 * 1. **Every row's name lands.** The board built a good one — "Rank 2, Kite,
 *    980 points" — and hung it on a bare `<div>`, twice: once per standings
 *    row and once per versus side. ARIA forbids naming a generic element, so
 *    the browser threw all of them away and a reader got the rank, the name
 *    and the score as three unrelated fragments, in a container with no
 *    structure to hold them together. Meanwhile the native twin sets
 *    `accessible` and does announce it — the same component telling two
 *    platforms two different things.
 * 2. **The standings are a list.** They were flex `div`s: no count, no
 *    position, nothing to say "4 of 8" with, and no way to move by item. An
 *    `<ol>` says the order is the meaning, which for a ranked board it is.
 * 3. **A score is a number with a unit and tabular figures.** `950` alone is
 *    not a fact, and proportional digits mean the score column jiggles left
 *    and right as a live match ticks — the one column a viewer is watching.
 * 4. **The crest placeholder stops inverting.** `bg-neutral-200` is a step on
 *    the web ramp, which mirrors under `[data-theme="dark"]` while the crest
 *    loading over it does not.
 */
export const ScoreBoardV4 = React.forwardRef<HTMLDivElement, ScoreBoardV4Props>(
  function ScoreBoardV4(
    {
      entries,
      variant = 'ranked',
      title,
      emptyLabel = 'No scores yet',
      scoreUnit = 'points',
      className,
    },
    ref
  ) {
    const list = entries ?? [];

    if (list.length === 0) {
      return <EmptyStateV4 ref={ref} title={emptyLabel} className={className} />;
    }

    const cardClass = cn(
      'flex flex-col rounded-[var(--xen-radius-lg)] border border-border bg-card p-lg text-on-card',
      className
    );
    const header = title ? (
      <h3 className="font-heading text-base font-bold text-on-card">{title}</h3>
    ) : null;

    if (variant === 'versus') {
      const home = list[0];
      const away = list[1];
      const leader =
        home != null && away != null
          ? home.score > away.score
            ? 'home'
            : away.score > home.score
              ? 'away'
              : undefined
          : undefined;

      const side = (
        entry: ScoreEntry | undefined,
        which: 'home' | 'away',
        align: 'left' | 'right'
      ): React.ReactElement => {
        const winning = leader === which;
        const score = entry?.score ?? 0;
        return (
          <div
            role="group"
            aria-label={spokenLine([
              entry?.name ?? 'TBD',
              `${score} ${scoreUnit}`,
              winning ? 'Leading' : undefined,
            ])}
            className="flex flex-1 flex-col items-center gap-xs"
          >
            <Crest entry={entry} size="lg" />
            <span
              className={cn(
                'w-full truncate text-sm text-on-card',
                winning ? 'font-bold' : 'font-medium',
                align === 'left' ? 'text-left' : 'text-right'
              )}
            >
              {entry?.name ?? 'TBD'}
            </span>
            <span className={cn('text-2xl font-bold text-on-card', TABULAR_CLASS)}>{score}</span>
          </div>
        );
      };

      return (
        <div ref={ref} className={cn(cardClass, 'gap-md')}>
          {header}
          <div className="flex items-center gap-sm">
            {side(home, 'home', 'left')}
            <span aria-hidden="true" className="text-sm font-bold text-muted-text">
              VS
            </span>
            {side(away, 'away', 'right')}
          </div>
        </div>
      );
    }

    const ranked = [...list].sort((a, b) => b.score - a.score);
    return (
      <div ref={ref} className={cn(cardClass, 'gap-sm')}>
        {header}
        {/* Ordered, because for a ranked board the order *is* the content. */}
        <ol aria-label={title} className="flex flex-col gap-xs">
          {ranked.map((entry, index) => {
            const leader = index === 0;
            return (
              <li
                key={entry.id}
                aria-label={spokenLine([
                  `Rank ${index + 1}`,
                  entry.name,
                  `${entry.score} ${scoreUnit}`,
                  entry.detail,
                ])}
                className="flex items-center gap-sm py-xs"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'w-xl shrink-0 text-sm font-bold text-muted-text',
                    TABULAR_CLASS
                  )}
                >
                  {index + 1}
                </span>
                <Crest entry={entry} size="sm" />
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      'truncate text-sm text-on-card',
                      leader ? 'font-bold' : 'font-medium'
                    )}
                  >
                    {entry.name}
                  </p>
                  {entry.detail ? (
                    <p className="truncate text-xs text-muted-text">{entry.detail}</p>
                  ) : null}
                </div>
                <span className={cn('text-base font-bold text-on-card', TABULAR_CLASS)}>
                  {entry.score}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
);
