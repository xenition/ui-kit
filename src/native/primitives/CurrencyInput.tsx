import * as React from 'react';
import { Text, TextInput, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface CurrencyInputProps {
  /** Controlled numeric amount (major units, e.g. dollars). */
  value?: number | null;
  /** Fires with the parsed number (or `null` when the field is cleared). */
  onChange?: (value: number | null) => void;
  /** Leading currency glyph shown in the badge. */
  symbol?: string;
  /** Fractional digits to allow while typing (default 2). */
  precision?: number;
  placeholder?: string;
  /** Renders the danger border state. */
  invalid?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Currency field — a token-bound `TextInput` with a leading currency badge that
 * accepts digits and a single decimal point (capped to `precision`) and reports
 * the parsed `number` (or `null`) via `onChange`. Border flips to `danger` when
 * `invalid`; uses the `decimal-pad` keyboard. No literal colors.
 */
export function CurrencyInput({
  value,
  onChange,
  symbol = '$',
  precision = 2,
  placeholder = '0.00',
  invalid = false,
  disabled = false,
  accessibilityLabel = 'Amount',
  containerStyle,
}: CurrencyInputProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  // Local text buffer so a trailing "." or "0" survives while typing; it stays
  // in sync when the controlled value changes from outside.
  const [text, setText] = React.useState(value == null ? '' : String(value));
  React.useEffect(() => {
    const asNum = text === '' ? null : Number(text);
    if (value !== asNum && !(Number.isNaN(asNum ?? NaN) && value == null)) {
      setText(value == null ? '' : String(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const sanitize = (raw: string): string => {
    let cleaned = raw.replace(/[^0-9.]/g, '');
    const firstDot = cleaned.indexOf('.');
    if (firstDot !== -1) {
      const head = cleaned.slice(0, firstDot + 1);
      const tail = cleaned.slice(firstDot + 1).replace(/\./g, '');
      cleaned = head + tail.slice(0, Math.max(0, precision));
    }
    return cleaned;
  };

  const handle = (raw: string): void => {
    const next = sanitize(raw);
    setText(next);
    if (next === '' || next === '.') {
      onChange?.(null);
      return;
    }
    const n = Number(next);
    onChange?.(Number.isNaN(n) ? null : n);
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: invalid ? colors.danger : colors.border,
          borderRadius: tokens.radius.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          opacity: disabled ? 0.5 : 1,
        },
        containerStyle,
      ]}
    >
      <Text
        style={{
          color: colors.muted,
          fontSize: tokens.typography.scale.base,
          fontWeight: '600',
        }}
      >
        {symbol}
      </Text>
      <TextInput
        editable={!disabled}
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled }}
        value={text}
        onChangeText={handle}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        keyboardType="decimal-pad"
        style={{
          flex: 1,
          color: colors.onSurface,
          fontSize: tokens.typography.scale.base,
          padding: 0,
          textAlign: 'right',
        }}
      />
    </View>
  );
}
