import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { CARRIER_META, SHIPMENT_META, toneColor } from './internal';
import type { ShipmentCardProps } from './ShipmentCard';

/** Drop-in for {@link ShipmentCard}: identical props, a distinct design. */
export type ShipmentCardV3Props = ShipmentCardProps;

/**
 * ShipmentCard, alternate design **V3** — a *dense list line*. Borderless and
 * single-row: a leading status-glyph chip, then a two-line stack (tracking
 * number + inline carrier glyph, then a muted `origin → destination · ETA`
 * meta line), with the status word right-aligned. Built to repeat tightly in a
 * shipments list — the inverse of V2's elevated card. Status stays glyph + word
 * (tone reinforces only). Same props; loading renders a slim skeleton line.
 */
export function ShipmentCardV3({
  trackingNumber,
  recipient,
  origin,
  destination,
  status,
  carrier = 'generic',
  service,
  eta,
  pieces,
  loading = false,
  onPress,
  testID,
  style,
}: ShipmentCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = SHIPMENT_META[status] ?? SHIPMENT_META.draft;
  const accent = toneColor(colors, meta.tone);
  const carrierMeta = CARRIER_META[carrier] ?? CARRIER_META.generic;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.sm,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.xs,
      borderBottomWidth: 1,
      borderColor: colors.border,
      backgroundColor: 'transparent',
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading shipment" style={containerStyle}>
        <View style={{ width: 26, height: 26, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] }} />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View style={{ height: 12, width: '45%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] }} />
          <View style={{ height: 10, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        </View>
      </View>
    );
  }

  const meta2 = [
    origin || destination ? `${origin ?? '—'} → ${destination ?? '—'}` : null,
    recipient,
    eta ? `ETA ${eta}` : null,
    pieces != null ? `${pieces} pc` : null,
    service,
  ]
    .filter(Boolean)
    .join('  ·  ');

  const inner = (
    <>
      <View
        style={{
          width: 26,
          height: 26,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(accent, 0.16),
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: accent }}>
          {meta.glyph}
        </Text>
      </View>

      <View style={{ flex: 1, minWidth: 0, gap: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
            {carrierMeta.glyph}
          </Text>
          <Text numberOfLines={1} style={{ flex: 1, fontSize: tokens.typography.scale.sm, fontWeight: '700', color: colors.onSurface }}>
            {trackingNumber}
          </Text>
        </View>
        {meta2 ? (
          <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
            {meta2}
          </Text>
        ) : null}
      </View>

      <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '700', color: accent }}>
        {meta.label}
      </Text>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Shipment ${trackingNumber}, ${meta.label}`}
        onPress={onPress}
        testID={testID}
        style={({ pressed }) => [containerStyle, { backgroundColor: pressed ? withAlpha(colors.primary, 0.04) : 'transparent' }]}
      >
        {inner}
      </Pressable>
    );
  }

  return (
    <View testID={testID} style={containerStyle}>
      {inner}
    </View>
  );
}
