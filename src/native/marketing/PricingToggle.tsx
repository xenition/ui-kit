import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface PricingToggleOption {
  /** Visible label ("Monthly", "Yearly", …). */
  label: string;
  /** Value reported via `onChange` when selected. */
  value: string;
  /** Optional small "save %" (or any) badge shown beside the label. */
  badge?: string;
}

export interface PricingToggleProps {
  /** Segments to switch between (2+ supported). */
  options: PricingToggleOption[];
  /** Currently active option value (controlled). */
  value: string;
  /** Fires with the newly selected value. */
  onChange: (value: string) => void;
  /** Accessible label for the switch group. */
  label?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Monthly/yearly (or N-option) segmented switch — the native mirror of the web
 * `PricingToggle`. Reports the active key via `value`/`onChange` and keeps the
 * per-option "save %" `badge` slot. Built as a token-styled pill track (the base
 * `Segmented` primitive has no badge slot), matching the web pill-toggle look.
 * Token-only.
 */
export function PricingToggle({
  options,
  value,
  onChange,
  label = 'Billing period',
  style,
}: PricingToggleProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View
      testID="xen-pricing-toggle"
      accessibilityRole="radiogroup"
      accessibilityLabel={label}
      style={[
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.full,
          padding: tokens.spacing.xs,
        },
        style,
      ]}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ selected: active, checked: active }}
            accessibilityLabel={option.label}
            onPress={() => onChange(option.value)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              borderRadius: tokens.radius.full,
              paddingHorizontal: tokens.spacing.md,
              paddingVertical: tokens.spacing.xs,
              backgroundColor: active ? colors.primary : 'transparent',
            }}
          >
            <Text
              style={{
                color: active ? colors.onPrimary : colors.muted,
                fontSize: tokens.typography.scale.sm,
                fontWeight: '500',
              }}
            >
              {option.label}
            </Text>
            {option.badge !== undefined ? (
              <View
                style={{
                  borderRadius: tokens.radius.full,
                  paddingHorizontal: tokens.spacing.xs,
                  paddingVertical: 1,
                  backgroundColor: active ? colors.onPrimary : tokens.ramps.primary[100],
                }}
              >
                <Text
                  style={{
                    color: active ? colors.primary : tokens.ramps.primary[700],
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '600',
                  }}
                >
                  {option.badge}
                </Text>
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}
