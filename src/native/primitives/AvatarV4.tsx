import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { mirrorStep, monogramStep } from '../../primitives/internal/v4-depth';
import { MONOGRAM_STEP, avatarDiameters, initialsOf } from './internal/identity-v4';
import { ensureContrast } from '../../theme/color';
import { MIN_CONTRAST } from '../../theme/compile';
import type { AvatarProps, AvatarShape, AvatarSize, AvatarStatus } from './Avatar';

export type { AvatarProps as AvatarV4Props, AvatarShape, AvatarSize, AvatarStatus };

const STATUS_SLOT: Record<AvatarStatus, keyof SemanticColors> = {
  online: 'success',
  away: 'warn',
  busy: 'danger',
  offline: 'muted',
};

/** Spoken form of the presence state, so the dot is never colour-only (§46). */
const STATUS_LABEL: Record<AvatarStatus, string> = {
  online: 'Online',
  away: 'Away',
  busy: 'Busy',
  offline: 'Offline',
};

/** Where a circle's 45° edge sits, as a fraction of the diameter. */
const CIRCLE_INSET = (1 - Math.SQRT1_2) / 2;

/**
 * **V4 avatar** — same props as {@link Avatar}, a different design line.
 *
 * The avatar is the single most-repeated component in a product — a roster, a
 * comment thread, an assignee column, a header — so every flaw in it is a flaw
 * the user meets a hundred times a day. Four things change:
 *
 * 1. **A derived monogram ground.** The base avatar paints every initials
 *    fallback on `colors.primary`, which makes a list of twelve people twelve
 *    identical brand-coloured discs — the accent is doing no work and the
 *    faces are indistinguishable. V4 derives the ground from the **name**
 *    (`monogramStep`, an FNV hash into the neutral ramp), so the same person is
 *    the same colour on every screen and their neighbour is not. Neutral, not
 *    a rainbow: §35.5 and §35.8 both say a list of twenty accents is noise.
 *    The step is mirrored for a dark page — `tokens.ramps` carries the LIGHT
 *    orientation in both schemes, so `neutral[200]` is a near-white on a
 *    near-black page — and the monogram is re-measured against whatever ground
 *    came out.
 * 2. **A fallback for "no name either".** `?` is what the base renders with
 *    nothing to go on, and a question mark reads as an error, not as an
 *    unknown person. V4 draws a silhouette instead — two token-coloured
 *    shapes, so it tints with the theme rather than borrowing a platform
 *    emoji's own colours.
 * 3. **A ring that is a halo, not a crop.** The base ring is a border ON the
 *    portrait, so switching it on eats two pixels of someone's face and the
 *    ring touches the image. V4 insets the portrait and leaves a `surface` gap
 *    between it and the ring, which is how a ring is drawn when it means
 *    something. Its colour is contrast-checked at 3:1 — a ring is a UI
 *    boundary, judged at 3:1, not text.
 * 4. **A status dot that is not only a colour.** Four presence states told
 *    apart by hue alone fail §46 outright — and `busy` vs `offline` is exactly
 *    the pair a red-green viewer cannot separate. V4 names the state for a
 *    screen reader and contrast-checks the dot at 3:1 against `surface` rather
 *    than trusting the raw semantic slot, which is only ever guaranteed
 *    against its own on-pair. Its position follows the silhouette as well: on
 *    a circle the dot's centre sits on the 45° point of the arc, which is
 *    where the bounding box's corner happens to be at `md` and is not at `xl`.
 *
 * No gradient anywhere. §35.11 keeps those for the hero and the one primary
 * action, and a gradient behind someone's face is decoration on a data point.
 */
export function AvatarV4({
  src,
  name,
  size = 'md',
  shape = 'circle',
  status,
  ring = false,
  style,
}: AvatarProps): React.ReactElement {
  const { colors, tokens, scheme } = useXenitionTheme();
  const spacing = tokens.spacing;

  // Shared with `AvatarGroupV4`, which has to line its overflow chip up with
  // these faces to the pixel.
  const d = avatarDiameters(spacing)[size];
  const corner = shape === 'circle' ? d / 2 : shape === 'rounded' ? tokens.radius.md : tokens.radius.sm;

  // The halo: a ring, then a gap of the page colour, then the portrait. Both
  // are hairlines — a thick ring is a frame, and a frame competes with a face.
  const ringWidth = ring ? 2 : 0;
  const ringGap = ring ? spacing.xs / 2 : 0;
  const inner = d - 2 * (ringWidth + ringGap);
  const innerCorner = shape === 'circle' ? inner / 2 : Math.max(corner - ringWidth - ringGap, 0);

  const statusColor = status ? colors[STATUS_SLOT[status]] : undefined;
  // A ring is a boundary, not text: 3:1 is the bar it has to clear.
  // A status ring answers in the status colour; a plain one takes the same
  // `ring` slot every focus indicator in the kit takes, which IS `primary`
  // pulled to the 3:1 non-text minimum — the identical sum, computed once.
  const ringColor =
    statusColor != null ? ensureContrast(statusColor, colors.surface, 3) : colors.ring;

  // Deterministic from the name, mirrored for the active scheme so the ground
  // is dark on a dark page. `tokens.ramps` does NOT resolve per scheme.
  const step = monogramStep(name);
  const ground = tokens.ramps.neutral[scheme === 'dark' ? mirrorStep(step) : step];
  const ink = ensureContrast(colors.onSurface, ground, MIN_CONTRAST);

  const mono = initialsOf(name);
  const dotSize = size === 'xs' || size === 'sm' ? spacing.sm : size === 'md' ? spacing.sm + spacing.xs : spacing.md;
  // On a circle the corner of the box is empty space; the silhouette's edge is
  // at 45°, which is where a presence dot belongs.
  const dotInset = shape === 'circle' ? Math.max(d * CIRCLE_INSET - dotSize / 2, 0) : 0;

  return (
    <View
      accessible={name !== undefined}
      accessibilityLabel={name}
      style={[{ width: d, height: d }, style]}
    >
      <View
        style={{
          width: d,
          height: d,
          borderRadius: corner,
          borderWidth: ringWidth,
          borderColor: ring ? ringColor : 'transparent',
          padding: ringGap,
          backgroundColor: colors.surface,
        }}
      >
        <View
          style={{
            width: inner,
            height: inner,
            borderRadius: innerCorner,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ground,
          }}
        >
          {src !== undefined ? (
            <Image source={{ uri: src }} style={{ width: inner, height: inner }} resizeMode="cover" />
          ) : mono !== '' ? (
            <Text
              style={{
                color: ink,
                fontSize: tokens.typography.scale[MONOGRAM_STEP[size]],
                fontFamily: tokens.typography.fontBody,
                fontWeight: '600',
              }}
            >
              {mono}
            </Text>
          ) : (
            <Silhouette diameter={inner} color={ink} />
          )}
        </View>
      </View>
      {status !== undefined ? (
        <View
          accessible
          accessibilityRole="image"
          accessibilityLabel={STATUS_LABEL[status]}
          style={{
            position: 'absolute',
            right: dotInset,
            bottom: dotInset,
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: ensureContrast(statusColor as string, colors.surface, 3),
            borderWidth: 2,
            // The notch is what keeps the dot legible over a dark photo.
            borderColor: colors.surface,
          }}
        />
      ) : null}
    </View>
  );
}

/**
 * The "we know nothing about this person" mark: a head and a pair of
 * shoulders, drawn from two views so the whole thing takes the theme's ink
 * instead of a platform emoji's own palette. Held back to ~40% opacity —
 * a placeholder that shouts is a placeholder competing with real faces.
 */
function Silhouette({ diameter, color }: { diameter: number; color: string }): React.ReactElement {
  const head = diameter * 0.3;
  const shoulders = diameter * 0.62;
  return (
    <View style={{ alignItems: 'center', width: diameter, height: diameter, opacity: 0.4 }}>
      <View
        style={{
          marginTop: diameter * 0.2,
          width: head,
          height: head,
          borderRadius: head / 2,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          marginTop: diameter * 0.06,
          width: shoulders,
          height: shoulders,
          borderRadius: shoulders / 2,
          backgroundColor: color,
        }}
      />
    </View>
  );
}
