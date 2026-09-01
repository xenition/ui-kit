import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney, initials, seedRampStep, toneColor, withAlpha } from './internal';
import type { ProductGridTileProps } from './ProductGridTile';

/** Drop-in for {@link ProductGridTileProps} — same props, the V4 "register" design. */
export type ProductGridTileV4Props = ProductGridTileProps;

/**
 * ProductGridTile — **V4** "register" design. The tactile checkout take on a
 * catalog tile: a larger plate/thumbnail, a **bold, prominent price** (the number
 * that matters at the counter), and a satisfying press/selected state — a
 * `selected` tile lifts with an accent ring, soft tint, and shadow. `soldOut`
 * dims and flags by word (not color alone). Same props/behavior as
 * {@link ProductGridTileProps}; token-only tints via `useXenitionTheme()`.
 */
export function ProductGridTileV4({
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
}: ProductGridTileV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const accent = toneColor(colors, tone);
  const plateTint = tokens.ramps.neutral[seedRampStep(seed ?? name)];

  const plate = imageUrl ? (
    <Image source={{ uri: imageUrl }} accessible accessibilityLabel={name} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
  ) : (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: plateTint }}>
      <Text allowFontScaling={false} style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
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
          borderRadius: tokens.radius.lg,
          borderWidth: selected ? 2 : 1,
          borderColor: selected ? accent : colors.border,
          backgroundColor: selected ? withAlpha(accent, 0.1) : colors.card,
          overflow: 'hidden',
          opacity: soldOut ? 0.5 : pressed ? 0.92 : 1,
          ...(selected
            ? { shadowColor: accent, shadowOpacity: 0.18, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
            : { shadowColor: colors.onSurface, shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 1 }),
        },
        style,
      ]}
    >
      {!compact ? (
        <View style={{ height: 84, width: '100%', overflow: 'hidden' }}>{plate}</View>
      ) : (
        <View style={{ height: 4, width: '100%', backgroundColor: accent }} />
      )}
      <View style={{ padding: tokens.spacing.md, gap: 4 }}>
        <Text numberOfLines={compact ? 1 : 2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          {typeof priceCents === 'number' ? (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
              {formatMoney(priceCents, currency)}
            </Text>
          ) : (
            <View />
          )}
          {soldOut ? (
            <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>Sold out</Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
