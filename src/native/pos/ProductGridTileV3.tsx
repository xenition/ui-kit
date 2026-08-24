import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney, initials, seedRampStep, toneColor, withAlpha } from './internal';
import type { ProductGridTileProps } from './ProductGridTile';

/** Drop-in alternate of {@link ProductGridTileProps} — identical prop contract. */
export type ProductGridTileV3Props = ProductGridTileProps;

/**
 * ProductGridTile — design variant **V3**: a **compact horizontal list row**.
 * Where V1/V2 are square catalog cards, V3 lays the product out as a dense line
 * — a small square thumbnail, the name, and a right-aligned price — for a
 * scrolling menu or a search-results list rather than a button grid. Missing
 * `imageUrl` falls back to a token-tinted initials plate. `soldOut` dims + flags
 * by word; `selected` tints the row and is announced. Same props as
 * {@link ProductGridTileProps}. Token-only.
 */
export function ProductGridTileV3({
  name,
  priceCents,
  currency = 'USD',
  imageUrl,
  seed,
  tone = 'primary',
  soldOut = false,
  selected = false,
  onPress,
  onLongPress,
  variant = 'default',
  testID,
  style,
}: ProductGridTileV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const accent = toneColor(colors, tone);
  const plateTint = tokens.ramps.neutral[seedRampStep(seed ?? name)];

  const plate = imageUrl ? (
    <Image source={{ uri: imageUrl }} accessible accessibilityLabel={name} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
  ) : (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: plateTint }}>
      <Text allowFontScaling={false} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
        {initials(name)}
      </Text>
    </View>
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled: soldOut }}
      accessibilityLabel={`${name}${typeof priceCents === 'number' ? `, ${formatMoney(priceCents, currency)}` : ''}${soldOut ? ', sold out' : ''}`}
      disabled={soldOut}
      onPress={onPress}
      onLongPress={onLongPress}
      testID={testID}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderLeftWidth: selected ? 3 : 0,
          borderLeftColor: selected ? accent : 'transparent',
          backgroundColor: selected ? withAlpha(accent, 0.1) : pressed ? tokens.ramps.neutral[100] ?? colors.surface : 'transparent',
          opacity: soldOut ? 0.5 : 1,
        },
        style,
      ]}
    >
      <View style={{ width: 40, height: 40, borderRadius: tokens.radius.sm, overflow: 'hidden' }}>{plate}</View>

      <View style={{ flex: 1, minWidth: 0 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {name}
        </Text>
        {soldOut ? (
          <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>Sold out</Text>
        ) : null}
      </View>

      {typeof priceCents === 'number' ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {formatMoney(priceCents, currency)}
        </Text>
      ) : null}
    </Pressable>
  );
}
