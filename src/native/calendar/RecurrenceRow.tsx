import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { withAlpha } from './format';

export type RecurrenceFreq = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RecurrenceOption {
  value: RecurrenceFreq;
  label: string;
}

export interface RecurrenceRowProps {
  /** The selected recurrence frequency. */
  value: RecurrenceFreq;
  /** Fires when a different frequency is chosen. */
  onChange?: (value: RecurrenceFreq) => void;
  /** Leading label (default "Repeat"). */
  label?: string;
  /**
   * `inline` (default) shows selectable preset chips; `summary` collapses to a
   * single tappable row (host opens its own picker via `onPress`).
   */
  variant?: 'inline' | 'summary';
  /** For `summary` variant — fires when the row is tapped. */
  onPress?: () => void;
  /** Override the preset list. */
  options?: RecurrenceOption[];
  style?: StyleProp<ViewStyle>;
}

const DEFAULT_OPTIONS: RecurrenceOption[] = [
  { value: 'none', label: 'Does not repeat' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

/**
 * The recurrence editor row for an event form. `inline` renders preset chips
 * (selection announced via `accessibilityState.selected`, not color-alone);
 * `summary` collapses to a single tappable row that shows the current rule and
 * defers to a host-owned picker. Token colors only.
 */
export function RecurrenceRow({
  value,
  onChange,
  label = 'Repeat',
  variant = 'inline',
  onPress,
  options = DEFAULT_OPTIONS,
  style,
}: RecurrenceRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const current = options.find((o) => o.value === value) ?? options[0];

  if (variant === 'summary') {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${current?.label ?? 'None'}`}
        onPress={onPress}
        style={({ pressed }) => [
          {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: tokens.spacing.sm,
            opacity: pressed ? 0.7 : 1,
          },
          style,
        ]}
      >
        <Icon glyph="🔁" size="sm" color="muted" />
        <Text style={{ marginLeft: tokens.spacing.sm, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {label}
        </Text>
        <View style={{ flex: 1 }} />
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{current?.label ?? 'None'}</Text>
        <Text style={{ marginLeft: tokens.spacing.xs, color: colors.muted, fontSize: tokens.typography.scale.base }}>›</Text>
      </Pressable>
    );
  }

  return (
    <View accessibilityRole="none" style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: tokens.spacing.xs }}>
        <Icon glyph="🔁" size="sm" color="muted" />
        <Text style={{ marginLeft: tokens.spacing.sm, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {label}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
        {options.map((o) => {
          const active = o.value === value;
          return (
            <Pressable
              key={o.value}
              accessibilityRole="radio"
              accessibilityLabel={o.label}
              accessibilityState={{ selected: active }}
              onPress={() => onChange?.(o.value)}
              style={{
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
                borderRadius: tokens.radius.full,
                borderWidth: 1,
                borderColor: active ? colors.primary : colors.border,
                backgroundColor: active ? withAlpha(colors.primary, 0.14) : colors.surface,
              }}
            >
              <Text style={{ color: active ? colors.primary : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: active ? '700' : '500' }}>
                {o.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
