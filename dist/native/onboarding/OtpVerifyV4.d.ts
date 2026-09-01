import * as React from 'react';
import { type OnboardingFlowV4Props } from './internal/flow-v4';
import type { OtpVerifyProps } from './OtpVerify';
export interface OtpVerifyV4Props extends OtpVerifyProps, OnboardingFlowV4Props {
    /**
     * Render as a whole screen — the shared shell, so the CTA clears the home
     * indicator and taps land while the keypad is up. Default `false`.
     */
    fullScreen?: boolean;
    /**
     * Copy for the resend action while it is available. Default `'Resend code'`.
     */
    resendLabel?: string;
    /**
     * Copy while the user must wait. Default `'Resend in 30s'`.
     *
     * A function, not a template string, because "in 30s" is not how every
     * language says it — and the base hard-coded the English one inside the
     * component where a host could not reach it.
     */
    formatResendCountdown?: (seconds: number) => string;
    /**
     * Accessible name for cell `n` of `length`. Default `'Digit 3 of 6'`.
     *
     * The base announced "Digit 3" with no total, so a screen-reader user had no
     * way to know how long the code was.
     */
    formatDigitLabel?: (position: number, total: number) => string;
    /** Copy for the sent-to line when no `subtitle` is given. */
    formatDestination?: (destination: string) => string;
}
/**
 * **V4 code verification** — the base's props plus `fullScreen` and four copy
 * hooks, all optional.
 *
 * ## Five changes
 *
 * 1. **The cells are on the shared field metrics.** `fieldMetrics()`,
 *    `fieldBorder()` and `haloStyle()` — the same height, radius, border and
 *    focus halo `InputV4` and every other V4 control take. The base picked its
 *    own `CELL_HEIGHT`, its own radius and its own focus colour, so the code
 *    field was visibly a different control from the email field one screen
 *    earlier.
 * 2. **Focus does not move the layout.** The halo's space is reserved whether
 *    or not it shows, so tapping a cell no longer nudges the row.
 * 3. **Every English string is a prop.** `resendLabel`,
 *    `formatResendCountdown`, `formatDigitLabel`, `formatDestination` — four
 *    sentences that were unreachable inside a module whose contract is that
 *    copy is caller-supplied.
 * 4. **The digit label carries the total** ("Digit 3 of 6").
 * 5. **`fullScreen`** — the shared shell.
 *
 * `PinInputV4` is deliberately **not** composed here. It takes exactly its
 * base's props (`length`, `value`, `onChange`) and therefore has no way to
 * express an invalid code — and a verification screen that cannot show a wrong
 * code is not a verification screen. Closing that gap belongs in `PinInput`,
 * per the design spec's Addendum, not in a private fork here; until it is
 * closed these cells carry the shared field metrics so the two still match.
 */
export declare function OtpVerifyV4({ destination, length, value, onChange, onVerify, onResend, error, loading, resendCountdown, verifyLabel, autoSubmit, title, subtitle, illustration, logoGlyph, progress, onBack, onDismiss, resendInterval, resendNotice, resendPrompt, resendLabel, formatResendCountdown, formatDigitLabel, formatDestination, fullScreen, ground, accent, style, }: OtpVerifyV4Props): React.ReactElement;
//# sourceMappingURL=OtpVerifyV4.d.ts.map