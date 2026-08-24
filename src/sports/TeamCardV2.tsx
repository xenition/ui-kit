import * as React from 'react';
import { cn } from '../primitives/cn';
import { tappableProps } from './interactive';
import type { TeamCardProps, TeamForm } from './TeamCard';

/** Same public contract as {@link TeamCard} — a drop-in alternate design. */
export type TeamCardV2Props = TeamCardProps;

const FORM: Record<TeamForm, string> = { W: 'bg-success text-on-success', D: 'bg-neutral-300 text-on-surface', L: 'bg-danger text-on-danger' };

/**
 * TeamCard, redesigned (v2): a **banner team card**. A primary-tinted header holds
 * the crest, name, league and a rank chip; a W-D-L strip and a form streak of
 * pills sit beneath. Bolder than v1's row. Same props, token-only.
 */
export const TeamCardV2 = React.forwardRef<HTMLDivElement, TeamCardV2Props>(function TeamCardV2(
  { name, crest = '⚽', league, won, drawn, lost, rank, form, variant, selected = false, loading = false, onClick, className, ...rest },
  ref
) {
  void variant;
  if (loading) {
    return <div ref={ref} data-xen-team-card="" aria-label="Loading team" className={cn('h-32 animate-pulse rounded-lg bg-neutral-100', className)} {...rest} />;
  }

  const tap = tappableProps(onClick, name);
  const record = [won, drawn, lost].every((n) => typeof n === 'number') ? `${won}W · ${drawn}D · ${lost}L` : null;

  return (
    <div
      ref={ref}
      data-xen-team-card=""
      className={cn('overflow-hidden rounded-lg bg-surface shadow-sm', selected && 'ring-2 ring-accent', onClick && 'cursor-pointer transition-opacity hover:opacity-90', className)}
      {...tap}
      {...rest}
    >
      <div className="flex items-center gap-3 bg-primary/10 p-md">
        <span className="text-3xl" aria-hidden>{crest}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-bold text-on-surface">{name}</p>
          {league ? <p className="truncate text-xs text-muted">{league}</p> : null}
        </div>
        {typeof rank === 'number' ? <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-on-primary">#{rank}</span> : null}
      </div>
      <div className="flex items-center justify-between p-md">
        {record ? <span className="text-sm font-semibold text-on-surface">{record}</span> : <span />}
        {form && form.length > 0 ? (
          <div className="flex gap-0.5">
            {form.slice(-5).map((f, i) => (
              <span key={i} className={cn('flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold', FORM[f])}>{f}</span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
});
