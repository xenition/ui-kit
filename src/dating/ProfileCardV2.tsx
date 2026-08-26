import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon } from '../primitives';
import { DistanceBadge } from './DistanceBadge';
import { CompatibilityMeterV2 } from './CompatibilityMeterV2';
import { IcebreakerChip } from './IcebreakerChip';
import { LikePassButtons } from './LikePassButtons';
import type { ProfileCardProps } from './ProfileCard';

/** Drop-in alternate design — identical props to `ProfileCard`. */
export type ProfileCardV2Props = ProfileCardProps;

/**
 * ProfileCard — design variant **V2** (web parity of the native V2). Where the
 * base stacks a photo carousel above separate meter/bio/prompt blocks, V2 is a
 * single **full-bleed hero**: the primary photo fills the card, a token gradient
 * scrim carries the name/age, headline and distance, a compatibility pill floats
 * top-right on a surface chip, and a slim detail strip beneath surfaces
 * bio/interests/actions. Same `ProfileCardProps`, so it is a genuine drop-in.
 * Token classes only; explicit loading/empty states; array access is guarded.
 * Stays inside its own design line: the meter is {@link CompatibilityMeterV2},
 * not the base one, because an app that picks V2 picks it for every surface it
 * sees.
 */
export const ProfileCardV2 = React.forwardRef<HTMLDivElement, ProfileCardV2Props>(function ProfileCardV2(
  { profile, variant = 'full', showActions = false, onAction, onClickInterest, loading = false, emptyLabel = 'No profile to show', className, ...rest },
  ref
) {
  if (loading) {
    return (
      <Card ref={ref} className={cn('overflow-hidden p-0 shadow-lg', className)} {...rest}>
        <div className="aspect-[4/5] w-full animate-pulse bg-neutral-200" />
        <div className="flex flex-col gap-sm p-md">
          <div className="h-4 w-1/2 rounded-[var(--xen-radius-sm)] bg-neutral-200" />
          <div className="h-3 w-4/5 rounded-[var(--xen-radius-sm)] bg-neutral-200" />
        </div>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card ref={ref} className={cn('flex flex-col items-center gap-xs p-lg text-center shadow-lg', className)} aria-label={emptyLabel} {...rest}>
        <span aria-hidden="true" className="text-2xl">👤</span>
        <span className="text-sm text-muted">{emptyLabel}</span>
      </Card>
    );
  }

  const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
  const photos = profile.photos ?? [];
  const hero = photos.length > 0 ? photos[0] : undefined;
  const interests = (profile.interests ?? []).slice(0, 4);
  const heroRatio = variant === 'compact' ? 'aspect-[16/9]' : 'aspect-[4/5]';

  return (
    <Card
      ref={ref}
      className={cn(
        'overflow-hidden p-0 shadow-lg transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:transform-none',
        className
      )}
      {...rest}
    >
      <div className={cn('relative w-full bg-neutral-200', heroRatio)} role="img" aria-label={`${title}${profile.headline ? `. ${profile.headline}` : ''}`}>
        {hero?.uri ? (
          <img src={hero.uri} alt={hero.alt ?? ''} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span aria-hidden="true" className="text-3xl">🙂</span>
          </div>
        )}

        {/* Compatibility chip, top-right on a surface pill for contrast. */}
        {profile.compatibility != null ? (
          <div className="absolute right-sm top-sm rounded-full bg-surface px-xs py-0.5 shadow-sm">
            <CompatibilityMeterV2 score={profile.compatibility} variant="compact" showValue />
          </div>
        ) : null}

        {/* Bottom gradient scrim + overlaid identity block. */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-xs bg-gradient-to-t from-neutral-950 to-transparent p-md">
          <div className="flex items-center gap-xs">
            <span className="text-2xl font-extrabold text-neutral-50">{title}</span>
            {profile.verified ? <Icon glyph="✔" size="sm" color="onSurface" aria-label="Verified" className="text-neutral-50" /> : null}
            {profile.online ? (
              <span className="flex items-center gap-1" aria-label="Active now">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-success" />
                <span className="text-xs text-neutral-100">Active</span>
              </span>
            ) : null}
          </div>
          {profile.headline ? <span className="truncate text-sm text-neutral-100">{profile.headline}</span> : null}
          {profile.distanceKm != null ? (
            <span className="self-start">
              <DistanceBadge distance={profile.distanceKm} unit="km" />
            </span>
          ) : null}
        </div>
      </div>

      {/* Slim detail strip beneath the hero. */}
      {(profile.bio || interests.length > 0 || showActions) && variant !== 'compact' ? (
        <div className="flex flex-col gap-sm p-md">
          {profile.bio ? <p className="line-clamp-3 text-base leading-relaxed text-on-surface">{profile.bio}</p> : null}
          {interests.length > 0 ? (
            <div className="flex flex-wrap gap-xs">
              {interests.map((interest, i) => (
                <IcebreakerChip key={`${interest}-${i}`} label={interest} variant="soft" size="sm" onClick={onClickInterest} />
              ))}
            </div>
          ) : null}
          {showActions ? (
            <div className="mt-xs">
              <LikePassButtons actions={['pass', 'superlike', 'like']} onAction={onAction} />
            </div>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
});
