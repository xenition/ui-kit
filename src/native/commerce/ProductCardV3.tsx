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
import type { ProductCardProps } from './ProductCard';

/** Drop-in alternate of {@link ProductCardProps} — identical prop contract. */
export type ProductCardV3Props = ProductCardProps;

/**
 * ProductCard — design variant **V3**: a **minimal, borderless** editorial
 * treatment. No card chrome at all: a tiny rounded thumbnail sits beside a small
 * muted, letter-spaced title, and the **price is the hero** (large PriceTag).
 * Separation comes from spacing, not a box. Same props as
 * {@link ProductCardProps}. Token-only.
 */
export function ProductCardV3({
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
}: ProductCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const thumb = (
    <View
      style={{
        width: 44,
        height: 44,
        overflow: 'hidden',
        borderRadius: tokens.radius.full,
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
  );

  const inner = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {thumb}
        <Text
          numberOfLines={2}
          style={{
            flex: 1,
            minWidth: 0,
            color: colors.muted,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '600',
            letterSpacing: 0.5,
          }}
        >
          {title}
        </Text>
      </View>
      <PriceTag
        cents={priceCents}
        currency={currency}
        compareAtCents={compareAtCents}
        formatMoney={formatMoney}
        size="lg"
      />
      {onAdd ? (
        <Button size="sm" variant="link" onPress={onAdd} style={{ alignSelf: 'flex-start', paddingHorizontal: 0 }}>
          {addLabel}
        </Button>
      ) : null}
    </>
  );

  const containerStyle: StyleProp<ViewStyle> = [
    {
      gap: tokens.spacing.sm,
      paddingVertical: tokens.spacing.sm,
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.7 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{inner}</View>;
}
