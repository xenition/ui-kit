import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Badge } from '../primitives';
import { activateOnKey } from './_tokens';

export type PetSpecies = 'dog' | 'cat' | 'bird' | 'rabbit' | 'reptile' | 'fish' | 'other';
export type PetSex = 'male' | 'female' | 'unknown';

interface SpeciesMeta {
  glyph: string;
  label: string;
}

const SPECIES_META: Record<PetSpecies, SpeciesMeta> = {
  dog: { glyph: '🐕', label: 'Dog' },
  cat: { glyph: '🐈', label: 'Cat' },
  bird: { glyph: '🐦', label: 'Bird' },
  rabbit: { glyph: '🐇', label: 'Rabbit' },
  reptile: { glyph: '🦎', label: 'Reptile' },
  fish: { glyph: '🐠', label: 'Fish' },
  other: { glyph: '🐾', label: 'Pet' },
};

const SEX_GLYPH: Record<PetSex, string> = { male: '♂', female: '♀', unknown: '•' };

export interface PetProfileCardProps {
  /** Pet's name. */
  name: string;
  /** Species; drives the icon + fallback label. */
  species: PetSpecies;
  /** Breed, e.g. "Golden Retriever". */
  breed?: string;
  /** Age label already formatted, e.g. "3 yrs" or "8 mo". */
  age?: string;
  /** Biological sex. */
  sex?: PetSex;
  /** Weight label, e.g. "28 kg". */
  weight?: string;
  /** Photo URL for the avatar; falls back to initials/species. */
  photoUrl?: string;
  /** Whether the pet is spayed/neutered — shown as a success chip. */
  fixed?: boolean;
  /** Microchip id; shown truncated when present. */
  microchipId?: string;
  /** Loading placeholder state. */
  loading?: boolean;
  /** Makes the whole card an activatable `role="button"` (keyboard + click). */
  onClick?: () => void;
  /** Extra classes on the card root. */
  className?: string;
}

/**
 * Header card for a single pet: avatar/photo, name, species + breed, and a strip
 * of key stats (age, sex, weight) plus optional spay/neuter and microchip chips.
 * Becomes an activatable `role="button"` when `onClick` is set. Renders a muted
 * skeleton while `loading`. Every color traces to a `--xen-*` token — no literals.
 */
export const PetProfileCard = React.forwardRef<HTMLDivElement, PetProfileCardProps>(
  function PetProfileCard(
    { name, species, breed, age, sex, weight, photoUrl, fixed, microchipId, loading = false, onClick, className },
    ref
  ) {
    const meta = SPECIES_META[species];
    const base =
      'flex flex-col gap-[var(--xen-space-md)] bg-surface text-on-surface border border-border rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]';

    if (loading) {
      return (
        <div
          ref={ref}
          aria-label="Loading pet profile"
          aria-busy="true"
          className={cn(base, className)}
        >
          <div className="flex items-center gap-[var(--xen-space-md)]">
            <div className="h-14 w-14 rounded-full bg-border" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-1/2 rounded-[var(--xen-radius-sm)] bg-border" />
              <div className="h-2.5 w-2/5 rounded-[var(--xen-radius-sm)] bg-border" />
            </div>
          </div>
        </div>
      );
    }

    const stats: Array<{ label: string; value: string }> = [];
    if (age) stats.push({ label: 'Age', value: age });
    if (sex) stats.push({ label: 'Sex', value: `${SEX_GLYPH[sex]} ${sex}` });
    if (weight) stats.push({ label: 'Weight', value: weight });

    const a11y = `${name}, ${breed ?? meta.label}${age ? `, ${age}` : ''}`;
    const interactive = onClick != null;

    return (
      <div
        ref={ref}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={a11y}
        onClick={onClick}
        onKeyDown={interactive ? activateOnKey(onClick) : undefined}
        className={cn(base, interactive && 'cursor-pointer hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className)}
      >
        <div className="flex items-center gap-[var(--xen-space-md)]">
          <Avatar src={photoUrl} name={name} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xl font-bold text-on-surface">{name}</p>
            <p className="truncate text-sm text-muted">
              {meta.glyph} {breed ?? meta.label}
            </p>
          </div>
        </div>

        {stats.length > 0 ? (
          <div className="flex gap-[var(--xen-space-xl)]">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-xs text-muted">{s.label}</p>
                <p className="text-base font-semibold text-on-surface">{s.value}</p>
              </div>
            ))}
          </div>
        ) : null}

        {fixed || microchipId ? (
          <div className="flex flex-wrap gap-[var(--xen-space-xs)]">
            {fixed ? <Badge tone="success">✓ Spayed / neutered</Badge> : null}
            {microchipId ? <Badge tone="primary">{`Chip …${microchipId.slice(-6)}`}</Badge> : null}
          </div>
        ) : null}
      </div>
    );
  }
);
