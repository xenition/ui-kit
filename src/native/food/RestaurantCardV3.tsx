import * as React from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { Rating } from '../primitives/Rating';
import { withAlpha } from '../primitives/internal/color';
import type { RestaurantCardProps, RestaurantOpenState } from './RestaurantCard';

/** Drop-in for {@link RestaurantCard}: identical props, a distinct design. */
export type RestaurantCardV3Props = RestaurantCardProps;

const OPEN_LABEL: Record<RestaurantOpenState, string> = {
  open: 'Open',
  closed: 'Closed',
  busy: 'Busy',
};

/**
 * RestaurantCard, alternate design **V3** — a *compact list row*. Borderless
 * and dense: a small rounded thumbnail, then a two-line stack (name with an
 * inline status dot, meta + rating + ETA), meant to be repeated tightly in a
 * search or nearby list. No hero, no card chrome — the inverse of V2's cover.
 * Availability is a coloured dot *and* a word (never colour alone). Same props.
 */
export function RestaurantCardV3({
  name,
  cuisine,
  rating,
  ratingCount,
  priceLevel,
  etaText,
  feeText,
  imageUrl,
  openState = 'open',
  onPress,
  style,
}: RestaurantCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const dimmed = openState !== 'open';
  const dotColor = openState === 'open' ? colors.success : openState === 'busy' ? colors.warnText : colors.muted;

  const metaBits: string[] = [];
  if (priceLevel) metaBits.push('$'.repeat(Math.min(4, Math.max(1, priceLevel))));
  if (cuisine) metaBits.push(cuisine);

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      gap: tokens.spacing.md,
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderBottomWidth: 1,
      borderColor: colors.border,
      paddingVertical: tokens.spacing.sm,
      opacity: dimmed ? 0.75 : 1,
    },
    style,
  ];

  const media = (
    <View
      style={{
        width: 48,
        height: 48,
        borderRadius: tokens.radius.md,
        overflow: 'hidden',
        backgroundColor: tokens.ramps.neutral[100],
      }}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          accessible
          accessibilityLabel={name}
          resizeMode="cover"
          style={{ width: '100%', height: '100%', opacity: dimmed ? 0.7 : 1 }}
        />
      ) : null}
    </View>
  );

  const body = (
    <View style={{ flex: 1, gap: 2 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <View style={{ width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: dotColor }} />
        <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {name}
        </Text>
        {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Text numberOfLines={1} style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {[OPEN_LABEL[openState], ...metaBits, etaText, feeText]
            .concat(typeof ratingCount === 'number' ? [`(${ratingCount})`] : [])
            .filter(Boolean)
            .join(' · ')}
        </Text>
      </View>
    </View>
  );

  const inner = (
    <>
      {media}
      {body}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${name}${cuisine ? `, ${cuisine}` : ''}, ${OPEN_LABEL[openState]}`}
        onPress={onPress}
        style={({ pressed }) => [
          containerStyle,
          { opacity: pressed ? 0.9 : dimmed ? 0.75 : 1, backgroundColor: pressed ? withAlpha(colors.primary, 0.04) : 'transparent' },
        ]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{inner}</View>;
}
