import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface UnreadDividerProps {
  /** Divider label (default "Unread messages"). */
  label?: string;
  /** Optional count of unread messages, appended to the label when > 0. */
  count?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Full-width rule marking the first unread message in a thread — the "New
 * messages" line. Uses the primary token so it reads as an active marker.
 * Announced as a header. No literal colors.
 */
export function UnreadDivider({
  label = 'Unread messages',
  count,
  style,
}: UnreadDividerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const text = count != null && count > 0 ? `${count} ${label}` : label;
  return (
    <View
      accessibilityRole="header"
      accessibilityLabel={text}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, height: 1, backgroundColor: colors.primary, opacity: 0.5 }} />
      <Text
        style={{
          color: colors.primaryText,
          fontSize: tokens.typography.scale.xs,
          fontWeight: '600',
        }}
      >
        {text}
      </Text>
      <View style={{ flex: 1, height: 1, backgroundColor: colors.primary, opacity: 0.5 }} />
    </View>
  );
}
