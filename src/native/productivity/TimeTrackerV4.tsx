import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { TimeTrackerProps } from './TimeTracker';

/** Drop-in for {@link TimeTrackerProps} — same props, the V4 "flow" design. */
export type TimeTrackerV4Props = TimeTrackerProps;

/**
 * TimeTracker — **V4** "flow" design. The focused-workspace take on a stopwatch:
 * a **big, monospaced-feel elapsed numeral** with the context label beneath, and
 * a large (≥44px) round start/stop control that reads **primary** when idle and
 * flips to **danger "stop"** while running. A live session lifts the whole card
 * into a soft-primary running glow so the timer reads as alive without shouting.
 * Keeps the running/elapsed contract of {@link TimeTrackerProps}; token-only
 * colors via `useXenitionTheme()` + `withAlpha`.
 */
export function TimeTrackerV4({
  elapsedLabel,
  running = false,
  onToggle,
  label,
  style,
}: TimeTrackerV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const accent = running ? colors.danger : colors.primary;
  const onAccent = running ? colors.onDanger : colors.onPrimary;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: running ? withAlpha(colors.primary, 0.5) : colors.border,
          backgroundColor: running ? withAlpha(colors.primary, 0.08) : colors.surface,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{
            color: running ? colors.primaryText : colors.onSurface,
            fontSize: tokens.typography.scale['3xl'],
            fontWeight: '700',
            fontVariant: ['tabular-nums'],
            letterSpacing: -0.5,
          }}
        >
          {elapsedLabel}
        </Text>
        {label ? (
          <Text numberOfLines={1} style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
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
          width: 44,
          height: 44,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: accent,
          opacity: pressed ? 0.85 : 1,
        })}
      >
        <Text style={{ color: onAccent, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
          {running ? '■' : '▶'}
        </Text>
      </Pressable>
    </View>
  );
}
