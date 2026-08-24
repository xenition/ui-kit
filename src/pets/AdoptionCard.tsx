import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button } from '../primitives';
import { activateOnKey, toBadgeTone } from './_tokens';

export type AdoptionStatus = 'available' | 'pending' | 'adopted' | 'fostered';

const STATUS_META: Record<AdoptionStatus, { label: string; tone: 'success' | 'warn' | 'neutral' | 'accent' }> = {
  available: { label: 'Available', tone: 'success' },
  pending: { label: 'Pending', tone: 'warn' },
  adopted: { label: 'Adopted', tone: 'neutral' },
  fostered: { label: 'In foster', tone: 'accent' },
};

export interface AdoptionCardProps {
  /** Pet's name. */
  name: string;
  /** Species / breed line, e.g. "Tabby cat". */
  breed?: string;
  /** Age label, e.g. "2 yrs". */
  age?: string;
  /** Sex label. */
  sex?: string;
  /** Shelter / rescue name. */
  shelter?: string;
  /** Photo URL for the banner; a glyph placeholder shows otherwise. */
  photoUrl?: string;
  /** Placeholder glyph when there's no photo. */
  glyph?: string;
  /** Adoption fee label, e.g. "$120". */
  fee?: string;
  /** Availability status; drives the chip. */
  status: AdoptionStatus;
  /** Whether the viewer has favorited this listing. */
  favorited?: boolean;
  /** Apply/adopt action label; hidden once adopted or no `onApply`. */
  applyLabel?: string;
  onApply?: () => void;
  onFavorite?: () => void;
  /** Makes the whole card an activatable `role="button"` (keyboard + click). */
  onClick?: () => void;
  /** Extra classes on the card root. */
  className?: string;
}

/**
 * An adoption listing card: photo banner (or emoji placeholder), name + breed,
 * age/sex meta, shelter, a status chip, an optional fee, and adopt + favorite
 * actions (real `<button>`s that don't bubble to the card). The whole card is
 * activatable when `onClick` is set. Availability reads via a labelled chip (not
 * color alone). Token-only colors; a styled `div` stands in for the pet photo.
 */
export const AdoptionCard = React.forwardRef<HTMLDivElement, AdoptionCardProps>(function AdoptionCard(
  {
    name,
    breed,
    age,
    sex,
    shelter,
    photoUrl,
    glyph = '🐾',
    fee,
    status,
    favorited = false,
    applyLabel = 'Apply to adopt',
    onApply,
    onFavorite,
    onClick,
    className,
  },
  ref
) {
  const statusMeta = STATUS_META[status];
  const meta = [age, sex, breed].filter(Boolean).join(' · ');
  const showApply = onApply != null && status !== 'adopted';
  const a11y = `${name}${meta ? `, ${meta}` : ''}, ${statusMeta.label}`;
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
      <div className="relative flex h-[120px] items-center justify-center bg-border">
        {photoUrl ? (
          <img src={photoUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-3xl" aria-hidden="true">
            {glyph}
          </span>
        )}
        <div className="absolute left-[var(--xen-space-sm)] top-[var(--xen-space-sm)]">
          <Badge tone={toBadgeTone(statusMeta.tone)}>{statusMeta.label}</Badge>
        </div>
        {onFavorite ? (
          <button
            type="button"
            aria-pressed={favorited}
            aria-label={favorited ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
            onClick={(e) => {
              e.stopPropagation();
              onFavorite();
            }}
            className={cn(
              'absolute right-[var(--xen-space-sm)] top-[var(--xen-space-sm)] flex h-8 w-8 items-center justify-center rounded-full bg-surface text-base',
              favorited ? 'text-danger' : 'text-muted'
            )}
          >
            {favorited ? '♥' : '♡'}
          </button>
        ) : null}
      </div>

      <div className="flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-lg)]">
        <p className="truncate text-lg font-bold text-on-surface">{name}</p>
        {meta ? <p className="truncate text-sm text-muted">{meta}</p> : null}
        {shelter ? <p className="truncate text-xs text-muted">📍 {shelter}</p> : null}

        {fee || showApply ? (
          <div className="mt-[var(--xen-space-xs)] flex items-center justify-between gap-[var(--xen-space-sm)]">
            {fee ? <p className="text-base font-bold text-on-surface">{fee}</p> : <span />}
            {showApply ? (
              <Button
                variant="primary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onApply?.();
                }}
              >
                {applyLabel}
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
});
