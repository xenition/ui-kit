import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives';
import { activateOnKey } from './_tokens';
import type { PetProfileCardProps, PetSpecies, PetSex } from './PetProfileCard';

/** Drop-in for {@link PetProfileCardProps} — same props, the V4 "companion" design. */
export type PetProfileCardV4Props = PetProfileCardProps;

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

/** Frosted glass surface shared by the stat tiles and status chips. */
const FROST = 'border border-primary-50/30 bg-primary-50/15 text-primary-50';

/**
 * PetProfileCard — **V4** "companion" profile hero (web parity of the native
 * V4). This is the pets line's ONE reserved gradient moment: the pet header sits
 * on the brand gradient ground (`from-primary-500 to-primary-700`) with near-white
 * `primary-50`/`primary-100` ink, a frosted-ring avatar, an age/sex/weight strip
 * rendered as frosted glass tiles, and spay/microchip facts as frosted chips
 * (never color alone — each carries a glyph + label). Same props/behavior as
 * {@link PetProfileCardProps}; `species` drives the glyph + fallback label.
 * `loading` renders a frosted skeleton on the gradient. All colors from `--xen-*`
 * token classes (no literals); the whole card is a keyboard-activatable button
 * when `onClick` is set.
 */
export const PetProfileCardV4 = React.forwardRef<HTMLDivElement, PetProfileCardV4Props>(function PetProfileCardV4(
  { name, species, breed, age, sex, weight, photoUrl, fixed, microchipId, loading = false, onClick, className },
  ref
) {
  const meta = SPECIES_META[species];
  const base =
    'flex flex-col gap-[var(--xen-space-md)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)] text-primary-50 shadow-md';

  if (loading) {
    return (
      <div ref={ref} aria-label="Loading pet profile" aria-busy="true" className={cn(base, className)}>
        <div className="flex items-center gap-[var(--xen-space-md)]">
          <div className="h-14 w-14 rounded-full bg-primary-50/20" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-1/2 rounded-[var(--xen-radius-sm)] bg-primary-50/20" />
            <div className="h-2.5 w-2/5 rounded-[var(--xen-radius-sm)] bg-primary-50/15" />
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
      className={cn(
        base,
        interactive &&
          'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100',
        className
      )}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        {/* Frosted ring around the avatar/photo. */}
        <span className="inline-flex shrink-0 rounded-full ring-2 ring-primary-50/40">
          <Avatar src={photoUrl} name={name} size="lg" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xl font-bold text-primary-50">{name}</h2>
          <p className="truncate text-sm text-primary-100">
            {meta.glyph} {breed ?? meta.label}
          </p>
        </div>
      </div>

      {stats.length > 0 ? (
        <div className="flex flex-wrap gap-[var(--xen-space-sm)]">
          {stats.map((s) => (
            <div
              key={s.label}
              className={cn(
                'flex min-w-[64px] flex-col gap-[2px] rounded-[var(--xen-radius-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
                FROST
              )}
            >
              <span className="text-xs text-primary-100">{s.label}</span>
              <span className="text-base font-semibold text-primary-50">{s.value}</span>
            </div>
          ))}
        </div>
      ) : null}

      {fixed || microchipId ? (
        <div className="flex flex-wrap gap-[var(--xen-space-xs)]">
          {fixed ? (
            <span
              className={cn(
                'inline-flex items-center gap-[var(--xen-space-xs)] rounded-full px-[var(--xen-space-sm)] py-1 text-xs font-semibold',
                FROST
              )}
            >
              <span aria-hidden="true">✓</span>
              Spayed / neutered
            </span>
          ) : null}
          {microchipId ? (
            <span
              className={cn(
                'inline-flex items-center gap-[var(--xen-space-xs)] rounded-full px-[var(--xen-space-sm)] py-1 text-xs font-semibold',
                FROST
              )}
            >
              <span aria-hidden="true">🔖</span>
              {`Chip …${microchipId.slice(-6)}`}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
