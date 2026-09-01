import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { PricingToggleProps } from './PricingToggle';

/** Drop-in for {@link PricingToggleProps} — same props, the V4 "showcase" design. */
export type PricingToggleV4Props = PricingToggleProps;

/**
 * PricingToggle — **V4** "showcase" design (native mirror of the web V4). A
 * tactile segmented control: a soft-neutral track with a pill-shaped selected
 * segment in `primary` / `onPrimary` ink and an optional soft-primary "save X%"
 * chip per option. Reports the active key via `value`/`onChange`, ≥44px targets.
 * Same props/behavior as {@link PricingToggleProps}; token-only colors, no
 * literals.
 */
export function PricingToggleV4({
  options,
  value,
  onChange,
  label = 'Billing period',
  style,
}: PricingToggleV4Props): React.ReactElement {
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
          backgroundColor: tokens.ramps.neutral[100],
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
              minHeight: 44,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: tokens.spacing.xs,
              borderRadius: tokens.radius.full,
              paddingHorizontal: tokens.spacing.lg,
              paddingVertical: tokens.spacing.xs,
              backgroundColor: active ? colors.primary : 'transparent',
            }}
          >
            <Text
              style={{
                color: active ? colors.onPrimary : colors.muted,
                fontSize: tokens.typography.scale.sm,
                fontWeight: '600',
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
