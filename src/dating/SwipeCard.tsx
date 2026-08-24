import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { DistanceBadge } from './DistanceBadge';

/** Which drag-decision stamp to overlay on the card. */
export type SwipeOverlay = 'like' | 'nope' | 'superlike';

export interface SwipeCardProfile {
  id: string;
  name: string;
  age?: number;
  /** Primary photo URL. */
  photoUri?: string;
  /** One-line tagline / headline. */
  tagline?: string;
  /** Distance in km for the corner badge. */
  distanceKm?: number;
  /** "Active now" / online. */
  online?: boolean;
  /** Verified profile check. */
  verified?: boolean;
}

export type SwipeCardVariant = 'photo' | 'compact';

export interface SwipeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The profile to render. */
  profile: SwipeCardProfile;
  /** Presentation. `photo` (full-bleed, default) or `compact`. */
  variant?: SwipeCardVariant;
  /** Drag-decision stamp to reveal (LIKE / NOPE / SUPER). */
  overlay?: SwipeOverlay | null;
  /** Stamp opacity 0–1 (drag progress). Defaults to 1 when `overlay` is set. */
  overlayOpacity?: number;
}

const STAMP_SPEC: Record<SwipeOverlay, { text: string; color: string; position: string }> = {
  like: { text: 'LIKE', color: 'text-success border-success', position: 'left-6' },
  nope: { text: 'NOPE', color: 'text-danger border-danger', position: 'right-6' },
  superlike: { text: 'SUPER', color: 'text-accent border-accent', position: 'left-1/2 -translate-x-1/2' },
};

/**
 * A single deck card — the web parity of the native swipe card. Renders a
 * full-bleed profile photo with a bottom scrim carrying the name/age/tagline and
 * a distance badge, plus a decision stamp (LIKE / NOPE / SUPER) whose opacity
 * tracks drag progress. Used standalone or, more often, driven by {@link SwipeDeck}.
 * Scrim and colors derive from token classes — no literal colors. Missing photos
 * fall back to a token placeholder.
 */
export const SwipeCard = React.forwardRef<HTMLDivElement, SwipeCardProps>(function SwipeCard(
  { profile, variant = 'photo', overlay = null, overlayOpacity, className, ...rest },
  ref
) {
  const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
  const stampOpacity = overlay ? Math.max(0, Math.min(1, overlayOpacity ?? 1)) : 0;
  const stamp = overlay ? STAMP_SPEC[overlay] : null;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`${title}${profile.tagline ? `. ${profile.tagline}` : ''}`}
      className={cn(
        'relative w-full overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-neutral-200',
        variant === 'compact' ? 'aspect-[16/9]' : 'aspect-[3/4]',
        className
      )}
      {...rest}
    >
      {profile.photoUri ? (
        <img src={profile.photoUri} alt="" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span aria-hidden="true" className="text-3xl">🙂</span>
        </div>
      )}

      {/* Bottom scrim + info. */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-xs bg-gradient-to-t from-neutral-950 to-transparent p-md">
        <div className="flex items-center gap-xs">
          <span className="text-xl font-bold text-neutral-50">{title}</span>
          {profile.verified ? <Icon glyph="✔" size="sm" color="onSurface" aria-label="Verified" className="text-neutral-50" /> : null}
          {profile.online ? <span aria-hidden="true" className="h-2 w-2 rounded-full bg-success" /> : null}
        </div>
        {profile.tagline ? <span className="line-clamp-2 text-sm text-neutral-100">{profile.tagline}</span> : null}
        {profile.distanceKm != null ? (
          <span className="self-start">
            <DistanceBadge distance={profile.distanceKm} unit="km" />
          </span>
        ) : null}
      </div>

      {/* Decision stamp. */}
      {stamp ? (
        <div
          aria-hidden="true"
          style={{ opacity: stampOpacity }}
          className={cn(
            'pointer-events-none absolute top-6 -rotate-12 rounded-[var(--xen-radius-md)] border-[3px] bg-surface px-sm py-xs',
            'text-xl font-extrabold tracking-widest',
            stamp.color,
            stamp.position
          )}
        >
          {stamp.text}
        </div>
      ) : null}
    </div>
  );
});
