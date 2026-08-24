import * as React from 'react';
import { Animated, Image, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, PriceTag, formatMoney } from '../primitives';
import { ConditionBadge } from './ConditionBadge';
import { withAlpha } from './internal';
import { usePressScale } from '../primitives/internal/motion';
import type { ListingCardProps } from './ListingCard';

/** Drop-in alternate of {@link ListingCardProps} — identical prop contract. */
export type ListingCardV3Props = ListingCardProps;

/**
 * ListingCard — Design V3: a **full-bleed hero** tile. The image fills the whole
 * card; the condition chip pins to the top-left and the ♥ watch toggle to the
 * top-right, while the title and price ride a frosted scrim panel across the
 * bottom. The scrim is a theme-safe `surface` overlay (two stacked translucent
 * bands, faint→solid, standing in for a gradient) with `on-surface` text, so it
 * stays legible in light and dark. Editorial and immersive — clearly distinct
 * from the V1 grid tile and the V2 media-left rail. Same props as `ListingCard`;
 * token-pure with `withAlpha` tints.
 */
export function ListingCardV3({
  title,
  priceCents,
  currency = 'USD',
  compareAtCents,
  imageUrl,
  condition,
  subtitle,
  watched = false,
  onToggleWatch,
  onPress,
  loading = false,
  style,
}: ListingCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();

  const watchChip =
    onToggleWatch != null ? (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={watched ? `Unwatch ${title}` : `Watch ${title}`}
        accessibilityState={{ selected: watched }}
        onPress={() => onToggleWatch(!watched)}
        hitSlop={8}
        style={{
          position: 'absolute',
          top: tokens.spacing.sm,
          right: tokens.spacing.sm,
          width: 32,
          height: 32,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors.surface, 0.9),
        }}
      >
        <Text style={{ fontSize: tokens.typography.scale.base, color: watched ? colors.danger : colors.muted }}>
          {watched ? '♥' : '♡'}
        </Text>
      </Pressable>
    ) : null;

  const body = (
    <Animated.View
      style={[
        {
          height: 260,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          backgroundColor: colors.border,
          justifyContent: 'flex-end',
          transform: [{ scale: press.scale }],
        },
        style,
      ]}
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={{ ...StyleFill }} resizeMode="cover" />
      ) : (
        <View style={{ ...StyleFill, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No photo</Text>
        </View>
      )}

      {/* Condition chip, top-left. */}
      {condition ? (
        <View style={{ position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }}>
          <ConditionBadge condition={condition} size="sm" />
        </View>
      ) : null}
      {watchChip}

      {/* Frosted scrim standing in for a bottom gradient. */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingTop: tokens.spacing.xl,
          backgroundColor: withAlpha(colors.surface, 0.4),
        }}
      >
        <View style={{ paddingHorizontal: tokens.spacing.md, paddingVertical: tokens.spacing.md, gap: 2, backgroundColor: withAlpha(colors.surface, 0.86) }}>
          {loading ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Loading listing…</Text>
          ) : (
            <>
              <PriceTag cents={priceCents} currency={currency} compareAtCents={compareAtCents} size="lg" />
              <Text
                numberOfLines={1}
                style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
              >
                {title}
              </Text>
              {subtitle ? (
                <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                  {subtitle}
                </Text>
              ) : null}
            </>
          )}
        </View>
      </View>
    </Animated.View>
  );

  if (!onPress) return body;
  const priceLabel = formatMoney(priceCents, currency);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${priceLabel}${condition ? `, ${condition}` : ''}`}
      onPress={onPress}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
    >
      {body}
    </Pressable>
  );
}

/** Absolute full-bleed fill, shared by the hero image and its placeholder. */
const StyleFill = {
  position: 'absolute' as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%' as const,
  height: '100%' as const,
};
