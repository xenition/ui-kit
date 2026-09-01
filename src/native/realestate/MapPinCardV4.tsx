import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { GradientSurface } from './internal/GradientSurface';
import type { MapPinCardProps } from './MapPinCard';

/** Drop-in for {@link MapPinCardProps} — same props, the V4 "listing" design. */
export type MapPinCardV4Props = MapPinCardProps;

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * MapPinCard — **V4** "listing" design. The image-forward, editorial take on the
 * location preview: a rounded elevated frame with a subtle soft-primary gradient
 * "ground" (no faux grid clutter) and a single primary pill pin marking the spot.
 * STATIC and dependency-free — it imports no `react-native-maps` / `MapView`, so it
 * renders in any environment; wire a real map behind `onPress`. Same props/behavior
 * as {@link MapPinCardProps}: `address` + `caption` in a floating card overlay,
 * `pin` position clamped to the frame. Token-only colors via `useXenitionTheme()`;
 * a11y-labelled.
 */
export function MapPinCardV4({
  address,
  caption,
  pin = { x: 0.5, y: 0.5 },
  height = 160,
  onPress,
  style,
}: MapPinCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const x = clamp01(pin.x);
  const y = clamp01(pin.y);

  const frame = (
    <GradientSurface
      colors={[withAlpha(colors.primary, 0.14), colors.surface]}
      style={[
        {
          height,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: 'hidden',
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      {/* Price/location pin — a primary pill marker. */}
      <View
        testID="xen-re-map-pin"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{ position: 'absolute', left: `${x * 100}%`, top: `${y * 100}%`, transform: [{ translateX: -60 }, { translateY: -34 }], width: 120, alignItems: 'center' }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.primary,
            borderWidth: 1,
            borderColor: colors.onPrimary,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
          }}
        >
          <Text style={{ fontSize: tokens.typography.scale.xs }}>📍</Text>
          <Text numberOfLines={1} style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {address}
          </Text>
        </View>
        <View style={{ width: 2, height: 8, backgroundColor: colors.primary }} />
      </View>

      {/* Caption overlay. */}
      <View
        style={{
          position: 'absolute',
          left: tokens.spacing.sm,
          right: tokens.spacing.sm,
          bottom: tokens.spacing.sm,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.sm,
        }}
      >
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {address}
        </Text>
        {caption ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {caption}
          </Text>
        ) : null}
      </View>
    </GradientSurface>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityRole="image" accessibilityLabel={`Map showing ${address}`}>
        {frame}
      </View>
    );
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open map for ${address}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {frame}
    </Pressable>
  );
}
