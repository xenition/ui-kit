import * as React from 'react';
import { Text, TextInput, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { OpenTextResponseProps } from './OpenTextResponse';

/** Drop-in for {@link OpenTextResponseProps} — same props, the V4 "focus" design. */
export type OpenTextResponseV4Props = OpenTextResponseProps;

/**
 * OpenTextResponse — **V4** "clean form / focus" design. A big, comfortable
 * multiline answer field on a calm `surface`: a `border` hairline that lifts to a
 * soft **primary** ring/border while focused (the single signature accent), an
 * optional label, and a live character counter that turns **danger** once the
 * text meets or exceeds `maxLength`. Generous padding, rounded control, no
 * gradients. Fully controlled (`value`/`onChange`); preserves the multiline
 * `TextInput` a11y (`accessibilityLabel`) and `maxLength` guard. Same
 * props/behavior as {@link OpenTextResponseProps}; token-only colors via
 * `useXenitionTheme()` + `withAlpha` (no literal colors).
 */
export function OpenTextResponseV4({
  value,
  onChange,
  placeholder,
  label,
  rows = 4,
  maxLength,
  error,
  disabled = false,
  style,
}: OpenTextResponseV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [focused, setFocused] = React.useState(false);
  const atLimit = maxLength != null && value.length >= maxLength;
  const invalid = error != null;
  const lineHeight = Math.round(tokens.typography.scale.base * 1.4);

  const borderColor = invalid ? colors.danger : focused ? colors.primary : colors.border;

  return (
    <View style={[{ gap: tokens.spacing.xs }, style]}>
      {label ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {label}
        </Text>
      ) : null}

      <TextInput
        multiline
        textAlignVertical="top"
        editable={!disabled}
        accessibilityState={{ disabled }}
        accessibilityLabel={label ?? placeholder ?? 'Your answer'}
        value={value}
        onChangeText={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        maxLength={maxLength}
        style={{
          width: '100%',
          minHeight: rows * lineHeight + tokens.spacing.md * 2,
          color: colors.onSurface,
          // Calm surface; a whisper of primary tint while focused.
          backgroundColor: focused && !invalid ? withAlpha(colors.primary, 0.04) : colors.surface,
          borderWidth: focused ? 2 : 1,
          borderColor,
          borderRadius: tokens.radius.lg,
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.md,
          fontSize: tokens.typography.scale.base,
          opacity: disabled ? 0.5 : 1,
          // Soft primary focus ring — the single V4 accent.
          shadowColor: colors.primary,
          shadowOpacity: focused && !invalid ? 0.25 : 0,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 0 },
        }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        {error ? (
          <Text
            accessibilityRole="text"
            style={{ color: colors.danger, fontSize: tokens.typography.scale.sm, fontWeight: '600', flex: 1 }}
          >
            {error}
          </Text>
        ) : (
          <View style={{ flex: 1 }} />
        )}
        {maxLength != null ? (
          <Text
            style={{
              color: atLimit ? colors.danger : colors.muted,
              fontSize: tokens.typography.scale.xs,
              fontWeight: atLimit ? '700' : '400',
            }}
          >
            {value.length} / {maxLength}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
