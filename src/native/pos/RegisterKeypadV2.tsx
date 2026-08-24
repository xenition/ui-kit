import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from './internal';
import type { KeypadKey, RegisterKeypadProps } from './RegisterKeypad';

/** Drop-in alternate of {@link RegisterKeypadProps} — identical prop contract. */
export type RegisterKeypadV2Props = RegisterKeypadProps;

const DIGIT_ROWS: KeypadKey[][] = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];

const KEY_LABEL: Partial<Record<KeypadKey, string>> = {
  decimal: 'Decimal point',
  doubleZero: 'Double zero',
  backspace: 'Backspace',
  clear: 'Clear entry',
};

/**
 * RegisterKeypad — design variant **V2**: a **large, elevated keypad** built for
 * a countertop terminal. Where V1 is a flat bordered grid with a slim display,
 * V2 floats on a shadowed surface, leads with a big **amount display band** (a
 * primary-tinted panel with an oversized running total), and gives every key a
 * tall, borderless touch target. Same props as {@link RegisterKeypadProps} —
 * value folding, `variant`, `pin` masking, `disabled`, `maxLength`. Token-only.
 */
export function RegisterKeypadV2({
  value = '',
  onChange,
  onKeyPress,
  variant = 'amount',
  showDisplay = true,
  displayPrefix,
  placeholder = '0',
  maxLength = 12,
  disabled = false,
  accessibilityLabel = 'Register keypad',
  style,
}: RegisterKeypadV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const applyKey = (key: KeypadKey): string => {
    switch (key) {
      case 'backspace':
        return value.slice(0, -1);
      case 'clear':
        return '';
      case 'decimal':
        return value.includes('.') || value.length >= maxLength ? value : `${value || '0'}.`;
      case 'doubleZero':
        return value.length + 2 > maxLength ? value : `${value}00`;
      default:
        return value.length >= maxLength ? value : `${value}${key}`;
    }
  };

  const press = (key: KeypadKey): void => {
    if (disabled) return;
    onKeyPress?.(key);
    const next = applyKey(key);
    if (next !== value) onChange?.(next);
  };

  const bottomLeft: KeypadKey = variant === 'amount' ? 'decimal' : variant === 'number' ? 'doubleZero' : 'clear';
  const rows: KeypadKey[][] = [...DIGIT_ROWS, [bottomLeft, '0', 'backspace']];
  const displayText = variant === 'pin' ? '•'.repeat(value.length) : value;

  const keyLabel = (key: KeypadKey): string => KEY_LABEL[key] ?? key;
  const keyGlyph = (key: KeypadKey): string => {
    switch (key) {
      case 'decimal':
        return '.';
      case 'doubleZero':
        return '00';
      case 'backspace':
        return '⌫';
      case 'clear':
        return 'C';
      default:
        return key;
    }
  };

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      style={[
        {
          gap: tokens.spacing.md,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          opacity: disabled ? 0.5 : 1,
          ...shadow('lg', tokens),
        },
        style,
      ]}
    >
      {showDisplay ? (
        <View
          accessibilityLabel={`Entry ${value || placeholder}`}
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'flex-end',
            gap: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(colors.primary, 0.1),
            paddingVertical: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.lg,
          }}
        >
          {displayPrefix ? (
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xl, fontWeight: '600' }}>
              {displayPrefix}
            </Text>
          ) : null}
          <Text
            numberOfLines={1}
            allowFontScaling={false}
            style={{
              color: value ? colors.onSurface : colors.muted,
              fontSize: tokens.typography.scale['2xl'],
              fontWeight: '800',
            }}
          >
            {displayText || placeholder}
          </Text>
        </View>
      ) : null}

      <View style={{ gap: tokens.spacing.sm }}>
        {rows.map((row, r) => (
          <View key={r} style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
            {row.map((key) => {
              const isAction = key === 'backspace' || key === 'clear';
              return (
                <Pressable
                  key={key}
                  accessibilityRole="button"
                  accessibilityLabel={keyLabel(key)}
                  accessibilityState={{ disabled }}
                  disabled={disabled}
                  onPress={() => press(key)}
                  style={({ pressed }) => ({
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 68,
                    borderRadius: tokens.radius.md,
                    backgroundColor: pressed
                      ? withAlpha(colors.primary, 0.14)
                      : tokens.ramps.neutral[100] ?? colors.surface,
                  })}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: isAction ? colors.muted : colors.onSurface,
                      fontSize: tokens.typography.scale['2xl'],
                      fontWeight: '700',
                    }}
                  >
                    {keyGlyph(key)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}
