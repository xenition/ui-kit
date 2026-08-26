import * as React from 'react';
import { Text, TextInput, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { fieldAccent, fieldBorder, fieldMetrics, haloStyle } from './internal/field-v4';
import type { PhoneInputProps } from './PhoneInput';

export type { PhoneInputProps as PhoneInputV4Props };

/** Strip to digits, cap at 10, format as `(NNN) NNN-NNNN` progressively. */
function formatUsPhone(digits: string): string {
  const d = digits.replace(/\D/g, '').slice(0, 10);
  if (d.length === 0) return '';
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/**
 * **V4 phone field** — the same props as {@link PhoneInput}, a different design
 * line.
 *
 * The mask is the good idea the base already had: the field shows
 * `(555) 123-4567` while `onChangeText` reports only `5551234567`, so the
 * caller never has to strip punctuation it did not ask for. §31 asks for
 * familiar interactions, and a phone number that formats itself as you type is
 * the most familiar input mask there is. V4 keeps it exactly.
 *
 * What changes:
 *
 * 1. **It is a field like the others.** `2xl` tall, `md` radius, `md`
 *    horizontal padding from the shared `fieldMetrics`, so a phone number under
 *    an email field shares its edge (§13).
 * 2. **Tabular figures.** A masked number is read in groups, and equal-width
 *    figures keep the groups the same width as the digits change — the number
 *    stops shuffling under the caret while it is being typed (§36.11), and a
 *    column of them scans (§33).
 * 3. **A real focus ring, and a divider that is a divider.** The halo rings the
 *    whole control, country code included, because the code is part of the
 *    control. The code is separated by a hairline in `border` — the same
 *    hairline the field's own edge uses — rather than by whitespace alone, so
 *    the two parts read as one control with two jobs (§9, spacing as
 *    structure).
 *
 * The country code is `muted`: it is context, not content, and the number is
 * the thing being read (§6). No gradient, no glass, no shadow — §16 asks that
 * forms stay minimal.
 */
export function PhoneInputV4({
  value = '',
  onChangeText,
  countryCode = '+1',
  placeholder = '(555) 123-4567',
  invalid = false,
  disabled = false,
  accessibilityLabel = 'Phone number',
  containerStyle,
}: PhoneInputProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const metrics = fieldMetrics(theme);
  const [focused, setFocused] = React.useState(false);

  const accent = fieldAccent(theme, invalid);

  const handle = (text: string): void => {
    onChangeText?.(text.replace(/\D/g, '').slice(0, 10));
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
        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'stretch',
            paddingRight: metrics.inner,
            borderRightWidth: 1,
            borderRightColor: colors.border,
          }}
        >
          <Text
            style={{
              color: colors.mutedText,
              fontSize: tokens.typography.scale.base,
              fontFamily: tokens.typography.fontBody,
              fontVariant: ['tabular-nums'],
            }}
          >
            {countryCode}
          </Text>
        </View>
        <TextInput
          editable={!disabled}
          accessibilityLabel={accessibilityLabel}
          accessibilityState={{ disabled }}
          value={formatUsPhone(value)}
          onChangeText={handle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={colors.mutedText}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          style={{
            flex: 1,
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontFamily: tokens.typography.fontBody,
            // The mask reads in groups; equal-width figures keep the groups the
            // same width as the digits change.
            fontVariant: ['tabular-nums'],
            padding: 0,
          }}
        />
      </View>
    </View>
  );
}
