import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button } from '../primitives';
import type { BadgeTone } from '../primitives';
import { activateOnKey } from './_tokens';
import type { AdoptionCardProps, AdoptionStatus } from './AdoptionCard';

/** Same public contract as {@link AdoptionCard} — a drop-in alternate design. */
export type AdoptionCardV3Props = AdoptionCardProps;

const STATUS: Record<AdoptionStatus, { label: string; tone: BadgeTone }> = {
  available: { label: 'Available', tone: 'success' },
  pending: { label: 'Pending', tone: 'warn' },
  adopted: { label: 'Adopted', tone: 'neutral' },
  fostered: { label: 'Fostered', tone: 'primary' },
};

/**
 * AdoptionCard, redesigned (v3): a **dense adoption row**. A small thumbnail, the
 * name over a breed·age·shelter line, the status badge, a compact favorite ♥, and
 * a small Apply button — hairline-bordered for a shelter list. The opposite of
 * v2's cover card. Same props, token-only.
 */
export const AdoptionCardV3 = React.forwardRef<HTMLDivElement, AdoptionCardV3Props>(
  function AdoptionCardV3(
    { name, breed, age, sex, shelter, photoUrl, glyph = '🐾', fee, status, favorited, applyLabel = 'Apply', onApply, onFavorite, onClick, className },
    ref
  ) {
    void sex;
    const st = STATUS[status];
    const interactive = typeof onClick === 'function';
    const meta = [breed, age, shelter].filter((s): s is string => !!s);

    return (
      <div
        ref={ref}
        data-xen-adoption-card=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={`${name}${breed ? `, ${breed}` : ''}, ${st.label}`}
        onClick={onClick}
        onKeyDown={interactive ? activateOnKey(onClick) : undefined}
        className={cn(
          'flex items-center gap-3 border-b border-border py-3',
          interactive && 'cursor-pointer transition-colors hover:bg-neutral-50',
          className
        )}
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-2xl">
          {photoUrl ? <img src={photoUrl} alt={name} className="h-full w-full object-cover" /> : glyph}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-on-surface">{name}</p>
          {meta.length > 0 ? <p className="truncate text-xs text-muted">{meta.join(' · ')}</p> : null}
        </div>
        <Badge tone={st.tone}>{st.label}</Badge>
        {onFavorite ? (
          <button
            type="button"
            aria-label={favorited ? 'Unfavorite' : 'Favorite'}
            aria-pressed={!!favorited}
            onClick={(e) => { e.stopPropagation(); onFavorite(); }}
            className={cn('text-lg', favorited ? 'text-danger' : 'text-muted')}
          >
            {favorited ? '♥' : '♡'}
          </button>
        ) : null}
        {status !== 'adopted' && onApply ? (
          <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); onApply(); }}>
            {applyLabel}
          </Button>
        ) : null}
      </div>
    );
  }
);
