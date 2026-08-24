import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Rating, Badge, formatMoney } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale } from '../primitives/internal/motion';
import type { HotelCardProps } from './HotelCard';

/**
 * Drop-in alternate design for {@link HotelCard} — same props, different look.
 *
 * V2 is a **full-bleed cover hero**: the media placeholder fills a tall banner,
 * a rating chip floats top-right, and the name / location / nightly price sit
 * over a bottom scrim (a token-derived translucent wash — no literal color).
 * Amenity chips run in a strip beneath. Identical `HotelCardProps`.
 */
export type HotelCardV2Props = HotelCardProps;

export function HotelCardV2({
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
}: HotelCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();

  const scrimBase = tokens.ramps.neutral[900] ?? colors.onSurface;
  const overlayText = colors.onPrimary;

  const body = (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      <View
        style={{
          height: 176,
          backgroundColor: colors.border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ fontSize: tokens.typography.scale['3xl'], color: colors.muted }}
        >
          🏨
        </Text>

        {typeof rating === 'number' ? (
          <View
            style={{
              position: 'absolute',
              top: tokens.spacing.sm,
              right: tokens.spacing.sm,
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              backgroundColor: withAlpha(scrimBase, 0.55),
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: 4,
              borderRadius: tokens.radius.full,
            }}
          >
            <Rating value={rating} size="sm" />
            {typeof reviewCount === 'number' ? (
              <Text style={{ color: overlayText, fontSize: tokens.typography.scale.xs }}>({reviewCount})</Text>
            ) : null}
          </View>
        ) : null}

        {/* Bottom scrim with title + price */}
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: tokens.spacing.md,
            gap: 2,
            backgroundColor: withAlpha(scrimBase, 0.45),
          }}
        >
          <Text numberOfLines={1} style={{ color: overlayText, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {name}
          </Text>
          {location ? (
            <Text numberOfLines={1} style={{ color: withAlpha(overlayText, 0.85), fontSize: tokens.typography.scale.xs }}>
              {location}
            </Text>
          ) : null}
          {typeof priceCents === 'number' ? (
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs, marginTop: 2 }}>
              <Text style={{ color: overlayText, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
                {formatMoney(priceCents, currency)}
              </Text>
              <Text style={{ color: withAlpha(overlayText, 0.85), fontSize: tokens.typography.scale.xs }}>/ night</Text>
            </View>
          ) : null}
        </View>
      </View>

      {tags.length > 0 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs, padding: tokens.spacing.md }}>
          {tags.map((t, i) => (
            <Badge key={`${t}-${i}`} tone="neutral">
              {t}
            </Badge>
          ))}
        </View>
      ) : null}
    </View>
  );

  // `appearance` and `compareAtCents` are accepted for prop-parity; V2 commits
  // to its hero treatment and shows the live nightly price over the scrim.
  void appearance;
  void compareAtCents;

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
