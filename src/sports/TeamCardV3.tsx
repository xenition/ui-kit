import * as React from 'react';
import { cn } from '../primitives/cn';
import { tappableProps } from './interactive';
import type { TeamCardProps, TeamForm } from './TeamCard';

/** Same public contract as {@link TeamCard} — a drop-in alternate design. */
export type TeamCardV3Props = TeamCardProps;

const FORM_TEXT: Record<TeamForm, string> = { W: 'text-success', D: 'text-muted', L: 'text-danger' };

/**
 * TeamCard, redesigned (v3): a **compact team row**. A rank number, crest, name
 * over a league·record line, and a small form streak on the right — hairline-
 * bordered for a teams list. The opposite of v2's banner. Same props, token-only.
 */
export const TeamCardV3 = React.forwardRef<HTMLDivElement, TeamCardV3Props>(function TeamCardV3(
  { name, crest = '⚽', league, won, drawn, lost, rank, form, variant, selected = false, loading = false, onClick, className, ...rest },
  ref
) {
  void variant;
  if (loading) {
    return <div ref={ref} data-xen-team-card="" aria-label="Loading team" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)} {...rest}><div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" /></div>;
  }

  const tap = tappableProps(onClick, name);
  const record = [won, drawn, lost].every((n) => typeof n === 'number') ? `${won}-${drawn}-${lost}` : null;
  const sub = [league, record].filter((s): s is string => !!s).join(' · ');

  return (
    <div
      ref={ref}
      data-xen-team-card=""
      className={cn('flex items-center gap-3 border-b border-border py-2.5', selected && 'border-l-2 border-l-accent pl-2', onClick && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...tap}
      {...rest}
    >
      {typeof rank === 'number' ? <span className="w-5 text-right text-sm font-bold tabular-nums text-muted">{rank}</span> : null}
      <span className="text-lg" aria-hidden>{crest}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{name}</p>
        {sub ? <p className="truncate text-xs text-muted">{sub}</p> : null}
      </div>
      {form && form.length > 0 ? (
        <div className="flex gap-0.5">
          {form.slice(-5).map((f, i) => (
            <span key={i} className={cn('text-xs font-bold', FORM_TEXT[f])}>{f}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
});
