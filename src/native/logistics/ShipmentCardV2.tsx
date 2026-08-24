import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CarrierBadge } from './CarrierBadge';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import { SHIPMENT_META, toneColor } from './internal';
import type { ShipmentCardProps } from './ShipmentCard';

/** Drop-in for {@link ShipmentCard}: identical props, a distinct design. */
export type ShipmentCardV2Props = ShipmentCardProps;

/**
 * ShipmentCard, alternate design **V2** — an *elevated hero card*. Where the
 * classic card is a flat outlined summary, V2 floats on a soft shadow, leads
 * with a carrier badge + a bold status pill on one header line, then dedicates a
 * full-width tinted "route strip" to origin → destination with the tone-glyph as
 * the arrow, and closes with a prominent ETA footer. It fades/rises in on mount
 * and springs on press. Status is glyph + word (tone only reinforces). Loading
 * and every prop behave exactly as the classic. No literal colors.
 */
export function ShipmentCardV2({
  trackingNumber,
  recipient,
  origin,
  destination,
  status,
  carrier,
  service,
  eta,
  pieces,
  variant = 'default',
  loading = false,
  onPress,
  testID,
  style,
}: ShipmentCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = SHIPMENT_META[status] ?? SHIPMENT_META.draft;
  const accent = toneColor(colors, meta.tone);
  const enter = useEnter({ translateY: 8 });
  const press = usePressScale();

  const containerStyle: StyleProp<ViewStyle> = [
    {
      borderRadius: tokens.radius.lg,
      backgroundColor: colors.surface,
      padding: tokens.spacing.md,
      gap: tokens.spacing.sm,
      ...shadow('md', tokens),
    },
    style,
  ];

  if (loading) {
    return (
      <Animated.View accessibilityLabel="Loading shipment" style={[containerStyle, enter]}>
        <View style={{ height: 18, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] }} />
        <View style={{ height: 40, width: '100%', borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] }} />
        <View style={{ height: 12, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
      </Animated.View>
    );
  }

  const content = (
    <>
      {/* Header: carrier identity + bold status pill. */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <CarrierBadge carrier={carrier} service={service} size="sm" />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(accent, 0.16),
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: accent }}>
            {meta.glyph}
          </Text>
          <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '700', color: accent }}>
            {meta.label}
          </Text>
        </View>
      </View>

      <View style={{ gap: 1 }}>
        <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.lg, fontWeight: '700', color: colors.onSurface }}>
          {trackingNumber}
        </Text>
        {recipient ? (
          <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
            {recipient}
          </Text>
        ) : null}
      </View>

      {/* Route strip: origin → destination on a tinted panel. */}
      {variant === 'default' && (origin || destination) ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(accent, 0.08),
          }}
        >
          <Text numberOfLines={1} style={{ flex: 1, fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }}>
            {origin ?? '—'}
          </Text>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base, color: accent }}>
            →
          </Text>
          <Text numberOfLines={1} style={{ flex: 1, textAlign: 'right', fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }}>
            {destination ?? '—'}
          </Text>
        </View>
      ) : null}

      {/* Footer: ETA + piece count. */}
      {eta || pieces != null ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          {eta ? (
            <Text style={{ fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }}>
              {`ETA · ${eta}`}
            </Text>
          ) : (
            <View />
          )}
          {pieces != null ? (
            <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
              {`${pieces} ${pieces === 1 ? 'piece' : 'pieces'}`}
            </Text>
          ) : null}
        </View>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Animated.View style={[enter, { transform: [...enter.transform, { scale: press.scale }] }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Shipment ${trackingNumber}, ${meta.label}`}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          testID={testID}
          style={containerStyle}
        >
          {content}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View testID={testID} style={[containerStyle, enter]}>
      {content}
    </Animated.View>
  );
}
