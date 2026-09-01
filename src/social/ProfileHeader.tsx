import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';

/** One profile stat (posts / followers / following) rendered as a frosted tile. */
export interface ProfileStat {
  /** Short caption under the value (e.g. `Followers`). */
  label: string;
  /** Pre-formatted display value (e.g. `12.4k`). */
  value: string;
}

export interface ProfileHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Display name shown large in near-white ink over the gradient. */
  name: string;
  /** `@handle` without the leading `@`; shown as the soft-ink subtitle. */
  handle?: string;
  /** Avatar image URL; falls back to initials from `name`. */
  avatarUrl?: string;
  /** Show the primary verified tick beside the name. */
  verified?: boolean;
  /** Short bio / tagline shown under the identity line. */
  bio?: string;
  /** Stats rendered as a row of frosted tiles (posts / followers / following). */
  stats?: readonly ProfileStat[];
  /** Optional cover image URL layered under the brand gradient scrim. */
  coverUrl?: string;
  /** Owner mode: when `true`, renders an "Edit profile" CTA instead of Follow. */
  owner?: boolean;
  /** Current follow state (drives the Follow/Following CTA label + style). */
  following?: boolean;
  /** Fires when the Follow / Following CTA is pressed (visitor mode). */
  onFollow?: () => void;
  /** Fires when the "Edit profile" CTA is pressed (owner mode). */
  onEditProfile?: () => void;
}

/**
 * ProfileHeader — the profile-page hero for the social V4 "feed" line, and one of
 * the module's gradient identity moments. A brand-gradient cover (optionally over
 * a `coverUrl`) carries a large overlapping avatar, the name with a primary
 * verified tick, `@handle` + `bio` in near-white ink, a row of frosted stat tiles
 * (posts / followers / following), and a single CTA — "Edit profile" in `owner`
 * mode, otherwise a Follow / Following toggle. Every color derives from the brand
 * ramp via `--xen-*` classes + gradient utilities (no literals); dark-mode safe.
 */
export const ProfileHeader = React.forwardRef<HTMLDivElement, ProfileHeaderProps>(
  function ProfileHeader(
    { name, handle, avatarUrl, verified = false, bio, stats, coverUrl, owner = false, following = false, onFollow, onEditProfile, className, ...rest },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)]',
          className
        )}
        {...rest}
      >
        {coverUrl ? (
          <img
            src={coverUrl}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
          />
        ) : null}

        <div className="relative flex flex-col gap-[var(--xen-space-md)]">
          <div className="flex items-end justify-between gap-[var(--xen-space-md)]">
            <span className="rounded-full ring-4 ring-primary-50/40">
              <Avatar src={avatarUrl} name={name} size="xl" />
            </span>

            {owner ? (
              <button
                type="button"
                aria-label="Edit profile"
                onClick={onEditProfile}
                className="min-h-[44px] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-lg)] text-sm font-bold text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              >
                Edit profile
              </button>
            ) : (
              <button
                type="button"
                aria-pressed={following}
                aria-label={following ? 'Following' : 'Follow'}
                onClick={onFollow}
                className={cn(
                  'min-h-[44px] rounded-[var(--xen-radius-md)] px-[var(--xen-space-lg)] text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                  following
                    ? 'border border-primary-50/30 bg-primary-50/15 text-primary-50'
                    : 'bg-on-primary text-primary'
                )}
              >
                {following ? 'Following' : 'Follow'}
              </button>
            )}
          </div>

          <div className="flex flex-col gap-[var(--xen-space-xs)]">
            <div className="flex items-center gap-[var(--xen-space-xs)]">
              <h2 className="truncate text-2xl font-extrabold text-primary-50">{name}</h2>
              {verified ? (
                <span aria-label="Verified" className="text-lg text-primary-100">
                  ✓
                </span>
              ) : null}
            </div>
            {handle ? <p className="truncate text-sm font-semibold text-primary-100">@{handle}</p> : null}
            {bio ? <p className="text-sm leading-relaxed text-primary-100">{bio}</p> : null}
          </div>

          {stats && stats.length > 0 ? (
            <div className="flex flex-wrap gap-[var(--xen-space-sm)]">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-1 basis-24 flex-col items-center rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]"
                >
                  <span className="text-lg font-extrabold text-primary-50">{stat.value}</span>
                  <span className="text-xs font-semibold text-primary-100">{stat.label}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);
