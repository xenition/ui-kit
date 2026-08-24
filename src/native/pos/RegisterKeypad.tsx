import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

/** A key emitted by the keypad. Digit keys are the character itself. */
export type KeypadKey =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'decimal'
  | 'doubleZero'
  | 'backspace'
  | 'clear';

export type RegisterKeypadVariant = 'amount' | 'number' | 'pin';

export interface RegisterKeypadProps {
  /** Current entry string (controlled). Digits, and a single `.` for `amount`. */
  value?: string;
  /** Called with the next entry string for value-mutating keys. */
  onChange?: (next: string) => void;
  /** Called with every raw key press (including backspace/clear). */
  onKeyPress?: (key: KeypadKey) => void;
  /**
   * Layout mode. `amount` shows a decimal key, `number` swaps it for a `00`
   * key, `pin` masks the display and drops the decimal (bottom-left is clear).
   */
  variant?: RegisterKeypadVariant;
  /** Render the running entry above the grid (default `true`). */
  showDisplay?: boolean;
  /** Prefix drawn before the display value (e.g. a currency symbol). */
  displayPrefix?: string;
  /** Placeholder shown when the entry is empty. */
  placeholder?: string;
  /** Max entry length (guards runaway input). Default 12. */
  maxLength?: number;
  /** Block all keys and dim the grid. */
  disabled?: boolean;
  /** Accessible label for the whole keypad (default `Register keypad`). */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

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
 * A numeric entry grid for a register — tenders, quantities, and PINs. Keys are
 * emitted through `onKeyPress`, and value-mutating keys additionally fold into a
 * controlled `value` via `onChange` (append digit, single decimal, `00`,
 * backspace, clear). `pin` masks the display. Token-only: every surface, border,
 * and glyph color traces to a compiled theme token, and each key is a labelled
 * `button` for screen readers. No dependencies.
 */
export function RegisterKeypad({
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
}: RegisterKeypadProps): React.ReactElement {
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
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
          }}
        >
          {displayPrefix ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.lg }}>
              {displayPrefix}
            </Text>
          ) : null}
          <Text
            numberOfLines={1}
            style={{
              color: value ? colors.onSurface : colors.muted,
              fontSize: tokens.typography.scale['2xl'],
              fontWeight: '700',
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
                    minHeight: 52,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: pressed ? colors.border : colors.surface,
                  })}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: isAction ? colors.muted : colors.onSurface,
                      fontSize: tokens.typography.scale.xl,
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
