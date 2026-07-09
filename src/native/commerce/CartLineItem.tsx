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
import { QuantityStepper } from './QuantityStepper';
import { GenerativeCover } from './GenerativeCover';
import { formatMoney, type MoneyFormatter } from './money';

export interface CartLineItemProps {
  /** Product title. */
  title: string;
  /** Chosen variant label (e.g. "Large / Black"). */
  variantTitle?: string;
  /** Quantity in the cart. */
  quantity: number;
  /** Unit price in integer cents. */
  unitPriceCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Thumbnail image URL. When absent a seeded `GenerativeCover` is drawn. */
  imageUrl?: string;
  /** Alt text for the thumbnail (defaults to the title). */
  imageAlt?: string;
  /** Stable id seeding the cover fallback (defaults to the title). */
  slug?: string;
  /** Quantity-change handler. When absent the stepper is hidden (read-only). */
  onQuantityChange?: (quantity: number) => void;
  /** Remove handler; renders a remove button when provided. */
  onRemove?: () => void;
  /** Minimum quantity (default 1). */
  min?: number;
  /** Maximum quantity. */
  max?: number;
  /** Remove button accessible label (default `Remove {title}`). */
  removeLabel?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  style?: StyleProp<ViewStyle>;
}

/**
 * One line in a cart — the native mirror of the web `CartLineItem`: thumbnail
 * (image or seeded cover), title + variant, a {@link QuantityStepper}, the line
 * total (`unitPrice × quantity`), and a remove control. Token-only; money is
 * integer cents throughout.
 */
export function CartLineItem({
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
}: CartLineItemProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const lineTotal = unitPriceCents * quantity;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 64,
          height: 64,
          overflow: 'hidden',
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
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

      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.sm }}>
        <View>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
          >
            {title}
          </Text>
          {variantTitle ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {variantTitle}
            </Text>
          ) : null}
        </View>
        {onQuantityChange ? (
          <QuantityStepper
            value={quantity}
            min={min}
            max={max}
            onChange={onQuantityChange}
            label={`Quantity for ${title}`}
          />
        ) : (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            Qty {quantity}
          </Text>
        )}
      </View>

      <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {format(lineTotal, currency)}
        </Text>
        {onRemove ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={removeLabel ?? `Remove ${title}`}
            onPress={onRemove}
          >
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Remove</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
