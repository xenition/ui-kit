import * as React from 'react';
import type { AuthAlign } from './AuthCard';
import type { IconName } from './icon-names';
import type { TextSize } from './Text';
import type { LoginFormProps } from './LoginForm';
/**
 * One social/SSO button offered under the divider.
 *
 * Declared here rather than imported from `onboarding/types` on purpose: a
 * primitive must not depend on a screen module, and the shape is three fields.
 * It is structurally identical to `SignInProvider`, so a host already holding
 * that list can pass it straight in.
 */
export interface LoginProviderV4 {
    /** Stable key handed back to {@link LoginFormV4Props.onProviderClick}. */
    id: string;
    /** Button copy ("Continue with Google"). Also the accessible name. */
    label: string;
    /** One-off brand glyph — the kit ships no Google/Apple marks. */
    glyph?: string;
    /** A name from the kit's icon set, for a non-brand provider (`'mail'`, `'phone'`). */
    name?: IconName;
    /** Greys this one provider out without removing it from the row. */
    disabled?: boolean;
}
export interface LoginFormV4Props extends LoginFormProps {
    /** Brand icon from the named set, for an app with no mark of its own. */
    brandIcon?: IconName;
    /**
     * The accessible name for the brand tile.
     *
     * `AuthCardV4` added this precisely so a mark that carries meaning can
     * announce it, and then no composite forwarded it — so **every composed auth
     * screen's brand tile was permanently decorative**, with the prop reachable
     * only by hand-assembling the card. Found by putting all fourteen auth
     * components on one screen.
     */
    brandLabel?: string;
    /**
     * Headline alignment. Default `'left'` — §9 is explicit that the brand tile
     * is top-**left**, not centred.
     */
    align?: AuthAlign;
    /** Headline step. Default `'3xl'` (§9). */
    titleSize?: TextSize;
    /**
     * Social/SSO providers offered under the form.
     *
     * The whole block — the "or continue with" rule included — is handed to
     * {@link AuthDividerV4} as its children slot, so `providers={[]}` renders
     * **nothing at all** rather than a hairline introducing a void (§9, §12).
     * Default `[]`.
     */
    providers?: LoginProviderV4[];
    /** Fires with the pressed provider's `id`. */
    onProviderClick?: (id: string) => void;
    /** Copy centred on the divider rule. Default `'or continue with'`. */
    providersLabel?: string;
    /** Logo-only provider buttons, for three or more side by side. Default `false`. */
    compactProviders?: boolean;
    /**
     * Host-owned form-level failure ("You're offline"), for an app that does its
     * own error handling rather than throwing from `onSubmit`. Rendered as text
     * in a `danger` alert — never colour alone. A message thrown by `onSubmit`
     * takes precedence, because it is the newer of the two.
     */
    error?: string | null;
    /** Host-driven pending state, ORed with the form's own. Default `false`. */
    pending?: boolean;
    /** Gates the CTA without changing its shape (§5). Default `false`. */
    submitDisabled?: boolean;
    /** Seeds the email field at mount — a remembered address. Not controlled. */
    initialEmail?: string;
    /** Validation copy — the host owns every string a user reads. */
    emailRequiredMessage?: string;
    passwordRequiredMessage?: string;
    /** Shown when `onSubmit` throws something that is not an `Error`. */
    submitErrorFallback?: string;
    /** Extra content under the switch line, inside the card footer. */
    footer?: React.ReactNode;
    /** Wrapper className override — layout only. */
    className?: string;
}
/**
 * **V4 sign-in form** — `ONBOARDING-DESIGN-SPEC.md` §9's "Sign in" screen as a
 * drop-in component, in the V4 design line. Web twin of the native
 * `LoginFormV4`, at prop parity.
 *
 * Same public surface and the same `useForm` behaviour as {@link LoginForm} —
 * required email, required password, validate on submit, a thrown `onSubmit`
 * surfaced as a form-level message — plus the parts §9 asks for that the base
 * had no props for: providers, the divider that introduces them, and the
 * host-owned error and pending states.
 *
 * ## What V4 changes
 *
 * **It composes the V4 line, whole** (§10.5). `AuthCardV4`, `AuthFieldV4`,
 * `AuthSubmitButtonV4`, `AuthDividerV4`, `AuthProviderButtonV4`,
 * `AuthSwitchFooterV4`, `AlertV4`, `FormV4`, `TextV4` — no base child, so the
 * fields land on the Addendum's settled `spacing['2xl']` / `radius.md` metrics
 * and every control shares one focus ring and one M3 state layer.
 *
 * **`providers={[]}` renders nothing** — not an empty divider. The list is
 * mapped into `AuthDividerV4`'s children slot, and that component returns
 * `null` when the slot is empty, so the rule and the row live or die together.
 * The base pushed this onto the caller; §9 calls out the resulting bug by name.
 *
 * **The headline is §9's, not the card's historical one.** `align='left'` and
 * `titleSize='3xl'` by default: brand tile top-left, `3xl` bold headline, muted
 * subhead. The base card defaults to `xl` because it had shipped callers to
 * keep; a new component in a new line does not.
 *
 * **"Forgot password?" is a real tap target.** The base rendered a bare
 * `<button>` the size of the word — about 17 tall — with no hover, no press and
 * no focus ring. Here it is `MIN_TAP_CLASS` tall, carries the shared V4 state
 * layer, and rings off `--xen-ring` exactly as the footer link does. It is also
 * grouped with the password field at `gap-sm` inside the form's `gap-lg`
 * rhythm, because §9 puts the link on the field above it rather than adrift
 * between two questions.
 *
 * **Errors are always text.** Field errors come out of `AuthFieldV4` as a
 * message plus a `danger` border; the form-level one is an `AlertV4` with
 * `role="alert"`. Nothing in this component signals a failure with colour only.
 */
export declare function LoginFormV4({ onSubmit, onForgotPassword, onSignupClick, title, subtitle, brandGlyph, brandIcon, brandLabel, align, titleSize, submitLabel, submittingLabel, emailLabel, emailPlaceholder, passwordLabel, passwordPlaceholder, forgotLabel, switchPrompt, switchLabel, providers, onProviderClick, providersLabel, compactProviders, error, pending, submitDisabled, initialEmail, emailRequiredMessage, passwordRequiredMessage, submitErrorFallback, footer, className, }: LoginFormV4Props): React.ReactElement;
//# sourceMappingURL=LoginFormV4.d.ts.map