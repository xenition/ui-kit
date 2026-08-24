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
import { Rating } from '../primitives/Rating';
import { Badge } from '../primitives/Badge';

export type RestaurantCardVariant = 'list' | 'grid' | 'hero';
export type RestaurantOpenState = 'open' | 'closed' | 'busy';

export interface RestaurantCardProps {
  /** Restaurant name. */
  name: string;
  /** Cuisine label(s), e.g. "Thai · Noodles". */
  cuisine?: string;
  /** Average rating (0–5). */
  rating?: number;
  /** Number of ratings (shown in parentheses). */
  ratingCount?: number;
  /** Price level 1–4 → `$`…`$$$$`. */
  priceLevel?: 1 | 2 | 3 | 4;
  /** Short delivery-time text (e.g. "25–35 min"). */
  etaText?: string;
  /** Delivery fee text (e.g. "Free delivery"). */
  feeText?: string;
  /** Hero/thumbnail image URL. */
  imageUrl?: string;
  /** Availability state (default `open`); `closed`/`busy` dim the card. */
  openState?: RestaurantOpenState;
  /** Layout variant (default `list`). */
  variant?: RestaurantCardVariant;
  /** Press handler for the whole card. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const OPEN_LABEL: Record<RestaurantOpenState, string> = {
  open: 'Open',
  closed: 'Closed',
  busy: 'Busy',
};

/**
 * A restaurant / vendor tile — image, name, cuisine, star rating with count,
 * price level, and a delivery ETA line, plus an availability `Badge`. `variant`
 * switches a horizontal `list` row, a `grid` tile, and a full-bleed `hero`.
 * `closed`/`busy` states dim the card and are labelled in text (not color
 * alone). Reuses the `Rating` and `Badge` primitives. Token-only.
 */
export function RestaurantCard({
  name,
  cuisine,
  rating,
  ratingCount,
  priceLevel,
  etaText,
  feeText,
  imageUrl,
  openState = 'open',
  variant = 'list',
  onPress,
  style,
}: RestaurantCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const horizontal = variant === 'list';
  const dimmed = openState !== 'open';

  const media = (
    <View
      style={{
        width: horizontal ? 96 : '100%',
        height: horizontal ? 96 : variant === 'hero' ? 180 : 120,
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
          style={{ width: '100%', height: '100%', opacity: dimmed ? 0.7 : 1 }}
        />
      ) : null}
    </View>
  );

  const metaBits: string[] = [];
  if (priceLevel) metaBits.push('$'.repeat(Math.min(4, Math.max(1, priceLevel))));
  if (cuisine) metaBits.push(cuisine);

  const body = (
    <View style={{ flex: 1, gap: tokens.spacing.xs, padding: horizontal ? 0 : tokens.spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <Text
          numberOfLines={1}
          style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {name}
        </Text>
        <Badge tone={openState === 'open' ? 'success' : 'neutral'}>{OPEN_LABEL[openState]}</Badge>
      </View>
      {metaBits.length > 0 ? (
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {metaBits.join(' · ')}
        </Text>
      ) : null}
      {typeof rating === 'number' ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Rating value={rating} size="sm" showValue />
          {typeof ratingCount === 'number' ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>({ratingCount})</Text>
          ) : null}
        </View>
      ) : null}
      {etaText || feeText ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
          {[etaText, feeText].filter(Boolean).join(' · ')}
        </Text>
      ) : null}
    </View>
  );

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
      opacity: dimmed ? 0.75 : 1,
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
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${name}${cuisine ? `, ${cuisine}` : ''}, ${OPEN_LABEL[openState]}`}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : dimmed ? 0.75 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{inner}</View>;
}
