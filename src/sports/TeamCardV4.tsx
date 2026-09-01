import * as React from 'react';
import { cn } from '../primitives/cn';
import { LeagueBadge } from './LeagueBadge';
import { tappableProps, FOCUS_RING } from './interactive';
import type { TeamCardProps, TeamForm } from './TeamCard';

/** Drop-in for {@link TeamCardProps} — same props, the V4 "broadcast" design. */
export type TeamCardV4Props = TeamCardProps;

const FORM_META: Record<TeamForm, { text: string; border: string; label: string }> = {
  W: { text: 'text-success', border: 'border-success', label: 'win' },
  D: { text: 'text-muted', border: 'border-border', label: 'draw' },
  L: { text: 'text-danger', border: 'border-danger', label: 'loss' },
};

/**
 * TeamCard — **V4** "broadcast" design (web parity of the native V4). The
 * matchday take on a team summary: an elevated card with the crest, name, and
 * league; the current rank shown as a big bold numeral in a soft-primary tile; the
 * W/D/L record and a recent-form strip whose results read by letter + a11y label,
 * never color alone. `selected` promotes to an accent border and stays a pressed
 * affordance. Same props/behavior as {@link TeamCardProps}; all colors from
 * `--xen-*` token classes (no literals). `loading` swaps in a token skeleton.
 */
export const TeamCardV4 = React.forwardRef<HTMLDivElement, TeamCardV4Props>(
  function TeamCardV4(
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
      'flex flex-col gap-2 rounded-[var(--xen-radius-lg)] bg-surface p-4 text-on-surface shadow-sm',
      selected ? 'border-2 border-primary' : 'border border-border',
      className
    );

    if (loading) {
      return (
        <div ref={ref} aria-busy="true" aria-label="Loading team" className={shell} {...rest}>
          <div className="h-5 rounded-sm bg-on-surface/10" />
          <div className="h-4 w-3/5 rounded-sm bg-on-surface/10" />
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
            <p className="truncate text-base font-extrabold text-on-surface">{name}</p>
            {league ? <p className="truncate text-xs text-muted">{league}</p> : null}
          </div>
          {rank !== undefined ? (
            <div className="flex flex-col items-center rounded-md bg-primary/10 px-2 py-1">
              <span className="text-[10px] font-bold uppercase tracking-wide text-muted">Rank</span>
              <span className="text-2xl font-extrabold leading-none text-primary tabular-nums">#{rank}</span>
            </div>
          ) : null}
        </div>

        {!tile && hasRecord ? (
          <p className="text-sm font-bold text-on-surface tabular-nums">{recordLabel}</p>
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
                    'inline-flex h-5 w-5 items-center justify-center rounded-full border bg-on-surface/5 text-xs font-bold',
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
