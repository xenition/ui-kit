import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { shadow } from '../primitives/internal/elevation';
import { formatMoney, initials, seedRampStep, toneColor, withAlpha } from './internal';
import type { ProductGridTileProps } from './ProductGridTile';

/** Drop-in alternate of {@link ProductGridTileProps} — identical prop contract. */
export type ProductGridTileV2Props = ProductGridTileProps;

/**
 * ProductGridTile — design variant **V2**: an **elevated tile with a large image
 * and a floating price chip**. Where V1 is a flat bordered card with a short
 * plate, V2 floats on a shadow, gives the image a tall 4:3 area, and overlays a
 * solid **price chip** on the artwork so the price reads before the eye reaches
 * the name. Missing `imageUrl` falls back to a token-tinted initials plate.
 * `soldOut` dims + flags by word; `selected` draws an accent ring. Same props as
 * {@link ProductGridTileProps}. Token-only.
 */
export function ProductGridTileV2({
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
}: ProductGridTileV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
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
          borderWidth: selected ? 2 : 0,
          borderColor: selected ? accent : 'transparent',
          backgroundColor: colors.surface,
          overflow: 'hidden',
          opacity: soldOut ? 0.5 : pressed ? 0.92 : 1,
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      <View style={{ height: 116, width: '100%', overflow: 'hidden' }}>
        {plate}
        {typeof priceCents === 'number' ? (
          <View
            style={{
              position: 'absolute',
              left: tokens.spacing.sm,
              bottom: tokens.spacing.sm,
              paddingVertical: 2,
              paddingHorizontal: tokens.spacing.sm,
              borderRadius: tokens.radius.full,
              backgroundColor: accent,
            }}
          >
            <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
              {formatMoney(priceCents, currency)}
            </Text>
          </View>
        ) : null}
        {soldOut ? (
          <View
            style={{
              position: 'absolute',
              right: tokens.spacing.sm,
              top: tokens.spacing.sm,
              paddingVertical: 2,
              paddingHorizontal: tokens.spacing.sm,
              borderRadius: tokens.radius.full,
              backgroundColor: withAlpha(colors.danger, 0.9),
            }}
          >
            <Text style={{ color: colors.onDanger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>Sold out</Text>
          </View>
        ) : null}
      </View>
      <View style={{ padding: tokens.spacing.sm }}>
        <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {name}
        </Text>
      </View>
    </Pressable>
  );
}
