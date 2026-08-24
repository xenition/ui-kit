import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button } from '../primitives';
import type { BadgeTone } from '../primitives';
import { activateOnKey } from './_tokens';
import type { AdoptionCardProps, AdoptionStatus } from './AdoptionCard';

/** Same public contract as {@link AdoptionCard} — a drop-in alternate design. */
export type AdoptionCardV2Props = AdoptionCardProps;

const STATUS: Record<AdoptionStatus, { label: string; tone: BadgeTone }> = {
  available: { label: 'Available', tone: 'success' },
  pending: { label: 'Pending', tone: 'warn' },
  adopted: { label: 'Adopted', tone: 'neutral' },
  fostered: { label: 'Fostered', tone: 'primary' },
};

/**
 * AdoptionCard, redesigned (v2): a **full-bleed cover card**. The photo fills a
 * tall banner with a favorite ♥ floating top-right and the status chip top-left;
 * the name, breed·age·sex, shelter, fee, and Apply CTA sit on the surface below.
 * Elevated, hover-lift. Same props as {@link AdoptionCard}, token-only.
 */
export const AdoptionCardV2 = React.forwardRef<HTMLDivElement, AdoptionCardV2Props>(
  function AdoptionCardV2(
    { name, breed, age, sex, shelter, photoUrl, glyph = '🐾', fee, status, favorited, applyLabel = 'Apply to adopt', onApply, onFavorite, onClick, className },
    ref
  ) {
    const st = STATUS[status];
    const interactive = typeof onClick === 'function';
    const meta = [breed, age, sex].filter((s): s is string => !!s);

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
          'flex flex-col overflow-hidden rounded-lg bg-surface shadow-md transition-transform',
          interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0',
          className
        )}
      >
        <div className="relative h-40 bg-neutral-100">
          {photoUrl ? (
            <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-5xl">{glyph}</div>
          )}
          <div className="absolute left-2 top-2"><Badge tone={st.tone}>{st.label}</Badge></div>
          {onFavorite ? (
            <button
              type="button"
              aria-label={favorited ? 'Unfavorite' : 'Favorite'}
              aria-pressed={!!favorited}
              onClick={(e) => { e.stopPropagation(); onFavorite(); }}
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-surface/90 text-base"
            >
              <span className={favorited ? 'text-danger' : 'text-muted'}>{favorited ? '♥' : '♡'}</span>
            </button>
          ) : null}
        </div>
        <div className="flex flex-col gap-1 p-md">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-base font-bold text-on-surface">{name}</p>
            {fee ? <span className="text-sm font-semibold text-on-surface">{fee}</span> : null}
          </div>
          {meta.length > 0 ? <p className="text-xs text-muted">{meta.join(' · ')}</p> : null}
          {shelter ? <p className="text-xs text-muted">🏠 {shelter}</p> : null}
          {status !== 'adopted' && onApply ? (
            <Button size="md" variant="primary" className="mt-1 w-full" onClick={(e) => { e.stopPropagation(); onApply(); }}>
              {applyLabel}
            </Button>
          ) : null}
        </div>
      </div>
    );
  }
);
