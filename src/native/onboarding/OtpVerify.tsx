import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button, PinInput } from '../primitives';

export interface OtpVerifyProps {
  /** The channel the code was sent to (e.g. a phone number or email). */
  destination?: string;
  /** Number of digits. Default `6`. */
  length?: number;
  /** Controlled code value. */
  value: string;
  /** Fires with the joined code on every keystroke. */
  onChange: (value: string) => void;
  /** Fires when the user confirms (or the code auto-fills to full length). */
  onVerify?: (code: string) => void;
  /** Fires when the user taps "Resend code". */
  onResend?: () => void;
  /** Error message shown under the inputs (e.g. `'That code didn't match'`). */
  error?: string;
  /** Verify button spinner + block. */
  loading?: boolean;
  /** Seconds until resend is available; disables the resend link until 0. */
  resendCountdown?: number;
  /** Verify button copy. Default `'Verify'`. */
  verifyLabel?: string;
  /** Auto-fire `onVerify` once the code reaches `length`. Default `true`. */
  autoSubmit?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * One-time-code verification — reuses the {@link PinInput} primitive for entry
 * and adds the surrounding flow: a "sent to {destination}" line, an error slot,
 * a Verify button and a resend link with an optional countdown. When
 * `autoSubmit` is on it fires `onVerify` as soon as the code fills, matching the
 * SMS-autofill idiom. Colors come from tokens/primitives. No literal colors.
 */
export function OtpVerify({
  destination,
  length = 6,
  value,
  onChange,
  onVerify,
  onResend,
  error,
  loading = false,
  resendCountdown,
  verifyLabel = 'Verify',
  autoSubmit = true,
  style,
}: OtpVerifyProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const handleChange = (next: string): void => {
    onChange(next);
    if (autoSubmit && next.length === length) onVerify?.(next);
  };

  const canResend = resendCountdown == null || resendCountdown <= 0;

  return (
    <View style={[{ gap: tokens.spacing.lg, alignItems: 'center' }, style]}>
      {destination ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, textAlign: 'center' }}>
          Enter the code we sent to{' '}
          <Text style={{ color: colors.onSurface, fontWeight: '700' }}>{destination}</Text>
        </Text>
      ) : null}

      <PinInput length={length} value={value} onChange={handleChange} />

      {error ? (
        <Text
          accessibilityLiveRegion="assertive"
          style={{ color: colors.danger, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}
        >
          {error}
        </Text>
      ) : null}

      <Button
        variant="primary"
        size="lg"
        loading={loading}
        disabled={value.length < length}
        onPress={() => onVerify?.(value)}
        accessibilityLabel={verifyLabel}
        style={{ alignSelf: 'stretch' }}
      >
        {verifyLabel}
      </Button>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Resend code"
        accessibilityState={{ disabled: !canResend }}
        disabled={!canResend}
        onPress={onResend}
        hitSlop={tokens.spacing.sm}
      >
        <Text
          style={{
            color: canResend ? colors.primary : colors.muted,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '600',
          }}
        >
          {canResend ? 'Resend code' : `Resend in ${Math.max(0, resendCountdown ?? 0)}s`}
        </Text>
      </Pressable>
    </View>
  );
}
