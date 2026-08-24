import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Avatar, Rating, Button } from '../primitives';
import { formatMoney, type MoneyFormatter } from '../commerce/money';

export type StylistCardVariant = 'detailed' | 'compact';

export interface StylistCardProps {
  /** Stylist / practitioner name. */
  name: string;
  /** Role or title, e.g. "Senior Colorist". */
  role?: string;
  /** Specialties / tags (e.g. `['Balayage', 'Bridal']`). Guarded when empty. */
  specialties?: string[];
  /** Avatar image URL; initials fall back when absent. */
  avatarUrl?: string;
  /** Average rating (0–5). Hidden when omitted. */
  rating?: number;
  /** Number of reviews backing the rating. */
  reviewCount?: number;
  /** "From" price in integer cents. */
  priceFromCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Override the cents → string money formatter. */
  formatMoney?: MoneyFormatter;
  /** Availability note (e.g. "Next: Today 3pm"). */
  availability?: string;
  /** Marks the stylist fully booked; disables the CTA. */
  fullyBooked?: boolean;
  /** Density. `compact` drops specialties + CTA. */
  variant?: StylistCardVariant;
  /** Loading skeleton (ignores data). */
  loading?: boolean;
  /** CTA label (default "Book"). */
  bookLabel?: string;
  /** Fires when the CTA is pressed. */
  onBook?: () => void;
  /** Fires when the card body is pressed. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A stylist / practitioner profile card: avatar, name + role, an optional star
 * rating with review count, specialty chips, a "from" price and availability
 * line, plus a "Book" CTA. `variant="compact"` drops the chips and CTA for
 * list rows; `loading` shows a token-tinted skeleton; `fullyBooked` disables
 * the CTA and swaps its label. Token-only colors — chips use `withAlpha` tints.
 */
export function StylistCard({
  name,
  role,
  specialties,
  avatarUrl,
  rating,
  reviewCount,
  priceFromCents,
  currency = 'USD',
  formatMoney: format = formatMoney,
  availability,
  fullyBooked = false,
  variant = 'detailed',
  loading = false,
  bookLabel = 'Book',
  onBook,
  onPress,
  style,
}: StylistCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const tags = specialties ?? [];

  if (loading) {
    return (
      <View
        accessibilityRole="none"
        accessibilityLabel="Loading stylist"
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.md,
          },
          style,
        ]}
      >
        <View style={{ width: 48, height: 48, borderRadius: tokens.radius.full, backgroundColor: withAlpha(colors.muted, 0.25) }} />
        <View style={{ flex: 1, gap: tokens.spacing.sm }}>
          <View style={{ height: 14, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.25) }} />
          <View style={{ height: 12, width: '75%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.18) }} />
        </View>
      </View>
    );
  }

  const compact = variant === 'compact';
  const priceText = priceFromCents != null ? `from ${format(priceFromCents, currency)}` : undefined;
  const a11yLabel = `${name}${role ? `, ${role}` : ''}${rating != null ? `, rated ${rating} out of 5` : ''}${
    fullyBooked ? ', fully booked' : ''
  }`;

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={a11yLabel}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          gap: tokens.spacing.md,
          opacity: pressed && onPress ? 0.92 : 1,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <Avatar src={avatarUrl} name={name} size="lg" />
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {name}
          </Text>
          {role ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {role}
            </Text>
          ) : null}
          {rating != null ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <Rating value={rating} size="sm" />
              {reviewCount != null ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>({reviewCount})</Text>
              ) : null}
            </View>
          ) : null}
        </View>
        {priceText ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{priceText}</Text>
        ) : null}
      </View>

      {!compact && tags.length > 0 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
          {tags.map((tag, i) => (
            <View
              key={`${tag}-${i}`}
              style={{
                borderRadius: tokens.radius.full,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: 2,
                backgroundColor: withAlpha(colors.primary, 0.12),
              }}
            >
              <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{tag}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {availability ? (
        <Text style={{ color: fullyBooked ? colors.warn : colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {availability}
        </Text>
      ) : null}

      {!compact && onBook ? (
        <Button variant="primary" onPress={onBook} disabled={fullyBooked}>
          {fullyBooked ? 'Fully booked' : bookLabel}
        </Button>
      ) : null}
    </Pressable>
  );
}
