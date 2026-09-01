import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface YesNoToggleProps {
  /** Current answer. `null`/`undefined` → nothing selected. */
  value?: boolean | null;
  /** Fires with the chosen answer. */
  onChange: (value: boolean) => void;
  /** Label for the affirmative side. Default `'Yes'`. */
  yesLabel?: string;
  /** Label for the negative side. Default `'No'`. */
  noLabel?: string;
  /** Accessible name for the group. Default `'Yes or no'`. */
  accessibilityLabel?: string;
  /** Non-interactive + dimmed when `true`. Default `false`. */
  disabled?: boolean;
  /** Extra style on the root. */
  style?: StyleProp<ViewStyle>;
}

/**
 * YesNoToggle — **V4** "clean form / focus" binary segmented control. Two big
 * side-by-side buttons on a calm neutral surface: the selected side fills with
 * the single signature accent — solid `primary` with `onPrimary` text — while
 * the other stays `surface` + `border`. No gradients. Exposed as a `radiogroup`
 * of two `radio`s so the choice is announced. Controlled via `value` +
 * `onChange`; token-only colors via `useXenitionTheme()`.
 */
export function YesNoToggle({
  value,
  onChange,
  yesLabel = 'Yes',
  noLabel = 'No',
  accessibilityLabel = 'Yes or no',
  disabled = false,
  style,
}: YesNoToggleProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const options: readonly { label: string; answer: boolean }[] = [
    { label: yesLabel, answer: true },
    { label: noLabel, answer: false },
  ];

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
      style={[{ flexDirection: 'row', gap: tokens.spacing.sm, opacity: disabled ? 0.5 : 1 }, style]}
    >
      {options.map(({ label, answer }) => {
        const selected = value === answer;
        return (
          <Pressable
            key={label}
            accessibilityRole="radio"
            accessibilityState={{ selected, disabled }}
            accessibilityLabel={label}
            disabled={disabled}
            onPress={() => onChange(answer)}
            style={{
              flex: 1,
              height: 56,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tokens.radius.lg,
              borderWidth: selected ? 2 : 1,
              borderColor: selected ? colors.primary : colors.border,
              backgroundColor: selected ? colors.primary : colors.surface,
            }}
          >
            <Text
              style={{
                color: selected ? colors.onPrimary : colors.onSurface,
                fontSize: tokens.typography.scale.lg,
                fontWeight: '800',
              }}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
