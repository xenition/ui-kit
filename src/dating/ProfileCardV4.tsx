import * as React from 'react';
import { cn } from '../primitives/cn';
import { CardV4 } from '../primitives/CardV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { IconV4 } from '../primitives/IconV4';
import { PLACEHOLDER_CLASS } from './internal/profile-v4';
import { CompatibilityMeterV4 } from './CompatibilityMeterV4';
import { DistanceBadgeV4 } from './DistanceBadgeV4';
import { IcebreakerChipV4 } from './IcebreakerChipV4';
import { LikePassButtonsV4 } from './LikePassButtonsV4';
import { PhotoCarouselV4 } from './PhotoCarouselV4';
import { ProfilePromptV4 } from './ProfilePromptV4';
import type { ProfileCardProps } from './ProfileCard';

export interface ProfileCardV4Props extends ProfileCardProps {
  /** Name for the loading card. Default `'Loading profile'`. */
  loadingLabel?: string;
}

/** 64 — the compact thumbnail, `2xl + md`. */
const THUMB_CLASS = 'w-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))]';

/**
 * **V4 profile card** — the web twin of the native `ProfileCardV4`, same props
 * as {@link ProfileCard} plus `loadingLabel`.
 *
 * `onClickInterest` is the web spelling of native's `onPressInterest`; that is
 * the one permitted split in the twin contract, and both names mean the same
 * callback with the same argument.
 *
 * ## Four changes
 *
 * 1. **A card nobody can press does not look pressable.** Every state used the
 *    same `Card`, and the two twins picked different variants for it, so a
 *    static profile summary carried a hover raise and an affordance it had no
 *    handler for. The variant follows the presence of a click handler, and the
 *    component does not fabricate a `role="button"` around a `<div>` to make up
 *    the difference — a caller who wants a pressable profile wraps it in one.
 * 2. **The name is a heading.** A profile card is the top of a page's content
 *    far more often than it is a row, and its name was an anonymous `<span>`,
 *    so the card had no structure a reader could jump to.
 * 3. **Loading and empty are announced and shaped.** The skeleton was three
 *    `bg-neutral-200` blocks — a ramp step, a near-white slab in dark mode —
 *    with nothing telling assistive tech that anything was happening; empty was
 *    an emoji and a line of `muted`, a decorative slot used as text.
 * 4. **Its parts are the V4 parts**, so the interest chips clear 44 (they were
 *    rendered here at `sm`, around 22px, which is where most of the module's
 *    undersized targets actually lived), the distance badge honours its
 *    `variant`, the meter reports a value and the photo pager has visible
 *    controls. The compact thumbnail asks for `showControls={false}` — chevrons
 *    on a 64px square are decoration, and the row is not a pager.
 */
export const ProfileCardV4 = React.forwardRef<HTMLDivElement, ProfileCardV4Props>(
  function ProfileCardV4(
    {
      profile,
      variant = 'full',
      showActions = false,
      onAction,
      onClickInterest,
      loading = false,
      emptyLabel = 'No profile to show',
      loadingLabel = 'Loading profile',
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const pressable = onClick != null;

    if (loading) {
      return (
        <CardV4
          ref={ref}
          variant="outlined"
          padding="none"
          role="status"
          aria-busy="true"
          aria-label={loadingLabel}
          className={cn('overflow-hidden', className)}
          {...rest}
        >
          <span className={cn('block aspect-[4/5] w-full', PLACEHOLDER_CLASS)} />
          <div className="flex flex-col gap-sm p-md">
            <span className={cn('block h-md w-1/2', PLACEHOLDER_CLASS)} />
            <span className={cn('block h-sm w-4/5', PLACEHOLDER_CLASS)} />
          </div>
        </CardV4>
      );
    }

    if (!profile) {
      return (
        <CardV4
          ref={ref}
          variant="outlined"
          padding="none"
          className={className}
          {...rest}
        >
          <EmptyStateV4 icon={<span className="text-2xl">👤</span>} title={emptyLabel} />
        </CardV4>
      );
    }

    const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
    const photos = profile.photos ?? [];
    const interests = profile.interests ?? [];
    const prompts = profile.prompts ?? [];

    const nameRow = (
      <div className="flex items-center gap-xs">
        <h3 className="font-heading text-xl font-bold text-on-surface">{title}</h3>
        {profile.verified ? <IconV4 glyph="✔" size="sm" color="primary" aria-label="Verified" /> : null}
        {profile.online ? (
          <span className="flex items-center gap-xs">
            <span aria-hidden="true" className="h-sm w-sm rounded-full bg-success" />
            <span className="text-xs text-success-text">Active now</span>
          </span>
        ) : null}
      </div>
    );

    if (variant === 'compact') {
      return (
        <CardV4
          ref={ref}
          variant={pressable ? 'interactive' : 'outlined'}
          padding="md"
          onClick={onClick}
          className={className}
          {...rest}
        >
          <div className="flex items-center gap-md">
            <div className={cn('shrink-0', THUMB_CLASS)}>
              <PhotoCarouselV4 photos={photos.slice(0, 1)} ratio="square" showControls={false} />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-xs">
              {nameRow}
              {profile.headline ? (
                <span className="truncate text-sm text-muted-text">{profile.headline}</span>
              ) : null}
              <div className="flex flex-wrap items-center gap-sm">
                {profile.distanceKm != null ? (
                  <DistanceBadgeV4 distance={profile.distanceKm} />
                ) : null}
                {profile.compatibility != null ? (
                  <CompatibilityMeterV4 score={profile.compatibility} variant="compact" showValue />
                ) : null}
              </div>
            </div>
          </div>
        </CardV4>
      );
    }

    return (
      <CardV4
        ref={ref}
        variant={pressable ? 'interactive' : 'outlined'}
        padding="none"
        onClick={onClick}
        className={cn('overflow-hidden', className)}
        {...rest}
      >
        <PhotoCarouselV4 photos={photos} ratio="portrait" rounded={false} />
        <div className="flex flex-col gap-md p-md">
          <div className="flex flex-col gap-xs">
            {nameRow}
            {profile.headline ? (
              <span className="text-sm text-muted-text">{profile.headline}</span>
            ) : null}
            {profile.distanceKm != null ? (
              <div className="flex items-center gap-sm">
                <DistanceBadgeV4 distance={profile.distanceKm} />
              </div>
            ) : null}
          </div>

          {profile.compatibility != null ? (
            <CompatibilityMeterV4 score={profile.compatibility} />
          ) : null}

          {profile.bio ? (
            <p className="text-base leading-relaxed text-on-surface">{profile.bio}</p>
          ) : null}

          {interests.length > 0 ? (
            <div className="flex flex-wrap gap-xs">
              {interests.map((interest, i) => (
                <IcebreakerChipV4
                  key={`${interest}-${i}`}
                  label={interest}
                  variant="soft"
                  size="sm"
                  onClick={onClickInterest}
                />
              ))}
            </div>
          ) : null}

          {prompts.length > 0 ? (
            <div className="flex flex-col gap-sm">
              {prompts.map((p) => (
                <ProfilePromptV4 key={p.id} prompt={p.prompt} answer={p.answer} variant="card" />
              ))}
            </div>
          ) : null}

          {showActions ? (
            <div className="mt-xs">
              <LikePassButtonsV4 onAction={onAction} />
            </div>
          ) : null}
        </div>
      </CardV4>
    );
  }
);
