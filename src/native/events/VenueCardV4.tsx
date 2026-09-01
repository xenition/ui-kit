import * as React from 'react';
import { Image, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { RatingV4 } from '../primitives/RatingV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { placeholderGround, spokenLine, toneInk } from './internal/event-v4';
import type { VenueCardProps } from './VenueCard';

export interface VenueCardV4Props extends VenueCardProps {
  /** The directions control's label. Default `'Directions'`. */
  directionsLabel?: string;
}

/** `Rating`'s own scale. A value outside it draws six filled stars out of five. */
const RATING_MAX = 5;

/**
 * **V4 venue card** — same props as {@link VenueCard} plus `directionsLabel`.
 *
 * ## Five changes
 *
 * 1. **Directions is reachable.** The outer `Pressable` is `accessible` by
 *    default and carried the venue name as its label, so VoiceOver flattened
 *    the card into one leaf and the Directions control did not exist for it —
 *    on a component whose entire point is getting someone to a place. The
 *    card's activation now wraps only the media and text, and Directions is
 *    its **sibling**. (The web twin loses the same control a different way:
 *    the card's `onKeyDown` cancels Enter's default action on the nested
 *    button, so pressing Enter on "Directions" opens the venue instead.)
 * 2. **Directions clears 44 and presses as a state layer**, where it was a
 *    bare text run that dimmed to `opacity: 0.6` — inside M3's disabled band.
 * 3. **The card announces what it shows** — address, rating, capacity and
 *    distance — where `accessibilityLabel={name}` replaced all of it.
 * 4. **The media placeholder survives dark mode.** It was
 *    `tokens.ramps.neutral[100]`, and the native ramps carry their light
 *    orientation in both schemes, so an unloaded venue photo was a near-white
 *    slab on a dark page.
 * 5. **`rating` is clamped** before it reaches `Rating`, which otherwise fills
 *    `Math.round(value)` glyphs and will happily draw seven out of five.
 *
 * **Renders nothing without a `name`.**
 */
export function VenueCardV4({
  name,
  address,
  distance,
  capacity,
  rating,
  imageUrl,
  imageAlt,
  directionsLabel = 'Directions',
  variant = 'default',
  onPress,
  onDirections,
  style,
}: VenueCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const isCompact = variant === 'compact';
  const tap = minTap(tokens.spacing);
  const stars =
    typeof rating === 'number' && Number.isFinite(rating)
      ? Math.max(0, Math.min(RATING_MAX, rating))
      : null;
  const seatsLabel = typeof capacity === 'number' ? `Seats ${capacity}` : null;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      overflow: 'hidden',
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      flexDirection: isCompact ? 'row' : 'column',
    },
    style,
  ];

  const media = !isCompact ? (
    <View
      style={{
        height: tokens.spacing['2xl'] * 2 + tokens.spacing.lg,
        width: '100%',
        backgroundColor: placeholderGround(theme),
      }}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          accessible
          accessibilityLabel={imageAlt ?? name}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <View
          accessible={imageAlt != null}
          accessibilityLabel={imageAlt}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <IconV4 glyph="🗺️" size="2xl" />
        </View>
      )}
    </View>
  ) : null;

  const summary = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flex: 1,
        minWidth: 0,
        gap: tokens.spacing.xs,
        padding: tokens.spacing.md,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      }}
    >
      <TextV4 size="base" weight="bold" tone="onCard" numberOfLines={1}>
        {name}
      </TextV4>
      {address ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <IconV4 glyph="📍" size="sm" color="mutedText" />
          <TextV4 size="sm" tone="mutedText" numberOfLines={1} style={{ flex: 1 }}>
            {address}
          </TextV4>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          flexWrap: 'wrap',
        }}
      >
        {stars != null ? <RatingV4 value={stars} size="sm" showValue /> : null}
        {seatsLabel ? (
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {seatsLabel}
          </TextV4>
        ) : null}
        {distance ? (
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {distance}
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  const spoken = spokenLine([
    name,
    address,
    stars != null ? `${stars} out of ${RATING_MAX}` : null,
    seatsLabel,
    distance,
  ]);

  const activation = onPress ? (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spoken}
      onPress={onPress}
      style={{ flex: isCompact ? 1 : undefined }}
    >
      {({ pressed }) => (
        <View style={{ flexDirection: isCompact ? 'row' : 'column' }}>
          {media}
          {summary(pressed)}
        </View>
      )}
    </Pressable>
  ) : (
    <View
      accessible
      accessibilityLabel={spoken}
      style={{ flexDirection: isCompact ? 'row' : 'column', flex: isCompact ? 1 : undefined }}
    >
      {media}
      {summary(false)}
    </View>
  );

  return (
    <View style={[containerStyle, { flexDirection: 'column' }]}>
      {activation}
      {/* Change 1: a sibling of the card's activation, never a descendant of
          it — that nesting is what made this control unreachable. */}
      {onDirections ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={spokenLine([directionsLabel, name])}
          onPress={onDirections}
          style={({ pressed }) => ({
            alignSelf: 'flex-start',
            justifyContent: 'center',
            minHeight: tap,
            marginHorizontal: tokens.spacing.md,
            marginBottom: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed
              ? pressOver(theme, colors.card, colors.onCard)
              : 'transparent',
          })}
        >
          <TextV4 size="sm" weight="semibold" style={{ color: toneInk(theme, 'primary') }}>
            {directionsLabel}
          </TextV4>
        </Pressable>
      ) : null}
    </View>
  );
}
