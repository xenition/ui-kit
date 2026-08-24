import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface WaterTrackerProps {
  /** Glasses (or units) consumed so far. Clamped to `[0, goal]`. */
  count: number;
  /** Daily goal in glasses/units. */
  goal: number;
  /** Volume per glass in ml, used for the total readout. */
  mlPerGlass?: number;
  /** Fires with the next count when a glass icon is tapped. */
  onChange?: (next: number) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A hydration tracker rendered as a row of tappable glass icons: filled glasses
 * up to `count`, empty ones to `goal`. Tapping a glass sets the count to that
 * position (tapping the last filled glass clears it back one). Shows a
 * `current / goal` and optional ml total. Guards `goal <= 0` with a muted note.
 * Token-only colors.
 */
export function WaterTracker({
  count,
  goal,
  mlPerGlass,
  onChange,
  style,
}: WaterTrackerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (goal <= 0) {
    return <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No hydration goal set</Text>;
  }

  const safeGoal = Math.floor(goal);
  const filled = Math.min(Math.max(Math.floor(count), 0), safeGoal);
  const met = filled >= safeGoal;

  const handlePress = (index: number): void => {
    if (!onChange) return;
    const position = index + 1;
    onChange(position === filled ? position - 1 : position);
  };

  return (
    <View
      accessibilityLabel={`Water: ${filled} of ${safeGoal} glasses${met ? ', goal reached' : ''}`}
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          💧 Water
        </Text>
        <Text style={{ color: met ? colors.success : colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {filled} / {safeGoal}
          {mlPerGlass != null ? `  ·  ${filled * mlPerGlass} ml` : ''}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
        {Array.from({ length: safeGoal }, (_, i) => {
          const isFilled = i < filled;
          const glass = (
            <Text
              allowFontScaling={false}
              style={{ fontSize: tokens.typography.scale.xl, opacity: isFilled ? 1 : 0.3 }}
            >
              {isFilled ? '🥛' : '🥛'}
            </Text>
          );
          if (!onChange) {
            return (
              <View key={i} accessibilityLabel={`Glass ${i + 1}, ${isFilled ? 'filled' : 'empty'}`}>
                {glass}
              </View>
            );
          }
          return (
            <Pressable
              key={i}
              accessibilityRole="button"
              accessibilityLabel={`Glass ${i + 1}, ${isFilled ? 'filled' : 'empty'}`}
              onPress={() => handlePress(i)}
              style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
            >
              {glass}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
