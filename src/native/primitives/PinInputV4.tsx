import * as React from 'react';
import {
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { fieldMetrics, haloStyle } from './internal/field-v4';
import type { PinInputProps } from './PinInput';

export type { PinInputProps as PinInputV4Props };

/**
 * **V4 PIN / OTP entry** — the same props as {@link PinInput}, a different
 * design line.
 *
 * A one-time code is the most time-critical field in any product: it is read
 * off another screen while a timer runs. So the changes are about getting
 * through it, not about how it looks:
 *
 * 1. **The code can be pasted whole.** Typing one character per box is what the
 *    base supports; pasting six from a message filled one box and dropped five.
 *    V4 spreads a multi-character entry across the remaining boxes and jumps to
 *    the end, and the first box carries `textContentType="oneTimeCode"` so the
 *    OS can offer the code from the SMS itself — §4, optimize for time to
 *    value, and §32, recognition over recall.
 * 2. **Boxes at the form's own height.** Each is `2xl` tall — the height every
 *    other V4 control takes — and `2xl − sm` wide, so a row of six still fits a
 *    narrow phone while each box clears a thumb (§30).
 * 3. **A ring that shows where you are.** The focused box lights the same brand
 *    halo `InputV4` paints, and a box that already has a digit keeps a brand
 *    border, so the row shows its own progress. The halo's space is reserved,
 *    so advancing between boxes never shifts the row (§36.11).
 *
 * The figures are tabular and centred, so a `1` sits where an `8` sits and the
 * row does not twitch as it fills.
 *
 * No gradient, no glass, no shadow: §16 asks that forms stay minimal, and this
 * is the most minimal form there is.
 */
export function PinInputV4({
  length = 6,
  value,
  onChange,
  style,
}: PinInputProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const metrics = fieldMetrics(theme);
  const refs = React.useRef<Array<TextInput | null>>([]);
  const [focused, setFocused] = React.useState<number | null>(null);

  const chars = Array.from({ length }, (_, i) => value[i] ?? '');
  // Narrow enough that a six-box row fits a phone, derived rather than picked.
  const boxWidth = metrics.height - tokens.spacing.sm;

  const setFrom = (index: number, text: string): void => {
    const digits = text.replace(/\s/g, '');
    if (digits.length === 0) {
      const next = chars.slice();
      next[index] = '';
      onChange?.(next.join(''));
      return;
    }
    // A pasted code fills forward from here instead of landing in one box.
    const next = chars.slice();
    let cursor = index;
    for (const ch of digits) {
      if (cursor >= length) break;
      next[cursor] = ch;
      cursor += 1;
    }
    onChange?.(next.join(''));
    refs.current[Math.min(cursor, length - 1)]?.focus();
  };

  const onKeyPress = (
    index: number,
    event: NativeSyntheticEvent<TextInputKeyPressEventData>
  ): void => {
    if (event.nativeEvent.key === 'Backspace' && !chars[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={[{ flexDirection: 'row', gap: metrics.gap }, style]}>
      {chars.map((char, index) => (
        <View
          key={index}
          style={haloStyle(theme, { showing: focused === index, accent: colors.ring })}
        >
          <TextInput
            ref={(el) => {
              refs.current[index] = el;
            }}
            keyboardType="numeric"
            // Only the first box asks for the code: the OS fills the rest from
            // it, and six boxes all claiming the same autofill is a fight.
            textContentType={index === 0 ? 'oneTimeCode' : 'none'}
            value={char}
            onChangeText={(text) => setFrom(index, text)}
            onKeyPress={(event) => onKeyPress(index, event)}
            onFocus={() => setFocused(index)}
            onBlur={() => setFocused((current) => (current === index ? null : current))}
            style={{
              width: boxWidth,
              height: metrics.height,
              textAlign: 'center',
              color: colors.onSurface,
              backgroundColor: colors.surface,
              fontSize: tokens.typography.scale.lg,
              fontFamily: tokens.typography.fontBody,
              // A 1 sits where an 8 sits, so the row does not twitch as it fills.
              fontVariant: ['tabular-nums'],
              borderWidth: 1,
              // A filled box keeps the brand edge, so the row shows its progress.
              borderColor: focused === index || char ? colors.primary : colors.border,
              borderRadius: metrics.radius,
            }}
          />
        </View>
      ))}
    </View>
  );
}
