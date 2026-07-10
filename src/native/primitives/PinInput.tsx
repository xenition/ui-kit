import * as React from 'react';
import {
  TextInput,
  View,
  type NativeSyntheticEvent,
  type StyleProp,
  type TextInputKeyPressEventData,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export interface PinInputProps {
  /** Number of digit boxes (default 6). */
  length?: number;
  value: string;
  /** Fires with the joined value (kept as `onChange` for web parity). */
  onChange?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * OTP / PIN entry — the native mirror of the web `PinInput`. One single-char
 * `TextInput` box per character with ref-driven focus advance and backspace
 * retreat. No literal colors.
 */
export function PinInput({
  length = 6,
  value,
  onChange,
  style,
}: PinInputProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const refs = React.useRef<Array<TextInput | null>>([]);
  const chars = Array.from({ length }, (_, i) => value[i] ?? '');

  const setChar = (i: number, c: string): void => {
    const ch = c.slice(-1);
    const next = chars.slice();
    next[i] = ch;
    onChange?.(next.join(''));
    if (ch && i < length - 1) refs.current[i + 1]?.focus();
  };

  const onKeyPress = (
    i: number,
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ): void => {
    if (e.nativeEvent.key === 'Backspace' && !chars[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  return (
    <View style={[{ flexDirection: 'row', gap: tokens.spacing.sm }, style]}>
      {chars.map((c, i) => (
        <TextInput
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          keyboardType="numeric"
          maxLength={1}
          value={c}
          onChangeText={(t) => setChar(i, t)}
          onKeyPress={(e) => onKeyPress(i, e)}
          style={{
            width: 44,
            height: 48,
            textAlign: 'center',
            fontSize: tokens.typography.scale.lg,
            color: colors.onSurface,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: tokens.radius.sm,
          }}
        />
      ))}
    </View>
  );
}
