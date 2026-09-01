import * as React from 'react';
import { type OnboardingFlowV4Props } from './internal/flow-v4';
import type { OtpVerifyProps } from './OtpVerify';
export interface OtpVerifyV4Props extends OtpVerifyProps, OnboardingFlowV4Props {
    /** Render as a whole screen — the shared shell. Default `false`. */
    fullScreen?: boolean;
    /** Copy for the resend action while it is available. Default `'Resend code'`. */
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
 * **V4 code verification** — the web twin of the native `OtpVerifyV4`: the
 * base's props plus `fullScreen` and four copy hooks.
 *
 * ## Five changes
 *
 * 1. **The cells are on the shared field skin.** `FIELD_V4_SHELL`'s height and
 *    radius, `fieldBorderClass()`, and the one focus ring every V4 control
 *    draws — the base picked its own cell class, so the code field was visibly
 *    a different control from the email field one screen earlier.
 * 2. **Focus does not move the layout.** The ring is a `box-shadow`, so
 *    arming it costs no layout.
 * 3. **Every English string is a prop** — four sentences that were unreachable
 *    inside a module whose contract is that copy is caller-supplied.
 * 4. **The digit label carries the total** ("Digit 3 of 6").
 * 5. **`fullScreen`** — the shared shell.
 *
 * `PinInputV4` is deliberately not composed: it takes exactly its base's props
 * and therefore cannot express an invalid code, and a verification screen that
 * cannot show a wrong code is not a verification screen. Closing that gap
 * belongs in `PinInput`, per the design spec's Addendum.
 */
export declare const OtpVerifyV4: React.ForwardRefExoticComponent<OtpVerifyV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OtpVerifyV4.d.ts.map