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
  /**
   * Fires with the value of the tab that was pressed. Prefer `onChange` — that
   * is the kit's one canonical name for "the value changed". `onValueChange` is
   * this component's original spelling, kept so existing callers keep working;
   * if both are passed this one wins. One of the two is required in practice —
   * both are optional in the type so either spelling satisfies it on its own.
   */
  onValueChange?: (value: string) => void;
  /** Canonical spelling of `onValueChange` (see it for the precedence rule). */
  onChange?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Themed tab bar (controlled) — the native mirror of the web `Tabs`. A row of
 * `Pressable` tabs with a token-bound active underline; render the active panel
 * yourself based on `value`. No literal colors.
 */
export function Tabs({
  items,
  value,
  onValueChange,
  onChange,
  style,
}: TabsProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  // Two spellings, one callback: the original wins when both are passed, so a
  // caller who has migrated half a file never gets the change reported twice.
  const emit = onValueChange ?? onChange;
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
            onPress={() => emit?.(it.value)}
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
