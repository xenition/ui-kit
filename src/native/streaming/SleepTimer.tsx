import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

/** Default preset durations (minutes) offered by a {@link SleepTimer}. */
const DEFAULT_PRESETS: readonly number[] = [5, 15, 30, 45, 60];

export interface SleepTimerProps {
  /** Active timer in minutes, or `null` when the sleep timer is off. */
  value: number | null;
  /** Called with the chosen minutes, or `null` when "Off" is chosen. */
  onChange: (minutes: number | null) => void;
  /** Preset durations (minutes) to offer as chips. Defaults to `[5, 15, 30, 45, 60]`. */
  presets?: readonly number[];
  /** When `true`, an "End of episode" chip is shown and reflected as selected. */
  endOfEpisode?: boolean;
  /** Called when the "End of episode" chip is chosen. Enables the chip when provided. */
  onEndOfEpisode?: () => void;
  /** Optional header label above the chips (default `'Sleep timer'`). */
  title?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * SleepTimer — **V4** "spotlight" design. A sleep-timer control on a clean
 * elevated surface: a row of quick-preset chips plus an "Off" chip and an
 * optional "End of episode" chip. The active choice is the one accent — a solid
 * **primary** fill with `onPrimary` ink; the rest are a soft primary tint. Chips
 * are ≥44px tap targets, grouped as a `radiogroup`, and the active timer is
 * announced. Presentational only; token-only colors via `useXenitionTheme()`
 * and `withAlpha` (no literal hex). Dark-mode safe.
 */
export function SleepTimer({
  value,
  onChange,
  presets = DEFAULT_PRESETS,
  endOfEpisode,
  onEndOfEpisode,
  title = 'Sleep timer',
  style,
}: SleepTimerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const eoeSelected = !!endOfEpisode;
  const announce = eoeSelected
    ? 'Sleep timer: end of episode'
    : value == null
      ? 'Sleep timer off'
      : `Sleep timer: ${value} minutes`;

  const chip = (key: string, label: string, selected: boolean, onPress: () => void, a11yLabel?: string) => (
    <Pressable
      key={key}
      accessibilityRole="radio"
      accessibilityLabel={a11yLabel ?? label}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: tokens.radius.full,
        paddingHorizontal: tokens.spacing.md,
        backgroundColor: selected ? colors.primary : withAlpha(colors.primary, 0.12),
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <Text
        style={{
          color: selected ? colors.onPrimary : colors.onSurface,
          fontSize: tokens.typography.scale.sm,
          fontWeight: '600',
        }}
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          padding: tokens.spacing.md,
          gap: tokens.spacing.sm,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: colors.muted,
          fontSize: tokens.typography.scale.xs,
          fontWeight: '700',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          paddingHorizontal: tokens.spacing.xs,
        }}
      >
        {title}
      </Text>

      {/* Live announcement of the active timer for screen readers. */}
      <View
        accessibilityRole="text"
        accessibilityLiveRegion="polite"
        accessibilityLabel={announce}
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0 }}
      />

      <View
        accessibilityRole="radiogroup"
        accessibilityLabel={title}
        style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}
      >
        {chip('off', 'Off', value == null && !eoeSelected, () => onChange(null))}
        {presets.map((min) =>
          chip(String(min), `${min}m`, !eoeSelected && value === min, () => onChange(min), `${min} minutes`)
        )}
        {onEndOfEpisode ? chip('eoe', 'End of episode', eoeSelected, onEndOfEpisode) : null}
      </View>
    </View>
  );
}
