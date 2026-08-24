import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type RoutineSlot = 'morning' | 'afternoon' | 'evening' | 'bedtime' | 'anytime';

const SLOT_GLYPH: Record<RoutineSlot, string> = {
  morning: '🌅',
  afternoon: '☀️',
  evening: '🌆',
  bedtime: '🌙',
  anytime: '⏰',
};

export interface RoutineRowProps {
  /** Step label, e.g. "Brush teeth". */
  label: string;
  /** Time-of-day slot; drives the fallback icon. */
  slot?: RoutineSlot;
  /** Explicit emoji/glyph (overrides the slot icon). */
  icon?: string;
  /** Scheduled time, e.g. "7:30 AM". */
  time?: string;
  /** Whether the step is done. */
  done?: boolean;
  /** Disable the toggle. */
  disabled?: boolean;
  /** Toggle the done state. Presence makes the row a tappable checkbox. */
  onToggle?: (next: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single routine step row: an icon, label + time, and a tappable done/not-done
 * checkbox. Done state is shown by a check glyph, strike-through, and the a11y
 * `checked` state — never color alone. When `onToggle` is set the whole row is a
 * `checkbox` role. Token-only colors.
 */
export function RoutineRow({
  label,
  slot = 'anytime',
  icon,
  time,
  done = false,
  disabled = false,
  onToggle,
  style,
}: RoutineRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const glyph = icon ?? SLOT_GLYPH[slot] ?? '⏰';

  const row = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.md,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
        {glyph}
      </Text>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '600',
            textDecorationLine: done ? 'line-through' : 'none',
          }}
        >
          {label}
        </Text>
        {time ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{time}</Text>
        ) : null}
      </View>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: tokens.radius.full,
          borderWidth: 1,
          borderColor: done ? colors.success : colors.border,
          backgroundColor: done ? colors.success : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {done ? (
          <Text allowFontScaling={false} style={{ color: colors.onSuccess, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            ✓
          </Text>
        ) : null}
      </View>
    </View>
  );

  const a11yLabel = `${label}${time ? `, ${time}` : ''}, ${done ? 'done' : 'not done'}`;
  if (!onToggle) {
    return <View accessibilityLabel={a11yLabel}>{row}</View>;
  }
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: done, disabled }}
      accessibilityLabel={a11yLabel}
      disabled={disabled}
      onPress={() => onToggle(!done)}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {row}
    </Pressable>
  );
}
