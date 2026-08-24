import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface ToggleGroupOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ToggleGroupProps {
  /** The toggles (pass as data). */
  options: ToggleGroupOption[];
  /**
   * Controlled value: a single `string` in single mode, or a `string[]` in
   * `multiple` mode.
   */
  value?: string | string[];
  /** Fires with the next value (string in single mode, string[] in multiple). */
  onChange?: (value: string | string[]) => void;
  /** Allow more than one active option at a time. */
  multiple?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Segmented toggle group — a row of connected pressables that toggle on/off.
 * Unlike the display-only `Segmented`, single mode is deselectable and a
 * `multiple` mode lets several be active at once (value becomes a `string[]`).
 * Active options fill with `primary`/`onPrimary`; the shared border and radius
 * come from `useXenitionTheme()`. No literal colors.
 */
export function ToggleGroup({
  options,
  value,
  onChange,
  multiple = false,
  disabled = false,
  accessibilityLabel,
  style,
}: ToggleGroupProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const selected = React.useMemo<string[]>(() => {
    if (multiple) return Array.isArray(value) ? value : [];
    return typeof value === 'string' && value ? [value] : [];
  }, [value, multiple]);

  const toggle = (v: string): void => {
    if (multiple) {
      const set = new Set(selected);
      if (set.has(v)) set.delete(v);
      else set.add(v);
      onChange?.(Array.from(set));
    } else {
      onChange?.(selected[0] === v ? '' : v);
    }
  };

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
      style={[
        {
          flexDirection: 'row',
          alignSelf: 'flex-start',
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {options.map((opt, i) => {
        const active = selected.includes(opt.value);
        const itemDisabled = disabled || opt.disabled;
        return (
          <Pressable
            key={opt.value}
            accessibilityRole={multiple ? 'checkbox' : 'radio'}
            accessibilityState={{ selected: active, disabled: itemDisabled, checked: active }}
            accessibilityLabel={opt.label}
            disabled={itemDisabled}
            onPress={() => toggle(opt.value)}
            style={({ pressed }) => ({
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.md,
              backgroundColor: active
                ? colors.primary
                : pressed
                  ? colors.border
                  : colors.surface,
              borderLeftWidth: i === 0 ? 0 : 1,
              borderLeftColor: colors.border,
            })}
          >
            <Text
              style={{
                color: active ? colors.onPrimary : colors.onSurface,
                fontSize: tokens.typography.scale.sm,
                fontWeight: active ? '700' : '500',
              }}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
