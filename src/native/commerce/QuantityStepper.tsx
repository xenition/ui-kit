import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface QuantityStepperProps {
  /** Current quantity. */
  value: number;
  /** Lower bound (default 1). Decrement disabled at this value. */
  min?: number;
  /** Upper bound (default none). Increment disabled at this value. */
  max?: number;
  /** Increment/decrement amount (default 1). */
  step?: number;
  /** Called with the clamped next value. */
  onChange?: (value: number) => void;
  /** Disable the whole control. */
  disabled?: boolean;
  /** Accessible label for the group (default `Quantity`). */
  label?: string;
  /** Accessible label for the − button (default `Decrease quantity`). */
  decrementLabel?: string;
  /** Accessible label for the + button (default `Increase quantity`). */
  incrementLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const clamp = (n: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, n));

/**
 * A −/n/+ quantity control — the native mirror of the web `QuantityStepper`.
 * Values are clamped to `[min, max]`; the boundary button disables itself at
 * each end so `onChange` never fires an out-of-range value. Token-only.
 */
export function QuantityStepper({
  value,
  min = 1,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  onChange,
  disabled = false,
  label = 'Quantity',
  decrementLabel = 'Decrease quantity',
  incrementLabel = 'Increase quantity',
  style,
}: QuantityStepperProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const atMin = value <= min;
  const atMax = value >= max;

  const emit = (next: number): void => {
    const clamped = clamp(next, min, max);
    if (clamped !== value) onChange?.(clamped);
  };

  const button = (
    kind: 'dec' | 'inc',
    accLabel: string,
    isDisabled: boolean,
    onPress: () => void,
    borderSide: ViewStyle
  ): React.ReactElement => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accLabel}
      accessibilityState={{ disabled: isDisabled }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          width: 32,
          height: 32,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isDisabled ? 0.4 : pressed ? 0.7 : 1,
        },
        borderSide,
      ]}
    >
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg }}>
        {kind === 'dec' ? '−' : '+'}
      </Text>
    </Pressable>
  );

  return (
    <View
      accessibilityRole="adjustable"
      accessibilityLabel={label}
      accessibilityValue={{ now: value, min, max: Number.isFinite(max) ? max : undefined }}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          backgroundColor: colors.surface,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {button('dec', decrementLabel, disabled || atMin, () => emit(value - step), {
        borderRightWidth: 1,
        borderColor: colors.border,
      })}
      <Text
        accessibilityLiveRegion="polite"
        style={{
          minWidth: 32,
          textAlign: 'center',
          paddingHorizontal: tokens.spacing.sm,
          color: colors.onSurface,
          fontSize: tokens.typography.scale.sm,
          fontWeight: '500',
        }}
      >
        {value}
      </Text>
      {button('inc', incrementLabel, disabled || atMax, () => emit(value + step), {
        borderLeftWidth: 1,
        borderColor: colors.border,
      })}
    </View>
  );
}
