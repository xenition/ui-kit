import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { DistanceBadge } from './DistanceBadge';
import { CompatibilityMeter } from './CompatibilityMeter';
import { ProfilePrompt } from './ProfilePrompt';
import { IcebreakerChip } from './IcebreakerChip';
import { LikePassButtons } from './LikePassButtons';
import type { ProfileCardProps } from './ProfileCard';

/** Drop-in alternate design — identical props to `ProfileCard`. */
export type ProfileCardV3Props = ProfileCardProps;

/**
 * ProfileCard — design variant **V3**, an **editorial split** (web parity of the
 * native V3). A rounded hero photo sits at the top; below it a borderless
 * editorial header (oversized name, headline, distance) leads into the
 * compatibility bar, then the profile **prompts become the hero content** — each a
 * raised card — followed by a labelled interest rail. Airy, type-led, and
 * unmistakably distinct from the base summary card and the full-bleed V2. Same
 * `ProfileCardProps`; token classes only; guarded; loading/empty states included.
 */
export const ProfileCardV3 = React.forwardRef<HTMLDivElement, ProfileCardV3Props>(function ProfileCardV3(
  { profile, variant = 'full', showActions = false, onAction, onClickInterest, loading = false, emptyLabel = 'No profile to show', className, ...rest },
  ref
) {
  if (loading) {
    return (
      <div ref={ref} aria-busy="true" className={cn('flex w-full flex-col gap-md', className)} {...rest}>
        <div className="aspect-[5/4] w-full animate-pulse rounded-[var(--xen-radius-lg)] bg-neutral-200" />
        <div className="flex flex-col gap-sm">
          <div className="h-5 w-1/2 rounded-[var(--xen-radius-sm)] bg-neutral-200" />
          <div className="h-3 w-4/5 rounded-[var(--xen-radius-sm)] bg-neutral-200" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        ref={ref}
        aria-label={emptyLabel}
        className={cn('flex w-full flex-col items-center gap-xs rounded-[var(--xen-radius-lg)] border border-border p-lg text-center', className)}
        {...rest}
      >
        <span aria-hidden="true" className="text-2xl">👤</span>
        <span className="text-sm text-muted">{emptyLabel}</span>
      </div>
    );
  }

  const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
  const photos = profile.photos ?? [];
  const hero = photos.length > 0 ? photos[0] : undefined;
  const interests = profile.interests ?? [];
  const prompts = profile.prompts ?? [];
  const heroRatio = variant === 'compact' ? 'aspect-[16/9]' : 'aspect-[5/4]';

  return (
    <div ref={ref} className={cn('flex w-full flex-col gap-lg', className)} {...rest}>
      {/* Editorial hero photo. */}
      <div className={cn('w-full overflow-hidden rounded-[var(--xen-radius-lg)] bg-neutral-200 shadow-md', heroRatio)} role="img" aria-label={title}>
        {hero?.uri ? (
          <img src={hero.uri} alt={hero.alt ?? ''} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span aria-hidden="true" className="text-3xl">🙂</span>
          </div>
        )}
      </div>

      {/* Editorial header. */}
      <div className="flex flex-col gap-xs">
        <div className="flex flex-wrap items-center gap-xs">
          <span className="text-3xl font-extrabold tracking-tight text-on-surface">{title}</span>
          {profile.verified ? <Icon glyph="✔" size="sm" color="primary" aria-label="Verified" /> : null}
          {profile.online ? (
            <span className="flex items-center gap-1" aria-label="Active now">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-success" />
              <span className="text-xs text-success">Active</span>
            </span>
          ) : null}
        </div>
        {profile.headline ? <span className="text-base text-muted">{profile.headline}</span> : null}
        {profile.distanceKm != null ? (
          <span className="mt-xs self-start">
            <DistanceBadge distance={profile.distanceKm} />
          </span>
        ) : null}
      </div>

      {profile.compatibility != null ? <CompatibilityMeter score={profile.compatibility} /> : null}

      {profile.bio ? <p className="text-base leading-relaxed text-on-surface">{profile.bio}</p> : null}

      {/* Prompts as the editorial centrepiece — raised cards. */}
      {prompts.length > 0 ? (
        <div className="flex flex-col gap-md">
          {prompts.map((p) => (
            <div key={p.id} className="rounded-[var(--xen-radius-lg)] bg-surface shadow-sm">
              <ProfilePrompt prompt={p.prompt} answer={p.answer} variant="card" />
            </div>
          ))}
        </div>
      ) : null}

      {interests.length > 0 ? (
        <div className="flex flex-col gap-xs">
          <span className="text-xs font-bold uppercase tracking-wide text-muted">Interests</span>
          <div className="flex flex-wrap gap-xs">
            {interests.map((interest, i) => (
              <IcebreakerChip key={`${interest}-${i}`} label={interest} variant="outline" size="sm" onClick={onClickInterest} />
            ))}
          </div>
        </div>
      ) : null}

      {showActions ? (
        <div className="mt-xs border-t border-border pt-md">
          <LikePassButtons actions={['rewind', 'pass', 'superlike', 'like']} onAction={onAction} />
        </div>
      ) : null}
    </div>
  );
});
