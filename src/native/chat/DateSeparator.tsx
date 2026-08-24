import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface DateSeparatorProps {
  /** The date/label to show centered in the pill (e.g. "Today", "12 Aug"). */
  label: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Centered date chip that breaks a message stream into day sections. Announced
 * as a header for screen-reader navigation. No literal colors — the pill fill
 * and text come from semantic tokens.
 */
export function DateSeparator({ label, style }: DateSeparatorProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      accessibilityRole="header"
      style={[{ alignItems: 'center', paddingVertical: tokens.spacing.sm }, style]}
    >
      <View
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.full,
          paddingVertical: 2,
          paddingHorizontal: tokens.spacing.md,
        }}
      >
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>
          {label}
        </Text>
      </View>
    </View>
  );
}
