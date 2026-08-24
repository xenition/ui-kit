import * as React from 'react';
import {
  Animated,
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
import { shadow } from '../primitives/internal/elevation';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import type { ProductCardProps } from './ProductCard';

/** Drop-in alternate of {@link ProductCardProps} — identical prop contract. */
export type ProductCardV2Props = ProductCardProps;

/**
 * ProductCard — design variant **V2**: a horizontal, media-left **list card**
 * with drop-shadow elevation and no border. Where V1 is a vertical image-top
 * tile, V2 puts a square thumbnail on the left and stacks title → price →
 * add-button in a right-hand column, so it reads as a row in a scrolling list.
 * Same props as {@link ProductCardProps}; only the layout differs. Token-only.
 */
export function ProductCardV2({
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
}: ProductCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const enter = useEnter({ translateY: 8 });

  const media = (
    <View
      style={{
        width: 96,
        height: 96,
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
  );

  const body = (
    <View style={{ flex: 1, minWidth: 0, justifyContent: 'space-between', gap: tokens.spacing.sm }}>
      <Text
        numberOfLines={2}
        style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
      >
        {title}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <PriceTag
          cents={priceCents}
          currency={currency}
          compareAtCents={compareAtCents}
          formatMoney={formatMoney}
        />
        {onAdd ? (
          <Button size="sm" variant="soft" onPress={onAdd}>
            {addLabel}
          </Button>
        ) : null}
      </View>
    </View>
  );

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      padding: tokens.spacing.md,
      borderRadius: tokens.radius.lg,
      borderWidth: 0,
      backgroundColor: colors.surface,
      ...shadow('md', tokens),
    },
    style,
  ];

  const inner = (
    <>
      {media}
      {body}
    </>
  );

  if (onPress) {
    return (
      <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={title}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          style={containerStyle}
        >
          {inner}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[{ opacity: enter.opacity, transform: enter.transform }, containerStyle]}>
      {inner}
    </Animated.View>
  );
}
