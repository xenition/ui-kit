import * as React from 'react';
import { Animated, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import { Avatar, Rating, Button } from '../primitives';
import { formatMoney } from '../commerce/money';
import type { StylistCardProps } from './StylistCard';

/** Drop-in alternate of {@link StylistCardProps} — identical prop contract. */
export type StylistCardV2Props = StylistCardProps;

/**
 * StylistCard — design variant **V2**: a **centered profile card**. Where V1 is
 * an avatar-left row, V2 stacks a large ringed avatar, the name + role, the star
 * rating, centered specialty chips, an availability line, and a full-width
 * **Book** CTA down a single centered column — a hero "meet your stylist" tile.
 * Same props as {@link StylistCardProps}. `variant="compact"` still trims chips +
 * CTA; `loading` shows a token skeleton; `fullyBooked` disables the CTA. Elevated
 * (shadow, no border). Token-only colors.
 */
export function StylistCardV2({
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
  style,
}: StylistCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 8 });
  const tags = specialties ?? [];

  const base: StyleProp<ViewStyle> = {
    backgroundColor: colors.surface,
    borderRadius: tokens.radius.lg,
    borderWidth: 0,
    padding: tokens.spacing.lg,
    alignItems: 'center',
    gap: tokens.spacing.md,
    ...shadow('md', tokens),
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading stylist" style={[base, style]}>
        <View style={{ width: 72, height: 72, borderRadius: tokens.radius.full, backgroundColor: withAlpha(colors.muted, 0.25) }} />
        <View style={{ height: 14, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.25) }} />
        <View style={{ height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.18) }} />
      </View>
    );
  }

  const compact = variant === 'compact';
  const priceText = priceFromCents != null ? `from ${format(priceFromCents, currency)}` : undefined;

  return (
    <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>
      <View
        accessibilityLabel={`${name}${role ? `, ${role}` : ''}${rating != null ? `, rated ${rating} out of 5` : ''}${
          fullyBooked ? ', fully booked' : ''
        }`}
        style={[base, style]}
      >
        <Avatar src={avatarUrl} name={name} size="xl" ring />

        <View style={{ alignItems: 'center', gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {name}
          </Text>
          {role ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {role}
            </Text>
          ) : null}
        </View>

        {rating != null ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Rating value={rating} size="md" />
            {reviewCount != null ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>({reviewCount})</Text>
            ) : null}
          </View>
        ) : null}

        {!compact && tags.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: tokens.spacing.xs }}>
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

        {priceText ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{priceText}</Text>
        ) : null}

        {availability ? (
          <Text style={{ color: fullyBooked ? colors.warn : colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {availability}
          </Text>
        ) : null}

        {!compact && onBook ? (
          <Button variant="primary" onPress={onBook} disabled={fullyBooked} style={{ alignSelf: 'stretch' }}>
            {fullyBooked ? 'Fully booked' : bookLabel}
          </Button>
        ) : null}
      </View>
    </Animated.View>
  );
}
