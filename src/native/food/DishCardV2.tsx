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
import { PriceTag } from '../commerce';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import type { DishCardProps } from './DishCard';

/** Drop-in for {@link DishCard}: identical props, a distinct design. */
export type DishCardV2Props = DishCardProps;

/**
 * DishCard, alternate design **V2** — an *image-hero* tile. Where the classic
 * card is a horizontal thumb-plus-text row, V2 leads with a full-width photo
 * that fills the top of the card, floats the {@link PriceTag} in a frosted pill
 * over the bottom-left of the image, and hangs a circular add button off the
 * bottom-right so it reads like a delivery-app feature card. Text lives below
 * on the solid surface (never over the photo) so contrast holds in both
 * schemes. `soldOut`, `loading`, and every prop behave exactly as the classic.
 */
export function DishCardV2({
  name,
  description,
  priceCents,
  currency = 'USD',
  imageUrl,
  rating,
  badges,
  soldOut = false,
  loading = false,
  onPress,
  onAdd,
  addLabel = 'Add',
  soldOutLabel = 'Sold out',
  formatMoney,
  style,
}: DishCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const containerStyle: StyleProp<ViewStyle> = [
    {
      overflow: 'hidden',
      borderRadius: tokens.radius.lg,
      backgroundColor: colors.surface,
      opacity: soldOut ? 0.6 : 1,
      ...shadow('md', tokens),
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading dish" style={containerStyle}>
        <View style={{ width: '100%', height: 168, backgroundColor: tokens.ramps.neutral[200] }} />
        <View style={{ gap: tokens.spacing.sm, padding: tokens.spacing.md }}>
          <View style={{ height: 14, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] }} />
          <View style={{ height: 12, width: '85%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        </View>
      </View>
    );
  }

  const hero = (
    <View style={{ width: '100%', height: 168, backgroundColor: tokens.ramps.neutral[100] }}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          accessible
          accessibilityLabel={name}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        />
      ) : null}

      {/* Frosted price pill, overlaid bottom-left. */}
      <View
        style={{
          position: 'absolute',
          left: tokens.spacing.sm,
          bottom: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs,
          borderRadius: tokens.radius.full,
          backgroundColor: withAlpha(colors.surface, 0.92),
        }}
      >
        <PriceTag cents={priceCents} currency={currency} formatMoney={formatMoney} size="sm" />
      </View>

      {soldOut ? (
        <View
          style={{
            position: 'absolute',
            top: tokens.spacing.sm,
            left: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.danger, 0.16),
          }}
        >
          <Text style={{ color: colors.dangerText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {soldOutLabel}
          </Text>
        </View>
      ) : null}
    </View>
  );

  const floatingAdd =
    !soldOut && onAdd ? (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={addLabel}
        onPress={onAdd}
        style={({ pressed }) => ({
          position: 'absolute',
          right: tokens.spacing.md,
          top: 168 - 22,
          minWidth: 44,
          height: 44,
          paddingHorizontal: tokens.spacing.md,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.primary,
          opacity: pressed ? 0.85 : 1,
          ...shadow('md', tokens),
        })}
      >
        <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {addLabel}
        </Text>
      </Pressable>
    ) : null;

  const body = (
    <View style={{ gap: tokens.spacing.xs, padding: tokens.spacing.md }}>
      <Text
        numberOfLines={2}
        style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
      >
        {name}
      </Text>
      {description ? (
        <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {description}
        </Text>
      ) : null}
      {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
      {badges ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }}>
          {badges}
        </View>
      ) : null}
    </View>
  );

  const inner = (
    <>
      <View>
        {hero}
        {floatingAdd}
      </View>
      {body}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={name}
        accessibilityState={{ disabled: soldOut }}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.92 : soldOut ? 0.6 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{inner}</View>;
}
