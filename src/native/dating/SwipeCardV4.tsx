import * as React from 'react';
import { Animated, Image, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { ACTION_SKIN } from './LikePassButtonsV4';
import { DistanceBadgeV4 } from './DistanceBadgeV4';
import {
  ACTION_TONE,
  PHOTO_INK,
  PHOTO_SCRIM,
  placeholderGround,
  spokenLine,
  toneInk,
} from './internal/profile-v4';
import type { DeckDecision } from '../../dating/deck-v4';
import type { SwipeCardProps, SwipeOverlay } from './SwipeCard';

export interface SwipeCardV4Props extends SwipeCardProps {
  /** Announced beside the name for a verified profile. Default `'Verified'`. */
  verifiedLabel?: string;
  /** Stamp copy per decision. Defaults `LIKE` / `NOPE` / `SUPER`. */
  decisionLabels?: Partial<Record<DeckDecision, string>>;
}

export interface SwipeStampV4Props {
  /** Which stamp to draw. */
  overlay: SwipeOverlay;
  /** 0–1, or the animated value a drag drives it with. Default `1`. */
  opacity?: number | Animated.AnimatedInterpolation<number>;
  /** Stamp copy per decision. */
  labels?: Partial<Record<DeckDecision, string>>;
}

/** The overlay names are the card's; the decisions are the deck's. */
const OVERLAY_DECISION: Record<SwipeOverlay, DeckDecision> = {
  like: 'like',
  nope: 'pass',
  superlike: 'superlike',
};

const STAMP_TEXT: Record<SwipeOverlay, string> = {
  like: 'LIKE',
  nope: 'NOPE',
  superlike: 'SUPER',
};

/**
 * Where each stamp sits and how far it leans.
 *
 * The base put every stamp at `left: spacing.lg`, so **NOPE was drawn in the
 * LIKE corner** — the one piece of the gesture that tells you which way you
 * are about to throw someone, pointing the wrong way. Positions and rotations
 * mirror each other, and match the web twin exactly.
 */
const STAMP_PLACE: Record<SwipeOverlay, { side: 'left' | 'right' | 'center'; rotate: string }> = {
  like: { side: 'left', rotate: '-12deg' },
  nope: { side: 'right', rotate: '12deg' },
  superlike: { side: 'center', rotate: '0deg' },
};

/** "Active now" — the word beside the presence dot, so it is not colour alone. */
const ONLINE_WORD = 'Active now';

/**
 * The LIKE / NOPE / SUPER stamp, on its own.
 *
 * It exists as a component because a caller who supplies `renderCard` to
 * `SwipeDeckV4` gets their own card and would otherwise lose the drag feedback
 * entirely; the deck renders these as **siblings** of whatever `renderCard`
 * returned, so a custom card keeps its stamps. The same component exists on
 * the web twin, drawing the same skin at the same rotation.
 *
 * The fill is `ACTION_SKIN`'s — the same tint and ring the matching button in
 * `LikePassButtonsV4` wears — so the stamp a drag reveals and the button that
 * commits it are demonstrably one action. `like` and `pass` are no longer
 * `success` and `danger`.
 */
export function SwipeStampV4({
  overlay,
  opacity = 1,
  labels,
}: SwipeStampV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  const decision = OVERLAY_DECISION[overlay];
  const tone = ACTION_TONE[decision] ?? 'neutral';
  const skin = ACTION_SKIN(theme, tone);
  const place = STAMP_PLACE[overlay];

  return (
    <Animated.View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{
        position: 'absolute',
        top: tokens.spacing.lg,
        left: place.side === 'left' ? tokens.spacing.lg : undefined,
        right: place.side === 'right' ? tokens.spacing.lg : undefined,
        alignSelf: place.side === 'center' ? 'center' : undefined,
        opacity: typeof opacity === 'number' ? Math.max(0, Math.min(1, opacity)) : opacity,
        transform: [{ rotate: place.rotate }],
        borderWidth: tokens.spacing.xs,
        borderColor: skin.ring,
        borderRadius: tokens.radius.md,
        paddingVertical: tokens.spacing.xs,
        paddingHorizontal: tokens.spacing.sm,
        // Opaque, so the stamp does not take the colour of the photo under it.
        backgroundColor: skin.ground,
      }}
    >
      <TextV4
        size="xl"
        weight="bold"
        allowFontScaling={false}
        style={{ color: toneInk(theme, tone), letterSpacing: 2 }}
      >
        {labels?.[decision] ?? STAMP_TEXT[overlay]}
      </TextV4>
    </Animated.View>
  );
}

/**
 * **V4 swipe card** — same props as {@link SwipeCard} plus `verifiedLabel` and
 * `decisionLabels`.
 *
 * ## Five changes
 *
 * 1. **The bottom of the photo is dark in a dark theme.** The scrim was
 *    `withAlpha(colors.onSurface, 0.55)` and the text on it was
 *    `colors.surface` — both of which *invert*. On a dark scheme the scrim
 *    washed near-white and took the near-white name with it, so the one line
 *    identifying the person was unreadable on every card. A photograph does
 *    not follow the scheme, so its scrim does not either: `PHOTO_SCRIM` and
 *    `PHOTO_INK` are fixed in both.
 * 2. **NOPE is in the NOPE corner**, and a stamp is not a status — see
 *    {@link STAMP_PLACE} and {@link SwipeStampV4}. LIKE was `success` and NOPE
 *    `danger`, the two slots that mean something has gone wrong, on the two
 *    ordinary halves of a swipe.
 * 3. **The card is not one `role="img"`.** The base's label was the name and
 *    tagline, and being an image node it *swallowed* the distance badge, the
 *    verified mark and the presence dot — three facts a sighted user could see
 *    and a reader could not reach. The identity line is one spoken group that
 *    contains the verified and presence words.
 * 4. **The distance badge stays its own element** rather than being folded
 *    into that name. `DistanceBadgeV4` already builds a correctly rounded,
 *    unit-bearing phrase; repeating that formatting inside the card's label
 *    would make two places that decide how far away someone is.
 * 5. **A missing photo has a ground, not a `border`.** `border` is a hairline
 *    token; the placeholder is the shared skeleton ground.
 */
export function SwipeCardV4({
  profile,
  variant = 'photo',
  overlay = null,
  overlayOpacity,
  aspectRatio = 3 / 4,
  verifiedLabel = 'Verified',
  decisionLabels,
  style,
}: SwipeCardV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;

  return (
    <View
      style={[
        {
          width: '100%',
          aspectRatio: variant === 'compact' ? 16 / 9 : aspectRatio,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          backgroundColor: placeholderGround(theme),
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {profile.photoUri ? (
        <Image
          accessible
          accessibilityRole="image"
          accessibilityLabel={title}
          source={{ uri: profile.photoUri }}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <TextV4 size="3xl" allowFontScaling={false}>
            🙂
          </TextV4>
        </View>
      )}

      {/* Bottom scrim + info. Fixed colours: this is over a photograph. */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: tokens.spacing.md,
          gap: tokens.spacing.xs,
          backgroundColor: PHOTO_SCRIM,
        }}
      >
        <View
          accessible
          accessibilityRole="header"
          accessibilityLabel={spokenLine([
            title,
            profile.verified ? verifiedLabel : null,
            profile.online ? ONLINE_WORD : null,
          ])}
          style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
        >
          <TextV4 size="xl" weight="bold" style={{ color: PHOTO_INK }}>
            {title}
          </TextV4>
          {profile.verified ? (
            <TextV4 size="sm" allowFontScaling={false} style={{ color: PHOTO_INK }}>
              ✔
            </TextV4>
          ) : null}
          {profile.online ? (
            <View
              style={{
                width: tokens.spacing.sm,
                height: tokens.spacing.sm,
                borderRadius: tokens.spacing.sm / 2,
                backgroundColor: colors.success,
              }}
            />
          ) : null}
        </View>

        {profile.tagline ? (
          <TextV4 size="sm" numberOfLines={2} style={{ color: PHOTO_INK }}>
            {profile.tagline}
          </TextV4>
        ) : null}

        {profile.distanceKm != null ? (
          <View style={{ alignSelf: 'flex-start' }}>
            <DistanceBadgeV4 distance={profile.distanceKm} unit="km" variant="soft" />
          </View>
        ) : null}
      </View>

      {overlay ? (
        <SwipeStampV4 overlay={overlay} opacity={overlayOpacity ?? 1} labels={decisionLabels} />
      ) : null}
    </View>
  );
}
