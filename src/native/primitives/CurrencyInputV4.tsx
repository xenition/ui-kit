import * as React from 'react';
import { Text, TextInput, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { fieldAccent, fieldBorder, fieldMetrics, haloStyle } from './internal/field-v4';
import type { CurrencyInputProps } from './CurrencyInput';

export type { CurrencyInputProps as CurrencyInputV4Props };

/**
 * **V4 currency field** — the same props as {@link CurrencyInput}, a different
 * design line.
 *
 * Money is the field people check twice, so the changes are all about reading
 * it rather than decorating it:
 *
 * 1. **It is a field like the others.** `2xl` tall, `md` radius, `md`
 *    horizontal padding, from the shared `fieldMetrics` — the same numbers
 *    `InputV4` and `SelectV4` take, so an amount sitting under a text field in
 *    a form shares its edge (§13).
 * 2. **Figures of equal width.** `tabular-nums` on the amount, so a column of
 *    prices lines up on the decimal point and a digit changing does not shift
 *    the ones beside it (§33, optimize for scanning). The amount is right
 *    aligned for the same reason, which is where the base already had it.
 * 3. **A real focus ring.** Focusing the amount lights the shared brand halo
 *    around the whole field — symbol included, because the symbol is part of
 *    the control — and its space is reserved whether or not it is showing, so
 *    focusing never nudges the layout (§36.11).
 *
 * The symbol is `muted` and the amount is `onSurface`: the currency is context
 * and the number is the content, and §6 asks for the hierarchy to be settled
 * before anything is styled. `invalid` turns the border and the ring `danger`
 * from one flag, so they can never disagree — the recovery copy belongs to the
 * `Field` around this control, since a primitive cannot invent the sentence
 * that says what to fix (§38).
 *
 * No gradient, no glass, no shadow: §16 asks that forms stay minimal, and an
 * amount is not a hero.
 */
export function CurrencyInputV4({
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
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const metrics = fieldMetrics(theme);
  const [focused, setFocused] = React.useState(false);

  const accent = fieldAccent(theme, invalid);

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
    <View style={[haloStyle(theme, { showing: focused, accent }), containerStyle]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: metrics.inner,
          minHeight: metrics.height,
          paddingHorizontal: metrics.padX,
          borderRadius: metrics.radius,
          backgroundColor: colors.surface,
          opacity: disabled ? theme.state.disabledContent : 1,
          ...fieldBorder(theme, { invalid, focused }),
        }}
      >
        <Text
          style={{
            color: colors.mutedText,
            fontSize: tokens.typography.scale.base,
            fontFamily: tokens.typography.fontBody,
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
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={colors.mutedText}
          keyboardType="decimal-pad"
          style={{
            flex: 1,
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontFamily: tokens.typography.fontBody,
            // Equal-width figures: a column of amounts lines up on the point.
            fontVariant: ['tabular-nums'],
            padding: 0,
            textAlign: 'right',
          }}
        />
      </View>
    </View>
  );
}
