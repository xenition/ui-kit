import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Badge, PriceTag } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { journeyHorizon, journeyInk, journeyInkSoft, journeyTile, journeyBorder } from './internal/journey';
import type { DestinationCardProps } from './DestinationCard';

/** Drop-in for {@link DestinationCardProps} — same props, the V4 "journey" design. */
export type DestinationCardV4Props = DestinationCardProps;

/**
 * DestinationCard — **V4** "journey" design. The boarding-pass take on a
 * destination tile: a decorative accent→primary "horizon" gradient cover carries
 * the destination name in near-white ink (the signature V4 touch), with the
 * "from" price sitting in a frosted glass tile overlaid on the gradient. The
 * overlaid glyph/emoji and optional badge ribbon are preserved, and the
 * country/tagline sit on the calm surface below. Same props/behavior as
 * {@link DestinationCardProps}; token-only colors via `useXenitionTheme()`.
 * `variant="wide"` fills the container width.
 */
export function DestinationCardV4({
  name,
  country,
  tagline,
  glyph = '🌍',
  fromCents,
  currency = 'USD',
  badge,
  variant = 'default',
  onPress,
  style,
}: DestinationCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const wide = variant === 'wide';

  const body = (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          width: wide ? '100%' : 220,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.1,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      {/* Signature V4 touch: decorative accent→primary "horizon" gradient cover */}
      <GradientSurface
        colors={journeyHorizon(r)}
        style={{
          height: wide ? 132 : 148,
          padding: tokens.spacing.md,
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <Text
          style={{ position: 'absolute', top: tokens.spacing.sm, right: tokens.spacing.md, fontSize: tokens.typography.scale['3xl'] }}
        >
          {glyph}
        </Text>
        {badge ? (
          <View style={{ position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }}>
            <Badge tone="primary">{badge}</Badge>
          </View>
        ) : null}

        <Text
          numberOfLines={2}
          style={{ color: journeyInk(r), fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
        >
          {name}
        </Text>

        {typeof fromCents === 'number' ? (
          <View
            style={{
              marginTop: tokens.spacing.sm,
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'baseline',
              gap: tokens.spacing.xs,
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: 2,
              borderRadius: tokens.radius.md,
              backgroundColor: journeyTile(r),
              borderWidth: 1,
              borderColor: journeyBorder(r),
            }}
          >
            <Text style={{ color: journeyInkSoft(r), fontSize: tokens.typography.scale.xs }}>from</Text>
            <PriceTag cents={fromCents} currency={currency} size="sm" />
          </View>
        ) : null}
      </GradientSurface>

      <View style={{ padding: tokens.spacing.md, gap: tokens.spacing.xs }}>
        {country ? (
          <Text numberOfLines={1} style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {country}
          </Text>
        ) : null}
        {tagline ? (
          <Text numberOfLines={2} style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>
            {tagline}
          </Text>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}${country ? `, ${country}` : ''}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {body}
    </Pressable>
  );
}
