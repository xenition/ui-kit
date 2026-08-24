import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { QuantityStepper } from './QuantityStepper';
import { GenerativeCover } from './GenerativeCover';
import { formatMoney, type MoneyFormatter } from './money';
import type { CartLineItemProps } from './CartLineItem';

/** Drop-in alternate of {@link CartLineItemProps} — identical prop contract. */
export type CartLineItemV3Props = CartLineItemProps;

/**
 * CartLineItem — design variant **V3**: a **compact, dense single line**. Where
 * V1 gives each field its own stacked column and V2 is a card, V3 packs a small
 * thumbnail, the title with an inline · variant, the stepper (or a `×qty` chip),
 * and the line total onto one tight row separated only by a hairline underline.
 * Built for long, scannable carts. Same props as {@link CartLineItemProps}.
 * Token-only; money is integer cents.
 */
export function CartLineItemV3({
  title,
  variantTitle,
  quantity,
  unitPriceCents,
  currency = 'USD',
  imageUrl,
  imageAlt,
  slug,
  onQuantityChange,
  onRemove,
  min = 1,
  max,
  removeLabel,
  formatMoney: format = formatMoney,
  style,
}: CartLineItemV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const lineTotal = unitPriceCents * quantity;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 36,
          height: 36,
          overflow: 'hidden',
          borderRadius: tokens.radius.sm,
          backgroundColor: tokens.ramps.neutral[100],
        }}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            accessible
            accessibilityLabel={imageAlt ?? title}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <GenerativeCover seed={slug ?? title} label={title} style={{ width: '100%', height: '100%' }} />
        )}
      </View>

      <Text numberOfLines={1} style={{ flex: 1, minWidth: 0, color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
        <Text style={{ fontWeight: '600' }}>{title}</Text>
        {variantTitle ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}> · {variantTitle}</Text>
        ) : null}
      </Text>

      {onQuantityChange ? (
        <QuantityStepper
          value={quantity}
          min={min}
          max={max}
          onChange={onQuantityChange}
          label={`Quantity for ${title}`}
        />
      ) : (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>×{quantity}</Text>
      )}

      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600', minWidth: 56, textAlign: 'right' }}>
        {format(lineTotal, currency)}
      </Text>

      {onRemove ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={removeLabel ?? `Remove ${title}`}
          onPress={onRemove}
          hitSlop={8}
        >
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>×</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
