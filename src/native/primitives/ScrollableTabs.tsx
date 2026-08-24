import * as React from 'react';
import { Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface ScrollableTabItem {
  value: string;
  label: React.ReactNode;
  /** Optional count/notification chip shown after the label. */
  badge?: React.ReactNode;
}

export interface ScrollableTabsProps {
  items: ScrollableTabItem[];
  value: string;
  onValueChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Horizontally scrollable tab bar for when there are more tabs than fit the
 * viewport (the base `Tabs` is a fixed non-scrolling row). Each tab is a
 * `Pressable` inside a horizontal `ScrollView`, with a token-bound active
 * underline and an optional trailing badge. All colors and spacing come from the
 * compiled theme tokens via `useXenitionTheme()` — no literal colors.
 */
export function ScrollableTabs({
  items,
  value,
  onValueChange,
  style,
}: ScrollableTabsProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      accessibilityRole="tablist"
      style={[{ borderBottomWidth: 1, borderColor: colors.border }, style]}
      contentContainerStyle={{ gap: tokens.spacing.xs }}
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
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
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
                  fontWeight: active ? '600' : '500',
                }}
              >
                {it.label}
              </Text>
            ) : (
              it.label
            )}
            {it.badge != null ? (
              <View
                style={{
                  minWidth: tokens.spacing.md,
                  alignItems: 'center',
                  paddingHorizontal: tokens.spacing.xs,
                  paddingVertical: tokens.spacing.xs / 2,
                  borderRadius: tokens.radius.full,
                  backgroundColor: active ? colors.primary : colors.muted,
                }}
              >
                {typeof it.badge === 'string' || typeof it.badge === 'number' ? (
                  <Text style={{ color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                    {it.badge}
                  </Text>
                ) : (
                  it.badge
                )}
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
