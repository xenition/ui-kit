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
import type { DishCardProps } from './DishCard';

/** Drop-in for {@link DishCard}: identical props, a distinct design. */
export type DishCardV3Props = DishCardProps;

/**
 * DishCard, alternate design **V3** — a *text-first* menu line. Borderless and
 * dense, separated from its neighbours by a single hairline rule rather than a
 * card. The name and price share the top baseline (name left, price right,
 * bridged by a dotted leader), the description follows, and a small square
 * thumbnail sits on the *right* — the inverse of the classic left-thumb row.
 * Adding is a quiet text button, not a filled pill. Same props as the classic.
 */
export function DishCardV3({
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
}: DishCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const thumb = 56;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      gap: tokens.spacing.md,
      alignItems: 'flex-start',
      backgroundColor: 'transparent',
      borderBottomWidth: 1,
      borderColor: colors.border,
      paddingVertical: tokens.spacing.md,
      opacity: soldOut ? 0.6 : 1,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading dish" style={containerStyle}>
        <View style={{ flex: 1, gap: tokens.spacing.sm }}>
          <View style={{ height: 14, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] }} />
          <View style={{ height: 12, width: '80%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        </View>
        <View style={{ width: thumb, height: thumb, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[200] }} />
      </View>
    );
  }

  const body = (
    <View style={{ flex: 1, gap: tokens.spacing.xs }}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }}>
        <Text
          numberOfLines={1}
          style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {name}
        </Text>
        <PriceTag cents={priceCents} currency={currency} formatMoney={formatMoney} size="sm" />
      </View>
      {description ? (
        <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {description}
        </Text>
      ) : null}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, marginTop: tokens.spacing.xs }}>
        {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
        {badges ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>{badges}</View>
        ) : null}
        {soldOut ? (
          <Text style={{ color: colors.dangerText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {soldOutLabel}
          </Text>
        ) : onAdd ? (
          <Pressable accessibilityRole="button" accessibilityLabel={addLabel} onPress={onAdd} hitSlop={8}>
            {({ pressed }) => (
              <Text
                style={{
                  color: colors.primaryText,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: '700',
                  opacity: pressed ? 0.6 : 1,
                }}
              >
                + {addLabel}
              </Text>
            )}
          </Pressable>
        ) : null}
      </View>
    </View>
  );

  const media = (
    <View
      style={{
        width: thumb,
        height: thumb,
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
          style={{ width: '100%', height: '100%' }}
        />
      ) : null}
    </View>
  );

  const inner = (
    <>
      {body}
      {media}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={name}
        accessibilityState={{ disabled: soldOut }}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : soldOut ? 0.6 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{inner}</View>;
}
