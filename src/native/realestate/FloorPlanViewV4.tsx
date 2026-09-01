import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { GradientSurface } from './internal/GradientSurface';
import type { FloorPlanViewProps } from './FloorPlanView';

/** Drop-in for {@link FloorPlanViewProps} — same props, the V4 "listing" design. */
export type FloorPlanViewV4Props = FloorPlanViewProps;

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);
const ABSOLUTE_FILL = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as const;

/**
 * FloorPlanView — **V4** "listing" design. The image-forward, editorial take on
 * the schematic plan: a rounded elevated frame with a soft-primary gradient
 * "ground", the `title` shown as an active level tab, rooms drawn as soft-primary
 * tinted token rectangles, and a room-count area caption. STATIC and
 * dependency-free — no image, SVG, or native map dep; it renders anywhere. Same
 * props/behavior as {@link FloorPlanViewProps}; an empty `rooms` array shows a
 * labelled placeholder. Token-only colors via `useXenitionTheme()`; the frame
 * carries an a11y label.
 */
export function FloorPlanViewV4({
  title = 'Floor plan',
  rooms = [],
  height = 200,
  onPress,
  style,
}: FloorPlanViewV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const body = (
    <View
      accessible
      accessibilityRole={onPress ? 'button' : 'image'}
      accessibilityLabel={`${title}${rooms.length ? `, ${rooms.length} rooms` : ', schematic'}`}
      style={[
        {
          gap: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: tokens.spacing.sm,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      {/* Level tab — the title as an active soft-primary chip. */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: tokens.spacing.xs, paddingTop: tokens.spacing.xs }}>
        <View
          style={{
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, 0.1),
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
          }}
        >
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{title}</Text>
        </View>
      </View>

      {/* Plan ground — subtle soft-primary gradient scrim. */}
      <GradientSurface
        colors={[withAlpha(colors.primary, 0.14), colors.surface]}
        style={{
          height,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: 'hidden',
        }}
      >
        {rooms.length === 0 ? (
          <View style={{ ...ABSOLUTE_FILL, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Floor plan unavailable</Text>
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
                backgroundColor: withAlpha(colors.primary, 0.1),
                borderRadius: tokens.radius.sm,
                alignItems: 'center',
                justifyContent: 'center',
                padding: tokens.spacing.xs,
              }}
            >
              <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>
                {room.label}
              </Text>
            </View>
          ))
        )}
      </GradientSurface>

      {/* Area caption. */}
      <Text style={{ paddingHorizontal: tokens.spacing.xs, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
        {rooms.length ? `${rooms.length} rooms` : 'Schematic'}
      </Text>
    </View>
  );

  if (!onPress) return body;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}>
      {body}
    </Pressable>
  );
}
