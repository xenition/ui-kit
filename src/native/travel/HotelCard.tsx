import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Rating, Badge, PriceTag } from '../primitives';

/** Layout for a {@link HotelCard}. */
export type HotelCardVariant = 'stacked' | 'row';

export interface HotelCardProps {
  /** Property name. */
  name: string;
  /** Locality line, e.g. `'Shibuya, Tokyo'`. */
  location?: string;
  /** Guest review score, 0–5, drawn as stars. */
  rating?: number;
  /** Number of reviews behind the rating. */
  reviewCount?: number;
  /** Nightly price in integer minor units (cents). */
  priceCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Short amenity chips (e.g. `['Free Wi-Fi', 'Pool']`). */
  tags?: readonly string[];
  /** Optional "was" nightly price in cents; struck through when higher. */
  compareAtCents?: number;
  /** Layout variant. */
  variant?: HotelCardVariant;
  /** Fires when the card is pressed. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A hotel search result — name, location, guest rating, nightly price, and a
 * few amenity chips over a token-styled media placeholder (no image
 * dependency; the app can overlay its own `<Image>`). Data + `onPress` only.
 * Token-only colors.
 */
export function HotelCard({
  name,
  location,
  rating,
  reviewCount,
  priceCents,
  currency = 'USD',
  tags = [],
  compareAtCents,
  variant = 'stacked',
  onPress,
  style,
}: HotelCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const row = variant === 'row';

  const media = (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{
        backgroundColor: colors.border,
        borderRadius: tokens.radius.md,
        height: row ? 88 : 132,
        width: row ? 88 : '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: tokens.typography.scale['2xl'], color: colors.muted }}>🏨</Text>
    </View>
  );

  const info = (
    <View style={{ flex: 1, gap: tokens.spacing.sm }}>
      <View style={{ gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {name}
        </Text>
        {location ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {location}
          </Text>
        ) : null}
      </View>

      {typeof rating === 'number' ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Rating value={rating} size="sm" />
          {typeof reviewCount === 'number' ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              ({reviewCount})
            </Text>
          ) : null}
        </View>
      ) : null}

      {tags.length > 0 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
          {tags.map((t, i) => (
            <Badge key={`${t}-${i}`} tone="neutral">
              {t}
            </Badge>
          ))}
        </View>
      ) : null}

      {typeof priceCents === 'number' ? (
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
          <PriceTag cents={priceCents} currency={currency} compareAtCents={compareAtCents} size="md" />
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>/ night</Text>
        </View>
      ) : null}
    </View>
  );

  const body = (
    <View
      style={[
        {
          flexDirection: row ? 'row' : 'column',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      {media}
      {info}
    </View>
  );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}${location ? `, ${location}` : ''}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {body}
    </Pressable>
  );
}
