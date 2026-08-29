import * as React from 'react';
export interface OtpVerifyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'title'> {
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
    /** Fires when the user clicks "Resend code". */
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
    /**
     * Headline above the code field (§4). Omitted by default so a host that
     * already prints its own screen title does not end up with two.
     */
    title?: string;
    /** Supporting line under the headline (§4). Defaults to the "sent to" line. */
    subtitle?: string;
    /** Hero art for the step (§3). Rendered in a centred, tinted panel. */
    illustration?: React.ReactNode;
    /** Glyph for the fallback hero medallion when `illustration` is absent (§3). */
    logoGlyph?: string;
    /**
     * Header progress slot (§1/§2) — pass the segmented bars, e.g.
     * `<ProgressDots variant="bars" count={4} activeIndex={3} />`.
     */
    progress?: React.ReactNode;
    /** Renders the header's back control. */
    onBack?: () => void;
    /** Renders the header's dismiss (✕) control. */
    onDismiss?: () => void;
    /**
     * Full length of the resend cooldown in seconds — what `resendCountdown`
     * counts down *from*. Drives the draining bar under the resend row so the
     * wait is visible rather than a number that mysteriously changes. Default 30.
     */
    resendInterval?: number;
    /**
     * Confirmation shown after a resend ("Code sent"), announced politely. The
     * whole reason a user clicks resend three times is that the first click looked
     * like nothing happened.
     */
    resendNotice?: string;
    /** Copy beside the resend link. Default `"Didn't get the code?"`. */
    resendPrompt?: string;
}
/**
 * One-time-code verification — the code-entry step, rebuilt to the anatomy in
 * `ONBOARDING-DESIGN-SPEC.md`: an optional header (back · progress · dismiss),
 * a hero slot, a headline block, the code field, and the sticky CTA footer.
 *
 * **The code cells are owned here rather than delegated to `PinInput`.** §6
 * requires an error state that raises the field's border to `danger` alongside
 * a `danger-text` message — never colour alone — and `PinInput` has no error or
 * focus contract to express that. The cells keep `PinInput`'s behaviour exactly
 * (single character each, focus advances on entry, backspace retreats) at the
 * §6 geometry: 56 tall, `radius.lg`, a 1px border that rises to `primary` on
 * focus.
 *
 * The **resend affordance shows its cooldown**: the label counts down, a
 * draining bar shows how much of the wait is left, and `resendNotice` confirms
 * the send in a polite live region. A user who cannot tell whether resend worked
 * clicks it again, and again — which is how an account ends up rate-limited by
 * its own verification screen.
 *
 * When `autoSubmit` is on it fires `onVerify` as soon as the code fills,
 * matching the SMS-autofill idiom. Every new prop is optional. No literal
 * colors.
 */
export declare const OtpVerify: React.ForwardRefExoticComponent<OtpVerifyProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OtpVerify.d.ts.map