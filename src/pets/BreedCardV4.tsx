import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives';
import { activateOnKey, toBadgeTone } from './_tokens';
import type { BreedCardProps, BreedSize, BreedEnergy } from './BreedCard';

/** V4 layout choices for the "companion" design. */
export type BreedCardLayout = 'card' | 'compact';

/** Drop-in for {@link BreedCardProps} — same props, the V4 "companion" design. */
export interface BreedCardV4Props extends BreedCardProps {
  /** V4 layout: `card` (default) or `compact` (dense single row). */
  variant?: BreedCardLayout;
}

const SIZE_META: Record<BreedSize, { glyph: string; label: string }> = {
  toy: { glyph: '🐁', label: 'Toy' },
  small: { glyph: '🐇', label: 'Small' },
  medium: { glyph: '🐕', label: 'Medium' },
  large: { glyph: '🐎', label: 'Large' },
  giant: { glyph: '🐘', label: 'Giant' },
};

const ENERGY_META: Record<BreedEnergy, { glyph: string; label: string; tone: 'success' | 'warn' | 'danger' }> = {
  low: { glyph: '🌙', label: 'Low energy', tone: 'success' },
  moderate: { glyph: '⚡', label: 'Moderate energy', tone: 'warn' },
  high: { glyph: '🔥', label: 'High energy', tone: 'danger' },
};

/**
 * BreedCard — **V4** "companion" design (web parity of the native V4). The warm,
 * friendly take on a breed reference card: an elevated rounded card with a soft
 * shadow (no gradient — a clean surface), the breed photo/glyph in a soft-primary
 * tinted well, a bold breed name, a muted species line, size + energy shown as
 * labelled glyph Badges (never color alone), lifespan as a soft-primary chip, and
 * temperament traits as soft-primary chips. Same props/behavior as
 * {@link BreedCardProps}; activatable `role="button"` when `onClick` is set. All
 * colors from `--xen-*` token classes (no literals).
 */
export const BreedCardV4 = React.forwardRef<HTMLDivElement, BreedCardV4Props>(function BreedCardV4(
  { name, species, photoUrl, glyph = '🐾', size, energy, lifespan, traits, onClick, className, variant = 'card' },
  ref
) {
  const sizeMeta = size ? SIZE_META[size] : undefined;
  const energyMeta = energy ? ENERGY_META[energy] : undefined;
  const safeTraits = traits ?? [];
  const a11y = `${name}${species ? `, ${species}` : ''}${sizeMeta ? `, ${sizeMeta.label}` : ''}${energyMeta ? `, ${energyMeta.label}` : ''}`;
  const interactive = onClick != null;

  // ── compact ─────────────────────────────────────────────────────────────────
  if (variant === 'compact') {
    return (
      <div
        ref={ref}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={a11y}
        onClick={onClick}
        onKeyDown={interactive ? activateOnKey(onClick) : undefined}
        className={cn(
          'flex min-h-[44px] items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface p-[var(--xen-space-sm)] shadow-md',
          interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-lg" aria-hidden="true">
          {photoUrl ? <img src={photoUrl} alt="" className="h-full w-full object-cover" /> : glyph}
        </span>
        <div className="flex min-w-0 flex-1 items-baseline gap-[var(--xen-space-sm)]">
          <p className="truncate text-sm font-bold text-on-surface">{name}</p>
          {species ? <p className="truncate text-xs text-muted">{species}</p> : null}
        </div>
        {sizeMeta ? (
          <Badge tone="primary" variant="soft">
            <span aria-hidden="true">{sizeMeta.glyph}</span> {sizeMeta.label}
          </Badge>
        ) : null}
        {energyMeta ? (
          <Badge tone={toBadgeTone(energyMeta.tone)} variant="soft">
            <span aria-hidden="true">{energyMeta.glyph}</span> {energyMeta.label}
          </Badge>
        ) : null}
      </div>
    );
  }

  // ── card (default) ────────────────────────────────────────────────────────────
  return (
    <div
      ref={ref}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={a11y}
      onClick={onClick}
      onKeyDown={interactive ? activateOnKey(onClick) : undefined}
      className={cn(
        'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface p-[var(--xen-space-lg)] shadow-md',
        interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
    >
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-xl" aria-hidden="true">
          {photoUrl ? <img src={photoUrl} alt="" className="h-full w-full object-cover" /> : glyph}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-bold text-on-surface">{name}</p>
          {species ? <p className="truncate text-sm text-muted">{species}</p> : null}
        </div>
      </div>

      {sizeMeta || energyMeta ? (
        <div className="flex flex-wrap items-center gap-[var(--xen-space-sm)]">
          {sizeMeta ? (
            <Badge tone="primary" variant="soft">
              <span aria-hidden="true">{sizeMeta.glyph}</span> {sizeMeta.label}
            </Badge>
          ) : null}
          {energyMeta ? (
            <Badge tone={toBadgeTone(energyMeta.tone)} variant="soft">
              <span aria-hidden="true">{energyMeta.glyph}</span> {energyMeta.label}
            </Badge>
          ) : null}
        </div>
      ) : null}

      {lifespan ? (
        <div className="flex flex-wrap gap-[var(--xen-space-sm)]">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm text-on-surface">
            ⏳ {lifespan}
          </span>
        </div>
      ) : null}

      {safeTraits.length > 0 ? (
        <div className="flex flex-wrap gap-[var(--xen-space-xs)]">
          {safeTraits.slice(0, 5).map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-xs text-on-surface"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
});
