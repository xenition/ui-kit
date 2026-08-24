import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon } from '../primitives';
import { PhotoCarousel, type CarouselPhoto } from './PhotoCarousel';
import { DistanceBadge } from './DistanceBadge';
import { CompatibilityMeter } from './CompatibilityMeter';
import { ProfilePrompt } from './ProfilePrompt';
import { IcebreakerChip } from './IcebreakerChip';
import { LikePassButtons, type SwipeAction } from './LikePassButtons';

export interface ProfilePromptData {
  id: string;
  prompt: string;
  answer?: string;
}

export interface ProfileCardData {
  id: string;
  name: string;
  age?: number;
  /** Photos for the carousel; the first is the hero. */
  photos?: CarouselPhoto[];
  /** Free-text bio. */
  bio?: string;
  /** Distance in km. */
  distanceKm?: number;
  /** Compatibility score 0–100. */
  compatibility?: number;
  /** Interest tags shown as chips. */
  interests?: string[];
  /** Profile prompts. */
  prompts?: ProfilePromptData[];
  /** "Active now". */
  online?: boolean;
  /** Verified profile. */
  verified?: boolean;
  /** Job / school line. */
  headline?: string;
}

export type ProfileCardVariant = 'full' | 'compact';

export interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The profile to render. */
  profile?: ProfileCardData;
  /** `full` (default) shows photos, bio, prompts; `compact` is a summary row. */
  variant?: ProfileCardVariant;
  /** Show the built-in like/pass action row. */
  showActions?: boolean;
  /** Fires a swipe action from the built-in row. */
  onAction?: (action: SwipeAction) => void;
  /** Fires when an interest chip is clicked. */
  onClickInterest?: (interest: string) => void;
  /** Loading skeleton. */
  loading?: boolean;
  /** Empty-state copy when no profile is supplied. */
  emptyLabel?: string;
}

/**
 * A full profile summary — the web parity of the native profile card. Composes the
 * dating blocks (photo carousel, distance badge, compatibility meter, prompts,
 * interest chips, and an optional action row) into one card. `compact` collapses
 * to a headline row for lists. Token classes only — no literal colors. Explicit
 * loading and empty states; array access is guarded.
 */
export const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(function ProfileCard(
  { profile, variant = 'full', showActions = false, onAction, onClickInterest, loading = false, emptyLabel = 'No profile to show', className, ...rest },
  ref
) {
  if (loading) {
    return (
      <Card ref={ref} className={cn('overflow-hidden p-0', className)} {...rest}>
        <div className="aspect-[4/5] w-full bg-neutral-200" />
        <div className="flex flex-col gap-sm p-md">
          <div className="h-4 w-1/2 rounded-[var(--xen-radius-sm)] bg-neutral-200" />
          <div className="h-3 w-4/5 rounded-[var(--xen-radius-sm)] bg-neutral-200" />
        </div>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card ref={ref} className={cn('flex flex-col items-center gap-xs p-lg text-center', className)} aria-label={emptyLabel} {...rest}>
        <span aria-hidden="true" className="text-2xl">👤</span>
        <span className="text-sm text-muted">{emptyLabel}</span>
      </Card>
    );
  }

  const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
  const photos = profile.photos ?? [];
  const interests = profile.interests ?? [];
  const prompts = profile.prompts ?? [];

  const nameRow = (
    <div className="flex items-center gap-xs">
      <span className="text-xl font-bold text-on-surface">{title}</span>
      {profile.verified ? <Icon glyph="✔" size="sm" color="primary" aria-label="Verified" /> : null}
      {profile.online ? (
        <span className="flex items-center gap-1" aria-label="Active now">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-success" />
          <span className="text-xs text-success">Active</span>
        </span>
      ) : null}
    </div>
  );

  if (variant === 'compact') {
    return (
      <Card ref={ref} className={cn('p-md', className)} {...rest}>
        <div className="flex items-center gap-md">
          <div className="w-16 shrink-0">
            <PhotoCarousel photos={photos.slice(0, 1)} ratio="square" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-xs">
            {nameRow}
            {profile.headline ? <span className="truncate text-sm text-muted">{profile.headline}</span> : null}
            <div className="flex items-center gap-sm">
              {profile.distanceKm != null ? <DistanceBadge distance={profile.distanceKm} /> : null}
              {profile.compatibility != null ? (
                <CompatibilityMeter score={profile.compatibility} variant="compact" showValue />
              ) : null}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card ref={ref} className={cn('overflow-hidden p-0', className)} {...rest}>
      <PhotoCarousel photos={photos} ratio="portrait" rounded={false} />
      <div className="flex flex-col gap-md p-md">
        <div className="flex flex-col gap-xs">
          {nameRow}
          {profile.headline ? <span className="text-sm text-muted">{profile.headline}</span> : null}
          {profile.distanceKm != null ? (
            <div className="flex items-center gap-sm">
              <DistanceBadge distance={profile.distanceKm} />
            </div>
          ) : null}
        </div>

        {profile.compatibility != null ? <CompatibilityMeter score={profile.compatibility} /> : null}

        {profile.bio ? <p className="text-base leading-relaxed text-on-surface">{profile.bio}</p> : null}

        {interests.length > 0 ? (
          <div className="flex flex-wrap gap-xs">
            {interests.map((interest, i) => (
              <IcebreakerChip key={`${interest}-${i}`} label={interest} variant="soft" size="sm" onClick={onClickInterest} />
            ))}
          </div>
        ) : null}

        {prompts.length > 0 ? (
          <div className="flex flex-col gap-sm">
            {prompts.map((p) => (
              <ProfilePrompt key={p.id} prompt={p.prompt} answer={p.answer} variant="card" />
            ))}
          </div>
        ) : null}

        {showActions ? (
          <div className="mt-xs">
            <LikePassButtons actions={['pass', 'superlike', 'like']} onAction={onAction} />
          </div>
        ) : null}
      </div>
    </Card>
  );
});
