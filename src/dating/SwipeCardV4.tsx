import * as React from 'react';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import { ACTION_SKIN } from './LikePassButtonsV4';
import type { DeckDecision } from './deck-v4';
import {
  ACTION_TONE,
  PHOTO_INK,
  PHOTO_SCRIM,
  PLACEHOLDER_CLASS,
  TONE_INK,
  spokenLine,
} from './internal/profile-v4';
import { DistanceBadgeV4 } from './DistanceBadgeV4';
import type { SwipeCardProps, SwipeOverlay } from './SwipeCard';

export interface SwipeCardV4Props extends SwipeCardProps {
  /**
   * The card's aspect ratio as `width / height`. Overrides `variant`'s own.
   *
   * The native twin has always had it; the web twin was locked to 3:4 and 16:9
   * with no way out, so a deck built to a different frame could not use the
   * same card on both platforms.
   */
  aspectRatio?: number;
  /** Name for the verified mark. Default `'Verified'`. */
  verifiedLabel?: string;
  /** Override the words on the decision stamps. Defaults `LIKE` / `NOPE` / `SUPER`. */
  decisionLabels?: Partial<Record<DeckDecision, string>>;
}

/**
 * A drag overlay named as a *decision*, so `decisionLabels` is keyed by the
 * thing the deck emits rather than by the thing the card draws. `'nope'` and
 * `'pass'` were two names for one outcome across the two files.
 */
export const OVERLAY_DECISION: Record<SwipeOverlay, DeckDecision> = {
  like: 'like',
  nope: 'pass',
  superlike: 'superlike',
};

/**
 * Where each stamp lands and which way it leans.
 *
 * Per overlay, and that is the point: native positioned all three at
 * `left: spacing.lg` unconditionally, so **NOPE was drawn in the LIKE corner**
 * — the one place a user glances at to check they are about to do the thing
 * they meant to. The lean is mirrored with the side (a stamp on the right
 * leans right) and `superlike` sits square in the middle, so the three read as
 * one set on both platforms.
 */
const STAMP_PLACE: Record<SwipeOverlay, { position: string; rotate: number }> = {
  like: { position: 'left-lg', rotate: -12 },
  nope: { position: 'right-lg', rotate: 12 },
  superlike: { position: 'left-1/2 -translate-x-1/2', rotate: 0 },
};

const STAMP_TEXT: Record<SwipeOverlay, string> = {
  like: 'LIKE',
  nope: 'NOPE',
  superlike: 'SUPER',
};

export interface SwipeStampV4Props {
  /** Which decision is being previewed. */
  overlay: SwipeOverlay;
  /** Drag progress, 0–1. Defaults to 1. */
  opacity?: number;
  /** Override the stamp words. */
  labels?: Partial<Record<DeckDecision, string>>;
}

/**
 * A decision stamp, on its own.
 *
 * It is a separate export because `SwipeDeckV4` renders it as a **sibling** of
 * whatever `renderCard` returned: the base computed the overlay and its
 * progress and then threw both away in that branch, so a caller who supplied
 * their own card lost the LIKE/NOPE feedback entirely and had no way to draw
 * it. Native already stacked them as siblings; this is what lets web do the
 * same.
 *
 * The fill is `ACTION_SKIN`'s — the same tint and ring the matching button in
 * `LikePassButtonsV4` wears — so the stamp a drag reveals and the button that
 * commits it are demonstrably one action. `like` and `pass` are no longer
 * `success` and `danger`.
 */
export function SwipeStampV4({ overlay, opacity = 1, labels }: SwipeStampV4Props): React.ReactElement {
  const decision = OVERLAY_DECISION[overlay];
  const tone = ACTION_TONE[decision] ?? 'neutral';
  const place = STAMP_PLACE[overlay];
  return (
    <div
      aria-hidden="true"
      style={{
        opacity: Math.max(0, Math.min(1, opacity)),
        transform: `rotate(${place.rotate}deg)`,
      }}
      className={cn(
        'pointer-events-none absolute top-lg rounded-[var(--xen-radius-md)]',
        'border-[length:var(--xen-space-xs)] px-sm py-xs',
        'text-xl font-bold tracking-widest',
        ACTION_SKIN[tone].fill,
        ACTION_SKIN[tone].ring,
        TONE_INK[tone],
        place.position
      )}
    >
      {labels?.[decision] ?? STAMP_TEXT[overlay]}
    </div>
  );
}

/**
 * **V4 swipe card** — the web twin of the native `SwipeCardV4`, same props as
 * {@link SwipeCard} plus `aspectRatio`, `verifiedLabel` and `decisionLabels`.
 *
 * ## Five changes
 *
 * 1. **The photo's scrim stops inverting.** `from-neutral-950` reads as "the
 *    darkest step", but the web ramp *mirrors* under `[data-theme="dark"]`, so
 *    in a dark theme it resolved to the **lightest** step: the bottom of every
 *    profile photo washed near-white and took the white name, tagline and
 *    distance on it with it. A photograph does not follow the scheme, so its
 *    scrim must not either — `PHOTO_SCRIM` and `PHOTO_INK` are fixed in both.
 * 2. **The card is not a picture.** It reported `role="img"` with a name of
 *    `"Ada, 29. Loves ferries"` — so the verified mark, the online state and
 *    the distance, all drawn on the card, were removed from the accessibility
 *    tree by that role and absent from the name that replaced them. It is a
 *    `group`; the name carries the marks the glyphs stand for, and the distance
 *    badge keeps its own correctly formatted label rather than being flattened
 *    into a number without a unit.
 * 3. **Liking and passing are not success and failure.** See
 *    {@link SwipeStampV4}.
 * 4. **NOPE is drawn in the NOPE corner** — see {@link STAMP_PLACE} — and the
 *    stamp is a shared component, so the two twins cannot drift on its fill,
 *    its lean or its side.
 * 5. **The frame is the caller's.** See `aspectRatio`.
 */
export const SwipeCardV4 = React.forwardRef<HTMLDivElement, SwipeCardV4Props>(function SwipeCardV4(
  {
    profile,
    variant = 'photo',
    overlay = null,
    overlayOpacity,
    aspectRatio,
    verifiedLabel = 'Verified',
    decisionLabels,
    className,
    style,
    ...rest
  },
  ref
) {
  const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;

  // One name that CONTAINS what the glyphs mean, rather than a name that
  // silently replaced them.
  const label = spokenLine([
    title,
    profile.tagline,
    profile.verified ? verifiedLabel : null,
    profile.online ? 'Active now' : null,
  ]);

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      className={cn(
        'relative w-full overflow-hidden rounded-[var(--xen-radius-lg)] border border-border',
        aspectRatio == null && (variant === 'compact' ? 'aspect-[16/9]' : 'aspect-[3/4]'),
        className
      )}
      style={aspectRatio != null ? { aspectRatio: String(aspectRatio), ...style } : style}
      {...rest}
    >
      <span aria-hidden="true" className={cn('absolute inset-0', PLACEHOLDER_CLASS)} />

      {profile.photoUri ? (
        <img
          src={profile.photoUri}
          alt=""
          className="relative h-full w-full object-cover"
        />
      ) : (
        <div className="relative flex h-full w-full items-center justify-center">
          <span aria-hidden="true" className="text-3xl">
            🙂
          </span>
        </div>
      )}

      {/* Bottom scrim + info. Fixed colours, deliberately: see change 1. */}
      <div
        style={{ backgroundImage: `linear-gradient(to top, ${PHOTO_SCRIM}, transparent)` }}
        className="absolute inset-x-0 bottom-0 flex flex-col gap-xs p-md"
      >
        <div className="flex items-center gap-xs">
          <span style={{ color: PHOTO_INK }} className="text-xl font-bold">
            {title}
          </span>
          {profile.verified ? <IconV4 glyph="✔" size="sm" style={{ color: PHOTO_INK }} /> : null}
          {profile.online ? (
            <span aria-hidden="true" className="h-sm w-sm rounded-full bg-success" />
          ) : null}
        </div>
        {profile.tagline ? (
          <span style={{ color: PHOTO_INK }} className="line-clamp-2 text-sm">
            {profile.tagline}
          </span>
        ) : null}
        {profile.distanceKm != null ? (
          <span className="self-start">
            <DistanceBadgeV4 distance={profile.distanceKm} unit="km" />
          </span>
        ) : null}
      </div>

      {overlay ? (
        <SwipeStampV4 overlay={overlay} opacity={overlayOpacity ?? 1} labels={decisionLabels} />
      ) : null}
    </div>
  );
});
