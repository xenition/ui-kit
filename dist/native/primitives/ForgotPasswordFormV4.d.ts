import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { AuthAlign } from './AuthCard';
import type { IconName } from '../../primitives/icon-names';
import type { ForgotPasswordFormProps } from './ForgotPasswordForm';
export interface ForgotPasswordFormV4Props extends ForgotPasswordFormProps {
    /** Brand icon from the named set, for an app with no mark of its own. */
    brandIcon?: IconName;
    /** Headline alignment, passed to the card. Default `'left'` — §9's top-left tile. */
    align?: AuthAlign;
    /**
     * Headline for the confirmation state — V4 addition.
     *
     * The base left `title` as "Reset password" after the link was sent, so the
     * headline went on asking for something the user had already done. The
     * screen changed job; the heading has to change with it. Default
     * `'Check your inbox'`.
     */
    sentTitle?: React.ReactNode;
    /** Lead-in above the resend action. Default `"Didn't get the email?"`. */
    resendPrompt?: string;
    /** The resend action's copy. Default `'Resend link'`. */
    resendLabel?: string;
    /** Whether the confirmation offers a resend at all. Default `true`. */
    resendable?: boolean;
    /** Lead-in beside the back link, e.g. "Remembered it?". */
    backPrompt?: string;
    /** Wrapper style override — the native mirror of the web `className`. */
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 reset-password request form** — the native twin of the web
 * `ForgotPasswordFormV4`, the base's props plus the confirmation copy, a
 * different design line.
 *
 * Composed entirely of V4 children (§10.5): `AuthCardV4` for the shell, `FormV4`
 * for the rhythm, `AuthFieldV4` for the one question, `AuthSubmitButtonV4` for
 * the CTA, `AuthSwitchFooterV4` for both text actions, `AlertV4` for a failed
 * request and `StatusMessageV4` for the confirmation. Nothing is hand-rolled and
 * nothing is a literal — the field's metrics come from `internal/field-v4`, the
 * CTA's from the submit button, and every gap off `tokens.spacing`.
 *
 * ## The confirmation is the screen
 *
 * A user reaches this form once and leaves it immediately; the only moment that
 * matters is the half-second after the button is pressed. The base spent that
 * moment on a single line of small grey text inside `StatusMessage`, with the
 * headline still reading "Reset password", no sign of *which* address the link
 * went to, and no way to try again. Three things change:
 *
 * 1. **The heading follows the state.** `sentTitle` replaces `title`, and the
 *    subtitle is dropped — it was written to explain the form, and the form is
 *    gone.
 * 2. **The address is echoed back.** The single commonest failure here is a
 *    typo the user cannot see, because the field that held it has been replaced
 *    by a success message. Printing the address is what turns "nothing arrived"
 *    from a dead end into a correction.
 * 3. **There is a next step.** §15 asks an empty state to move the user
 *    forward, and `StatusMessageV4` deliberately carries no action, so the
 *    resend sits below it as `AuthSwitchFooterV4` — §5's rule that a secondary
 *    action is a centred text link, never a second filled button competing with
 *    the one the user just pressed. While it is in flight the label becomes
 *    `submittingLabel` and the link disables, so the state is spoken rather
 *    than merely spun.
 *
 * The whole block is a polite live region: the form it replaced held focus, so
 * without one a screen-reader user is left holding a control that no longer
 * exists with no announcement of what took its place.
 *
 * ## The CTA carries no arrow
 *
 * §5 reserves `→` for a forward action. Sending a reset link is terminal — the
 * next thing the user does is leave for their inbox — so `trailingArrow` is
 * off, exactly as in the base.
 *
 * Errors are text, never colour: a rejected request draws `AlertV4` above the
 * field, and a missing address draws `AuthFieldV4`'s own message underneath it.
 */
export declare function ForgotPasswordFormV4({ onSubmit, onLoginClick, title, subtitle, brandGlyph, brandIcon, align, submitLabel, submittingLabel, sentMessage, sentTitle, resendPrompt, resendLabel, resendable, emailLabel, emailPlaceholder, backLabel, backPrompt, style, }: ForgotPasswordFormV4Props): React.ReactElement;
//# sourceMappingURL=ForgotPasswordFormV4.d.ts.map