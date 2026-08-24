import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Rating, Badge, PriceTag } from '../primitives';
import { appearanceStyle } from '../primitives/internal/appearance';
import { usePressScale } from '../primitives/internal/motion';
import type { HotelCardProps } from './HotelCard';

/**
 * Drop-in alternate design for {@link HotelCard} — same props, different look.
 *
 * V3 is a **horizontal media-left row**: a square thumbnail on the left, the
 * name / location / rating stacked in the middle, and the nightly price pinned
 * to the trailing edge — a compact list row for dense search results. Honours
 * `appearance`. Identical `HotelCardProps`.
 */
export type HotelCardV3Props = HotelCardProps;

export function HotelCardV3({
  name,
  location,
  rating,
  reviewCount,
  priceCents,
  currency = 'USD',
  tags = [],
  compareAtCents,
  appearance = 'classic',
  onPress,
  style,
}: HotelCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();

  const body = (
    <View
      style={[
        appearanceStyle(appearance, colors, tokens),
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          width: 96,
          height: 96,
          borderRadius: tokens.radius.md,
          backgroundColor: colors.border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: tokens.typography.scale['2xl'], color: colors.muted }}>🏨</Text>
      </View>

      <View style={{ flex: 1, gap: 4, alignSelf: 'stretch', justifyContent: 'center' }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {name}
        </Text>
        {location ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {location}
          </Text>
        ) : null}
        {typeof rating === 'number' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Rating value={rating} size="sm" />
            {typeof reviewCount === 'number' ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>({reviewCount})</Text>
            ) : null}
          </View>
        ) : null}
        {tags.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
            {tags.slice(0, 2).map((t, i) => (
              <Badge key={`${t}-${i}`} tone="neutral">
                {t}
              </Badge>
            ))}
          </View>
        ) : null}
      </View>

      {typeof priceCents === 'number' ? (
        <View style={{ alignItems: 'flex-end', justifyContent: 'center', gap: 2 }}>
          <PriceTag cents={priceCents} currency={currency} compareAtCents={compareAtCents} size="md" />
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>/ night</Text>
        </View>
      ) : null}
    </View>
  );

  if (!onPress) return body;
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${name}${location ? `, ${location}` : ''}`}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
