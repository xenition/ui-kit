import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Rating, Badge, PriceTag } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { journeyDisc, journeyInk } from './internal/journey';
import type { HotelCardProps } from './HotelCard';

/** Drop-in for {@link HotelCardProps} — same props, the V4 "journey" design. */
export type HotelCardV4Props = HotelCardProps;

/**
 * HotelCard — **V4** "journey" design. The boarding-pass take on a hotel result:
 * an elevated clean card with a small brand-gradient disc behind the leading
 * hotel glyph (the signature V4 touch), the property name/location, guest star
 * rating, amenity chips, and the nightly fare sitting below a dashed
 * boarding-pass tear line. Same props/behavior as {@link HotelCardProps};
 * token-only colors via `useXenitionTheme()`. `variant="row"` keeps the layout
 * compact.
 */
export function HotelCardV4({
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
}: HotelCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;

  const body = (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.1,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        {/* Signature V4 touch: gradient disc behind the leading glyph */}
        <GradientSurface
          colors={journeyDisc(r)}
          style={{
            width: 48,
            height: 48,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Text style={{ color: journeyInk(r), fontSize: tokens.typography.scale['2xl'] }}>🏨</Text>
        </GradientSurface>

        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
          >
            {name}
          </Text>
          {location ? (
            <Text numberOfLines={1} style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
              {location}
            </Text>
          ) : null}
        </View>

        {typeof rating === 'number' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Rating value={rating} size="sm" />
            {typeof reviewCount === 'number' ? (
              <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
                ({reviewCount})
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>

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
        <View
          style={{
            paddingTop: tokens.spacing.md,
            borderTopWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.border,
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>Nightly from</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
            <PriceTag cents={priceCents} currency={currency} compareAtCents={compareAtCents} size="md" />
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>/ night</Text>
          </View>
        </View>
      ) : null}
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
