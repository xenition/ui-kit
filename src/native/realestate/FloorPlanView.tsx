import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';

/** A single room rectangle, positioned as fractions (0–1) of the frame. */
export interface FloorPlanRoom {
  /** Room label (e.g. "Bedroom", "Kitchen"). */
  label: string;
  /** Left edge, 0–1 of frame width. */
  x: number;
  /** Top edge, 0–1 of frame height. */
  y: number;
  /** Width, 0–1 of frame width. */
  w: number;
  /** Height, 0–1 of frame height. */
  h: number;
}

export interface FloorPlanViewProps {
  /** Heading (e.g. "Floor 1"). */
  title?: string;
  /**
   * Rooms to draw as token-styled rectangles. Empty renders a labelled
   * placeholder frame (still dependency-free).
   */
  rooms?: FloorPlanRoom[];
  /** Frame height in px (default 200). */
  height?: number;
  /** Fires when a room rectangle is not needed; the whole frame press. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * A schematic floor plan — a STATIC, dependency-free styled placeholder built
 * from plain `View` rectangles positioned as fractions of the frame. No image,
 * SVG, or native dependency; it renders anywhere. Rooms in, nothing fetches;
 * an empty `rooms` array shows a labelled placeholder. Token-only colors
 * (rooms tinted with the `border` fill and `onSurface` labels).
 */
export function FloorPlanView({
  title = 'Floor plan',
  rooms = [],
  height = 200,
  onPress,
  style,
}: FloorPlanViewProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View
      accessible
      accessibilityRole={onPress ? 'button' : 'image'}
      accessibilityLabel={`${title}${rooms.length ? `, ${rooms.length} rooms` : ', schematic'}`}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
        {title}
      </Text>
      <View
        style={{
          height,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          overflow: 'hidden',
        }}
      >
        {rooms.length === 0 ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              Floor plan unavailable
            </Text>
          </View>
        ) : (
          rooms.map((room, i) => (
            <View
              key={`${room.label}-${i}`}
              style={{
                position: 'absolute',
                left: `${clamp01(room.x) * 100}%`,
                top: `${clamp01(room.y) * 100}%`,
                width: `${clamp01(room.w) * 100}%`,
                height: `${clamp01(room.h) * 100}%`,
                borderWidth: 1,
                borderColor: colors.primary,
                backgroundColor: colors.border,
                alignItems: 'center',
                justifyContent: 'center',
                padding: tokens.spacing.xs,
              }}
            >
              <Text
                numberOfLines={1}
                style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '500' }}
              >
                {room.label}
              </Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}
