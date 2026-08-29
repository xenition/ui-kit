import * as React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { fieldBorder, fieldMetrics, haloStyle } from './internal/field-v4';
import type { NumberInputProps } from './NumberInput';
import { pressLayer } from './internal/state-v4';

export type { NumberInputProps as NumberInputV4Props };

/**
 * **V4 number input** — the same props as {@link NumberInput}, a different
 * design line.
 *
 * A stepper is the control people miss most often, because the base makes both
 * of its buttons 40pt inside a 34pt row and puts them either side of a value
 * that shifts as it grows. V4 fixes all three:
 *
 * 1. **Square targets at the control's own height.** Each stepper is
 *    `2xl × 2xl` — the same `2xl` `InputV4` is tall, so the whole control
 *    matches the field above it in a form and each button clears 44pt on its
 *    own (§30, mobile is not compressed desktop).
 * 2. **A value that does not move.** The number is centred, given a minimum
 *    width off the spacing scale, and set in tabular figures, so 9 → 10 → 100
 *    does not shuffle the steppers under the finger while someone is holding
 *    one down (§36.11 — do not move a control out from under the finger).
 * 3. **A focus ring on the whole control.** Focusing the number lights the
 *    same brand halo `InputV4` paints, around the entire stepper rather than
 *    the text box inside it, because the control is the thing that has focus.
 *    Its space is reserved either way, so nothing shifts (§36.11).
 *
 * A stepper at its limit is dimmed **and** disabled, so the state is in the
 * interaction and not only in the colour (§46). No gradient, no glass, no
 * shadow: §16 asks that forms stay minimal.
 */
export function NumberInputV4({
  value,
  onValueChange,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  style,
}: NumberInputProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const metrics = fieldMetrics(theme);
  const [focused, setFocused] = React.useState(false);

  // Two spellings, one callback: the original wins when both are passed, so a
  // caller who has migrated half a file never gets the change reported twice.
  const emit = onValueChange ?? onChange;
  const clamp = (v: number): number => Math.max(min ?? -Infinity, Math.min(max ?? Infinity, v));
  const set = (v: number): void => {
    if (!Number.isNaN(v)) emit?.(clamp(v));
  };

  const atMin = min != null && value <= min;
  const atMax = max != null && value >= max;

  const stepper = (
    glyph: string,
    label: string,
    onPress: () => void,
    off: boolean
  ): React.ReactElement => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: disabled || off }}
      disabled={disabled || off}
      onPress={onPress}
      style={({ pressed }) => ({
        width: metrics.height,
        height: metrics.height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: pressed ? pressLayer(theme) : 'transparent',
        opacity: disabled || off ? theme.state.disabledContent : 1,
      })}
    >
      <Text
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale.lg,
          fontFamily: tokens.typography.fontBody,
        }}
      >
        {glyph}
      </Text>
    </Pressable>
  );

  return (
    <View style={[haloStyle(theme, { showing: focused, accent: colors.ring }), { alignSelf: 'flex-start' }]}>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: metrics.radius,
            backgroundColor: colors.surface,
            overflow: 'hidden',
            opacity: disabled ? theme.state.disabledContent : 1,
            ...fieldBorder(theme, { invalid: false, focused }),
          },
          style,
        ]}
      >
        {stepper('−', 'Decrease', () => set(value - step), atMin)}
        <TextInput
          keyboardType="numeric"
          editable={!disabled}
          accessibilityState={{ disabled }}
          value={String(value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChangeText={(text) => {
            if (text.trim() === '') return;
            set(Number(text));
          }}
          style={{
            // Wide enough for four figures before it grows, so the steppers
            // stay where the finger left them.
            minWidth: tokens.spacing['2xl'],
            height: metrics.height,
            textAlign: 'center',
            color: colors.onSurface,
            paddingHorizontal: tokens.spacing.sm,
            fontSize: tokens.typography.scale.base,
            fontFamily: tokens.typography.fontBody,
            // Figures of equal width: the number changes, the layout does not.
            fontVariant: ['tabular-nums'],
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: colors.border,
          }}
        />
        {stepper('+', 'Increase', () => set(value + step), atMax)}
      </View>
    </View>
  );
}
