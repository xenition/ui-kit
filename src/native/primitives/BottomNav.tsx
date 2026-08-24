import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useXenitionTheme } from '../theme';

export interface BottomNavItem {
  key: string;
  label: string;
  /** Optional icon node (e.g. an `<Icon glyph="🏠" />`). */
  icon?: React.ReactNode;
}

export interface BottomNavProps {
  items: BottomNavItem[];
  /** Key of the active tab. */
  active: string;
  /** Fires with the selected tab key. */
  onChange: (key: string) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Fixed bottom tab bar — the primary mobile navigation pattern. A full-width
 * row of tappable items on a `surface` background with a top hairline in the
 * `border` token; the active item's label renders in the `primary` tone while
 * inactive items use `muted`. Exposes `tablist`/`tab` a11y roles with the
 * selected state. No literal colors.
 */
export function BottomNav({ items, active, onChange, style }: BottomNavProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  // Add the device's bottom safe-area inset to the token padding so the bar
  // clears the home indicator. Needs a `SafeAreaProvider` above it (Expo default).
  const insets = useSafeAreaInsets();

  return (
    <View
      accessibilityRole="tablist"
      style={[
        {
          flexDirection: 'row',
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingBottom: tokens.spacing.sm + insets.bottom,
          paddingTop: tokens.spacing.sm,
        },
        style,
      ]}
    >
      {items.map((item) => {
        const selected = item.key === active;
        const tone = selected ? colors.primary : colors.muted;
        return (
          <Pressable
            key={item.key}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={item.label}
            onPress={() => onChange(item.key)}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              gap: tokens.spacing.xs,
              paddingVertical: tokens.spacing.xs,
            }}
          >
            {item.icon != null ? <View>{item.icon}</View> : null}
            <Text
              numberOfLines={1}
              style={{
                fontSize: tokens.typography.scale.xs,
                fontWeight: selected ? '600' : '400',
                color: tone,
              }}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
