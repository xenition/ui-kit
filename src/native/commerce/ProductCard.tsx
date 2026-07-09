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
import { PriceTag } from './PriceTag';
import { GenerativeCover } from './GenerativeCover';
import type { MoneyFormatter } from './money';

export interface ProductCardProps {
  /** Product title. */
  title: string;
  /** Price in integer cents. */
  priceCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Optional "was" price in cents (struck through). */
  compareAtCents?: number;
  /** Product image URL. When absent a deterministic `GenerativeCover` is drawn. */
  imageUrl?: string;
  /** Alt / accessibility text for the image (defaults to the title). */
  imageAlt?: string;
  /** Stable id used to seed the cover fallback (defaults to the title). */
  slug?: string;
  /** Press handler for the whole card (native equivalent of the web `href`). */
  onPress?: () => void;
  /** Add-to-cart handler; renders an add button when provided. */
  onAdd?: () => void;
  /** Add button label (default `Add to cart`). */
  addLabel?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  style?: StyleProp<ViewStyle>;
}

/**
 * Catalog product tile — the native mirror of the web `ProductCard`: media
 * (image, or a seeded {@link GenerativeCover} when `imageUrl` is absent),
 * title, {@link PriceTag}, and an optional add button. The whole card is
 * pressable via `onPress` (native's `href`). Token-only.
 */
export function ProductCard({
  title,
  priceCents,
  currency = 'USD',
  compareAtCents,
  imageUrl,
  imageAlt,
  slug,
  onPress,
  onAdd,
  addLabel = 'Add to cart',
  formatMoney,
  style,
}: ProductCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const media = (
    <View style={{ aspectRatio: 4 / 5, width: '100%', backgroundColor: tokens.ramps.neutral[100] }}>
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
  );

  const body = (
    <View style={{ flex: 1, gap: tokens.spacing.sm, padding: tokens.spacing.md }}>
      <Text
        numberOfLines={2}
        style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
      >
        {title}
      </Text>
      <PriceTag
        cents={priceCents}
        currency={currency}
        compareAtCents={compareAtCents}
        formatMoney={formatMoney}
      />
      {onAdd ? (
        <Button size="sm" onPress={onAdd} style={{ marginTop: tokens.spacing.xs }}>
          {addLabel}
        </Button>
      ) : null}
    </View>
  );

  const inner = (
    <>
      {media}
      {body}
    </>
  );

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flex: 1,
      overflow: 'hidden',
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{inner}</View>;
}
