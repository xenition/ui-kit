import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { toneColor, withAlpha } from './internal';
import type { KeypadKey, RegisterKeypadProps } from './RegisterKeypad';

/** Drop-in for {@link RegisterKeypadProps} — same props, the V4 "register" design. */
export type RegisterKeypadV4Props = RegisterKeypadProps;

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
 * RegisterKeypad — **V4** "register" design. The tactile checkout take on a
 * numeric pad: **big ≥44px keys** with a soft-primary press, a **bold
 * `tabular-nums` amount display**, and distinct clear / backspace action keys
 * (the primary/danger accents a busy counter reaches for). Keys are emitted
 * through `onKeyPress`, and value-mutating keys fold into a controlled `value`
 * via `onChange` (append digit, single decimal, `00`, backspace, clear); `pin`
 * masks the display. Same props/behavior as {@link RegisterKeypadProps}; each key
 * is a labelled `button` for screen readers, token-only via `useXenitionTheme()`.
 */
export function RegisterKeypadV4({
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
}: RegisterKeypadV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const accent = toneColor(colors, 'primary');

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
      style={[{ gap: tokens.spacing.sm, opacity: disabled ? 0.5 : 1 }, style]}
    >
      {showDisplay ? (
        <View
          accessibilityLabel={`Entry ${value || placeholder}`}
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'flex-end',
            gap: tokens.spacing.xs,
            borderRadius: tokens.radius.lg,
            borderWidth: 2,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            paddingVertical: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.lg,
          }}
        >
          {displayPrefix ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
              {displayPrefix}
            </Text>
          ) : null}
          <Text
            numberOfLines={1}
            allowFontScaling={false}
            style={{
              color: value ? colors.onSurface : colors.muted,
              fontSize: tokens.typography.scale['3xl'],
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
              const isClear = key === 'clear';
              const isBackspace = key === 'backspace';
              const glyphColor = isClear ? colors.danger : isBackspace ? colors.muted : colors.onSurface;
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
                    minHeight: 56,
                    borderRadius: tokens.radius.lg,
                    borderWidth: isClear ? 2 : 1,
                    borderColor: isClear ? colors.danger : colors.border,
                    backgroundColor: pressed
                      ? isClear
                        ? withAlpha(colors.danger, 0.14)
                        : isBackspace
                          ? colors.border
                          : withAlpha(accent, 0.14)
                      : isBackspace
                        ? withAlpha(colors.muted, 0.08)
                        : colors.surface,
                  })}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: glyphColor,
                      fontSize: tokens.typography.scale['2xl'],
                      fontWeight: '800',
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
