import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Textarea } from '../primitives';

export interface OpenTextResponseProps {
  /** Controlled text value. */
  value: string;
  /** Fires with the next text on every edit. */
  onChange: (value: string) => void;
  /** Placeholder shown when empty. */
  placeholder?: string;
  /** Optional field label above the input. */
  label?: string;
  /** Visible line count → min height (mirrors the primitive `rows`). Default 4. */
  rows?: number;
  /** Max characters; when set a live `n / max` counter is shown. */
  maxLength?: number;
  /** Force the danger border + announce the error line. */
  error?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A free-text answer field — wraps the token `Textarea` primitive and adds a
 * survey-friendly live character counter (when `maxLength` is set) that turns to
 * the danger tone as the limit is reached, plus an optional error line. Fully
 * controlled (`value`/`onChange`). No literal colors.
 */
export function OpenTextResponse({
  value,
  onChange,
  placeholder,
  label,
  rows = 4,
  maxLength,
  error,
  disabled = false,
  style,
}: OpenTextResponseProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const atLimit = maxLength != null && value.length >= maxLength;

  return (
    <View style={[{ gap: tokens.spacing.xs }, style]}>
      <Textarea
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        label={label}
        rows={rows}
        maxLength={maxLength}
        editable={!disabled}
        invalid={error != null}
        accessibilityLabel={label ?? placeholder ?? 'Your answer'}
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
