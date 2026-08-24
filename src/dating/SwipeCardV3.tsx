import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { DistanceBadge } from './DistanceBadge';
import type { SwipeCardProps, SwipeOverlay } from './SwipeCard';

/** Drop-in alternate design — identical props to `SwipeCard`. */
export type SwipeCardV3Props = SwipeCardProps;

const STAMP: Record<SwipeOverlay, { text: string; color: string; tint: string }> = {
  like: { text: 'LIKE', color: 'text-success border-success', tint: 'bg-success/10' },
  nope: { text: 'NOPE', color: 'text-danger border-danger', tint: 'bg-danger/10' },
  superlike: { text: 'SUPER', color: 'text-accent border-accent', tint: 'bg-accent/10' },
};

/**
 * SwipeCard — design variant **V3**, a **framed card with a caption strip** (web
 * parity of the native V3). Unlike the full-bleed base/V2, the photo is inset
 * inside a padded surface frame (a tasteful, editorial "polaroid"), and the
 * name/age/tagline/distance live in a **solid caption strip below the image**
 * rather than overlaid on it. The decision stamp still floats over the photo. Same
 * `SwipeCardProps`; token classes only; a placeholder covers missing photos.
 */
export const SwipeCardV3 = React.forwardRef<HTMLDivElement, SwipeCardV3Props>(function SwipeCardV3(
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
      className={cn('w-full overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface p-sm shadow-md', className)}
      {...rest}
    >
      {/* Framed photo. */}
      <div className={cn('relative w-full overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-200', variant === 'compact' ? 'aspect-[16/9]' : 'aspect-[3/4]')}>
        {profile.photoUri ? (
          <img src={profile.photoUri} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span aria-hidden="true" className="text-3xl">🙂</span>
          </div>
        )}

        {/* Decision stamp floats over the framed photo. */}
        {stamp ? (
          <div
            aria-hidden="true"
            style={{ opacity: stampOpacity }}
            className={cn(
              'pointer-events-none absolute left-4 top-4 -rotate-12 rounded-[var(--xen-radius-md)] border-[3px] px-sm py-xs text-xl font-extrabold tracking-widest',
              stamp.color,
              stamp.tint
            )}
          >
            {stamp.text}
          </div>
        ) : null}
      </div>

      {/* Caption strip. */}
      <div className="flex flex-col gap-1 px-xs pt-sm">
        <div className="flex items-center gap-xs">
          <span className="text-xl font-bold text-on-surface">{title}</span>
          {profile.verified ? <Icon glyph="✔" size="sm" color="primary" aria-label="Verified" /> : null}
          {profile.online ? <span aria-hidden="true" className="h-2 w-2 rounded-full bg-success" /> : null}
          {profile.distanceKm != null ? (
            <span className="ml-auto">
              <DistanceBadge distance={profile.distanceKm} unit="km" variant="outline" />
            </span>
          ) : null}
        </div>
        {profile.tagline ? <span className="line-clamp-2 text-sm text-muted">{profile.tagline}</span> : null}
      </div>
    </div>
  );
});
