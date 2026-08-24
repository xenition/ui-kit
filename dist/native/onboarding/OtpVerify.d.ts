import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
export declare function OtpVerify({ destination, length, value, onChange, onVerify, onResend, error, loading, resendCountdown, verifyLabel, autoSubmit, style, }: OtpVerifyProps): React.ReactElement;
//# sourceMappingURL=OtpVerify.d.ts.map