import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives';
import { SLOT_BG, activateOnKey, type PetSlot } from './_tokens';

export type BreedSize = 'toy' | 'small' | 'medium' | 'large' | 'giant';
export type BreedEnergy = 'low' | 'moderate' | 'high';

const SIZE_LABEL: Record<BreedSize, string> = {
  toy: 'Toy',
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
  giant: 'Giant',
};

const ENERGY_META: Record<BreedEnergy, { label: string; dots: number; slot: PetSlot }> = {
  low: { label: 'Low energy', dots: 1, slot: 'success' },
  moderate: { label: 'Moderate energy', dots: 2, slot: 'warn' },
  high: { label: 'High energy', dots: 3, slot: 'danger' },
};

export interface BreedCardProps {
  /** Breed name, e.g. "Border Collie". */
  name: string;
  /** Species label, e.g. "Dog". */
  species?: string;
  /** Photo URL rendered as a banner; a glyph placeholder shows otherwise. */
  photoUrl?: string;
  /** Emoji placeholder when there's no photo. */
  glyph?: string;
  /** Size class. */
  size?: BreedSize;
  /** Typical energy level; rendered as labelled dots. */
  energy?: BreedEnergy;
  /** Typical lifespan label, e.g. "12–15 yrs". */
  lifespan?: string;
  /** Short list of temperament traits. */
  traits?: string[];
  /** Makes the whole card an activatable `role="button"` (keyboard + click). */
  onClick?: () => void;
  /** Extra classes on the card root. */
  className?: string;
}

/**
 * A breed reference card: banner (photo or emoji placeholder), name + species,
 * a stat row (size class, lifespan), a labelled energy meter, and temperament
 * trait chips. Activatable `role="button"` when `onClick` is set. The energy
 * level is conveyed by both dots and a text label. Token-only colors; a styled
 * `div` placeholder stands in for a real breed photo.
 */
export const BreedCard = React.forwardRef<HTMLDivElement, BreedCardProps>(function BreedCard(
  { name, species, photoUrl, glyph = '🐾', size, energy, lifespan, traits, onClick, className },
  ref
) {
  const energyMeta = energy ? ENERGY_META[energy] : undefined;
  const safeTraits = traits ?? [];
  const a11y = `${name}${species ? `, ${species}` : ''}${size ? `, ${SIZE_LABEL[size]}` : ''}`;
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
        'overflow-hidden bg-surface text-on-surface border border-border rounded-[var(--xen-radius-lg)]',
        interactive && 'cursor-pointer hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
    >
      <div className="flex h-24 items-center justify-center bg-border" aria-hidden="true">
        {photoUrl ? (
          <img src={photoUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-3xl">{glyph}</span>
        )}
      </div>

      <div className="flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-lg)]">
        <div>
          <p className="truncate text-lg font-bold text-on-surface">{name}</p>
          {species ? <p className="text-sm text-muted">{species}</p> : null}
        </div>

        {size || lifespan ? (
          <div className="flex gap-[var(--xen-space-xl)]">
            {size ? (
              <div>
                <p className="text-xs text-muted">Size</p>
                <p className="text-sm font-semibold text-on-surface">{SIZE_LABEL[size]}</p>
              </div>
            ) : null}
            {lifespan ? (
              <div>
                <p className="text-xs text-muted">Lifespan</p>
                <p className="text-sm font-semibold text-on-surface">{lifespan}</p>
              </div>
            ) : null}
          </div>
        ) : null}

        {energyMeta ? (
          <div className="flex items-center gap-[var(--xen-space-xs)]" aria-label={energyMeta.label}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn('h-2 w-2 rounded-full', i < energyMeta.dots ? SLOT_BG[energyMeta.slot] : 'bg-border')}
              />
            ))}
            <span className="text-xs text-muted">{energyMeta.label}</span>
          </div>
        ) : null}

        {safeTraits.length > 0 ? (
          <div className="flex flex-wrap gap-[var(--xen-space-xs)]">
            {safeTraits.slice(0, 5).map((t, i) => (
              <Badge key={i} tone="primary">
                {t}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
});
