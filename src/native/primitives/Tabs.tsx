import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface TabItem {
  value: string;
  label: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Themed tab bar (controlled) — the native mirror of the web `Tabs`. A row of
 * `Pressable` tabs with a token-bound active underline; render the active panel
 * yourself based on `value`. No literal colors.
 */
export function Tabs({ items, value, onValueChange, style }: TabsProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      accessibilityRole="tablist"
      style={[
        { flexDirection: 'row', gap: tokens.spacing.xs, borderBottomWidth: 1, borderColor: colors.border },
        style,
      ]}
    >
      {items.map((it) => {
        const active = it.value === value;
        return (
          <Pressable
            key={it.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onValueChange(it.value)}
            style={{
              paddingHorizontal: tokens.spacing.lg,
              paddingVertical: tokens.spacing.sm,
              borderBottomWidth: 2,
              marginBottom: -1,
              borderColor: active ? colors.primary : 'transparent',
            }}
          >
            {typeof it.label === 'string' ? (
              <Text
                style={{
                  color: active ? colors.primary : colors.muted,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: '500',
                }}
              >
                {it.label}
              </Text>
            ) : (
              it.label
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
