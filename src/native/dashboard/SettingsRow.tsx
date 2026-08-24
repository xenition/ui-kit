import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface SettingsRowProps {
  label: string;
  /** Optional current-value readout shown on the right (before `rightSlot`). */
  value?: string;
  /** Optional description under the label. */
  description?: string;
  /** Custom trailing control (switch, badge, …). Overrides the chevron. */
  rightSlot?: React.ReactNode;
  /** When set (and no `rightSlot`), shows a chevron and makes the row pressable. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single settings/preferences row: label (+ optional description) on the left,
 * a value and/or trailing control on the right. Shows a chevron and becomes
 * pressable when `onPress` is provided. Token-only.
 */
export function SettingsRow({
  label,
  value,
  description,
  rightSlot,
  onPress,
  style,
}: SettingsRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const inner = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.lg,
          minHeight: 48,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base }}>
          {label}
        </Text>
        {description ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {description}
          </Text>
        ) : null}
      </View>
      {value ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{value}</Text>
      ) : null}
      {rightSlot ?? (onPress ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.lg }}>›</Text>
      ) : null)}
    </View>
  );

  if (!onPress) {
    return <View accessibilityLabel={label}>{inner}</View>;
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {inner}
    </Pressable>
  );
}
