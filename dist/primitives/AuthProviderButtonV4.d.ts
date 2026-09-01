import * as React from 'react';
import type { AuthProviderButtonProps } from './AuthCard';
export interface AuthProviderButtonV4Props extends AuthProviderButtonProps {
    /**
     * Social sign-in leaves the app: a redirect, a popup, a native sheet. The
     * gap between the tap and the browser handing over is real, and without a
     * pending state a user taps "Continue with Google" twice. Shows a spinner in
     * the logo's place and blocks further presses.
     */
    loading?: boolean;
    /**
     * Logo only, no label — for a row of three or more providers side by side,
     * where full-width rows would push the footer off the fold.
     *
     * The label is not lost: it stays the button's accessible name, so a screen
     * reader still announces "Continue with Google" and the control keeps a
     * square footprint at the field height.
     */
    compact?: boolean;
    /**
     * Whether the button fills its container. Default `true` — the base's
     * `w-full` rendering, and what §9's stacked provider list wants. Set `false`
     * to lay several out in a row.
     */
    fullWidth?: boolean;
}
/**
 * **V4 provider button** — one social/SSO action from `ONBOARDING-DESIGN-SPEC.md`
 * §9, in the V4 design line. Web twin of the native `AuthProviderButtonV4`.
 *
 * Outlined, never filled. §5 gives the screen exactly one dominant action and
 * the primary CTA is it; a filled provider button beside a filled CTA makes
 * the user choose between two equally loud options for the same goal. So this
 * is `surface` behind a hairline `border`, with the logo leading the label —
 * calm enough to read as the alternative, present enough to be obviously
 * tappable.
 *
 * Feedback is the shared M3 state layer (`data-xen-v4-state`): hover, focus
 * and press tint the *container* at M3's opacities rather than dimming the
 * control's own content, which is the signal `0.38` is reserved for and which
 * made the base's `hover:opacity-85` read like a half-disabled button. Disabled
 * is that `0.38` — `V4_DISABLED_CLASS`, one spelling for the whole line.
 *
 * Because the button owns its fill, the state layer is grounded on it
 * explicitly ({@link stateGroundVars}) rather than left translucent: the label
 * is contrast-checked against `surface`, and an opaque layer keeps that
 * promise measurable instead of borrowing whatever the page put underneath.
 *
 * See {@link HEIGHT_CLASS} for the control-height ruling.
 */
export declare const AuthProviderButtonV4: React.ForwardRefExoticComponent<AuthProviderButtonV4Props & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=AuthProviderButtonV4.d.ts.map