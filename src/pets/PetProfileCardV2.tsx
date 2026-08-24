import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Badge } from '../primitives';
import { activateOnKey } from './_tokens';
import type { PetProfileCardProps, PetSpecies } from './PetProfileCard';

/** Same public contract as {@link PetProfileCard} — a drop-in alternate design. */
export type PetProfileCardV2Props = PetProfileCardProps;

const SPECIES_GLYPH: Record<PetSpecies, string> = {
  dog: '🐕', cat: '🐈', bird: '🐦', rabbit: '🐇', reptile: '🦎', fish: '🐟', other: '🐾',
};

/**
 * PetProfileCard, redesigned (v2): a **banner profile card**. A primary-tinted
 * cover carries a large avatar straddling its edge; the name (+ species glyph),
 * breed·age·sex·weight chips, a spayed/neutered success chip, and the microchip
 * id center beneath. Elevated. Distinct from v1's compact row. Same props,
 * token-only.
 */
export const PetProfileCardV2 = React.forwardRef<HTMLDivElement, PetProfileCardV2Props>(
  function PetProfileCardV2(
    { name, species, breed, age, sex, weight, photoUrl, fixed, microchipId, loading = false, onClick, className },
    ref
  ) {
    const interactive = typeof onClick === 'function';

    if (loading) {
      return (
        <div ref={ref} data-xen-pet-profile-card="" aria-label="Loading pet profile" className={cn('overflow-hidden rounded-lg bg-surface shadow-md', className)}>
          <div className="h-14 bg-neutral-200" />
          <div className="flex flex-col items-center gap-2 p-md">
            <div className="-mt-10 h-20 w-20 animate-pulse rounded-full bg-neutral-200" />
            <div className="h-4 w-1/2 animate-pulse rounded-sm bg-neutral-200" />
          </div>
        </div>
      );
    }

    const chips = [breed, age, sex, weight].filter((s): s is string => !!s);

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
          'overflow-hidden rounded-lg bg-surface text-center shadow-md transition-transform',
          interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0',
          className
        )}
      >
        <div className="h-14 bg-primary/20" />
        <div className="flex flex-col items-center gap-1 px-md pb-md">
          <div className="-mt-10 rounded-full border-4 border-surface">
            <Avatar src={photoUrl} name={name} size="xl" />
          </div>
          <p className="text-lg font-bold text-on-surface">
            {name} <span aria-hidden>{SPECIES_GLYPH[species]}</span>
          </p>
          {chips.length > 0 ? (
            <div className="mt-1 flex flex-wrap justify-center gap-1.5">
              {chips.map((c, i) => (
                <span key={i} className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface">{c}</span>
              ))}
            </div>
          ) : null}
          <div className="mt-1 flex flex-wrap justify-center gap-1.5">
            {fixed ? <Badge tone="success">Fixed</Badge> : null}
            {microchipId ? <span className="text-xs text-muted">🔖 {microchipId.slice(0, 8)}</span> : null}
          </div>
        </div>
      </div>
    );
  }
);
