import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface RadioOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** The choices (RN has no `<input type=radio>` children — pass them as data). */
  options: RadioOption[];
  /** Controlled selected value. */
  value: string;
  /**
   * Fires with the chosen option's value. Prefer `onChange` — that is the kit's
   * one canonical name for "the value changed", and what the web twin has
   * always called this. `onValueChange` is the original native spelling, kept
   * so existing callers keep working; if both are passed this one wins.
   */
  onValueChange?: (value: string) => void;
  /** Canonical spelling of `onValueChange` (see it for the precedence rule). */
  onChange?: (value: string) => void;
  /** Accepted for web parity; native has no form-name semantics (no-op). */
  name?: string;
  orientation?: 'vertical' | 'horizontal';
  style?: StyleProp<ViewStyle>;
}

const DOT = 20;
const INNER = 10;

/**
 * Single-choice radio group — the native mirror of the web `RadioGroup`. A
 * token-bound `Pressable` row per option with a filled dot for the selection.
 * No literal colors.
 */
export function RadioGroup({
  options,
  value,
  onValueChange,
  onChange,
  orientation = 'vertical',
  style,
}: RadioGroupProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  // Two spellings, one callback: the original wins when both are passed, so a
  // caller who has migrated half a file never gets the change reported twice.
  const emit = onValueChange ?? onChange;
  return (
    <View
      accessibilityRole="radiogroup"
      style={[
        {
          flexDirection: orientation === 'vertical' ? 'column' : 'row',
          flexWrap: orientation === 'horizontal' ? 'wrap' : 'nowrap',
          gap: tokens.spacing.sm,
        },
        style,
      ]}
    >
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="radio"
            accessibilityState={{ selected, disabled: o.disabled }}
            disabled={o.disabled}
            onPress={() => emit?.(o.value)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.sm,
              opacity: o.disabled ? 0.5 : 1,
            }}
          >
            <View
              style={{
                width: DOT,
                height: DOT,
                borderRadius: tokens.radius.full,
                borderWidth: 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: colors.surface,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {selected ? (
                <View
                  style={{
                    width: INNER,
                    height: INNER,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.primary,
                  }}
                />
              ) : null}
            </View>
            {typeof o.label === 'string' ? (
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
                {o.label}
              </Text>
            ) : (
              o.label
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
