import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Badge } from '../primitives';
import { activateOnKey } from './_tokens';
import type { PetProfileCardProps, PetSpecies } from './PetProfileCard';

/** Same public contract as {@link PetProfileCard} — a drop-in alternate design. */
export type PetProfileCardV3Props = PetProfileCardProps;

const SPECIES_GLYPH: Record<PetSpecies, string> = {
  dog: '🐕', cat: '🐈', bird: '🐦', rabbit: '🐇', reptile: '🦎', fish: '🐟', other: '🐾',
};

/**
 * PetProfileCard, redesigned (v3): a **compact profile row**. A small avatar, the
 * name (+ species glyph) over a breed·age·sex·weight summary, and a fixed chip on
 * the trailing edge — hairline-bordered for a pets list. The opposite of v2's
 * banner. Same props, token-only.
 */
export const PetProfileCardV3 = React.forwardRef<HTMLDivElement, PetProfileCardV3Props>(
  function PetProfileCardV3(
    { name, species, breed, age, sex, weight, photoUrl, fixed, microchipId, loading = false, onClick, className },
    ref
  ) {
    void microchipId;
    const interactive = typeof onClick === 'function';

    if (loading) {
      return (
        <div ref={ref} data-xen-pet-profile-card="" aria-label="Loading pet profile" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)}>
          <div className="h-9 w-9 animate-pulse rounded-full bg-neutral-200" />
          <div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-200" />
        </div>
      );
    }

    const summary = [breed, age, sex, weight].filter((s): s is string => !!s);

    return (
      <div
        ref={ref}
        data-xen-pet-profile-card=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={`${name}, ${species}`}
        onClick={onClick}
        onKeyDown={interactive ? activateOnKey(onClick) : undefined}
        className={cn(
          'flex items-center gap-3 border-b border-border py-2.5',
          interactive && 'cursor-pointer transition-colors hover:bg-neutral-50',
          className
        )}
      >
        <Avatar src={photoUrl} name={name} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-on-surface">
            {name} <span aria-hidden>{SPECIES_GLYPH[species]}</span>
          </p>
          {summary.length > 0 ? <p className="truncate text-xs text-muted">{summary.join(' · ')}</p> : null}
        </div>
        {fixed ? <Badge tone="success">Fixed</Badge> : null}
      </div>
    );
  }
);
