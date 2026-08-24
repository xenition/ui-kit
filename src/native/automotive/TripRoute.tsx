import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

/** An endpoint plotted on the static route frame. */
export interface RoutePoint {
  /** Short label shown under the row (e.g. `'Pickup'`). */
  label: string;
  /** Address / place line. */
  address?: string;
  /**
   * Position as fractions of the frame, `0`–`1` (clamped). Defaults place the
   * pickup lower-left and drop-off upper-right.
   */
  at?: { x: number; y: number };
}

export interface TripRouteProps {
  /** Trip start endpoint. */
  origin: RoutePoint;
  /** Trip end endpoint. */
  destination: RoutePoint;
  /** Optional intermediate waypoints (stops), plotted in order. */
  waypoints?: RoutePoint[];
  /** Pre-formatted total distance (e.g. `'8.4 mi'`). */
  distance?: string;
  /** Pre-formatted ETA / duration (e.g. `'22 min'`). */
  duration?: string;
  /** Frame height in px (default 180). */
  height?: number;
  /** Fires when the frame is pressed (e.g. to open a real map elsewhere). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const clamp01 = (n: number): number => (Number.isFinite(n) ? (n < 0 ? 0 : n > 1 ? 1 : n) : 0.5);

/** Inlined absolute-fill (avoids a StyleSheet import for one rule). */
const ABSOLUTE_FILL = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as const;

/**
 * A trip's origin→destination route rendered as a STATIC, dependency-free styled
 * placeholder — NOT a live map. It draws a token-tinted frame with faux grid
 * tiles, a dashed connecting line, and labelled A/B (plus numbered waypoint)
 * markers; there is intentionally no `react-native-maps`/`MapView` import, so it
 * renders in any environment. Endpoints are text-labelled, not color-coded
 * alone. Colors come from semantic tokens and `withAlpha` tints — no literal
 * colors. Wire a real map behind `onPress` when needed.
 */
export function TripRoute({
  origin,
  destination,
  waypoints = [],
  distance,
  duration,
  height = 180,
  onPress,
  style,
}: TripRouteProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const oAt = origin.at ?? { x: 0.2, y: 0.75 };
  const dAt = destination.at ?? { x: 0.8, y: 0.25 };
  const ox = clamp01(oAt.x);
  const oy = clamp01(oAt.y);
  const dx = clamp01(dAt.x);
  const dy = clamp01(dAt.y);

  // Dashed connector as a run of small dots between origin and destination.
  const DOTS = 7;
  const dots = Array.from({ length: DOTS }, (_, i) => {
    const t = (i + 1) / (DOTS + 1);
    return { x: ox + (dx - ox) * t, y: oy + (dy - oy) * t };
  });

  const marker = (
    x: number,
    y: number,
    glyph: string,
    tone: 'primary' | 'success' | 'accent',
    testID?: string
  ) => (
    <View
      key={`${glyph}-${testID ?? ''}`}
      testID={testID}
      style={{
        position: 'absolute',
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        marginLeft: -12,
        marginTop: -12,
        width: 24,
        height: 24,
        borderRadius: tokens.radius.full,
        backgroundColor: colors[tone],
        borderWidth: 2,
        borderColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>{glyph}</Text>
    </View>
  );

  const frame = (
    <View
      testID="xen-trip-route"
      style={[
        {
          height,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: withAlpha(colors.muted, 0.08),
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {/* Faux map tiles — purely decorative token grid standing in for a map. */}
      <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={{ ...ABSOLUTE_FILL }}>
        {[0.25, 0.5, 0.75].map((f) => (
          <View
            key={`h-${f}`}
            style={{ position: 'absolute', left: 0, right: 0, top: `${f * 100}%`, height: 1, backgroundColor: withAlpha(colors.border, 0.7) }}
          />
        ))}
        {[0.25, 0.5, 0.75].map((f) => (
          <View
            key={`v-${f}`}
            style={{ position: 'absolute', top: 0, bottom: 0, left: `${f * 100}%`, width: 1, backgroundColor: withAlpha(colors.border, 0.7) }}
          />
        ))}
      </View>

      {/* Dashed connector. */}
      {dots.map((p, i) => (
        <View
          key={`dot-${i}`}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{
            position: 'absolute',
            left: `${p.x * 100}%`,
            top: `${p.y * 100}%`,
            marginLeft: -3,
            marginTop: -3,
            width: 6,
            height: 6,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.primary,
          }}
        />
      ))}

      {/* Waypoints (numbered). */}
      {waypoints.map((w, i) => {
        const wx = clamp01(w.at?.x ?? 0.5);
        const wy = clamp01(w.at?.y ?? 0.5);
        return marker(wx, wy, String(i + 1), 'accent', `xen-trip-waypoint-${i}`);
      })}

      {marker(ox, oy, 'A', 'primary', 'xen-trip-origin')}
      {marker(dx, dy, 'B', 'success', 'xen-trip-destination')}

      {/* Distance / duration overlay. */}
      {distance || duration ? (
        <View
          style={{
            position: 'absolute',
            top: tokens.spacing.sm,
            right: tokens.spacing.sm,
            flexDirection: 'row',
            gap: tokens.spacing.sm,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: tokens.radius.sm,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
          }}
        >
          {distance ? (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{distance}</Text>
          ) : null}
          {duration ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{duration}</Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );

  const legend = (
    <View style={{ flexDirection: 'row', gap: tokens.spacing.md, marginTop: tokens.spacing.sm }}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>A · {origin.label}</Text>
        {origin.address ? (
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{origin.address}</Text>
        ) : null}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>B · {destination.label}</Text>
        {destination.address ? (
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{destination.address}</Text>
        ) : null}
      </View>
    </View>
  );

  const a11y = `Route from ${origin.label}${origin.address ? ` ${origin.address}` : ''} to ${destination.label}${
    destination.address ? ` ${destination.address}` : ''
  }${distance ? `, ${distance}` : ''}${duration ? `, ${duration}` : ''}`;

  const content = (
    <View>
      {frame}
      {legend}
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityRole="image" accessibilityLabel={a11y}>
        {content}
      </View>
    );
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open map. ${a11y}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}
    >
      {content}
    </Pressable>
  );
}
