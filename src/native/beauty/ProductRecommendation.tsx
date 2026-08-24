import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Rating, Button } from '../primitives';
import { formatMoney, type MoneyFormatter } from '../commerce/money';

export interface ProductRecommendationProps {
  /** Product name. */
  name: string;
  /** Price in integer cents. */
  priceCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Brand / line. */
  brand?: string;
  /** Average rating (0–5). Hidden when omitted. */
  rating?: number;
  /** Thumbnail URL; a token-tinted square shows when absent. */
  imageUrl?: string;
  /** Why it's recommended (e.g. "Pairs with your color service"). */
  reason?: string;
  /** Whether the item is already in the bag; swaps the CTA. */
  added?: boolean;
  /** Out-of-stock — disables the CTA. */
  soldOut?: boolean;
  /** Override the cents → string money formatter. */
  formatMoney?: MoneyFormatter;
  /** Add-to-bag CTA label (default "Add"). */
  addLabel?: string;
  /** Fires when the CTA is pressed. */
  onAdd?: () => void;
  /** Fires when the row body is pressed. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A retail product recommendation row for after-service upsell: thumbnail,
 * brand + name, a star rating, a highlighted "reason" line, the price, and an
 * add-to-bag CTA. `added` swaps the CTA to a done state; `soldOut` disables it
 * (state, not color alone). Missing image degrades to a token-tinted square.
 * Prices are integer cents via {@link formatMoney}. Token-only colors.
 */
export function ProductRecommendation({
  name,
  priceCents,
  currency = 'USD',
  brand,
  rating,
  imageUrl,
  reason,
  added = false,
  soldOut = false,
  formatMoney: format = formatMoney,
  addLabel = 'Add',
  onAdd,
  onPress,
  style,
}: ProductRecommendationProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const priceText = format(priceCents, currency);

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${brand ? `${brand} ` : ''}${name}, ${priceText}${soldOut ? ', sold out' : ''}${added ? ', in bag' : ''}`}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          opacity: pressed && onPress ? 0.94 : 1,
        },
        style,
      ]}
    >
      <View style={{ width: 64, height: 64, borderRadius: tokens.radius.md, overflow: 'hidden', backgroundColor: withAlpha(colors.muted, 0.14), alignItems: 'center', justifyContent: 'center' }}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
        ) : (
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
            🧴
          </Text>
        )}
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        {brand ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }}>
            {brand}
          </Text>
        ) : null}
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {name}
        </Text>
        {rating != null ? <Rating value={rating} size="sm" /> : null}
        {reason ? (
          <Text numberOfLines={2} style={{ color: colors.accent, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {reason}
          </Text>
        ) : null}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: tokens.spacing.xs }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{priceText}</Text>
          {onAdd ? (
            <Button variant={added ? 'soft' : 'primary'} size="sm" onPress={onAdd} disabled={soldOut}>
              {soldOut ? 'Sold out' : added ? '✓ Added' : addLabel}
            </Button>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
