import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { withAlpha } from './tint';

export interface SnoozeRowProps {
  /** Preset name (e.g. "Later today", "Tomorrow", "Next week"). */
  label: string;
  /** Resolved time shown on the trailing side (e.g. "6:00 PM"). */
  when?: string;
  /** Leading glyph. Default a clock. */
  glyph?: string;
  /** Selected preset — tinted + check. */
  selected?: boolean;
  /** Choose this preset. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single snooze-preset option row — glyph, preset name, and the resolved time
 * it maps to. Used to build the snooze picker sheet. The `selected` state tints
 * the row and shows a check, and reports `selected` to assistive tech (not by
 * color only). No literal colors.
 */
export function SnoozeRow({
  label,
  when,
  glyph = '⏰',
  selected = false,
  onPress,
  style,
}: SnoozeRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Snooze ${label}${when ? `, ${when}` : ''}`}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          backgroundColor: selected ? withAlpha(colors.primary, 0.12) : pressed ? colors.border : 'transparent',
        },
        style,
      ]}
    >
      <Icon glyph={glyph} size="lg" color={selected ? 'primary' : 'muted'} />
      <Text
        style={{
          flex: 1,
          color: colors.onSurface,
          fontSize: tokens.typography.scale.base,
          fontWeight: selected ? '700' : '500',
        }}
      >
        {label}
      </Text>
      {when ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{when}</Text>
      ) : null}
      {selected ? (
        <View accessibilityElementsHidden importantForAccessibility="no">
          <Icon glyph="✓" size="base" color="primary" />
        </View>
      ) : null}
    </Pressable>
  );
}
