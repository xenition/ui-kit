import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { DistanceBadge } from './DistanceBadge';
import type { SwipeCardProps, SwipeOverlay } from './SwipeCard';

/** Drop-in alternate design — identical props to `SwipeCard`. */
export type SwipeCardV2Props = SwipeCardProps;

/** Filled decision-stamp spec: a solid tone badge rather than an outline. */
const STAMP: Record<SwipeOverlay, { text: string; bg: string; on: string; position: string; rotate: string }> = {
  like: { text: 'LIKE', bg: 'bg-success', on: 'text-on-success', position: 'left-6', rotate: '-rotate-6' },
  nope: { text: 'NOPE', bg: 'bg-danger', on: 'text-on-danger', position: 'right-6', rotate: 'rotate-6' },
  superlike: { text: 'SUPER', bg: 'bg-accent', on: 'text-on-accent', position: 'left-6', rotate: '-rotate-6' },
};

/**
 * SwipeCard — design variant **V2** (web parity of the native V2). A softly
 * rounded full-bleed card with a multi-band gradient scrim (not the base's single
 * flat one), an inline name·distance line, and a **solid, filled decision stamp**
 * that swings in from the like/nope side. Reads as a plusher, more modern deck
 * card at a glance. Same `SwipeCardProps`, so it drops straight into `SwipeDeck`;
 * token classes only; photo-less profiles fall back to a token placeholder.
 */
export const SwipeCardV2 = React.forwardRef<HTMLDivElement, SwipeCardV2Props>(function SwipeCardV2(
  { profile, variant = 'photo', overlay = null, overlayOpacity, className, ...rest },
  ref
) {
  const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
  const stampOpacity = overlay ? Math.max(0, Math.min(1, overlayOpacity ?? 1)) : 0;
  const stamp = overlay ? STAMP[overlay] : null;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`${title}${profile.tagline ? `. ${profile.tagline}` : ''}`}
      className={cn(
        'relative w-full overflow-hidden rounded-[var(--xen-radius-lg)] bg-neutral-200 shadow-lg',
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

      {/* Multi-band bottom gradient scrim. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

      {/* Info block. */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-md">
        <div className="flex flex-wrap items-center gap-xs">
          <span className="text-2xl font-extrabold text-neutral-50">{title}</span>
          {profile.verified ? <Icon glyph="✔" size="sm" color="onSurface" aria-label="Verified" className="text-neutral-50" /> : null}
          {profile.online ? <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-success" /> : null}
          {profile.distanceKm != null ? (
            <span className="ml-auto">
              <DistanceBadge distance={profile.distanceKm} unit="km" variant="soft" />
            </span>
          ) : null}
        </div>
        {profile.tagline ? <span className="line-clamp-2 text-sm text-neutral-100">{profile.tagline}</span> : null}
      </div>

      {/* Solid, filled decision stamp. */}
      {stamp ? (
        <div
          aria-hidden="true"
          style={{ opacity: stampOpacity }}
          className={cn(
            'pointer-events-none absolute top-8 rounded-[var(--xen-radius-md)] px-md py-xs text-xl font-extrabold tracking-widest shadow-md',
            stamp.bg,
            stamp.on,
            stamp.position,
            stamp.rotate
          )}
        >
          {stamp.text}
        </div>
      ) : null}
    </div>
  );
});
