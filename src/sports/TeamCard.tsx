import * as React from 'react';
import { cn } from '../primitives/cn';
import { LeagueBadge } from './LeagueBadge';
import { tappableProps, FOCUS_RING } from './interactive';

/** Recent result token for the mini form strip. */
export type TeamForm = 'W' | 'D' | 'L';

export interface TeamCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Team display name. */
  name: string;
  /** Crest glyph or emoji. */
  crest?: string;
  /** Competition / division caption. */
  league?: string;
  /** Wins. */
  won?: number;
  /** Draws. */
  drawn?: number;
  /** Losses. */
  lost?: number;
  /** Current table position (1-based). */
  rank?: number;
  /** Recent form oldest→newest (max 5 shown). */
  form?: TeamForm[];
  /** Layout: `full` card, or a slim `tile`. Default `full`. */
  variant?: 'full' | 'tile';
  /** Marks the card as selected (accent border). */
  selected?: boolean;
  /** Loading skeleton. */
  loading?: boolean;
  /** Fires on activation (web parity of native `onPress`). */
  onClick?: () => void;
}

const FORM_META: Record<TeamForm, { text: string; border: string; label: string }> = {
  W: { text: 'text-success', border: 'border-success', label: 'win' },
  D: { text: 'text-muted', border: 'border-border', label: 'draw' },
  L: { text: 'text-danger', border: 'border-danger', label: 'loss' },
};

/**
 * A team summary card — crest, name, league, W/D/L record, rank, and a recent
 * form strip whose results read by letter + a11y label, not color alone.
 * Presentational: shaped props plus an optional `onClick`. `tile` is a slim
 * pickable variant. Reuses `LeagueBadge` for the crest. Token-only colors.
 */
export const TeamCard = React.forwardRef<HTMLDivElement, TeamCardProps>(
  function TeamCard(
    {
      name,
      crest,
      league,
      won,
      drawn,
      lost,
      rank,
      form = [],
      variant = 'full',
      selected = false,
      loading = false,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const tile = variant === 'tile';
    const shell = cn(
      'flex flex-col gap-2 rounded-lg bg-surface p-4 text-on-surface',
      selected ? 'border-2 border-primary' : 'border border-border',
      className
    );

    if (loading) {
      return (
        <div ref={ref} aria-busy="true" aria-label="Loading team" className={shell} {...rest}>
          <div className="h-5 rounded-sm bg-neutral-200" />
          <div className="h-4 w-3/5 rounded-sm bg-neutral-100" />
        </div>
      );
    }

    const hasRecord = won !== undefined || drawn !== undefined || lost !== undefined;
    const recordLabel = `${won ?? 0}W · ${drawn ?? 0}D · ${lost ?? 0}L`;
    const a11y = `${name}${rank !== undefined ? `, rank ${rank}` : ''}${
      hasRecord ? `, ${recordLabel}` : ''
    }`;
    const interactive = tappableProps(onClick, a11y);

    return (
      <div
        ref={ref}
        className={onClick ? cn(shell, FOCUS_RING) : shell}
        {...(onClick ? { 'aria-pressed': selected } : { 'aria-label': a11y })}
        {...interactive}
        {...rest}
      >
        <div className="flex items-center gap-2">
          <LeagueBadge name={name} crest={crest} label="" size={tile ? 'sm' : 'lg'} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold text-on-surface">{name}</p>
            {league ? <p className="truncate text-xs text-muted">{league}</p> : null}
          </div>
          {rank !== undefined ? (
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted">Rank</span>
              <span className="text-lg font-bold text-primary">#{rank}</span>
            </div>
          ) : null}
        </div>

        {!tile && hasRecord ? (
          <p className="text-sm font-semibold text-on-surface">{recordLabel}</p>
        ) : null}

        {!tile && form.length > 0 ? (
          <div className="flex gap-1">
            {form.slice(-5).map((f, i) => {
              const fm = FORM_META[f] ?? FORM_META.D;
              return (
                <span
                  key={i}
                  aria-label={fm.label}
                  className={cn(
                    'inline-flex h-5 w-5 items-center justify-center rounded-full border bg-neutral-100 text-xs font-bold',
                    fm.border,
                    fm.text
                  )}
                >
                  {f}
                </span>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
);
