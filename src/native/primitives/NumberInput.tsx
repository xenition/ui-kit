import * as React from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export interface NumberInputProps {
  value: number;
  /**
   * Fires with the clamped value. Prefer `onChange` — that is the kit's one
   * canonical name for "the value changed", and what the web twin has always
   * called this. `onValueChange` is the original native spelling, kept so
   * existing callers keep working; if both are passed this one wins.
   */
  onValueChange?: (value: number) => void;
  /** Canonical spelling of `onValueChange` (see it for the precedence rule). */
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Number input with −/+ steppers — the native mirror of the web `NumberInput`.
 * A numeric `TextInput` flanked by token-bound `Pressable` steppers; clamps to
 * `[min, max]`. No literal colors.
 */
export function NumberInput({
  value,
  onValueChange,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  style,
}: NumberInputProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  // Two spellings, one callback: the original wins when both are passed, so a
  // caller who has migrated half a file never gets the change reported twice.
  const emit = onValueChange ?? onChange;
  const clamp = (v: number): number =>
    Math.max(min ?? -Infinity, Math.min(max ?? Infinity, v));
  const set = (v: number): void => {
    if (!Number.isNaN(v)) emit?.(clamp(v));
  };
  const atMin = min != null && value <= min;
  const atMax = max != null && value >= max;

  const renderStepper = (
    label: string,
    accessibilityLabel: string,
    onPress: () => void,
    off: boolean
  ): React.ReactElement => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: disabled || off }}
      disabled={disabled || off}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: pressed ? colors.border : 'transparent',
        opacity: disabled || off ? 0.4 : 1,
      })}
    >
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg }}>{label}</Text>
    </Pressable>
  );

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.sm,
          backgroundColor: colors.surface,
          overflow: 'hidden',
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {renderStepper('−', 'Decrease', () => set(value - step), atMin)}
      <TextInput
        keyboardType="numeric"
        editable={!disabled}
        accessibilityState={{ disabled }}
        value={String(value)}
        onChangeText={(t) => {
          if (t.trim() === '') return;
          set(Number(t));
        }}
        style={{
          minWidth: 48,
          textAlign: 'center',
          color: colors.onSurface,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          fontSize: tokens.typography.scale.base,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: colors.border,
        }}
      />
      {renderStepper('+', 'Increase', () => set(value + step), atMax)}
    </View>
  );
}
