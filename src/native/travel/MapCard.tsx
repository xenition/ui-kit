import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';

export interface MapCardProps {
  /** Place name announced and shown under the pin. */
  label: string;
  /** Secondary address/coordinate line. */
  caption?: string;
  /**
   * Pin position as fractions of the frame, `0`–`1` (default centered). Clamped
   * so the marker never leaves the card.
   */
  pin?: { x: number; y: number };
  /** Frame height in px (default 160). */
  height?: number;
  /**
   * Surface treatment for the OUTER frame (visual diversity). Default
   * `'classic'` — the original look. The faux grid, pin, and caption overlay
   * keep their inner look regardless.
   */
  appearance?: Appearance;
  /** Fires when the card is pressed (e.g. to open the real map elsewhere). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * A location preview — a STATIC, dependency-free styled placeholder, NOT a live
 * map. It draws a token-tinted frame with faux grid lines and a single pin
 * marker; there is intentionally no `react-native-maps`/`MapView` import, so it
 * renders in any environment. Wire a real map behind `onPress` when needed.
 * Token-only colors.
 */
export function MapCard({
  label,
  caption,
  pin = { x: 0.5, y: 0.5 },
  height = 160,
  appearance = 'classic',
  onPress,
  style,
}: MapCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const x = clamp01(pin.x);
  const y = clamp01(pin.y);

  const frame = (
    <View
      style={[
        appearanceStyle(appearance, colors, tokens),
        {
          height,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {/* Faux grid — purely decorative token lines standing in for map tiles. */}
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{ ...StyleSheetAbsolute }}
      >
        {[0.25, 0.5, 0.75].map((f) => (
          <View
            key={`h-${f}`}
            style={{ position: 'absolute', left: 0, right: 0, top: `${f * 100}%`, height: 1, backgroundColor: colors.border }}
          />
        ))}
        {[0.25, 0.5, 0.75].map((f) => (
          <View
            key={`v-${f}`}
            style={{ position: 'absolute', top: 0, bottom: 0, left: `${f * 100}%`, width: 1, backgroundColor: colors.border }}
          />
        ))}
      </View>

      {/* Pin marker. */}
      <View
        testID="xen-map-pin"
        style={{
          position: 'absolute',
          left: `${x * 100}%`,
          top: `${y * 100}%`,
          marginLeft: -10,
          marginTop: -20,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.primary,
            borderWidth: 2,
            borderColor: colors.onPrimary,
          }}
        />
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
          borderRadius: tokens.radius.sm,
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.sm,
        }}
      >
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {label}
        </Text>
        {caption ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {caption}
          </Text>
        ) : null}
      </View>
    </View>
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
