import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { journeyHorizon, journeyInk, journeyInkSoft, journeyTile, journeyBorder } from './internal/journey';
import type { MapCardProps } from './MapCard';

/** Drop-in for {@link MapCardProps} — same props, the V4 "journey" design. */
export type MapCardV4Props = MapCardProps;

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * MapCard — **V4** "journey" design. The boarding-pass take on a location
 * preview: a decorative accent→primary "horizon" gradient ground stands in for
 * the map tiles (the signature V4 touch), the pin sits inside a frosted glass
 * tile with near-white ink, and the label/caption ride a matching frosted card
 * so the place name stays legible on the saturated ground. It remains a STATIC,
 * dependency-free placeholder — there is intentionally no `react-native-maps`
 * import, so it renders in any environment. Wire a real map behind `onPress`
 * when needed. Same props/behavior as {@link MapCardProps}; token-only colors
 * via `useXenitionTheme()`.
 */
export function MapCardV4({
  label,
  caption,
  pin = { x: 0.5, y: 0.5 },
  height = 160,
  onPress,
  style,
}: MapCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const x = clamp01(pin.x);
  const y = clamp01(pin.y);

  const frame = (
    <GradientSurface
      colors={journeyHorizon(r)}
      style={[
        {
          height,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {/* Faux grid — purely decorative near-white lines standing in for map tiles. */}
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={StyleSheetAbsolute}
      >
        {[0.25, 0.5, 0.75].map((f) => (
          <View
            key={`h-${f}`}
            style={{ position: 'absolute', left: 0, right: 0, top: `${f * 100}%`, height: 1, backgroundColor: journeyBorder(r, 0.2) }}
          />
        ))}
        {[0.25, 0.5, 0.75].map((f) => (
          <View
            key={`v-${f}`}
            style={{ position: 'absolute', top: 0, bottom: 0, left: `${f * 100}%`, width: 1, backgroundColor: journeyBorder(r, 0.2) }}
          />
        ))}
      </View>

      {/* Pin glyph inside a frosted tile. */}
      <View
        testID="xen-map-pin"
        style={{
          position: 'absolute',
          left: `${x * 100}%`,
          top: `${y * 100}%`,
          marginLeft: -14,
          marginTop: -14,
          width: 28,
          height: 28,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: journeyTile(r),
          borderWidth: 1,
          borderColor: journeyBorder(r),
        }}
      >
        <Text style={{ color: journeyInk(r), fontSize: tokens.typography.scale.sm }}>📍</Text>
      </View>

      {/* Caption overlay — frosted glass tile with near-white ink. */}
      <View
        style={{
          position: 'absolute',
          left: tokens.spacing.sm,
          right: tokens.spacing.sm,
          bottom: tokens.spacing.sm,
          backgroundColor: journeyTile(r),
          borderWidth: 1,
          borderColor: journeyBorder(r),
          borderRadius: tokens.radius.sm,
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.sm,
        }}
      >
        <Text numberOfLines={1} style={{ color: journeyInk(r), fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {label}
        </Text>
        {caption ? (
          <Text numberOfLines={1} style={{ color: journeyInkSoft(r), fontSize: tokens.typography.scale.xs }}>
            {caption}
          </Text>
        ) : null}
      </View>
    </GradientSurface>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityRole="image" accessibilityLabel={`Map showing ${label}`}>
        {frame}
      </View>
    );
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open map for ${label}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {frame}
    </Pressable>
  );
}

/** Inlined absolute-fill (avoids a StyleSheet import for one rule). */
const StyleSheetAbsolute = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as const;
