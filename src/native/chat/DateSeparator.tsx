import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';

export interface DateSeparatorProps {
  /** The date/label to show centered in the pill (e.g. "Today", "12 Aug"). */
  label: string;
  /**
   * Visual treatment for the pill surface (diversity system). Defaults to
   * `classic` — the historical surface fill with a hairline border.
   */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * Centered date chip that breaks a message stream into day sections. Announced
 * as a header for screen-reader navigation. No literal colors — the pill fill
 * and text come from semantic tokens.
 */
export function DateSeparator({
  label,
  appearance = 'classic',
  style,
}: DateSeparatorProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      accessibilityRole="header"
      style={[{ alignItems: 'center', paddingVertical: tokens.spacing.sm }, style]}
    >
      <View
        style={{
          // Appearance FIRST (fill/border/elevation); classic == surface + hairline border.
          ...appearanceStyle(appearance, colors, tokens),
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
