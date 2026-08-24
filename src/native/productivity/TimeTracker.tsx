import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface TimeTrackerProps {
  /** Pre-formatted elapsed label (e.g. `'01:24:07'`). */
  elapsedLabel: string;
  /** Whether the timer is currently running. */
  running?: boolean;
  /** Fires with the next running value when the start/stop control is pressed. */
  onToggle?: (running: boolean) => void;
  /** Optional context label (e.g. the task name being timed). */
  label?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A start/stop time tracker: an elapsed readout, an optional context label, and
 * a toggle control that reads as **success** (running) or **primary** (stopped)
 * with a matching play/stop glyph. The control exposes a `button` a11y role with
 * a stateful label. No literal colors.
 */
export function TimeTracker({
  elapsedLabel,
  running = false,
  onToggle,
  label,
  style,
}: TimeTrackerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const accent = running ? colors.success : colors.primary;
  const onAccent = running ? colors.onSuccess : colors.onPrimary;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          padding: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
          {elapsedLabel}
        </Text>
        {label ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {label}
          </Text>
        ) : null}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: running }}
        accessibilityLabel={running ? 'Stop timer' : 'Start timer'}
        onPress={() => onToggle?.(!running)}
        style={({ pressed }) => ({
          width: 40,
          height: 40,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: accent,
          opacity: pressed ? 0.85 : 1,
        })}
      >
        <Text style={{ color: onAccent, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {running ? '■' : '▶'}
        </Text>
      </Pressable>
    </View>
  );
}
