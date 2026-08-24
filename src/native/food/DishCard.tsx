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
import { Button } from '../primitives/Button';
import { Rating } from '../primitives/Rating';
import { PriceTag, type MoneyFormatter } from '../commerce';

/** Layout variants for a menu item tile. */
export type DishCardVariant = 'list' | 'grid' | 'featured';

export interface DishCardProps {
  /** Dish name. */
  name: string;
  /** Short description / ingredients line. */
  description?: string;
  /** Price in integer cents. */
  priceCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Dish photo URL. When absent a token-tinted placeholder is drawn. */
  imageUrl?: string;
  /** Average rating (0–5); renders a compact star row when provided. */
  rating?: number;
  /** Optional dietary / cuisine chip slot (e.g. `NutritionBadge`s). */
  badges?: React.ReactNode;
  /** Layout variant (default `list`). */
  variant?: DishCardVariant;
  /** When true the dish is out of stock: dimmed and the add button disabled. */
  soldOut?: boolean;
  /** Loading placeholder — renders a token-tinted skeleton, no content. */
  loading?: boolean;
  /** Press handler for the whole card. */
  onPress?: () => void;
  /** Add-to-cart handler; renders an add button when provided. */
  onAdd?: () => void;
  /** Add button label (default `Add`). */
  addLabel?: string;
  /** Sold-out label (default `Sold out`). */
  soldOutLabel?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single menu item — the food-domain sibling of `ProductCard`. Renders a
 * photo (or a token-tinted placeholder), name, description, an optional star
 * rating and dietary `badges`, a {@link PriceTag}, and an optional add button.
 * `variant` switches between a horizontal `list` row, a vertical `grid` tile,
 * and a larger `featured` hero. `soldOut` dims the card and disables adding;
 * `loading` shows a token-only skeleton. Colors come only from theme tokens.
 */
export function DishCard({
  name,
  description,
  priceCents,
  currency = 'USD',
  imageUrl,
  rating,
  badges,
  variant = 'list',
  soldOut = false,
  loading = false,
  onPress,
  onAdd,
  addLabel = 'Add',
  soldOutLabel = 'Sold out',
  formatMoney,
  style,
}: DishCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const horizontal = variant === 'list';
  const mediaSize = variant === 'featured' ? undefined : horizontal ? 88 : undefined;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: horizontal ? 'row' : 'column',
      gap: tokens.spacing.md,
      overflow: 'hidden',
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      padding: horizontal ? tokens.spacing.md : 0,
      opacity: soldOut ? 0.6 : 1,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading dish" style={containerStyle}>
        <View
          style={{
            width: mediaSize ?? '100%',
            height: mediaSize ?? 140,
            borderRadius: tokens.radius.md,
            backgroundColor: tokens.ramps.neutral[200],
          }}
        />
        <View style={{ flex: 1, gap: tokens.spacing.sm, padding: horizontal ? 0 : tokens.spacing.md }}>
          <View style={{ height: 14, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] }} />
          <View style={{ height: 12, width: '90%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        </View>
      </View>
    );
  }

  const media = (
    <View
      style={{
        width: mediaSize ?? '100%',
        height: mediaSize ?? (variant === 'featured' ? 180 : 140),
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

  const body = (
    <View style={{ flex: 1, gap: tokens.spacing.xs, padding: horizontal ? 0 : tokens.spacing.md }}>
      <Text
        numberOfLines={horizontal ? 1 : 2}
        style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
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
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>{badges}</View>
      ) : null}
      <View
        style={{
          marginTop: tokens.spacing.xs,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <PriceTag cents={priceCents} currency={currency} formatMoney={formatMoney} />
        {soldOut ? (
          <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {soldOutLabel}
          </Text>
        ) : onAdd ? (
          <Button size="sm" onPress={onAdd} disabled={soldOut}>
            {addLabel}
          </Button>
        ) : null}
      </View>
    </View>
  );

  const inner = (
    <>
      {media}
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
        style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : soldOut ? 0.6 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{inner}</View>;
}
