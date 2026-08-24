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
import { Badge } from '../primitives/Badge';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import type { RestaurantCardProps, RestaurantOpenState } from './RestaurantCard';

/** Drop-in for {@link RestaurantCard}: identical props, a distinct design. */
export type RestaurantCardV2Props = RestaurantCardProps;

const OPEN_LABEL: Record<RestaurantOpenState, string> = {
  open: 'Open',
  closed: 'Closed',
  busy: 'Busy',
};

/**
 * RestaurantCard, alternate design **V2** — a *cover-hero* card. A tall
 * full-bleed cover photo carries two overlaid chips: the open-state badge top-
 * left and a frosted rating badge top-right. The name and details sit on a
 * solid surface footer beneath the image (never over it), so contrast is safe
 * in both schemes while the card still reads as a big, tappable hero — the
 * opposite of the compact classic row. Same props as the classic.
 */
export function RestaurantCardV2({
  name,
  cuisine,
  rating,
  ratingCount,
  priceLevel,
  etaText,
  feeText,
  imageUrl,
  openState = 'open',
  onPress,
  style,
}: RestaurantCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const dimmed = openState !== 'open';

  const metaBits: string[] = [];
  if (priceLevel) metaBits.push('$'.repeat(Math.min(4, Math.max(1, priceLevel))));
  if (cuisine) metaBits.push(cuisine);

  const containerStyle: StyleProp<ViewStyle> = [
    {
      overflow: 'hidden',
      borderRadius: tokens.radius.lg,
      backgroundColor: colors.surface,
      opacity: dimmed ? 0.8 : 1,
      ...shadow('md', tokens),
    },
    style,
  ];

  const hero = (
    <View style={{ width: '100%', height: 176, backgroundColor: tokens.ramps.neutral[100] }}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          accessible
          accessibilityLabel={name}
          resizeMode="cover"
          style={{ width: '100%', height: '100%', opacity: dimmed ? 0.7 : 1 }}
        />
      ) : null}

      <View style={{ position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }}>
        <Badge tone={openState === 'open' ? 'success' : 'neutral'}>{OPEN_LABEL[openState]}</Badge>
      </View>

      {typeof rating === 'number' ? (
        <View
          style={{
            position: 'absolute',
            top: tokens.spacing.sm,
            right: tokens.spacing.sm,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.surface, 0.92),
          }}
        >
          <Text style={{ color: colors.warnText, fontSize: tokens.typography.scale.sm }}>★</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {rating.toFixed(1)}
          </Text>
          {typeof ratingCount === 'number' ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>({ratingCount})</Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );

  const footer = (
    <View style={{ gap: tokens.spacing.xs, padding: tokens.spacing.md }}>
      <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
        {name}
      </Text>
      {metaBits.length > 0 ? (
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {metaBits.join(' · ')}
        </Text>
      ) : null}
      {etaText || feeText ? (
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
          {[etaText, feeText].filter(Boolean).join(' · ')}
        </Text>
      ) : null}
    </View>
  );

  const inner = (
    <>
      {hero}
      {footer}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${name}${cuisine ? `, ${cuisine}` : ''}, ${OPEN_LABEL[openState]}`}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.92 : dimmed ? 0.8 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{inner}</View>;
}
