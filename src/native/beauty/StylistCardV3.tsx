import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Avatar, Rating, Button } from '../primitives';
import { formatMoney } from '../commerce/money';
import type { StylistCardProps } from './StylistCard';

/** Drop-in alternate of {@link StylistCardProps} — identical prop contract. */
export type StylistCardV3Props = StylistCardProps;

/**
 * StylistCard — design variant **V3**: a **dense compact row** for lists. A
 * small avatar, a middle column of name · role with an inline star rating +
 * "from" price, and a trailing small **Book** button, all on one hairline-ruled
 * line — no card fill, no shadow. Where V1 is a padded card and V2 a hero tile,
 * V3 is the scannable directory row. Same props as {@link StylistCardProps};
 * specialty chips are omitted by design at this density. `loading` shows a
 * skeleton; `fullyBooked` disables the CTA. Token-only colors.
 */
export function StylistCardV3({
  name,
  role,
  avatarUrl,
  rating,
  reviewCount,
  priceFromCents,
  currency = 'USD',
  formatMoney: format = formatMoney,
  availability,
  fullyBooked = false,
  loading = false,
  bookLabel = 'Book',
  onBook,
  onPress,
  style,
}: StylistCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const rowBase: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading stylist" style={[rowBase, style]}>
        <View style={{ width: 32, height: 32, borderRadius: tokens.radius.full, backgroundColor: withAlpha(colors.muted, 0.25) }} />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View style={{ height: 12, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.25) }} />
          <View style={{ height: 10, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.18) }} />
        </View>
      </View>
    );
  }

  const priceText = priceFromCents != null ? `from ${format(priceFromCents, currency)}` : undefined;

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${name}${role ? `, ${role}` : ''}${rating != null ? `, rated ${rating} out of 5` : ''}${
        fullyBooked ? ', fully booked' : ''
      }`}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [rowBase, { opacity: pressed && onPress ? 0.85 : 1 }, style]}
    >
      <Avatar src={avatarUrl} name={name} size="sm" />

      <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {name}
          {role ? <Text style={{ color: colors.muted, fontWeight: '400' }}> · {role}</Text> : null}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {rating != null ? <Rating value={rating} size="sm" /> : null}
          {rating != null && reviewCount != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>({reviewCount})</Text>
          ) : null}
          {priceText ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{priceText}</Text>
          ) : null}
          {availability ? (
            <Text style={{ color: fullyBooked ? colors.warn : colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {availability}
            </Text>
          ) : null}
        </View>
      </View>

      {onBook ? (
        <Button size="sm" variant="soft" onPress={onBook} disabled={fullyBooked}>
          {fullyBooked ? 'Booked' : bookLabel}
        </Button>
      ) : null}
    </Pressable>
  );
}
