import * as React from 'react';
import {
  Animated,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { QuantityStepper } from './QuantityStepper';
import { GenerativeCover } from './GenerativeCover';
import { formatMoney, type MoneyFormatter } from './money';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import type { CartLineItemProps } from './CartLineItem';

/** Drop-in alternate of {@link CartLineItemProps} — identical prop contract. */
export type CartLineItemV2Props = CartLineItemProps;

/**
 * CartLineItem — design variant **V2**: a self-contained **elevated card** with
 * a large, prominent thumbnail. Where V1 is a flat row with the stepper on the
 * right, V2 gives the line its own surface: a big cover on the left, the title +
 * variant and a **remove ×** in a header row, and a footer row that pairs the
 * inline {@link QuantityStepper} with a bold line total. Same props as
 * {@link CartLineItemProps}. Token-only; money is integer cents.
 */
export function CartLineItemV2({
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
}: CartLineItemV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 6 });
  const lineTotal = unitPriceCents * quantity;

  return (
    <Animated.View
      style={[
        {
          opacity: enter.opacity,
          transform: enter.transform,
          flexDirection: 'row',
          gap: tokens.spacing.md,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      <View
        style={{
          width: 88,
          height: 88,
          overflow: 'hidden',
          borderRadius: tokens.radius.md,
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

      <View style={{ flex: 1, minWidth: 0, justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text
              numberOfLines={1}
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
            >
              {title}
            </Text>
            {variantTitle ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {variantTitle}
              </Text>
            ) : null}
          </View>
          {onRemove ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={removeLabel ?? `Remove ${title}`}
              onPress={onRemove}
              hitSlop={8}
            >
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.lg }}>×</Text>
            </Pressable>
          ) : null}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          {onQuantityChange ? (
            <QuantityStepper
              value={quantity}
              min={min}
              max={max}
              onChange={onQuantityChange}
              label={`Quantity for ${title}`}
            />
          ) : (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Qty {quantity}</Text>
          )}
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {format(lineTotal, currency)}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
