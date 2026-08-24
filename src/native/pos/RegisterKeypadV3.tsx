import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { KeypadKey, RegisterKeypadProps } from './RegisterKeypad';

/** Drop-in alternate of {@link RegisterKeypadProps} — identical prop contract. */
export type RegisterKeypadV3Props = RegisterKeypadProps;

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
 * RegisterKeypad — design variant **V3**: a **compact, minimal grid**. Where V1
 * boxes every key in a bordered surface and V2 is a tall elevated pad, V3 strips
 * all chrome — no key borders, no fills, a hairline-underlined inline display —
 * for a dense number pad that tucks into a sidebar or a modal. Same props as
 * {@link RegisterKeypadProps}. Token-only; `pin` masks the display.
 */
export function RegisterKeypadV3({
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
}: RegisterKeypadV3Props): React.ReactElement {
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
    <View accessibilityLabel={accessibilityLabel} style={[{ gap: tokens.spacing.xs, opacity: disabled ? 0.5 : 1 }, style]}>
      {showDisplay ? (
        <View
          accessibilityLabel={`Entry ${value || placeholder}`}
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'flex-end',
            gap: tokens.spacing.xs,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            paddingBottom: tokens.spacing.xs,
          }}
        >
          {displayPrefix ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{displayPrefix}</Text>
          ) : null}
          <Text
            numberOfLines={1}
            style={{
              color: value ? colors.onSurface : colors.muted,
              fontSize: tokens.typography.scale.lg,
              fontWeight: '600',
            }}
          >
            {displayText || placeholder}
          </Text>
        </View>
      ) : null}

      <View style={{ gap: tokens.spacing.xs }}>
        {rows.map((row, r) => (
          <View key={r} style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
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
                    minHeight: 40,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: pressed ? colors.border : 'transparent',
                  })}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: isAction ? colors.muted : colors.onSurface,
                      fontSize: tokens.typography.scale.base,
                      fontWeight: '600',
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
